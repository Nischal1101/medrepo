import db from "@/lib/db/db";
import { PatientTable, UserTable } from "@/lib/db/Schema";
import { eq } from "drizzle-orm";
export async function getPatientById(patientId: number) {
  try {
    const patient = await db
      .select({
        userId: UserTable.id,
        patientId: PatientTable.id,
        patientName: PatientTable.patientName,
        email: UserTable.email,
        phone: PatientTable.phone,
        dob: PatientTable.dob,
      })
      .from(PatientTable)
      .innerJoin(UserTable, eq(PatientTable.userId, UserTable.id))
      .where(eq(PatientTable.id, patientId))
      .limit(1);

    return patient[0] || null;
  } catch (error) {
    console.error("Error fetching patient:", error);
    return null;
  }
}
