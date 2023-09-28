import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { signIn } from "next-auth/react";
import React from "react";

const SignIn = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Button
        onClick={() => signIn("google")}
        className="text-xl bg-white !text-black hover:bg-primary "
        icon={<GoogleOutlined />}
        size="large"
      >
        Connect with google photos
      </Button>
    </div>
  );
};

export default SignIn;
