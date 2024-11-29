import db from "@/lib/db/db";
import {
  DoctorTable,
  HospitalTable,
  PatientTable,
  ReportDoctorAccess,
  ReportsTable,
} from "@/lib/db/Schema";
import { and, desc, eq, or } from "drizzle-orm";

export async function getAccessibleReportsByUserId(userId: number) {
  try {
    // First, get the doctor record using userId
    const doctorRecord = await db
      .select({
        doctorId: DoctorTable.id,
      })
      .from(DoctorTable)
      .where(eq(DoctorTable.userId, userId))
      .limit(1);

    if (!doctorRecord.length) {
      throw new Error("Doctor record not found for this user");
    }

    const doctorId = doctorRecord[0].doctorId;

    // Get all reports that the doctor can access
    const reports = await db
      .select({
        reportId: ReportsTable.id,
        title: ReportsTable.title,
        reportType: ReportsTable.reportType,
        attachmentUrl: ReportsTable.attachmentUrl,
        createdAt: ReportsTable.createdAt,
        // Patient details
        patientName: PatientTable.patientName,
        // Creating doctor details
        creatingDoctorName: DoctorTable.doctorName,
        // Hospital details
        hospitalName: HospitalTable.hospitalName,
      })
      .from(ReportsTable)
      // Join with PatientTable for patient details
      .leftJoin(PatientTable, eq(ReportsTable.patientId, PatientTable.id))
      // Join with DoctorTable for creating doctor details
      .leftJoin(DoctorTable, eq(ReportsTable.createdByDoctorId, DoctorTable.id))
      // Join with HospitalTable for hospital details
      .leftJoin(HospitalTable, eq(ReportsTable.hospitalId, HospitalTable.id))
      // Join with ReportDoctorAccess to check access
      .leftJoin(
        ReportDoctorAccess,
        and(
          eq(ReportsTable.id, ReportDoctorAccess.reportId),
          eq(ReportDoctorAccess.doctorId, doctorId)
        )
      )
      .where(
        or(
          // Reports created by the doctor
          eq(ReportsTable.createdByDoctorId, doctorId),
          // Reports where access has been granted
          and(
            eq(ReportDoctorAccess.doctorId, doctorId),
            eq(ReportDoctorAccess.canAccess, true)
          )
        )
      )
      .orderBy(desc(ReportsTable.createdAt));

    return reports;
  } catch (error) {
    console.error("Error fetching doctor's accessible reports:", error);
    throw error;
  }
}
