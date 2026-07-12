const db =
require("../config/db");

const createEmployee =
async (
    employeeData
) => {

    const {
         user_id,
        first_name,
        last_name,
        email,
        mobile,
        department,
        designation,
        joining_date,
        salary,
        status
    } = employeeData;

    const [result] =
        await db.query(
            `
           INSERT INTO employees
(
    user_id,
    first_name,
    last_name,
    email,
    mobile,
    department,
    designation,
    joining_date,
    salary,
    status
)
VALUES
(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                user_id,
                first_name,
                last_name,
                email,
                mobile,
                department,
                designation,
                joining_date,
                salary,
                status
            ]
        );

    return result;
};

const getEmployees =
async () => {

    const [rows] =
        await db.query(
            `
            SELECT *
            FROM employees
            ORDER BY id DESC
            `
        );

    return rows;
};

const getEmployeeById =
async (id) => {

    const [rows] =
        await db.query(
            `
            SELECT *
            FROM employees
            WHERE id = ?
            `,
            [id]
        );

    return rows[0];
};

const updateEmployee =
async (
    id,
    employeeData
) => {

    const {
        first_name,
        last_name,
        email,
        mobile,
        department,
        designation,
        joining_date,
        salary,
        status
    } = employeeData;

    const [result] =
        await db.query(
            `
            UPDATE employees
            SET
                first_name = ?,
                last_name = ?,
                email = ?,
                mobile = ?,
                department = ?,
                designation = ?,
                joining_date = ?,
                salary = ?,
                status = ?
            WHERE id = ?
            `,
            [
                first_name,
                last_name,
                email,
                mobile,
                department,
                designation,
                joining_date,
                salary,
                status,
                id
            ]
        );

    return result;
};

const deleteEmployee =
async (id) => {

    const [result] =
        await db.query(
            `
            DELETE FROM employees
            WHERE id = ?
            `,
            [id]
        );

    return result;
};

const getPaginatedEmployees =
async (
    page,
    limit,
    search
) => {

    const offset =
        (page - 1) * limit;

    let query =
        "SELECT * FROM employees";

    let params = [];

    if (search) {

        query += `
        WHERE first_name LIKE ?
        OR last_name LIKE ?
        OR email LIKE ?
        OR department LIKE ?
        `;

        params.push(
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`
        );
    }

    query +=
        " LIMIT ? OFFSET ?";

    params.push(
        parseInt(limit),
        parseInt(offset)
    );

    const [rows] =
        await db.query(
            query,
            params
        );

    return rows;
};

const getTotalEmployeesCount =
async (search) => {

    let query =
        "SELECT COUNT(*) AS total FROM employees";

    let params = [];

    if (search) {

        query += `
        WHERE first_name LIKE ?
        OR last_name LIKE ?
        OR email LIKE ?
        OR department LIKE ?
        `;

        params.push(
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`
        );
    }

    const [rows] =
        await db.query(
            query,
            params
        );

    return rows[0].total;
};

const getEmployeeByUserId =
async (userId) => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM employees
        WHERE user_id = ?
        `,
        [userId]
    );

    return rows[0];

};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getPaginatedEmployees,
    getTotalEmployeesCount,
    getEmployeeByUserId
};