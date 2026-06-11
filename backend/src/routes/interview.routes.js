const express =
require("express");

const router =
express.Router();

const interviewController =
require(
    "../controllers/interview.controller"
);

router.post(
    "/interviews",
    interviewController
    .createInterview
);

router.get(
    "/interviews",
    interviewController
    .getInterviews
);

router.get(
    "/interviews/paginated",
    interviewController
        .getPaginatedInterviews
);

router.get(
    "/interviews/:id",
    interviewController
    .getInterviewById
);

router.put(
    "/interviews/:id",
    interviewController
    .updateInterview
);

router.delete(
    "/interviews/:id",
    interviewController
    .deleteInterview
);

module.exports =
router;