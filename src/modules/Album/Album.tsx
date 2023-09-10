import { Loader } from "@/components";
import PhotoLayout from "@/components/PhotoLayout/PhotoLayout";
import getAlbumItems from "@/services/getAlbumItems";
import { Image } from "antd";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";

const Album = () => {
  const params = useParams();

  return <PhotoLayout albumId={params.albumId as string} />;
};

export default Album;
