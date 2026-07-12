const offerRepository =
require(
    "../repositories/offer.repository"
);

const PDFDocument =
require("pdfkit");

const fs =
require("fs");

const path =
require("path");

const candidateRepository =
require(
    "../repositories/candidate.repository"
);

const createOffer =
async (
    offerData
) => {

    return await
        offerRepository
        .createOffer(
            offerData
        );

};

const getOffers =
async () => {

    return await
        offerRepository
        .getOffers();

};

const generateOfferLetter =
async (
    offerId
) => {

    const offer =
        await offerRepository
        .getOfferById(
            offerId
        );

    if(!offer){

        throw new Error(
            "Offer not found"
        );

    }

    const candidate =
        await candidateRepository
        .getCandidateById(
            offer.candidate_id
        );

    if(!candidate){

        throw new Error(
            "Candidate not found"
        );

    }

    const pdfDir =
        path.join(
            __dirname,
            "..",
            "pdfs"
        );

    if(
        !fs.existsSync(
            pdfDir
        )
    ){

        fs.mkdirSync(
            pdfDir
        );

    }

    const pdfPath =
    path.join(
        pdfDir,
        `offer_${offerId}.pdf`
    );

const doc =
    new PDFDocument();

const stream =
    fs.createWriteStream(
        pdfPath
    );

doc.pipe(stream);

doc.fontSize(20)
.text(
    "ABC Technologies Pvt Ltd",
    {
        align: "center"
    }
);

doc.moveDown();

doc.text(
    `Dear ${candidate.first_name} ${candidate.last_name}`
);

doc.moveDown();

doc.text(
    `Position: ${offer.offer_title}`
);

doc.text(
    `Joining Date: ${offer.joining_date}`
);

doc.text(
    `Salary: ₹${offer.salary}`
);

doc.moveDown();

doc.text(
    "Welcome to our company."
);

doc.end();

await new Promise(
    (resolve, reject) => {

        stream.on(
            "finish",
            resolve
        );

        stream.on(
            "error",
            reject
        );

    }
);

return pdfPath;

};

module.exports = {
    createOffer,
    getOffers,
    generateOfferLetter
};