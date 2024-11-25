import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import DoctorSignupForm from "./_components/DoctorSignupForm";
import { getHospitalNames } from "@/utils/FetchHospitalNames";

export default async function DoctorSignupPage() {
  const hospitals = await getHospitalNames();
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex h-screen items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="w-96 p-8 shadow-2xl ">
        <h1 className="py-8 text-center text-4xl text-primary">MedRepo.</h1>
        <DoctorSignupForm hospitals={hospitals ?? []} />
        <hr className="my-8" />
        <div className="mt-3 text-center">
          Already have an account?
          <p className="text-primary">
            <Link href="/sign-in">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
