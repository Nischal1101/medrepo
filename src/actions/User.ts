"use server";
import { signIn } from "@/lib/auth";

export const credentialsSignIn = async (email: string, password: string) => {
  if (!email || !password) {
    return;
  }
  await signIn("credentials", {
    redirect: false,
    email,
    password,
    provider: "credentials",
  });
};
