import { pgTable, text, uuid, primaryKey } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(), // eks: "hovedredaktør"
});

export const userRoles = pgTable("user_roles", {
  userId: uuid("user_id").notNull().references(() => users.id),
  roleId: uuid("role_id").notNull().references(() => roles.id),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.roleId] }),
})); 