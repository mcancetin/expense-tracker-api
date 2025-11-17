import { Hono } from "hono";

import auth from "./auth.ts";
import expense from "./expense.ts";
import category from "./category.ts";

const routes = new Hono();

routes.route("/auth", auth);
routes.route("/expense", expense);
routes.route("/category", category);

export default routes;
