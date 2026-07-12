import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { attendanceSchema } from "../validations/attendanceValidation";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { getAttendance, createAttendance, updateAttendance, deleteAttendance, markAttendance } from "../api/attendanceApi";
import { toast } from "react-toastify";
import { FaPlus, FaSearch, FaCheck } from "react-icons/fa";

function Attendance() {
    const role = localStorage.getItem("role");
    const [attendance, setAttendance] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [attendanceMarked, setAttendanceMarked] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAttendance, setEditingAttendance] = useState(null);

    useEffect(() => {
        loadAttendance();
    }, [page, search]);

    const loadAttendance = async () => {
        setLoading(true);
        try {
            const response = await getAttendance(page, search);
            setAttendance(response.data);
            setTotalPages(Math.ceil(response.total / 5));
        } catch (error) {
            console.error(error);
            toast.error("Failed to load attendance records");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAttendance = async (values, { resetForm }) => {
        try {
            const attendanceData = {
                employee_id: values.employee_id,
                attendance_date: values.attendance_date,
                status: values.status
            };

            if (editingAttendance) {
                await updateAttendance(editingAttendance.id, attendanceData);
                toast.success("Attendance Updated Successfully");
            } else {
                await createAttendance(attendanceData);
                toast.success("Attendance Logged Successfully");
            }

            setIsModalOpen(false);
            setEditingAttendance(null);
            resetForm();
            loadAttendance();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Operation Failed");
        }
    };

    const handleMarkAttendance = async () => {
        try {
            const response = await markAttendance();
            toast.success(response.message);
            loadAttendance();
            setAttendanceMarked(true);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to mark attendance");
        }
    };

    const handleEditAttendance = (record) => {
        setEditingAttendance(record);
        setIsModalOpen(true);
    };

    const handleDeleteAttendance = async (id) => {
        if (!window.confirm("Are you sure you want to delete this attendance log?")) {
            return;
        }
        try {
            await deleteAttendance(id);
            toast.success("Attendance Log Deleted successfully");
            loadAttendance();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete attendance log");
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Attendance Logs</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                        Monitor employee attendance and log status updates.
                    </p>
                </div>
                <div className="page-header-actions" style={{ display: "flex", gap: "0.75rem" }}>
                    <button
                        className="btn btn-secondary"
                        disabled={attendanceMarked}
                        onClick={handleMarkAttendance}
                        style={{ boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.2)" }}
                    >
                        <FaCheck /> {attendanceMarked ? "Attendance Marked" : "Mark Present Today"}
                    </button>
                    {(role === "admin" || role === "hr") && (
                        <button className="btn btn-primary" onClick={() => { setEditingAttendance(null); setIsModalOpen(true); }}>
                            <FaPlus /> Log Attendance
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Card */}
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 1.5rem', marginBottom: '2rem' }}>
                <div className="search-box" style={{ flex: 1 }}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search logs by Employee ID..."
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
                        columns={["id", "employee_id", "attendance_date", "status"]}
                        data={attendance}
                        onEdit={(role === "admin" || role === "hr") ? handleEditAttendance : undefined}
                        onDelete={(role === "admin" || role === "hr") ? handleDeleteAttendance : undefined}
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
                onClose={() => { setIsModalOpen(false); setEditingAttendance(null); }}
                title={editingAttendance ? "Edit Attendance Log" : "Log Attendance Record"}
            >
                <Formik
                    initialValues={{
                        employee_id: editingAttendance?.employee_id || "",
                        attendance_date: editingAttendance?.attendance_date ? editingAttendance.attendance_date.split("T")[0] : "",
                        status: editingAttendance?.status || "Present"
                    }}
                    validationSchema={attendanceSchema}
                    onSubmit={handleSaveAttendance}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label className="form-label">Employee ID</label>
                                <Field type="number" name="employee_id" className="form-control" placeholder="Enter Employee ID" />
                                <ErrorMessage name="employee_id" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Attendance Date</label>
                                <Field type="date" name="attendance_date" className="form-control" />
                                <ErrorMessage name="attendance_date" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <Field as="select" name="status" className="form-control">
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    <option value="Half Day">Half Day</option>
                                    <option value="Leave">Leave</option>
                                </Field>
                                <ErrorMessage name="status" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "2rem" }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setIsModalOpen(false); setEditingAttendance(null); }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {editingAttendance ? "Update Record" : "Log Record"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}

export default Attendance;