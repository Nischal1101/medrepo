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
export const DoctorSpecialization = [
  "ALLERGY_AND_IMMUNOLOGY",
  "ANESTHESIOLOGY",
  "CARDIOLOGY",
  "DERMATOLOGY",
  "EMERGENCY_MEDICINE",
  "ENDOCRINOLOGY",
  "FAMILY_MEDICINE",
  "GASTROENTEROLOGY",
  "GERIATRICS",
  "HEMATOLOGY",
  "INFECTIOUS_DISEASE",
  "INTERNAL_MEDICINE",
  "NEPHROLOGY",
  "NEUROLOGY",
  "OBSTETRICS_AND_GYNECOLOGY",
  "ONCOLOGY",
  "OPHTHALMOLOGY",
  "ORTHOPEDICS",
  "OTOLARYNGOLOGY",
  "PATHOLOGY",
  "PEDIATRICS",
  "PHYSICAL_MEDICINE_AND_REHABILITATION",
  "PLASTIC_SURGERY",
  "PSYCHIATRY",
  "PULMONOLOGY",
  "RADIOLOGY",
  "RHEUMATOLOGY",
  "SURGERY",
  "UROLOGY",
] as const;
