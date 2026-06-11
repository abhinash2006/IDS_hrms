const Joi =
require("joi");

const createInterviewSchema =
Joi.object({

    candidate_id:
        Joi.number()
        .required(),

    interview_date:
        Joi.date()
        .required(),

    interview_time:
        Joi.string()
        .required(),

    interviewer_name:
        Joi.string()
        .max(150)
        .required(),

    interview_mode:
        Joi.string()
        .valid(
            "Online",
            "Offline"
        )
        .required(),

    status:
        Joi.string()
        .valid(
            "Scheduled",
            "Completed",
            "Cancelled"
        )
        .required()

});

module.exports = {
    createInterviewSchema
};