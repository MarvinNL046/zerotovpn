import { NextRequest, NextResponse } from "next/server";
import { desc, eq, count, and, gte } from "drizzle-orm";
import {
  getDb,
  scrapeJobs,
  blogPosts,
  contentQueue,
  affiliateLinks,
} from "@/lib/db";

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return key === process.env.PIPELINE_SECRET;
}

export async function GET(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Last scrape jobs
    const recentScrapes = await db
      .select()
      .from(scrapeJobs)
      .orderBy(desc(scrapeJobs.createdAt))
      .limit(10);

    // Scrape error count (last 24h)
    const [scrapeErrors] = await db
      .select({ count: count() })
      .from(scrapeJobs)
      .where(
        and(
          eq(scrapeJobs.status, "failed"),
          gte(scrapeJobs.createdAt, oneDayAgo)
        )
      );

    // Pending content queue items
    const [pendingQueue] = await db
      .select({ count: count() })
      .from(contentQueue)
      .where(eq(contentQueue.status, "pending"));

    // Recent blog posts
    const recentPosts = await db
      .select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        title: blogPosts.title,
        published: blogPosts.published,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt))
      .limit(5);

    // Published post count
    const [publishedCount] = await db
      .select({ count: count() })
      .from(blogPosts)
      .where(eq(blogPosts.published, true));

    // Affiliate link count
    const [linkCount] = await db
      .select({ count: count() })
      .from(affiliateLinks);

    // Posts created this week
    const [weeklyPosts] = await db
      .select({ count: count() })
      .from(blogPosts)
      .where(gte(blogPosts.createdAt, oneWeekAgo));

    return NextResponse.json({
      scraping: {
        recentJobs: recentScrapes.map((j) => ({
          id: j.id,
          type: j.type,
          status: j.status,
          source: j.source,
          createdAt: j.createdAt,
          completedAt: j.completedAt,
        })),
        errorsLast24h: scrapeErrors?.count ?? 0,
      },
      content: {
        pendingQueueItems: pendingQueue?.count ?? 0,
        recentPosts,
        publishedTotal: publishedCount?.count ?? 0,
        postsThisWeek: weeklyPosts?.count ?? 0,
      },
      affiliateLinks: {
        total: linkCount?.count ?? 0,
      },
      health: {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Pipeline status error:", error);
    return NextResponse.json(
      {
        error: "Status check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
