const jobRepository = require("../repositories/job.repository");

const getJobs = async () => {
    return await jobRepository.getJobs();
};
const createJob = async (jobData) => {

    return await jobRepository.createJob(jobData);

};
const getJobById = async (id) => {

    return await jobRepository.getJobById(id);

};
const updateJob = async (id, jobData) => {

    const existingJob =
        await jobRepository.getJobById(id);

    if (!existingJob) {
        throw new Error("Job not found");
    }

    return await jobRepository.updateJob(
        id,
        jobData
    );
};

const deleteJob = async (id) => {

    const existingJob =
        await jobRepository.getJobById(id);

    if (!existingJob) {
        throw new Error("Job not found");
    }

    return await jobRepository.deleteJob(id);
};
const getJobsWithPagination =
async (
    page,
    limit,
    search
) => {

    return await
        jobRepository
        .getJobsWithPagination(
            page,
            limit,
            search
        );
};

const getPaginatedJobsData =
async (
    page,
    limit,
    search
) => {

    const jobs =
        await jobRepository
        .getJobsWithPagination(
            page,
            limit,
            search
        );

    const totalRecords =
        await jobRepository
        .getTotalJobsCount(
            search
        );

    return {
        jobs,
        totalRecords
    };
};

module.exports = {
    getJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob,
    getJobsWithPagination,
    getPaginatedJobsData
};