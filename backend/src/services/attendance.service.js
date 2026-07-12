const attendanceRepository =
require(
    "../repositories/attendance.repository"
);

const VALID_STATUSES = [
    "Present",
    "Absent",
    "Half Day",
    "Leave"
];

const createAttendance =
async (
    attendanceData
) => {

    if (
        !VALID_STATUSES.includes(
            attendanceData.status
        )
    ) {

        const error =
            new Error(
                "Invalid attendance status"
            );

        error.statusCode =
            400;

        throw error;
    }

    return await
        attendanceRepository
        .createAttendance(
            attendanceData
        );

};

const getAttendance =
async (
    page,
    limit,
    search
) => {

    return await
    attendanceRepository
    .getAttendance(
        page,
        limit,
        search
    );

};

const getAttendanceById =
async (id) => {

    const attendance =
        await attendanceRepository
        .getAttendanceById(id);

    if (!attendance) {

        const error =
            new Error(
                "Attendance record not found"
            );

        error.statusCode =
            404;

        throw error;

    }

    return attendance;

};

const updateAttendance =
async (
    id,
    attendanceData
) => {

    const attendance =
        await attendanceRepository
        .getAttendanceById(id);

    if (!attendance) {

        const error =
            new Error(
                "Attendance record not found"
            );

        error.statusCode =
            404;

        throw error;

    }

    return await
        attendanceRepository
        .updateAttendance(
            id,
            attendanceData
        );

};

const deleteAttendance =
async (id) => {

    const attendance =
        await attendanceRepository
        .getAttendanceById(id);

    if (!attendance) {

        const error =
            new Error(
                "Attendance record not found"
            );

        error.statusCode =
            404;

        throw error;

    }

    return await
        attendanceRepository
        .deleteAttendance(id);

};



const markAttendance =
async (
    userId
) => {

    const employee =
    await attendanceRepository
    .getEmployeeByUserId(
        userId
    );

    if (!employee) {

        throw new Error(
            "Employee profile not found"
        );

    }

    const existing =
    await attendanceRepository
    .getTodayAttendance(
        employee.id
    );

    if (existing) {

        throw new Error(
            "Attendance already marked today"
        );

    }

    return await
    attendanceRepository
    .markAttendance(
        employee.id
    );

};

module.exports = {
    markAttendance
};

module.exports = {
    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
    markAttendance
};