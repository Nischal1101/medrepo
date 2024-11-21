import { DoctorSpecialization } from "@/constants";
import z from "zod";

export const doctorSignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be atleaset 5 characters long" })
    .max(20, { message: "Password can't be more than 20 characters long" }),
  name: z
    .string({ required_error: "name is a required field" })
    .min(3, { message: "name must be at least 3 characters long" })
    .max(20, { message: "name can't be more than 20 characters long" }),
  specialization: z.enum(DoctorSpecialization, {
    required_error: "specialization is a required field",
  }),
});
