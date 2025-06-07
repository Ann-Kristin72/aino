import { Client } from "pg";
import "dotenv/config";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function testConnection() {
  try {
    await client.connect();
    const res = await client.query("SELECT NOW()");
    console.log("✅ Tilkobling OK! Tid fra DB:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Tilkobling feilet:", err.message);
  } finally {
    await client.end();
  }
}

testConnection();
