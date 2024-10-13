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
    <div className="bg-white sticky z-50 top-0 inset-x-0 ">
      <header className=" bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              <h1 className="text-3xl font-bold text-primary">MedRepo.</h1>
              <div className=" hidden md:flex gap-4 items-center ">
                {navList.map((item, index) => (
                  <Link
                    href={item.link}
                    key={item.link}
                    className={`hover:text-primary  transition-all ${
                      item.link === pathname && "text-primary border-primary"
                    }`}
                  >
                    <p className="text-md">{item.name}</p>
                  </Link>
                ))}
                <div className="ml-auto flex items-center">
                  <div className="hidden md:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 ml-5">
                    <Button variant={"default"}>
                      <Link href="/sign-in">Sign in</Link>
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
              <div className="md:hidden flex flex-col gap-4 mb-4 mt-8  ">
                {navList.map((item) => (
                  <p key={item.link}>
                    <Link href={item.link}>{item.name}</Link>
                  </p>
                ))}
                <Button variant={"default"} className="mx-auto">
                  <Link href="/sign-in">Sign in</Link>
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
