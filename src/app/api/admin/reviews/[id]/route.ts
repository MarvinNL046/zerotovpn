import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/neon";

// Helper function to validate admin key
function validateAdminKey(request: NextRequest): boolean {
  const adminKey = request.headers.get("x-admin-key");
  return adminKey === process.env.ADMIN_KEY;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate admin authentication
    if (!validateAdminKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const reviews = await sql`
      SELECT * FROM "UserReview" WHERE id = ${id}
    `;

    if (reviews.length === 0) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ review: reviews[0] });
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate admin authentication
    if (!validateAdminKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Handle specific update operations
    if (body.approved !== undefined) {
      await sql`
        UPDATE "UserReview"
        SET approved = ${body.approved}, updated_at = NOW()
        WHERE id = ${id}
      `;
    }

    if (body.featured !== undefined) {
      await sql`
        UPDATE "UserReview"
        SET featured = ${body.featured}, updated_at = NOW()
        WHERE id = ${id}
      `;
    }

    if (body.verified !== undefined) {
      await sql`
        UPDATE "UserReview"
        SET verified = ${body.verified}, updated_at = NOW()
        WHERE id = ${id}
      `;
    }

    // Fetch updated review
    const reviews = await sql`
      SELECT * FROM "UserReview" WHERE id = ${id}
    `;

    if (reviews.length === 0) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Review updated successfully",
      review: reviews[0],
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate admin authentication
    if (!validateAdminKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const result = await sql`
      DELETE FROM "UserReview" WHERE id = ${id} RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
