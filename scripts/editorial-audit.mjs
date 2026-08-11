import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const checks = [
  {
    name: "shared affiliate rel policy",
    file: "src/components/vpn/affiliate-button.tsx",
    patterns: [/sponsored\s+nofollow/, /trackAffiliateClick/, /affiliateSlug/, /data-affiliate-slug/],
  },
  {
    name: "shared editorial disclosure",
    file: "src/components/editorial/best-vpn-editorial-template.tsx",
    patterns: [/affiliate links may earn us a commission/, /affiliate-disclosure/],
  },
  {
    name: "Iran evidence-led page",
    file: "src/components/editorial/evidence-led-vpn-use-case-page.tsx",
    patterns: [/Reproducible local check/, /affiliateUrl/, /id=\"faq\"/],
  },
  {
    name: "Telegram evidence-led page",
    file: "src/data/editorial/telegram-vpn-2026.ts",
    patterns: [/MTProxy guide/, /<table>/, /How to test Telegram/, /<h3>Which VPN is best for Telegram\?<\/h3>/, /DataForSEO/],
  },
  {
    name: "Russia cluster evidence",
    file: "src/components/editorial/russia-vpn-editorial-page.tsx",
    patterns: [/Freedom House/, /id=\"faq\"/, /id=\"sources\"/, /IranEditorialQuickPicks/],
  },
  {
    name: "China cluster evidence",
    file: "src/components/editorial/china-vpn-editorial-page.tsx",
    patterns: [/Freedom House/, /id=\"faq\"/, /id=\"sources\"/, /IranEditorialQuickPicks/],
  },
  {
    name: "Protocol support page",
    file: "src/components/editorial/protocols-editorial-page.tsx",
    patterns: [/WireGuard vs OpenVPN/, /id=\"comparison\"/, /id=\"test-plan\"/, /id=\"faq\"/, /DataForSEO/],
  },
  {
    name: "Best VPN commercial pillar",
    file: "src/components/editorial/best-vpn-pillar-page.tsx",
    patterns: [/Top 3 overview/, /id=\"comparison\"/, /id=\"methodology\"/, /id=\"faq\"/, /priceVerifiedAt/, /AffiliateTextLink/],
  },
  {
    name: "homepage evidence-bounded recommendation",
    file: "src/app/[locale]/page.tsx",
    patterns: [/Shortlist candidate/, /catalog data and documented options/, /Provider-stated countries/, /Refund window in catalog/],
    forbiddenPatterns: [/After testing 38\+ VPNs/, /consistently ranks #1/, /94%.*Speed Retention/, /4\.8\/5.*Our Rating/],
  },
  {
    name: "Obfuscation support page",
    file: "src/components/editorial/obfuscation-editorial-page.tsx",
    patterns: [/What is VPN obfuscation\?/, /id=\"compare\"/, /id=\"test-plan\"/, /id=\"faq\"/, /DataForSEO/],
  },
  {
    name: "Restricted network support page",
    file: "src/components/editorial/restricted-networks-editorial-page.tsx",
    patterns: [/Not every restriction is a VPN problem/, /id=\"restriction-types\"/, /id=\"prepare\"/, /id=\"test-plan\"/, /id=\"faq\"/, /DataForSEO/],
  },
  {
    name: "Travel support page",
    file: "src/components/editorial/travel-editorial-page.tsx",
    patterns: [/What a travel VPN can/, /id="prepare"/, /id="compare"/, /id="faq"/, /travel.state.gov/, /DataForSEO/],
  },
  {
    name: "Free VPN support page",
    file: "src/components/editorial/free-vpn-editorial-page.tsx",
    patterns: [/what is actually free/, /id="free-tiers"/, /id="safety"/, /id="faq"/, /protonvpn.com\/free-vpn/, /DataForSEO/],
  },
  {
    name: "localized free VPN routes use the evidence-led template",
    file: "src/app/[locale]/best/free-vpn/page.tsx",
    patterns: [/All locales use the same audited template/, /<FreeVpnEditorialPage locale=\{locale\} \/>/, /Limits and Trade-offs/],
    forbiddenPatterns: [/99%/, /20\+ free VPNs/, /No Hidden Costs|Geen Verborgen Kosten|Keine Versteckten Kosten/i],
  },
  {
    name: "newsletter-only exit intent popup",
    file: "src/components/conversion/exit-intent-popup.tsx",
    patterns: [/useTranslations\("newsletter"\)/, /<NewsletterForm[^>]+source="exit-intent"/, /Owned-media newsletter prompt/],
    forbiddenPatterns: [
      /go\.zerotovpn\.com|go\.nordvpn\.net|nordvpn\.tpo\.lv/i,
      /affiliateUrl|affiliateHref|coupon|discount|\bpromo(?:code)?\b|cashback|incentive|view deal|buy now/i,
    ],
  },
  {
    name: "restricted affiliate context guard",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/isRestrictedAffiliateContext/, /verwijderAffiliateLinks\(post\.content\)/, /SourcesSection content=\{articleContent\}/],
  },
  {
    name: "non-commercial sticky CTA guard",
    file: "src/components/conversion/sticky-cta-bar.tsx",
    patterns: [/Link href="\/quiz"/, /site-owned conversion aid/],
    forbiddenPatterns: [
      /go\.zerotovpn\.com|go\.nordvpn\.net|nordvpn\.tpo\.lv/i,
      /affiliateUrl|affiliateHref|coupon|discount|\bpromo(?:code)?\b|cashback|incentive|view deal|buy now/i,
    ],
  },
];

const results = checks.map((check) => {
  const path = resolve(ROOT, check.file);
  const source = readFileSync(path, "utf8");
  const missing = check.patterns.filter((pattern) => !pattern.test(source)).map(String);
  const forbidden = (check.forbiddenPatterns ?? [])
    .filter((pattern) => pattern.test(source))
    .map(String);
  return { ...check, pass: missing.length === 0 && forbidden.length === 0, missing, forbidden };
});

const localeFiles = readdirSync(resolve(ROOT, "src/messages"))
  .filter((file) => file.endsWith(".json"))
  .sort();
const popupForbidden = /affiliate|coupon|discount|deal|offer|promo|cashback|incentive|free\s+months?|\b\d{1,3}%\s*off/i;
const popupLocaleFailures = [];
for (const file of localeFiles) {
  const locale = JSON.parse(readFileSync(resolve(ROOT, "src/messages", file), "utf8"));
  const popup = locale.newsletter?.popupTitle && locale.newsletter?.popupSubtitle
    ? `${locale.newsletter.popupTitle} ${locale.newsletter.popupSubtitle}`
    : "";
  if (!popup || popupForbidden.test(popup)) popupLocaleFailures.push(file);
}
results.push({
  name: "newsletter popup copy remains email-only in every locale",
  file: "src/messages/*.json",
  pass: popupLocaleFailures.length === 0,
  missing: popupLocaleFailures.length ? popupLocaleFailures.map((file) => `clean popup copy: ${file}`) : [],
  forbidden: [],
});
const failed = results.filter((result) => !result.pass);
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), checked: results.length, passed: results.length - failed.length, failed: failed.length, results: results.map(({ name, file, pass, missing, forbidden }) => ({ name, file, pass, missing, forbidden })) }, null, 2));
if (failed.length) process.exitCode = 1;
