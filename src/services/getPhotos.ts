import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

type Params = {
  pageSize: number;
  pageToken: string;
};

const getPhotos = async (params: Params) => {
  return axiosInstance.get(BASE_URL + "mediaItems", {
    params,
  });
};

export default getPhotos;
