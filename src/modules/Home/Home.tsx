import React from "react";
import PhotoLayout from "@/components/PhotoLayout/PhotoLayout";
import withAuth from "@/utils/withAuth";

const Home = () => {
  return (
    <>
      <PhotoLayout />
    </>
  );
};

export default withAuth(Home);
