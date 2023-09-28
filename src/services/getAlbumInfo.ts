import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

const getAlbumInfo = async (albumId: string) => {
  return axiosInstance.get(BASE_URL + "albums/" + albumId);
};

export default getAlbumInfo;
