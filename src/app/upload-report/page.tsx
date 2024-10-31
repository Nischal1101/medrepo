import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
import React from "react";

const uploadReportPage = async () => {
  //   const session = await auth();

  //   if (session && session.user.role !== "hospital") {
  //     redirect("/");
  return <MaxWidthWrapper>show users</MaxWidthWrapper>;
};

export default uploadReportPage;
