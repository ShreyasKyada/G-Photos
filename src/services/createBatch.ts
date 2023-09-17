import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

type MediaItem = {
  simpleMediaItem: {
    fileName?: string;
    uploadToken: string;
  };
};

const createBatch = (mediaItems: MediaItem[]) => {
  return axiosInstance.post(
    BASE_URL + "mediaItems:batchCreate",
    {
      // albumId:
      // "AHTqtd6dmyuu4LYsY72QT3O9xRIk_GunpQW0JaCKSRY1Eg1BcdzcqBG_8MiS2lj8I_excTDRkKsi",
      newMediaItems: mediaItems,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

export default createBatch;
