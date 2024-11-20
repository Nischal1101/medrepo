
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignInForm from "./_components/SigninForm";

const Login = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex h-screen items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="w-96 p-8 shadow-2xl ">
        <h1 className="py-8 text-center text-4xl text-primary">MedRepo.</h1>
        <SignInForm />

        <hr className="my-8" />
        <div className="mt-3 text-center">
          Need an account? Register as
          <p className="text-primary">
            <Link href="/sign-up/doctor">Doctor</Link>/{" "}
            <Link href={"sign-up"}>Patient</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
