/* eslint-disable camelcase */
"use server";
import { DoctorSpecialization } from "@/constants";
import { auth, signIn } from "@/lib/auth";
import db from "@/lib/db/db";
import {
  DoctorTable,
  HospitalDoctorsTable,
  PatientTable,
  ReportDoctorAccess,
  ReportsTable,
  UserTable,
} from "@/lib/db/Schema";
import { and, eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
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

async function verifyReportOwnership(reportId: number, userId: number) {
  const report = await db
    .select({
      patientId: ReportsTable.patientId,
      patient: {
        userId: PatientTable.userId,
      },
    })
    .from(ReportsTable)
    .leftJoin(PatientTable, eq(ReportsTable.patientId, PatientTable.id))
    .where(eq(ReportsTable.id, reportId))
    .limit(1);

  return report[0]?.patient?.userId === userId;
}

// Check if the doctor is the report creator
async function isReportCreator(reportId: number, doctorId: number) {
  const report = await db
    .select({
      createdByDoctorId: ReportsTable.createdByDoctorId,
    })
    .from(ReportsTable)
    .where(eq(ReportsTable.id, reportId))
    .limit(1);

  return report[0]?.createdByDoctorId === doctorId;
}

export async function updateDoctorAccess(
  prevState: unknown,
  formData: FormData
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    const reportId = parseInt(formData.get("reportId") as string);
    const doctorId = parseInt(formData.get("doctorId") as string);
    const canAccess = formData.get("canAccess") === "true";

    // Verify the user owns this report
    const hasAccess = await verifyReportOwnership(
      reportId,
      Number(session.user.id)
    );
    if (!hasAccess) {
      return { error: "Unauthorized access to this report" };
    }

    // Check if trying to modify creator's access
    const isCreator = await isReportCreator(reportId, doctorId);
    if (isCreator) {
      return { error: "Cannot modify access for the report creator" };
    }

    // Get the original doctor who created the report to use as grantedByDoctorId
    const report = await db
      .select({
        createdByDoctorId: ReportsTable.createdByDoctorId,
      })
      .from(ReportsTable)
      .where(eq(ReportsTable.id, reportId))
      .limit(1);

    if (!report[0]?.createdByDoctorId) {
      return { error: "Could not find report creator" };
    }

    // Check if access record exists
    const existingAccess = await db
      .select()
      .from(ReportDoctorAccess)
      .where(
        and(
          eq(ReportDoctorAccess.reportId, reportId),
          eq(ReportDoctorAccess.doctorId, doctorId)
        )
      )
      .limit(1);

    if (existingAccess.length > 0) {
      // Update existing access
      await db
        .update(ReportDoctorAccess)
        .set({
          canAccess,
          grantedAt: new Date(),
          grantedByDoctorId: report[0].createdByDoctorId,
        })
        .where(
          and(
            eq(ReportDoctorAccess.reportId, reportId),
            eq(ReportDoctorAccess.doctorId, doctorId)
          )
        );
    } else {
      // Insert new access record
      await db.insert(ReportDoctorAccess).values({
        reportId,
        doctorId,
        canAccess,
        grantedByDoctorId: report[0].createdByDoctorId,
        grantedAt: new Date(),
      });
    }

    revalidatePath(`/reports/${reportId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update report access:", error);
    return { error: "Failed to update access" };
  }
}

export async function toggleDoctorVerification(userId: number) {
  try {
    // First get current verification status
    const user = await db
      .select({
        isVerified: UserTable.isVerified,
      })
      .from(UserTable)
      .where(eq(UserTable.id, userId))
      .limit(1);

    if (!user.length) {
      throw new Error("User not found");
    }

    // Toggle the verification status
    const currentStatus = user[0].isVerified;
    await db
      .update(UserTable)
      .set({
        isVerified: !currentStatus,
        updatedAt: new Date(),
      })
      .where(eq(UserTable.id, userId));

    return { success: true, newStatus: !currentStatus };
  } catch (error) {
    console.error("Error toggling verification:", error);
    return { success: false, error: "Failed to update verification status" };
  }
}
