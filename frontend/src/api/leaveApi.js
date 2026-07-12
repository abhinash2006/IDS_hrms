import axiosInstance
from "../services/axiosInstance";

export const getLeaves =
async (
    page,
    search
) => {

    const response =
    await axiosInstance.get(
        `/leaves?page=${page}&limit=5&search=${search}`
    );

    return response.data;
};

export const createLeave =
async (
    leaveData
) => {

    const response =
        await axiosInstance.post(
            "/leaves",
            leaveData
        );

    return response.data;
};

export const updateLeave =
async (
    id,
    leaveData
) => {

    const response =
        await axiosInstance.put(
            `/leaves/${id}`,
            leaveData
        );

    return response.data;
};

export const deleteLeave =
async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/leaves/${id}`
        );

    return response.data;
};