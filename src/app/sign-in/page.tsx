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
    <div className="h-screen flex justify-center items-center  px-4 sm:px-6 lg:px-8">
      <div className="shadow-2xl py-8 px-8 w-96 ">
        <h1 className="text-primary text-4xl text-center py-8">MedRepo.</h1>

        <form>
          <div className="flex flex-col relative items-center justify-center">
            <Mail className="absolute left-2 top-[0.65rem] " size={15} />
            <Input
              type="email"
              name="email"
              placeholder=" Your Email"
              id="email"
              className=" input input-bordered w-full max-w-xs hover:border-gray-500 transition ease-in-out delay-150 px-8 "
            />
          </div>
          <div className="mt-3 flex flex-col relative justify-center items-center ">
            <LockKeyhole className="absolute left-2 top-[0.65rem]" size={15} />
            <Input
              type="password"
              name="password"
              placeholder=" Your Password"
              id="password"
              className="input input-bordered w-full max-w-xs hover:border-gray-500 transition ease-in-out delay-150 px-8 "
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
        <hr className="mt-8 mb-8" />

        <p className="text-center mt-3">
          Need an account? <span className="text-primary">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
