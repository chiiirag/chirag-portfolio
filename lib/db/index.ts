import "server-only";
import { attachDatabasePool } from "@vercel/functions";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

type Db = NodePgDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { __db?: Db; __pool?: Pool };

function createDb(): Db {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local (or your Vercel project settings).");
  }

  const pool = new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  });
  // Lets Vercel Fluid compute close idle connections before a function instance is suspended.
  attachDatabasePool(pool);

  globalForDb.__pool = pool;
  return drizzle(pool, { schema });
}

/** Lazily-initialised Drizzle client, reused across hot reloads and invocations. */
export function getDb(): Db {
  globalForDb.__db ??= createDb();
  return globalForDb.__db;
}

export { schema };
