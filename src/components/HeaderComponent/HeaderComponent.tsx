import React, { useEffect } from "react";
import { Button, Layout, Modal, Typography } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useHeaderComponent from "./useHeaderComponent";
import UploadFilesModal from "../UploadFilesModal/UploadFilesModal";
import { AddToAlbum } from "../AddToAlbum";
import { signOut, useSession } from "next-auth/react";

const { Header } = Layout;

const HeaderComponent = ({ setOpen }: any) => {
  const {
    onCloseClickHandler,
    onDeleteClickHandler,
    onAddToAlbumClickHandler,
    onDownloadClickHandler,
    selecteItems,
    addToAlbumOpen,
    setAddToAlbumOpen,
  } = useHeaderComponent();
  const session = useSession();
  const [api, contextHolder] = Modal.useModal();

  useEffect(() => {
    if (addToAlbumOpen && session.status === "authenticated") {
      api.confirm({
        closeIcon: null,
        onCancel: () => {
          setAddToAlbumOpen(false);
        },
        okButtonProps: {
          hidden: true,
        },
        content: <AddToAlbum />,
        className:
          "bg-error-500 [&>.ant-modal-content>.ant-modal-body>.ant-modal-confirm-body-wrapper>.ant-modal-confirm-body>.ant-modal-confirm-content]:!max-w-full",
        icon: null,
        title: <Typography.Title level={4}>Add to Album</Typography.Title>,
        open: addToAlbumOpen,
      });
    }
  }, [addToAlbumOpen, api, setAddToAlbumOpen, session.status]);

  return (
    <Header className="flex justify-between items-center p-6 border-b-[1px] border-[#fdfdfd1f] md:p-4">
      {contextHolder}
      {selecteItems.length ? (
        <>
          <div className="flex items-center justify-center gap-2 pl-12">
            <CloseOutlined
              className="cursor-pointer [&>svg]:!h-[20px] [&>svg]:!w-[20px]"
              onClick={onCloseClickHandler}
            />
            <Typography.Title level={4} className="!m-0">
              {selecteItems.length} Selected
            </Typography.Title>
          </div>
          <div className="flex items-center gap-4">
            <PlusOutlined
              className="cursor-pointer [&>svg]:!h-[20px] [&>svg]:!w-[20px]"
              onClick={onAddToAlbumClickHandler}
            />
            <DeleteOutlined
              className="cursor-pointer [&>svg]:!h-[20px] [&>svg]:!w-[20px]"
              onClick={onDeleteClickHandler}
            />
            <DownloadOutlined
              className="cursor-pointer [&>svg]:!h-[20px] [&>svg]:!w-[20px]"
              onClick={onDownloadClickHandler}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-4">
            {session.status === "authenticated" && (
              <MenuOutlined
                onClick={() => {
                  setOpen((prev: boolean) => !prev);
                }}
              />
            )}
            <Typography.Title level={3} className="!m-0">
              G Photos
            </Typography.Title>
          </div>
          <div className="flex gap-[20px]">
            {session.status === "authenticated" && (
              <>
                <UploadFilesModal />
                <LogoutOutlined
                  className="[&>svg]:h-[22px] [&>svg]:w-[22px]"
                  onClick={() => signOut()}
                />
              </>
            )}
          </div>
        </>
      )}
    </Header>
  );
};

export default HeaderComponent;
