import getPhotos from "@/services/getPhotos";
import { useInfiniteQuery, useQuery } from "react-query";
import React, { useRef } from "react";
import { Loader } from "@/components";
import { Image } from "antd";

const Home = () => {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: "photos",
    queryFn: ({ pageParam }) =>
      getPhotos({
        pageSize: 60,
        pageToken: pageParam,
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      return lastPage.data.nextPageToken;
    },
    select: (data: any) =>
      data.pages.reduce(
        (acc: any, page: any) => acc.concat(page.data.mediaItems),
        []
      ),
  });

  return (
    <div className="h-full w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 grid-rows-[max-content]">
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
          {(data as any).map((items: any, index: number) => {
            if (items.mimeType.includes("video")) {
              return (
                <Image
                  alt=""
                  key={index}
                  id={index.toString()}
                  src={items.baseUrl}
                  className="h-auto max-w-full rounded-lg"
                  useMap="video"
                />
              );
            }
            return (
              <Image
                alt=""
                key={index}
                src={items.baseUrl}
                className="h-auto max-w-full rounded-lg"
              />
            );
          })}
        </Image.PreviewGroup>
      )}
      <button onClick={() => fetchNextPage()}>Fetch next data</button>
    </div>
  );
};

export default Home;
