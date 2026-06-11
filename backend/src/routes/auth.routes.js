const express =
require("express");

const router =
express.Router();

const authController =
require(
"../controllers/auth.controller"
);

router.post(
    "/login",
    authController.login
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
    "/register",
    // verifyToken,
    // authorizeRoles(
    //     "admin"
    // ),
    authController.register
);

module.exports =
router;