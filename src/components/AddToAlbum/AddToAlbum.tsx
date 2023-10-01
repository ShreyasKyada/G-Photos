"use client";
import { getAlbumList } from "@/services/getAlbumList";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, notification } from "antd";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Loader } from "..";
import { useGlobalDataProvider } from "@/Hooks";
import { axiosInstance } from "@/axios/axios";
import { BASE_URL } from "@/constants/constants";
import { useSession } from "next-auth/react";

const AddToAlbum = () => {
  const [api, notificationContext] = notification.useNotification();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["album-list"],
    queryFn: getAlbumList,
    select: (data: any) => data.data.albums,
  });
  const { selecteItems } = useGlobalDataProvider();

  const {
    mutate,
    isLoading: isAddToMediaItemsLoading,
    error,
  } = useMutation<any, any, any>({
    mutationFn: (data) => {
      return axiosInstance.post(
        BASE_URL + `albums/${data.albumId}:batchAddMediaItems`,
        {
          mediaItemIds: selecteItems,
        }
      );
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: createAlbumMutation } = useMutation<any, any, any>({
    mutationFn: (data) => {
      return axiosInstance.post(BASE_URL + "albums", {
        album: {
          title: " ",
        },
      });
    },
  });

  const onCreateAlbumClickHandler = () => {
    createAlbumMutation({});
  };

  const onAddToAlbumClickHandler = (albumId: string) => () => {
    mutate({
      albumId: albumId,
    });
  };

  useEffect(() => {
    if (error) {
      api.error({
        message: `${error.response.data.error.code}: ${error.response.data.error.message}`,
        duration: 5000,
      });
    }
  }, [error]);

  return (
    <div className="w-full">
      <Button
        icon={<PlusOutlined />}
        type="text"
        onClick={onCreateAlbumClickHandler}
        className="w-full"
      >
        New album
      </Button>
      <div className="w-full">
        {isLoading ? (
          <Loader />
        ) : (
          data &&
          data.map((album: any) => {
            return (
              <Card
                className={
                  "w-full cursor-pointer " +
                  (isAddToMediaItemsLoading
                    ? "pointer-events-none bg-white/10"
                    : "")
                }
                onClick={onAddToAlbumClickHandler(album.id)}
                key={album.id}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      className="h-[40px] w-[40px]"
                      src={album.coverPhotoBaseUrl}
                    />
                  }
                  title={album.title}
                  description={<div>{album.mediaItemsCount} Items</div>}
                />
              </Card>
            );
          })
        )}
      </div>
      {notificationContext}
    </div>
  );
};

export { AddToAlbum };
