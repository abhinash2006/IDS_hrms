import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/App.css";
import "./styles/Sidebar.css";
import "./styles/Navbar.css";
import "./styles/Dashboard.css";
import "./styles/Table.css";
import App from "./App.jsx";
import "./index.css";

import {
    ToastContainer
} from "react-toastify";

import
"react-toastify/dist/ReactToastify.css";

createRoot(
    document.getElementById("root")
).render(

    <StrictMode>

        <App />

        <ToastContainer />

    </StrictMode>

);