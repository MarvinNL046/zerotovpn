import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// In-memory storage for demo (replace with database in production)
// This simulates what would be stored in the UserReview table
const pendingReviews: Array<{
  id: string;
  vpnSlug: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  content: string;
  usageType?: string;
  usagePeriod?: string;
  userPros: string[];
  userCons: string[];
  locale: string;
  ipAddress?: string;
  userAgent?: string;
  verified: boolean;
  approved: boolean;
  createdAt: Date;
}> = [];

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

    // Create review object (in production, this would be saved to database)
    const review = {
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      vpnSlug,
      authorName: authorName.slice(0, 50),
      authorEmail: authorEmail.toLowerCase(),
      rating,
      title: title.slice(0, 100),
      content: content.slice(0, 2000),
      usageType,
      usagePeriod,
      userPros: userPros.slice(0, 5).map((p: string) => p.slice(0, 100)),
      userCons: userCons.slice(0, 5).map((c: string) => c.slice(0, 100)),
      locale,
      ipAddress,
      userAgent,
      verified: false,
      approved: false, // Requires moderation
      createdAt: new Date(),
    };

    // In production: await prisma.userReview.create({ data: review })
    pendingReviews.push(review);

    console.log("New review submitted:", {
      id: review.id,
      vpnSlug: review.vpnSlug,
      rating: review.rating,
      authorName: review.authorName,
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully. It will be visible after moderation.",
      reviewId: review.id,
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
    const status = searchParams.get("status"); // all, pending, approved
    const adminKey = searchParams.get("adminKey");

    // For admin access (simple key check - in production use proper auth)
    const isAdmin = adminKey === process.env.ADMIN_KEY;

    if (isAdmin) {
      // Return all reviews for admin
      let reviews = pendingReviews;

      if (vpnSlug) {
        reviews = reviews.filter((r) => r.vpnSlug === vpnSlug);
      }

      if (status === "pending") {
        reviews = reviews.filter((r) => !r.approved);
      } else if (status === "approved") {
        reviews = reviews.filter((r) => r.approved);
      }

      return NextResponse.json({
        reviews,
        total: reviews.length,
      });
    }

    // Public access - only return approved reviews
    if (!vpnSlug) {
      return NextResponse.json(
        { error: "vpnSlug parameter is required" },
        { status: 400 }
      );
    }

    const approvedReviews = pendingReviews.filter(
      (r) => r.vpnSlug === vpnSlug && r.approved
    );

    return NextResponse.json({
      reviews: approvedReviews,
      total: approvedReviews.length,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// For moderation actions (approve/reject)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, action, adminKey } = body;

    // Simple admin key check (in production use proper auth)
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const reviewIndex = pendingReviews.findIndex((r) => r.id === reviewId);

    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      pendingReviews[reviewIndex].approved = true;
      return NextResponse.json({
        success: true,
        message: "Review approved",
      });
    } else if (action === "reject") {
      // Remove the review
      pendingReviews.splice(reviewIndex, 1);
      return NextResponse.json({
        success: true,
        message: "Review rejected and removed",
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error moderating review:", error);
    return NextResponse.json(
      { error: "Failed to moderate review" },
      { status: 500 }
    );
  }
}
