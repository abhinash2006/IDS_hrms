import {
    useEffect,
    useState
} from "react";

import DataTable
from "../components/DataTable";

import {
    getCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate
} from "../api/candidateApi";

import Navbar
from "../components/Navbar";

function Candidates() {

    const [candidates,
        setCandidates] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    const [page,
        setPage] =
        useState(1);

    const [totalPages,
        setTotalPages] =
        useState(1);

        const [firstName,
    setFirstName] =
    useState("");

const [lastName,
    setLastName] =
    useState("");

const [email,
    setEmail] =
    useState("");

const [mobile,
    setMobile] =
    useState("");

const [resume,
    setResume] =
    useState(null);

const [applicationStatus,
    setApplicationStatus] =
    useState("Applied");

const [editingId,
    setEditingId] =
    useState(null);

    useEffect(() => {

        loadCandidates();

    }, [page, search]);

    const loadCandidates =
    async () => {

        try {

            const response =
                await getCandidates(
                    page,
                    10,
                    search
                );

            setCandidates(
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

    const handleSaveCandidate =
async () => {

    try {

        const formData =
            new FormData();

        formData.append(
            "first_name",
            firstName
        );

        formData.append(
            "last_name",
            lastName
        );

        formData.append(
            "email",
            email
        );

        formData.append(
            "mobile",
            mobile
        );

        formData.append(
            "application_status",
            applicationStatus
        );

        if (
            resume
        ) {

            formData.append(
                "resume",
                resume
            );

        }

        if (
            editingId
        ) {

            await updateCandidate(
                editingId,
                formData
            );

            alert(
                "Candidate Updated Successfully"
            );

        } else {

            await createCandidate(
                formData
            );

            alert(
                "Candidate Created Successfully"
            );

        }

        setEditingId(null);

        setFirstName("");
        setLastName("");
        setEmail("");
        setMobile("");
        setResume(null);
        setApplicationStatus(
            "Applied"
        );

        loadCandidates();

    } catch (error) {

        console.error(
            error
        );

        alert(
            "Operation Failed"
        );

    }

};

const handleEditCandidate =
(
    candidate
) => {

    setEditingId(
        candidate.id
    );

    setFirstName(
        candidate.first_name
    );

    setLastName(
        candidate.last_name
    );

    setEmail(
        candidate.email
    );

    setMobile(
        candidate.mobile
    );

    setApplicationStatus(
        candidate.application_status
    );

};

const handleDeleteCandidate =
async (
    id
) => {

    const confirmDelete =
        window.confirm(
            "Delete this candidate?"
        );

    if (
        !confirmDelete
    ) {

        return;

    }

    try {

        await deleteCandidate(
            id
        );

        alert(
            "Candidate deleted successfully"
        );

        loadCandidates();

    } catch (error) {

        console.error(
            error
        );

        alert(
            "Failed to delete candidate"
        );

    }

};
    return (
        <>
        <Navbar/>

        <div>

            <h1>
                Candidates Module
            </h1>
         <h3>
    Add Candidate
</h3>

<input
    type="text"
    placeholder="First Name"
    value={firstName}
    onChange={(e) =>
        setFirstName(
            e.target.value
        )
    }
/>

<br /><br />

<input
    type="text"
    placeholder="Last Name"
    value={lastName}
    onChange={(e) =>
        setLastName(
            e.target.value
        )
    }
/>

<br /><br />

<input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) =>
        setEmail(
            e.target.value
        )
    }
/>

<br /><br />

<input
    type="text"
    placeholder="Mobile"
    value={mobile}
    onChange={(e) =>
        setMobile(
            e.target.value
        )
    }
/>

<br /><br />

<input
    type="file"
    onChange={(e) =>
        setResume(
            e.target.files[0]
        )
    }
/>

<br /><br />

<select
    value={
        applicationStatus
    }
    onChange={(e) =>
        setApplicationStatus(
            e.target.value
        )
    }
>
    <option>
        Applied
    </option>

    <option>
        Screening
    </option>

    <option>
        Interview
    </option>

    <option>
        Selected
    </option>

    <option>
        Rejected
    </option>

</select>

<br /><br />

<button
    onClick={
        handleSaveCandidate
    }
>
    {
        editingId
        ? "Update Candidate"
        : "Add Candidate"
    }
</button>

<br />
<br />
            <input
                type="text"
                placeholder="Search Candidate"
                value={search}
                onChange={(e) => {

                    setSearch(
                        e.target.value
                    );

                    setPage(1);

                }}
            />

            <br />
            <br />

       <DataTable
    columns={[
        "id",
        "first_name",
        "last_name",
        "email",
        "application_status"
    ]}
    data={candidates}
    onEdit={
        handleEditCandidate
    }
    onDelete={
        handleDeleteCandidate
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
                Page {page} of {totalPages}
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

export default Candidates;