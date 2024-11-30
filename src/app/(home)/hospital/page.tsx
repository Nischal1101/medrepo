import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHospitalDoctors } from "@/utils/FetchHospitalDoctors";
import { getHospitalPatients } from "@/utils/FetchHospitalPatients";
import { DoctorsTable } from "./_components/DoctorTable";
import { PatientsTable } from "./_components/PatientTable";
import { getHospitalId } from "@/utils/FetchHospitalId";
import { auth } from "@/lib/auth";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function HospitalPortalPage() {
  // Fetch data in parallel
  const session = await auth();
  const userId = Number(session?.user.id);

  const hospitalId = await getHospitalId(userId);
  if (!hospitalId) {
    throw new Error("no Id ");
  }

  const [doctors, patients] = await Promise.all([
    getHospitalDoctors(hospitalId),
    getHospitalPatients(hospitalId),
  ]);

  return (
    <MaxWidthWrapper className="mt-12">
      <Tabs defaultValue="doctors" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="doctors">
              Doctors ({doctors.length})
            </TabsTrigger>
            <TabsTrigger value="patients">
              Patients ({patients.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="doctors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <DoctorsTable doctors={doctors} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <PatientsTable patients={patients} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MaxWidthWrapper>
  );
}
