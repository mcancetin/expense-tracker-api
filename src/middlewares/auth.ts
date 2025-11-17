import { createMiddleware } from "hono/factory";

import { verifyJWT } from "@/utils";

export const authMiddleware = () =>
  createMiddleware(async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) return c.json({ message: "Unauthorized" }, 401);

    const token = authHeader.replace("Bearer ", "");

    const payload = await verifyJWT(token);
    if (!payload) return c.json({ message: "Unauthorized" }, 401);

    await next();
  });
