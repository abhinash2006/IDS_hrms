const Joi =
require("joi");

const createAttendanceSchema =
Joi.object({

    employee_id:
        Joi.number()
        .required(),

    attendance_date:
        Joi.date()
        .required(),

    check_in_time:
        Joi.string()
        .allow("", null),

    check_out_time:
        Joi.string()
        .allow("", null),

    status:
        Joi.string()
        .valid(
            "Present",
            "Absent",
            "Half Day",
            "Leave"
        )
        .required()

});

module.exports = {
    createAttendanceSchema
};