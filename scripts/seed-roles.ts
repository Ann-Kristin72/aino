import { db } from "../backend/drizzle/db";
import { roles } from "../backend/drizzle/schema";

async function seedRoles() {
  try {
    console.log("🌱 Seeding roles...");
    
    await db.insert(roles).values([
      { name: "superadmin" },
      { name: "hovedredaktør" },
      { name: "redaktør" },
      { name: "veileder" },
      { name: "assistent" },
    ]).onConflictDoNothing();

    console.log("✅ Roles seeded successfully");
    
    // Verify the seeding
    const seededRoles = await db.select().from(roles);
    console.log("📋 Seeded roles:", seededRoles);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding roles:", error);
    process.exit(1);
  }
}

seedRoles(); 