import db from "@/lib/db/db";
import { DoctorTable, HospitalDoctorsTable, UserTable } from "@/lib/db/Schema";
import { eq } from "drizzle-orm";
export async function getHospitalDoctors(hospitalId: number) {
  const doctors = await db
    .select({
      userId: DoctorTable.userId,
      doctorId: DoctorTable.id,
      doctorName: DoctorTable.doctorName,
      specialization: DoctorTable.specialization,
      email: UserTable.email,
      isVerified: UserTable.isVerified,
      joinedAt: UserTable.createdAt,
    })
    .from(HospitalDoctorsTable)
    .innerJoin(DoctorTable, eq(HospitalDoctorsTable.doctorId, DoctorTable.id))
    .innerJoin(UserTable, eq(DoctorTable.userId, UserTable.id))
    .where(eq(HospitalDoctorsTable.hospitalId, hospitalId));
  // .orderBy(desc(UserTable.createdAt));

  return doctors;
}
