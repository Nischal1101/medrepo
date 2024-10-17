"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { navList } from "@/app/constants";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <div className="sticky inset-x-0 top-0 z-50 bg-white ">
      <header className=" bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              <h1 className="text-3xl font-bold text-primary">MedRepo.</h1>
              <div className=" hidden items-center gap-4 md:flex ">
                {navList.map((item, index) => (
                  <Link
                    href={item.link}
                    key={index}
                    className={`transition-all  hover:text-primary ${
                      item.link === pathname && "border-primary text-primary"
                    }`}
                  >
                    <p className="font-medium">{item.name}</p>
                  </Link>
                ))}
                <div className="ml-auto flex items-center">
                  <div className="ml-5 hidden md:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Button variant={"default"}>
                      <Link href={"/sign-in"}>SignIn</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:hidden">
                {menu ? (
                  <X onClick={() => setMenu(!menu)} />
                ) : (
                  <Menu onClick={() => setMenu(!menu)} />
                )}
              </div>
            </div>
            {/* Todo: Add transition on opening and closing hamburger. */}
            {menu && (
              <div className="mb-4 mt-8 flex flex-col gap-4 md:hidden  ">
                {navList.map((item) => (
                  <p key={item.link} onClick={() => setMenu(!menu)}>
                    <Link href={item.link}>{item.name}</Link>
                  </p>
                ))}
                <Button variant={"default"}>
                  {" "}
                  <Link href={"/sign-in"}>SignIn</Link>
                </Button>
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
