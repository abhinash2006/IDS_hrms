const payslipService =
require(
    "../services/payslip.service"
);

const generatePayslip =
async (
    req,
    res
) => {

    try {

        const pdfPath =
            await payslipService
            .generatePayslip(
                req.params.id
            );

        res.download(
            pdfPath
        );

    } catch(error){

        res.status(400)
        .json({
            success:false,
            message:error.message
        });

    }

};

module.exports = {
    generatePayslip
};