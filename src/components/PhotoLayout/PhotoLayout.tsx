import getAlbumItems from "@/services/getAlbumItems";
import React, { EventHandler, useEffect } from "react";
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

  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["infinite", albumId || "all Photos"],
      queryFn: ({ pageParam }) =>
        getAlbumItems(albumId as string, {
          pageSize: 50,
          pageToken: pageParam,
        }),
      getNextPageParam: (lastPage: any) => {
        return lastPage.data.nextPageToken;
      },
      select: (data: any) => {
        // return data.pages[0].data.mediaItems;
        return data.pages.reduce((acc: any, page: any) => {
          return acc.concat(page.data.mediaItems);
        }, []);
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

  const onScrollHandler = (event: any) => {
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const clientHeight = event.target.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 50 && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div
      className="overflow-y-auto h-full p-5 w-full"
      onScroll={onScrollHandler}
    >
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 grid-rows-[max-content]">
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
      </div>
      {isFetchingNextPage && (
        <div className="block h-20">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default React.memo(PhotoLayout);
