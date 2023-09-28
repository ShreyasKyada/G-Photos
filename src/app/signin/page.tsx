"use client";
import { SignIn } from "@/modules/SignIn";
import withAuth from "@/utils/withAuth";
import { signIn } from "next-auth/react";
import React from "react";

const signin = () => {
  return <SignIn />;
};

export default withAuth(signin);
