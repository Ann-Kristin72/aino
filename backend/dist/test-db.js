"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./drizzle/db");
var schema_1 = require("./drizzle/schema");
var drizzle_orm_1 = require("drizzle-orm");
async function testDb() {
    try {
        console.log("🧪 Testing database connection...");
        var allRoles = await db_1.db.select().from(schema_1.roles);
        console.log("✅ All roles:", allRoles);
        var hovedredaktørRole = await db_1.db
            .select()
            .from(schema_1.roles)
            .where((0, drizzle_orm_1.eq)(schema_1.roles.name, "hovedredaktør"))
            .limit(1);
        console.log("✅ Hovedredaktør role:", hovedredaktørRole);
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Database test failed:", error);
        process.exit(1);
    }
}
testDb();
