import { DefaultSession } from "next-auth";
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id: number;
  }
}
declare module "next-auth" {
  interface session {
    user: {
      role?: string;
      id: number;
    } & DefaultSession["user"];
  }
}
