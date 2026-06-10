const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/job.routes");

const app = express();
const authRoutes =
require("./routes/auth.routes");
const candidateRoutes =
require(
    "./routes/candidate.routes"
);

const expenseRoutes =
require(
    "./routes/expense.routes"
);
const path =
require("path");



app.use(cors());
app.use(express.json());
app.use(
    "/api/auth",
    authRoutes
);
app.use("/api", jobRoutes);
app.use("/api", candidateRoutes);

app.use(
    "/api",
    expenseRoutes
);
const errorHandler =
require(
"./middlewares/error.middleware"
);

app.use(
    "/uploads",
    express.static(
        path.join(
            __dirname,
            "uploads"
        )
    )
);


app.use(errorHandler);

module.exports = app;