const attendanceService =
require(
    "../services/attendance.service"
);

const asyncHandler =
require(
    "../utils/asyncHandler"
);

const {
    createAttendanceSchema
} = require(
    "../validations/attendance.validation"
);

const createAttendance =
asyncHandler(
async (
    req,
    res
) => {

    const {
        error
    } =
    createAttendanceSchema
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
        await attendanceService
        .createAttendance(
            req.body
        );

    res.status(201)
    .json({

        success:true,

        message:
        "Attendance created successfully",

        attendance_id:
        result.insertId

    });

});

const getAttendance =
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
await attendanceService
.getAttendance(
    page,
    limit,
    search
);

res.status(200)
.json({
    success:true,
    data:
        result.attendance,
    total:
        result.total
});

  

});

const getAttendanceById =
asyncHandler(
async (
    req,
    res
) => {

    const attendance =
        await attendanceService
        .getAttendanceById(
            req.params.id
        );

    res.status(200)
    .json({
        success:true,
        data:attendance
    });

});

const updateAttendance =
asyncHandler(
async (
    req,
    res
) => {

    await attendanceService
        .updateAttendance(
            req.params.id,
            req.body
        );

    res.status(200)
    .json({

        success:true,

        message:
        "Attendance updated successfully"

    });

});

const deleteAttendance =
asyncHandler(
async (
    req,
    res
) => {

    await attendanceService
        .deleteAttendance(
            req.params.id
        );

    res.status(200)
    .json({

        success:true,

        message:
        "Attendance deleted successfully"

    });

});



const markAttendance =
async (
    req,
    res
) => {

    try {

        await attendanceService
        .markAttendance(
            req.user.id
        );

        res.status(201)
        .json({
            success:true,
            message:
                "Attendance marked successfully"
        });

    } catch(error){

        res.status(400)
        .json({
            success:false,
            message:
                error.message
        });

    }

};

module.exports = {
    markAttendance
};

module.exports = {
    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
    markAttendance
};