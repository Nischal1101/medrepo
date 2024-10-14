import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockKeyhole, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="w-96 p-8 shadow-2xl ">
        <h1 className="py-8 text-center text-4xl text-primary">MedRepo.</h1>

        <form>
          <div className="relative flex flex-col items-center justify-center">
            <Mail className="absolute left-2 top-[0.65rem] " size={15} />
            <Input
              type="email"
              name="email"
              placeholder=" Your Email"
              id="email"
              className=" input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 "
            />
          </div>
          <div className="relative mt-3 flex flex-col items-center justify-center ">
            <LockKeyhole className="absolute left-2 top-[0.65rem]" size={15} />
            <Input
              type="password"
              name="password"
              placeholder=" Your Password"
              id="password"
              className="input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 "
            />
          </div>
          <div className="  my-4">
            <div className="flex items-center justify-between">
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                </SelectContent>
              </Select>
              <p className="">Forgot Password</p>
            </div>
          </div>
          <Button type="submit" className="btn btn-primary w-full max-w-xs ">
            <span className="loading loading-spinner"></span>
            Log in
          </Button>
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
