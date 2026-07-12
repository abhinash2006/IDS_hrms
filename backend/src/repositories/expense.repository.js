const db =
require("../config/db");

const createExpense =
async (
    expenseData
) => {

    const {
        employee_id,
        claim_title,
        amount,
        bill_attachment,
        status
    } = expenseData;

    const [result] =
        await db.query(
            `
            INSERT INTO expense_claims
            (
                employee_id,
                claim_title,
                amount,
                bill_attachment,
                status
            )
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [
                employee_id,
                claim_title,
                amount,
                bill_attachment,
                status
            ]
        );

    return result;
};

const getExpenses =
async (employeeId) => {

    let query = `
        SELECT *
        FROM expense_claims
    `;
    let params = [];

    if (employeeId) {
        query += " WHERE employee_id = ?";
        params.push(employeeId);
    }

    query += " ORDER BY id DESC";

    const [rows] = await db.query(query, params);
    return rows;
};

const getExpenseById =
async (id) => {

    const [rows] =
        await db.query(
            `
            SELECT *
            FROM expense_claims
            WHERE id = ?
            `,
            [id]
        );

    return rows[0];
};

const updateExpense =
async (
    id,
    expenseData
) => {

    const {
        employee_id,
        claim_title,
        amount,
        bill_attachment,
        status
    } = expenseData;

    const [result] =
        await db.query(
            `
            UPDATE expense_claims
            SET
                employee_id = ?,
                claim_title = ?,
                amount = ?,
                bill_attachment = ?,
                status = ?
            WHERE id = ?
            `,
            [
                employee_id,
                claim_title,
                amount,
                bill_attachment,
                status,
                id
            ]
        );

    return result;
};

const deleteExpense =
async (id) => {

    const [result] =
        await db.query(
            `
            DELETE FROM expense_claims
            WHERE id = ?
            `,
            [id]
        );

    return result;
};

const getPaginatedExpenses =
async (
    page,
    limit,
    search,
    employeeId
) => {

    const offset =
        (page - 1) * limit;

    let query =
        `
        SELECT *
        FROM expense_claims
        WHERE 1 = 1
        `;

    let params = [];

    if (employeeId) {
        query += " AND employee_id = ?";
        params.push(employeeId);
    }

    if (search) {

        query += `
            AND (claim_title LIKE ?
            OR status LIKE ?)
        `;

        params.push(
            `%${search}%`,
            `%${search}%`
        );

    }

    query += `
        ORDER BY id DESC
        LIMIT ?
        OFFSET ?
    `;

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

const getTotalExpensesCount =
async (
    search,
    employeeId
) => {

    let query =
        `
        SELECT COUNT(*) AS total
        FROM expense_claims
        WHERE 1 = 1
        `;

    let params = [];

    if (employeeId) {
        query += " AND employee_id = ?";
        params.push(employeeId);
    }

    if (search) {

        query += `
            AND (claim_title LIKE ?
            OR status LIKE ?)
        `;

        params.push(
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
module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getPaginatedExpenses,
    getTotalExpensesCount   
};