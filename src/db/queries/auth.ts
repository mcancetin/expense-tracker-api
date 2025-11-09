import db from "../index.ts";
import { insertUserSchema, users } from "@/schema";

export async function createUser(user: unknown) {
  const validUser = insertUserSchema.parse(user);

  const [savedUser] = await db.insert(users).values({
    email: validUser.email,
    passwordHash: validUser.password,
  })
    .returning();

  return savedUser;
}
