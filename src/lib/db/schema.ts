import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// VPN Providers - core data for comparisons and reviews
export const vpnProviders = pgTable("VpnProvider", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  screenshot: text("screenshot"),
  thumbnailImage: text("thumbnailImage"),
  cardImage: text("cardImage"),
  ogImage: text("ogImage"),
  website: text("website").notNull(),
  affiliateUrl: text("affiliateUrl").notNull(),

  // Pricing
  priceMonthly: decimal("priceMonthly", { precision: 10, scale: 2 }).notNull(),
  priceYearly: decimal("priceYearly", { precision: 10, scale: 2 }).notNull(),
  priceTwoYear: decimal("priceTwoYear", { precision: 10, scale: 2 }),
  moneyBackDays: integer("moneyBackDays").default(30).notNull(),
  freeTier: boolean("freeTier").default(false).notNull(),

  // Features
  servers: integer("servers").notNull(),
  countries: integer("countries").notNull(),
  maxDevices: integer("maxDevices").notNull(),
  speedScore: integer("speedScore").notNull(),
  securityScore: integer("securityScore").notNull(),
  streamingScore: integer("streamingScore").notNull(),

  // Protocols & Security
  protocols: text("protocols").array(),
  encryption: text("encryption").default("AES-256").notNull(),
  killSwitch: boolean("killSwitch").default(true).notNull(),
  noLogs: boolean("noLogs").default(true).notNull(),

  // Streaming
  netflixSupport: boolean("netflixSupport").default(false).notNull(),
  torrentSupport: boolean("torrentSupport").default(false).notNull(),

  // Ratings
  overallRating: decimal("overallRating", { precision: 2, scale: 1 }).notNull(),
  editorChoice: boolean("editorChoice").default(false).notNull(),

  // Content
  shortDescription: text("shortDescription"),
  pros: text("pros").array(),
  cons: text("cons").array(),

  // Meta
  featured: boolean("featured").default(false).notNull(),
  sortOrder: integer("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Reviews - multilingual review content
export const reviews = pgTable(
  "Review",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    vpnId: text("vpnId")
      .notNull()
      .references(() => vpnProviders.id, { onDelete: "cascade" }),

    language: text("language").default("en").notNull(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    verdict: text("verdict"),

    // SEO
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),

    published: boolean("published").default(false).notNull(),
    publishedAt: timestamp("publishedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    unique().on(table.vpnId, table.language),
    index("Review_language_published_idx").on(table.language, table.published),
  ]
);

// Click tracking for affiliate links
export const clicks = pgTable(
  "Click",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    vpnId: text("vpnId")
      .notNull()
      .references(() => vpnProviders.id, { onDelete: "cascade" }),

    country: text("country"),
    city: text("city"),
    referrer: text("referrer"),
    userAgent: text("userAgent"),
    page: text("page"),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("Click_vpnId_createdAt_idx").on(table.vpnId, table.createdAt),
    index("Click_country_idx").on(table.country),
  ]
);

// User reviews from visitors
export const userReviews = pgTable(
  "UserReview",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    vpnSlug: text("vpnSlug").notNull(),

    // Reviewer info
    authorName: text("authorName").notNull(),
    authorEmail: text("authorEmail").notNull(),
    authorCountry: text("authorCountry"),

    // Review content
    rating: integer("rating").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),

    // Usage context
    usageType: text("usageType"),
    usagePeriod: text("usagePeriod"),

    // Pros and cons
    userPros: text("userPros").array(),
    userCons: text("userCons").array(),

    // Verification & moderation
    verified: boolean("verified").default(false).notNull(),
    approved: boolean("approved").default(false).notNull(),
    featured: boolean("featured").default(false).notNull(),

    // Helpfulness voting
    helpfulCount: integer("helpfulCount").default(0).notNull(),
    unhelpfulCount: integer("unhelpfulCount").default(0).notNull(),

    // Newsletter consent (GDPR compliant)
    newsletterConsent: boolean("newsletterConsent").default(false).notNull(),
    consentDate: timestamp("consentDate"),

    // Meta
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    locale: text("locale").default("en").notNull(),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    index("UserReview_vpnSlug_approved_idx").on(table.vpnSlug, table.approved),
    index("UserReview_newsletter_idx").on(table.newsletterConsent, table.authorEmail),
    index("UserReview_vpnSlug_rating_idx").on(table.vpnSlug, table.rating),
    index("UserReview_createdAt_idx").on(table.createdAt),
  ]
);

// Email subscribers
export const subscribers = pgTable(
  "Subscriber",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull().unique(),
    language: text("language").default("en").notNull(),
    source: text("source"),

    confirmed: boolean("confirmed").default(false).notNull(),
    confirmedAt: timestamp("confirmedAt"),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [index("Subscriber_language_idx").on(table.language)]
);

// Static pages content
export const pages = pgTable(
  "Page",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull(),
    language: text("language").default("en").notNull(),

    title: text("title").notNull(),
    content: text("content").notNull(),

    // SEO
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),

    published: boolean("published").default(false).notNull(),
    publishedAt: timestamp("publishedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    unique().on(table.slug, table.language),
    index("Page_language_published_idx").on(table.language, table.published),
  ]
);

// Relations
export const vpnProviderRelations = relations(vpnProviders, ({ many }) => ({
  reviews: many(reviews),
  clicks: many(clicks),
}));

export const reviewRelations = relations(reviews, ({ one }) => ({
  vpn: one(vpnProviders, {
    fields: [reviews.vpnId],
    references: [vpnProviders.id],
  }),
}));

export const clickRelations = relations(clicks, ({ one }) => ({
  vpn: one(vpnProviders, {
    fields: [clicks.vpnId],
    references: [vpnProviders.id],
  }),
}));

// Coupons - discount codes for VPN deals
export const coupons = pgTable(
  "Coupon",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    vpnSlug: text("vpnSlug").notNull(),
    code: text("code").notNull(),
    discount: text("discount").notNull(), // e.g., "83% OFF" or "3 months free"
    description: text("description"),
    expiresAt: timestamp("expiresAt"),
    isVerified: boolean("isVerified").default(true).notNull(),
    clickCount: integer("clickCount").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("Coupon_vpnSlug_idx").on(table.vpnSlug),
    index("Coupon_expiresAt_idx").on(table.expiresAt),
  ]
);

// Pipeline: Scrape job tracking
export const scrapeJobs = pgTable(
  "ScrapeJob",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    type: text("type").notNull(), // "vpn-data" | "pricing" | "news"
    status: text("status").notNull().default("pending"), // "pending" | "running" | "completed" | "failed"
    source: text("source").notNull(), // URL that was scraped
    vpnSlug: text("vpnSlug"),
    result: text("result"), // JSON string with scraped data
    error: text("error"),
    startedAt: timestamp("startedAt").notNull(),
    completedAt: timestamp("completedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("ScrapeJob_type_status_idx").on(table.type, table.status),
    index("ScrapeJob_createdAt_idx").on(table.createdAt),
  ]
);

// Pipeline: Dynamic blog posts
export const blogPosts = pgTable(
  "BlogPost",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull(),
    language: text("language").default("en").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(), // Full HTML/markdown content
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),
    category: text("category").notNull(), // "news" | "guide" | "comparison" | "deal"
    tags: text("tags").array(),
    aiModel: text("aiModel"), // "claude-haiku" | "gpt-5-nano"
    aiPrompt: text("aiPrompt"),
    sourceData: text("sourceData"), // JSON - scrape data used as input
    published: boolean("published").default(false).notNull(),
    publishedAt: timestamp("publishedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    unique().on(table.slug, table.language),
    index("BlogPost_language_published_category_idx").on(
      table.language,
      table.published,
      table.category
    ),
  ]
);

// Pipeline: AI content generation queue
export const contentQueue = pgTable(
  "ContentQueue",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    type: text("type").notNull(), // "blog-post" | "vpn-update" | "comparison"
    status: text("status").notNull().default("pending"), // "pending" | "processing" | "completed" | "failed"
    priority: integer("priority").default(0).notNull(),
    input: text("input").notNull(), // JSON - topic, keywords, scrape data
    output: text("output"), // JSON result
    aiModel: text("aiModel").notNull(), // "claude-haiku" | "gpt-5-nano"
    error: text("error"),
    attempts: integer("attempts").default(0).notNull(),
    maxAttempts: integer("maxAttempts").default(3).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    processedAt: timestamp("processedAt"),
  },
  (table) => [
    index("ContentQueue_status_priority_idx").on(table.status, table.priority),
  ]
);

// Pipeline: Cached Short.io affiliate link data
export const affiliateLinks = pgTable(
  "AffiliateLink",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    shortId: text("shortId").notNull(),
    path: text("path").notNull(), // e.g. "nordvpn"
    originalUrl: text("originalUrl").notNull(),
    vpnSlug: text("vpnSlug"),
    clicks: integer("clicks").default(0).notNull(),
    lastSyncedAt: timestamp("lastSyncedAt").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("AffiliateLink_path_idx").on(table.path),
    index("AffiliateLink_vpnSlug_idx").on(table.vpnSlug),
  ]
);

// Type exports
export type VpnProvider = typeof vpnProviders.$inferSelect;
export type NewVpnProvider = typeof vpnProviders.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type Click = typeof clicks.$inferSelect;
export type NewClick = typeof clicks.$inferInsert;
export type UserReview = typeof userReviews.$inferSelect;
export type NewUserReview = typeof userReviews.$inferInsert;
export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;
export type Coupon = typeof coupons.$inferSelect;
export type NewCoupon = typeof coupons.$inferInsert;
export type ScrapeJob = typeof scrapeJobs.$inferSelect;
export type NewScrapeJob = typeof scrapeJobs.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type ContentQueueItem = typeof contentQueue.$inferSelect;
export type NewContentQueueItem = typeof contentQueue.$inferInsert;
export type AffiliateLink = typeof affiliateLinks.$inferSelect;
export type NewAffiliateLink = typeof affiliateLinks.$inferInsert;
