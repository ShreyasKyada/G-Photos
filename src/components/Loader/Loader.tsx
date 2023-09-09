import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
};

export default Loader;
