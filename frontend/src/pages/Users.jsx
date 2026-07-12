import {
    useEffect,
    useState
} from "react";

import DataTable
from "../components/DataTable";
import "../styles/Users.css";
import Modal from "../components/Modal";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
from "../api/userApi";

import {
    toast
}
from "react-toastify";

function Users() {

    const [users,
        setUsers] =
        useState([]);

    const [editingId,
        setEditingId] =
        useState(null);

    const [username,
        setUsername] =
        useState("");

        const [isModalOpen,
    setIsModalOpen] =
    useState(false);

    const [email,
        setEmail] =
        useState("");

    const [password,
        setPassword] =
        useState("");

    const [role,
        setRole] =
        useState("employee");

    const [status,
        setStatus] =
        useState("active");

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

    loadUsers();

}, [
    page,
    search
]);

  const loadUsers =
async () => {

    try {

        const response =
            await getUsers(
                page,
                search
            );

        setUsers(
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
    const handleSaveUser =
    async () => {

        try {

            const userData = {

                username,
                email,
                password,
                role,
                status

            };

            if (
                editingId
            ) {

                await updateUser(
                    editingId,
                    userData
                );

               toast.success(
    "User Updated Successfully"
);

            } else {

                await createUser(
                    userData
                );

              toast.success(
    "User Created Successfully"
);

            }

            setEditingId(
                null
            );

            setUsername("");
            setEmail("");
            setPassword("");
            setRole("employee");
            setStatus("active");
            setIsModalOpen(false);

            loadUsers();

        } catch(error){

            console.error(
                error
            );

           toast.error(
               error.response?.data?.message || "Operation Failed"
           );

        }

    };

    const handleEditUser =
    (
        user
    ) => {

        setEditingId(
            user.id
        );

        setUsername(
            user.username
        );

        setEmail(
            user.email
        );

        setRole(
            user.role
        );

        setStatus(
            user.status
        );
        setIsModalOpen(true);

        

    };

    const handleDeleteUser =
    async (
        id
    ) => {

        if (
            !window.confirm(
                "Delete User?"
            )
        ) {
            return;
        }

        try {

            await deleteUser(
                id
            );

            toast.success("User Deleted Successfully");
            loadUsers();

        } catch(error){

            console.error(
                error
            );
            toast.error(
                error.response?.data?.message || "Failed to delete user"
            );

        }

    };

    return (

        <div className="user-page">

           <div className="user-header">

    <h1>
        User Management
    </h1>

    <button
        className="user-add-btn"
        onClick={() => {
            setEditingId(null);
            setIsModalOpen(true);
        }}
    >
        + Add User
    </button>

</div>

<Modal
    isOpen={isModalOpen}
    onClose={() =>
        setIsModalOpen(false)
    }
    title={
        editingId
            ? "Update User"
            : "Create User"
    }
>

<div className="user-form">

    <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
            setUsername(
                e.target.value
            )
        }
    />

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

    {
        !editingId && (
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />
        )
    }

    <select
        value={role}
        onChange={(e) =>
            setRole(
                e.target.value
            )
        }
    >
        <option value="admin">
            Admin
        </option>

        <option value="hr">
            HR
        </option>

        <option value="employee">
            Employee
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
        <option value="active">
            Active
        </option>

        <option value="inactive">
            Inactive
        </option>

    </select>

    <button
        onClick={
            handleSaveUser
        }
    >
        {
            editingId
                ? "Update User"
                : "Create User"
        }
    </button>

</div>

</Modal>
       <input
    className="user-search"
    type="text"
    placeholder="Search users by username or email..."
    value={search}
    onChange={(e)=>
        setSearch(
            e.target.value
        )
    }
/>

<br /><br />

            <DataTable
                columns={[
                    "id",
                    "username",
                    "email",
                    "role",
                    "status"
                ]}
                data={users}
                onEdit={
                    handleEditUser
                }
                onDelete={
                    handleDeleteUser
                }
            />
            <br />

<div className="user-pagination">

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

    );

}

export default Users;