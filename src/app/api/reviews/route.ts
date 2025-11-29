import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { sql } from "@/lib/neon";

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
      newsletterConsent = false,
    } = body;

    // Validation
    if (!vpnSlug || !rating || !title || !content || !authorName || !authorEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get request metadata
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") ||
                      headersList.get("x-real-ip") ||
                      "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    // Prepare data
    const cleanPros = userPros.slice(0, 5).map((p: string) => p.slice(0, 100));
    const cleanCons = userCons.slice(0, 5).map((c: string) => c.slice(0, 100));

    // Create review in database using Neon
    const result = await sql`
      INSERT INTO "UserReview" (
        id, vpn_slug, author_name, author_email, rating, title, content,
        usage_type, usage_period, user_pros, user_cons, locale,
        ip_address, user_agent, newsletter_consent, consent_date,
        verified, approved, helpful_count, unhelpful_count,
        created_at, updated_at
      ) VALUES (
        gen_random_uuid()::text,
        ${vpnSlug},
        ${authorName.slice(0, 50)},
        ${authorEmail.toLowerCase()},
        ${rating},
        ${title.slice(0, 100)},
        ${content.slice(0, 2000)},
        ${usageType || null},
        ${usagePeriod || null},
        ${cleanPros},
        ${cleanCons},
        ${locale},
        ${ipAddress},
        ${userAgent},
        ${newsletterConsent},
        ${newsletterConsent ? new Date() : null},
        false,
        false,
        0,
        0,
        NOW(),
        NOW()
      )
      RETURNING id
    `;

    console.log("New review submitted:", {
      id: result[0]?.id,
      vpnSlug,
      rating,
      authorName,
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully. It will be visible after moderation.",
      reviewId: result[0]?.id,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vpnSlug = searchParams.get("vpnSlug");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Public access - only return approved reviews
    if (!vpnSlug) {
      return NextResponse.json(
        { error: "vpnSlug parameter is required" },
        { status: 400 }
      );
    }

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    // Fetch approved reviews with pagination using Neon
    const reviews = await sql`
      SELECT id, vpn_slug, author_name, rating, title, content,
             usage_type, usage_period, user_pros, user_cons,
             verified, featured, helpful_count, unhelpful_count,
             locale, created_at
      FROM "UserReview"
      WHERE vpn_slug = ${vpnSlug} AND approved = true
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const countResult = await sql`
      SELECT COUNT(*) as total FROM "UserReview"
      WHERE vpn_slug = ${vpnSlug} AND approved = true
    `;

    const total = Number(countResult[0]?.total || 0);

    return NextResponse.json({
      reviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
