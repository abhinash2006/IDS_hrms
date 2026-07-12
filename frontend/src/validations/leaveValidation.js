import * as Yup from "yup";

export const leaveSchema = Yup.object().shape({
    employee_id: Yup.number()
        .typeError("Employee ID must be a number")
        .when("$role", {
            is: (role) => role !== "employee",
            then: (schema) => schema.required("Employee ID is required"),
            otherwise: (schema) => schema.notRequired()
        }),
    leave_type: Yup.string()
        .oneOf(["Casual", "Sick", "Earned"], "Invalid Leave Type")
        .required("Leave Type is required"),
    start_date: Yup.date()
        .required("Start Date is required"),
    end_date: Yup.date()
        .min(Yup.ref("start_date"), "End Date cannot be before Start Date")
        .required("End Date is required"),
    reason: Yup.string()
        .max(500, "Reason must be less than 500 characters")
        .required("Reason is required"),
    status: Yup.string()
        .oneOf(["Pending", "Approved", "Rejected"], "Invalid Status")
        .required("Status is required")
});
