import { Hono } from "hono";

import auth from "./auth.ts";

const routes = new Hono();

routes.route("/auth", auth);

export default routes;
