import axiosInstance
from "../services/axiosInstance";

export const getExpenses =
async (
    page = 1,
    limit = 10,
    search = ""
) => {

    const response =
        await axiosInstance.get(
            `/expenses/paginated?page=${page}&limit=${limit}&search=${search}`
        );

    return response.data;

};

export const createExpense =
async (
    expenseData
) => {

    const response =
        await axiosInstance.post(
            "/expenses",
            expenseData
        );

    return response.data;

};

export const updateExpense =
async (
    id,
    expenseData
) => {

    const response =
        await axiosInstance.put(
            `/expenses/${id}`,
            expenseData
        );

    return response.data;

};

export const deleteExpense =
async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/expenses/${id}`
        );

    return response.data;

};