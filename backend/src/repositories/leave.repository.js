const db =
require("../config/db");

const createLeave =
async (
    leaveData
) => {

    const {
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        status
    } = leaveData;

    const [result] =
    await db.query(
        `
        INSERT INTO leave_requests
        (
            employee_id,
            leave_type,
            start_date,
            end_date,
            reason,
            status
        )
        VALUES
        (?, ?, ?, ?, ?, ?)
        `,
        [
            employee_id,
            leave_type,
            start_date,
            end_date,
            reason,
            status
        ]
    );

    return result;
};

const getLeaves =
async (
    page = 1,
    limit = 5,
    search = ""
) => {

    const offset =
        (page - 1) * limit;

    let query =
    `
    SELECT *
    FROM leave_requests
    `;

    let countQuery =
    `
    SELECT COUNT(*) total
    FROM leave_requests
    `;

    const params = [];

    if(search){

        query +=
        `
        WHERE employee_id LIKE ?
        `;

        countQuery +=
        `
        WHERE employee_id LIKE ?
        `;

        params.push(
            `%${search}%`
        );
    }

    query +=
    `
    ORDER BY id DESC
    LIMIT ?
    OFFSET ?
    `;

    const [rows] =
    await db.query(
        query,
        [
            ...params,
            Number(limit),
            Number(offset)
        ]
    );

    const [countRows] =
    await db.query(
        countQuery,
        params
    );

    return {
        leaves: rows,
        total:
        countRows[0].total
    };
};

const getLeaveById =
async (id) => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM leave_requests
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

const updateLeave =
async (
    id,
    leaveData
) => {

    const {
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        status
    } = leaveData;

    const [result] =
    await db.query(
        `
        UPDATE leave_requests
        SET
            employee_id = ?,
            leave_type = ?,
            start_date = ?,
            end_date = ?,
            reason = ?,
            status = ?
        WHERE id = ?
        `,
        [
            employee_id,
            leave_type,
            start_date,
            end_date,
            reason,
            status,
            id
        ]
    );

    return result;
};

const deleteLeave =
async (id) => {

    const [result] =
    await db.query(
        `
        DELETE FROM leave_requests
        WHERE id = ?
        `,
        [id]
    );

    return result;
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
    createLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave,
    getEmployeeByUserId
};