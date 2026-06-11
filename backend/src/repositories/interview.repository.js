const db =
require("../config/db");

const createInterview =
async (
    interviewData
) => {
       logger(
    "CREATE_INTERVIEW",
    `Interview created for candidate ${interviewData.candidate_id}`
);
    const {
        candidate_id,
        interview_date,
        interview_time,
        interviewer_name,
        interview_mode,
        status
    } = interviewData;

    const [result] =
    await db.query(
        `
        INSERT INTO interviews
        (
            candidate_id,
            interview_date,
            interview_time,
            interviewer_name,
            interview_mode,
            status
        )
        VALUES
        (?, ?, ?, ?, ?, ?)
        `,
        [
            candidate_id,
            interview_date,
            interview_time,
            interviewer_name,
            interview_mode,
            status
        ]
    );

    return result;
};

const getInterviews =
async () => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM interviews
        ORDER BY id DESC
        `
    );

    return rows;
};

const getInterviewById =
async (id) => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM interviews
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

const updateInterview =
async (
    id,
    interviewData
) => {
     logger(
    "UPDATE_INTERVIEW",
    `Interview ID ${id} updated`
);
    const {
        candidate_id,
        interview_date,
        interview_time,
        interviewer_name,
        interview_mode,
        status
    } = interviewData;

    const [result] =
    await db.query(
        `
        UPDATE interviews
        SET
            candidate_id = ?,
            interview_date = ?,
            interview_time = ?,
            interviewer_name = ?,
            interview_mode = ?,
            status = ?
        WHERE id = ?
        `,
        [
            candidate_id,
            interview_date,
            interview_time,
            interviewer_name,
            interview_mode,
            status,
            id
        ]
    );

    return result;
};

const deleteInterview =
async (id) => {
        logger(
    "DELETE_INTERVIEW",
    `Interview ID ${id} deleted`
);
    const [result] =
    await db.query(
        `
        DELETE FROM interviews
        WHERE id = ?
        `,
        [id]
    );

    return result;
};

const getPaginatedInterviews =
async (
    page,
    limit,
    search
) => {

    const offset =
        (page - 1) * limit;

    let query =
        `
        SELECT *
        FROM interviews
        `;

    let params = [];

    if (search) {

        query += `
            WHERE interviewer_name LIKE ?
            OR status LIKE ?
        `;

        params.push(
            `%${search}%`,
            `%${search}%`
        );

    }

    query += `
        ORDER BY id DESC
        LIMIT ?
        OFFSET ?
    `;

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

const getTotalInterviewsCount =
async (
    search
) => {

    let query =
        `
        SELECT COUNT(*) AS total
        FROM interviews
        `;

    let params = [];

    if (search) {

        query += `
            WHERE interviewer_name LIKE ?
            OR status LIKE ?
        `;

        params.push(
            `%${search}%`,
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
    createInterview,
    getInterviews,
    getInterviewById,
    updateInterview,
    deleteInterview,
    getPaginatedInterviews,
    getTotalInterviewsCount
};