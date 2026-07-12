const Joi =
require("joi");

const createLeaveSchema =
Joi.object({

    employee_id:
        Joi.number()
        .optional(),

    leave_type:
        Joi.string()
        .valid(
            "Casual",
            "Sick",
            "Earned"
        )
        .required(),

    start_date:
        Joi.date()
        .required(),

    end_date:
        Joi.date()
        .required(),

    reason:
        Joi.string()
        .allow("", null),

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
    createLeaveSchema
};