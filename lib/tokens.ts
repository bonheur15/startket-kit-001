import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { db } from "@/db";
import { verificationToken, passwordResetToken } from "@/db/schema";
import { eq } from "drizzle-orm";

// Fallback for uuid if not installed, though we should check package.json or use crypto
const generateId = () => crypto.randomUUID();

export const generateVerificationToken = async (email: string) => {
  const token = generateId();
  // Expires in 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000); 

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(verificationToken)
      .where(eq(verificationToken.identifier, existingToken.identifier));
  }

  // Convert Date to string for MySQL if needed, or let Drizzle handle it. 
  // Based on schema `mode: 'string'`, it's safer to pass string formatted for MySQL 'YYYY-MM-DD HH:mm:ss' 
  // or ISO string if the driver supports it. 
  // Let's try passing Date first, if it fails we fix. 
  // Actually, to be safe with MySQL and Drizzle string mode:
  const expiresStr = expires.toISOString().slice(0, 19).replace('T', ' ');

  const [createdToken] = await db
    .insert(verificationToken)
    .values({
      identifier: email,
      token,
      expires: expiresStr,
    })
    // .returning() // MySQL usually doesn't support returning in all versions/drivers with Drizzle easily without valid setup
    // But we know what we inserted.
    .$dynamic(); 
    
    // We can just return the object
    return {
        identifier: email,
        token,
        expires: expiresStr
    };
};

export const generatePasswordResetToken = async (email: string) => {
  const token = generateId();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const expiresStr = expires.toISOString().slice(0, 19).replace('T', ' ');

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.id, existingToken.id));
  }

  // passwordResetToken has an ID column
  const id = generateId();

  await db.insert(passwordResetToken).values({
    id,
    email,
    token,
    expires: expiresStr,
  });

  return {
    id,
    email,
    token,
    expires: expiresStr
  }
};
