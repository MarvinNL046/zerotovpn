import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
function loadEnvLocal() {
  const path = resolve(ROOT, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || match[1] in process.env) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}
function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

loadEnvLocal();
const networkId = process.env.TUNE_NETWORK_ID;
const apiKey = process.env.TUNE_AFFILIATE_API_KEY;
if (!networkId || !apiKey) {
  console.error("Nord/TUNE API is not configured. Set TUNE_NETWORK_ID and TUNE_AFFILIATE_API_KEY in .env.local; no credential is hardcoded.");
  process.exitCode = 2;
} else {
  const start = arg("--start", "2026-07-28");
  const end = arg("--end", "2026-08-13");
  const query = new URLSearchParams({
    Target: "Affiliate_Report", Method: "getStats", api_key: apiKey,
    data_start: start, data_end: end, totals: "true",
    "fields[0]": "Offer.name", "fields[1]": "OfferUrl.name", "fields[2]": "Stat.date",
    "fields[3]": "Stat.offer_id", "fields[4]": "Stat.offer_url_id", "fields[5]": "Stat.clicks",
    "fields[6]": "Stat.conversions", "fields[7]": "Stat.payout", "fields[8]": "Stat.erpc",
    "fields[9]": "Stat.affiliate_info1", "fields[10]": "Stat.affiliate_info2", "fields[11]": "Stat.affiliate_info3",
  });
  const endpoint = `https://${networkId}.api.hasoffers.com/Apiv3/json?${query.toString()}`;
  const response = await fetch(endpoint, { headers: { accept: "application/json" } });
  const json = await response.json();
  const status = json?.response?.status;
  if (!response.ok || status !== 1) {
    console.error(JSON.stringify({ ok: false, httpStatus: response.status, apiStatus: status, error: json?.response?.errorMessage ?? "TUNE API request failed" }, null, 2));
    process.exitCode = 1;
  } else {
    const data = json.response.data;
    const rows = Array.isArray(data) ? data : data?.data ?? data?.rows ?? [];
    const subIds = rows.flatMap((row) => [row["Stat.affiliate_info1"], row["Stat.affiliate_info2"], row["Stat.affiliate_info3"]]).filter(Boolean);
    console.log(JSON.stringify({ ok: true, window: { start, end }, rowCount: Array.isArray(rows) ? rows.length : null, returnedSubIds: [...new Set(subIds)], responseKeys: Object.keys(json.response ?? {}), note: "Credentials are never printed. Join only non-empty zt_<page-slug> values." }, null, 2));
  }
}
