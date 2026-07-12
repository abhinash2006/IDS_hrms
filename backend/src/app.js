const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const employeeRoutes = require("./routes/employee.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const leaveRoutes = require("./routes/leave.routes");
const payrollRoutes = require("./routes/payroll.routes");
const payslipRoutes = require("./routes/payslip.routes");
const announcementRoutes = require("./routes/announcement.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const jobRoutes = require("./routes/job.routes");
const candidateRoutes = require("./routes/candidate.routes");
const expenseRoutes = require("./routes/expense.routes");
const interviewRoutes = require("./routes/interview.routes");
const offerRoutes = require("./routes/offer.routes");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", employeeRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", leaveRoutes);
app.use("/api", payrollRoutes);
app.use("/api", payslipRoutes);
app.use("/api", announcementRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", jobRoutes);
app.use("/api", candidateRoutes);
app.use("/api", expenseRoutes);
app.use("/api", interviewRoutes);
app.use("/api", offerRoutes);

app.use(errorHandler);

module.exports = app;