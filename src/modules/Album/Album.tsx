import { Loader } from "@/components";
import getAlbumItems from "@/services/getAlbumItems";
import { Image } from "antd";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";

const Album = () => {
  const params = useParams();

  // const { data } = useQuery({
  //   queryKey: ["ablum", params.albumId],
  //   queryFn: () => {
  //     getAlbumItems(params.albumId);
  //   },
  // });

  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["ablum", params.albumId],
    queryFn: () => getAlbumItems(params.albumId as string),
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

export default Album;
