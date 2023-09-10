import getPhotos from "@/services/getPhotos";
import { useInfiniteQuery, useQuery } from "react-query";
import React, { useRef } from "react";
import { Loader } from "@/components";
import { Image } from "antd";
import PhotoLayout from "@/components/PhotoLayout/PhotoLayout";

const Home = () => {
  return <PhotoLayout />;
};

export default Home;
