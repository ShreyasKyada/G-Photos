"use client";
import { Dashboard } from "@/modules";
import withAuth from "@/utils/withAuth";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
