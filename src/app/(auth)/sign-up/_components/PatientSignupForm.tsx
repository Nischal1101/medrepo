"use client";
import { credentialsPatientSignUp } from "@/actions/User";
import AuthBtn from "@/components/AuthBtn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { patientSignUpSchema } from "@/validators/PatientSignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Contact, LockKeyhole, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function PatientSignupForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  type Schema = z.infer<typeof patientSignUpSchema>;
  const form = useForm<Schema>({
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      name: "",
    },
    resolver: zodResolver(patientSignUpSchema),
  });
  const onSubmit = async (data: Schema) => {
    try {
      setPending(true);
      const error = await credentialsPatientSignUp(data);
      setPending(false);
      if (error) {
        toast.error(String(error.error));
      } else {
        toast.success("User registered Successfully!");
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
          name="phone"
          render={({ field }) => (
            <FormItem className="mt-2 grid">
              <FormControl>
                <div className="relative flex flex-col items-center justify-center ">
                  <Phone className="absolute left-2 top-[0.65rem]" size={15} />
                  <Input
                    {...field}
                    placeholder="Your Phone number"
                    id="phone"
                    className={` w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className=" mt-3 flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick date of birth</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <AuthBtn title={"Sign Up"} className="mt-6" pending={pending} />
      </form>
    </Form>
  );
}
