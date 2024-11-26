/* eslint-disable camelcase */
"use server";
import { DoctorSpecialization } from "@/constants";
import { signIn } from "@/lib/auth";
import db from "@/lib/db/db";
import {
  DoctorTable,
  HospitalDoctorsTable,
  PatientTable,
  UserTable,
} from "@/lib/db/Schema";
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
            error: error.cause + "here",
          };
        default:
          return {
            error: error.cause?.err + "there",
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
      .values({ name, email, password, isVerified: true })
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
export const credentialsDoctorSignUp = async ({
  email,
  password,
  name,
  specialization,
  id,
}: {
  name: string;
  email: string;
  password: string;
  specialization: (typeof DoctorSpecialization)[number];
  id: string;
}) => {
  try {
    if (!email || !password || !specialization || !name || !id) {
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
      .values({ name, email, password, role: "doctor" })
      .returning();

    try {
      const doctors = await db
        .insert(DoctorTable)
        .values({ specialization, userId: user[0].id })
        .returning();
      const doctor = doctors[0];
      await db
        .insert(HospitalDoctorsTable)
        .values({ doctorId: doctor.id, hospitalId: Number(id) });
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
