const express =
require("express");

const router =
express.Router();

const payrollController =
require(
    "../controllers/payroll.controller"
);

const verifyToken =
require(
    "../middlewares/auth.middleware"
);

const authorizeRoles =
require("../middlewares/role.middleware");

router.post(
    "/payrolls",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    payrollController.createPayroll
);

router.put(
    "/payrolls/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    payrollController.updatePayroll
);

router.delete(
    "/payrolls/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    payrollController.deletePayroll
);

router.get(
    "/payrolls",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
        "employee"
    ),
    payrollController.getPayrolls
);

module.exports =
router;