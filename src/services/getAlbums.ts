import { axiosInstance } from "@/axios/axios";
import axios from "axios";
import { getSession } from "next-auth/react";

const getAlbums = async () => {
  return axiosInstance.get("https://photoslibrary.googleapis.com/v1/albums", {
    // headers: {
    //   Authorization: "Bearer " + accessToken,
    // },
  });
};

export default getAlbums;
