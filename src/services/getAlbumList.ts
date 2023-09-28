import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

export const getAlbumList = () => {
  return axiosInstance.get(BASE_URL + "albums");
};
