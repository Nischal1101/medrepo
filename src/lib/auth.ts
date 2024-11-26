/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db/db";
// import bcrypt from "bcryptjs";
import { UserTable } from "@/lib/db/Schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new CredentialsSignin({ cause: "Email and password required" });
        }

        const users = await db
          .select()
          .from(UserTable)
          .where(eq(UserTable.email, credentials.email as string));

        if (users.length === 0) {
          throw new CredentialsSignin({ cause: "Incorrect email or password" });
        }

        const user = users[0];

        // const match = await bcrypt.compare(
        //   credentials.password as string,
        //   user.password as string
        // );
        const match = user.password === credentials.password;
        if (!match) {
          throw new CredentialsSignin({ cause: "Incorrect email or password" });
        }
        if (!user.isVerified) {
          throw new CredentialsSignin({ cause: "Your email isn't verified." });
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
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page

      return !!auth;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = Number(user.id);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
});
