import * as yup from "yup";

export const candidateSchema = yup.object({
    first_name: yup.string()
        .max(100, "First name must be less than 100 characters")
        .required("First Name is required"),
    last_name: yup.string()
        .max(100, "Last name must be less than 100 characters")
        .required("Last Name is required"),
    email: yup.string()
        .email("Must be a valid email")
        .max(150, "Email must be less than 150 characters")
        .required("Email is required"),
    mobile: yup.string()
        .max(20, "Mobile must be less than 20 characters")
        .required("Mobile number is required"),
    application_status: yup.string()
        .max(50)
        .required("Application status is required")
});
