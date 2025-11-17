import { hash } from "@felix/bcrypt";

import db from "../index.ts";
import { getUserByEmailSchema, insertUserSchema, users } from "@/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: unknown) {
  const { email: validEmail } = getUserByEmailSchema.parse({ email });

  const [user] = await db.select().from(users).where(
    eq(users.email, validEmail),
  );

  return user;
}

export async function createUser(user: unknown) {
  const { email, password } = insertUserSchema.parse(user);

  const passwordHash = await hash(password);

  const [savedUser] = await db.insert(users).values({
    email,
    passwordHash,
  })
    .returning();

  return savedUser;
}
