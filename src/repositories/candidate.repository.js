const db =
require("../config/db");

const createCandidate =
async (
    candidateData
) => {

    const {
        first_name,
        last_name,
        email,
        mobile,
        resume_path,
        application_status
    } = candidateData;

    const [result] =
        await db.query(
            `
            INSERT INTO candidates
            (
                first_name,
                last_name,
                email,
                mobile,
                resume_path,
                application_status
            )
            VALUES
            (?, ?, ?, ?, ?, ?)
            `,
            [
                first_name,
                last_name,
                email,
                mobile,
                resume_path,
                application_status
            ]
        );

    return result;
};

const findByEmail =
async (
    email
) => {

    const [rows] =
        await db.query(
            `
            SELECT *
            FROM candidates
            WHERE email = ?
            `,
            [email]
        );

    return rows[0];
};

const getCandidates =
async () => {

    const [rows] =
        await db.query(
            `
            SELECT *
            FROM candidates
            ORDER BY id DESC
            `
        );

    return rows;
};
const getCandidateById =
async (id) => {

    const [rows] =
        await db.query(
            `
            SELECT *
            FROM candidates
            WHERE id = ?
            `,
            [id]
        );

    return rows[0];
};

const updateCandidate =
async (
    id,
    candidateData
) => {

    const {
        first_name,
        last_name,
        email,
        mobile,
        resume_path,
        application_status
    } = candidateData;

    const [result] =
        await db.query(
            `
            UPDATE candidates
            SET
                first_name = ?,
                last_name = ?,
                email = ?,
                mobile = ?,
                resume_path = ?,
                application_status = ?
            WHERE id = ?
            `,
            [
                first_name,
                last_name,
                email,
                mobile,
                resume_path,
                application_status,
                id
            ]
        );

    return result;
};

const deleteCandidate =
async (id) => {

    const [result] =
        await db.query(
            `
            DELETE FROM candidates
            WHERE id = ?
            `,
            [id]
        );

    return result;
};
const getPaginatedCandidates =
async (
    page,
    limit,
    search
) => {

    const offset =
        (page - 1) * limit;

    let query =
        "SELECT * FROM candidates";

    let params = [];

    if (search) {

        query += `
            WHERE first_name LIKE ?
            OR last_name LIKE ?
            OR email LIKE ?
        `;

        params.push(
            `%${search}%`,
            `%${search}%`,
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
const getTotalCandidatesCount =
async (search) => {

    let query =
        "SELECT COUNT(*) AS total FROM candidates";

    let params = [];

    if (search) {

        query += `
            WHERE first_name LIKE ?
            OR last_name LIKE ?
            OR email LIKE ?
            OR mobile LIKE ?
        `;

        params.push(
            `%${search}%`,
            `%${search}%`,
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
    createCandidate,
    findByEmail,
    getCandidates,
    getCandidateById,
    updateCandidate,
    deleteCandidate,
    getPaginatedCandidates,
    getTotalCandidatesCount

};