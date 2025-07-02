import { db } from "../backend/drizzle/db";
import { roles } from "../backend/drizzle/schema";

async function seedRoles() {
  try {
    console.log("🌱 Adding new roles...");

    // Sjekk hvilke roller som allerede finnes
    const existingRoles = await db.select().from(roles);
    console.log("📋 Existing roles:", existingRoles.map(r => r.name));

    // Definer nye roller som skal legges til
    const newRoles = [
      "prosjektleder",
      "avdelingsleder",
      "sykepleier",
      "fagsykepleier",
      "helsefagarbeider"
    ];

    // Filtrer bort roller som allerede finnes
    const rolesToAdd = newRoles.filter(roleName => 
      !existingRoles.some(existing => existing.name === roleName)
    );

    if (rolesToAdd.length === 0) {
      console.log("✅ All roles already exist!");
      return;
    }

    // Legg til nye roller
    const rolesToInsert = rolesToAdd.map(name => ({ name }));
    const insertedRoles = await db.insert(roles).values(rolesToInsert).returning();

    console.log("✅ New roles added successfully:");
    insertedRoles.forEach(role => {
      console.log(`  - ${role.name} (ID: ${role.id})`);
    });

    // Vis alle roller
    const allRoles = await db.select().from(roles);
    console.log("\n📋 All roles in database:");
    allRoles.forEach(role => {
      console.log(`  - ${role.name} (ID: ${role.id})`);
    });

  } catch (error) {
    console.error("❌ Error seeding roles:", error);
  } finally {
    process.exit(0);
  }
}

seedRoles(); 