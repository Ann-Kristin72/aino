import { relations } from "drizzle-orm";
import { users, roles, userRoles, library, categories } from "./schema";

// Relasjoner for users
export const userRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
}));

// Relasjoner for roles
export const roleRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

// Relasjoner for user_roles
export const userRoleRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));

// Relasjoner for library (ingen nå)
export const libraryRelations = relations(library, () => ({}));

// Relasjoner for categories (ingen relasjoner ennå)
export const categoriesRelations = relations(categories, () => ({}));

