"use client";
import { credentialsSignIn } from "@/actions/User";
import AuthBtn from "@/components/AuthBtn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/validators/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SignInForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  type Schema = z.infer<typeof loginSchema>;
  const form = useForm<Schema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: Schema) => {
    try {
      setPending(true);

      const error = await credentialsSignIn(data);
      setPending(false);
      if (error?.error) {
        toast.error(String(error.error));
      } else {
        toast.success("User logged in Successfully!");
        router.push("/");
      }
    } catch (err: unknown) {
      toast.error(String("here" + err));
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-2 grid">
              <FormControl>
                <div className="relative flex flex-col items-center justify-center">
                  <Mail className="absolute left-2 top-[0.65rem] " size={15} />
                  <Input
                    placeholder="Enter your email"
                    id="email"
                    {...field}
                    className={`w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 `}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-2 grid">
              <FormControl>
                <div className="relative flex flex-col items-center justify-center ">
                  <LockKeyhole
                    className="absolute left-2 top-[0.65rem]"
                    size={15}
                  />
                  <Input
                    type="password"
                    {...field}
                    placeholder=" Your Password"
                    id="password"
                    className={` w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 `}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AuthBtn title={"Log In"} className="mt-6" pending={pending} />
      </form>
    </Form>
  );
}
