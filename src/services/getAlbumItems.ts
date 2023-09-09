import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

const getAlbumItems = async (albumId: string) => {
  return axiosInstance.post(BASE_URL + "mediaItems:search", {
    albumId: albumId,
  });
};

export default getAlbumItems;
