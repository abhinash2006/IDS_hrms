const Joi =
require("joi");

const createExpenseSchema =
Joi.object({

    employee_id:
    Joi.number()
    .required(),

    claim_title:
    Joi.string()
    .max(255)
    .required(),

    amount:
    Joi.number()
    .positive()
    .required(),

    bill_attachment:
    Joi.string()
    .allow(
        null,
        ""
    ),

    status:
    Joi.string()
    .valid(
        "Pending",
        "Approved",
        "Rejected"
    )
    .required()

});

module.exports = {
    createExpenseSchema
};