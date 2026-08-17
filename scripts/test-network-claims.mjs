import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

function read(relativePath) {
  return readFileSync(resolve(ROOT, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const providerSource = read("src/lib/vpn-data.ts");
const nordvpn = providerSource.match(
  /id: "nordvpn"[\s\S]*?servers: (\d+),\s*countries: (\d+),/,
);
assert(nordvpn, "NordVPN network fields are missing from vpn-data.ts");
const [servers, countries] = [Number(nordvpn[1]), Number(nordvpn[2])];
assert(
  servers === 7400 && countries === 118,
  "Unexpected NordVPN network snapshot; review evidence before changing public copy",
);

const reviewedRouteContracts = [
  {
    route: "src/app/[locale]/best/vpn-android/page.tsx",
    component: "src/components/editorial/android-vpn-editorial-page.tsx",
  },
  {
    route: "src/app/[locale]/best/vpn-android-tablet/page.tsx",
    component: "src/components/editorial/android-tablet-editorial-page.tsx",
  },
  {
    route: "src/app/[locale]/best/vpn-ipad/page.tsx",
    component: "src/components/editorial/ipad-vpn-editorial-page.tsx",
  },
  {
    route: "src/app/[locale]/best/vpn-iphone/page.tsx",
    component: "src/components/editorial/iphone-vpn-editorial-page.tsx",
  },
  {
    route: "src/app/[locale]/best/vpn-mobile/page.tsx",
    component: "src/components/editorial/mobile-vpn-editorial-page.tsx",
  },
];
const evidenceFirstRoutes = [
  "src/app/[locale]/best/vpn-tablet/page.tsx",
  "src/app/[locale]/best/vpn-windows-tablet/page.tsx",
];
const routeFiles = [
  ...reviewedRouteContracts.map(({ route }) => route),
  ...evidenceFirstRoutes,
];
for (const file of routeFiles) {
  const source = read(file);
  assert(
    !/(?:7000|6400)\+/.test(source),
    `${file} still contains a retired NordVPN server-count literal`,
  );
  assert(
    source.includes("EvidenceFirstStaticRoute"),
    `${file} should fail closed through the evidence-first fallback`,
  );
}
for (const { route, component } of reviewedRouteContracts) {
  assert(
    read(route).includes("createStaticPublishedMetadata"),
    `${route} should publish only its reviewed English branch`,
  );
  assert(
    !/(?:7[,.]000|6[,.]400)\+?/.test(read(component)),
    `${component} contains a retired NordVPN server-count literal`,
  );
}
for (const route of evidenceFirstRoutes) {
  assert(
    !read(route).includes("createStaticPublishedMetadata"),
    `${route} should remain evidence-first and noindex in every locale`,
  );
}

const messageFiles = ["en", "nl", "de", "es", "fr", "ja", "ko", "th", "zh"].map(
  (locale) => `src/messages/${locale}.json`,
);
for (const file of messageFiles) {
  const messages = read(file);
  assert(
    !/(?:7[,.]000|6[,.]400)\+?/.test(messages),
    `${file} contains a retired NordVPN server-count literal`,
  );
  for (const match of messages.matchAll(
    /(?:7[,.]400\+[^\n"]*118|118[^\n"]*7[,.]400\+)/gi,
  )) {
    assert(
      !/232/.test(match[0]),
      `${file} exposes affiliate geography as public network coverage`,
    );
    assert(
      /7[,.]400/.test(match[0]) && /118/.test(match[0]),
      `${file} contains an unbounded NordVPN network claim`,
    );
  }
}

const publicArticleChecks = [
  {
    files: [
      "src/content/blog/is-brave-vpn-free-2026.md",
      "src/data/posts/en/is-brave-vpn-free-2026.json",
    ],
    required: ["7,400+", "118"],
  },
  {
    files: [
      "src/content/blog/best-country-for-vpn-server-location-2026.md",
      "src/data/posts/en/best-country-for-vpn-server-location-2026.json",
    ],
    required: ["7,400+", "118", "4,500+", "15,000+"],
  },
];
for (const { files, required } of publicArticleChecks) {
  for (const file of files) {
    const article = read(file);
    assert(
      !/(?:7,000|6,400|3,200)\+?/.test(article),
      `${file} contains a retired public network-count literal`,
    );
    for (const marker of required)
      assert(
        article.includes(marker),
        `${file} is missing current network marker ${marker}`,
      );
  }
}

console.log(
  JSON.stringify(
    {
      passed: true,
      nordvpnNetworkSnapshot: { servers, countries },
      reviewedRouteChecks: reviewedRouteContracts.length,
      evidenceFirstRouteChecks: evidenceFirstRoutes.length,
      localeMessageChecks: messageFiles.length,
    },
    null,
    2,
  ),
);
