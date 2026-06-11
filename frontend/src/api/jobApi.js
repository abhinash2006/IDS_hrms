import axiosInstance
from "../services/axiosInstance";

export const getJobs =
async (
    page = 1,
    limit = 10,
    search = ""
) => {

    const response =
        await axiosInstance.get(
            `/jobs/paginated?page=${page}&limit=${limit}&search=${search}`
        );

    return response.data;

};

export const createJob =
async (
    jobData
) => {

    const response =
        await axiosInstance.post(
            "/jobs",
            jobData
        );

    return response.data;

};
export const deleteJob =
async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/jobs/${id}`
        );

    return response.data;

};

export const updateJob =
async (
    id,
    jobData
) => {

    const response =
        await axiosInstance.put(
            `/jobs/${id}`,
            jobData
        );

    return response.data;

};