"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in" || pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className="flex-grow flex-1">{children}</div>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default ClientLayout;
