import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

const createAlbum = () => {
  return axiosInstance.post(BASE_URL + "albums", {
    album: {
      title: " ",
    },
  });
};

export default createAlbum;
