import { pgTable, serial, text, varchar, timestamp, uuid, primaryKey, integer, jsonb } from "drizzle-orm/pg-core"
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

// --- Tabell: courses (hovedtabell for kurs) ---
export const courses = pgTable("courses", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	slug: varchar("slug", { length: 255 }).notNull().unique(),
	title: varchar("title", { length: 255 }).notNull(),
	category: varchar("category", { length: 100 }).notNull(),
	location: varchar("location", { length: 100 }).notNull(),
	targetUser: varchar("target_user", { length: 100 }).notNull(),
	language: varchar("language", { length: 10 }).notNull().default('nb-NO'),
	author: varchar("author", { length: 255 }).notNull(),
	revisionInterval: varchar("revision_interval", { length: 50 }).notNull().default('12'),
	keywords: text("keywords").array(),
	imageUrl: text("image_url"),
	metadata: jsonb("metadata"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

// --- Tabell: nano (kapittel) ---
export const nano = pgTable("nano", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	courseId: uuid("course_id").references(() => courses.id, { onDelete: 'cascade' }).notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	order: integer("order").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

// --- Tabell: unit (selvstendig innhold) ---
export const unit = pgTable("unit", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	nanoId: uuid("nano_id").references(() => nano.id, { onDelete: 'cascade' }).notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	body: text("body").notNull(), // HTML-innhold
	illustrationUrl: text("illustration_url"),
	order: integer("order").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

// --- Tabell: userProgress (brukerprogresjon) ---
export const userProgress = pgTable('user_progress', {
	id: serial('id').primaryKey(),
	userId: varchar('user_id', { length: 255 }).notNull(),
	courseId: varchar('course_id', { length: 255 }),
	nanoId: varchar('nano_id', { length: 255 }),
	unitId: varchar('unit_id', { length: 255 }).notNull(),
	completedAt: timestamp('completed_at').defaultNow(),
});
