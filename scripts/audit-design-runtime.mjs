const baseUrl = (
  process.env.DESIGN_AUDIT_BASE_URL ?? "http://127.0.0.1:3001"
).replace(/\/$/, "");

const reviewedRoutes = [
  "/",
  "/reviews",
  "/reviews/nordvpn",
  "/reviews/surfshark",
  "/reviews/protonvpn",
  "/reviews/airvpn",
  "/reviews/urban-vpn",
  "/best/best-vpn",
  "/best/free-vpn",
  "/best/vpn-macos",
  "/best/vpn-gaming",
  "/compare",
  "/compare/nordvpn-vs-surfshark",
  "/countries",
  "/countries/china",
  "/countries/iran",
  "/countries/netherlands",
  "/guides",
  "/guides/what-is-vpn",
  "/guides/vpn-privacy-guide",
  "/guides/vpn-speed-guide",
  "/blog",
  "/blog/vpn-connection-drops-why-disconnects-how-to-fix-2026",
  "/blog/best-vpn-for-iran-2026-bypass-internet-censorship",
  "/quiz",
  "/tools",
  "/tools/what-is-my-ip",
  "/tools/dns-leak-test",
  "/speed-test",
  "/about",
  "/editorial-policy",
  "/methodology",
  "/privacy-policy",
  "/cookie-policy",
  "/terms",
  "/contact",
  "/affiliate-disclosure",
];

const fallbackRoutes = [
  "/best-no-log-vpn",
  "/best-vpn-for-digital-nomads",
  "/best/vpn-bali",
  "/best/vpn-netflix",
  "/best/vpn-tablet",
  "/blog/is-vpn-legal",
  "/blog/vpn-vs-proxy",
  "/countries/australia",
  "/countries/canada",
  "/guides/public-wifi-safety",
  "/guides/vpn-for-streaming",
  "/reviews/ivacy",
  "/reviews/expressvpn",
  "/compare/expressvpn-vs-cyberghost",
  "/blog/vpn-api-security-protect-development-keys-webhooks-2026",
];

const localizedFallbackRoutes = [
  "/best/vpn-gaming",
  "/best/vpn-android",
  "/countries/china",
  "/countries/russia",
  "/countries/vietnam",
  "/guides/vpn-for-travel",
  "/guides/vpn-protocols-explained",
];

function count(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

function hasNoindex(response, html) {
  return (
    response.headers.get("x-robots-tag")?.toLowerCase().includes("noindex") ||
    /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html) ||
    /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots/i.test(
      html,
    )
  );
}

async function inspect(pathname, { fallback = false } = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    headers: { "accept-language": "en-US,en;q=0.9" },
    redirect: "follow",
  });
  const html = await response.text();
  const failures = [];

  if (!response.ok) failures.push(`HTTP ${response.status}`);
  if (count(html, /<main\b/gi) !== 1) {
    failures.push(`${count(html, /<main\b/gi)} main landmarks`);
  }
  if (count(html, /<h1\b/gi) !== 1) {
    failures.push(`${count(html, /<h1\b/gi)} H1 elements`);
  }
  if (fallback && !html.includes('data-design-version="v2-evidence-first"')) {
    failures.push("missing evidence-first V2 marker");
  }
  if (fallback && !hasNoindex(response, html)) {
    failures.push("fallback is not noindex");
  }
  if (
    fallback &&
    /aggregateRating|priceValidUntil|data-affiliate-slug/i.test(html)
  ) {
    failures.push("commercial schema or affiliate output leaked into fallback");
  }

  return { pathname, failures };
}

const checks = [
  ...reviewedRoutes.map((pathname) => ({ pathname, fallback: false })),
  ...fallbackRoutes.flatMap((pathname) => [
    { pathname, fallback: true },
    { pathname: `/nl${pathname}`, fallback: true },
  ]),
  ...localizedFallbackRoutes.map((pathname) => ({
    pathname: `/nl${pathname}`,
    fallback: true,
  })),
];

// Keep the dev/build server stable: compiling dozens of App Router pages in
// parallel can corrupt or overwhelm the development manifest on Windows.
const results = [];
for (const check of checks) {
  results.push(await inspect(check.pathname, { fallback: check.fallback }));
}
const failures = results.filter((result) => result.failures.length > 0);

if (failures.length > 0) {
  console.error(`Runtime design audit failed against ${baseUrl}:\n`);
  for (const result of failures) {
    console.error(`- ${result.pathname}: ${result.failures.join(", ")}`);
  }
  process.exit(1);
}

console.log(
  `Runtime design audit passed for ${results.length} rendered routes against ${baseUrl}.`,
);
