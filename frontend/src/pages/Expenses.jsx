import {
    useEffect,
    useState
} from "react";

import DataTable
from "../components/DataTable";

import {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} from "../api/expenseApi";

import Navbar
from "../components/Navbar";

function Expenses() {

    const [expenses,
        setExpenses] =
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

    const [employeeId,
        setEmployeeId] =
        useState("");

    const [claimTitle,
        setClaimTitle] =
        useState("");

    const [amount,
        setAmount] =
        useState("");

    const [billAttachment,
        setBillAttachment] =
        useState("");

    const [status,
        setStatus] =
        useState("Pending");

    useEffect(() => {

        loadExpenses();

    }, [page, search]);

    const loadExpenses =
    async () => {

        try {

            const response =
                await getExpenses(
                    page,
                    10,
                    search
                );

            setExpenses(
                response.data
            );

            setTotalPages(
                response.total_pages
            );

        } catch (error) {

            console.error(error);

        }

    };

    const handleSaveExpense =
    async () => {

        try {

            const expenseData = {

                employee_id:
                    employeeId,

                claim_title:
                    claimTitle,

                amount,

                bill_attachment:
                    billAttachment,

                status

            };

            if (
                editingId
            ) {

                await updateExpense(
                    editingId,
                    expenseData
                );

                alert(
                    "Expense Updated Successfully"
                );

            } else {

                await createExpense(
                    expenseData
                );

                alert(
                    "Expense Created Successfully"
                );

            }

            setEditingId(null);

            setEmployeeId("");
            setClaimTitle("");
            setAmount("");
            setBillAttachment("");
            setStatus("Pending");

            loadExpenses();

        } catch (error) {

            console.error(error);

            alert(
                "Operation Failed"
            );

        }

    };

    const handleEditExpense =
    (
        expense
    ) => {

        setEditingId(
            expense.id
        );

        setEmployeeId(
            expense.employee_id
        );

        setClaimTitle(
            expense.claim_title
        );

        setAmount(
            expense.amount
        );

        setBillAttachment(
            expense.bill_attachment
        );

        setStatus(
            expense.status
        );

    };

    const handleDeleteExpense =
    async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete this expense?"
            );

        if (
            !confirmDelete
        ) {

            return;

        }

        try {

            await deleteExpense(
                id
            );

            alert(
                "Expense deleted successfully"
            );

            loadExpenses();

        } catch (error) {

            console.error(error);

            alert(
                "Delete failed"
            );

        }

    };

    return (
        <>
        <Navbar/>

        <div>

            <h1>
                Expense Claims
            </h1>

            <h3>
                Add Expense
            </h3>

            <input
                type="number"
                placeholder="Employee ID"
                value={employeeId}
                onChange={(e) =>
                    setEmployeeId(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                type="text"
                placeholder="Claim Title"
                value={claimTitle}
                onChange={(e) =>
                    setClaimTitle(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                    setAmount(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                type="text"
                placeholder="Bill Attachment"
                value={billAttachment}
                onChange={(e) =>
                    setBillAttachment(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <select
                value={status}
                onChange={(e) =>
                    setStatus(
                        e.target.value
                    )
                }
            >

                <option>
                    Pending
                </option>

                <option>
                    Approved
                </option>

                <option>
                    Rejected
                </option>

            </select>

            <br /><br />

            <button
                onClick={
                    handleSaveExpense
                }
            >
                {
                    editingId
                    ? "Update Expense"
                    : "Add Expense"
                }
            </button>

            <br /><br />

            <input
                type="text"
                placeholder="Search Expense"
                value={search}
                onChange={(e) => {

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
                    "employee_id",
                    "claim_title",
                    "amount",
                    "status"
                ]}
                data={expenses}
                onEdit={
                    handleEditExpense
                }
                onDelete={
                    handleDeleteExpense
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

export default Expenses;