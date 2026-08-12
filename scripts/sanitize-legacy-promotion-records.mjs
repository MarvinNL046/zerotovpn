import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const slugs = new Set([
  "best-free-vpn-reddit-2026",
  "is-brave-vpn-free-2026",
  "best-vpn-for-nvidia-shield-2026",
]);
const locales = readdirSync(resolve(root, "src/data/posts"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const replacements = {
  "best-free-vpn-reddit-2026": [
    [
      /<p><strong>Reddit(?:&#39;|')s real consensus<\/strong>,[\s\S]*?<\/p>/i,
      "<p><strong>Reddit's real consensus</strong>, once you dig past the initial \"best free VPN?\" question, is: ProtonVPN Free if you genuinely cannot afford anything, but NordVPN or Surfshark may be worth comparing on a long-term plan if you can afford a paid service. Check the current plan terms and renewal price on the provider site before committing.</p>",
    ],
  ],
  "is-brave-vpn-free-2026": [
    [
      /<p>The comparison makes the value gap clear\.[\s\S]*?<\/p>/i,
      "<p>The comparison highlights a trade-off between dedicated-VPN features and Brave's browser integration. <a href=\"/reviews/nordvpn\">NordVPN</a> offers broader platform support and a larger provider-stated network, but plan prices and renewal terms change by region. <a href=\"/reviews/protonvpn\">ProtonVPN's free tier</a> offers unlimited data with no cost at all, though with limitations on speed and server access. For a broader value comparison, see our <a href=\"/best/vpn-cheap\">cheap-VPN guide</a> and verify the current provider terms before subscribing.</p>",
    ],
  ],
  "best-vpn-for-nvidia-shield-2026": [
    [
      /<p><a href="\/reviews\/nordvpn">Read our full NordVPN review<\/a>\s*\|\s*<a href="[^"]+">Get NordVPN coupon<\/a><\/p>/i,
      "<p><a href=\"/reviews/nordvpn\">Read our full NordVPN review</a> | <a href=\"/best/vpn-cheap\">Compare current plan terms</a></p>",
    ],
    [
      /<p><a href="\/reviews\/surfshark">Read our full Surfshark review<\/a>\s*\|\s*<a href="[^"]+">Get Surfshark deal<\/a><\/p>/i,
      "<p><a href=\"/reviews/surfshark\">Read our full Surfshark review</a> | <a href=\"/best/vpn-cheap\">Compare current plan terms</a></p>",
    ],
  ],
};

for (const locale of locales) {
  for (const slug of slugs) {
    const file = resolve(root, "src/data/posts", locale, `${slug}.json`);
    let post;
    try {
      post = JSON.parse(readFileSync(file, "utf8"));
    } catch {
      continue;
    }
    let content = post.content ?? "";
    for (const [pattern, replacement] of replacements[slug]) {
      content = content.replace(pattern, replacement);
    }
    // Remove any remaining legacy internal coupon anchors from translated records.
    content = content.replace(/<a\b[^>]*href=["']\/coupons\/[^"']+["'][^>]*>[\s\S]*?<\/a>/gi, "current provider terms");
    post.content = content;
    post.updatedAt = "2026-08-12T00:00:00.000Z";
    writeFileSync(file, `${JSON.stringify(post)}\n`);
  }
}
