import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

const updateAlbumName = async (albumId: string, albumName: string) => {
  return axiosInstance.patch(
    BASE_URL + "albums/" + albumId + "?updateMask=title",
    {
      title: albumName,
    }
  );
};

export default updateAlbumName;
