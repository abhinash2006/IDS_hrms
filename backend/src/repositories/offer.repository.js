const db =
require("../config/db");

const createOffer =
async (
    offerData
) => {

    const {
        candidate_id,
        offer_title,
        joining_date,
        salary,
        offer_status
    } = offerData;

    const [result] =
    await db.query(
        `
        INSERT INTO offer_letters
        (
            candidate_id,
            offer_title,
            joining_date,
            salary,
            offer_status
        )
        VALUES
        (?, ?, ?, ?, ?)
        `,
        [
            candidate_id,
            offer_title,
            joining_date,
            salary,
            offer_status
        ]
    );

    return result;
};

const getOfferById =
async (id) => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM offer_letters
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

const getOffers =
async () => {

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM offer_letters
        ORDER BY id DESC
        `
    );

    return rows;
};

module.exports = {
    createOffer,
    getOfferById,
    getOffers
};