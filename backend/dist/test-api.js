"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./drizzle/db");
var schema_1 = require("./drizzle/schema");
var drizzle_orm_1 = require("drizzle-orm");
async function testApi() {
    try {
        console.log("🧪 Testing API logic...");
        // Find hovedredaktør role ID
        var hovedredaktørRole = await db_1.db
            .select()
            .from(schema_1.roles)
            .where((0, drizzle_orm_1.eq)(schema_1.roles.name, "hovedredaktør"))
            .limit(1);
        console.log("✅ Hovedredaktør role found:", hovedredaktørRole);
        if (!hovedredaktørRole[0]) {
            console.log("ℹ️ No hovedredaktør role found");
            return;
        }
        // Get users with this role using the pivot table
        var redaktører = await db_1.db
            .select({
            id: schema_1.users.id,
            name: schema_1.users.name,
            email: schema_1.users.email
        })
            .from(schema_1.users)
            .innerJoin(schema_1.userRoles, (0, drizzle_orm_1.eq)(schema_1.users.id, schema_1.userRoles.userId))
            .where((0, drizzle_orm_1.eq)(schema_1.userRoles.roleId, hovedredaktørRole[0].id));
        console.log("✅ Found admins:", redaktører);
        process.exit(0);
    }
    catch (error) {
        console.error("❌ API test failed:", error);
        process.exit(1);
    }
}
testApi();
