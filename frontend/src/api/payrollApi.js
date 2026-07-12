import axiosInstance
from "../services/axiosInstance";

export const getPayrolls =
async (
    page,
    search
) => {

    const response =
    await axiosInstance.get(
        `/payrolls?page=${page}&limit=5&search=${search}`
    );

    return response.data;
};

export const createPayroll =
async (
    payrollData
) => {

    const response =
        await axiosInstance.post(
            "/payrolls",
            payrollData
        );

    return response.data;

};

export const updatePayroll =
async (
    id,
    payrollData
) => {

    const response =
        await axiosInstance.put(
            `/payrolls/${id}`,
            payrollData
        );

    return response.data;

};

export const deletePayroll =
async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/payrolls/${id}`
        );

    return response.data;

};