import axiosInstance
from "../services/axiosInstance";

export const getEmployees =
async (
    page = 1,
    limit = 10,
    search = ""
) => {

    const response =
        await axiosInstance.get(
            `/employees/paginated?page=${page}&limit=${limit}&search=${search}`
        );

    return response.data;
};

export const createEmployee =
async (
    employeeData
) => {

    const response =
        await axiosInstance.post(
            "/employees",
            employeeData
        );

    return response.data;
};

export const updateEmployee =
async (
    id,
    employeeData
) => {

    const response =
        await axiosInstance.put(
            `/employees/${id}`,
            employeeData
        );

    return response.data;
};

export const deleteEmployee =
async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/employees/${id}`
        );

    return response.data;
};