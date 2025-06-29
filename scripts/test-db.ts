import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("✅ Tilkobling OK:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("❌ DB-feil:", err);
    process.exit(1);
  }
})(); 