import { pgTable, text, varchar, timestamp, uuid, primaryKey, serial, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// --- Tabell: roles ---
export const roles = pgTable("roles", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull().unique(),
});

// --- Tabell: categories ---
export const categories = pgTable("categories", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull().unique(),
	description: text("description"),
});

// --- Tabell: library ---
export const library = pgTable("library", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

// --- Tabell: users ---
export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
});

// --- Pivot-tabell: user_roles ---
export const user_roles = pgTable("user_roles", {
	userId: uuid("user_id").notNull(),
	roleId: integer("role_id").references(() => roles.id).notNull(),
}, (table) => ({
	primaryKey: primaryKey({ columns: [table.userId, table.roleId], name: "user_roles_user_id_role_id_pk"})
}));
