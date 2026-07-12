import axios
from "axios";

const axiosInstance =
axios.create({

    baseURL:
        "/api"

});

axiosInstance.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem(
                "token"
            );

        if(token){

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    }

);

// import axiosInstance
// from "../services/axiosInstance";

// export const markAttendance =
// async () => {

//     const response =
//     await axiosInstance.post(
//         "/attendance/mark"
//     );

//     return response.data;

// };

export default axiosInstance;