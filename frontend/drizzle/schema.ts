import { pgTable, serial, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

// === USERS (f.eks. fra før)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

// === ROLES (f.eks. fra før)
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

// === LIBRARY (ny!)
export const library = pgTable("library", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// --- SkriveStuen: Innholdstabell ---
export const authorTypeEnum = pgEnum("author_type", ["human", "vera"]);

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  category: varchar("category", { length: 256 }).notNull(),
  content_md: text("content_md").notNull(),
  metadata: text("metadata"),
  status: varchar("status", { length: 50 }).default("draft"),
  lastReviewed: timestamp("last_reviewed").defaultNow(),
  nextReviewDue: timestamp("next_review_due"),
  authorType: authorTypeEnum("author_type").default("human"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// --- SkriveStuen: Media-tabell ---
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 256 }).notNull(),
  url: text("url").notNull(),
  type: varchar("type", { length: 50 }),
  tags: text("tags"),
  createdAt: timestamp("created_at").defaultNow(),
});
