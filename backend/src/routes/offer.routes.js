const express =
require("express");

const router =
express.Router();

const offerController =
require(
    "../controllers/offer.controller"
);

router.post(
    "/offers",
    offerController.createOffer
);

router.get(
    "/offers",
    offerController.getOffers
);

router.get(
    "/offers/:id/pdf",
    offerController.generateOfferLetter
);

module.exports =
router;