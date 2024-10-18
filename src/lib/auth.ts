import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./db/db";
import bcrypt from "bcrypt";
import { UserTable } from "@/lib/db/Schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db
          .select()
          .from(UserTable)
          .where(eq(UserTable.email, credentials.email))
          .limit(1);
        if (!user || !user[0].password) {
          return null;
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user[0].password
        );
        if (!isPasswordCorrect) {
          return null;
        }
        return {
          id: String(user[0].id),
          email: user[0].email,
          role:user[0].role
          // name: user[0].name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
