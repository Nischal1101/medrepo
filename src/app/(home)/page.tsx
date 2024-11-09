import React from "react";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Features from "@/components/Features";
import Showoff from "@/components/Showoff";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (session && session.user.role === "hospital") {
    redirect("/upload-report");
  } else if (session && session.user.role === "doctor") {
    redirect("reports/doctor");
  }
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-28">
          <h1 className="text-center text-4xl font-semibold tracking-tight md:text-6xl">
            Secure, Transparent, Efficient{" "}
            <span className="text-primary">Medical Report Repository </span>
          </h1>
          <h2 className="mt-6 text-center text-muted-foreground md:mt-8 md:text-xl">
            Welcome to MedRepo, where cutting-edge blockchain technology meets
            healthcare. Our platform offers a revolutionary approach to managing
            medical reports
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-6 md:mt-16 md:flex-row md:gap-2">
            <Button className=" px-12 md:px-20">Explore</Button>
            <Link href="/reports" className=" px-12 md:px-20">
              Reports &rarr;
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
      <Features />
      <Showoff />
    </>
  );
};

export default Home;
