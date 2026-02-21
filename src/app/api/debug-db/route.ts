import { NextResponse } from "next/server";
import { getDb, blogPosts } from "@/lib/db";
import { eq, and, count, sql } from "drizzle-orm";

export async function GET() {
  try {
    const db = getDb();

    const [result] = await db
      .select({ count: count() })
      .from(blogPosts)
      .where(and(eq(blogPosts.published, true), eq(blogPosts.language, "en")));

    // Test the hasFeaturedImage SQL expression
    const sample = await db
      .select({
        slug: blogPosts.slug,
        hasFeaturedImage: sql<boolean>`"featuredImage" IS NOT NULL`.as(
          "hasFeaturedImage"
        ),
      })
      .from(blogPosts)
      .where(and(eq(blogPosts.published, true), eq(blogPosts.language, "en")))
      .limit(3);

    return NextResponse.json({
      ok: true,
      totalPublishedEN: result?.count ?? 0,
      sample,
      dbUrlSet: !!process.env.DATABASE_URL,
      dbUrlLength: process.env.DATABASE_URL?.length ?? 0,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
