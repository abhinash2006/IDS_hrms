import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            style={{
                width: "220px",
                backgroundColor: "#334155",
                color: "white",
                minHeight: "100vh",
                padding: "20px"
            }}
        >
            <h3>Menu</h3>

            <ul
                style={{
                    listStyle: "none",
                    padding: 0
                }}
            >
                <li>
                    <Link
                        to="/"
                        style={{
                            color: "white",
                            textDecoration: "none"
                        }}
                    >
                        Dashboard
                    </Link>
                </li>

                <br />

                <li>
                    <Link
                        to="/jobs"
                        style={{
                            color: "white",
                            textDecoration: "none"
                        }}
                    >
                        Jobs
                    </Link>
                </li>

                <br />

                <li>
                    <Link
                        to="/candidates"
                        style={{
                            color: "white",
                            textDecoration: "none"
                        }}
                    >
                        Candidates
                    </Link>
                </li>

                <br />

                <li>
                    <Link
                        to="/expenses"
                        style={{
                            color: "white",
                            textDecoration: "none"
                        }}
                    >
                        Expenses
                    </Link>
                </li>
                <li>
    <Link to="/employees">
        Employees
    </Link>
</li>
            </ul>
        </div>
    );
}

export default Sidebar;