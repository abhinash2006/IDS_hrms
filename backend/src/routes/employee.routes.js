const express =
require("express");

const router =
express.Router();

const employeeController =
require(
    "../controllers/employee.controller"
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
    "/employees",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    employeeController
        .createEmployee
);

router.get(
    "/employees",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    employeeController
        .getEmployees
);

router.get(
    "/employees/paginated",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    employeeController
        .getPaginatedEmployees
);

router.get(
    "/employees/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    employeeController
        .getEmployeeById
);

router.put(
    "/employees/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    employeeController
        .updateEmployee
);

router.delete(
    "/employees/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    employeeController
        .deleteEmployee
);

module.exports =
router;