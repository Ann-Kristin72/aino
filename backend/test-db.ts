import { db } from "./drizzle/db";
import { roles } from "./drizzle/schema";
import { eq } from "drizzle-orm";

async function testDb() {
  try {
    console.log("🧪 Testing database connection...");
    
    const allRoles = await db.select().from(roles);
    console.log("✅ All roles:", allRoles);
    
    const hovedredaktørRole = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "hovedredaktør"))
      .limit(1);
    
    console.log("✅ Hovedredaktør role:", hovedredaktørRole);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Database test failed:", error);
    process.exit(1);
  }
}

testDb(); 