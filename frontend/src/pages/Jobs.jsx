import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { jobSchema } from "../validations/jobValidation";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { getJobs, createJob, deleteJob, updateJob } from "../api/jobApi";
import { toast } from "react-toastify";
import { FaPlus, FaSearch } from "react-icons/fa";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    useEffect(() => {
        loadJobs();
    }, [search, page]);

    const loadJobs = async () => {
        setLoading(true);
        try {
            const response = await getJobs(page, 10, search);
            setJobs(response.data);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveJob = async (values, { resetForm }) => {
        try {
            if (editingJob) {
                await updateJob(editingJob.id, values);
                toast.success("Job updated successfully");
            } else {
                await createJob(values);
                toast.success("Job created successfully");
            }
            setIsModalOpen(false);
            setEditingJob(null);
            resetForm();
            loadJobs();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    const handleEditJob = (job) => {
        setEditingJob(job);
        setIsModalOpen(true);
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job posting?")) {
            return;
        }
        try {
            await deleteJob(id);
            toast.success("Job posting deleted successfully");
            loadJobs();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete job");
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>Job Postings</h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                        Manage job vacancies and requisitions for recruitment.
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditingJob(null); setIsModalOpen(true); }}>
                    <FaPlus /> Post Job
                </button>
            </div>

            {/* Filter Card */}
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 1.5rem', marginBottom: '2rem' }}>
                <div className="search-box" style={{ flex: 1 }}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search jobs by title..."
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
                        columns={["id", "job_title", "experience_required", "status"]}
                        data={jobs}
                        onEdit={handleEditJob}
                        onDelete={handleDeleteJob}
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
                onClose={() => { setIsModalOpen(false); setEditingJob(null); }}
                title={editingJob ? "Edit Job Vacancy" : "Create New Job Vacancy"}
            >
                <Formik
                    initialValues={{
                        job_title: editingJob?.job_title || "",
                        department_id: editingJob?.department_id || "",
                        experience_required: editingJob?.experience_required || "",
                        job_description: editingJob?.job_description || "",
                        status: editingJob?.status || "Open"
                    }}
                    validationSchema={jobSchema}
                    onSubmit={handleSaveJob}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label className="form-label">Job Title</label>
                                <Field type="text" name="job_title" className="form-control" placeholder="e.g. Senior Software Engineer" />
                                <ErrorMessage name="job_title" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Department ID</label>
                                <Field type="number" name="department_id" className="form-control" placeholder="Enter department reference ID" />
                                <ErrorMessage name="department_id" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Experience Required</label>
                                <Field type="text" name="experience_required" className="form-control" placeholder="e.g. 3-5 Years" />
                                <ErrorMessage name="experience_required" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Job Description</label>
                                <Field as="textarea" name="job_description" className="form-control" rows="5" placeholder="Enter full job specifications..." />
                                <ErrorMessage name="job_description" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <Field as="select" name="status" className="form-control">
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                </Field>
                                <ErrorMessage name="status" component="div" style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }} />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "2rem" }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setIsModalOpen(false); setEditingJob(null); }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {editingJob ? "Update Job" : "Post Job"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}

export default Jobs;