const expenseService =
require(
    "../services/expense.service"
);

const asyncHandler =
require(
    "../utils/asyncHandler"
);

const {
    createExpenseSchema
} = require(
    "../validations/expense.validation"
);

const createExpense =
asyncHandler(
async (
    req,
    res
) => {

    const {
        error
    } =
    createExpenseSchema
    .validate(
        req.body
    );

    if (error) {

        const validationError =
            new Error(
                error.details[0]
                .message
            );

        validationError.statusCode =
            400;

        throw validationError;

    }

    const result =
        await expenseService
        .createExpense(
            req.body
        );

    res.status(201)
    .json({

        success:true,

        message:
        "Expense claim created successfully",

        expense_id:
        result.insertId

    });

});

const getExpenses =
asyncHandler(
async (
    req,
    res
) => {

    const expenses =
        await expenseService
        .getExpenses();

    res.status(200)
    .json({
        success:true,
        data:expenses
    });

});

const getExpenseById =
asyncHandler(
async (
    req,
    res
) => {

    const expense =
        await expenseService
        .getExpenseById(
            req.params.id
        );

    res.status(200)
    .json({
        success:true,
        data:expense
    });

});

const updateExpense =
asyncHandler(
async (
    req,
    res
) => {

    const {
        error
    } =
    createExpenseSchema
    .validate(
        req.body
    );

    if (error) {

        const validationError =
            new Error(
                error.details[0]
                .message
            );

        validationError.statusCode =
            400;

        throw validationError;

    }

    await expenseService
        .updateExpense(
            req.params.id,
            req.body
        );

    res.status(200)
    .json({
        success:true,
        message:
        "Expense claim updated successfully"
    });

});

const deleteExpense =
asyncHandler(
async (
    req,
    res
) => {

    await expenseService
        .deleteExpense(
            req.params.id
        );

    res.status(200)
    .json({
        success:true,
        message:
        "Expense claim deleted successfully"
    });

});

const getPaginatedExpenses =
asyncHandler(
async (
    req,
    res
) => {

    const page =
        parseInt(
            req.query.page
        ) || 1;

    const limit =
        parseInt(
            req.query.limit
        ) || 10;

    const search =
        req.query.search || "";

    const result =
        await expenseService
        .getPaginatedExpensesData(
            page,
            limit,
            search
        );

    const totalPages =
        Math.ceil(
            result.totalRecords
            / limit
        );

    res.status(200)
    .json({

        success: true,

        page,

        limit,

        total_records:
            result.totalRecords,

        total_pages:
            totalPages,

        data:
            result.expenses

    });

});

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getPaginatedExpenses
};