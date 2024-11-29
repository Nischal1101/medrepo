import db from "@/lib/db/db";
import {
  DoctorTable,
  HospitalTable,
  ReportDoctorAccess,
  ReportsTable
} from "@/lib/db/Schema";
import { and, eq } from "drizzle-orm";

export async function getReportWithAccess(reportId: number) {
  // Get the report details
  const report = await db
    .select({
      id: ReportsTable.id,
      title: ReportsTable.title,
      reportType: ReportsTable.reportType,
      createdAt: ReportsTable.createdAt,
      hospital: {
        id: HospitalTable.id,
        name: HospitalTable.hospitalName,
      },
      createdByDoctor: {
        id: DoctorTable.id,
        name: DoctorTable.doctorName,
      },
    })
    .from(ReportsTable)
    .leftJoin(HospitalTable, eq(ReportsTable.hospitalId, HospitalTable.id))
    .leftJoin(DoctorTable, eq(ReportsTable.createdByDoctorId, DoctorTable.id))
    .where(eq(ReportsTable.id, reportId))
    .limit(1);

  // Get all doctors and their access status for this report
  const doctorAccess = await db
    .select({
      doctorId: DoctorTable.id,
      doctorName: DoctorTable.doctorName,
      specialization: DoctorTable.specialization,
      canAccess: ReportDoctorAccess.canAccess,
      grantedAt: ReportDoctorAccess.grantedAt,
    })
    .from(DoctorTable)
    .leftJoin(
      ReportDoctorAccess,
      and(
        eq(ReportDoctorAccess.doctorId, DoctorTable.id),
        eq(ReportDoctorAccess.reportId, reportId)
      )
    );

  return {
    report: report[0],
    doctorAccess,
  };
}

export async function updateDoctorAccess({
  reportId,
  doctorId,
  canAccess,
  grantedByDoctorId,
}: {
  reportId: number;
  doctorId: number;
  canAccess: boolean;
  grantedByDoctorId: number;
}) {
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
    return db
      .update(ReportDoctorAccess)
      .set({ canAccess, grantedAt: new Date() })
      .where(
        and(
          eq(ReportDoctorAccess.reportId, reportId),
          eq(ReportDoctorAccess.doctorId, doctorId)
        )
      );
  } else {
    // Insert new access record
    return db.insert(ReportDoctorAccess).values({
      reportId,
      doctorId,
      canAccess,
      grantedByDoctorId,
      grantedAt: new Date(),
    });
  }
}
