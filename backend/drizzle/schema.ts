import { pgTable, text, varchar, timestamp, uuid, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// --- Tabell: roles ---
export const roles = pgTable("roles", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
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
	role_id: uuid("role_id").references(() => roles.id),
});

// --- Pivot-tabell: user_roles ---
export const user_roles = pgTable("user_roles", {
	userId: uuid("user_id").notNull().references(() => users.id),
	roleId: uuid("role_id").notNull().references(() => roles.id),
}, (table) => ({
	primaryKey: primaryKey({ columns: [table.userId, table.roleId], name: "user_roles_user_id_role_id_pk"})
}));
