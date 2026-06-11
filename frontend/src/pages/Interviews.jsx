import {
    useEffect,
    useState
} from "react";

import Navbar
from "../components/Navbar";

import DataTable
from "../components/DataTable";

import {
    getInterviews,
    createInterview,
    updateInterview,
    deleteInterview
} from "../api/interviewApi";

function Interviews() {

    const [interviews,
        setInterviews] =
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

    const [editingId,
        setEditingId] =
        useState(null);

    const [candidateId,
        setCandidateId] =
        useState("");

    const [interviewDate,
        setInterviewDate] =
        useState("");

    const [interviewTime,
        setInterviewTime] =
        useState("");

    const [interviewerName,
        setInterviewerName] =
        useState("");

    const [interviewMode,
        setInterviewMode] =
        useState("Online");

    const [status,
        setStatus] =
        useState("Scheduled");

    useEffect(() => {

        loadInterviews();

    }, [page, search]);

    const loadInterviews =
    async () => {

        try {

            const response =
                await getInterviews(
                    page,
                    10,
                    search
                );

            setInterviews(
                response.data
            );

            setTotalPages(
                response.total_pages
            );

        } catch (error) {

            console.error(error);

        }

    };

    const handleSaveInterview =
    async () => {

        try {

            const interviewData = {

                candidate_id:
                    candidateId,

                interview_date:
                    interviewDate,

                interview_time:
                    interviewTime,

                interviewer_name:
                    interviewerName,

                interview_mode:
                    interviewMode,

                status

            };

            if (
                editingId
            ) {

                await updateInterview(
                    editingId,
                    interviewData
                );

                alert(
                    "Interview Updated Successfully"
                );

            } else {

                await createInterview(
                    interviewData
                );

                alert(
                    "Interview Created Successfully"
                );

            }

            setEditingId(null);

            setCandidateId("");
            setInterviewDate("");
            setInterviewTime("");
            setInterviewerName("");
            setInterviewMode("Online");
            setStatus("Scheduled");

            loadInterviews();

        } catch (error) {

            console.error(error);

            alert(
                "Operation Failed"
            );

        }

    };

    const handleEditInterview =
    (
        interview
    ) => {

        setEditingId(
            interview.id
        );

        setCandidateId(
            interview.candidate_id
        );

        setInterviewDate(
            interview.interview_date
                ?.split("T")[0]
        );

        setInterviewTime(
            interview.interview_time
        );

        setInterviewerName(
            interview.interviewer_name
        );

        setInterviewMode(
            interview.interview_mode
        );

        setStatus(
            interview.status
        );

    };

    const handleDeleteInterview =
    async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete interview?"
            );

        if (
            !confirmDelete
        ) {
            return;
        }

        try {

            await deleteInterview(id);

            alert(
                "Interview deleted successfully"
            );

            loadInterviews();

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <>
            <Navbar />

            <div>

                <h1>
                    Interview Scheduling
                </h1>

                <input
                    type="number"
                    placeholder="Candidate ID"
                    value={candidateId}
                    onChange={(e)=>
                        setCandidateId(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <input
                    type="date"
                    value={interviewDate}
                    onChange={(e)=>
                        setInterviewDate(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <input
                    type="time"
                    value={interviewTime}
                    onChange={(e)=>
                        setInterviewTime(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Interviewer Name"
                    value={interviewerName}
                    onChange={(e)=>
                        setInterviewerName(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <select
                    value={interviewMode}
                    onChange={(e)=>
                        setInterviewMode(
                            e.target.value
                        )
                    }
                >
                    <option>
                        Online
                    </option>

                    <option>
                        Offline
                    </option>

                </select>

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
                        Scheduled
                    </option>

                    <option>
                        Completed
                    </option>

                    <option>
                        Cancelled
                    </option>

                </select>

                <br /><br />

                <button
                    onClick={
                        handleSaveInterview
                    }
                >
                    {
                        editingId
                        ? "Update Interview"
                        : "Schedule Interview"
                    }
                </button>

                <br /><br />

                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e)=>{

                        setSearch(
                            e.target.value
                        );

                        setPage(1);

                    }}
                />

                <br /><br />

                <DataTable
                    columns={[
                        "id",
                        "candidate_id",
                        "interviewer_name",
                        "interview_mode",
                        "status"
                    ]}
                    data={interviews}
                    onEdit={
                        handleEditInterview
                    }
                    onDelete={
                        handleDeleteInterview
                    }
                />

                <br />

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
                    {" "}
                    Page {page}
                    {" "}
                    of
                    {" "}
                    {totalPages}
                    {" "}
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
        </>
    );

}

export default Interviews;