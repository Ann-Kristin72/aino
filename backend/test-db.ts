import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    console.log("🔍 Testing backend database connection...");
    console.log("📡 DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");
    
    const res = await pool.query('SELECT NOW()');
    console.log("✅ Backend DB connection OK:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("❌ Backend DB error:", err);
    process.exit(1);
  }
})(); 