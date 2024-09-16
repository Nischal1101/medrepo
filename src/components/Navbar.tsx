import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const navList = [
    {
      name: "Home",
      link: "",
    },
    {
      name: "About",
      link: "",
    },
    {
      name: "FAQs",
      link: "",
    },
    {
      name: "Report",
      link: "",
    },
  ];
  const logoList = [
    {
      logo: Facebook,
      link: "",
      size: "15",
    },
    {
      logo: Instagram,
      link: "",
      size: "15",
    },
    {
      logo: Twitter,
      link: "",
      size: "15",
    },
    {
      logo: Linkedin,
      link: "",
      size: "15",
    },
  ];
  return (
    <header className="sticky top-0">
      <nav className="flex justify-around items-center py-10 shadow-2xl ">
        <div className="logo">logo</div>
        <ul className="flex gap-4 items-center">
          {navList.map((item) => (
            <Link href={item.link} key={item.link}>
              {item.name}
            </Link>
          ))}
          {logoList.map((item) => (
            <Link href={item.link} key={item.link}>
              <item.logo size={item.size} />
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
