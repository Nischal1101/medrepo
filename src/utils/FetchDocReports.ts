import { aliasedTable, and, eq, or } from "drizzle-orm";
import {
  ReportsTable,
  ReportDoctorAccess,
  PatientTable,
  UserTable,
  DoctorTable,
  HospitalTable,
} from "@/lib/db/Schema";
import db from "@/lib/db/db";

// Function to get all accessible reports with detailed information
// export const getAllAccessibleReportsWithDetails = async ({
//   doctorId,
// }: {
//   doctorId: number;
// }) => {
//   const hospitalUser = aliasedTable(UserTable, "hospitalUser");
//   const doctorUser = aliasedTable(UserTable, "doctorUser");
//   return await db
//     .select({
//       // Report core details
//       reportId: ReportsTable.id,
//       title: ReportsTable.title,
//       reportType: ReportsTable.reportType,
//       attachmentUrl: ReportsTable.attachmentUrl,
//       createdAt: ReportsTable.createdAt,

//       // Patient details
//       patientName: UserTable.name,

//       // Creating Doctor details
//       creatingDoctorName: doctorUser.name,

//       // Hospital details
//       hospitalName: hospitalUser.name,
//     })
//     .from(ReportsTable)
//     // Join for report access
//     .innerJoin(
//       ReportDoctorAccess,
//       and(
//         eq(ReportDoctorAccess.reportId, ReportsTable.id),
//         eq(ReportDoctorAccess.doctorId, doctorId),
//         eq(ReportDoctorAccess.canAccess, true)
//       )
//     )
//     // Joins for patient info
//     .innerJoin(PatientTable, eq(ReportsTable.patientId, PatientTable.id))
//     .innerJoin(UserTable, eq(PatientTable.userId, UserTable.id))
//     // Joins for doctor info
//     .innerJoin(DoctorTable, eq(ReportsTable.createdByDoctorId, DoctorTable.id))
//     .innerJoin(doctorUser, eq(DoctorTable.userId, doctorUser.id))
//     // Joins for hospital info
//     .innerJoin(HospitalTable, eq(ReportsTable.hospitalId, HospitalTable.id))
//     .innerJoin(hospitalUser, eq(HospitalTable.userId, hospitalUser.id))
//     .where(
//       or(
//         eq(ReportsTable.createdByDoctorId, doctorId),
//         eq(ReportDoctorAccess.canAccess, true)
//       )
//     )
//     .orderBy(ReportsTable.createdAt);
// };

export const getAllAccessibleReportsWithDetails = async ({
  doctorId,
}: {
  doctorId: number;
}) => {
  const hospitalUser = aliasedTable(UserTable, "hospitalUser");
  const doctorUser = aliasedTable(UserTable, "doctorUser");

  return await db
    .select({
      reportId: ReportsTable.id,
      title: ReportsTable.title,
      reportType: ReportsTable.reportType,
      attachmentUrl: ReportsTable.attachmentUrl,
      createdAt: ReportsTable.createdAt,
      patientName: UserTable.name,
      creatingDoctorName: doctorUser.name,
      hospitalName: hospitalUser.name,
    })
    .from(ReportsTable)
    // Joins for patient info
    .innerJoin(PatientTable, eq(ReportsTable.patientId, PatientTable.id))
    .innerJoin(UserTable, eq(PatientTable.userId, UserTable.id))
    // Joins for doctor info
    .innerJoin(DoctorTable, eq(ReportsTable.createdByDoctorId, DoctorTable.id))
    .innerJoin(doctorUser, eq(DoctorTable.userId, doctorUser.id))
    // Joins for hospital info
    .innerJoin(HospitalTable, eq(ReportsTable.hospitalId, HospitalTable.id))
    .innerJoin(hospitalUser, eq(HospitalTable.userId, hospitalUser.id))
    // Left join for access checking
    .leftJoin(
      ReportDoctorAccess,
      and(
        eq(ReportDoctorAccess.reportId, ReportsTable.id),
        eq(ReportDoctorAccess.doctorId, doctorId)
      )
    )
    .where(
      or(
        eq(ReportsTable.createdByDoctorId, doctorId),
        and(
          eq(ReportDoctorAccess.doctorId, doctorId),
          eq(ReportDoctorAccess.canAccess, true)
        )
      )
    )
    .orderBy(ReportsTable.createdAt);
};
