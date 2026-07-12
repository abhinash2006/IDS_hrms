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
        "hr",
        "employee"
    ),
    expenseController
        .createExpense
);

router.get(
    "/expenses",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
        "employee"
    ),
    expenseController
        .getExpenses
);

router.get(
    "/expenses/paginated",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
        "employee"
    ),
    expenseController
        .getPaginatedExpenses
);

router.get(
    "/expenses/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
        "employee"
    ),
    expenseController
        .getExpenseById
);

router.put(
    "/expenses/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
        "employee"
    ),
    expenseController
        .updateExpense
);

router.delete(
    "/expenses/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
        "employee"
    ),
    expenseController
        .deleteExpense
);

module.exports =
router;