import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getReportWithAccess } from "@/utils/FetchReportAccess";
import { FileText, Hospital, User } from "lucide-react";
import AccessToggleClient from "./_components/AccessToggleClient";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

// Server Component
const AccessPage = async ({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) => {
  const reportid = Number((await params).reportId);
  const { report, doctorAccess } = await getReportWithAccess(reportid);

  return (
    <MaxWidthWrapper className="mt-12">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="size-5" />
                {report.title}
              </CardTitle>
              <CardDescription>
                <p className="flex items-center gap-2">
                  <Hospital className="size-4" />
                  {report.hospital?.name}
                </p>
                <p className="flex items-center gap-2">
                  <User className="size-4" />
                  Created by {report.createdByDoctor?.name}
                </p>
              </CardDescription>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(report.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-medium">Doctor Access</h3>
            <div className="divide-y">
              {doctorAccess.map((access) => (
                <AccessToggleClient
                  key={access.doctorId}
                  reportid={reportid}
                  access={access}
                  isCreator={access.doctorId === report.createdByDoctor?.id}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
};
export default AccessPage;
