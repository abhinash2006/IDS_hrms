const PDFDocument =
require("pdfkit");

const fs =
require("fs");

const path =
require("path");

const offerRepository =
require(
    "../repositories/offer.repository"
);

const candidateRepository =
require(
    "../repositories/candidate.repository"
);

const generateOfferLetter =
async (
    offerId
) => {

    const offer =
        await offerRepository
        .getOfferById(
            offerId
        );

    if (!offer) {

        throw new Error(
            "Offer not found"
        );

    }

    const candidate =
        await candidateRepository
        .getCandidateById(
            offer.candidate_id
        );

    if (!candidate) {

        throw new Error(
            "Candidate not found"
        );

    }

    const pdfPath =
        path.join(
            __dirname,
            "..",
            "pdfs",
            `offer_${offerId}.pdf`
        );

    const doc =
        new PDFDocument();

    doc.pipe(
        fs.createWriteStream(
            pdfPath
        )
    );

    doc.fontSize(20)
    .text(
        "ABC Technologies Pvt Ltd",
        {
            align:"center"
        }
    );

    doc.moveDown();

    doc.fontSize(14)
    .text(
        `Date: ${new Date().toLocaleDateString()}`
    );

    doc.moveDown();

    doc.text(
        `Dear ${candidate.first_name} ${candidate.last_name},`
    );

    doc.moveDown();

    doc.text(
        `We are pleased to offer you the position of ${offer.offer_title}.`
    );

    doc.moveDown();

    doc.text(
        `Joining Date: ${offer.joining_date}`
    );

    doc.text(
        `Salary: ₹${offer.salary}`
    );

    doc.moveDown();

    doc.text(
        "We look forward to having you on our team."
    );

    doc.moveDown();

    doc.text(
        "Regards,"
    );

    doc.text(
        "HR Department"
    );

    doc.end();

    return pdfPath;
};

module.exports = {
    generateOfferLetter
};