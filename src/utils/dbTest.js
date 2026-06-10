const db = require("../config/db");

const testDbConnection = async () => {
    try {
        const [rows] = await db.query(
            "SELECT DATABASE() AS current_database"
        );

        console.log("Database Connected");
        console.log(rows);

    } catch (error) {
        console.error("Database Error");
        console.error(error.message);
    }
};

module.exports = testDbConnection;