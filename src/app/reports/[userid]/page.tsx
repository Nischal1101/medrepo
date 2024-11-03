import DownloadButton from "@/components/DownloadButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/db/db";
import {
  DoctorTable,
  HospitalTable,
  PatientTable,
  ReportsTable,
  UserTable,
} from "@/lib/db/Schema";
import { eq, aliasedTable } from "drizzle-orm";

const ReportsPage = async ({
  params,
}: {
  params: Promise<{ userid: string }>;
}) => {
  const userid = (await params).userid;
  console.log("useid", userid);

  const patientUser = aliasedTable(UserTable, "patientUser");
  const hospitalUser = aliasedTable(UserTable, "hospitalUser");
  const doctorUser = aliasedTable(UserTable, "doctorUser");
  const data = await db
    .select({
      // Report fields
      id: ReportsTable.id,
      title: ReportsTable.title,
      description: ReportsTable.description,
      findings: ReportsTable.findings,
      recommendations: ReportsTable.recommendations,
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
  console.log(data);
  if (data.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center text-3xl">
        No data found
      </div>
    );
  }
  return (
    <MaxWidthWrapper>
      <h1 className="mt-12 text-2xl md:mt-20 md:text-4xl ">
        {data[0].patientName}&apos;s Reports{" "}
      </h1>
      <Table className="mt-12">
        <TableHeader className="md:text-lg">
          <TableRow>
            <TableHead className="max-w-[100px]">Id</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow className="md:text-lg" key={item.id}>
              <TableCell className="font-medium ">{item.id}</TableCell>
              <TableCell>{item.hospitalName}</TableCell>
              <TableCell>{item.doctorName}</TableCell>
              <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DownloadButton url={item.attachmentUrl as string} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MaxWidthWrapper>
  );
};

export default ReportsPage;
