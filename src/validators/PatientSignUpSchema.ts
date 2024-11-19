import z from "zod";
export const patientSignUpSchema = z.object({
  email: z
    .string({ required_error: "email is a required field" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "password is a required field" })
    .min(5, { message: "Password must be atleaset 5 characters long" })
    .max(20, { message: "Password can't be more than 20 characters long" }),
  phone: z
    .string({ required_error: "phone is a required field" })
    .min(10)
    .max(13),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});