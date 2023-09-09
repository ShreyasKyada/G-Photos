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
            items={sidebarConfig}
            className="py-[20px] h-full"
          />
        </Sider>
        <Content className="p-[20px] h-[calc(100vh - 64px)] overflow-y-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
