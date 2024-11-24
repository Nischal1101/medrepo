import db from "@/lib/db/db";
import { UserTable } from "@/lib/db/Schema";
import { eq } from "drizzle-orm";

export async function getHospitalNames() {
  let hospitals;
  try {
    hospitals = await db
      .select({ name: UserTable.name })
      .from(UserTable)
      .where(eq(UserTable.role, "hospital"));
  } catch (error) {
    console.log(error);
  }
  if (hospitals && hospitals.length === 0) {
    return [{ name: "Nobel" }];
  } else {
    return hospitals;
  }
}
