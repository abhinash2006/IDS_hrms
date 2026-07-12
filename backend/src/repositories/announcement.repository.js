const db =
require("../config/db");

const createAnnouncement =
async (
    announcementData
) => {

    const {
        title,
        message
    } = announcementData;

    const [result] =
    await db.query(
        `
        INSERT INTO announcements
        (
            title,
            message
        )
        VALUES
        (?, ?)
        `,
        [
            title,
            message
        ]
    );

    return result;
};

const getAnnouncements =
async () => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM announcements
        ORDER BY id DESC
        `
    );

    return rows;
};

const getAnnouncementById =
async (id) => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM announcements
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

const updateAnnouncement =
async (
    id,
    announcementData
) => {

    const {
        title,
        message
    } = announcementData;

    const [result] =
    await db.query(
        `
        UPDATE announcements
        SET
            title = ?,
            message = ?
        WHERE id = ?
        `,
        [
            title,
            message,
            id
        ]
    );

    return result;
};

const deleteAnnouncement =
async (id) => {

    const [result] =
    await db.query(
        `
        DELETE FROM announcements
        WHERE id = ?
        `,
        [id]
    );

    return result;
};

module.exports = {
    createAnnouncement,
    getAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement
};