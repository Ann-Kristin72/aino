// Midlertidig deaktivert relations for å fikse backend-feil
// Dette vil bli reaktivert når vi har fått backend til å fungere

// import { relations } from 'drizzle-orm';
// import { users, roles, userRoles, courses, nano, unit } from './schema';

// Relasjoner for users
// export const userRelations = relations(users, ({ many }) => ({
//   userRoles: many(userRoles),
// }));

// Relasjoner for roles
// export const roleRelations = relations(roles, ({ many }) => ({
//   userRoles: many(userRoles),
// }));

// Relasjoner for user_roles
// export const userRoleRelations = relations(userRoles, ({ one }) => ({
//   user: one(users, {
//     fields: [userRoles.userId],
//     references: [users.id],
//   }),
//   role: one(roles, {
//     fields: [userRoles.roleId],
//     references: [roles.id],
//   }),
// }));

// Relasjoner for courses
// export const courseRelations = relations(courses, ({ many }) => ({
//   nano: many(nano),
// }));

// Relasjoner for nano
// export const nanoRelations = relations(nano, ({ one, many }) => ({
//   course: one(courses, {
//     fields: [nano.courseId],
//     references: [courses.id],
//   }),
//   units: many(unit),
// }));

// Relasjoner for unit
// export const unitRelations = relations(unit, ({ one }) => ({
//   nano: one(nano, {
//     fields: [unit.nanoId],
//     references: [nano.id],
//   }),
// })); 