import React from "react";
import { Spin, Image } from "antd";
import { useQuery } from "react-query";
import getAlbums from "@/services/getAlbums";
import Link from "next/link";

const Albums = () => {
  const { data: albumsData, isLoading } = useQuery({
    queryKey: ["albums"],
    queryFn: () => getAlbums(),
    select: (data) => data.data.albums,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          albumsData.map((data: any, index: number) => {
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
          })
        )}
      </div>
    </>
  );
};

export default Albums;
