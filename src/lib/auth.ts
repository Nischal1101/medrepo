import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
/*
import { eq } from "drizzle-orm";
import GoogleProvider from "next-auth/providers/google";
import db from "./db/db";
import { UserTable } from "./db/Schema";
import email from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./db/db";

import bcrypt from "bcrypt";
import { UserTable } from "@/lib/db/Schema";
import { eq } from "drizzle-orm";
*/

export const authOptions: NextAuthOptions = {
  // adapter: DrizzleAdapter(db),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //   async profile(profile) {
    //     console.log(profile);
    //     return profile;
    //   },
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
