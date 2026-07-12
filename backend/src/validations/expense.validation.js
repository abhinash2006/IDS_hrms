const Joi =
require("joi");

const createExpenseSchema =
Joi.object({

    employee_id:
    Joi.number()
    .optional(),

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
    )
    .optional(),

    status:
    Joi.string()
    .valid(
        "Pending",
        "Approved",
        "Rejected"
    )
    .optional()

});

module.exports = {
    createExpenseSchema
};