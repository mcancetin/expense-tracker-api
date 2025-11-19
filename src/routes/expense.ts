import { Hono } from "hono";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "@/queries";
import { idParamValidator, validate } from "@/utils";
import { insertExpenseSchema, updateExpenseSchema } from "@/schema";

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

expense.get("/:id", idParamValidator(), async (c) => {
  try {
    const { id } = c.req.valid("param");
    const expense = await getExpenseById(id);
    if (!expense) return c.json({ error: "Expense not found" }, 404);
    return c.json(expense, 200);
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

expense.patch(
  "/:id",
  idParamValidator(),
  validate("json", updateExpenseSchema),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const updateData = c.req.valid("json");
      const expense = await updateExpense(id, updateData);

      if (!expense) return c.json({ error: "Expense not found" }, 404);
      return c.json(expense, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Internal server error" }, 500);
    }
  },
);

expense.delete(
  "/:id",
  idParamValidator(),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const deleted = await deleteExpense(id);
      if (!deleted) return c.json({ error: "Expense not found" }, 404);
      return c.json(deleted, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Internal server error" }, 500);
    }
  },
);

export default expense;
