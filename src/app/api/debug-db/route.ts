import { NextResponse } from "next/server";
import { getDb, blogPosts } from "@/lib/db";
import { eq, and, count, sql } from "drizzle-orm";
import { getCachedPostSummaries, getAllPublishedPostSummaries } from "@/lib/pipeline/blog-service";

export async function GET() {
  try {
    // Test 1: Direct DB query
    const db = getDb();
    const [result] = await db
      .select({ count: count() })
      .from(blogPosts)
      .where(and(eq(blogPosts.published, true), eq(blogPosts.language, "en")));

    // Test 2: getAllPublishedPostSummaries (no cache)
    let directCount = 0;
    let directError = "";
    try {
      const direct = await getAllPublishedPostSummaries("en");
      directCount = direct.length;
    } catch (e: unknown) {
      directError = e instanceof Error ? e.message : String(e);
    }

    // Test 3: getCachedPostSummaries (with cache)
    let cachedCount = 0;
    let cachedError = "";
    try {
      const cached = await getCachedPostSummaries("en");
      cachedCount = cached.length;
    } catch (e: unknown) {
      cachedError = e instanceof Error ? e.message : String(e);
    }

    return NextResponse.json({
      ok: true,
      rawDbCount: result?.count ?? 0,
      directQueryCount: directCount,
      directQueryError: directError || null,
      cachedQueryCount: cachedCount,
      cachedQueryError: cachedError || null,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
