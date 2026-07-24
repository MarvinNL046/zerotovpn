import { NextRequest, NextResponse } from "next/server";
import postIndex from "@/data/posts/index.json";

// LEGACY-ROUTE. Afbeeldingen staan in Vercel Blob; pagina's linken daar
// rechtstreeks naartoe. Deze route vangt oude links op en stuurt door naar
// de Blob-URL uit de statische post-index (de database is uitgefaseerd).
const INDEX = postIndex as unknown as Record<
  string,
  Array<{ slug: string; featuredImageUrl: string | null }>
>;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  for (const rows of Object.values(INDEX)) {
    const hit = rows.find((r) => r.slug === slug && r.featuredImageUrl);
    if (hit?.featuredImageUrl) {
      return NextResponse.redirect(hit.featuredImageUrl, 308);
    }
  }

  return new NextResponse(null, { status: 404 });
}
