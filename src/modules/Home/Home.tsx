import getPhotos from "@/services/getPhotos";
import { useInfiniteQuery, useQuery } from "react-query";
import React, { useRef } from "react";
import { Loader } from "@/components";
import { Button, Image } from "antd";
import PhotoLayout from "@/components/PhotoLayout/PhotoLayout";
import { useSession } from "next-auth/react";
import withAuth from "@/utils/withAuth";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <>
      <PhotoLayout />
      <Button onClick={() => signOut()}>Logout </Button>
    </>
  );
};

export default withAuth(Home);
