import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import SignInForm from "@/components/SignInForm";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
        <div className="mt-2 flex items-center gap-2">
          <div className="h-px w-1/2 bg-gray-200"></div>
          <span>or</span>
          <div className="h-px w-1/2 bg-gray-200"></div>
        </div>
        <form
          action={async () => {
            "use server";
            try {
              const res = await signIn("google", { redirect: false });
              if (res?.error) {
                toast.error("Incorrect credentials");
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Button
            variant={"outline"}
            className="mt-4 w-full rounded-lg border border-black"
          >
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/assets/google.png"
                height={20}
                width={30}
                alt="loading google image"
              />
              <span>Sign In with Google</span>
            </div>
          </Button>
        </form>
        <hr className="my-8" />
        <div className="mt-3 text-center">
          Need an account? Register as
          <p className="text-primary">
            <Link href="/sign-up/doctor">Doctor</Link>/{" "}
            <Link href={"sign-up/patient"}>Patient</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
