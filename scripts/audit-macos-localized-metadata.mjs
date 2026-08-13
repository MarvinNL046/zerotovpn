import fs from "node:fs";
import path from "node:path";

const file = path.resolve("src/app/[locale]/best/vpn-macos/page.tsx");
const source = fs.readFileSync(file, "utf8");
const titlesStart = source.indexOf("const titles");
const descriptionsStart = source.indexOf("const descriptions");
const returnStart = source.indexOf("  return {", descriptionsStart);

if (titlesStart < 0 || descriptionsStart < 0 || returnStart < 0) {
  throw new Error("Could not locate localized macOS metadata maps");
}

const titlesBlock = source.slice(titlesStart, descriptionsStart);
const descriptionsBlock = source.slice(descriptionsStart, returnStart);
const metadata = `${titlesBlock}\n${descriptionsBlock}`;
const forbidden = [
  /getest/i,
  /probados?/i,
  /test(?:é|ed|ing|済み|됨|สอบ)/iu,
  /tested/i,
  /m1\s*\/\s*m2/i,
  /native apps?/i,
  /optim(?:ized|iert|isées?|izadas?|isatie|ization)/i,
];
const locales = ["en", "nl", "de", "es", "fr", "zh", "ja", "ko", "th"];
const missing = locales.filter((locale) => !new RegExp(`\\b${locale}:`).test(metadata));
const violations = forbidden.filter((pattern) => pattern.test(metadata)).map(String);

if (missing.length || violations.length) {
  console.error(JSON.stringify({ file, missing, violations }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ file, locales: locales.length, status: "ok" }, null, 2));
