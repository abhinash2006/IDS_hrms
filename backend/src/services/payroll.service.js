const payrollRepository =
require(
    "../repositories/payroll.repository"
);

const createPayroll =
async (
    payrollData
) => {

    payrollData.net_salary =

        Number(
            payrollData.basic_salary
        )

        +

        Number(
            payrollData.hra
        )

        +

        Number(
            payrollData.bonus
        )

        -

        Number(
            payrollData.deductions
        );

    return await
        payrollRepository
        .createPayroll(
            payrollData
        );

};

const getPayrolls =
async (
    page,
    limit,
    search,
    user
) => {

    if (
    user.role ===
    "employee"
) {

    const employee =
    await payrollRepository
    .getEmployeeByUserId(
        user.id
    );

    if (!employee) {

        return {
            payrolls: [],
            total: 0
        };

    }

    search =
    employee.id;
}

    return await
    payrollRepository
    .getPayrolls(
        page,
        limit,
        search
    );

};

const getPayrollById =
async (id) => {

    const payroll =
        await payrollRepository
        .getPayrollById(id);

    if(!payroll){

        const error =
            new Error(
                "Payroll not found"
            );

        error.statusCode =
            404;

        throw error;
    }

    return payroll;

};

const updatePayroll =
async (
    id,
    payrollData
) => {

    payrollData.net_salary =

        Number(
            payrollData.basic_salary
        )

        +

        Number(
            payrollData.hra
        )

        +

        Number(
            payrollData.bonus
        )

        -

        Number(
            payrollData.deductions
        );

    return await
        payrollRepository
        .updatePayroll(
            id,
            payrollData
        );

};

const deletePayroll =
async (id) => {

    return await
        payrollRepository
        .deletePayroll(id);

};

module.exports = {
    createPayroll,
    getPayrolls,
    getPayrollById,
    updatePayroll,
    deletePayroll
};