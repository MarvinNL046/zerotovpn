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
    name: "localized Best VPN routes avoid retired performance claims",
    file: "src/app/[locale]/best/best-vpn/page.tsx",
    patterns: [/BestVpnPillarPage vpns=\{allVpns\}/, /Repeatable test notes/, /Comparamos una amplia selección/],
    forbiddenPatterns: [/35\+|35以上|35개 이상|35款以上|plus de 35|über 35|มากกว่า 35/i, /500\+|500回|500회|500多次|plus de 500|über 500|มากกว่า 500/i, /6,730|7,000\+.*118|24\/7/],
  },
  {
    name: "about page uses verifiable trust signals",
    file: "src/app/[locale]/about/page.tsx",
    patterns: [/Current provider records/, /Reproducible test plan/, /Sources and dated notes/, /Publication locales/, /separates provider documentation/],
    forbiddenPatterns: [/100K\+|100,000\+|Monthly Readers|monthly readers|50\+|500\+|200\+/i],
  },
  {
    name: "Linux use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-linux/page.tsx",
    patterns: [/We compare several VPNs for Linux/, /We vergelijken meerdere VPN-providers op Linux/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "Windows use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-windows/page.tsx",
    patterns: [/We compare several VPNs for Windows/, /We vergelijken meerdere VPN-providers op Windows/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "laptop use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-laptops/page.tsx",
    patterns: [/We compare several VPNs for laptops/, /We vergelijken meerdere VPN-providers voor laptopgebruik/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "privacy use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-privacy/page.tsx",
    patterns: [/We compare several VPNs for privacy/, /We vergelijken meerdere VPN-providers op privacybescherming/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "gaming use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-gaming/page.tsx",
    patterns: [/Compare current VPN provider records for gaming performance/, /We vergelijken meerdere VPN-providers voor gaming/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35|We tested 12 VPNs/i],
  },
  {
    name: "Chromebook use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-chromebook/page.tsx",
    patterns: [/We vergelijken meerdere VPN-providers voor Chromebook-compatibiliteit/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "macOS use-case metadata avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-macos/page.tsx",
    patterns: [/Compare current macOS VPN picks/, /Native Apps, M1\/M2/],
    forbiddenPatterns: [/35\+|35ä»¥ä¸Š|35ê°œ|35ä¸ª|Ã¼ber 35|mÃ¡s de 35|plus de 35|à¸¡à¸²à¸à¸à¸§à¹ˆà¸² 35/i],
  },
  {
    name: "Nvidia Shield article qualifies speed evidence",
    file: "src/content/blog/best-vpn-for-nvidia-shield-2026.md",
    patterns: [/March 2026 Shield TV run/, /Results vary with the device/],
    forbiddenPatterns: [/94%.*speed retention|speed retention.*94%/i],
  },
  {
    name: "Nvidia Shield rendered record stays evidence-bounded",
    file: "src/data/posts/en/best-vpn-for-nvidia-shield-2026.json",
    patterns: [/dated speed observations/, /March 2026 Shield TV run/, /Results vary with the device/],
    forbiddenPatterns: [/We tested over 10 VPN providers/i, /Speed retention hit 94%/i],
  },
  {
    name: "BBC iPlayer article avoids unsupported provider counts",
    file: "src/content/blog/best-vpn-for-bbc-iplayer-2026.md",
    patterns: [/current provider records/, /remaining providers we checked/],
    forbiddenPatterns: [/38 VPN|tested 38|38\+ VPN/i],
  },
  {
    name: "BBC iPlayer rendered record avoids unsupported provider counts",
    file: "src/data/posts/en/best-vpn-for-bbc-iplayer-2026.json",
    patterns: [/current provider records/, /remaining providers we checked/],
    forbiddenPatterns: [/38 VPN|tested 38|38\+ VPN/i],
  },
  {
    name: "Torrenting Reddit article avoids unsupported provider counts",
    file: "src/content/blog/best-vpn-for-torrenting-reddit-2026.md",
    patterns: [/current provider evidence/],
    forbiddenPatterns: [/38\+ VPN/i],
  },
  {
    name: "Torrenting Reddit rendered record avoids unsupported provider counts",
    file: "src/data/posts/en/best-vpn-for-torrenting-reddit-2026.json",
    patterns: [/current provider evidence/],
    forbiddenPatterns: [/38\+ VPN/i],
  },
  {
    name: "Biometric payment article qualifies provider evidence",
    file: "src/data/posts/en/vpn-biometric-payment-fingerprint-identity-leak-2026.json",
    patterns: [/multiple VPN providers/, /multiple VPN providers; some claims/],
    forbiddenPatterns: [/50\+ VPN|35\+ VPN/i],
  },
  {
    name: "shared author credentials stay evidence-bounded",
    file: "src/components/blog/author-box.tsx",
    patterns: [/documented provider checks/, /Current provider records/, /Dated speed & security checks/],
    forbiddenPatterns: [/50\+ VPN|over 50 VPN|VPN services tested/i],
  },
  {
    name: "homepage evidence-bounded recommendation",
    file: "src/app/[locale]/page.tsx",
    patterns: [/Shortlist candidate/, /catalog data and documented options/, /Provider-stated countries/, /Refund window in catalog/],
    forbiddenPatterns: [/After testing 38\+ VPNs/, /consistently ranks #1/, /94%.*Speed Retention/, /4\.8\/5.*Our Rating/, /50\+/, /100K\+/, /500\+ speed tests/, /24\/7.*Updated/],
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
    name: "retired free VPN translations are not serialized to clients",
    file: "src/app/[locale]/layout.tsx",
    patterns: [/const clientMessages = \{ \.\.\.messages \}/, /delete clientMessages\.freeVpn/, /messages=\{clientMessages\}/],
  },
  {
    name: "retired homepage trust claims are not serialized to clients",
    file: "src/app/[locale]/layout.tsx",
    patterns: [/delete clientMessages\.home\?\.trustIndicators/],
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
