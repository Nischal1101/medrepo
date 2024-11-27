import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PatientTable from "@/components/PatientTable";
import PatientTableSkeleton from "@/components/PatientTableSkeleton";

import { auth } from "@/lib/auth";
import { fetchUserReport } from "@/utils/FetchReports";
import { redirect } from "next/navigation";

import { Suspense } from "react";

const ReportsPage = async () => {
  const session = await auth();
  const userid = Number(session?.user.id);
  console.log("The userId from patient page is", userid);
  if (!session?.user.id) {
    redirect("/sign-up");
  }
  const data = await fetchUserReport(userid);
  if (data.length === 0) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center text-2xl">
        No data found
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <h1 className="mt-12 text-2xl md:mt-20 md:text-4xl ">
        {data[0].patientName}&apos;s Reports{" "}
      </h1>
      <Suspense fallback={<PatientTableSkeleton />}>
        <PatientTable data={data} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default ReportsPage;
