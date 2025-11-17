import { Hono } from "hono";

import auth from "./auth.ts";
import expense from "./expense.ts";

const routes = new Hono();

routes.route("/auth", auth);
routes.route("/expense", expense);

export default routes;
