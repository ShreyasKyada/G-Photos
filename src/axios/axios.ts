import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken }: any = await getSession();

    console.log("session storage", sessionStorage.getItem("accessToken"));
    let cookieToken = "";
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "accessToken") {
        // return decodeURIComponent(value);
        cookieToken = value;
      }
    }

    console.log("cookieToken", cookieToken);
    if (cookieToken) config.headers["Authorization"] = "Bearer " + cookieToken;
    else config.headers["Authorization"] = "Bearer " + accessToken;

    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);
