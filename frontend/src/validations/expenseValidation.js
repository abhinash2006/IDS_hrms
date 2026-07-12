import * as yup from "yup";

export const expenseSchema = yup.object({
    claim_title: yup.string()
        .max(255, "Claim title must be less than 255 characters")
        .required("Claim Title is required"),
    amount: yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than zero")
        .required("Amount is required"),
    bill_attachment: yup.string()
        .nullable(),
    status: yup.string()
        .oneOf(["Pending", "Approved", "Rejected"], "Invalid status")
        .optional()
});
