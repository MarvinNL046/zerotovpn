// Neon Database SQL client
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in environment variables");
}

// Create SQL client
export const sql = neon(process.env.DATABASE_URL);
