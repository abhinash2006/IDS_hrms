const express =
require("express");

const router =
express.Router();

const leaveController =
require(
    "../controllers/leave.controller"
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
    "/leaves",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
    "employee"
    ),
    leaveController
        .createLeave
);

router.get(
    "/leaves",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
    "employee"
    ),
    leaveController
        .getLeaves
);

router.get(
    "/leaves/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
    "employee"
    ),
    leaveController
        .getLeaveById
);

router.put(
    "/leaves/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    leaveController.updateLeave
);

router.delete(
    "/leaves/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    leaveController.deleteLeave
);

module.exports =
router;