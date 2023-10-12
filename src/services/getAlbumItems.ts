import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

const getAlbumItems = async (albumId: string, { dateRange, ...rest }: any) => {
  return axiosInstance.post(BASE_URL + "mediaItems:search", {
    albumId: albumId,
    ...rest,
    // orderBy: "MediaMetadata.creation_time",
    filters: {
      dateFilter: {
        ranges: [dateRange],
      },
      includeArchivedMedia: true,
    },
  });
};

export default getAlbumItems;
