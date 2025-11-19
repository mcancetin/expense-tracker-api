import { eq } from "drizzle-orm";

import db from "../index.ts";
import { expenses, insertExpenseSchema } from "@/schema";

export async function getExpenses() {
  const items = await db.select().from(expenses);
  return items;
}

export async function getExpenseById(id: string) {
  const items = await db.select().from(expenses).where(eq(expenses.id, id));
  return items[0] || null;
}

export async function createExpense(expense: unknown) {
  const validatedExpense = insertExpenseSchema.parse(expense);

  const [item] = await db.insert(expenses).values(validatedExpense)
    .returning();
  return item;
}
