import db from "@/lib/db/db";
import { HospitalTable } from "@/lib/db/Schema";
import { eq } from "drizzle-orm";

export async function getHospitalId(userId: number) {
  try {
    const data = await db
      .select()
      .from(HospitalTable)
      .where(eq(HospitalTable.userId, userId));
    if (data.length === 0) {
      throw new Error("No hospital for given user");
    }
    return data[0].id;
  } catch (err: unknown) {
    console.log(err);
  }
}
