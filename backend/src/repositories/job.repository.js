const db = require("../config/db");

const getJobs = async () => {

    const [rows] = await db.query(
        "SELECT * FROM jobs"
    );

    return rows;
};


const createJob = async (jobData) => {

    const {
        job_title,
        department_id,
        experience_required,
        job_description,
        status
    } = jobData;

    const [result] = await db.query(
        `
        INSERT INTO jobs
        (
            job_title,
            department_id,
            experience_required,
            job_description,
            status
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            job_title,
            department_id,
            experience_required,
            job_description,
            status
        ]
    );

    return result;
};
const getJobById = async (id) => {

    const [rows] = await db.query(
        "SELECT * FROM jobs WHERE id = ?",
        [id]
    );

    return rows[0];
};
const updateJob = async (id, jobData) => {

    const {
        job_title,
        department_id,
        experience_required,
        job_description,
        status
    } = jobData;

    const [result] = await db.query(
        `
        UPDATE jobs
        SET
            job_title = ?,
            department_id = ?,
            experience_required = ?,
            job_description = ?,
            status = ?
        WHERE id = ?
        `,
        [
            job_title,
            department_id,
            experience_required,
            job_description,
            status,
            id
        ]
    );

    return result;
};

const deleteJob = async (id) => {

    const [result] = await db.query(
        "DELETE FROM jobs WHERE id = ?",
        [id]
    );

    return result;
};
const getJobsWithPagination = async (
    page,
    limit,
    search
) => {

    const offset =
        (page - 1) * limit;

    let query =
        "SELECT * FROM jobs";

    let params = [];

    if (search) {

        query +=
            " WHERE job_title LIKE ?";

        params.push(
            `%${search}%`
        );
    }

    query +=
        " LIMIT ? OFFSET ?";

    params.push(
        parseInt(limit),
        parseInt(offset)
    );

    const [rows] =
        await db.query(
            query,
            params
        );

    return rows;
};

const getTotalJobsCount = async (
    search
) => {

    let query =
        "SELECT COUNT(*) AS total FROM jobs";

    let params = [];

    if (search) {

        query +=
            " WHERE job_title LIKE ?";

        params.push(
            `%${search}%`
        );
    }

    const [rows] =
        await db.query(
            query,
            params
        );

    return rows[0].total;
}; 
module.exports = {
    getJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob,
    getJobsWithPagination,
    getTotalJobsCount
};