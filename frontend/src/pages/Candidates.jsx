import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { candidateSchema } from "../validations/candidateValidation";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { getCandidates, createCandidate, updateCandidate, deleteCandidate } from "../api/candidateApi";
import { createOffer } from "../api/offerApi";
import { toast } from "react-toastify";
import { FaPlus, FaSearch } from "react-icons/fa";

function Candidates() {
    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCandidate, setEditingCandidate] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        loadCandidates();
    }, [page, search]);

    const loadCandidates = async () => {
        setLoading(true);
        try {
            const response = await getCandidates(page, 10, search);
            setCandidates(response.data);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load candidates");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCandidate = async (values, { resetForm }) => {
        try {
            const formData = new FormData();
            formData.append("first_name", values.first_name);
            formData.append("last_name", values.last_name);
            formData.append("email", values.email);
            formData.append("mobile", values.mobile);
            formData.append("application_status", values.application_status);

            if (resumeFile) {
                formData.append("resume", resumeFile);
            }

            if (editingCandidate) {
                await updateCandidate(editingCandidate.id, formData);
                toast.success("Candidate details updated successfully");
            } else {
                await createCandidate(formData);
                toast.success("Candidate registered successfully");
            }

            setIsModalOpen(false);
            setEditingCandidate(null);
            setResumeFile(null);
            resetForm();
            loadCandidates();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    const handleEditCandidate = (candidate) => {
        setEditingCandidate(candidate);
        setResumeFile(null);
        setIsModalOpen(true);
    };

    const handleGenerateOffer = async (candidate) => {
        try {
            const offerData = {
                candidate_id: candidate.id,
                offer_title: "Software Engineer",
                joining_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
                salary: 850000,
                offer_status: "Draft"
            };

            await createOffer(offerData);
            toast.success(`Draft offer letter generated for ${candidate.first_name}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate offer letter");
        }
    };

    const handleDeleteCandidate = async (id) => {
        if (!window.confirm("Are you sure you want to delete this candidate record?")) {
            return;
        }
        try {
            await deleteCandidate(id);
            toast.success("Candidate record deleted successfully");
            loadCandidates();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete candidate");
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Candidates Management</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                        Track applicant statuses, upload resumes, and issue offer letters.
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditingCandidate(null); setResumeFile(null); setIsModalOpen(true); }}>
                    <FaPlus /> Add Candidate
                </button>
            </div>

            {/* Filter Card */}
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 1.5rem', marginBottom: '2rem' }}>
                <div className="search-box" style={{ flex: 1 }}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search candidates by name or email..."
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
                    <div className="table-container">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                                            No candidates found
                                        </td>
                                    </tr>
                                ) : (
                                    candidates.map((cand) => (
                                        <tr key={cand.id}>
                                            <td>{cand.id}</td>
                                            <td>{cand.first_name}</td>
                                            <td>{cand.last_name}</td>
                                            <td>{cand.email}</td>
                                            <td>
                                                <span className={`badge ${
                                                    cand.application_status === 'Selected' ? 'badge-approved' : 
                                                    cand.application_status === 'Rejected' ? 'badge-rejected' : 'badge-pending'
                                                }`}>
                                                    {cand.application_status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => handleEditCandidate(cand)}
                                                    >
                                                        Edit
                                                    </button>
                                                    {cand.application_status === "Selected" && (
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => handleGenerateOffer(cand)}
                                                        >
                                                            Generate Offer
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteCandidate(cand.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

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
                onClose={() => { setIsModalOpen(false); setEditingCandidate(null); }}
                title={editingCandidate ? "Edit Candidate Profile" : "Register New Candidate"}
            >
                <Formik
                    initialValues={{
                        first_name: editingCandidate?.first_name || "",
                        last_name: editingCandidate?.last_name || "",
                        email: editingCandidate?.email || "",
                        mobile: editingCandidate?.mobile || "",
                        application_status: editingCandidate?.application_status || "Applied"
                    }}
                    validationSchema={candidateSchema}
                    onSubmit={handleSaveCandidate}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <Field type="text" name="first_name" className="form-control" placeholder="Enter first name" />
                                <ErrorMessage name="first_name" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <Field type="text" name="last_name" className="form-control" placeholder="Enter last name" />
                                <ErrorMessage name="last_name" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <Field type="email" name="email" className="form-control" placeholder="candidate@example.com" />
                                <ErrorMessage name="email" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Mobile Number</label>
                                <Field type="text" name="mobile" className="form-control" placeholder="e.g. +91 98765 43210" />
                                <ErrorMessage name="mobile" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Resume Attachment</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />
                                {editingCandidate?.resume_path && (
                                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                                        Current file: {editingCandidate.resume_path}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Application Status</label>
                                <Field as="select" name="application_status" className="form-control">
                                    <option value="Applied">Applied</option>
                                    <option value="Screening">Screening</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Rejected">Rejected</option>
                                </Field>
                                <ErrorMessage name="application_status" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "2rem" }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setIsModalOpen(false); setEditingCandidate(null); }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {editingCandidate ? "Update Candidate" : "Register Candidate"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}

export default Candidates;