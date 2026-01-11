import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import Google from "next-auth/providers/google";
import crypto from "crypto";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    generateSessionToken: () => {
      const token = "st_" + crypto.randomBytes(64).toString("hex");
      return token;
    },
  },
  providers: [Google],
});
