const announcementService =
require(
    "../services/announcement.service"
);

const createAnnouncement =
async (
    req,
    res
) => {

    try {

        const result =
        await announcementService
        .createAnnouncement(
            req.body
        );

        res.status(201)
        .json({
            success:true,
            announcement_id:
            result.insertId
        });

    } catch(error){

        res.status(400)
        .json({
            success:false,
            message:error.message
        });

    }

};

const getAnnouncements =
async (
    req,
    res
) => {

    try {

        const announcements =
        await announcementService
        .getAnnouncements();

        res.status(200)
        .json({
            success:true,
            data:announcements
        });

    } catch(error){

        res.status(400)
        .json({
            success:false,
            message:error.message
        });

    }

};

const updateAnnouncement =
async (
    req,
    res
) => {

    try {

        await announcementService
        .updateAnnouncement(
            req.params.id,
            req.body
        );

        res.status(200)
        .json({
            success:true,
            message:
            "Announcement updated"
        });

    } catch(error){

        res.status(400)
        .json({
            success:false,
            message:error.message
        });

    }

};

const deleteAnnouncement =
async (
    req,
    res
) => {

    try {

        await announcementService
        .deleteAnnouncement(
            req.params.id
        );

        res.status(200)
        .json({
            success:true,
            message:
            "Announcement deleted"
        });

    } catch(error){

        res.status(400)
        .json({
            success:false,
            message:error.message
        });

    }

};

module.exports = {
    createAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
};