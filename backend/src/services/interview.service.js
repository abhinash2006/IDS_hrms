const interviewRepository =
require(
    "../repositories/interview.repository"
);

const logger =
require(
    "../utils/logger"
);

const createInterview =
async (
    interviewData
) => {

    return await
    interviewRepository
    .createInterview(
        interviewData
    );

};

const getInterviews =
async () => {

    return await
    interviewRepository
    .getInterviews();

};

const getInterviewById =
async (id) => {

    const interview =
    await interviewRepository
    .getInterviewById(id);

    if (!interview) {

        const error =
        new Error(
            "Interview not found"
        );

        error.statusCode =
        404;

        throw error;
    }

    return interview;
};

const updateInterview =
async (
    id,
    interviewData
) => {

    await getInterviewById(id);

    return await
    interviewRepository
    .updateInterview(
        id,
        interviewData
    );
};

const deleteInterview =
async (id) => {

    await getInterviewById(id);

    return await
    interviewRepository
    .deleteInterview(id);
};
const getPaginatedInterviewsData =
async (
    page,
    limit,
    search
) => {

    const interviews =
        await interviewRepository
        .getPaginatedInterviews(
            page,
            limit,
            search
        );

    const totalRecords =
        await interviewRepository
        .getTotalInterviewsCount(
            search
        );

    return {
        interviews,
        totalRecords
    };
};

module.exports = {
    createInterview,
    getInterviews,
    getInterviewById,
    updateInterview,
    deleteInterview,
    getPaginatedInterviewsData
};