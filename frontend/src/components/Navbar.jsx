import {
  FaBell,
  FaSearch
} from "react-icons/fa";

function Navbar() {
  const role =
    localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href =
      "/login";
  };

  return (
    <div className="navbar">

      <div className="search-box">
        <FaSearch />

        <input
          placeholder="Search..."
        />
      </div>

      <div className="nav-right">

        <FaBell
          className="icon"
        />

        <div className="profile">
          {role}
        </div>

        <button
          className="logout-btn"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;