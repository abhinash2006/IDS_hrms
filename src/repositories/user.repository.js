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
        role
    } = userData;

    const [result] =
        await db.query(
            `
            INSERT INTO users
            (
                username,
                email,
                password,
                role
            )
            VALUES
            (?, ?, ?, ?)
            `,
            [
                username,
                email,
                password,
                role
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

module.exports = {
    findByUsername,
    findByEmail,
    createUser
};