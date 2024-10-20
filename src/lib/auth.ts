/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db/db";
import bcrypt from "bcrypt";
import { UserTable } from "@/lib/db/Schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
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
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const users = await db
          .select()
          .from(UserTable)
          .where(eq(UserTable.email, credentials.email));

        if (users.length === 0) {
          throw new Error("User not found");
        }

        const user = users[0];

        if (user.provider !== "credentials") {
          throw new Error("Please use the appropriate sign-in method");
        }

        const match = await bcrypt.compare(
          credentials.password,
          user.password as string
        );

        if (!match) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await db
          .select()
          .from(UserTable)
          .where(eq(UserTable.email, profile?.email as string))
          .limit(1);

        if (existingUser.length === 0) {
          await db.insert(UserTable).values({
            name: profile?.name as string,
            email: profile?.email as string,
            provider: "google",
            role: "patient", // Set default role for Google sign-ins
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = Number(user.id);
      }
      if (account?.provider === "google") {
        const users = await db
          .select()
          .from(UserTable)
          .where(eq(UserTable.email, token.email as string))
          .limit(1);
        if (users.length > 0) {
          token.role = users[0].role;
          token.id = users[0].id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
