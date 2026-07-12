const PDFDocument =
require("pdfkit");

const fs =
require("fs");

const path =
require("path");

const payrollRepository =
require(
    "../repositories/payroll.repository"
);

const generatePayslip =
async (
    payrollId
) => {

    const payroll =
        await payrollRepository
        .getPayrollById(
            payrollId
        );

    if(!payroll){

        throw new Error(
            "Payroll not found"
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
            `payslip_${payrollId}.pdf`
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
        "Employee Payslip",
        {
            align:"center"
        }
    );

    doc.moveDown();

    doc.text(
        `Employee ID: ${payroll.employee_id}`
    );

    doc.text(
        `Month: ${payroll.payroll_month}`
    );

    doc.text(
        `Year: ${payroll.payroll_year}`
    );

    doc.moveDown();

    doc.text(
        `Basic Salary: ₹${payroll.basic_salary}`
    );

    doc.text(
        `HRA: ₹${payroll.hra}`
    );

    doc.text(
        `Bonus: ₹${payroll.bonus}`
    );

    doc.text(
        `Deductions: ₹${payroll.deductions}`
    );

    doc.moveDown();

    doc.fontSize(16)
    .text(
        `Net Salary: ₹${payroll.net_salary}`
    );

    doc.end();

    await new Promise(
        (
            resolve,
            reject
        ) => {

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
    generatePayslip
};