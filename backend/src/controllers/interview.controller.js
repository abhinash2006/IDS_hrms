const interviewService =
require(
    "../services/interview.service"
);

const asyncHandler =
require(
    "../utils/asyncHandler"
);

const {
    createInterviewSchema
} = require(
    "../validations/interview.validation"
);

const createInterview =
asyncHandler(
async (
    req,
    res
) => {

    const {
        error
    } =
    createInterviewSchema
    .validate(
        req.body
    );

    if (error) {

        throw new Error(
            error.details[0]
            .message
        );

    }

    const result =
    await interviewService
    .createInterview(
        req.body
    );

    res.status(201)
    .json({
        success:true,
        interview_id:
        result.insertId
    });

});

const getInterviews =
asyncHandler(
async (
    req,
    res
) => {

    const interviews =
    await interviewService
    .getInterviews();

    res.status(200)
    .json({
        success:true,
        data:interviews
    });

});

const getInterviewById =
asyncHandler(
async (
    req,
    res
) => {

    const interview =
    await interviewService
    .getInterviewById(
        req.params.id
    );

    res.status(200)
    .json({
        success:true,
        data:interview
    });

});

const updateInterview =
asyncHandler(
async (
    req,
    res
) => {

    await interviewService
    .updateInterview(
        req.params.id,
        req.body
    );

    res.status(200)
    .json({
        success:true,
        message:
        "Interview updated successfully"
    });

});

const deleteInterview =
asyncHandler(
async (
    req,
    res
) => {

    await interviewService
    .deleteInterview(
        req.params.id
    );

    res.status(200)
    .json({
        success:true,
        message:
        "Interview deleted successfully"
    });

});

const getPaginatedInterviews =
asyncHandler(
async (
    req,
    res
) => {

    const page =
        parseInt(
            req.query.page
        ) || 1;

    const limit =
        parseInt(
            req.query.limit
        ) || 10;

    const search =
        req.query.search || "";

    const result =
        await interviewService
        .getPaginatedInterviewsData(
            page,
            limit,
            search
        );

    const totalPages =
        Math.ceil(
            result.totalRecords
            / limit
        );

    res.status(200)
    .json({

        success: true,

        page,

        limit,

        total_records:
            result.totalRecords,

        total_pages:
            totalPages,

        data:
            result.interviews

    });

});

module.exports = {
    createInterview,
    getInterviews,
    getInterviewById,
    updateInterview,
    deleteInterview,
    getPaginatedInterviews
};