import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { UploadReportForm } from "../../_components/UploadReportForm";
import { getPatientById } from "@/utils/FetchPatientById";

export default async function UploadReportPage({
  params,
}: {
  params: Promise<{ patientid: string }>;
}) {
  const session = await auth();
  if (!session || session.user.role !== "hospital") {
    redirect("/");
  }

  console.log("patientId from params is", (await params).patientid);
  const patientId = parseInt((await params).patientid);
  const patient = await getPatientById(patientId);

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
          <UploadReportForm patientId={patient.patientId} />
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
}
