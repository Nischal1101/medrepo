import React from "react";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Features from "@/components/Features";
import Showoff from "@/components/Showoff";

const Home = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-28">
          <h1 className="tracking-tight text-4xl md:text-6xl text-center font-semibold">
            Secure, Transparent, Efficient{" "}
            <span className="text-primary">Medical Report Repository </span>
          </h1>
          <h2 className="text-muted-foreground mt-6 text-center md:mt-8 md:text-xl">
            Welcome to MedRepo, where cutting-edge blockchain technology meets
            healthcare. Our platform offers a revolutionary approach to managing
            medical reports
          </h2>
          <div className="flex flex-col gap-6 mt-8 md:flex-row md:mt-16 md:gap-2 items-center justify-center">
            <Button className=" px-12 md:px-20">Explore</Button>
            <Button variant="ghost" className=" px-12 md:px-20">
              Reports &rarr;
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
      <Features />
      <Showoff />
    </>
  );
};

export default Home;
