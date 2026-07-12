import {
    useState
} from "react";

import axiosInstance
from "../services/axiosInstance";

import {
    useNavigate
} from "react-router-dom";

import "../styles/Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

function Login() {

    const navigate =
        useNavigate();

    const [username,
        setUsername] =
        useState("");

    const [password,
        setPassword] =
        useState("");

    const handleLogin =
    async (e) => {
        if (e) e.preventDefault();

        if (!username || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {

            const response =
                await axiosInstance.post(
                    "/auth/login",
                    {
                        username,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            const token =
                response.data.token;

            const payload =
                JSON.parse(
                    atob(
                        token.split(".")[1]
                    )
                );

            localStorage.setItem(
                "role",
                payload.role
            );

            toast.success("Login Successful!");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);

        } catch (error) {

            console.error(
                error
            );

            toast.error(
                error.response?.data?.message || "Invalid Credentials"
            );

        }

    };

    return (
        <div className="login-container">
            <div className="login-glow"></div>
            <div className="login-glow-secondary"></div>

            <div className="login-card">
                <h1 className="login-logo">
                    HRMS
                </h1>
                <p className="login-subtitle">
                    Recruitment & Self Service Portal
                </p>

                <form onSubmit={handleLogin}>
                    <div className="input-icon-group">
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
                        <FaUser />
                    </div>

                    <div className="input-icon-group">
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
                        <FaLock />
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );

}

export default Login;