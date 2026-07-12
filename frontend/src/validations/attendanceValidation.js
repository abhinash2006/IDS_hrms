import * as Yup from "yup";

export const attendanceSchema = Yup.object().shape({
    employee_id: Yup.number()
        .typeError("Employee ID must be a number")
        .required("Employee ID is required"),
    attendance_date: Yup.date()
        .required("Attendance Date is required"),
    status: Yup.string()
        .oneOf(["Present", "Absent", "Half Day", "Leave"], "Invalid Status")
        .required("Status is required")
});
