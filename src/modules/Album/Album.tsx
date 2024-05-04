import PhotoLayout from "@/components/PhotoLayout/PhotoLayout";
import getAlbumInfo from "@/services/getAlbumInfo";
import updateAlbumName from "@/services/updateAlbumName";
import { notification } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

const Album = () => {
  const [albumHeading, setAlbumHeading] = useState("");
  const { albumId } = useParams();
  const [api, notificationContext] = notification.useNotification();

  const { data, isLoading } = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => getAlbumInfo(albumId as string),
    select: (data) => data.data,
    onSuccess: (data) => {
      setAlbumHeading(data.title);
    },
  });

  const { data: mutationData, mutate } = useMutation<any, any, any>({
    mutationFn: ({ albumName }) =>
      updateAlbumName(albumId as string, albumName),
    onError: (data) => {
      api.error({
        message: `${data.response.data.error.code}: ${data.response.data.error.message}`,
      });
    },
  });

  const onInputHandlerChange = (e: any) => {
    setAlbumHeading(e.target.value);
  };

  return (
    <div>
      {!isLoading && (
        <input
          type="text"
          placeholder={data.title ? "" : "Give any name here"}
          value={albumHeading}
          className="w-full bg-transparent text-5xl mb-8 focus-visible:outline-0 border-b-[1px] border-primary/50 focus-visible:border-primary"
          onChange={onInputHandlerChange}
          onBlur={() => {
            if (
              (!mutationData && data.title !== albumHeading) ||
              (mutationData && mutationData.data.title !== albumHeading)
            )
              mutate({
                albumName: albumHeading,
              });
          }}
        />
      )}
      <div className="h-[calc(100vh-120px)]">
        <PhotoLayout albumId={albumId as string} />
      </div>
      {notificationContext}
    </div>
  );
};

export default Album;
