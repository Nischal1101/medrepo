import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
export const logoList = [
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
export const navList = [
  {
    name: "Home",
    link: "/",
    role: ["patient", "unauthorized"],
  },

  {
    name: "Upload",
    link: "/upload-report",
    role: ["hospital"],
  },
  {
    name: "Reports",
    link: "/reports",
    role: ["patient", "doctor", "unauthorized"],
  },
];
