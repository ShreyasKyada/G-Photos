import React from "react";
import { Button, Image } from "antd";
import { useMutation, useQuery } from "react-query";
import getAlbums from "@/services/getAlbums";
import Link from "next/link";
import { Loader } from "@/components";
import createAlbum from "@/services/createAlbum";
import { useRouter } from "next/navigation";

const Albums = () => {
  const router = useRouter();

  const { data: albumsData, isLoading } = useQuery({
    queryKey: ["albums"],
    queryFn: () => getAlbums(),
    select: (data) => data.data.albums,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: createAlbumMutation } = useMutation<any, any, any>({
    mutationFn: createAlbum,
    onSuccess: (data) => {
      router.push("albums/" + data.data.id);
    },
  });

  const onCreateAlbumClickHandler = () => {
    createAlbumMutation({});
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!albumsData) {
    return (
      <div className="flex items-center justify-center h-full flex-col gap-3">
        <h1 className="text-[40px]">There is no album</h1>
        <Button onClick={onCreateAlbumClickHandler}>Create Album</Button>
      </div>
    );
  }

  return (
    <div className="p-[20px]">
      <div className="mb-[30px] flex justify-between">
        <h1 className="text-[30px]">Albums</h1>
        <Button onClick={onCreateAlbumClickHandler}>Create Album</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 overflow-y-auto">
        {albumsData?.map((data: any, index: number) => {
          return (
            <Link
              key={index}
              href={"albums/" + data.id}
              className="cursor-pointer"
            >
              <Image
                preview={false}
                alt=""
                src={data.coverPhotoBaseUrl}
                className="h-auto max-w-full rounded-lg"
              />
              <p>{data.title}</p>
              <p>{data.mediaItemsCount} Items</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Albums;
