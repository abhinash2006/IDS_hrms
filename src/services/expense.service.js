const expenseRepository =
require(
    "../repositories/expense.repository"
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
    expenseData
) => {

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
async () => {

    return await
        expenseRepository
        .getExpenses();

};
const getExpenseById =
async (id) => {

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

    return expense;
};

const updateExpense =
async (
    id,
    expenseData
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

    const VALID_STATUSES = [
        "Pending",
        "Approved",
        "Rejected"
    ];

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
async (id) => {

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
    search
) => {

    const expenses =
        await expenseRepository
        .getPaginatedExpenses(
            page,
            limit,
            search
        );

    const totalRecords =
        await expenseRepository
        .getTotalExpensesCount(
            search
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