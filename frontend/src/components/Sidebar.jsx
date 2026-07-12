import { Link } from "react-router-dom";

import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaUserTie,
  FaCalendarCheck,
  FaMoneyBill,
  FaClipboardList,
  FaFileAlt,
  FaUserCircle
} from "react-icons/fa";

function Sidebar() {
  const role =
    localStorage.getItem("role");

  return (
    <div className="sidebar">

      <div className="logo">
        HRMS
      </div>

      <ul className="menu">

        <li>
          <Link to="/dashboard">
            <FaHome />
            Dashboard
          </Link>
        </li>

        {(role === "admin" ||
          role === "hr") && (
          <>
            <li>
              <Link to="/jobs">
                <FaBriefcase />
                Jobs
              </Link>
            </li>

            <li>
              <Link to="/candidates">
                <FaUsers />
                Candidates
              </Link>
            </li>

            <li>
              <Link to="/interviews">
                <FaClipboardList />
                Interviews
              </Link>
            </li>

            <li>
              <Link to="/offers">
                <FaFileAlt />
                Offers
              </Link>
            </li>

            <li>
              <Link to="/employees">
                <FaUserTie />
                Employees
              </Link>
            </li>
          </>
        )}

        {role === "admin" && (
          <li>
            <Link to="/users">
              <FaUsers />
              Users
            </Link>
          </li>
        )}

        {(role === "admin" ||
          role === "hr" ||
          role === "employee") && (
          <>
            <li>
              <Link to="/attendance">
                <FaCalendarCheck />
                Attendance
              </Link>
            </li>

            <li>
              <Link to="/profile">
                <FaUserCircle />
                Profile
              </Link>
            </li>

            <li>
              <Link to="/leaves">
                <FaClipboardList />
                Leaves
              </Link>
            </li>

            <li>
              <Link to="/expenses">
                <FaMoneyBill />
                Expenses
              </Link>
            </li>

            <li>
              <Link to="/payroll">
                <FaMoneyBill />
                Payroll
              </Link>
            </li>
          </>
        )}

      </ul>

    </div>
  );
}

export default Sidebar;