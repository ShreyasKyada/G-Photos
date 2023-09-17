import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";

const uploadFiles = (binaryData: any, params: any) => {
  return axiosInstance.post(BASE_URL + "uploads", binaryData, {
    headers: {
      "Content-type": "application/octet-stream",
      "X-Goog-Upload-Protocol": "raw",
    },
    ...params,
  });
};

export default uploadFiles;
