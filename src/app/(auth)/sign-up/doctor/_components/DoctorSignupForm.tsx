"use client";
import { credentialsDoctorSignUp } from "@/actions/User";
import AuthBtn from "@/components/AuthBtn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DoctorSpecialization } from "@/constants";
import { doctorSignUpSchema } from "@/validators/DoctorSignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contact, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function DoctorSignupForm({
  hospitals,
}: {
  hospitals: {
    id: number;
    name: string | null;
  }[];
}) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  type Schema = z.infer<typeof doctorSignUpSchema>;
  const form = useForm<Schema>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    resolver: zodResolver(doctorSignUpSchema),
  });
  const onSubmit = async (data: Schema) => {
    try {
      setPending(true);
      const error = await credentialsDoctorSignUp(data);
      setPending(false);
      if (error) {
        toast.error(String(error.error));
      } else {
        toast.success("Doctor registered Successfully!");
        router.push("/sign-in");
      }
    } catch (err: unknown) {
      toast.error("something went wrong" + err);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mt-2 grid">
              <FormControl>
                <div className="relative flex flex-col items-center justify-center">
                  <Contact
                    className="absolute left-2 top-[0.65rem] "
                    size={15}
                  />
                  <Input
                    placeholder="Enter your fullname"
                    id="name"
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
                    placeholder="Enter Password"
                    id="password"
                    className={` w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 `}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem className="mt-2">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialization." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DoctorSpecialization.map((ele, index) => (
                    <SelectItem value={ele} key={index}>
                      {ele}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="mt-2">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your hospital." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hospitals.map((ele, index) => (
                    <SelectItem value={String(ele.id)} key={index}>
                      {ele.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <AuthBtn title={"Sign Up"} className="mt-6" pending={pending} />
      </form>
    </Form>
  );
}
