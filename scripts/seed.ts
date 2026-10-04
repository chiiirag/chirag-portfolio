// Seeds the database with starter content. Safe to re-run: it only fills empty tables
// and never overwrites content you've edited in the admin panel.
// Usage: npm run db:seed
import { config } from "dotenv";
import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import type { PgTable } from "drizzle-orm/pg-core";
import { Pool } from "pg";
import { defaultProfile, defaultProjects, defaultServices, defaultSkills, defaultStats } from "../lib/defaults";
import * as schema from "../lib/db/schema";

config({ path: [".env.local", ".env"], quiet: true });

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.");

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  const isEmpty = async (table: PgTable) => {
    const [{ value }] = await db.select({ value: count() }).from(table);
    return value === 0;
  };

  try {
    await db
      .insert(schema.profile)
      .values({ id: 1, ...defaultProfile })
      .onConflictDoNothing();
    console.log("✓ profile");

    if (await isEmpty(schema.stats)) {
      await db.insert(schema.stats).values(defaultStats.map((s, i) => ({ ...s, sortOrder: i })));
      console.log("✓ stats");
    }
    if (await isEmpty(schema.skills)) {
      await db.insert(schema.skills).values(defaultSkills.map((s, i) => ({ ...s, sortOrder: i })));
      console.log("✓ skills");
    }
    if (await isEmpty(schema.projects)) {
      await db.insert(schema.projects).values(defaultProjects.map((p, i) => ({ ...p, sortOrder: i })));
      console.log("✓ projects");
    }
    if (await isEmpty(schema.services)) {
      await db.insert(schema.services).values(defaultServices.map((s, i) => ({ ...s, sortOrder: i })));
      console.log("✓ services");
    }
    console.log("Seed complete.");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
