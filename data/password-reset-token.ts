import { db } from "@/db";
import { passwordResetToken } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const [passwordResetTokenData] = await db
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.token, token))
      .limit(1);
    return passwordResetTokenData;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const [passwordResetTokenData] = await db
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.email, email))
      .limit(1);
    return passwordResetTokenData;
  } catch {
    return null;
  }
};
