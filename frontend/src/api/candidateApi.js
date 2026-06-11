import axiosInstance
from "../services/axiosInstance";

export const getCandidates =
async (
    page = 1,
    limit = 10,
    search = ""
) => {

    const response =
        await axiosInstance.get(
            `/candidates/paginated?page=${page}&limit=${limit}&search=${search}`
        );

    return response.data;

};

export const createCandidate =
async (
    formData
) => {

    const response =
        await axiosInstance.post(
            "/candidates",
            formData,
            {
                headers: {
                    "Content-Type":
                    "multipart/form-data"
                }
            }
        );

    return response.data;

};

export const updateCandidate =
async (
    id,
    formData
) => {

    const response =
        await axiosInstance.put(
            `/candidates/${id}`,
            formData,
            {
                headers: {
                    "Content-Type":
                    "multipart/form-data"
                }
            }
        );

    return response.data;

};

export const deleteCandidate =
async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/candidates/${id}`
        );

    return response.data;

};