import getAlbumItems from "@/services/getAlbumItems";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { Loader } from "..";
import { Checkbox, Image } from "antd";
import { PhotoLayoutProps } from "./types";
import { useGlobalDataProvider } from "@/Hooks";

const PhotoLayout: React.FC<PhotoLayoutProps> = ({ albumId }) => {
  const { selecteItems, setSelecteItems } = useGlobalDataProvider();

  useEffect(() => {
    return () => {
      setSelecteItems([]);
    };
  }, []);

  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["infinite", albumId || "all Photos"],
    queryFn: ({ pageParam }) =>
      getAlbumItems(albumId as string, {
        pageSize: 100,
        pageToken: pageParam,
      }),
    getNextPageParam: (lastPage: any) => {
      return lastPage.data.nextPageToken;
    },
    select: (data: any) => {
      return data.pages.reduce(
        (acc: any, page: any) => acc.concat(page.data.mediaItems),
        []
      );
    },
  });

  const onChangeHandler = (photoId: string) => (event: any) => {
    if (event.target.checked) {
      setSelecteItems((items: any) => {
        return [...items, photoId];
      });
    } else {
      setSelecteItems((items: any) => {
        const photoIdIndex = items.findIndex((str: string) => str === photoId);
        items.splice(photoIdIndex, 1);
        return [...items];
      });
    }
  };

  return (
    <div className="h-full w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 grid-rows-[max-content]">
      {isLoading ? (
        <Loader />
      ) : (
        <Image.PreviewGroup
          preview={{
            getContainer: false,
            toolbarRender: () => null,
            destroyOnClose: true,
            imageRender: (node) => {
              if (node.props.useMap === "video")
                return (
                  <video
                    className="h-[100vh]"
                    width="auto"
                    height="100vh"
                    controls
                    src={node.props.src + "=dv"}
                  />
                );
              return node;
            },
          }}
        >
          {(data as any).map((items: any) => {
            return (
              <div key={items.id} className="relative">
                <Image
                  alt=""
                  src={items.baseUrl}
                  className="h-auto max-w-full rounded-lg"
                  useMap={items.mimeType.includes("video") ? "video" : ""}
                />
                <Checkbox
                  onChange={onChangeHandler(items.id)}
                  checked={selecteItems.includes(items.id)}
                  className="absolute top-[7px] left-[10px] [&>.ant-checkbox>.ant-checkbox-inner]:bg-black/70 [&>.ant-checkbox>.ant-checkbox-inner]:border-none"
                />
              </div>
            );
          })}
        </Image.PreviewGroup>
      )}
      <button onClick={() => fetchNextPage()}>Fetch next data</button>
    </div>
  );
};

export default React.memo(PhotoLayout);
