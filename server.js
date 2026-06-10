require("dotenv").config();

const app = require("./src/app");

const testDbConnection = require("./src/utils/dbTest");

const PORT = process.env.PORT || 5000;
testDbConnection();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});