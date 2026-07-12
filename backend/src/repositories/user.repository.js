const db =
require("../config/db");

const findByUsername =
async (
    username
) => {

    const [rows] =
        await db.query(
            `
            SELECT *
            FROM users
            WHERE username = ?
            `,
            [username]
        );

    return rows[0];
};

const createUser =
async (
    userData
) => {

    const {
        username,
        email,
        password,
        role,
        status
    } = userData;

    const [result] =
        await db.query(
            `
            INSERT INTO users
            (
                username,
                email,
                password,
                role,
                status
            )
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [
                username,
                email,
                password,
                role,
                status
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
            FROM users
            WHERE email = ?
            `,
            [email]
        );

    return rows[0];
};
const getUsers = async (
    page = 1,
    limit = 5,
    search = ""
) => {

    const offset =
        (page - 1) * limit;

    let query =
        `
        SELECT
            id,
            username,
            email,
            role,
            status,
            created_at
        FROM users
        `;

    let countQuery =
        `
        SELECT COUNT(*) total
        FROM users
        `;

    const params = [];

    if(search){

        query +=
        `
        WHERE username LIKE ?
        OR email LIKE ?
        `;

        countQuery +=
        `
        WHERE username LIKE ?
        OR email LIKE ?
        `;

        params.push(
            `%${search}%`,
            `%${search}%`
        );
    }

    query +=
    `
    ORDER BY id DESC
    LIMIT ?
    OFFSET ?
    `;

    const [rows] =
    await db.query(
        query,
        [
            ...params,
            Number(limit),
            Number(offset)
        ]
    );

    const [countRows] =
    await db.query(
        countQuery,
        params
    );

    return {
        users: rows,
        total:
        countRows[0].total
    };
};

const getUserById =
async (id) => {

    const [rows] =
        await db.query(
            `
            SELECT
                id,
                username,
                email,
                role,
                status
            FROM users
            WHERE id = ?
            `,
            [id]
        );

    return rows[0];

};

const updateUser =
async (
    id,
    userData
) => {

    const {
        username,
        email,
        role,
        status
    } = userData;

    const [result] =
        await db.query(
            `
            UPDATE users
            SET
                username = ?,
                email = ?,
                role = ?,
                status = ?
            WHERE id = ?
            `,
            [
                username,
                email,
                role,
                status,
                id
            ]
        );

    return result;

};

const deleteUser =
async (id) => {

    const [result] =
        await db.query(
            `
            DELETE FROM users
            WHERE id = ?
            `,
            [id]
        );

    return result;

};

const getEmployeeUsers =
async () => {

    const [rows] =
    await db.query(
        `
        SELECT
            id,
            username
        FROM users
        WHERE role = 'employee'
        `
    );

    return rows;
};

module.exports = {
    findByUsername,
    findByEmail,
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
        getEmployeeUsers
};