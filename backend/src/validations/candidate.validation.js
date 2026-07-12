const Joi =
require("joi");

const createCandidateSchema =
Joi.object({

    first_name:
        Joi.string()
        .max(100)
        .required(),

    last_name:
        Joi.string()
        .max(100)
        .required(),

    email:
        Joi.string()
        .email({ tlds: { allow: false } })
        .required(),

    mobile:
        Joi.string()
        .max(20)
        .required(),

    resume_path:
    Joi.string()
    .allow("")
    .optional(),

    application_status:
        Joi.string()
        .valid(
            "Applied",
            "Screening",
            "Interview",
            "Selected",
            "Rejected"
        )
        .required()

});

module.exports = {
    createCandidateSchema
};