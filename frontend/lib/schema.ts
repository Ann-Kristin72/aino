import { pgTable, serial, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role_id: integer("role_id").notNull(),
});

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const userRoles = pgTable("user_roles", {
  user_id: integer("user_id").references(() => users.id).notNull(),
  role_id: integer("role_id").references(() => roles.id).notNull(),
});

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  content_md: text("content_md").notNull(),
  metadata: jsonb("metadata"),
  status: text("status").default("draft"),
  last_reviewed: timestamp("last_reviewed"),
  next_review_due: timestamp("next_review_due"),
  author_type: text("author_type"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
}); 