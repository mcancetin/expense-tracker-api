import { Hono } from "hono";
import { createExpense, getExpenses } from "@/queries";
import { validate } from "@/utils";
import { insertExpenseSchema } from "@/schema";

const expense = new Hono();

expense.get("/", async (c) => {
  try {
    const expenses = await getExpenses();
    return c.json(expenses, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

expense.post("/", validate("json", insertExpenseSchema), async (c) => {
  try {
    const validatedExpense = c.req.valid("json");
    const expense = await createExpense(validatedExpense);

    return c.json(expense, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default expense;
