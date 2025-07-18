import { db } from "./drizzle/db";
import { users, roles, userRoles } from "./drizzle/schema";
import { eq } from "drizzle-orm";

async function testApi() {
  try {
    console.log("🧪 Testing API logic...");
    
    // Find hovedredaktør role ID
    const hovedredaktørRole = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "hovedredaktør"))
      .limit(1);

    console.log("✅ Hovedredaktør role found:", hovedredaktørRole);

    if (!hovedredaktørRole[0]) {
      console.log("ℹ️ No hovedredaktør role found");
      return;
    }

    // Get users with this role using the pivot table
    const redaktører = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email
      })
      .from(users)
      .innerJoin(userRoles, eq(users.id, userRoles.userId))
      .where(eq(userRoles.roleId, hovedredaktørRole[0].id));

    console.log("✅ Found admins:", redaktører);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ API test failed:", error);
    process.exit(1);
  }
}

testApi(); 