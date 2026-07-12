const expenseRepository =
require(
    "../repositories/expense.repository"
);
const employeeRepository =
require(
    "../repositories/employee.repository"
);

const logger =
require(
    "../utils/logger"
);

const VALID_STATUSES = [
    "Pending",
    "Approved",
    "Rejected"
];

const createExpense =
async (
    expenseData,
    user
) => {

    if (user.role === "employee") {
        const employee = await employeeRepository.getEmployeeByUserId(user.id);
        if (!employee) {
            const error = new Error("Employee profile not found");
            error.statusCode = 404;
            throw error;
        }
        expenseData.employee_id = employee.id;
        expenseData.status = "Pending";
    }

    if (
        !VALID_STATUSES.includes(
            expenseData.status
        )
    ) {

        const error =
            new Error(
                "Invalid expense status"
            );

        error.statusCode =
            400;

        throw error;
    }

  const result =
    await expenseRepository
    .createExpense(
        expenseData
    );

logger(
    "CREATE_EXPENSE",
    `Expense created for employee ${expenseData.employee_id}`
);

return result;
};

const getExpenses =
async (user) => {

    let employeeId = null;
    if (user.role === "employee") {
        const employee = await employeeRepository.getEmployeeByUserId(user.id);
        if (!employee) return [];
        employeeId = employee.id;
    }

    return await
        expenseRepository
        .getExpenses(employeeId);

};

const getExpenseById =
async (id, user) => {

    const expense =
        await expenseRepository
        .getExpenseById(id);

    if (!expense) {

        const error =
            new Error(
                "Expense claim not found"
            );

        error.statusCode =
            404;

        throw error;
    }

    if (user.role === "employee") {
        const employee = await employeeRepository.getEmployeeByUserId(user.id);
        if (!employee || expense.employee_id !== employee.id) {
            const error = new Error("Access Denied");
            error.statusCode = 403;
            throw error;
        }
    }

    return expense;
};

const updateExpense =
async (
    id,
    expenseData,
    user
) => {

    const expense =
        await expenseRepository
        .getExpenseById(id);

    if (!expense) {

        const error =
            new Error(
                "Expense claim not found"
            );

        error.statusCode =
            404;

        throw error;
    }

    if (user.role === "employee") {
        const employee = await employeeRepository.getEmployeeByUserId(user.id);
        if (!employee || expense.employee_id !== employee.id) {
            const error = new Error("Access Denied");
            error.statusCode = 403;
            throw error;
        }
        if (expense.status !== "Pending") {
            const error = new Error("Cannot modify a processed claim");
            error.statusCode = 400;
            throw error;
        }
        expenseData.employee_id = employee.id;
        expenseData.status = "Pending"; // Employee cannot change status
    } else {
        // Admin or HR updating status or details
        if (!expenseData.employee_id) {
            expenseData.employee_id = expense.employee_id;
        }
        if (!expenseData.status) {
            expenseData.status = expense.status;
        }
    }

    if (
        !VALID_STATUSES.includes(
            expenseData.status
        )
    ) {

        const error =
            new Error(
                "Invalid expense status"
            );

        error.statusCode =
            400;

        throw error;
    }
logger(
    "UPDATE_EXPENSE",
    `Expense ID ${id} updated`
);
    return await
        expenseRepository
        .updateExpense(
            id,
            expenseData
        );
};

const deleteExpense =
async (id, user) => {

    const expense =
        await expenseRepository
        .getExpenseById(id);

    if (!expense) {

        const error =
            new Error(
                "Expense claim not found"
            );

        error.statusCode =
            404;

        throw error;
    }

    if (user.role === "employee") {
        const employee = await employeeRepository.getEmployeeByUserId(user.id);
        if (!employee || expense.employee_id !== employee.id) {
            const error = new Error("Access Denied");
            error.statusCode = 403;
            throw error;
        }
        if (expense.status !== "Pending") {
            const error = new Error("Cannot delete a processed claim");
            error.statusCode = 400;
            throw error;
        }
    }

logger(
    "DELETE_EXPENSE",
    `Expense ID ${id} deleted`
);
    return await
        expenseRepository
        .deleteExpense(id);
};

const getPaginatedExpensesData =
async (
    page,
    limit,
    search,
    user
) => {

    let employeeId = null;
    if (user.role === "employee") {
        const employee = await employeeRepository.getEmployeeByUserId(user.id);
        if (!employee) {
            return { expenses: [], totalRecords: 0 };
        }
        employeeId = employee.id;
    }

    const expenses =
        await expenseRepository
        .getPaginatedExpenses(
            page,
            limit,
            search,
            employeeId
        );

    const totalRecords =
        await expenseRepository
        .getTotalExpensesCount(
            search,
            employeeId
        );

    return {
        expenses,
        totalRecords
    };
};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getPaginatedExpensesData
};