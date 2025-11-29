import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";

// Helper function to validate admin key
function validateAdminKey(request: NextRequest): boolean {
  const adminKey = request.headers.get("x-admin-key");
  return adminKey === process.env.ADMIN_KEY;
}

export async function GET(request: NextRequest) {
  try {
    // Validate admin authentication
    if (!validateAdminKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const vpnSlug = searchParams.get("vpnSlug");
    const approved = searchParams.get("approved"); // "true", "false", or null for all
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    // Build query based on filters
    let reviews;
    let countResult;

    if (vpnSlug && approved !== null) {
      const isApproved = approved === "true";
      reviews = await sql`
        SELECT * FROM "UserReview"
        WHERE vpn_slug = ${vpnSlug} AND approved = ${isApproved}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as total FROM "UserReview"
        WHERE vpn_slug = ${vpnSlug} AND approved = ${isApproved}
      `;
    } else if (vpnSlug) {
      reviews = await sql`
        SELECT * FROM "UserReview"
        WHERE vpn_slug = ${vpnSlug}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as total FROM "UserReview"
        WHERE vpn_slug = ${vpnSlug}
      `;
    } else if (approved !== null) {
      const isApproved = approved === "true";
      reviews = await sql`
        SELECT * FROM "UserReview"
        WHERE approved = ${isApproved}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as total FROM "UserReview"
        WHERE approved = ${isApproved}
      `;
    } else {
      reviews = await sql`
        SELECT * FROM "UserReview"
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      countResult = await sql`
        SELECT COUNT(*) as total FROM "UserReview"
      `;
    }

    const total = Number(countResult[0]?.total || 0);

    return NextResponse.json({
      reviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching admin reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
