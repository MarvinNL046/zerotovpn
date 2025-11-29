import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Lazy initialization to avoid build-time errors
let _sql: NeonQueryFunction<false, false> | null = null;

function getSQL(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  _sql = neon(databaseUrl);
  return _sql;
}

// Export a function that works as a tagged template literal
export function sql(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<Record<string, unknown>[]> {
  return getSQL()(strings, ...values);
}

// Helper for typed queries
export async function query<T>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  return sql(strings, ...values) as Promise<T[]>;
}
