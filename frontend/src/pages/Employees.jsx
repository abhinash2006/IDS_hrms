import {
    useEffect,
    useState
} from "react";

import "../styles/Employees.css";

import DataTable
from "../components/DataTable";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
}

from "../api/employeeApi";
import {
    toast
} from "react-toastify";

import {
    getEmployeeUsers
}
from "../api/userApi";

import {
    employeeSchema
}
from "../validations/employeeValidation";

import Loader
from "../components/Loader";

import Modal
from "../components/Modal";

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

        const [users,
setUsers] =
useState([]);

    const [status,
        setStatus] =
        useState("Active");

        const [userId,
    setUserId] =
    useState("");

        const [loading,
    setLoading] =
    useState(false);

    const [isModalOpen,
    setIsModalOpen] =
    useState(false);

    useEffect(() => {

        loadEmployees();
         loadUsers();

    }, [page, search]);

    const loadUsers =
async () => {

    try {

        const response =
        await getEmployeeUsers();

        setUsers(
            response.data
        );

    } catch(error){

        console.error(error);

    }

};

    const loadEmployees =
    async () => {

    setLoading(true);

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

} catch(error){

    console.error(error);

} finally {

    setLoading(false);

}
    }

    const handleSaveEmployee =
    async () => {

           if (!userId) {

        toast.error(
            "Please select a user"
        );

        return;
    }


        try {

    
           const employeeData = {

    user_id:
    Number(userId),

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

    salary:
        Number(salary),

    status

};

await employeeSchema.validate(
    employeeData
);

            if (
                editingId
            ) {

                await updateEmployee(
                    editingId,
                    employeeData
                );

              toast.success(
    "Employee Updated Successfully"
);

setIsModalOpen(false);

            } else {

                await createEmployee(
                    employeeData
                );

               toast.success(
    "Employee Created Successfully"
);

setIsModalOpen(false);

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
            setUserId("");
            loadEmployees();

        } catch (error) {

            console.error(error);

          toast.error(
    error.response?.data?.message ||
    error.message ||
    "Operation Failed"
);

        }

    };

    const handleEditEmployee =
    (employee) => {

        setUserId(
    employee.user_id
);

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
        setIsModalOpen(true);
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

        try {
            await deleteEmployee(id);
            toast.success("Employee Deleted Successfully");
            loadEmployees();
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to delete employee"
            );
        }
    };

    return (

       <div className="employee-page">

    <div className="employee-header">

        <h1>
            Employees Management
        </h1>

        <button
            className="employee-add-btn"
            onClick={() => {
                setIsModalOpen(true);
                setEditingId(null);
            }}
        >
            + Add Employee
        </button>

    </div>

<br /><br />

<Modal
    isOpen={isModalOpen}
    onClose={() =>
        setIsModalOpen(false)
    }
    title={
        editingId
            ? "Update Employee"
            : "Add Employee"
    }
>

<div className="employee-form">

    <select
        value={userId}
        onChange={(e) =>
            setUserId(
                Number(
                    e.target.value
                )
            )
        }
    >
        <option value="">
            Select User
        </option>

        {
            users.map(user => (
                <option
                    key={user.id}
                    value={user.id}
                >
                    {user.username}
                </option>
            ))
        }
    </select>

    <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) =>
            setFirstName(
                e.target.value
            )
        }
    />

    <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) =>
            setLastName(
                e.target.value
            )
        }
    />

    <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
            setEmail(
                e.target.value
            )
        }
    />

    <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) =>
            setMobile(
                e.target.value
            )
        }
    />

    <input
        placeholder="Department"
        value={department}
        onChange={(e) =>
            setDepartment(
                e.target.value
            )
        }
    />

    <input
        placeholder="Designation"
        value={designation}
        onChange={(e) =>
            setDesignation(
                e.target.value
            )
        }
    />

    <input
        type="date"
        value={joiningDate}
        onChange={(e) =>
            setJoiningDate(
                e.target.value
            )
        }
    />

    <input
        placeholder="Salary"
        value={salary}
        onChange={(e) =>
            setSalary(
                e.target.value
            )
        }
    />

    <select
        value={status}
        onChange={(e) =>
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

</div>

</Modal>

           <input
    className="employee-search"
    placeholder="Search employee by name or email..."
                value={search}
                onChange={(e)=>{

                    setSearch(
                        e.target.value
                    );

                    setPage(1);

                }}
            />

            <br /><br />

            {
    loading
    ? <Loader />
    : (
       

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
            )
        }
            <br />

         <div className="employee-pagination">

    <button
        disabled={page === 1}
        onClick={() =>
            setPage(page - 1)
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
            setPage(page + 1)
        }
    >
        Next
    </button>

</div>

        </div>

    );

    }

export default Employees;