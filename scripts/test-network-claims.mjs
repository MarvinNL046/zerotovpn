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
const nordvpn = providerSource.match(/id: "nordvpn"[\s\S]*?servers: (\d+),\s*countries: (\d+),/);
assert(nordvpn, "NordVPN network fields are missing from vpn-data.ts");
const [servers, countries] = [Number(nordvpn[1]), Number(nordvpn[2])];
assert(servers === 7400 && countries === 118, "Unexpected NordVPN network snapshot; review evidence before changing public copy");

const routeFiles = [
  "src/app/[locale]/best/vpn-android/page.tsx",
  "src/app/[locale]/best/vpn-android-tablet/page.tsx",
  "src/app/[locale]/best/vpn-ipad/page.tsx",
  "src/app/[locale]/best/vpn-iphone/page.tsx",
  "src/app/[locale]/best/vpn-mobile/page.tsx",
  "src/app/[locale]/best/vpn-tablet/page.tsx",
  "src/app/[locale]/best/vpn-windows-tablet/page.tsx",
];
for (const file of routeFiles) {
  const source = read(file);
  assert(!/(?:7000|6400)\+/.test(source), `${file} still contains a retired NordVPN server-count literal`);
  assert(source.includes('getVpnById("nordvpn")!.servers'), `${file} should render NordVPN servers from vpn-data.ts`);
}

const messageFiles = ["en", "nl", "de", "es", "fr", "ja", "ko", "th", "zh"].map((locale) => `src/messages/${locale}.json`);
for (const file of messageFiles) {
  const messages = read(file);
  assert(!/(?:7[,.]000|6[,.]400)\+?/.test(messages), `${file} contains a retired NordVPN server-count literal`);
  for (const match of messages.matchAll(/(?:7[,.]400\+[^\n"]*118|118[^\n"]*7[,.]400\+)/gi)) {
    assert(!/232/.test(match[0]), `${file} exposes affiliate geography as public network coverage`);
    assert(/7[,.]400/.test(match[0]) && /118/.test(match[0]), `${file} contains an unbounded NordVPN network claim`);
  }
}

console.log(JSON.stringify({
  passed: true,
  nordvpnNetworkSnapshot: { servers, countries },
  dynamicRouteChecks: routeFiles.length,
  localeMessageChecks: messageFiles.length,
}, null, 2));
