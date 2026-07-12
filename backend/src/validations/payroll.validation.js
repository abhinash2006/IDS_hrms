const Joi =
require("joi");

const createPayrollSchema =
Joi.object({

    employee_id:
        Joi.number()
        .required(),

    basic_salary:
        Joi.number()
        .required(),

    hra:
        Joi.number()
        .required(),

    bonus:
        Joi.number()
        .required(),

    deductions:
        Joi.number()
        .required(),

    payroll_month:
        Joi.string()
        .required(),

    payroll_year:
        Joi.number()
        .required()

});

module.exports = {
    createPayrollSchema
};