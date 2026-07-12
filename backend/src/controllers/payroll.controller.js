const payrollService =
require(
    "../services/payroll.service"
);

const asyncHandler =
require(
    "../utils/asyncHandler"
);

const {
    createPayrollSchema
} = require(
    "../validations/payroll.validation"
);

const createPayroll =
asyncHandler(
async (
    req,
    res
) => {

    const {
        error
    } =
    createPayrollSchema
    .validate(
        req.body
    );

  if (error) {

    console.log(
        "PAYROLL VALIDATION ERROR:",
        error.details[0].message
    );

    throw new Error(
        error.details[0].message
    );

}

    const result =
        await payrollService
        .createPayroll(
            req.body
        );

    res.status(201)
    .json({

        success:true,

        payroll_id:
        result.insertId

    });

});

const getPayrolls =
asyncHandler(
async (
    req,
    res
) => {

    const page =
        req.query.page || 1;

    const limit =
        req.query.limit || 5;

    const search =
        req.query.search || "";

    const result =
     await payrollService.getPayrolls(
    page,
    limit,
    search,
    req.user
);

    res.status(200)
    .json({
        success:true,
        data:
            result.payrolls,
        total:
            result.total
    });

});

const updatePayroll =
asyncHandler(
async (
    req,
    res
) => {

    await payrollService
        .updatePayroll(
            req.params.id,
            req.body
        );

    res.status(200)
    .json({
        success:true,
        message:
        "Payroll updated"
    });

});

const deletePayroll =
asyncHandler(
async (
    req,
    res
) => {

    await payrollService
        .deletePayroll(
            req.params.id
        );

    res.status(200)
    .json({
        success:true,
        message:
        "Payroll deleted"
    });

});

module.exports = {
    createPayroll,
    getPayrolls,
    updatePayroll,
    deletePayroll
};