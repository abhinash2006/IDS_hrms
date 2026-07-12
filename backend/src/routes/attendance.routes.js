const express =
require("express");

const router =
express.Router();

const attendanceController =
require(
    "../controllers/attendance.controller"
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
    "/attendance",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
    "employee"
    ),
    attendanceController
        .createAttendance
);

router.post(
    "/attendance/mark",
    verifyToken,
    authorizeRoles(
        "employee",
        "admin"
    ),
    attendanceController
    .markAttendance
);

router.get(
    "/attendance",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
    "employee"
    ),
    attendanceController
        .getAttendance
);

router.get(
    "/attendance/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
    "employee"
    ),
    attendanceController
        .getAttendanceById
);

router.put(
    "/attendance/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
    "employee"
    ),
    attendanceController
        .updateAttendance
);

router.delete(
    "/attendance/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
    "employee"
    ),
    attendanceController
        .deleteAttendance
);

module.exports =
router;