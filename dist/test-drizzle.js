"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var db_1 = require("./drizzle/db");
var schema_1 = require("./drizzle/schema");
(async function() {
    try {
        console.log("🔍 Testing Drizzle ORM...");
        // Test en enkel spørring
        var result = await db_1.db.select().from(schema_1.roles);
        console.log("✅ Drizzle query successful:", result);
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Drizzle error:", err);
        process.exit(1);
    }
})();
