import { relations } from 'drizzle-orm';
import { users, roles, user_roles, library } from './schema';

// Relasjoner for users
export const userRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
  userRoles: many(user_roles),
}));

// Relasjoner for roles
export const roleRelations = relations(roles, ({ many }) => ({
  users: many(users),
  userRoles: many(user_roles),
}));

// Relasjoner for user_roles
export const userRoleRelations = relations(user_roles, ({ one }) => ({
  user: one(users, {
    fields: [user_roles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [user_roles.roleId],
    references: [roles.id],
  }),
}));

// Relasjoner for library (ingen nå)
export const libraryRelations = relations(library, () => ({})); 