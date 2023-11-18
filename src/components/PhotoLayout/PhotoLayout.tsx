import getAlbumItems from "@/services/getAlbumItems";
import React, { EventHandler, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Loader } from "..";
import { Checkbox, DatePicker, Image } from "antd";
import { PhotoLayoutProps } from "./types";
import { useGlobalDataProvider } from "@/Hooks";

const PhotoLayout: React.FC<PhotoLayoutProps> = ({ albumId }) => {
  const { selecteItems, setSelecteItems } = useGlobalDataProvider();
  const [dateRangeFilter, setDateRangeFilter] = useState<any>(undefined);

  useEffect(() => {
    return () => {
      setSelecteItems([]);
    };
  }, []);

  useEffect(() => {
    if (dateRangeFilter) {
      refetch();
    }
  }, [dateRangeFilter]);

  const {
    data,
    refetch,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite", albumId || "all Photos", dateRangeFilter],
    queryFn: ({ pageParam }) =>
      getAlbumItems(albumId as string, {
        pageSize: 100,
        pageToken: pageParam,
        dateRange: dateRangeFilter,
      }),
    getNextPageParam: (lastPage: any) => {
      return lastPage.data.nextPageToken;
    },
    select: (data: any) => {
      return data.pages.reduce((acc: any, page: any) => {
        return acc.concat(page.data.mediaItems);
      }, []);
    },
  });

  const onDateChangeHandler = (event: any) => {
    const startDate = new Date(event[0]);
    const endDate = new Date(event[1]);

    setDateRangeFilter({
      startDate: {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      },
      endDate: {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      },
    });
  };

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
      className="overflow-y-auto h-full p-5 w-full relative"
      onScroll={onScrollHandler}
    >
      {!albumId && (
        <div className="sticky top-[-20px] h-12 z-50 bg-[#141516] flex justify-end items-center">
          <DatePicker.RangePicker onChange={onDateChangeHandler} />
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 grid-rows-[max-content]">
          <Image.PreviewGroup
            preview={{
              getContainer: false,
              destroyOnClose: true,
              className: "bg-white/20 backdrop-blur-[40px]",
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
            {(data as any)[0] ? (
              (data as any).map((items: any) => {
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
                    <a href={items.baseUrl + "=d"}>download</a>
                  </div>
                );
              })
            ) : (
              <h1>No data</h1>
            )}
          </Image.PreviewGroup>
        </div>
      )}
      {!hasNextPage && <h1>There is no more data</h1>}
      {isFetchingNextPage && (
        <div className="block h-20">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default React.memo(PhotoLayout);
