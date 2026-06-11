require("dotenv").config();

const app = require("./src/app");
const employeeRoutes =
require(
    "./src/routes/employee.routes"
);
app.use(
    "/api",
    employeeRoutes
);
const testDbConnection = require("./src/utils/dbTest");

const PORT = process.env.PORT || 5000;
testDbConnection();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});