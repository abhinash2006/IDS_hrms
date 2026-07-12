import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { leaveSchema } from "../validations/leaveValidation";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { getLeaves, createLeave, updateLeave, deleteLeave } from "../api/leaveApi";
import { toast } from "react-toastify";
import { FaPlus, FaSearch } from "react-icons/fa";

function Leaves() {
    const role = localStorage.getItem("role");
    const [leaves, setLeaves] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLeave, setEditingLeave] = useState(null);

    useEffect(() => {
        loadLeaves();
    }, [page, search]);

    const loadLeaves = async () => {
        setLoading(true);
        try {
            const response = await getLeaves(page, search);
            setLeaves(response.data);
            setTotalPages(Math.ceil(response.total / 5));
        } catch (error) {
            console.error(error);
            toast.error("Failed to load leave requests");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveLeave = async (values, { resetForm }) => {
        try {
            const leaveData = {
                employee_id: role === "employee" ? undefined : Number(values.employee_id),
                leave_type: values.leave_type,
                start_date: values.start_date,
                end_date: values.end_date,
                reason: values.reason,
                status: role === "employee" ? undefined : values.status
            };

            if (editingLeave) {
                await updateLeave(editingLeave.id, leaveData);
                toast.success("Leave Request Updated Successfully");
            } else {
                await createLeave(leaveData);
                toast.success("Leave Request Submitted Successfully");
            }

            setIsModalOpen(false);
            setEditingLeave(null);
            resetForm();
            loadLeaves();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Operation Failed");
        }
    };

    const handleEditLeave = (leave) => {
        setEditingLeave(leave);
        setIsModalOpen(true);
    };

    const handleDeleteLeave = async (id) => {
        if (!window.confirm("Are you sure you want to delete this leave request?")) {
            return;
        }
        try {
            await deleteLeave(id);
            toast.success("Leave Request Deleted successfully");
            loadLeaves();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete leave request");
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Leave Management</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                        {role === "employee" ? "Apply for leave and monitor status." : "Monitor and approve employee leave requests."}
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditingLeave(null); setIsModalOpen(true); }}>
                    <FaPlus /> Apply for Leave
                </button>
            </div>

            {/* Filter Card */}
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 1.5rem', marginBottom: '2rem' }}>
                <div className="search-box" style={{ flex: 1 }}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search leave logs by Employee ID..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <DataTable
                        columns={["id", "employee_id", "leave_type", "start_date", "end_date", "status"]}
                        data={leaves}
                        onEdit={role === "employee" ? undefined : handleEditLeave}
                        onDelete={role === "employee" ? undefined : handleDeleteLeave}
                    />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Page {page} of {totalPages}</span>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    Previous
                                </button>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    disabled={page === totalPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingLeave(null); }}
                title={editingLeave ? "Edit Leave Request" : "Apply for Leave"}
            >
                <Formik
                    initialValues={{
                        employee_id: editingLeave?.employee_id || "",
                        leave_type: editingLeave?.leave_type || "Casual",
                        start_date: editingLeave?.start_date ? editingLeave.start_date.split("T")[0] : "",
                        end_date: editingLeave?.end_date ? editingLeave.end_date.split("T")[0] : "",
                        reason: editingLeave?.reason || "",
                        status: editingLeave?.status || "Pending"
                    }}
                    validationSchema={leaveSchema}
                    validationContext={{ role }}
                    onSubmit={handleSaveLeave}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {role !== "employee" && (
                                <div className="form-group">
                                    <label className="form-label">Employee ID</label>
                                    <Field type="number" name="employee_id" className="form-control" placeholder="Enter Employee ID" />
                                    <ErrorMessage name="employee_id" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">Leave Type</label>
                                <Field as="select" name="leave_type" className="form-control">
                                    <option value="Casual">Casual</option>
                                    <option value="Sick">Sick</option>
                                    <option value="Earned">Earned</option>
                                </Field>
                                <ErrorMessage name="leave_type" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Start Date</label>
                                <Field type="date" name="start_date" className="form-control" />
                                <ErrorMessage name="start_date" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">End Date</label>
                                <Field type="date" name="end_date" className="form-control" />
                                <ErrorMessage name="end_date" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Reason</label>
                                <Field as="textarea" name="reason" className="form-control" placeholder="Describe the reason for leave" rows="3" />
                                <ErrorMessage name="reason" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            {role !== "employee" && (
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <Field as="select" name="status" className="form-control">
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </Field>
                                    <ErrorMessage name="status" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                                </div>
                            )}

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "2rem" }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setIsModalOpen(false); setEditingLeave(null); }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {editingLeave ? "Update Request" : "Submit Request"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}

export default Leaves;