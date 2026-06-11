const employeeRepository =
require(
    "../repositories/employee.repository"
);

const getEmployees =
async () => {

    return await
    employeeRepository
    .getEmployees();

};

const createEmployee =
async (
    employeeData
) => {

    return await
    employeeRepository
    .createEmployee(
        employeeData
    );

};

const getEmployeeById =
async (id) => {

    const employee =
        await employeeRepository
        .getEmployeeById(id);

    if (!employee) {

        const error =
            new Error(
                "Employee not found"
            );

        error.statusCode =
            404;

        throw error;
    }

    return employee;
};

const updateEmployee =
async (
    id,
    employeeData
) => {

    return await
    employeeRepository
    .updateEmployee(
        id,
        employeeData
    );

};

const deleteEmployee =
async (id) => {

    return await
    employeeRepository
    .deleteEmployee(id);

};

const getPaginatedEmployeesData =
async (
    page,
    limit,
    search
) => {

    const employees =
        await employeeRepository
        .getPaginatedEmployees(
            page,
            limit,
            search
        );

    const totalRecords =
        await employeeRepository
        .getTotalEmployeesCount(
            search
        );

    return {
        employees,
        totalRecords
    };
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getPaginatedEmployeesData
};