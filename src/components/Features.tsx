import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import lock from "@/app/assets/lock.jpeg";

const Features = () => {
  return (
    <section className="bg-[#f9f7f8] py-20">
      <MaxWidthWrapper>
        <div className="text-center  ">
          <h1>The App Features</h1>
          <p className="text-muted-foreground">
            Here are the main points you need to know about MedRepo:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 items-center place-items-center">
          <Card className="max-w-[350px] hover:shadow-2xl transition-all min-h-[350px]">
            <CardHeader>
              <Image src={lock} alt="loading lock" width={90} height={30} />
              <CardTitle className="py-1 text-2xl">
                Privacy protection{" "}
              </CardTitle>
              <CardDescription className="pb-2">
                Deploy your new project in one-click. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quas, hic odio dolor debitis id
                minima suscipit explicabo ut repellendus.
              </CardDescription>
            </CardHeader>
          </Card>{" "}
          <Card className="max-w-[350px] hover:shadow-2xl transition-all min-h-[350px]">
            <CardHeader>
              <Image src={lock} alt="loading lock" width={90} height={30} />
              <CardTitle className="py-1 text-2xl">
                Privacy protection{" "}
              </CardTitle>
              <CardDescription className="pb-2">
                Deploy your new project in one-click. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quas, hic odio dolor debitis id
                minima suscipit explicabo ut repellendus.
              </CardDescription>
            </CardHeader>
          </Card>{" "}
          <Card className="max-w-[350px] hover:shadow-2xl transition-all min-h-[350px]">
            <CardHeader>
              <Image src={lock} alt="loading lock" width={90} height={30} />
              <CardTitle className="py-1 text-2xl">
                Privacy protection{" "}
              </CardTitle>
              <CardDescription className="pb-2">
                Deploy your new project in one-click. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quas, hic odio dolor debitis id
                minima suscipit explicabo ut repellendus.
              </CardDescription>
            </CardHeader>
          </Card>{" "}
          <Card className="max-w-[350px] hover:shadow-2xl transition-all min-h-[350px]">
            <CardHeader>
              <Image src={lock} alt="loading lock" width={90} height={30} />
              <CardTitle className="py-1 text-2xl">
                Privacy protection{" "}
              </CardTitle>
              <CardDescription className="pb-2">
                Deploy your new project in one-click. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quas, hic odio dolor debitis id
                minima suscipit explicabo ut repellendus.
              </CardDescription>
            </CardHeader>
          </Card>{" "}
          <Card className="max-w-[350px] hover:shadow-2xl transition-all min-h-[350px]">
            <CardHeader>
              <Image src={lock} alt="loading lock" width={90} height={30} />
              <CardTitle className="py-1 text-2xl">
                Privacy protection{" "}
              </CardTitle>
              <CardDescription className="pb-2">
                Deploy your new project in one-click. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quas, hic odio dolor debitis id
                minima suscipit explicabo ut repellendus.
              </CardDescription>
            </CardHeader>
          </Card>{" "}
          <Card className="max-w-[350px] hover:shadow-2xl transition-all min-h-[350px]">
            <CardHeader>
              <Image src={lock} alt="loading lock" width={90} height={30} />
              <CardTitle className="py-1 text-2xl">
                Privacy protection{" "}
              </CardTitle>
              <CardDescription className="pb-2">
                Deploy your new project in one-click. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quas, hic odio dolor debitis id
                minima suscipit explicabo ut repellendus.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Features;
