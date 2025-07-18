"use strict";
// Midlertidig deaktivert relations for å fikse backend-feil
// Dette vil bli reaktivert når vi har fått backend til å fungere
// import { relations } from 'drizzle-orm';
// import { users, roles, userRoles, courses, nano, unit } from './schema';
// Relasjoner for users
// export var userRelations = relationsfunction(users, ({ many }) { return ({
//   userRoles: many(userRoles),
// }));
// Relasjoner for roles
// export var roleRelations = relationsfunction(roles, ({ many }) { return ({
//   userRoles: many(userRoles),
// }));
// Relasjoner for user_roles
// export var userRoleRelations = relationsfunction(userRoles, ({ one }) { return ({
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
// export var courseRelations = relationsfunction(courses, ({ many }) { return ({
//   nano: many(nano),
// }));
// Relasjoner for nano
// export var nanoRelations = relationsfunction(nano, ({ one, many }) { return ({
//   course: one(courses, {
//     fields: [nano.courseId],
//     references: [courses.id],
//   }),
//   units: many(unit),
// }));
// Relasjoner for unit
// export var unitRelations = relationsfunction(unit, ({ one }) { return ({
//   nano: one(nano, {
//     fields: [unit.nanoId],
//     references: [nano.id],
//   }),
// })); 
