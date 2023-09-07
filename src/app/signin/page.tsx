"use client";
import withAuth from "@/utils/withAuth";
import { signIn } from "next-auth/react";
import React from "react";

const signin = () => {
  return (
    <div>
      <h1>Welcome to signin page.</h1>
      <button onClick={() => signIn("google")}>Sign in</button>
    </div>
  );
};

export default withAuth(signin);
