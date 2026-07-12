import axiosInstance
from "../services/axiosInstance";

export const downloadPayslip =
async (payrollId) => {

    try {

        const response =
            await axiosInstance.get(
                `/payslips/${payrollId}/pdf`,
                {
                    responseType: "blob"
                }
            );

        const url =
            window.URL.createObjectURL(
                new Blob([response.data])
            );

        const link =
            document.createElement("a");

        link.href = url;

        link.setAttribute(
            "download",
            `payslip_${payrollId}.pdf`
        );

        document.body.appendChild(
            link
        );

        link.click();

        link.remove();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to download payslip"
        );

    }

};