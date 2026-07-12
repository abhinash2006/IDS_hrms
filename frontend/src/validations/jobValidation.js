import * as yup from "yup";

export const jobSchema = yup.object({
    job_title: yup.string()
        .max(150, "Job title must be less than 150 characters")
        .required("Job Title is required"),
    department_id: yup.number()
        .typeError("Department ID must be a number")
        .required("Department ID is required"),
    experience_required: yup.string()
        .max(50, "Experience must be less than 50 characters")
        .required("Experience is required"),
    job_description: yup.string()
        .required("Job Description is required"),
    status: yup.string()
        .oneOf(["Open", "Closed"], "Invalid status")
        .required("Status is required")
});
