const candidateService =
require(
    "../services/candidate.service"
);

const asyncHandler =
require(
    "../utils/asyncHandler"
);

const {
    createCandidateSchema
} = require(
    "../validations/candidate.validation"
);

const createCandidate =
asyncHandler(
async (
    req,
    res
) => {

    if (
        req.file
    ) {

        req.body.resume_path =
            req.file.filename;

    }

    const {
        error
    } =
    createCandidateSchema
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
        await candidateService
        .createCandidate(
            req.body
        );

    res.status(201)
    .json({
        success:true,
        message:
        "Candidate created successfully",
        candidate_id:
        result.insertId
    });

});

const getCandidates =
asyncHandler(
async (
    req,
    res
) => {

    const candidates =
        await candidateService
        .getCandidates();

    res.status(200)
    .json({
        success:true,
        data:candidates
    });

});

const getCandidateById =
asyncHandler(
async (
    req,
    res
) => {

    const candidate =
        await candidateService
        .getCandidateById(
            req.params.id
        );

    res.status(200)
    .json({
        success: true,
        data: candidate
    });

});

const updateCandidate =
asyncHandler(
async (
    req,
    res
) => {
      if (
    req.file
) {

    req.body.resume_path =
        req.file.filename;

}
    const {
        error
    } =

    
    createCandidateSchema
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

    await candidateService
        .updateCandidate(
            req.params.id,
            req.body
        );

    res.status(200)
    .json({
        success: true,
        message:
        "Candidate updated successfully"
    });

});

const deleteCandidate =
asyncHandler(
async (
    req,
    res
) => {

    await candidateService
        .deleteCandidate(
            req.params.id
        );

    res.status(200)
    .json({
        success: true,
        message:
        "Candidate deleted successfully"
    });

});

const getPaginatedCandidates =
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
        await candidateService
        .getPaginatedCandidatesData(
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
            result.candidates

    });

});

module.exports = {
    createCandidate,
    getCandidates,
    getCandidateById,
    updateCandidate,
    deleteCandidate,
    getPaginatedCandidates
};
