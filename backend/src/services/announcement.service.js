const announcementRepository =
require(
    "../repositories/announcement.repository"
);

const createAnnouncement =
async (
    announcementData
) => {

    return await
    announcementRepository
    .createAnnouncement(
        announcementData
    );

};

const getAnnouncements =
async () => {

    return await
    announcementRepository
    .getAnnouncements();

};

const updateAnnouncement =
async (
    id,
    announcementData
) => {

    return await
    announcementRepository
    .updateAnnouncement(
        id,
        announcementData
    );

};

const deleteAnnouncement =
async (id) => {

    return await
    announcementRepository
    .deleteAnnouncement(
        id
    );

};

module.exports = {
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
};