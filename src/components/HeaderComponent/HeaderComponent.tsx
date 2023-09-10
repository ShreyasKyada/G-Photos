import React from "react";
import { Layout, Typography } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useHeaderComponent from "./useHeaderComponent";

const { Header } = Layout;

const HeaderComponent = () => {
  const {
    onCloseClickHandler,
    onDeleteClickHandler,
    onAddToAlbumClickHandler,
    onDownloadClickHandler,
    selecteItems,
  } = useHeaderComponent();

  return (
    <Header className="flex justify-between items-center p-6 border-b-[1px] border-[#fdfdfd1f]">
      {selecteItems.length ? (
        <>
          <div className="flex items-center justify-center gap-2">
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
        <Typography.Title level={3} className="!m-0">
          G Photos
        </Typography.Title>
      )}
    </Header>
  );
};

export default HeaderComponent;
