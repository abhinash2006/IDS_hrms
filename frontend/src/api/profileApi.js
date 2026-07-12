import axiosInstance
from "../services/axiosInstance";

export const getProfile =
async () => {

    const response =
    await axiosInstance.get(
        "/employees/profile"
    );

    return response.data;

};