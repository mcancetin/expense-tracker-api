import { Hono } from "hono";

const expense = new Hono();

expense.post("/", (c) => c.text("Hello from Expense Base Route"));

export default expense;
