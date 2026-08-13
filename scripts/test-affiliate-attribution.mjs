import assert from "node:assert/strict";

const {
  buildPublicAffiliateSubId,
  isNordAffiliateUrl,
  withNordAffiliateSubId,
} = await import("../src/lib/affiliate-attribution.ts");

const cases = [
  {
    name: "builds a locale-aware public placement",
    actual: buildPublicAffiliateSubId("/en/blog/vpn-simultaneous-connections-limits-workarounds-2026"),
    expected: "zt_en-blog-vpn-simultaneous-connections-limits-workarounds-2026",
  },
  {
    name: "adds aff_sub to the ZeroToVPN Nord redirect",
    actual: withNordAffiliateSubId("https://go.zerotovpn.com/nordvpn", "/en/blog/example"),
    expected: "https://go.zerotovpn.com/nordvpn?aff_sub=zt_en-blog-example",
  },
  {
    name: "preserves existing query parameters",
    actual: withNordAffiliateSubId("https://go.nordvpn.net/aff_c?offer_id=15&url_id=902", "/nl/blog/example"),
    expected: "https://go.nordvpn.net/aff_c?offer_id=15&url_id=902&aff_sub=zt_nl-blog-example",
  },
  {
    name: "does not tag another provider",
    actual: withNordAffiliateSubId("https://go.zerotovpn.com/surfshark", "/en/blog/example"),
    expected: "https://go.zerotovpn.com/surfshark",
  },
];

assert.equal(isNordAffiliateUrl("https://go.zerotovpn.com/nordvpn"), true);
assert.equal(isNordAffiliateUrl("https://go.zerotovpn.com/surfshark"), false);
for (const testCase of cases) assert.equal(testCase.actual, testCase.expected, testCase.name);

console.log(JSON.stringify({ passed: true, cases: cases.map(({ name }) => name) }, null, 2));
