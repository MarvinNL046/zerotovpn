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
