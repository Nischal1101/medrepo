"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className="flex-1 grow">{children}</div>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default ClientLayout;
