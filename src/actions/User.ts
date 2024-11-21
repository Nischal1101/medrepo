"use server";
import { signIn } from "@/lib/auth";
import db from "@/lib/db/db";
import { PatientTable, UserTable } from "@/lib/db/Schema";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
export const credentialsSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: error.cause,
          };
        default:
          return {
            error: error.message,
          };
      }
    }
    throw error;
  }
};
export const credentialsPatientSignUp = async ({
  email,
  password,
  phone,
  dob,
  name,
}: {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: Date;
}) => {
  try {
    if (!email || !password || !phone || !dob) {
      return { error: "Invalid Credentials" };
    }
    const exists = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email));
    if (exists.length > 0) {
      return { error: "Email already exists, please login." };
    }
    const user = await db
      .insert(UserTable)
      .values({ name, email, password })
      .returning();
    try {
      await db
        .insert(PatientTable)
        .values({ dob: dob.toISOString(), phone, userId: user[0].id });
    } catch (error) {
      return { error };
    }
  } catch (error: unknown) {
    return {
      error:
        "Something went wrong. " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
};
