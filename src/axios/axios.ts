import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    // Modify the request config here (e.g., add headers, authentication, etc.)
    const { accessToken }: any = await getSession();
    // console.log("session", accessToken);

    config.headers["Authorization"] = "Bearer " + accessToken;
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);
