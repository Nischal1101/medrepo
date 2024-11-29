import z from "zod";
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(5, { message: "Password must be atleaset 5 characters long" })
    .max(20, { message: "Password can't be more than 20 characters long" })
    .trim(),
});
