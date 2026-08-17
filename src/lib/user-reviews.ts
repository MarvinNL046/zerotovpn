export interface UserReview {
  id: string;
  vpnSlug: string;
  authorName: string;
  authorEmail: string;
  authorCountry?: string;
  rating: number;
  title: string;
  content: string;
  usageType?:
    "streaming" | "privacy" | "gaming" | "torrenting" | "work" | "general";
  usagePeriod?:
    "less-than-month" | "1-6-months" | "6-12-months" | "more-than-year";
  userPros: string[];
  userCons: string[];
  verified: boolean;
  approved: boolean;
  featured: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  newsletterConsent: boolean;
  consentDate?: Date;
  locale: string;
  createdAt: Date;
}

export interface ReviewFormData {
  vpnSlug: string;
  authorName: string;
  authorEmail: string;
  authorCountry?: string;
  rating: number;
  title: string;
  content: string;
  usageType?: string;
  usagePeriod?: string;
  userPros: string[];
  userCons: string[];
  locale: string;
  newsletterConsent: boolean;
}

/**
 * Server-rendered review details deliberately start empty. Submitted reviews go
 * through `/api/reviews` and moderation, but this module has no trusted read
 * integration yet. Returning an honest empty state prevents demo fixtures from
 * appearing as real or verified visitor testimony.
 */
export function getReviewsByVpnSlug(
  vpnSlug: string,
  locale?: string,
): UserReview[] {
  void vpnSlug;
  void locale;
  return [];
}

export function getAverageUserRating(vpnSlug: string): {
  average: number;
  count: number;
} {
  void vpnSlug;
  return { average: 0, count: 0 };
}

export function getFeaturedReviews(vpnSlug: string): UserReview[] {
  void vpnSlug;
  return [];
}

export function getNewsletterSubscribers(): Array<{
  email: string;
  name: string;
  locale: string;
  consentDate?: Date;
}> {
  return [];
}

export const usageTypeLabels: Record<string, Record<string, string>> = {
  en: {
    streaming: "Streaming",
    privacy: "Privacy & Security",
    gaming: "Gaming",
    torrenting: "Torrenting",
    work: "Remote Work",
    general: "General Use",
  },
  nl: {
    streaming: "Streaming",
    privacy: "Privacy & Beveiliging",
    gaming: "Gaming",
    torrenting: "Torrenting",
    work: "Thuiswerken",
    general: "Algemeen gebruik",
  },
};

export const usagePeriodLabels: Record<string, Record<string, string>> = {
  en: {
    "less-than-month": "Less than a month",
    "1-6-months": "1-6 months",
    "6-12-months": "6-12 months",
    "more-than-year": "More than a year",
  },
  nl: {
    "less-than-month": "Minder dan een maand",
    "1-6-months": "1-6 maanden",
    "6-12-months": "6-12 maanden",
    "more-than-year": "Meer dan een jaar",
  },
};
