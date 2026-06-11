const jobService = require("../services/job.service");

const getJobs = async (req, res) => {
    try {
        const jobs = await jobService.getJobs();

        res.status(200).json({
            success: true,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const { createJobSchema } =
require("../validations/job.validation");

const createJob = async (req, res) => {

    try {

        const { error } =
            createJobSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const result =
            await jobService.createJob(req.body);

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job_id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const asyncHandler =
require(
"../utils/asyncHandler"
);

const getJobById =
asyncHandler(
async (req,res) => {

    const job =
        await jobService
        .getJobById(
            req.params.id
        );

    if(!job){

        const error =
            new Error(
                "Job not found"
            );

        error.statusCode =
            404;

        throw error;
    }

    res.status(200).json({
        success:true,
        data:job
    });

});

const updateJob = async (req, res) => {

    try {

        const { id } = req.params;

        const { error } =
            createJobSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        await jobService.updateJob(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Job updated successfully"
        });

    } catch (error) {

        if (error.message === "Job not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteJob = async (req, res) => {

    try {

        const { id } = req.params;

        await jobService.deleteJob(id);

        res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {

        if (error.message === "Job not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getPaginatedJobs =
async (req, res) => {

    try {

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
            await jobService
            .getPaginatedJobsData(
                page,
                limit,
                search
            );

        const totalPages =
            Math.ceil(
                result.totalRecords
                / limit
            );

        res.status(200).json({

            success: true,

            page,

            limit,

            total_records:
                result.totalRecords,

            total_pages:
                totalPages,

            data:
                result.jobs

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

};


module.exports = {
    getJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob,
    getPaginatedJobs
};