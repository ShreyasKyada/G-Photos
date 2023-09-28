"use client";
import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { QueryClientProvider, QueryClient } from "react-query";
import { ConfigProvider, theme } from "antd";
import { LayoutComponent } from "@/components";
import { GlobalDataProvider } from "@/context";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <html lang="en">
      <SessionProvider>
        <GlobalDataProvider>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  token: {
                    colorPrimary: "#00fff1",
                  },
                  components: {
                    Layout: {
                      colorBgHeader: "#141516",
                      colorBgBody: "#141516",
                    },
                  },
                }}
              >
                <body
                  className={`${inter.className} text-white`}
                  style={{
                    background: colorBgContainer,
                  }}
                >
                  <LayoutComponent>{children}</LayoutComponent>
                  <ReactQueryDevtools initialIsOpen={false} />
                </body>
              </ConfigProvider>
            </RecoilRoot>
          </QueryClientProvider>
        </GlobalDataProvider>
      </SessionProvider>
    </html>
  );
}
