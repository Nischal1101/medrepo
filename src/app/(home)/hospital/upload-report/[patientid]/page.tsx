import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { UploadReportForm } from "../../_components/UploadReportForm";
import { getPatientById } from "@/utils/FetchPatientById";
import { getHospitalDoctors } from "@/utils/FetchHospitalDoctors";
import { getHospitalId } from "@/utils/FetchHospitalId";

export default async function UploadReportPage({
  params,
}: {
  params: Promise<{ patientid: string }>;
}) {
  const session = await auth();
  if (!session || session.user.role !== "hospital") {
    redirect("/");   
  }
  const userId = Number(session?.user.id);

  const hospitalId = await getHospitalId(userId);
  if (!hospitalId) {
    throw new Error("no Id ");
  }
  const patientId = parseInt((await params).patientid);
  const [patient, doctors] = await Promise.all([
    getPatientById(patientId),
    getHospitalDoctors(hospitalId),
  ]);

  if (!patient) {
    return <div>no patient</div>;
  }

  return (
    <MaxWidthWrapper className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle>Upload Report for {patient.patientName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-sm text-muted-foreground">
            <div>Email: {patient.email}</div>
            <div>Phone: {patient.phone}</div>
          </div>
          <UploadReportForm patientId={patient.patientId} doctors={doctors} />
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
}
