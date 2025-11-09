import { Hono } from "hono";
import { logger } from "hono/logger";

import routes from "@/routes";

const app = new Hono();

app.use(logger());

app.get("/", (c) => c.text("Hello, World!"));
app.route("/", routes);

export default app;
