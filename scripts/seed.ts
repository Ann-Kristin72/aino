import { db } from "@/db"; // eller riktig import
import { users, roles, userRoles } from "@/drizzle/schema";

await db.insert(roles).values({ name: "hovedredaktør" });

const ann = await db.insert(users).values({
  name: "Ann-Kristin Johansen",
  email: "akj@dynamiskhelse.no",
}).returning();

await db.insert(userRoles).values({
  userId: ann[0].id,
  roleId: (await db.select().from(roles).where(roles.name.eq("hovedredaktør")))[0].id,
}); 