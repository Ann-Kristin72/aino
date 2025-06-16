import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export const userRoles = pgTable('user_roles', {
  user_id: integer('user_id').references(() => users.id).notNull(),
  role_id: integer('role_id').references(() => roles.id).notNull(),
}); 