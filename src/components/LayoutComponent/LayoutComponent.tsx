import React from "react";
import { Layout, Menu } from "antd";
import { HeaderComponent } from "..";
import { LayoutComponentProps } from "./types";
import { useGlobalDataProvider } from "@/Hooks";

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children }) => {
  const { Sider, Content } = Layout;
  const { sidebarConfig } = useGlobalDataProvider();

  return (
    <Layout className="h-[100vh]">
      <HeaderComponent />
      <Layout hasSider>
        <Sider>
          <Menu
            mode="inline"
            defaultSelectedKeys={["allPhotos"]}
            defaultOpenKeys={["allPhotos"]}
            style={{ height: "100%" }}
            items={sidebarConfig}
            className="py-[20px]"
          />
        </Sider>
        <Content className="p-[20px]">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
