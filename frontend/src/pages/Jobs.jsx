import {
    useEffect,
    useState
} from "react";

import DataTable
from "../components/DataTable";

import {
    getJobs,
    createJob,
    deleteJob,
    updateJob
} from "../api/jobApi";

import Navbar
from "../components/Navbar";

function Jobs() {

   const [jobs,
    setJobs] =
    useState([]);

const [page,
    setPage] =
    useState(1);

const [totalPages,
    setTotalPages] =
    useState(1);

    const [search,
        setSearch] =
        useState("");

        const [jobTitle,
    setJobTitle] =
    useState("");

const [departmentId,
    setDepartmentId] =
    useState("");

const [experienceRequired,
    setExperienceRequired] =
    useState("");

const [jobDescription,
    setJobDescription] =
    useState("");

const [status,
    setStatus] =
    useState("Open");

    const [editingId,
    setEditingId] =
    useState(null);

    useEffect(() => {

        loadJobs();

    }, [search,page]);

    const loadJobs =
    async () => {

        try {

            const response =
                await getJobs(
                    page,
                    10,
                    search
                );

            setJobs(
                response.data
            );
            setTotalPages(
    response.total_pages
);

        } catch (error) {

            console.error(
                error
            );

        }

    };

const handleSaveJob =
async () => {

    try {

        const jobData = {

            job_title:
                jobTitle,

            department_id:
                departmentId,

            experience_required:
                experienceRequired,

            job_description:
                jobDescription,

            status

        };

        if (
            editingId
        ) {

            await updateJob(
                editingId,
                jobData
            );

            alert(
                "Job Updated Successfully"
            );

        } else {

            await createJob(
                jobData
            );

            alert(
                "Job Created Successfully"
            );

        }

        setEditingId(null);

        setJobTitle("");
        setDepartmentId("");
        setExperienceRequired("");
        setJobDescription("");
        setStatus("Open");

        loadJobs();

    } catch (error) {

        console.error(error);

        alert(
            "Operation Failed"
        );

    }

};

const handleDeleteJob =
async (
    id
) => {

    const confirmDelete =
        window.confirm(
            "Delete this job?"
        );

    if (
        !confirmDelete
    ) {
        return;
    }

    try {

        await deleteJob(id);

        loadJobs();

        alert(
            "Job deleted successfully"
        );

    } catch (error) {

        console.error(
            error
        );

        alert(
            "Failed to delete job"
        );

    }

};

const handleEditJob =
(
    job
) => {

    setEditingId(
        job.id
    );

    setJobTitle(
        job.job_title
    );

    setDepartmentId(
        job.department_id
    );

    setExperienceRequired(
        job.experience_required
    );

    setJobDescription(
        job.job_description
    );

    setStatus(
        job.status
    );

};

    return (
        <>
        <Navbar/>
        <div>

            <h1>
                Jobs Module
            </h1>

            <div
    style={{
        marginBottom:"30px"
    }}
>

    <h3>
        Add Job
    </h3>

    <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e)=>
            setJobTitle(
                e.target.value
            )
        }

        
    />

    <br /><br />

    <input
        type="number"
        placeholder="Department ID"
        value={departmentId}
        onChange={(e)=>
            setDepartmentId(
                e.target.value
            )
        }
    />

    <br /><br />

    <input
        type="text"
        placeholder="Experience Required"
        value={experienceRequired}
        onChange={(e)=>
            setExperienceRequired(
                e.target.value
            )
        }
    />

    <br /><br />

    <textarea
        placeholder="Job Description"
        value={jobDescription}
        onChange={(e)=>
            setJobDescription(
                e.target.value
            )
        }
    />

    <br /><br />

    <select
        value={status}
        onChange={(e)=>
            setStatus(
                e.target.value
            )
        }
    >
        <option>
            Open
        </option>

        <option>
            Closed
        </option>

    </select>

    <br /><br />

   <button
    onClick={
        handleSaveJob
    }
>
    {
        editingId
        ? "Update Job"
        : "Add Job"
    }
</button>

</div>

            <input
                type="text"
                placeholder="Search Jobs..."
                value={search}
             onChange={(e) => {

    setSearch(
        e.target.value
    );

    setPage(1);

}}
                style={{
                    padding: "10px",
                    marginBottom: "20px",
                    width: "300px"
                }}
            />

          <DataTable
    columns={[
        "id",
        "job_title",
        "status"
    ]}
    data={jobs}
    onDelete={
        handleDeleteJob
    }
    onEdit={
        handleEditJob
    }
/>
            <div
    style={{
        marginTop:"20px",
        display:"flex",
        gap:"10px",
        alignItems:"center"
    }}
>

    <button
        disabled={
            page === 1
        }
        onClick={() =>
            setPage(
                page - 1
            )
        }
    >
        Previous
    </button>

    <span>
        Page {page} of {totalPages}
    </span>

    <button
        disabled={
            page === totalPages
        }
        onClick={() =>
            setPage(
                page + 1
            )
        }
    >
        Next
    </button>

</div>

        </div>
        </>
    );

}

export default Jobs;