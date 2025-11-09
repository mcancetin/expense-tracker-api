import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { insertUserSchema } from "@/schema";
import { createUser } from "@/queries";

const auth = new Hono();

auth.post("/register", zValidator("json", insertUserSchema), async (c) => {
  const user = c.req.valid("json");

  const createdUser = await createUser(user);

  return c.json(createdUser, 201);
});
auth.get("/login", (c) => c.text("it is /auth/login"));
auth.get("/logot", (c) => c.text("it is /auth/logot"));

export default auth;
