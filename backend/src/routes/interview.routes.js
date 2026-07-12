const express =
require("express");

const router =
express.Router();

const interviewController =
require(
    "../controllers/interview.controller"
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
    "/interviews",
    verifyToken,
    authorizeRoles("admin", "hr"),
    interviewController
    .createInterview
);

router.get(
    "/interviews",
    verifyToken,
    authorizeRoles("admin", "hr"),
    interviewController
    .getInterviews
);

router.get(
    "/interviews/paginated",
    verifyToken,
    authorizeRoles("admin", "hr"),
    interviewController
        .getPaginatedInterviews
);

router.get(
    "/interviews/:id",
    verifyToken,
    authorizeRoles("admin", "hr"),
    interviewController
    .getInterviewById
);

router.put(
    "/interviews/:id",
    verifyToken,
    authorizeRoles("admin", "hr"),
    interviewController
    .updateInterview
);

router.delete(
    "/interviews/:id",
    verifyToken,
    authorizeRoles("admin", "hr"),
    interviewController
    .deleteInterview
);

module.exports =
router;