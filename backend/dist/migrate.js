"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./drizzle/db");
var drizzle_orm_1 = require("drizzle-orm");
async function migrate() {
    try {
        console.log('🔄 Running migration for user_progress table...');
        await db_1.db.execute((0, drizzle_orm_1.sql) `
      CREATE TABLE IF NOT EXISTS "user_progress" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" varchar(255) NOT NULL,
        "course_id" varchar(255),
        "nano_id" varchar(255),
        "unit_id" varchar(255) NOT NULL,
        "completed_at" timestamp DEFAULT now()
      );
    `);
        console.log('✅ Migration completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}
migrate();
