// Bewaakt dat de twee VPN-bronnen niet uiteenlopen.
//
// De site heeft er twee sinds de Neon-uitfasering:
//   src/lib/vpn-data.ts   — gebruikt tijdens de build en door pagina's die
//                           rechtstreeks importeren
//   src/data/vpns.json    — gebruikt door src/lib/db/vpn-service.ts, en dus
//                           door alles wat via vpn-data-layer loopt
//
// vpn-data-layer kiest tussen die twee op basis van de omgeving: tijdens een
// lokale build leest hij de .ts, op Vercel de .json. Daardoor kunnen lokaal en
// productie verschillende prijzen tonen zonder dat iets stukgaat — dat is een
// keer gebeurd en kostte een halve middag om te vinden, omdat elke lokale
// controle groen bleef terwijl productie oude prijzen liet zien.
//
// Deze controle draait in prebuild en laat de build falen bij een verschil.
// Matchen gaat op slug: de id in de JSON is nog de oude database-UUID.
import fs from "node:fs";
import path from "node:path";

const WORTEL = process.cwd();
const VELDEN = ["priceMonthly", "priceYearly", "priceTwoYear", "overallRating"];

const tsBron = fs.readFileSync(path.join(WORTEL, "src/lib/vpn-data.ts"), "utf8");
const jsonBron = JSON.parse(
  fs.readFileSync(path.join(WORTEL, "src/data/vpns.json"), "utf8"),
);

// De .ts is geen module die we hier kunnen importeren (TypeScript), dus lezen
// we de providerblokken uit de tekst. De vorm is stabiel: elk blok begint op
// twee spaties met "{" en dan "id:" op vier spaties.
const tsPerSlug = new Map();
for (const blok of tsBron.split(/\r?\n {2}\{\r?\n {4}id: /).slice(1)) {
  const slug = blok.match(/slug: "([^"]+)"/)?.[1];
  if (!slug) continue;
  const waarden = {};
  for (const veld of VELDEN) {
    const m = blok.match(new RegExp(`\\b${veld}: ([\\d.]+)`));
    waarden[veld] = m ? Number(m[1]) : null;
  }
  tsPerSlug.set(slug, waarden);
}

const getal = (x) => (x === null || x === undefined || x === "" ? null : Number(x));

const verschillen = [];
for (const provider of jsonBron) {
  const verwacht = tsPerSlug.get(provider.slug);
  if (!verwacht) continue;
  for (const veld of VELDEN) {
    const a = getal(provider[veld]);
    const b = verwacht[veld];
    if (b === null || a === b) continue;
    verschillen.push(`${provider.slug} ${veld}: vpns.json=${a} vpn-data.ts=${b}`);
  }
}

if (verschillen.length) {
  console.error(
    `\nDe twee VPN-bronnen lopen uiteen (${verschillen.length} velden):\n`,
  );
  for (const v of verschillen) console.error(`  ${v}`);
  console.error(
    "\nBeide moeten dezelfde prijzen en cijfers geven, anders toont productie" +
      "\niets anders dan een lokale build. Werk src/data/vpns.json bij.\n",
  );
  process.exit(1);
}

console.log(
  `VPN-bronnen gelijk (${tsPerSlug.size} providers, ${VELDEN.length} velden per provider).`,
);
