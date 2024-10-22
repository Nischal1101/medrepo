"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { navList } from "@/constants";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LogoutAvatar from "./LogoutAvatar";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session?.user);
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
                {navList
                  .filter((item) => {
                    const res = item.role.includes(
                      (session?.user.role as string) || "unauthorized"
                    );
                    return res;
                  })
                  .map((item, index) => (
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
                <div className="ml-6 max-w-[32px]">
                  <div className="hidden md:flex ">
                    {session?.user ? (
                      <LogoutAvatar />
                    ) : (
                      <Button variant={"default"}>
                        <Link href={"/sign-in"}>SignIn</Link>
                      </Button>
                    )}
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
              <div className="mb-4 mt-12 flex flex-col gap-4 md:hidden  ">
                {navList
                  .filter((item) => {
                    const res = item.role.includes(
                      (session?.user.role as string) || "unauthorized"
                    );
                    return res;
                  })
                  .map((item) => (
                    <p key={item.link} onClick={() => setMenu(!menu)}>
                      <Link href={item.link}>{item.name}</Link>
                    </p>
                  ))}
                <div>
                  {session?.user ? (
                    <LogoutAvatar />
                  ) : (
                    <Button variant={"default"}>
                      <Link href={"/sign-in"}>SignIn</Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
