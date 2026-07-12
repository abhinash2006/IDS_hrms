import {
    useEffect,
    useState
} from "react";

import "../styles/Payroll.css";
import Modal from "../components/Modal";

import DataTable
from "../components/DataTable";
import {
    downloadPayslip
}
from "../api/payslipApi";
import {
    getPayrolls,
    createPayroll,
    updatePayroll,
    deletePayroll
}
from "../api/payrollApi";

import {
    toast
} from "react-toastify";

function Payroll() {

    const role =
JSON.parse(
    atob(
        localStorage
        .getItem("token")
        .split(".")[1]
    )
).role;

    const [payrolls,
        setPayrolls] =
        useState([]);

    const [editingId,
        setEditingId] =
        useState(null);

        const [isModalOpen,
    setIsModalOpen] =
    useState(false);

    const [employeeId,
        setEmployeeId] =
        useState("");

    const [basicSalary,
        setBasicSalary] =
        useState("");

    const [hra,
        setHra] =
        useState("");

    const [bonus,
        setBonus] =
        useState("");

    const [deductions,
        setDeductions] =
        useState("");

    const [payrollMonth,
        setPayrollMonth] =
        useState("");

    const [payrollYear,
        setPayrollYear] =
        useState("");

        const [search,
    setSearch] =
    useState("");

const [page,
    setPage] =
    useState(1);

const [totalPages,
    setTotalPages] =
    useState(1);

   useEffect(() => {

    loadPayrolls();

}, [
    page,
    search
]);

    const loadPayrolls =
    async () => {

        try {

           const response =
    await getPayrolls(
        page,
        search
    );

           setPayrolls(
    response.data
);

setTotalPages(
    Math.ceil(
        response.total / 5
    )
);

        } catch(error){

            console.error(
                error
            );

        }

    };

    const handleSavePayroll =
    async () => {

        try {

            const payrollData = {

                employee_id:
                    employeeId,

                basic_salary:
                    basicSalary,

                hra,

                bonus,

                deductions,

                payroll_month:
                    payrollMonth,

                payroll_year:
                    payrollYear

            };

            if (
                editingId
            ) {

                await updatePayroll(
                    editingId,
                    payrollData
                );

                toast.success(
                    "Payroll Updated"
                );

            } else {

                await createPayroll(
                    payrollData
                );

                toast.success(
                    "Payroll Created"
                );

            }

            setEditingId(
                null
            );

            setEmployeeId("");
            setBasicSalary("");
            setHra("");
            setBonus("");
            setDeductions("");
            setPayrollMonth("");
            setPayrollYear("");

            loadPayrolls();

        } catch(error){

            console.error(
                error
            );

           toast.error(
                error.response?.data?.message || "Operation Failed"
            );

        }

    };

    const handleEditPayroll =
    (
        payroll
    ) => {

        setEditingId(
            payroll.id
        );

        setEmployeeId(
            payroll.employee_id
        );

        setBasicSalary(
            payroll.basic_salary
        );

        setHra(
            payroll.hra
        );

        setBonus(
            payroll.bonus
        );

        setDeductions(
            payroll.deductions
        );

        setPayrollMonth(
            payroll.payroll_month
        );

        setPayrollYear(
            payroll.payroll_year
        );

        setIsModalOpen(true);

    };

    const handleDeletePayroll =
    async (
        id
    ) => {

        if(
            !window.confirm(
                "Delete Payroll?"
            )
        ){
            return;
        }

        try {

            await deletePayroll(
                id
            );

            toast.success("Payroll Deleted Successfully");
            loadPayrolls();

        } catch(error){

            console.error(
                error
            );
            toast.error(
                error.response?.data?.message || "Failed to delete payroll"
            );

        }

    };

   return (

    <div>

        <div className="payroll-header">

    <h1>
        Payroll Management
    </h1>

    {
        role !== "employee" && (

            <button
                className="payroll-add-btn"
                onClick={() => {

                    setEditingId(null);

                    setEmployeeId("");
                    setBasicSalary("");
                    setHra("");
                    setBonus("");
                    setDeductions("");
                    setPayrollMonth("");
                    setPayrollYear("");

                    setIsModalOpen(true);
                }}
            >
                + Create Payroll
            </button>

        )
    }

</div>

{
    role !== "employee" && (

        <Modal
            isOpen={isModalOpen}
            onClose={() =>
                setIsModalOpen(false)
            }
            title={
                editingId
                    ? "Update Payroll"
                    : "Create Payroll"
            }
        >

            <div className="payroll-form">

                <input
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={(e) =>
                        setEmployeeId(
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Basic Salary"
                    value={basicSalary}
                    onChange={(e) =>
                        setBasicSalary(
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="HRA"
                    value={hra}
                    onChange={(e) =>
                        setHra(
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Bonus"
                    value={bonus}
                    onChange={(e) =>
                        setBonus(
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Deductions"
                    value={deductions}
                    onChange={(e) =>
                        setDeductions(
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Month"
                    value={payrollMonth}
                    onChange={(e) =>
                        setPayrollMonth(
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Year"
                    value={payrollYear}
                    onChange={(e) =>
                        setPayrollYear(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={
                        handleSavePayroll
                    }
                >
                    {
                        editingId
                            ? "Update Payroll"
                            : "Create Payroll"
                    }
                </button>

            </div>

        </Modal>

    )
}
       <input
    className="payroll-search"
    type="text"
    placeholder="Search payroll by Employee ID..."
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
        "basic_salary",
        "net_salary",
        "payroll_month",
        "payroll_year"
    ]}
    data={payrolls}
    onEdit={
        role !== "employee"
            ? handleEditPayroll
            : undefined
    }
    onDelete={
        role !== "employee"
            ? handleDeletePayroll
            : undefined
    }
    onDownload={
        downloadPayslip
    }
/>

        <br />

       <div className="payroll-pagination">

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

export default Payroll;