const db =
require("../config/db");

const createAttendance =
async (
    attendanceData
) => {

    const {
        employee_id,
        attendance_date,
        check_in_time,
        check_out_time,
        status
    } = attendanceData;

    const [result] =
        await db.query(
            `
            INSERT INTO attendance
            (
                employee_id,
                attendance_date,
                check_in_time,
                check_out_time,
                status
            )
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [
                employee_id,
                attendance_date,
                check_in_time,
                check_out_time,
                status
            ]
        );

    return result;
};

const getAttendance =
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
    FROM attendance
    `;

    let countQuery =
    `
    SELECT COUNT(*) total
    FROM attendance
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
        attendance: rows,
        total:
        countRows[0].total
    };
};

const getAttendanceById =
async (id) => {

    const [rows] =
        await db.query(
            `
            SELECT *
            FROM attendance
            WHERE id = ?
            `,
            [id]
        );

    return rows[0];
};

const updateAttendance =
async (
    id,
    attendanceData
) => {

    const {
        employee_id,
        attendance_date,
        check_in_time,
        check_out_time,
        status
    } = attendanceData;

    const [result] =
        await db.query(
            `
            UPDATE attendance
            SET
                employee_id = ?,
                attendance_date = ?,
                check_in_time = ?,
                check_out_time = ?,
                status = ?
            WHERE id = ?
            `,
            [
                employee_id,
                attendance_date,
                check_in_time,
                check_out_time,
                status,
                id
            ]
        );

    return result;
};

const deleteAttendance =
async (id) => {

    const [result] =
        await db.query(
            `
            DELETE FROM attendance
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
        SELECT id
        FROM employees
        WHERE user_id = ?
        `,
        [userId]
    );

    return rows[0];

};

const markAttendance =
async (
    employeeId
) => {

    const [result] =
    await db.query(
        `
        INSERT INTO attendance
        (
            employee_id,
            attendance_date,
            check_in_time,
            status
        )
        VALUES
        (
            ?,
            CURDATE(),
            CURTIME(),
            'Present'
        )
        `,
        [employeeId]
    );

    return result;

};

const getTodayAttendance =
async (
    employeeId
) => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM attendance
        WHERE employee_id = ?
        AND attendance_date = CURDATE()
        `,
        [employeeId]
    );

    return rows[0];

};

module.exports = {
    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
    getEmployeeByUserId,
    markAttendance,
    getTodayAttendance
};