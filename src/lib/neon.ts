// Neon Database SQL client
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in environment variables");
}

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

export const sql = neon(ensurePooler(process.env.DATABASE_URL));
