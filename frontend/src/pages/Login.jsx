import {
    useState
} from "react";

import axiosInstance
from "../services/axiosInstance";

import {
    useNavigate
} from "react-router-dom";

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
    async () => {

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

            alert(
                "Login Successful"
            );

            navigate(
                "/dashboard"
            );

        } catch (error) {

            console.error(
                error
            );

            alert(
                "Invalid Credentials"
            );

        }

    };

    return (

        <div
            style={{
                textAlign:"center",
                marginTop:"100px"
            }}
        >

            <h1>
                HRMS Login
            </h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>
                    setUsername(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <button
                onClick={
                    handleLogin
                }
            >
                Login
            </button>

        </div>

    );

}

export default Login;