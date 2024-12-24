/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
"use server";
import { DoctorSpecialization } from "@/constants";
import { auth, signIn } from "@/lib/auth";
import db from "@/lib/db/db";
import {
  DoctorTable,
  HospitalDoctorsTable,
  hospitalPatients,
  PatientTable,
  ReportDoctorAccess,
  ReportsTable,
  UserTable,
} from "@/lib/db/Schema";
import { getHospitalId } from "@/utils/FetchHospitalId";
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
            error: error.cause,
          };
        default:
          return {
            error: error.cause?.err,
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
  id,
}: {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: Date;
  id: string;
}) => {
  try {
    if (!email || !password || !phone || !dob || !name || !id) {
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
    const patient = await db
      .insert(PatientTable)
      .values({
        dob: dob.toISOString(),
        phone,
        userId: user[0].id,
        patientName: name,
      })
      .returning();
    await db
      .insert(hospitalPatients)
      .values({ hospitalId: Number(id), patientId: patient[0].id });
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
        .values({ specialization, userId: user[0].id, doctorName: name })
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
export async function uploadReport(formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "hospital") {
      return { success: false, error: "Unauthorized" };
    }

    const userId = Number(session.user.id);
    const hospitalId = await getHospitalId(userId);

    if (!hospitalId) {
      return { success: false, error: "Hospital not found" };
    }

    // Get form data
    const patientId = formData.get("patientId");
    const reportType = formData.get("reportType");
    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file") as File;

    // Validate inputs
    if (!patientId || !reportType || !title || !description || !file) {
      return { success: false, error: "Missing required fields" };
    }

    // Mock PDF URL (in production, you'd upload to Cloudinary)
    const mockPdfUrl =
      "https://res.cloudinary.com/demo/image/upload/sample.pdf";

    // Fixed query using proper table references
    const hospitalDoctor = await db
      .select({
        doctorId: DoctorTable.id,
      })
      .from(DoctorTable)
      .innerJoin(
        HospitalDoctorsTable,
        eq(HospitalDoctorsTable.doctorId, DoctorTable.id)
      )
      .where(eq(HospitalDoctorsTable.hospitalId, hospitalId))
      .limit(1);

    if (!hospitalDoctor || !hospitalDoctor[0]) {
      return { success: false, error: "No doctors found for this hospital" };
    }

    // Create report record
    const res = await db.insert(ReportsTable).values({
      patientId: parseInt(patientId as string),
      createdByDoctorId: hospitalDoctor[0].doctorId,
      hospitalId,
      reportType: reportType as any,
      title: title as string,
      description: description as string,
      attachmentUrl: mockPdfUrl,
    });
    console.log(res);

    revalidatePath("/hospital");
    return { success: true };
  } catch (error) {
    console.error("Error uploading report:", error);
    return { success: false, error: "Failed to upload report" };
  }
}
