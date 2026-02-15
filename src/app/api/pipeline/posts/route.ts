import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb, blogPosts } from "@/lib/db";

function validateKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return key === process.env.PIPELINE_SECRET;
}

// GET /api/pipeline/posts — List all blog posts (published + drafts)
export async function GET(request: NextRequest) {
  if (!validateKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const posts = await db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      language: blogPosts.language,
      title: blogPosts.title,
      category: blogPosts.category,
      published: blogPosts.published,
      publishedAt: blogPosts.publishedAt,
      createdAt: blogPosts.createdAt,
      aiModel: blogPosts.aiModel,
      excerpt: blogPosts.excerpt,
    })
    .from(blogPosts)
    .orderBy(blogPosts.createdAt);

  return NextResponse.json({ posts, total: posts.length });
}

// DELETE /api/pipeline/posts?id=xxx — Delete a blog post
export async function DELETE(request: NextRequest) {
  if (!validateKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const postId = request.nextUrl.searchParams.get("id");
  if (!postId) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const db = getDb();
  const [deleted] = await db
    .delete(blogPosts)
    .where(eq(blogPosts.id, postId))
    .returning({ id: blogPosts.id, title: blogPosts.title });

  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ deleted: true, id: deleted.id, title: deleted.title });
}
