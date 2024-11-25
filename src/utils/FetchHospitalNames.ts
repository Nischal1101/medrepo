import db from "@/lib/db/db";
import { HospitalTable } from "@/lib/db/Schema";

export async function getHospitalNames() {
  let hospitals;
  try {
    hospitals = await db
      .select({ id: HospitalTable.id, name: HospitalTable.hospitalName })
      .from(HospitalTable);
  } catch (error) {
    console.log(error);
  }
  if (hospitals && hospitals.length === 0) {
    return [{ id: 999, name: "Nobel" }];
  } else {
    return hospitals;
  }
}
