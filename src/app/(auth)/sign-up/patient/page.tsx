/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable tailwindcss/no-custom-classname */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

const PatientRegisterPage = () => {
  return (
    <div className="flex h-screen items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="w-96 p-8 shadow-2xl ">
        <h1 className="py-8 text-center text-4xl text-primary">MedRepo.</h1>
        <form>
          <div className="relative flex flex-col items-center justify-center">
            <Mail className="absolute left-2 top-[0.65rem] " size={15} />
            <Input
              type="email"
              placeholder=" Your Email"
              id="email"
              className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 `}
            />
          </div>
          <div className="relative mt-3 flex flex-col items-center justify-center ">
            <LockKeyhole className="absolute left-2 top-[0.65rem]" size={15} />
            <Input
              type="password"
              placeholder=" Your Password"
              id="password"
              className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500`}
            />
          </div>

          <Button
            type="submit"
            className="btn btn-primary mt-4 w-full max-w-xs "
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-px w-1/2 bg-gray-200"></div>
          <span>or</span>
          <div className="h-px w-1/2 bg-gray-200"></div>
        </div>
        <form>
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
              <span>Sign up with Google</span>
            </div>
          </Button>
        </form>
        <hr className="my-8" />

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PatientRegisterPage;
