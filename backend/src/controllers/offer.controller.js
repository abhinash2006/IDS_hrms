const offerService =
require(
    "../services/offer.service"
);

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
    generateOfferLetter
};