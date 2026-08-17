import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// Bezoekersreviews gaan sinds de Neon-uitfasering naar de gedeelde
// wetry-sites-leads Convex-backend. Deze route valideert zoals voorheen en
// stuurt server-side door; reviews komen daar binnen als "pending".
const SITES_LEADS_URL =
  process.env.SITES_LEADS_URL ?? "https://beaming-ermine-172.convex.site";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      vpnSlug,
      rating,
      title,
      content,
      authorName,
      authorEmail,
      usageType,
      usagePeriod,
      userPros = [],
      userCons = [],
      locale = "en",
    } = body;

    // Validation
    if (
      !vpnSlug ||
      !rating ||
      !title ||
      !content ||
      !authorName ||
      !authorEmail
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Get request metadata
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ipAddress =
      forwardedFor?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip")?.trim() ||
      "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    const res = await fetch(`${SITES_LEADS_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site: "zerotovpn",
        subjectSlug: vpnSlug,
        rating,
        title: String(title).slice(0, 100),
        content: String(content).slice(0, 2000),
        authorName: String(authorName).slice(0, 50),
        authorEmail: String(authorEmail).toLowerCase(),
        usageType: usageType || undefined,
        usagePeriod: usagePeriod || undefined,
        pros: Array.isArray(userPros) ? userPros : undefined,
        cons: Array.isArray(userCons) ? userCons : undefined,
        locale,
        ip: ipAddress,
        userAgent,
      }),
    });

    if (!res.ok) {
      console.error("Review-backend gaf status", res.status);
      return NextResponse.json(
        { error: "Failed to submit review" },
        { status: 500 },
      );
    }

    const result = (await res.json()) as { id?: string };

    return NextResponse.json({
      success: true,
      message:
        "Review submitted successfully. It will be visible after moderation.",
      reviewId: result.id,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vpnSlug = searchParams.get("vpnSlug");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!vpnSlug) {
      return NextResponse.json(
        { error: "vpnSlug parameter is required" },
        { status: 400 },
      );
    }

    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${SITES_LEADS_URL}/reviews?site=zerotovpn&slug=${encodeURIComponent(vpnSlug)}&limit=${limit}`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 },
      );
    }
    const data = (await res.json()) as {
      reviews: Array<{
        id: string;
        rating: number;
        title: string | null;
        content: string | null;
        authorName: string;
        usageType: string | null;
        usagePeriod: string | null;
        pros: string[];
        cons: string[];
        locale: string | null;
        createdAt: number;
      }>;
    };

    // Zelfde veldnamen als de oude Postgres-respons zodat de UI niets merkt.
    const reviews = data.reviews.map((r) => ({
      id: r.id,
      vpn_slug: vpnSlug,
      author_name: r.authorName,
      rating: r.rating,
      title: r.title,
      content: r.content,
      usage_type: r.usageType,
      usage_period: r.usagePeriod,
      user_pros: r.pros,
      user_cons: r.cons,
      verified: false,
      featured: false,
      helpful_count: 0,
      unhelpful_count: 0,
      locale: r.locale,
      created_at: new Date(r.createdAt).toISOString(),
    }));

    return NextResponse.json({
      reviews,
      total: reviews.length,
      page,
      limit,
      totalPages: 1,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
