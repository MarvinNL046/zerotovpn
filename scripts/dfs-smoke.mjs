import { dfs } from "./dfs.mjs";

const endpoint = "dataforseo_labs/google/keyword_overview/live";
const result = await dfs(endpoint, {
  keywords: ["yoga mat"],
  location_code: 2840,
  language_code: "en",
});

// DataForSEO Labs wraps keyword rows inside the task result's `items` array.
const row = result?.flatMap((entry) => Array.isArray(entry?.items) ? entry.items : []).find((item) => item?.keyword === "yoga mat")
  ?? result?.[0]?.items?.[0];
if (!row) throw new Error("DataForSEO returned no keyword row for yoga mat.");

const info = row.keyword_info ?? {};
const properties = row.keyword_properties ?? {};
const intent = row.search_intent_info ?? {};
const output = {
  keyword: row.keyword,
  searchVolume: info.search_volume ?? null,
  keywordDifficulty: properties.keyword_difficulty ?? null,
  searchIntent: intent.main_intent ?? null,
  lastUpdated: info.last_updated_time ?? null,
};

if (typeof output.searchVolume !== "number" || typeof output.keywordDifficulty !== "number" || !output.searchIntent) {
  throw new Error(`DataForSEO returned an incomplete keyword row: ${JSON.stringify(output)}`);
}

console.log(JSON.stringify({ endpoint, ...output }, null, 2));
