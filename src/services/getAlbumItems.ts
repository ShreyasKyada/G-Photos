import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

const getAlbumItems = async (albumId: string, params: any) => {
  return axiosInstance.post(BASE_URL + "mediaItems:search", {
    albumId: albumId,
    ...params,
    // dateFilter: {
    //   dates: [
    //     {
    //       year: 2023,
    //       month: 10,
    //       day: 3,
    //     },
    //   ],
    // },
    // orderBy: "MediaMetadata.creation_time",
  });
};

export default getAlbumItems;
