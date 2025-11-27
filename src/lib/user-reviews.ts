// User review types and mock data

export interface UserReview {
  id: string;
  vpnSlug: string;
  authorName: string;
  authorEmail: string;
  authorCountry?: string;
  rating: number; // 1-5
  title: string;
  content: string;
  usageType?: "streaming" | "privacy" | "gaming" | "torrenting" | "work" | "general";
  usagePeriod?: "less-than-month" | "1-6-months" | "6-12-months" | "more-than-year";
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

// Mock data for demonstration (will be replaced with database queries)
export const mockUserReviews: UserReview[] = [
  {
    id: "1",
    vpnSlug: "nordvpn",
    authorName: "Michael T.",
    authorEmail: "michael@example.com",
    authorCountry: "US",
    rating: 5,
    title: "Best VPN I've ever used!",
    content: "I've been using NordVPN for over 2 years now and it's been fantastic. The speeds are consistently fast, I can watch Netflix from any country, and the app is super easy to use. The kill switch has saved me multiple times when my connection dropped. Highly recommended!",
    usageType: "streaming",
    usagePeriod: "more-than-year",
    userPros: ["Fast speeds", "Great for streaming", "Easy to use"],
    userCons: ["Slightly expensive"],
    verified: true,
    approved: true,
    featured: true,
    helpfulCount: 45,
    unhelpfulCount: 3,
    newsletterConsent: true,
    consentDate: new Date("2024-11-15"),
    locale: "en",
    createdAt: new Date("2024-11-15"),
  },
  {
    id: "2",
    vpnSlug: "nordvpn",
    authorName: "Emma S.",
    authorEmail: "emma@example.com",
    authorCountry: "GB",
    rating: 4,
    title: "Very reliable, minor issues",
    content: "NordVPN works well for my daily browsing and privacy needs. The connection is stable and I feel secure using public WiFi. The only downside is that sometimes it takes a while to connect to certain servers. Overall, a solid choice.",
    usageType: "privacy",
    usagePeriod: "6-12-months",
    userPros: ["Reliable connection", "Good security", "No-logs policy"],
    userCons: ["Slow connection to some servers", "App can be buggy"],
    verified: true,
    approved: true,
    featured: false,
    helpfulCount: 23,
    unhelpfulCount: 2,
    newsletterConsent: false,
    locale: "en",
    createdAt: new Date("2024-10-28"),
  },
  {
    id: "3",
    vpnSlug: "nordvpn",
    authorName: "Jan de V.",
    authorEmail: "jan@example.com",
    authorCountry: "NL",
    rating: 5,
    title: "Uitstekende VPN service",
    content: "Ik gebruik NordVPN al meer dan een jaar en ben zeer tevreden. De snelheden zijn uitstekend, zelfs voor 4K streaming. De Nederlandse servers zijn snel en betrouwbaar. Zeker aan te raden!",
    usageType: "streaming",
    usagePeriod: "more-than-year",
    userPros: ["Snelle servers", "Goede Nederlandse servers", "Makkelijk te gebruiken"],
    userCons: ["Prijs kan lager"],
    verified: true,
    approved: true,
    featured: false,
    helpfulCount: 12,
    unhelpfulCount: 0,
    newsletterConsent: true,
    consentDate: new Date("2024-10-15"),
    locale: "nl",
    createdAt: new Date("2024-10-15"),
  },
  {
    id: "4",
    vpnSlug: "surfshark",
    authorName: "David L.",
    authorEmail: "david@example.com",
    authorCountry: "DE",
    rating: 5,
    title: "Best value for money!",
    content: "Surfshark offers unlimited devices which is perfect for my family. We have it running on 8 devices simultaneously without any issues. The CleanWeb feature blocks ads effectively. Amazing value at this price point.",
    usageType: "general",
    usagePeriod: "6-12-months",
    userPros: ["Unlimited devices", "Great price", "CleanWeb ad blocker"],
    userCons: ["Speeds can vary"],
    verified: true,
    approved: true,
    featured: true,
    helpfulCount: 38,
    unhelpfulCount: 4,
    newsletterConsent: false,
    locale: "en",
    createdAt: new Date("2024-11-10"),
  },
  {
    id: "5",
    vpnSlug: "surfshark",
    authorName: "Sophie M.",
    authorEmail: "sophie@example.com",
    authorCountry: "FR",
    rating: 4,
    title: "Good VPN for the price",
    content: "I've been using Surfshark for 6 months. It works well for streaming and general privacy. Sometimes the speeds drop but overall it's a good deal. The multi-hop feature is nice for extra security.",
    usageType: "streaming",
    usagePeriod: "1-6-months",
    userPros: ["Affordable", "Multi-hop feature", "Good for streaming"],
    userCons: ["Inconsistent speeds", "App needs improvement"],
    verified: true,
    approved: true,
    featured: false,
    helpfulCount: 15,
    unhelpfulCount: 1,
    newsletterConsent: true,
    consentDate: new Date("2024-10-20"),
    locale: "en",
    createdAt: new Date("2024-10-20"),
  },
  {
    id: "6",
    vpnSlug: "expressvpn",
    authorName: "James R.",
    authorEmail: "james@example.com",
    authorCountry: "AU",
    rating: 5,
    title: "Premium quality, worth every penny",
    content: "ExpressVPN is the gold standard. Yes, it's more expensive, but you get what you pay for. Blazing fast speeds, never had a single leak, and their support is incredible. I've tried cheaper options but always come back to ExpressVPN.",
    usageType: "privacy",
    usagePeriod: "more-than-year",
    userPros: ["Fastest speeds", "Excellent security", "24/7 support"],
    userCons: ["Premium pricing", "Only 8 devices"],
    verified: true,
    approved: true,
    featured: true,
    helpfulCount: 52,
    unhelpfulCount: 5,
    newsletterConsent: false,
    locale: "en",
    createdAt: new Date("2024-11-05"),
  },
  {
    id: "7",
    vpnSlug: "cyberghost",
    authorName: "Anna K.",
    authorEmail: "anna@example.com",
    authorCountry: "PL",
    rating: 4,
    title: "Great for beginners",
    content: "CyberGhost is perfect for someone new to VPNs. The interface is very user-friendly with dedicated streaming servers. I can easily find servers optimized for Netflix, Disney+, etc. Good value for the price.",
    usageType: "streaming",
    usagePeriod: "1-6-months",
    userPros: ["User-friendly", "Dedicated streaming servers", "Good price"],
    userCons: ["Speeds not the fastest", "Based in Romania"],
    verified: true,
    approved: true,
    featured: false,
    helpfulCount: 19,
    unhelpfulCount: 2,
    newsletterConsent: true,
    consentDate: new Date("2024-10-25"),
    locale: "en",
    createdAt: new Date("2024-10-25"),
  },
  {
    id: "8",
    vpnSlug: "protonvpn",
    authorName: "Marcus W.",
    authorEmail: "marcus@example.com",
    authorCountry: "CH",
    rating: 5,
    title: "Privacy-focused and trustworthy",
    content: "As someone who values privacy, ProtonVPN is the obvious choice. Swiss-based, open-source, and backed by the same team as ProtonMail. The free tier is generous and the paid plans offer great features. Secure Core is excellent for high-risk situations.",
    usageType: "privacy",
    usagePeriod: "more-than-year",
    userPros: ["Swiss privacy laws", "Open source", "Great free tier"],
    userCons: ["Fewer servers", "Slower than competitors"],
    verified: true,
    approved: true,
    featured: true,
    helpfulCount: 41,
    unhelpfulCount: 3,
    newsletterConsent: false,
    locale: "en",
    createdAt: new Date("2024-11-12"),
  },
  {
    id: "9",
    vpnSlug: "private-internet-access",
    authorName: "Chris B.",
    authorEmail: "chris@example.com",
    authorCountry: "CA",
    rating: 4,
    title: "Solid VPN with great customization",
    content: "PIA has been my go-to VPN for years. The amount of customization options is impressive - you can tweak encryption, protocols, and more. Unlimited devices is a huge plus. It's not the prettiest app but it works reliably.",
    usageType: "torrenting",
    usagePeriod: "more-than-year",
    userPros: ["Unlimited devices", "Highly customizable", "Proven no-logs"],
    userCons: ["UI could be better", "US-based company"],
    verified: true,
    approved: true,
    featured: false,
    helpfulCount: 27,
    unhelpfulCount: 4,
    newsletterConsent: true,
    consentDate: new Date("2024-10-30"),
    locale: "en",
    createdAt: new Date("2024-10-30"),
  },
];

// Helper functions to work with mock data (will be replaced with database queries)
export function getReviewsByVpnSlug(vpnSlug: string, locale?: string): UserReview[] {
  return mockUserReviews
    .filter((review) => review.vpnSlug === vpnSlug && review.approved)
    .filter((review) => !locale || review.locale === locale || review.locale === "en")
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getAverageUserRating(vpnSlug: string): { average: number; count: number } {
  const reviews = mockUserReviews.filter(
    (review) => review.vpnSlug === vpnSlug && review.approved
  );

  if (reviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
}

export function getFeaturedReviews(vpnSlug: string): UserReview[] {
  return mockUserReviews
    .filter((review) => review.vpnSlug === vpnSlug && review.approved && review.featured)
    .sort((a, b) => b.helpfulCount - a.helpfulCount);
}

// Get all newsletter subscribers from reviews (GDPR compliant - only those who opted in)
export function getNewsletterSubscribers(): Array<{ email: string; name: string; locale: string; consentDate?: Date }> {
  return mockUserReviews
    .filter((review) => review.newsletterConsent)
    .map((review) => ({
      email: review.authorEmail,
      name: review.authorName,
      locale: review.locale,
      consentDate: review.consentDate,
    }));
}

// Usage type labels
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

// Usage period labels
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
