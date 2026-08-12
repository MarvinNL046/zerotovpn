/**
 * The minimum planning contract for a high-intent editorial page.
 *
 * Keeping this data next to the page makes the editorial decision (query,
 * intent, cluster, evidence and commercial boundary) reviewable before copy
 * or CTAs are changed. It is deliberately small so it can be adopted by
 * existing pages without turning content into a CMS dependency.
 */
export type EditorialIntent = "commercial" | "informational" | "transactional" | "navigational";

export type EditorialAffiliateContext = "vpn-selection" | "none" | "owned-email";

export type EditorialSchemaType = "Article" | "CollectionPage" | "FAQPage" | "HowTo" | "WebPage";

export interface EditorialContentBrief {
  primaryKeyword: string;
  intent: EditorialIntent;
  cluster: string;
  lastReviewedAt: string;
  evidence: readonly string[];
  affiliateContext: EditorialAffiliateContext;
  schemaType: EditorialSchemaType;
}

/** A small runtime guard for scripts and future CMS adapters. */
export function isEditorialContentBrief(value: unknown): value is EditorialContentBrief {
  if (!value || typeof value !== "object") return false;
  const brief = value as Partial<EditorialContentBrief>;
  return Boolean(
    typeof brief.primaryKeyword === "string" && brief.primaryKeyword.trim() &&
      typeof brief.intent === "string" &&
      typeof brief.cluster === "string" && brief.cluster.trim() &&
      typeof brief.lastReviewedAt === "string" &&
      Array.isArray(brief.evidence) && brief.evidence.every((item) => typeof item === "string") &&
      typeof brief.affiliateContext === "string" &&
      typeof brief.schemaType === "string",
  );
}
