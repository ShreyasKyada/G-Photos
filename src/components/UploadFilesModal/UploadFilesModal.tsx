import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import React, { useState } from "react";
import uploadFiles from "@/services/uploadFiles";
import createBatch from "@/services/createBatch";
import { useQueryClient } from "react-query";
import { useGlobalDataProvider } from "@/Hooks";

const UploadFilesModal = () => {
  const {
    addToAlbumOpen,
    setAddToAlbumOpen,
    isUpadateModalOpen,
    setIsUpadateModalOpen,
  } = useGlobalDataProvider();
  const [uploadedFilesCount, setUploadedFilesCount] = useState(0);
  const [createdBatchCount, setCreatedBatchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { setSelecteItems } = useGlobalDataProvider();

  const onUploadClickHandler = () => {
    setIsUpadateModalOpen(true);
  };

  const onCancelClickHandler = () => {
    setIsUpadateModalOpen(false);
  };

  const customRequestHandler = (file: any) => {
    const blobFile = new Blob([file.file]);
    const reader = new FileReader();
    reader.readAsArrayBuffer(blobFile);
    reader.onload = () => {
      const binaryData = reader.result;
      uploadFiles(binaryData, {
        onUploadProgress: (event: any) => {
          if (event.total && file.onProgress) {
            file.onProgress({
              percent: (event.loaded / event.total) * 100,
            });
          }
        },
      })
        .then((res) => {
          file.onSuccess && file.onSuccess(res.data);
          setUploadedFilesCount((uploadedFilesCount) => uploadedFilesCount + 1);
        })
        .catch((err) => {
          file.onError && file.onError(err);
        });
    };
  };

  const onChangeHandler = (files: any) => {
    !isLoading && setIsLoading(true);
    if (
      files.fileList.length === uploadedFilesCount + 1 &&
      files.file.status === "done"
    ) {
      const newBatchFiles = files.fileList
        .slice(createdBatchCount, files.fileList.length)
        .map((file: any) => ({
          simpleMediaItem: {
            fileName: file.name,
            uploadToken: file.response,
          },
        }));
      createBatch(newBatchFiles).then((data) => {
        setCreatedBatchCount(uploadedFilesCount + 1);
        const uploadedItemsId = data.data.newMediaItemResults.map(
          (newMediaItem: any) => newMediaItem.mediaItem.id
        );
        setSelecteItems(uploadedItemsId);
        if (!addToAlbumOpen) setAddToAlbumOpen(true);
        setIsLoading(false);
        queryClient.resetQueries(["infinite", "all Photos"]);
      });
    }
  };

  return (
    <div>
      <Button
        type="default"
        icon={<UploadOutlined />}
        onClick={onUploadClickHandler}
      >
        Upload
      </Button>
      <Modal
        open={isUpadateModalOpen}
        onOk={onCancelClickHandler}
        cancelButtonProps={{
          hidden: true,
        }}
        okText="Close"
        okButtonProps={{
          type: "primary",
          disabled: isLoading,
        }}
        className="!h-[90vh] !w-[90%] top-[5%]"
        closeIcon={null}
      >
        <div className="!max-h-[75vh] overflow-auto">
          <Upload.Dragger
            listType="picture-card"
            customRequest={customRequestHandler}
            onChange={onChangeHandler}
            multiple
          >
            Drag and drop file over here
          </Upload.Dragger>
        </div>
      </Modal>
    </div>
  );
};

export default UploadFilesModal;
