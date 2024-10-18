/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockKeyhole, Mail } from "lucide-react";
import email from "next-auth/providers/email";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/LoginSchema";
import { z } from "zod";

const Login = () => {
  type Schema = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: Schema) => {
    await signIn("credentials", {
      email,
      redirect: false,
    });
  };
  return (
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
              <p className=" mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative mt-3 flex flex-col items-center justify-center ">
            <LockKeyhole className="absolute left-2 top-[0.65rem]" size={15} />
            <Input
              type="password"
              {...register("password")}
              placeholder=" Your Password"
              id="password"
              className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 ${errors.email ? "focus-visible:ring-red-500" : ""}`}
            />
            {errors.email && (
              <p className=" mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="btn btn-primary mt-4 w-full max-w-xs "
          >
            <span className="loading loading-spinner"></span>
            Log in
          </Button>
          <Button onClick={() => signIn("google")}>Sign In with Google</Button>
        </form>
        <hr className="my-8" />

        <p className="mt-3 text-center">
          Need an account? <span className="text-primary">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
