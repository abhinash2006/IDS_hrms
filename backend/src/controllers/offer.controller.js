const offerService =
require(
    "../services/offer.service"
);

const createOffer =
async (
    req,
    res
) => {

    try {

        const result =
            await offerService
            .createOffer(
                req.body
            );

        res.status(201)
        .json({
            success:true,
            offer_id:
                result.insertId
        });

    } catch (error) {

        res.status(400)
        .json({
            success:false,
            message:error.message
        });

    }

};

const getOffers =
async (
    req,
    res
) => {

    try {

        const offers =
            await offerService
            .getOffers();

        res.status(200)
        .json({
            success:true,
            data:offers
        });

    } catch (error) {

        res.status(400)
        .json({
            success:false,
            message:error.message
        });

    }

};

const generateOfferLetter =
async (
    req,
    res
) => {

    try {

        const pdfPath =
            await offerService
            .generateOfferLetter(
                req.params.id
            );

        res.download(
            pdfPath
        );

    } catch (error) {

        res.status(400)
        .json({
            success:false,
            message:error.message
        });

    }

};

module.exports = {
    createOffer,
    getOffers,
    generateOfferLetter
};