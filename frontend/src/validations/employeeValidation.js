import * as yup from "yup";

export const employeeSchema =
yup.object({

    first_name:
    yup.string()
       .required("First Name is required"),

    last_name:
    yup.string()
       .required("Last Name is required"),

    email:
    yup.string()
       .email("Invalid Email")
       .required("Email is required"),

    mobile:
    yup.string()
       .required("Mobile is required"),

    department:
    yup.string()
       .required("Department is required"),

    designation:
    yup.string()
       .required("Designation is required"),

    joining_date:
    yup.string()
       .required("Joining Date is required"),

    salary:
    yup.number()
       .required("Salary is required")

});