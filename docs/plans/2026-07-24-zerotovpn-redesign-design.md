# ZeroToVPN — redesign & SEO-hardening (designdoc)

Datum: 2026-07-24
Status: **ter goedkeuring** — nog niets uitgevoerd
Conventie: designdoc → implementatieplan → uitvoeren (overgenomen van go2thailand.com)

---

## 1. Uitgangssituatie (gemeten, niet aangenomen)

**Search Console, 24 apr – 23 jul 2026:** ~130.000 impressies, ~254 kliks. Dat is 0,2% CTR.
De VS levert 78.640 impressies op gemiddelde positie 34 en 47 kliks (0,06%).

| Signaal | Meting | Interpretatie |
|---|---|---|
| Iran-artikel | positie 8,9 · 11.974 impressies · 0,18% CTR | zero-click-SERP: AI Overview + PAA + Reddit + video's boven het organische veld |
| `/compare/protonvpn-vs-astrill` | positie 5,9 · 3,3% CTR | long-tail waar de AI Overview niet domineert |
| `/fr/compare/protonvpn-vs-astrill` | positie 4,4 · 17,6% CTR | idem, in een taal met weinig concurrentie |
| `/ja/countries/myanmar` | positie 10,3 · 9,5% CTR | idem |
| `/best/best-vpn` | positie 52 · 0,06% CTR | head-term tegen DR-80-domeinen; niet winbaar |

**Conclusie:** de site wordt gevonden. Het probleem is dat de impressies op de verkeerde
plek zitten (head-terms met AI Overview) en dat de kwaliteit van de index het domein remt.

**Keyword-moeilijkheid van de niche is laag:** `best vpn for telegram` KD 4,
`best vpn for russia` KD 5, `best vpn for china` KD 13. Ranken is het probleem niet.

---

## 2. Wat er kapot is

### 2.1 Index-vervuiling (grootste blokkade)

- **68 Engelse slugs zijn in werkelijkheid 25 onderwerpen.** De oude pipeline plakte bij
  een slug-botsing een datum achter de slug en publiceerde opnieuw.
  Ergste geval: `vpn-guide-tips-may-2026` bestaat **34×** met 5 titels;
  `vpn-guide-tips-june-2026` **10×** met 2 titels; april 3×.
- **Het Iran-artikel staat dubbel in alle 9 talen** = 18 URL's voor één artikel.
  Idem `vpn-encryption-protocols-…` (18 URL's) en `vpn-logging-policies-decoded` (16).
- **30 titelstrings worden door 2+ slugs gedeeld**, samen 87 Engelse slugs.
- Ruwweg een vijfde van de 511 blog-URL's is duplicaat.

### 2.2 Sitemap belooft wat er niet is

- **297 doorverwijzende URL's** in de sitemap (33 `permanentRedirect`-stubs × 9 talen).
- **~6.300 `/compare/`-URL's**: elke paarsgewijze combinatie van 38 VPN's, terwijl er
  precies **9** daadwerkelijk vanaf een pagina gelinkt worden. De rest is on-demand
  gegenereerd en verder onvindbaar.
- Sitemap en pagina-metadata spreken elkaar tegen over hreflang: de sitemap claimt alleen
  bestaande vertalingen, de pagina claimt altijd alle 9.

### 2.3 Titels

- **118 van 317** `metaTitle`s zijn hard afgekapt op exact 60 tekens, vaak midden in een
  woord (`"… Data Brokers 2"`, `"… Card Da"`). 22 eindigen op een los fragment.
- Het sjabloon plakt daarna `" | ZeroToVPN"` erachter → **297 van 317** komen boven 60 uit.
- `metaTitle` (SERP) en `title` (H1) lopen op vrijwel elke post uiteen.

### 2.4 Gestructureerde data

- **`ratingCount` wordt verzonnen** wanneer die ontbreekt: `Math.round(rating * 8) + 10`.
  Dat meldt Google beoordelingen die niet bestaan → spambeleid, risico op handmatige
  maatregel. **Moet weg, ongeacht de rest van dit plan.**
- `datePublished` staat hardgecodeerd op `2026-01-15` voor élke VPN; de 8 land-`/best`-pagina's
  op `2026-01-01`.
- Alle JSON-LD-URL's gebruiken de apex `zerotovpn.com` terwijl canonicals `www` gebruiken —
  elke schema-URL wijst dus naar een 307.
- `verification.google` bevat nog letterlijk `"your-google-verification-code"`.

### 2.5 Canonicals en talen

- `/about` self-canonicaliseert in alle 9 talen naar de Engelse URL.
- De twee `/tools/`-pagina's canonicaliseren naar de apex én naar een `/en/`-pad dat onder
  `localePrefix: "as-needed"` niet bestaat.
- **Meta-descriptions zijn Engels op niet-Engelse pagina's** (titel wél vertaald).
  Dat raakt precies de talen met de beste CTR.
- Interne links in blogcontent zijn absolute Engelse URL's → een NL/DE/JA-lezer wordt naar
  de Engelse pagina gestuurd. 1.502 links wijzen naar de homepage.
- Dode linkdoelen in content: `/coupons` (10×), `/deals` (2×), `/countries/usa`.
- `getPostBySlug` valt terug op Engels als een vertaling ontbreekt, terwijl de pagina wel
  9 hreflangs claimt → Japanse URL met Engelse tekst.

### 2.6 Design

- **Er wordt geen enkel font geladen.** `--font-sans` is leeg, `next/font` wordt nergens
  geïmporteerd; de site rendert in de systeem-UI-font. Dat is exact wat de eigen
  `.claude/skills/frontend-aesthetics` in deze repo verbiedt.
- **78.807 regels over 133 paginabestanden** (~590/pagina). Er is een token-laag en een
  primitives-laag, maar **geen compositielaag**: geen `Section`, `Container`, `PageHero`.
  Elke pagina herhaalt met de hand dezelfde secties.
- `VpnCard` wordt **5×** gebruikt terwijl ~60 lijstpagina's hun eigen variant inline bouwen.
- ~2.850 hardgecodeerde kleur-utilities tegenover ~3.440 token-gebaseerde. Header en footer
  omzeilen de tokens volledig → een themawijziging bereikt ze niet.
- Toegankelijkheid: 7 `aria-label`s op de hele site, 0 `aria-expanded`/`aria-current`,
  geen skip-link, mega-menu niet met toetsenbord te sluiten.
- De FTC-disclosure in de footer haalt ~3,6:1 contrast (AA vereist 4,5:1).

### 2.7 Affiliate

- `AffiliateButton` (67 gebruiken, de hoofdroute) rendert een `<button>`, **geen `<a>`**:
  geen `href`, dus geen `rel="sponsored nofollow"`, niet te middenklikken of te kopiëren,
  onzichtbaar voor crawlers.
- **Geen enkele** `/best`, `/reviews`, `/countries` of `/compare`-pagina toont een
  disclosure bij de knoppen; alleen de footer en de juridische pagina's hebben er een.

---

## 3. Wat NIET verandert

Bewust buiten scope, om de blast radius klein te houden:

- De 9 talen en `localePrefix: "as-needed"`. De hreflang-opzet is correct (compleet incl.
  `x-default`) en blijft.
- URL-structuur van bestaande, gelinkte pagina's. Consolidatie gebeurt met 301's, niet met
  het verplaatsen van goede pagina's.
- Convex-koppeling voor nieuwsbrief en bezoekersreviews (wetry-sites-leads).
- De statische data-architectuur: posts als JSON in `src/data/posts`, VPN's in `vpns.json`.
- Vercel-deploy via push naar `main`.
- Tailwind v4 CSS-first (geen terugkeer naar een config-bestand).
- AdSense-plaatsingen.

---

## 4. Ontwerprichting

Volgens `.claude/skills/frontend-aesthetics`: één onderscheidend font, gecommitteerde kleur,
geen systeemfont, geen paarse gradiënten.

**Voorstel: "Instrument".** De site claimt onafhankelijk meten en testen; het design moet
dat uitstralen in plaats van de neon-cyber-look die elke VPN-affiliate heeft.

| Beslissing | Nu | Voorstel |
|---|---|---|
| Kopfont | systeem | **IBM Plex Sans** (600/700) |
| Bodyfont | systeem | **IBM Plex Sans** (400) |
| Cijfers/meetwaarden | systeem | **IBM Plex Mono** — snelheden, prijzen, scores, tabellen |
| Primair | oranje `oklch(0.65 0.22 45)` | **blijft** (merkherkenning) |
| Basis licht | wit | warm off-white |
| Basis donker | navy | **blijft** |
| Gradiënten | blur-orbs op home | ingetogen; nadruk op datadichtheid |

Mono voor meetwaarden is geen sier: `/compare` en `/countries` zijn tabellen met getallen,
en dat is precies waar de site nu al converteert.

Alternatieven als dit niet bevalt: **"Editorial"** (Fraunces-koppen op crèmepapier, groen
accent — leest als Wirecutter) of **"Obsidian"** (bijna-zwart, JetBrains Mono, elektrisch
groen — technischer, maar lijkt meer op de concurrentie).

---

## 5. Fasering, op volgorde van blast radius

### Fase 0 — Index-hygiëne · **destructief, vereist akkoord**

1. 68 duplicaat-slugs consolideren naar 25 onderwerpen: sterkste URL behouden (op basis van
   GSC-impressies), rest 301 naar de behouder, bestanden uit `src/data/posts` verwijderen.
2. `vpn-guide-tips-*`-clusters (47 slugs) terugbrengen naar 3 maandpagina's of geheel laten
   vervallen met 301 naar `/guides`.
3. 297 redirect-stubs uit de sitemap-generator weren.
4. `/compare`-sitemap beperken tot combinaties die daadwerkelijk gelinkt en gerenderd zijn.
5. Verzonnen `ratingCount` verwijderen; `datePublished` uit echte data halen.
6. Alle JSON-LD- en breadcrumb-URL's naar `www`.
7. `/about`- en `/tools`-canonicals repareren.
8. `verification.google`-placeholder verwijderen.
9. Dode linkdoelen in content repareren (`/coupons`, `/deals`, `/countries/usa`).

**Verificatie:** sitemap-telling voor/na, `curl` op elke geconsolideerde URL (verwacht 301),
en na een week GSC-dekkingsrapport vergelijken.

### Fase 1 — Fundament design

Fonts laden, `@layer components` met semantische klassen (`.section-*`, `.card`, `.btn-*`),
`Section`/`Container`/`PageHero`/`Prose`, header en footer op tokens, skip-link, aria op het
mega-menu, contrast van de disclosure repareren, `AffiliateButton` naar een echte `<a>` met
`rel="sponsored nofollow"`, herbruikbare `<AffiliateDisclosure>` boven elke CTA-groep.

### Fase 2 — Templates per paginatype

Getypeerd content-contract naar voorbeeld van `lib/intent-pages.ts` uit go2thailand:
quickAnswers → comparisonTable → decisionGuide → topPicks → faq → internalLinks.
Volgorde naar verdienpotentieel: **`/compare` en `/countries` eerst** (daar converteert de
site nu al), daarna `/best`, `/reviews`, `/blog`, `/guides`, tools, legal.

### Fase 3 — Engelse research en content

Per cluster eigen DataForSEO-research (volume, KD, SERP, concurrenten, echte PAA).
Runbook + tracker-JSON per paginafamilie met `done_definition[]` en `next_pending`, één spoke
per run. Bronvermelding als dataveld (`SourceMeta`), niet als decoratie.

### Fase 4 — Technisch fundament 8 overige talen

Vertaalde meta-descriptions, locale-bewuste interne links in blogcontent, hreflang alleen
claimen waar een vertaling bestaat, `getPostBySlug`-fallback afstemmen op de hreflang-claim.

### Fase 5 — QA per paginatype

Responsive, toegankelijkheid, interne links, canonical/hreflang, schema, performance,
contentkwaliteit. Gerenderde HTML scannen op lekken (oude prijzen, afgekapte titels,
placeholder-tekst) — niet alleen de broncode controleren.

---

## 6. Overgenomen uit go2thailand

Wat wél: designdoc + gefaseerd plan vóór uitvoering; semantische Tailwind-klassen in
`@layer components` in plaats van een componentbibliotheek; een getypeerd content-contract
tussen research en rendering; een globale hreflang/canonical-eigenaar; runbook + tracker-JSON
per paginafamilie; gerenderde-HTML-scan als poort; E-E-A-T als dataveld.

Wat niet: de methode heeft daar nog geen verkeer opgeleverd (2–14 kliks per week op ~3.400
URL's). We kopiëren de werkwijze, niet de aanname dat die zich al bewezen heeft. Het verschil
is dat zerotovpn al 130.000 impressies per kwartaal heeft — hier is de hefboom conversie van
bestaande zichtbaarheid, niet zichtbaarheid opbouwen.
