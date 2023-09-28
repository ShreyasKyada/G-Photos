import React, { useRef } from "react";
import { Button, Image } from "antd";
import PhotoLayout from "@/components/PhotoLayout/PhotoLayout";
import { signOut } from "next-auth/react";
import withAuth from "@/utils/withAuth";

const Home = () => {
  return <PhotoLayout />;
};

export default withAuth(Home);
