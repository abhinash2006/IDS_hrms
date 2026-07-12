import axiosInstance
from "../services/axiosInstance";

export const getEmployeeUsers =
async () => {

    const response =
    await axiosInstance.get(
        "/users/employees"
    );

    return response.data;

};

export const getUsers =
async (
    page,
    search
) => {

    const response =
        await axiosInstance.get(
            `/users?page=${page}&limit=5&search=${search}`
        );

    return response.data;

};

export const createUser =
async (
    userData
) => {

    const response =
        await axiosInstance.post(
            "/auth/register",
            userData
        );

    return response.data;
};

export const updateUser =
async (
    id,
    userData
) => {

    const response =
        await axiosInstance.put(
            `/users/${id}`,
            userData
        );

    return response.data;
};

export const deleteUser =
async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/users/${id}`
        );

    return response.data;
};