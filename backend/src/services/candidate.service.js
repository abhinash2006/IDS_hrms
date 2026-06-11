const candidateRepository =
require(
    "../repositories/candidate.repository"
);
const logger =
require(
    "../utils/logger"
);
const VALID_STATUSES = [
    "Applied",
    "Screening",
    "Interview",
    "Selected",
    "Rejected",
    "Offer",
    "Joined"
];

const createCandidate =
async (
    candidateData
) => {

    const existingCandidate =
        await candidateRepository
        .findByEmail(
            candidateData.email
        );

    if (
        existingCandidate
    ) {

        const error =
            new Error(
                "Candidate already exists"
            );

        error.statusCode =
            400;

        throw error;

    }

    if (
        !VALID_STATUSES.includes(
            candidateData.application_status
        )
    ) {

        const error =
            new Error(
                "Invalid application status"
            );

        error.statusCode =
            400;

        throw error;

    }

    const result =
    await candidateRepository
    .createCandidate(
        candidateData
    );

logger(
    "CREATE_CANDIDATE",
    `Candidate ${candidateData.email} created`
);

return result;
};

const getCandidates =
async () => {

    return await
        candidateRepository
        .getCandidates();

};

const getCandidateById =
async (id) => {

    const candidate =
        await candidateRepository
        .getCandidateById(id);

    if (!candidate) {

        const error =
            new Error(
                "Candidate not found"
            );

        error.statusCode =
            404;

        throw error;

    }

    return candidate;

};

const updateCandidate =
async (
    id,
    candidateData
) => {

    const candidate =
        await candidateRepository
        .getCandidateById(id);

    if (!candidate) {

        const error =
            new Error(
                "Candidate not found"
            );

        error.statusCode =
            404;

        throw error;

    }

    const existingCandidate =
        await candidateRepository
        .findByEmail(
            candidateData.email
        );

    if (
        existingCandidate &&
        existingCandidate.id != id
    ) {

        const error =
            new Error(
                "Email already exists"
            );

        error.statusCode =
            400;

        throw error;

    }

    if (
        !VALID_STATUSES.includes(
            candidateData.application_status
        )
    ) {

        const error =
            new Error(
                "Invalid application status"
            );

        error.statusCode =
            400;

        throw error;

    }
    logger(
    "UPDATE_CANDIDATE",
    `Candidate ID ${id} updated`
);

    return await
        candidateRepository
        .updateCandidate(
            id,
            candidateData
        );

};

const deleteCandidate =
async (id) => {

    const candidate =
        await candidateRepository
        .getCandidateById(id);

    if (!candidate) {

        const error =
            new Error(
                "Candidate not found"
            );

        error.statusCode =
            404;

        throw error;

    }

    logger(
    "DELETE_CANDIDATE",
    `Candidate ID ${id} deleted`
);

    return await
        candidateRepository
        .deleteCandidate(
            id
        );

};

const getPaginatedCandidatesData =
async (
    page,
    limit,
    search
) => {

    const candidates =
        await candidateRepository
        .getPaginatedCandidates(
            page,
            limit,
            search
        );

    const totalRecords =
        await candidateRepository
        .getTotalCandidatesCount(
            search
        );
        

    return {
        candidates,
        totalRecords
    };

};

module.exports = {
    createCandidate,
    getCandidates,
    getCandidateById,
    updateCandidate,
    deleteCandidate,
    getPaginatedCandidatesData
};