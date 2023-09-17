import { isUpadateModalOpen } from "@/recoil/uploadModalState";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Typography, Upload } from "antd";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import uploadFiles from "@/services/uploadFiles";
import createBatch from "@/services/createBatch";
import { useQueryClient } from "react-query";

const UploadFilesModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(isUpadateModalOpen);
  const [uploadedFilesCount, setUploadedFilesCount] = useState<number>(0);
  const [createdBatchCount, setCreatedBatchCount] = useState(0);
  const queryClient = useQueryClient();

  const onUploadClickHandler = () => {
    setIsOpen(true);
  };

  const onCancelClickHandler = () => {
    setIsOpen(false);
  };

  const customRequestHandler = (file: any) => {
    console.log("custom", file);
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
        })
        .catch((err) => {
          file.onError && file.onError(err);
        });
    };
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
        open={isOpen}
        onOk={onCancelClickHandler}
        cancelButtonProps={{
          hidden: true,
        }}
        okText="Close"
        okButtonProps={{
          type: "primary",
        }}
        className="!h-[90vh] !w-[90%] top-[5%]"
        closeIcon={null}
      >
        <div className="!max-h-[75vh] overflow-auto">
          <Upload.Dragger
            listType="picture-card"
            customRequest={customRequestHandler}
            onChange={(files) => {
              if (files.file.status === "done") {
                setUploadedFilesCount(uploadedFilesCount + 1);
              }

              if (files.fileList.length === uploadedFilesCount + 1) {
                const newBatchFiles = files.fileList
                  .slice(createdBatchCount, files.fileList.length)
                  .map((file) => ({
                    simpleMediaItem: {
                      fileName: file.name,
                      uploadToken: file.response,
                    },
                  }));
                createBatch(newBatchFiles).then(() => {
                  setCreatedBatchCount(uploadedFilesCount + 1);
                  queryClient.resetQueries(["infinite", "all Photos"]);
                });
              }
            }}
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
