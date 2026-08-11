import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const checks = [
  {
    name: "shared affiliate rel policy",
    file: "src/components/vpn/affiliate-button.tsx",
    patterns: [/sponsored\s+nofollow/, /trackAffiliateClick/],
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
];

const results = checks.map((check) => {
  const path = resolve(ROOT, check.file);
  const source = readFileSync(path, "utf8");
  const missing = check.patterns.filter((pattern) => !pattern.test(source)).map(String);
  return { ...check, pass: missing.length === 0, missing };
});
const failed = results.filter((result) => !result.pass);
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), checked: results.length, passed: results.length - failed.length, failed: failed.length, results: results.map(({ name, file, pass, missing }) => ({ name, file, pass, missing })) }, null, 2));
if (failed.length) process.exitCode = 1;
