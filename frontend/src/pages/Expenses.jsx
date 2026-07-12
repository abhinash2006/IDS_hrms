import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { expenseSchema } from "../validations/expenseValidation";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../api/expenseApi";
import { toast } from "react-toastify";
import { FaPlus, FaSearch } from "react-icons/fa";

function Expenses() {
    const role = localStorage.getItem("role");
    const [expenses, setExpenses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        loadExpenses();
    }, [page, search]);

    const loadExpenses = async () => {
        setLoading(true);
        try {
            const response = await getExpenses(page, 10, search);
            setExpenses(response.data);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load expense claims");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveExpense = async (values, { resetForm }) => {
        try {
            if (editingExpense) {
                // If editing, check role. Employees only update details if Pending.
                // HR/Admin can update status or details.
                const updatedData = { ...values };
                if (role === "employee") {
                    delete updatedData.status; // backend handles putting it back to pending or keeping it
                }
                await updateExpense(editingExpense.id, updatedData);
                toast.success("Expense updated successfully");
            } else {
                const newData = { ...values };
                if (role === "employee") {
                    newData.status = "Pending";
                }
                await createExpense(newData);
                toast.success("Expense raised successfully");
            }
            setIsModalOpen(false);
            setEditingExpense(null);
            resetForm();
            loadExpenses();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    const handleEditExpense = (expense) => {
        if (role === "employee" && expense.status !== "Pending") {
            toast.error("You cannot modify an approved or rejected expense claim");
            return;
        }
        setEditingExpense(expense);
        setIsModalOpen(true);
    };

    const handleDeleteExpense = async (id) => {
        const claim = expenses.find(e => e.id === id);
        if (role === "employee" && claim && claim.status !== "Pending") {
            toast.error("You cannot delete an approved or rejected expense claim");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this expense claim?")) {
            return;
        }
        try {
            await deleteExpense(id);
            toast.success("Expense claim deleted successfully");
            loadExpenses();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete expense claim");
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Expense Claims</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                        {role === "employee" ? "Submit and track your expense reimbursement claims." : "Review and process employee expense reimbursement requests."}
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditingExpense(null); setIsModalOpen(true); }}>
                    <FaPlus /> {role === "employee" ? "Raise Claim" : "Add Expense"}
                </button>
            </div>

            {/* Filter Card */}
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 1.5rem', marginBottom: '2rem' }}>
                <div className="search-box" style={{ flex: 1 }}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search claims by title or status..."
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
                        columns={role === "employee" ? ["id", "claim_title", "amount", "status"] : ["id", "employee_id", "claim_title", "amount", "status"]}
                        data={expenses}
                        onEdit={handleEditExpense}
                        onDelete={handleDeleteExpense}
                    />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination-container">
                            <span>Page {page} of {totalPages}</span>
                            <div className="pagination-buttons">
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
                onClose={() => { setIsModalOpen(false); setEditingExpense(null); }}
                title={editingExpense ? "Edit Expense Claim" : "Raise Expense Claim"}
            >
                <Formik
                    initialValues={{
                        employee_id: editingExpense?.employee_id || "",
                        claim_title: editingExpense?.claim_title || "",
                        amount: editingExpense?.amount || "",
                        bill_attachment: editingExpense?.bill_attachment || "",
                        status: editingExpense?.status || "Pending"
                    }}
                    validationSchema={expenseSchema}
                    onSubmit={handleSaveExpense}
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
                                <label className="form-label">Claim Title</label>
                                <Field type="text" name="claim_title" className="form-control" placeholder="e.g. Travel Allowance" />
                                <ErrorMessage name="claim_title" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Amount (INR)</label>
                                <Field type="text" name="amount" className="form-control" placeholder="Enter claim amount" />
                                <ErrorMessage name="amount" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bill Attachment URL/Path</label>
                                <Field type="text" name="bill_attachment" className="form-control" placeholder="URL or path of receipt" />
                                <ErrorMessage name="bill_attachment" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
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
                                    onClick={() => { setIsModalOpen(false); setEditingExpense(null); }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {editingExpense ? "Update Claim" : "Submit Claim"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}

export default Expenses;