import { db } from "../backend/drizzle/db";
import { users, roles, userRoles } from "../backend/drizzle/schema";
import { eq } from "drizzle-orm";

// Create hovedredaktør role
const hovedredaktørRole = await db.insert(roles).values({ name: "hovedredaktør" }).returning();
console.log("✅ Created hovedredaktør role:", hovedredaktørRole[0].id);

// Create admin user
const ann = await db.insert(users).values({
  name: "Ann-Kristin Johansen",
  email: "akj@dynamiskhelse.no",
  role_id: hovedredaktørRole[0].id
}).returning();

console.log("✅ Created admin user:", ann[0].id);

// Create user-role relationship
await db.insert(userRoles).values({
  userId: ann[0].id,
  roleId: hovedredaktørRole[0].id,
});

console.log("✅ Created user-role relationship");
console.log("✅ Seed completed successfully!"); 