import React from "react";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="my-20">
          <h1 className="tracking-tight text-4xl md:text-6xl text-center font-semibold">
            Secure, Transparent, Efficient{" "}
            <span className="text-primary">Medical Report Repository </span>
          </h1>
          <h2 className="text-muted-foreground mt-6 text-center">
            Welcome to MedRepo, where cutting-edge blockchain technology meets
            healthcare. Our platform offers a revolutionary approach to managing
            medical reports
          </h2>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Home;
