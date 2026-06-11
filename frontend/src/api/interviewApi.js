import axiosInstance
from "../services/axiosInstance";

export const getInterviews =
async (
    page = 1,
    limit = 10,
    search = ""
) => {

    const response =
        await axiosInstance.get(
            `/interviews/paginated?page=${page}&limit=${limit}&search=${search}`
        );

    return response.data;

};

export const createInterview =
async (
    interviewData
) => {

    const response =
        await axiosInstance.post(
            "/interviews",
            interviewData
        );

    return response.data;

};

export const updateInterview =
async (
    id,
    interviewData
) => {

    const response =
        await axiosInstance.put(
            `/interviews/${id}`,
            interviewData
        );

    return response.data;

};

export const deleteInterview =
async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/interviews/${id}`
        );

    return response.data;

};