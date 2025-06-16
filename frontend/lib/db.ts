import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// ✅ Logg for å sjekke at env er der
console.log("👉 POSTGRES_URL:", process.env.POSTGRES_URL);
console.log("POSTGRES_URL_NON_POOLING:", process.env.POSTGRES_URL_NON_POOLING);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool); 