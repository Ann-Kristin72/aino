import { pgTable, serial, text, varchar, timestamp, uuid, primaryKey, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const roles = pgTable("roles", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull().unique(),
});

export const categories = pgTable("categories", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull().unique(),
	description: text("description"),
});

export const library = pgTable("library", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
});

export const userRoles = pgTable("user_roles", {
	userId: uuid("user_id").notNull(),
	roleId: integer("role_id").references(() => roles.id).notNull(),
}, (table) => [
	primaryKey({ columns: [table.userId, table.roleId], name: "user_roles_user_id_role_id_pk"}),
]);
