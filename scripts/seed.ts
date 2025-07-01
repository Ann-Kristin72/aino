import { db } from "../backend/drizzle/db";
import { users, roles, user_roles } from "../backend/drizzle/schema";

async function seed() {
  try {
    console.log("🌱 Starting seed...");
    
    // Create hovedredaktør role
    const hovedredaktørRole = await db.insert(roles).values({ name: "hovedredaktør" }).returning();
    console.log("✅ Created hovedredaktør role:", hovedredaktørRole[0].id);

    // Create admin user
    const ann = await db.insert(users).values({
      name: "Ann-Kristin Johansen",
      email: "akj@dynamiskhelse.no"
    }).returning();
    console.log("✅ Created admin user:", ann[0].id);

    // Create user-role relationship
    await db.insert(user_roles).values({
      userId: ann[0].id,
      roleId: hovedredaktørRole[0].id,
    });
    console.log("✅ Created user-role relationship");

    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  }
}

seed(); 