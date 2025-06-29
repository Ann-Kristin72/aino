import 'dotenv/config';
import { db } from './drizzle/db';
import { roles } from './drizzle/schema';

(async () => {
  try {
    console.log("🔍 Testing Drizzle ORM...");
    
    // Test en enkel spørring
    const result = await db.select().from(roles);
    console.log("✅ Drizzle query successful:", result);
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Drizzle error:", err);
    process.exit(1);
  }
})(); 