import axiosInstance
from "../services/axiosInstance";

export const getAttendance =
async (
    page,
    search
) => {

    const response =
    await axiosInstance.get(
        `/attendance?page=${page}&limit=5&search=${search}`
    );

    return response.data;
};

export const createAttendance =
async (
    attendanceData
) => {

    const response =
        await axiosInstance.post(
            "/attendance",
            attendanceData
        );

    return response.data;
};

export const updateAttendance =
async (
    id,
    attendanceData
) => {

    const response =
        await axiosInstance.put(
            `/attendance/${id}`,
            attendanceData
        );

    return response.data;
};

export const deleteAttendance =
async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/attendance/${id}`
        );

    return response.data;
};

export const markAttendance =
async () => {

    const response =
    await axiosInstance.post(
        "/attendance/mark"
    );

    return response.data;
};