import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const [foundUser] = await db.select().from(user).where(eq(user.email, email)).limit(1);
    return foundUser;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const [foundUser] = await db.select().from(user).where(eq(user.id, id)).limit(1);
    return foundUser;
  } catch {
    return null;
  }
};
