import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Lazy initialization to avoid build-time errors
let _sql: NeonQueryFunction<false, false> | null = null;

function getSQL() {
  if (_sql) return _sql;

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  _sql = neon(databaseUrl);
  return _sql;
}

// Export a proxy that lazily initializes the connection
export const sql = new Proxy({} as NeonQueryFunction<false, false>, {
  apply(target, thisArg, args: any[]) {
    return (getSQL() as any)(...args);
  },
  get(target, prop) {
    return (getSQL() as any)[prop];
  }
});

// Helper for typed queries
export async function query<T>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  return sql(strings, ...values) as Promise<T[]>;
}
