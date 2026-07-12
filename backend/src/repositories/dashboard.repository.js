const db =
require("../config/db");

const getDashboardStats =
async (user)  => {

    

    if (
    user.role ===
    "employee"
) {

    const [[employee]] =
    await db.query(
        `
        SELECT id
        FROM employees
        WHERE user_id = ?
        `,
        [user.id]
    );

    if (!employee) {

        return {
            my_leaves: 0,
            my_payrolls: 0,
            attendance_today: 0
        };

    }

    const [[leaves]] =
    await db.query(
        `
        SELECT COUNT(*) total
        FROM leave_requests
        WHERE
        employee_id = ?
        AND status = 'Pending'
        `,
        [employee.id]
    );

    const [[payrolls]] =
    await db.query(
        `
        SELECT COUNT(*) total
        FROM payrolls
        WHERE employee_id = ?
        `,
        [employee.id]
    );

    const [[attendance]] =
    await db.query(
        `
        SELECT COUNT(*) total
        FROM attendance
        WHERE
        employee_id = ?
        AND status = 'Present'
        AND DATE(attendance_date)
            = CURDATE()
        `,
        [employee.id]
    );

    return {
        my_leaves:
            leaves.total,

        my_payrolls:
            payrolls.total,

        attendance_today:
            attendance.total
    };
}

    const [[jobs]] =
    await db.query(
        "SELECT COUNT(*) total_jobs FROM jobs"
    );

    const [[candidates]] =
    await db.query(
        "SELECT COUNT(*) total_candidates FROM candidates"
    );

    const [[employees]] =
    await db.query(
        "SELECT COUNT(*) total_employees FROM employees"
    );

    const [[interviews]] =
    await db.query(
        "SELECT COUNT(*) total_interviews FROM interviews"
    );

    const [[offers]] =
    await db.query(
        "SELECT COUNT(*) total_offers FROM offer_letters"
    );

const [[leaves]] =
await db.query(
    `
    SELECT COUNT(*) pending_leaves
    FROM leave_requests
    WHERE status = 'Pending'
    `
);

    const [[expenses]] =
    await db.query(
        `
        SELECT COUNT(*) pending_expenses
        FROM expense_claims
        WHERE status='Pending'
        `
    );

    const [[attendance]] =
await db.query(
    `
    SELECT COUNT(*) present_today
    FROM attendance
    WHERE
        status = 'Present'
        AND DATE(attendance_date)
        = CURDATE()
    `
);

    return {

        total_jobs:
        jobs.total_jobs,

        total_candidates:
        candidates.total_candidates,

        total_employees:
        employees.total_employees,

        total_interviews:
        interviews.total_interviews,

        total_offers:
        offers.total_offers,

        pending_leaves:
        leaves.pending_leaves,

        pending_expenses:
expenses.pending_expenses,

present_today:
attendance.present_today
    };

};

module.exports = {
    getDashboardStats
};