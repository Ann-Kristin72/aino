"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = require("./drizzle/db");
const schema_1 = require("./drizzle/schema");
(async () => {
    try {
        console.log("🔍 Testing Drizzle ORM...");
        // Test en enkel spørring
        const result = await db_1.db.select().from(schema_1.roles);
        console.log("✅ Drizzle query successful:", result);
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Drizzle error:", err);
        process.exit(1);
    }
})();
