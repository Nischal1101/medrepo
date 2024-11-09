import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ReportsPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (session?.user.role === "doctor") {
    redirect("/reports/doctor");
  }
  if (session?.user.role === "patient") {
    redirect("/reports/patient");
  }
  return <div>hi</div>;
};

export default ReportsPage;
