import {
    useEffect,
    useState
} from "react";

import DataTable
from "../components/DataTable";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
}
from "../api/employeeApi";

function Employees() {

    const [employees,
        setEmployees] =
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

    const [department,
        setDepartment] =
        useState("");

    const [designation,
        setDesignation] =
        useState("");

    const [joiningDate,
        setJoiningDate] =
        useState("");

    const [salary,
        setSalary] =
        useState("");

    const [status,
        setStatus] =
        useState("Active");

    useEffect(() => {

        loadEmployees();

    }, [page, search]);

    const loadEmployees =
    async () => {

        try {

            const response =
                await getEmployees(
                    page,
                    10,
                    search
                );

            setEmployees(
                response.data
            );

            setTotalPages(
                response.total_pages
            );

        } catch (error) {

            console.error(error);

        }

    };

    const handleSaveEmployee =
    async () => {

        try {

            const employeeData = {

                first_name:
                    firstName,

                last_name:
                    lastName,

                email,

                mobile,

                department,

                designation,

                joining_date:
                    joiningDate,

                salary,

                status

            };

            if (
                editingId
            ) {

                await updateEmployee(
                    editingId,
                    employeeData
                );

                alert(
                    "Employee Updated Successfully"
                );

            } else {

                await createEmployee(
                    employeeData
                );

                alert(
                    "Employee Created Successfully"
                );

            }

            setEditingId(null);

            setFirstName("");
            setLastName("");
            setEmail("");
            setMobile("");
            setDepartment("");
            setDesignation("");
            setJoiningDate("");
            setSalary("");
            setStatus("Active");

            loadEmployees();

        } catch (error) {

            console.error(error);

            alert(
                "Operation Failed"
            );

        }

    };

    const handleEditEmployee =
    (employee) => {

        setEditingId(
            employee.id
        );

        setFirstName(
            employee.first_name
        );

        setLastName(
            employee.last_name
        );

        setEmail(
            employee.email
        );

        setMobile(
            employee.mobile
        );

        setDepartment(
            employee.department
        );

        setDesignation(
            employee.designation
        );

        setJoiningDate(
            employee.joining_date
                ?.split("T")[0]
        );

        setSalary(
            employee.salary
        );

        setStatus(
            employee.status
        );
    };

    const handleDeleteEmployee =
    async (id) => {

        if (
            !window.confirm(
                "Delete Employee?"
            )
        ) {
            return;
        }

        await deleteEmployee(id);

        loadEmployees();
    };

    return (

        <div>

            <h1>
                Employees Module
            </h1>

            <h3>
                Add Employee
            </h3>

            <input
                placeholder="First Name"
                value={firstName}
                onChange={(e)=>
                    setFirstName(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Last Name"
                value={lastName}
                onChange={(e)=>
                    setLastName(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Email"
                value={email}
                onChange={(e)=>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Mobile"
                value={mobile}
                onChange={(e)=>
                    setMobile(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Department"
                value={department}
                onChange={(e)=>
                    setDepartment(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Designation"
                value={designation}
                onChange={(e)=>
                    setDesignation(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                type="date"
                value={joiningDate}
                onChange={(e)=>
                    setJoiningDate(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                placeholder="Salary"
                value={salary}
                onChange={(e)=>
                    setSalary(
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
                    Active
                </option>

                <option>
                    Inactive
                </option>

            </select>

            <br /><br />

            <button
                onClick={
                    handleSaveEmployee
                }
            >
                {
                    editingId
                    ? "Update Employee"
                    : "Add Employee"
                }
            </button>

            <br /><br />

            <input
                placeholder="Search Employee..."
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
                    "first_name",
                    "email",
                    "department",
                    "designation",
                    "status"
                ]}
                data={employees}
                onEdit={
                    handleEditEmployee
                }
                onDelete={
                    handleDeleteEmployee
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
                of {totalPages}
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

    );

}

export default Employees;