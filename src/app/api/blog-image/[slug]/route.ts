import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { getDb, blogPosts } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const db = getDb();
  const [post] = await db
    .select({ featuredImage: blogPosts.featuredImage })
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.slug, slug),
        eq(blogPosts.published, true)
      )
    )
    .limit(1);

  if (!post?.featuredImage) {
    return new NextResponse(null, { status: 404 });
  }

  const dataUrl = post.featuredImage;

  // Parse data URL: data:image/jpeg;base64,/9j/4AAQ...
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    // If it's already a URL (not base64), redirect to it
    return NextResponse.redirect(dataUrl);
  }

  const mimeType = match[1];
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, "base64");

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "CDN-Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
