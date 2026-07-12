import {
    useEffect,
    useState
} from "react";



import DataTable
from "../components/DataTable";

import "../styles/Interviews.css";

import {
    getInterviews,
    createInterview,
    updateInterview,
    deleteInterview
} from "../api/interviewApi";

import {
    toast
} from "react-toastify";

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

                toast.success(
                    "Interview Updated Successfully"
                );

            } else {

                await createInterview(
                    interviewData
                );

               toast.success(
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

            toast.error(
                error.response?.data?.message || "Operation Failed"
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

            toast.success(
                "Interview deleted successfully"
            );

            loadInterviews();

        } catch (error) {

            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to delete interview"
            );

        }

    };

    return (
  <div className="interviews-page">

    <div className="interview-header">
      <h1>Interview Scheduling</h1>

      <p>
        Schedule and manage candidate interviews.
      </p>
    </div>

    <div className="interview-form-card">

      <div className="interview-form-grid">

        <input
          type="number"
          placeholder="Candidate ID"
          value={candidateId}
          onChange={(e) =>
            setCandidateId(
              e.target.value
            )
          }
        />

        <input
          type="date"
          value={interviewDate}
          onChange={(e) =>
            setInterviewDate(
              e.target.value
            )
          }
        />

        <input
          type="time"
          value={interviewTime}
          onChange={(e) =>
            setInterviewTime(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Interviewer Name"
          value={interviewerName}
          onChange={(e) =>
            setInterviewerName(
              e.target.value
            )
          }
        />

        <select
          value={interviewMode}
          onChange={(e) =>
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

        <select
          value={status}
          onChange={(e) =>
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

      </div>

      <div className="interview-actions">

        <button
          className="btn btn-primary"
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

      </div>

    </div>

    <div className="interview-search-card">

      <input
        type="text"
        placeholder="Search interviews..."
        value={search}
        onChange={(e) => {

          setSearch(
            e.target.value
          );

          setPage(1);

        }}
      />

    </div>

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

    <div className="interview-pagination">

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
        Page {page}
        {" "}
        of
        {" "}
        {totalPages}
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
);

}

export default Interviews;