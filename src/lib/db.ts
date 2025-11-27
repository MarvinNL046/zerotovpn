// Database client - uncomment when Neon database is connected
// import { PrismaClient } from "@/generated/prisma";

// Placeholder until database is configured
export const prisma = null;

// Uncomment below when database is connected:
/*
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
*/

export default prisma;
