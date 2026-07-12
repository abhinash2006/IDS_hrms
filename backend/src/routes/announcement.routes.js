const express =
require("express");

const router =
express.Router();

const announcementController =
require(
    "../controllers/announcement.controller"
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
    "/announcements",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    announcementController
    .createAnnouncement
);

router.get(
    "/announcements",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr",
        "employee"
    ),
    announcementController
    .getAnnouncements
);

router.put(
    "/announcements/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    announcementController
    .updateAnnouncement
);

router.delete(
    "/announcements/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "hr"
    ),
    announcementController
    .deleteAnnouncement
);

module.exports =
router;