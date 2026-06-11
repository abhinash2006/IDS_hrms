import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Expenses from "./pages/Expenses";
import Interviews from "./pages/Interviews";
import OfferLetters from "./pages/OfferLetters";
import Employees from "./pages/Employees";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <div
                style={{
                    display: "flex"
                }}
            >

                <Sidebar />

                <div
                    style={{
                        padding: "20px",
                        width: "100%"
                    }}
                >

                    <Routes>

                        <Route
                            path="/"
                            element={<Login />}
                        />

                        <Route
                            path="/login"
                            element={<Login />}
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
                            path="/jobs"
                            element={
                                <ProtectedRoute>
                                    <Jobs />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/candidates"
                            element={
                                <ProtectedRoute>
                                    <Candidates />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/expenses"
                            element={
                                <ProtectedRoute>
                                    <Expenses />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/interviews"
                            element={
                                <ProtectedRoute>
                                    <Interviews />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/offers"
                            element={
                                <ProtectedRoute>
                                    <OfferLetters />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/employees"
                            element={
                                <ProtectedRoute>
                                    <Employees />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="/login"
                                />
                            }
                        />

                    </Routes>

                </div>

            </div>

        </BrowserRouter>

    );

}

export default App;