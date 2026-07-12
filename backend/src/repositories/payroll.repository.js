const db =
require("../config/db");

const createPayroll =
async (
    payrollData
) => {

    const {
        employee_id,
        basic_salary,
        hra,
        bonus,
        deductions,
        net_salary,
        payroll_month,
        payroll_year
    } = payrollData;

    const [result] =
    await db.query(
        `
        INSERT INTO payrolls
        (
            employee_id,
            basic_salary,
            hra,
            bonus,
            deductions,
            net_salary,
            payroll_month,
            payroll_year
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            employee_id,
            basic_salary,
            hra,
            bonus,
            deductions,
            net_salary,
            payroll_month,
            payroll_year
        ]
    );

    return result;
};

const getPayrolls =
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
    FROM payrolls
    `;

    let countQuery =
    `
    SELECT COUNT(*) total
    FROM payrolls
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
        payrolls: rows,
        total:
        countRows[0].total
    };
};

const getPayrollById =
async (id) => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM payrolls
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

const updatePayroll =
async (
    id,
    payrollData
) => {

    const {
        employee_id,
        basic_salary,
        hra,
        bonus,
        deductions,
        net_salary,
        payroll_month,
        payroll_year
    } = payrollData;

    const [result] =
    await db.query(
        `
        UPDATE payrolls
        SET
            employee_id = ?,
            basic_salary = ?,
            hra = ?,
            bonus = ?,
            deductions = ?,
            net_salary = ?,
            payroll_month = ?,
            payroll_year = ?
        WHERE id = ?
        `,
        [
            employee_id,
            basic_salary,
            hra,
            bonus,
            deductions,
            net_salary,
            payroll_month,
            payroll_year,
            id
        ]
    );

    return result;
};

const deletePayroll =
async (id) => {

    const [result] =
    await db.query(
        `
        DELETE FROM payrolls
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
    createPayroll,
    getPayrolls,
    getPayrollById,
    updatePayroll,
    deletePayroll,
    getEmployeeByUserId
};