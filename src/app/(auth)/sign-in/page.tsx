/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { signIn, useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import { LockKeyhole, Mail, Shell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/LoginSchema";
import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, isError] = useState(false);
  useEffect(() => {
    if (session?.user) router.push("/");
  }, [session?.user]);
  const searchParams = useSearchParams();
  // const role = searchParams.get("role");
  type Schema = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: Schema) => {
    try {
      setLoading(true);
      isError(false);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        // role: role || "patient",
        provider: "credentials",
      });
      console.log(res);
      setLoading(false);
      if (res?.error) {
        isError(true);
        toast.error("Incorrect credentials");
        isError(false);
      } else {
        toast.success("user logged in Successfully!");
        const callbackUrl = searchParams.get("callbackUrl");
        router.push(callbackUrl || "/");
      }
      // router.refresh();
    } catch (err: unknown) {
      toast.error("something went wrong");
    }
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen items-center justify-center  px-4 sm:px-6 lg:px-8">
        <div className="w-96 p-8 shadow-2xl ">
          <h1 className="py-8 text-center text-4xl text-primary">MedRepo.</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-col items-center justify-center">
              <Mail className="absolute left-2 top-[0.65rem] " size={15} />
              <Input
                type="email"
                {...register("email")}
                placeholder=" Your Email"
                id="email"
                className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 ${errors.email ? "focus-visible:ring-red-500" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 self-start  text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative mt-3 flex flex-col items-center justify-center ">
              <LockKeyhole
                className="absolute left-2 top-[0.65rem]"
                size={15}
              />
              <Input
                type="password"
                {...register("password")}
                placeholder=" Your Password"
                id="password"
                className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 ${errors.email ? "focus-visible:ring-red-500" : ""}`}
              />
              {errors.password && (
                <p className="mt-1 self-start text-sm text-red-500">
                  {errors?.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || error}
              className="btn btn-primary mt-4 w-full max-w-xs "
            >
              {loading && <Shell className="mr-3  animate-spin" />}
              Log in
            </Button>
          </form>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-px w-1/2 bg-gray-200"></div>
            <span>or</span>
            <div className="h-px w-1/2 bg-gray-200"></div>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await signIn("google", { redirect: false });
                const callbackUrl = searchParams.get("callbackUrl");
                router.push(callbackUrl || "/");
                // router.refresh();
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

          <p className="mt-3 text-center">
            Need an account? <span className="text-primary">Sign Up</span>
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default Login;
