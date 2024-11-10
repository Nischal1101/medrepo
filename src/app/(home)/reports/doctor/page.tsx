import DoctorTable from "@/components/DoctorTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PatientTableSkeleton from "@/components/PatientTableSkeleton";

import { auth } from "@/lib/auth";

import { Suspense } from "react";

const ReportsPage = async () => {
  const session = await auth();

  const userid = session?.user.id as number;

  return (
    <MaxWidthWrapper>
      <h1 className="mt-12 text-2xl md:mt-20 md:text-4xl ">
        Doctor&apos;s Reports{" "}
      </h1>
      <Suspense fallback={<PatientTableSkeleton />}>
        <DoctorTable userid={userid as number} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default ReportsPage;
