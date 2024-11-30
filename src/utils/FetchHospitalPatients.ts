import db from "@/lib/db/db";
import {
  hospitalPatients,
  PatientTable,
  UserTable
} from "@/lib/db/Schema";
import { desc, eq } from "drizzle-orm";

export async function getHospitalPatients(hospitalId: number) {
  const patients = await db
    .select({
      patientId: PatientTable.id,
      patientName: PatientTable.patientName,
      dob: PatientTable.dob,
      phone: PatientTable.phone,
      email: UserTable.email,
    })
    .from(hospitalPatients)
    .innerJoin(PatientTable, eq(hospitalPatients.patientId, PatientTable.id))
    .innerJoin(UserTable, eq(PatientTable.userId, UserTable.id))
    .where(eq(hospitalPatients.hospitalId, hospitalId))
    .orderBy(desc(hospitalPatients.registrationDate));

  return patients;
}
