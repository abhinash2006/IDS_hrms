const Joi = require("joi");

const createEmployeeSchema =
Joi.object({

    user_id:
        Joi.number()
        .required(),

    first_name:
        Joi.string()
        .required(),

    last_name:
        Joi.string()
        .required(),

    email:
        Joi.string()
        .email({ tlds: { allow: false } })
        .required(),

    mobile:
        Joi.string()
        .required(),

    department:
        Joi.string()
        .required(),

    designation:
        Joi.string()
        .required(),

    joining_date:
        Joi.date()
        .required(),

    salary:
        Joi.number()
        .required(),

    status:
        Joi.string()
        .valid(
            "Active",
            "Inactive"
        )
        .required()

});

module.exports = {
    createEmployeeSchema
};
