"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProgress = exports.unit = exports.nano = exports.courses = exports.userRoles = exports.users = exports.media = exports.library = exports.categories = exports.roles = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
exports.roles = (0, pg_core_1.pgTable)("roles", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    name: (0, pg_core_1.text)("name").notNull().unique(),
});
exports.categories = (0, pg_core_1.pgTable)("categories", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    name: (0, pg_core_1.text)("name").notNull().unique(),
    description: (0, pg_core_1.text)("description"),
});
exports.library = (0, pg_core_1.pgTable)("library", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) "CURRENT_TIMESTAMP"),
});
// --- Media-tabell for bildeopplasting ---
exports.media = (0, pg_core_1.pgTable)("media", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    filename: (0, pg_core_1.varchar)("filename", { length: 256 }).notNull(),
    url: (0, pg_core_1.text)("url").notNull(),
    type: (0, pg_core_1.varchar)("type", { length: 50 }),
    tags: (0, pg_core_1.text)("tags"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
});
exports.userRoles = (0, pg_core_1.pgTable)("user_roles", {
    userId: (0, pg_core_1.uuid)("user_id").notNull(),
    roleId: (0, pg_core_1.integer)("role_id").references(() => exports.roles.id).notNull(),
}, function(table) { return ({
    primaryKey: (0, pg_core_1.primaryKey)({ columns: [table.userId, table.roleId], name: "user_roles_user_id_role_id_pk" })
}));
// --- Tabell: courses (hovedtabell for kurs) ---
exports.courses = (0, pg_core_1.pgTable)("courses", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    slug: (0, pg_core_1.varchar)("slug", { length: 255 }).notNull().unique(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    category: (0, pg_core_1.varchar)("category", { length: 100 }).notNull(),
    location: (0, pg_core_1.varchar)("location", { length: 100 }).notNull(),
    targetUser: (0, pg_core_1.varchar)("target_user", { length: 100 }).notNull(),
    language: (0, pg_core_1.varchar)("language", { length: 10 }).notNull().default('nb-NO'),
    author: (0, pg_core_1.varchar)("author", { length: 255 }).notNull(),
    revisionInterval: (0, pg_core_1.varchar)("revision_interval", { length: 50 }).notNull().default('12'),
    keywords: (0, pg_core_1.text)("keywords").array(),
    imageUrl: (0, pg_core_1.text)("image_url"),
    metadata: (0, pg_core_1.jsonb)("metadata"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) "CURRENT_TIMESTAMP"),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) "CURRENT_TIMESTAMP"),
});
// --- Tabell: nano (kapittel) ---
exports.nano = (0, pg_core_1.pgTable)("nano", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    courseId: (0, pg_core_1.uuid)("course_id").references(() => exports.courses.id, { onDelete: 'cascade' }).notNull(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    order: (0, pg_core_1.integer)("order").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) "CURRENT_TIMESTAMP"),
});
// --- Tabell: unit (selvstendig innhold) ---
exports.unit = (0, pg_core_1.pgTable)("unit", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    nanoId: (0, pg_core_1.uuid)("nano_id").references(() => exports.nano.id, { onDelete: 'cascade' }).notNull(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    body: (0, pg_core_1.text)("body").notNull(), // HTML-innhold
    illustrationUrl: (0, pg_core_1.text)("illustration_url"),
    order: (0, pg_core_1.integer)("order").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) "CURRENT_TIMESTAMP"),
});
// --- Tabell: userProgress (brukerprogresjon) ---
exports.userProgress = (0, pg_core_1.pgTable)('user_progress', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.varchar)('user_id', { length: 255 }).notNull(),
    courseId: (0, pg_core_1.varchar)('course_id', { length: 255 }),
    nanoId: (0, pg_core_1.varchar)('nano_id', { length: 255 }),
    unitId: (0, pg_core_1.varchar)('unit_id', { length: 255 }).notNull(),
    completedAt: (0, pg_core_1.timestamp)('completed_at').defaultNow(),
});
