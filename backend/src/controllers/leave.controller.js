const leaveService =
require(
    "../services/leave.service"
);

const asyncHandler =
require(
    "../utils/asyncHandler"
);

const {
    createLeaveSchema
} = require(
    "../validations/leave.validation"
);

const createLeave =
asyncHandler(
async (
    req,
    res
) => {

   if (
    req.user.role ===
    "employee"
) {
    delete req.body.employee_id;
}

const {
    error
} =
createLeaveSchema
.validate(
    req.body
);

    if (error) {

        const validationError =
            new Error(
                error.details[0]
                .message
            );

        validationError.statusCode =
            400;

        throw validationError;

    }

   const result =
await leaveService
.createLeave(
    req.body,
    req.user
);

    res.status(201)
    .json({

        success:true,

        message:
        "Leave request created successfully",

        leave_id:
        result.insertId

    });

});

const getLeaves =
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
await leaveService
.getLeaves(
    page,
    limit,
    search,
    req.user
);

    res.status(200)
    .json({
        success:true,
        data:
            result.leaves,
        total:
            result.total
    });

});

const getLeaveById =
asyncHandler(
async (
    req,
    res
) => {

    const leave =
        await leaveService
        .getLeaveById(
            req.params.id
        );

    res.status(200)
    .json({
        success:true,
        data:leave
    });

});

const updateLeave =
asyncHandler(
async (
    req,
    res
) => {

    await leaveService
        .updateLeave(
            req.params.id,
            req.body
        );

    res.status(200)
    .json({

        success:true,

        message:
        "Leave updated successfully"

    });

});

const deleteLeave =
asyncHandler(
async (
    req,
    res
) => {

    await leaveService
        .deleteLeave(
            req.params.id
        );

    res.status(200)
    .json({

        success:true,

        message:
        "Leave deleted successfully"

    });

});

module.exports = {
    createLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave
};