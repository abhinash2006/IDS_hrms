const employeeRepository =
require(
    "../repositories/employee.repository"
);
const userRepository =
require(
    "../repositories/user.repository"
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

    const existingEmployee =
await employeeRepository
.getEmployeeByUserId(
    employeeData.user_id
);

if (existingEmployee) {
    const error = new Error("Employee already linked to this user");
    error.statusCode = 400;
    throw error;
}

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
const getEmployeeProfile =
async (userId) => {

    let employee = await employeeRepository
    .getEmployeeByUserId(userId);

    if (!employee) {
        const user = await userRepository.getUserById(userId);
        if (user) {
            employee = {
                first_name: user.username.charAt(0).toUpperCase() + user.username.slice(1),
                last_name: `(${user.role})`,
                email: user.email,
                mobile: "N/A",
                department: "N/A",
                designation: user.role.toUpperCase()
            };
        }
    }
    return employee;

};
module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getPaginatedEmployeesData,
    getEmployeeProfile,

};