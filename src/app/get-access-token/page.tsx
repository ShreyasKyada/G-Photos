"use client";
import { getAccessToken } from "@/services/getAccessToken";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import React, { useState } from "react";

const Page = () => {
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");
  const [api, notificationContext] = notification.useNotification();

  const onChangeHandler = (event: any) => {
    setUid(event.target.value);
  };

  const onClickHandler = () => {
    if (uid) {
      getAccessToken(uid).then((data) => {
        if (data) {
          console.log("data", data.data.access_token);
          setToken(data.data.access_token);
        } else {
          api.error({
            message: "Invalid uid",
          });
        }
      });
    } else {
      api.error({
        message: "Please enter access token",
      });
    }
  };

  const onCopyToClipboardHandler = async () => {
    await navigator.clipboard.writeText(token);
    api.info({
      message: "Copied!",
    });
  };

  return (
    <div className="p-[20px]">
      <Input multiple onChange={onChangeHandler} placeholder="Enter a uid" />
      <Button className="mt-2" onClick={onClickHandler}>
        Get New Token
      </Button>
      {token && (
        <div className="mt-4 border-[1px] rounded-md p-2 relative">
          <code>{token}</code>
          <CopyOutlined
            title="Copy to clipboard"
            onClick={onCopyToClipboardHandler}
            className="absolute top-2 right-2"
          />
        </div>
      )}
      {notificationContext}
    </div>
  );
};

export default Page;
