"use client";
import { getAccessToken } from "@/services/getAccessToken";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState } from "react";

const Page = () => {
  const [uid, setUid] = useState("");

  const onChangeHandler = (event: any) => {
    setUid(event.target.value);
  };

  const onClickHandler = () => {
    if (uid) {
      getAccessToken(uid).then((data) => {
        if (data) {
          console.log("data", data.data);
          // sessionStorage.setItem("accessToken", data.data.access_token);
          document.cookie = `accessToken=${data.data.access_token}; max-age=3600; path=/`;
        }
      });
    }
  };

  return (
    <div className="p-[20px]">
      <Input multiple onChange={onChangeHandler} placeholder="Enter a uid" />
      <Button className="mt-2" onClick={onClickHandler}>
        Login with token
      </Button>
    </div>
  );
};

export default Page;
