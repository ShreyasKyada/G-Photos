"use client";
import { Album } from "@/modules";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();

  return <Album />;
};

export default Page;
