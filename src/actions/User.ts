"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
export const credentialsSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    if (!email || !password) {
      return { error: "Invalid Credentials" };
    }
    await signIn("credentials", {
      redirect: false,
      email,
      password,
      provider: "credentials",
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default:
          return {
            error: "Something went wrong.",
          };
      }
    }
    throw error;
  }
};
