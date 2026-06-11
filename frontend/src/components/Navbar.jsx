import {
    Link,
    useNavigate
} from "react-router-dom";



function Navbar() {

    const navigate =
        useNavigate();

    const handleLogout =
    () => {

        localStorage.removeItem(
            "token"
        );

         window.location.href =
        "/login";



        navigate("/");

    };

    return (

        <div
            style={{
                display: "flex",
                gap: "20px",
                padding: "15px",
                background: "#f0f0f0",
                marginBottom: "20px"
            }}
        >

            <Link to="/jobs">
                Jobs
            </Link>

            <Link to="/candidates">
                Candidates
            </Link>

            <Link to="/expenses">
                Expenses
            </Link>

            <Link to="/interviews">
    Interviews
</Link>

            <button
                onClick={
                    handleLogout
                }
            >
                Logout
            </button>

        </div>

    );

}

export default Navbar;