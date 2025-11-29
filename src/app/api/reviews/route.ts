import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

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

    // Create review in database
    const review = await prisma.userReview.create({
      data: {
        vpnSlug,
        authorName: authorName.slice(0, 50),
        authorEmail: authorEmail.toLowerCase(),
        rating,
        title: title.slice(0, 100),
        content: content.slice(0, 2000),
        usageType: usageType || null,
        usagePeriod: usagePeriod || null,
        userPros: userPros.slice(0, 5).map((p: string) => p.slice(0, 100)),
        userCons: userCons.slice(0, 5).map((c: string) => c.slice(0, 100)),
        locale,
        ipAddress,
        userAgent,
        newsletterConsent,
        consentDate: newsletterConsent ? new Date() : null,
        verified: false,
        approved: false, // Requires moderation
      },
    });

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

    const skip = (page - 1) * limit;

    // Fetch approved reviews with pagination
    const [reviews, total] = await Promise.all([
      prisma.userReview.findMany({
        where: {
          vpnSlug,
          approved: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
        select: {
          id: true,
          vpnSlug: true,
          authorName: true,
          rating: true,
          title: true,
          content: true,
          usageType: true,
          usagePeriod: true,
          userPros: true,
          userCons: true,
          verified: true,
          featured: true,
          helpfulCount: true,
          unhelpfulCount: true,
          locale: true,
          createdAt: true,
        },
      }),
      prisma.userReview.count({
        where: {
          vpnSlug,
          approved: true,
        },
      }),
    ]);

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

