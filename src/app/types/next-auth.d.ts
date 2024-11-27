import { DefaultSession } from "next-auth";

import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    name: string;
    email: string;
    role?: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    name: string;
    email: string;
  }
}
