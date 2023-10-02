import React, { useState } from "react";
import { Drawer, Grid, Layout, Menu } from "antd";
import { HeaderComponent } from "..";
import { LayoutComponentProps } from "./types";
import { useGlobalDataProvider } from "@/Hooks";
import { useSession } from "next-auth/react";

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children }) => {
  const { Sider, Content } = Layout;
  const { sidebarConfig } = useGlobalDataProvider();
  const { useBreakpoint } = Grid;
  const [open, setOpen] = useState(false);
  const screens = useBreakpoint();

  const session = useSession();

  const onCloseHandler = () => {
    setOpen(false);
  };

  return (
    <Layout className="h-[100vh]">
      <HeaderComponent setOpen={!screens.md && setOpen} />
      <Layout hasSider>
        {session.status === "authenticated" &&
          (screens.md ? (
            <Sider>
              <Menu
                mode="inline"
                defaultSelectedKeys={["allPhotos"]}
                defaultOpenKeys={["allPhotos"]}
                items={sidebarConfig}
                className="py-[20px] h-full"
              />
            </Sider>
          ) : (
            <Drawer
              open={open}
              placement="left"
              onClose={onCloseHandler}
              className="[&>.ant-drawer-wrapper-body>.ant-drawer-body]:p-0"
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["allPhotos"]}
                defaultOpenKeys={["allPhotos"]}
                items={sidebarConfig}
                className="py-[20px] px-[20px] h-full"
              />
            </Drawer>
          ))}
        <Content className="h-[calc(100vh-64px)] overflow-hidden">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
