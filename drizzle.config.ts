import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./drizzle/migrations/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;