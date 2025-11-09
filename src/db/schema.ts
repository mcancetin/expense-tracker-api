import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import z from "zod";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  email: varchar({ length: 255 }).unique(),
  passwordHash: varchar("password_hash", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const expenses = pgTable("expenses", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }),
  userId: uuid("user_id").notNull().references(() => users.id, {
    onDelete: "cascade",
  }),
  categoryId: uuid("category_id").notNull().references(() => categories.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  index().on(table.userId),
  index().on(table.categoryId),
]);

export const categories = pgTable("categories", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const insertUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});
