"use server";

import { sql } from "@/lib/neon";
import { revalidatePath } from "next/cache";

// Types
interface UserReview {
  id: string;
  vpn_slug: string;
  author_name: string;
  author_email: string;
  rating: number;
  title: string;
  content: string;
  usage_type: string | null;
  usage_period: string | null;
  user_pros: string[];
  user_cons: string[];
  approved: boolean;
  featured: boolean;
  helpful_count: number;
  unhelpful_count: number;
  created_at: Date;
}

// ==================== USER REVIEWS ====================

// Get approved reviews for a VPN
export async function getApprovedReviews(vpnSlug: string, page = 1, limit = 10): Promise<{
  reviews: UserReview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  const offset = (page - 1) * limit;

  const reviews = await sql`
    SELECT id, vpn_slug, author_name, rating, title, content,
           usage_type, usage_period, user_pros, user_cons,
           featured, helpful_count, unhelpful_count, created_at
    FROM "UserReview"
    WHERE vpn_slug = ${vpnSlug} AND approved = true
    ORDER BY featured DESC, created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  ` as UserReview[];

  const countResult = await sql`
    SELECT COUNT(*) as total FROM "UserReview"
    WHERE vpn_slug = ${vpnSlug} AND approved = true
  ` as { total: string | number }[];

  const total = Number(countResult[0]?.total || 0);

  return {
    reviews,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Submit a new user review
export async function submitReview(formData: FormData): Promise<{ success: boolean; reviewId?: string; error?: string }> {
  const vpnSlug = formData.get("vpnSlug") as string;
  const authorName = formData.get("authorName") as string;
  const authorEmail = formData.get("authorEmail") as string;
  const rating = Number(formData.get("rating"));
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const usageType = formData.get("usageType") as string | null;
  const usagePeriod = formData.get("usagePeriod") as string | null;
  const userPros = formData.getAll("userPros") as string[];
  const userCons = formData.getAll("userCons") as string[];
  const newsletterConsent = formData.get("newsletterConsent") === "true";
  const locale = formData.get("locale") as string || "en";

  // Validation
  if (!vpnSlug || !authorName || !authorEmail || !rating || !title || !content) {
    return { success: false, error: "Missing required fields" };
  }

  if (rating < 1 || rating > 5) {
    return { success: false, error: "Rating must be between 1 and 5" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(authorEmail)) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    const result = await sql`
      INSERT INTO "UserReview" (
        id, vpn_slug, author_name, author_email, rating, title, content,
        usage_type, usage_period, user_pros, user_cons,
        newsletter_consent, consent_date, locale, created_at, updated_at
      ) VALUES (
        gen_random_uuid()::text,
        ${vpnSlug},
        ${authorName},
        ${authorEmail},
        ${rating},
        ${title},
        ${content},
        ${usageType},
        ${usagePeriod},
        ${userPros},
        ${userCons},
        ${newsletterConsent},
        ${newsletterConsent ? new Date() : null},
        ${locale},
        NOW(),
        NOW()
      )
      RETURNING id
    `;

    revalidatePath(`/reviews/${vpnSlug}`);

    return { success: true, reviewId: result[0]?.id };
  } catch (error) {
    console.error("Error submitting review:", error);
    return { success: false, error: "Failed to submit review" };
  }
}

// Vote on a review (helpful/unhelpful)
export async function voteOnReview(reviewId: string, isHelpful: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    if (isHelpful) {
      await sql`
        UPDATE "UserReview"
        SET helpful_count = helpful_count + 1
        WHERE id = ${reviewId}
      `;
    } else {
      await sql`
        UPDATE "UserReview"
        SET unhelpful_count = unhelpful_count + 1
        WHERE id = ${reviewId}
      `;
    }
    return { success: true };
  } catch (error) {
    console.error("Error voting on review:", error);
    return { success: false, error: "Failed to record vote" };
  }
}

// ==================== SUBSCRIBERS ====================

// Subscribe to newsletter
export async function subscribeToNewsletter(formData: FormData): Promise<{ success: boolean; message?: string; error?: string }> {
  const email = formData.get("email") as string;
  const language = formData.get("language") as string || "en";
  const source = formData.get("source") as string || "homepage";

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    // Check for existing subscriber
    const existing = await sql`
      SELECT id FROM "Subscriber" WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return { success: false, error: "Email already subscribed" };
    }

    await sql`
      INSERT INTO "Subscriber" (id, email, language, source, created_at)
      VALUES (gen_random_uuid()::text, ${email}, ${language}, ${source}, NOW())
    `;

    return { success: true, message: "Successfully subscribed!" };
  } catch (error) {
    console.error("Error subscribing:", error);
    return { success: false, error: "Failed to subscribe" };
  }
}

// ==================== CLICK TRACKING ====================

// Track affiliate click
export async function trackClick(
  vpnSlug: string,
  page: string,
  country?: string,
  referrer?: string
): Promise<{ success: boolean }> {
  try {
    // First get the VPN provider ID
    const vpn = await sql`
      SELECT id FROM "VpnProvider" WHERE slug = ${vpnSlug}
    `;

    if (vpn.length === 0) {
      // VPN not in database yet, skip tracking
      return { success: true };
    }

    await sql`
      INSERT INTO "Click" (id, vpn_id, page, country, referrer, created_at)
      VALUES (gen_random_uuid()::text, ${vpn[0].id}, ${page}, ${country}, ${referrer}, NOW())
    `;

    return { success: true };
  } catch (error) {
    console.error("Error tracking click:", error);
    return { success: false };
  }
}

// ==================== ADMIN ACTIONS ====================

// Get all reviews for admin (including unapproved)
export async function getAdminReviews(
  filters: {
    approved?: boolean;
    vpnSlug?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<{
  reviews: UserReview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  const { approved, vpnSlug, page = 1, limit = 20 } = filters;
  const offset = (page - 1) * limit;

  const reviews = await sql`
    SELECT * FROM "UserReview"
    ${approved !== undefined ? sql`WHERE approved = ${approved}` : sql``}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  ` as UserReview[];

  const countResult = await sql`
    SELECT COUNT(*) as total FROM "UserReview"
    ${approved !== undefined ? sql`WHERE approved = ${approved}` : sql``}
  ` as { total: string | number }[];

  const total = Number(countResult[0]?.total || 0);

  return {
    reviews,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Approve or reject a review
export async function moderateReview(reviewId: string, approved: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    await sql`
      UPDATE "UserReview"
      SET approved = ${approved}, updated_at = NOW()
      WHERE id = ${reviewId}
    `;

    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (error) {
    console.error("Error moderating review:", error);
    return { success: false, error: "Failed to moderate review" };
  }
}

// Delete a review
export async function deleteReview(reviewId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await sql`DELETE FROM "UserReview" WHERE id = ${reviewId}`;
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (error) {
    console.error("Error deleting review:", error);
    return { success: false, error: "Failed to delete review" };
  }
}

// Toggle featured status
export async function toggleFeatured(reviewId: string, featured: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    await sql`
      UPDATE "UserReview"
      SET featured = ${featured}, updated_at = NOW()
      WHERE id = ${reviewId}
    `;

    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (error) {
    console.error("Error toggling featured:", error);
    return { success: false, error: "Failed to update featured status" };
  }
}

// Get dashboard stats
export async function getDashboardStats(): Promise<{
  reviews: { total: number; pending: number; thisWeek: number };
  subscribers: { total: number; thisWeek: number };
  clicks: { total: number; thisWeek: number };
}> {
  // Return empty stats during build time
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    return {
      reviews: { total: 0, pending: 0, thisWeek: 0 },
      subscribers: { total: 0, thisWeek: 0 },
      clicks: { total: 0, thisWeek: 0 },
    };
  }

  try {
    const [reviewStats, subscriberStats, clickStats] = await Promise.all([
      sql`
        SELECT
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE approved = false) as pending,
          COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as this_week
        FROM "UserReview"
      `,
      sql`
        SELECT
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as this_week
        FROM "Subscriber"
      `,
      sql`
        SELECT
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as this_week
        FROM "Click"
      `,
    ]);

    return {
      reviews: {
        total: Number(reviewStats[0]?.total || 0),
        pending: Number(reviewStats[0]?.pending || 0),
        thisWeek: Number(reviewStats[0]?.this_week || 0),
      },
      subscribers: {
        total: Number(subscriberStats[0]?.total || 0),
        thisWeek: Number(subscriberStats[0]?.this_week || 0),
      },
      clicks: {
        total: Number(clickStats[0]?.total || 0),
        thisWeek: Number(clickStats[0]?.this_week || 0),
      },
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    return {
      reviews: { total: 0, pending: 0, thisWeek: 0 },
      subscribers: { total: 0, thisWeek: 0 },
      clicks: { total: 0, thisWeek: 0 },
    };
  }
}
