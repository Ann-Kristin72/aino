import 'dotenv/config';
import type { Config } from "drizzle-kit";

export default {
  schema: "../drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  connectionString: process.env.DATABASE_URL!,
} satisfies Config; 