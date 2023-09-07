import React from "react";
import { Layout, Typography } from "antd";

const HeaderComponent = () => {
  const { Header } = Layout;
  return (
    <Header className="flex items-center border-b-[1px] border-[#fdfdfd1f]">
      <Typography.Title level={3} className="!m-0">
        G Photos
      </Typography.Title>
    </Header>
  );
};

export default HeaderComponent;
