import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { verify } from "@felix/bcrypt";

import { insertUserSchema, loginSchema } from "@/schema";
import { createUser, getUserByEmail } from "@/queries";
import { createJWT, verifyJWT } from "@/utils";

const auth = new Hono();

auth.post("/register", zValidator("json", insertUserSchema), async (c) => {
  try {
    const user = c.req.valid("json");

    const isDuplicated = await getUserByEmail({ email: user.email });

    if (isDuplicated) {
      return c.json({ message: "Email already exists" }, 409);
    }

    const { id, email } = await createUser(user);

    return c.json({ id, email }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

auth.post("/login", zValidator("json", loginSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  const user = await getUserByEmail(email);

  if (!user) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const isPasswordMatch = await verify(password, user.passwordHash);

  if (!isPasswordMatch) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const accessToken = await createJWT({
    id: user.id,
    email: user.email,
  }, "15min");
  const refreshToken = await createJWT({
    id: user.id,
    email: user.email,
  }, "1d");

  setCookie(c, "refresh_token", refreshToken, {
    sameSite: "None",
    secure: true,
    path: "/auth/refresh",
    httpOnly: true,
    maxAge: 86400,
  });

  return c.json({
    accessToken,
    user: {
      id: user.id,
      email: user.email,
    },
  }, 200);
});

auth.post("/refresh", async (c) => {
  const refreshToken = getCookie(c, "refresh_token");

  console.log(refreshToken);

  if (!refreshToken) {
    return c.json({ message: "Unauthorized" }, 201);
  }

  const payload = await verifyJWT(refreshToken);

  if (!payload) {
    return c.json({ message: "Invalid token" }, 401);
  }

  const newAccessToken = await createJWT({
    id: payload.id,
    email: payload.email,
  }, "15min");

  return c.json({ accessToken: newAccessToken });
});

auth.post("/logout", (c) => {
  deleteCookie(c, "refresh_token");
  return c.json({ message: "Logged out" });
});

export default auth;
