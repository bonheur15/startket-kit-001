import { db } from "@/db";
import { verificationToken } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const [verificationTokenData] = await db
      .select()
      .from(verificationToken)
      .where(eq(verificationToken.token, token))
      .limit(1);
    return verificationTokenData;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const [verificationTokenData] = await db
      .select()
      .from(verificationToken)
      .where(eq(verificationToken.identifier, email))
      .limit(1);
    return verificationTokenData;
  } catch {
    return null;
  }
};
