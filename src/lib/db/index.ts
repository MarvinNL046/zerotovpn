import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function ensurePooler(url: string): string {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("-pooler")) {
      u.hostname = u.hostname.replace(/^([^.]+)\./, "$1-pooler.");
    }
    return u.toString();
  } catch {
    return url;
  }
}

// Lazy initialization to avoid build-time errors
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (_db) return _db;

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(ensurePooler(databaseUrl));
  _db = drizzle(sql, { schema });

  return _db;
}

// For convenience - will throw if DATABASE_URL not set
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle<typeof schema>>];
  },
});

// Re-export schema and types
export * from "./schema";
