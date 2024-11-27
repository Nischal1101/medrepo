import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PatientTable from "@/components/PatientTable";
import PatientTableSkeleton from "@/components/PatientTableSkeleton";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { Suspense } from "react";

const ReportsPage = async () => {
  const session = await auth();
  const userid = Number(session?.user.id);
  const patientName = session?.user.name || "patient";
  console.log("The userId from patient page is", userid);
  if (!session?.user.id) {
    redirect("/sign-up");
  }

  return (
    <MaxWidthWrapper>
      <h1 className="mt-12 text-2xl md:mt-20 md:text-4xl ">
        {patientName}&apos;s Reports{" "}
      </h1>
      <Suspense fallback={<PatientTableSkeleton />}>
        <PatientTable userid={userid} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default ReportsPage;
