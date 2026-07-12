const express =
require("express");

const router =
express.Router();

const userController =
require(
    "../controllers/user.controller"
);

const verifyToken =
require(
    "../middlewares/auth.middleware"
);

const authorizeRoles =
require(
    "../middlewares/role.middleware"
);


router.get(
    "/users/employees",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    userController
    .getEmployeeUsers
);
router.get(
    "/users",
    verifyToken,
    authorizeRoles(
        "admin"
    ),
    userController.getUsers
);

router.get(
    "/users/:id",
    verifyToken,
    authorizeRoles(
        "admin"
    ),
    userController.getUserById
);

router.put(
    "/users/:id",
    verifyToken,
    authorizeRoles(
        "admin"
    ),
    userController.updateUser
);

router.delete(
    "/users/:id",
    verifyToken,
    authorizeRoles(
        "admin"
    ),
    userController.deleteUser
);

module.exports =
router;