import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken }: any = await getSession();

    config.headers["Authorization"] = "Bearer " + accessToken;
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);
