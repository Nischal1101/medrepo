"use client";
import { credentialsSignIn } from "@/actions/User";
import { loginSchema } from "@/validators/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import AuthBtn from "./AuthBtn";

export default function SignInForm() {
  const router = useRouter();
  console.log("signinform coming");
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
      const error = await credentialsSignIn(data);
      if (error) {
        toast.error(String(error));
      } else {
        toast.success("user logged in Successfully!");
      }
      router.refresh();
    } catch (err: unknown) {
      toast.error("something went wrong" + err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex flex-col items-center justify-center">
        <Mail className="absolute left-2 top-[0.65rem] " size={15} />
        <Input
          type="email"
          {...register("email")}
          placeholder=" Your Email"
          id="email"
          className={`w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 ${errors.email ? "focus-visible:ring-red-500" : ""}`}
        />
        {errors.email && (
          <p className="mt-1 self-start  text-sm text-red-500">
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
          className={` w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 ${errors.email ? "focus-visible:ring-red-500" : ""}`}
        />
        {errors.password && (
          <p className="mt-1 self-start text-sm text-red-500">
            {errors?.password.message}
          </p>
        )}
      </div>
      <AuthBtn title={"Log In"} />
    </form>
  );
}
