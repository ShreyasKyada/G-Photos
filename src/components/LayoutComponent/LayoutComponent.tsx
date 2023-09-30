import React from "react";
import { Layout, Menu } from "antd";
import { HeaderComponent } from "..";
import { LayoutComponentProps } from "./types";
import { useGlobalDataProvider } from "@/Hooks";
import { useSession } from "next-auth/react";

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children }) => {
  const { Sider, Content } = Layout;
  const { sidebarConfig } = useGlobalDataProvider();
  const session = useSession();

  return (
    <Layout className="h-[100vh]">
      <HeaderComponent />
      <Layout hasSider>
        <Sider
          collapsible={true}
          collapsedWidth={0}
          breakpoint="md"
          hidden={session.status === "unauthenticated"}
          className="[&>.ant-layout-sider-zero-width-trigger]:top-[-50px] [&>.ant-layout-sider-zero-width-trigger]:left-[16px]"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["allPhotos"]}
            defaultOpenKeys={["allPhotos"]}
            items={sidebarConfig}
            className="py-[20px] h-full"
          />
        </Sider>
        {/* className="p-[20px] h-[calc(100vh - 64px)] overflow-y-auto" */}
        <Content className="h-[calc(100vh-64px)] overflow-hidden">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
