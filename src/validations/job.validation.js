const Joi = require("joi");

const createJobSchema = Joi.object({
    job_title: Joi.string().required(),
    department_id: Joi.number().required(),
    experience_required: Joi.string().required(),
    job_description: Joi.string().required(),
    status: Joi.string().valid("Open", "Closed").required()
});

module.exports = {
    createJobSchema
};