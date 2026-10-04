import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: [".env.local", ".env"], quiet: true });

// `generate` works offline; `migrate`, `push` and `studio` need DATABASE_URL.
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  migrations: { table: "__drizzle_migrations", schema: "drizzle" },
  verbose: true,
  strict: true,
});
