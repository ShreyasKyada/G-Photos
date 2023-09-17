import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

const getAlbumItems = async (albumId: string, params: any) => {
  return axiosInstance.post(BASE_URL + "mediaItems:search", {
    albumId: albumId,
    ...params,
    // "dateFilter": {
    //   "dates": [
    //     {
    //       "year": 2017
    //     }
    //   ]
    // },
    // orderBy: "MediaMetadata.creation_time",
  });
};

export default getAlbumItems;
