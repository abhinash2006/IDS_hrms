const express = require("express");

const router = express.Router();

const jobController = require("../controllers/job.controller");

const verifyToken = require(
    "../middlewares/auth.middleware"
);
const authorizeRoles =
require(
"../middlewares/role.middleware"
);
// Public Routes

router.get(
    "/jobs",
    jobController.getJobs
);

router.get(
    "/jobs/:id",
    jobController.getJobById
);

router.get(
    "/jobs-paginated",
    jobController.getPaginatedJobs
);

// Protected Routes

router.post(
    "/jobs",
    verifyToken,
    jobController.createJob
);

router.put(
    "/jobs/:id",
    verifyToken,
    jobController.updateJob
);

router.delete(
    "/jobs/:id",
    verifyToken,
    authorizeRoles(
        "admin"
    ),
    jobController.deleteJob
);

module.exports = router; 

