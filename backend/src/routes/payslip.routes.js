const express =
require("express");

const router =
express.Router();

const payslipController =
require(
    "../controllers/payslip.controller"
);

const verifyToken =
require(
    "../middlewares/auth.middleware"
);

router.get(
    "/payslips/:id/pdf",
    verifyToken,
    payslipController
        .generatePayslip
);

module.exports =
router;