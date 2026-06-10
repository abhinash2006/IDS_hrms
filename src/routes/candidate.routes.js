const express =
require("express");

const router =
express.Router();

const candidateController =
require(
    "../controllers/candidate.controller"
);

const verifyToken =
require(
    "../middlewares/auth.middleware"
);

const authorizeRoles =
require(
    "../middlewares/role.middleware"
);
const upload =
require(
    "../middlewares/upload.middleware"
);
router.get(
    "/candidates",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    candidateController
        .getCandidates
);



router.get(
    "/candidates/paginated",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    candidateController
        .getPaginatedCandidates
);
router.get(
    "/candidates/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    candidateController
        .getCandidateById
);

router.post(
    "/candidates",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    upload.single(
        "resume"
    ),
    candidateController
        .createCandidate
);

router.put(
    "/candidates/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    upload.single(
        "resume"
    ),
    candidateController
        .updateCandidate
);

router.delete(
    "/candidates/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    candidateController
        .deleteCandidate
);

module.exports =
router;