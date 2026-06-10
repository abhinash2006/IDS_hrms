const express =
require("express");

const router =
express.Router();

const expenseController =
require(
    "../controllers/expense.controller"
);

const verifyToken =
require(
    "../middlewares/auth.middleware"
);

const authorizeRoles =
require(
    "../middlewares/role.middleware"
);

router.post(
    "/expenses",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    expenseController
        .createExpense
);

router.get(
    "/expenses",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    expenseController
        .getExpenses
);

router.get(
    "/expenses/paginated",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    expenseController
        .getPaginatedExpenses
);

router.get(
    "/expenses/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    expenseController
        .getExpenseById
);

router.put(
    "/expenses/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    expenseController
        .updateExpense
);

router.delete(
    "/expenses/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    expenseController
        .deleteExpense
);

module.exports =
router;