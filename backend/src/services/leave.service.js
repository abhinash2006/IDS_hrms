const leaveRepository =
require(
    "../repositories/leave.repository"
);

const VALID_STATUSES = [
    "Pending",
    "Approved",
    "Rejected"
];
const createLeave =
async (
    leaveData,
    user
) => {

    if (
        user.role ===
        "employee"
    ) {

        const employee =
        await leaveRepository
        .getEmployeeByUserId(
            user.id
        );

        if (!employee) {

            throw new Error(
                "Employee profile not found"
            );

        }

        leaveData.employee_id =
            employee.id;

        leaveData.status =
            "Pending";
    }

    if (
        !VALID_STATUSES.includes(
            leaveData.status
        )
    ) {

        const error =
            new Error(
                "Invalid leave status"
            );

        error.statusCode =
            400;

        throw error;

    }

    return await
        leaveRepository
        .createLeave(
            leaveData
        );
};

const getLeaves =
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
    await leaveRepository
    .getEmployeeByUserId(
        user.id
    );

    if (!employee) {

        return {
            leaves: [],
            total: 0
        };
    }

    search =
    employee.id;
}

return await
leaveRepository
.getLeaves(
    page,
    limit,
    search
);

};

const getLeaveById =
async (id) => {

    const leave =
        await leaveRepository
        .getLeaveById(id);

    if (!leave) {

        const error =
            new Error(
                "Leave request not found"
            );

        error.statusCode =
            404;

        throw error;

    }

    return leave;

};

const updateLeave =
async (
    id,
    leaveData
) => {

    const leave =
        await leaveRepository
        .getLeaveById(id);

    if (!leave) {

        const error =
            new Error(
                "Leave request not found"
            );

        error.statusCode =
            404;

        throw error;

    }

    return await
        leaveRepository
        .updateLeave(
            id,
            leaveData
        );

};

const deleteLeave =
async (id) => {

    const leave =
        await leaveRepository
        .getLeaveById(id);

    if (!leave) {

        const error =
            new Error(
                "Leave request not found"
            );

        error.statusCode =
            404;

        throw error;

    }

    return await
        leaveRepository
        .deleteLeave(id);

};

module.exports = {
    createLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave
};