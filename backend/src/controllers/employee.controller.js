const employeeService =
require(
    "../services/employee.service"
);

const asyncHandler =
require(
    "../utils/asyncHandler"
);

const {
    createEmployeeSchema
} = require(
    "../validations/employee.validation"
);

const createEmployee =
asyncHandler(
async (
    req,
    res
) => {

    const {
        error
    } =
    createEmployeeSchema
    .validate(
        req.body
    );

    if (error) {

        const validationError =
            new Error(
                error.details[0]
                .message
            );

        validationError.statusCode =
            400;

        throw validationError;
    }

    const result =
        await employeeService
        .createEmployee(
            req.body
        );

    res.status(201)
    .json({

        success:true,

        message:
        "Employee created successfully",

        employee_id:
        result.insertId

    });

});

const getEmployees =
asyncHandler(
async (
    req,
    res
) => {

    const employees =
        await employeeService
        .getEmployees();

    res.status(200)
    .json({
        success:true,
        data:employees
    });

});

const getEmployeeById =
asyncHandler(
async (
    req,
    res
) => {

    const employee =
        await employeeService
        .getEmployeeById(
            req.params.id
        );

    res.status(200)
    .json({
        success:true,
        data:employee
    });

});

const updateEmployee =
asyncHandler(
async (
    req,
    res
) => {

    const {
        error
    } =
    createEmployeeSchema
    .validate(
        req.body
    );

    if (error) {

        const validationError =
            new Error(
                error.details[0]
                .message
            );

        validationError.statusCode =
            400;

        throw validationError;
    }

    await employeeService
        .updateEmployee(
            req.params.id,
            req.body
        );

    res.status(200)
    .json({

        success:true,

        message:
        "Employee updated successfully"

    });

});

const deleteEmployee =
asyncHandler(
async (
    req,
    res
) => {

    await employeeService
        .deleteEmployee(
            req.params.id
        );

    res.status(200)
    .json({

        success:true,

        message:
        "Employee deleted successfully"

    });

});

const getPaginatedEmployees =
asyncHandler(
async (
    req,
    res
) => {

    const page =
        parseInt(
            req.query.page
        ) || 1;

    const limit =
        parseInt(
            req.query.limit
        ) || 10;

    const search =
        req.query.search || "";

    const result =
        await employeeService
        .getPaginatedEmployeesData(
            page,
            limit,
            search
        );

    const totalPages =
        Math.ceil(
            result.totalRecords
            / limit
        );

    res.status(200)
    .json({

        success:true,

        page,

        limit,

        total_records:
        result.totalRecords,

        total_pages:
        totalPages,

        data:
        result.employees

    });

});

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getPaginatedEmployees
};