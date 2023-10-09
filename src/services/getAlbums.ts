import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

const getAlbums = async () => {
  return axiosInstance.get(BASE_URL + "albums", {
    params: {
      pageSize: 50,
    },
  });
};

export default getAlbums;
