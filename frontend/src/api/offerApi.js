import axiosInstance
from "../services/axiosInstance";

export const createOffer =
async (offerData) => {

    const response =
        await axiosInstance.post(
            "/offers",
            offerData
        );

    return response.data;
};