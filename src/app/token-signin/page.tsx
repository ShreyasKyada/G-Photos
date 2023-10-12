"use client";
import { getAccessToken } from "@/services/getAccessToken";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [uid, setUid] = useState("");
  const router = useRouter();

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
          router.push("/");
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
