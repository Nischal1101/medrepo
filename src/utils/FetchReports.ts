import db from "@/lib/db/db";
import {
  UserTable,
  ReportsTable,
  PatientTable,
  HospitalTable,
  DoctorTable,
} from "@/lib/db/Schema";
import { aliasedTable, eq } from "drizzle-orm";

export const fetchUserReport = async (userid: number) => {
  const patientUser = aliasedTable(UserTable, "patientUser");
  const hospitalUser = aliasedTable(UserTable, "hospitalUser");
  const doctorUser = aliasedTable(UserTable, "doctorUser");
  const data = await db
    .select({
      // Report fields
      id: ReportsTable.id,
      title: ReportsTable.title,
      description: ReportsTable.description,
      reportType: ReportsTable.reportType,
      attachmentUrl: ReportsTable.attachmentUrl,
      createdAt: ReportsTable.createdAt,
      updatedAt: ReportsTable.updatedAt,

      // Related names with correct alias references
      patientName: patientUser.name,
      hospitalName: hospitalUser.name,
      doctorName: doctorUser.name,
    })
    .from(ReportsTable)
    // Join to get patient name
    .leftJoin(PatientTable, eq(PatientTable.id, ReportsTable.patientId))
    .leftJoin(patientUser, eq(patientUser.id, PatientTable.userId))
    // Join to get hospital name
    .leftJoin(HospitalTable, eq(HospitalTable.id, ReportsTable.hospitalId))
    .leftJoin(hospitalUser, eq(hospitalUser.id, HospitalTable.userId))
    // Join to get doctor name
    .leftJoin(DoctorTable, eq(DoctorTable.id, ReportsTable.createdByDoctorId))
    .leftJoin(doctorUser, eq(doctorUser.id, DoctorTable.userId))
    .where(eq(ReportsTable.patientId, Number(userid)))
    .orderBy(ReportsTable.createdAt);
  console.log("data is fetching ");
  return data;
};
export type FetchReportsReturnType = Awaited<
  ReturnType<typeof fetchUserReport>
>;
