export const REVIEW_DETAIL_STATUS = Object.freeze({
  PASS: "pass",
  FAIL: "fail",
  MANUAL: "manual",
  NA: "na",
  BLOCKED: "blocked",
});

export const REVIEW_DETAIL_TARGETS = Object.freeze({
  primaryKeyword: "nordvpn review",
  titleMin: 50,
  titleMax: 60,
  descriptionMin: 150,
  descriptionMax: 160,
  slugMax: 60,
  wordCountMin: 4_121,
  wordCountMax: 6_182,
  faqMin: 4,
  faqMax: 8,
  imageMaxBytes: 200_000,
  ogWidth: 1_200,
  ogHeight: 630,
  twitterWidth: 1_200,
  twitterHeight: 600,
});

export const REVIEW_DETAIL_PAA = Object.freeze({
  nl: [
    "Is NordVPN te vertrouwen?",
    "Waarom is VPN onzin?",
    "Hoe duur is NordVPN per maand?",
    "Wat is de meest betrouwbare VPN?",
    "Hoe betrouwbaar is NordVPN?",
    "Wat is het voordeel van NordVPN?",
    "Wat zijn de nadelen van NordVPN?",
    "Is NordVPN echt veilig?",
    "Is NordVPN legaal in Nederland?",
  ],
  en: [
    "Is NordVPN still trustworthy?",
    "Is it worth it to use NordVPN?",
    "Why is Netflix blocking NordVPN?",
    "What are the disadvantages of NordVPN?",
    "Can FBI track NordVPN?",
    "Which VPN is better than NordVPN?",
  ],
});

const item = (id, category, label, mode = "auto", note = "") => ({
  id,
  category,
  label,
  mode,
  note,
});

// This is intentionally a direct, one-to-one transcription of the canonical
// Obsidian checklist. Review-page exceptions are explicit instead of silently
// dropping checklist rows.
export const REVIEW_DETAIL_CONTRACT = Object.freeze([
  item("1.1", "Head & metadata", "Title tag is 50-60 characters with the primary keyword near the start"),
  item("1.2", "Head & metadata", "Meta description is 150-160 characters with keyword, benefit and soft CTA"),
  item("1.3", "Head & metadata", "Canonical URL is set"),
  item("1.4", "Head & metadata", "Complete Open Graph metadata and a 1200x630 image are present"),
  item("1.5", "Head & metadata", "Complete summary_large_image Twitter Card metadata is present"),
  item("1.6", "Head & metadata", "HTML language attribute is set"),
  item("1.7", "Head & metadata", "Viewport metadata is present"),
  item("1.8", "Head & metadata", "Favicon and apple-touch-icon are present"),
  item("1.9", "Head & metadata", "UTF-8 charset metadata is present"),

  item("2.1", "URL structure", "Slug is shorter than 60 characters"),
  item("2.2", "URL structure", "Primary keyword is represented in the slug"),
  item("2.3", "URL structure", "Slug uses hyphens and no underscores"),
  item("2.4", "URL structure", "Slug is lowercase"),
  item("2.5", "URL structure", "Slug contains no unnecessary stop words"),
  item("2.6", "URL structure", "URL follows the logical /locale/reviews/slug hierarchy"),

  item("3.1", "Headings", "Exactly one H1 contains the primary keyword"),
  item("3.2", "Headings", "Heading levels follow a logical H2 to H3 hierarchy"),
  item("3.3", "Headings", "H2s cover supporting keywords and researched questions"),
  item("3.4", "Headings", "Headings avoid keyword stuffing"),

  item("4.1", "Copy & body", "Primary keyword appears in the first 100 words"),
  item("4.2", "Copy & body", "Opening paragraph directly answers the review query"),
  item("4.3", "Copy & body", "Article length is within 20% of the measured top-three SERP average"),
  item("4.4", "Copy & body", "Paragraphs are predominantly one to four sentences"),
  item("4.5", "Copy & body", "Reading level is appropriate", "manual", "Language-specific reading-level judgement is editorial, not safely inferred from a generic formula."),
  item("4.6", "Copy & body", "Active voice is preferred", "manual", "Requires an editorial language review."),
  item("4.7", "Copy & body", "Bold emphasis is present but used sparingly"),
  item("4.8", "Copy & body", "Useful bullet or numbered lists are present"),

  item("5.1", "FAQ", "Four to eight visible questions are sourced from current PAA research"),
  item("5.2", "FAQ", "FAQ answers contain two to four direct sentences"),
  item("5.3", "FAQ", "Visible FAQ content has matching FAQPage JSON-LD"),

  item("6.1", "Images", "Content images have descriptive alt text"),
  item("6.2", "Images", "Content image filenames are descriptive and hyphenated"),
  item("6.3", "Images", "Content images are WebP and under 200 KB"),
  item("6.4", "Images", "Content images specify width and height"),
  item("6.5", "Images", "Below-fold content images are lazy loaded"),
  item("6.6", "Images", "Responsive content images expose srcset"),
  item("6.7", "Images", "A featured image is used by the page and social metadata"),

  item("7.1", "Internal links", "Article contains at least three contextual internal links"),
  item("7.2", "Internal links", "Article links to related reviews, guides or category pages"),
  item("7.3", "Internal links", "Internal anchor text is descriptive"),
  item("7.4", "Internal links", "Internal links occur within body copy"),
  item("7.5", "Internal links", "Visible breadcrumbs and BreadcrumbList schema are present"),

  item("8.1", "External links", "Article cites at least two authoritative non-affiliate sources"),
  item("8.2", "External links", "External sources are relevant to the section", "manual", "Topical relevance needs an editorial source review."),
  item("8.3", "External links", "External source links open in a new tab with noopener"),
  item("8.4", "External links", "Affiliate links use rel=sponsored nofollow"),

  item("9.1", "Schema", "Article schema is present"),
  item("9.2", "Schema", "LocalBusiness schema", "na", "Not applicable to an affiliate publisher review."),
  item("9.3", "Schema", "Service schema", "na", "Not a service page."),
  item("9.4", "Schema", "FAQPage schema is present"),
  item("9.5", "Schema", "BreadcrumbList schema is present"),
  item("9.6", "Schema", "Organization schema is present"),
  item("9.7", "Schema", "Author Person schema is present"),
  item("9.8", "Schema", "HowTo schema", "na", "The review contains guidance but is not primarily a step-by-step HowTo page."),
  item("9.9", "Schema", "ItemList with nested Review schema", "na", "This is an individual provider review, not a roundup."),
  item("9.10", "Schema", "Product plus Review schema with rating", "blocked", "Evidence-gated: no Product/Review rating may pass until a documented, reproducible scoring record exists. A marketing score is not evidence."),

  item("10.1", "E-E-A-T", "Named author byline is visible"),
  item("10.2", "E-E-A-T", "Author bio lists verified credentials", "blocked", "Evidence-gated: do not invent years, qualifications or certifications."),
  item("10.3", "E-E-A-T", "Byline links to a dedicated author page"),
  item("10.4", "E-E-A-T", "Published date is displayed with machine-readable time"),
  item("10.5", "E-E-A-T", "Last-updated or reviewed date is displayed with machine-readable time"),
  item("10.6", "E-E-A-T", "Real stories, numbers and opinions are evidence-backed", "manual", "Requires checking the evidence dossier against the prose."),
  item("10.7", "E-E-A-T", "Authoritative sources are cited in body copy"),
  item("10.8", "E-E-A-T", "About page is linked and available"),
  item("10.9", "E-E-A-T", "Contact identity details are accurate", "manual", "Owner confirmation is required for publisher identity and contact details; do not fabricate an address or phone number."),
  item("10.10", "E-E-A-T", "First-person experience is anchored in the opening", "blocked", "Evidence-gated until a fresh, documented hands-on test exists; a transparent no-fresh-test statement is preferable to fabricated experience."),

  item("11.1", "Accessibility", "Semantic header, nav, main, article and footer landmarks are present"),
  item("11.2", "Accessibility", "Interactive controls have accessible names or ARIA labels"),
  item("11.3", "Accessibility", "Color contrast meets WCAG AA", "manual", "A rendered contrast audit is still required for all component states."),
  item("11.4", "Accessibility", "Interactive elements expose visible focus styles", "manual", "Keyboard-state visual inspection is required."),
  item("11.5", "Accessibility", "Every image has an alt attribute"),
  item("11.6", "Accessibility", "Link text is descriptive"),
  item("11.7", "Accessibility", "Skip-to-content link targets the main content"),

  item("12.1", "Mobile", "Layout adapts to mobile viewport"),
  item("12.2", "Mobile", "Non-inline touch targets are at least 48 by 48 pixels"),
  item("12.3", "Mobile", "Body font is at least 16 pixels"),
  item("12.4", "Mobile", "Page has no horizontal scrolling"),
  item("12.5", "Mobile", "No intrusive interstitial is visible"),

  item("13.1", "Social preview", "Open Graph image is 1200x630 and below 1 MB"),
  item("13.2", "Social preview", "Twitter Card image is 1200x600"),
  item("13.3", "Social preview", "Open Graph description is compelling"),
  item("13.4", "Social preview", "Pinterest 1000x1500 image", "na", "VPN provider reviews are not treated as a Pinterest-first visual niche."),

  item("14.1", "Conversion", "Service-page phone CTA", "na", "Affiliate review conversion model applies."),
  item("14.2", "Conversion", "Click-to-call phone number", "na", "Affiliate review conversion model applies."),
  item("14.3", "Conversion", "Service CTA repetition", "na", "Affiliate review conversion model applies."),
  item("14.4", "Conversion", "Service licenses and ratings", "na", "Affiliate review conversion model applies; unsupported ratings are prohibited."),
  item("14.5", "Conversion", "Named customer testimonials", "na", "Affiliate review conversion model applies."),
  item("14.6", "Conversion", "Service-area coverage", "na", "Affiliate review conversion model applies."),
  item("14.7", "Conversion", "Business hours", "na", "Affiliate review conversion model applies."),
  item("14.8", "Conversion", "Physical address and map", "na", "Affiliate review conversion model applies."),
  item("14.9", "Conversion", "Primary affiliate or owned-media CTA appears above the fold"),
  item("14.10", "Conversion", "Affiliate disclosure appears before the first affiliate link"),
  item("14.11", "Conversion", "Verified owned social-channel follow button", "blocked", "No unverified Pinterest, YouTube or other owned channel may be invented."),
  item("14.12", "Conversion", "Visible language or region indicator is present"),

  item("15.1", "Long-form", "Table of contents appears near the top"),
  item("15.2", "Long-form", "Every substantive H2 has a working jump link"),
  item("15.3", "Long-form", "Back-to-top control is present"),
  item("15.4", "Long-form", "Reading-progress bar", "na", "Optional in the canonical checklist."),
  item("15.5", "Long-form", "Estimated reading time is displayed"),
]);

if (REVIEW_DETAIL_CONTRACT.length < 80) {
  throw new Error("Review detail contract must preserve all 80+ canonical checklist rows.");
}
