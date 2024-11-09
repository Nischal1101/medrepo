import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PatientTable from "@/components/PatientTable";
import PatientTableSkeleton from "@/components/PatientTableSkeleton";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
import { Suspense } from "react";

const ReportsPage = async () => {
  const session = await auth();
  console.log("the session is ", session);
  if (!session?.user) redirect("/sign-in");
  console.log("The session from patient page is", session.user);
  const userid = session.user.id;
  console.log("The userId from patient page is", userid);
  if (!session.user.id) {
    return <div>No user session</div>;
  }

  return (
    <MaxWidthWrapper>
      <h1 className="mt-12 text-2xl md:mt-20 md:text-4xl ">
        Patient&apos;s Reports{" "}
      </h1>
      <Suspense fallback={<PatientTableSkeleton />}>
        <PatientTable userid={userid} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default ReportsPage;
