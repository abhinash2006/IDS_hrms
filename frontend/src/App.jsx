import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Attendance
from "./pages/Attendance";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Expenses from "./pages/Expenses";
import Interviews from "./pages/Interviews";
import OfferLetters from "./pages/OfferLetters";
import Employees from "./pages/Employees";
import Leaves
from "./pages/Leaves";
import Users
from "./pages/Users";
import Payroll
from "./pages/Payroll";
import ProtectedRoute from "./components/ProtectedRoute";

import Profile
from "./pages/Profile";

function Layout() {
    const location =
        useLocation();

    const hideLayout =
        location.pathname === "/" ||
        location.pathname === "/login";

    if (hideLayout) {
        return (
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
            </Routes>
        );
    }

    return (
        <>
            <Navbar />

            <div className="app-container">

                <Sidebar />

                <div className="main-content">

                    <Routes>

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "hr",
                                        "employee"
                                    ]}
                                >
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/employees"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "hr"
                                    ]}
                                >
                                    <Employees />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/candidates"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "hr"
                                    ]}
                                >
                                    <Candidates />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/users"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin"
                                    ]}
                                >
                                    <Users />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/jobs"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "hr"
                                    ]}
                                >
                                    <Jobs />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/attendance"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "employee"
                                    ]}
                                >
                                    <Attendance />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/leaves"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "employee"
                                    ]}
                                >
                                    <Leaves />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/payroll"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "employee"
                                    ]}
                                >
                                    <Payroll />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/interviews"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "hr"
                                    ]}
                                >
                                    <Interviews />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/expenses"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "hr",
                                        "employee"
                                    ]}
                                >
                                    <Expenses />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/offers"
                            element={
                                <ProtectedRoute
                                    allowedRoles={[
                                        "admin",
                                        "hr"
                                    ]}
                                >
                                    <OfferLetters />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>

                </div>

            </div>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}


export default App;