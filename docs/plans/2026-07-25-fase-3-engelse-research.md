# Fase 3 — Engelse keyword-, SERP- en PAA-research

Datum: 25 juli 2026
Bronnen: Google Search Console (25 apr – 22 jul 2026), DataForSEO (keyword
difficulty, keyword ideas, live SERP met PAA en AI Overview)

---

## Samenvatting

De aanname onder fase 3 was dat de Engelse pagina's betere keywords en meer
PAA-dekking nodig hebben. De data zegt iets anders, en het is ongemakkelijker:

1. De site heeft **vertoningen zonder klikken**, en dat komt niet door slechte
   titels maar doordat hij rangschikt op zoekopdrachten die vrijwel niemand
   intikt.
2. De lijstpagina's staan voor hun eigen kernterm rond **positie 36 tot 57**.
   Ze concurreren niet; ze staan op pagina 4 tot 6.
3. De keyword-difficulty die DataForSEO teruggeeft is voor dit onderwerp
   **niet bruikbaar als opportuniteitsmaat**. "best vpn for torrenting" krijgt
   KD 2, maar pagina 1 bestaat uit Reddit, RTINGS, Security.org, PCWorld en
   een AI Overview. Dat is geen KD 2 in de praktijk.

Wat hieruit volgt staat onderaan bij *Wat ik zou doen*.

---

## 1. Wat Google Search Console laat zien

Over drie maanden, hele site: ongeveer 200 klikken. De tien grootste pagina's:

| Pagina | Vertoningen | Klikken | CTR | Positie |
|---|---:|---:|---:|---:|
| /blog/best-vpn-for-iran-…censorship | 11.890 | 20 | 0,17% | 8,9 |
| /blog/best-vpn-for-iran-…censorship-2026-02 | 6.614 | 14 | 0,21% | 10,4 |
| /blog/best-free-vpn-reddit-2026 | 6.110 | 4 | 0,07% | 9,5 |
| /countries/russia | 3.579 | 10 | 0,28% | 22,2 |
| /fr/best/free-vpn | 3.579 | 5 | 0,14% | 22,2 |
| /blog/best-vpn-for-telegram-2026 | 3.228 | 6 | 0,19% | 9,7 |
| /best/best-vpn | 3.214 | 2 | 0,06% | 52,2 |
| /countries/iran | 3.032 | 14 | 0,46% | 13,6 |
| /best/vpn-android | 2.888 | 3 | 0,10% | 55,4 |
| /best/vpn-chromebook | 1.857 | 3 | 0,16% | 36,1 |

### Waarom de CTR zo laag is

Op het eerste gezicht: positie 8,9 met 0,17% CTR is absurd — daar hoort 2 tot
3% bij. Dat lijkt een titel- en beschrijvingsprobleem.

Het is het niet. De zoekopdrachten achter die 11.890 vertoningen zien er zo uit:

- "best dns servers to bypass iran internet censorship 2026" — 2 vertoningen
- "best hysteria2 config for iran censorship 2026" — 1 vertoning
- "best free ways to bypass internet censorship in iran 2026" — 8 vertoningen
- "best free wireguard configs for iran 2026" — 2 vertoningen

Honderden varianten van elk één tot negen vertoningen, allemaal nul klikken.
De "gemiddelde positie 8,9" is een gemiddelde over ruis. De pagina rangschikt
nergens op iets met volume; hij rangschikt overal op niets.

Dat is een wezenlijk ander probleem dan een slechte titel, en het zou met
alleen titeloptimalisatie niet opgelost zijn.

### Cannibalisatie leeft nog

`/blog/best-vpn-for-iran-2026-bypass-internet-censorship` en dezelfde slug met
achtervoegsel `-2026-02` staan er allebei, samen 18.504 vertoningen. Daarnaast
bestaan `/countries/iran` en `/best/vpn-iran`. Vier pagina's op één onderwerp.

---

## 2. Keyword-difficulty per cluster

Uit DataForSEO (Verenigde Staten, Engels):

| Kernterm | KD | Huidige positie |
|---|---:|---:|
| best vpn for torrenting | 2 | — |
| best vpn for russia | 5 | ~18 (/best/vpn-russia) |
| best vpn for chromebook | 6 | 36 |
| best vpn for china | 13 | — |
| best free vpn | 20 | ~22 (fr) |
| best vpn for iphone | 24 | — |
| best vpn for netflix | 32 | — |
| cheapest vpn | 32 | — |
| best vpn for firestick | 33 | — |
| best vpn for gaming | 36 | 57 |
| fastest vpn | 47 | — |
| best vpn for privacy | 52 | — |
| best vpn for android | 62 | 55 |

### Waarom deze cijfers misleiden

Ik heb de SERP voor de laagste (`best vpn for torrenting`, KD 2) opgehaald.
Pagina 1 ziet er zo uit:

1. Reddit (r/VPNReviewHub, 90+ reacties)
2. thebestvpn.com
3. rtings.com
4. top50vpn.com
5. **AI Overview** met zes bronnen
6. People Also Ask
7. YouTube
8. security.org
9. Perspectives (Reddit, CNET)
10. YouTube
11. privacyjournal.net

Geen enkele nieuwkomer. Bijna alles is een gevestigde uitgever, Reddit of
video. De AI Overview staat op de vijfde plek en beantwoordt de vraag al
volledig, inclusief prijzen en aanbevelingen.

Dat verklaart de lage CTR beter dan welke titel dan ook: zelfs op positie 5
kijkt de gebruiker eerst naar een AI-samenvatting die het antwoord geeft.

**KD 2 betekent hier "weinig backlinks nodig", niet "makkelijk te winnen".**
Voor deze niche is dat cijfer geen bruikbare prioriteringsmaat. De sitecontext
uit de eerdere audit (DR 0, 100% spam-backlinks) maakt dat concreet: het
knelpunt is autoriteit, niet keyword-keuze.

---

## 3. Echte PAA — cluster torrenting

Live opgehaald, niet verzonnen:

1. Is NordVPN bad for torrenting?
2. Are VPNs worth it for torrenting?
3. Which VPN is fastest for torrenting?
4. Why avoid NordVPN?
5. What is the safest VPN for torrenting?

Bijbehorende gerelateerde zoekopdrachten:

- best vpn for torrenting reddit
- best vpn for torrenting free
- best vpn for torrenting **port forwarding**
- best vpn for torrenting r/piracy
- NordVPN for torrenting
- Proton VPN for torrenting

### Wat hier opvalt

Twee van de vijf PAA-vragen zijn **kritisch op NordVPN** ("Is NordVPN bad…",
"Why avoid NordVPN?"). De site zet NordVPN overal op één. Een pagina die die
vraag eerlijk beantwoordt — inclusief waar NordVPN tekortschiet — sluit aan bij
wat mensen echt vragen, en onderscheidt zich van de tien pagina's die allemaal
"1. NordVPN" zeggen.

**Port forwarding** komt terug in zowel de AI Overview als de gerelateerde
zoekopdrachten, en is een echt onderscheid: Proton en PIA bieden het, NordVPN
niet. Dat is een concreet, verifieerbaar onderwerp waarop de site inhoudelijk
kan winnen zonder autoriteit nodig te hebben.

De AI Overview noemt overigens Surfshark op "around $2.49/month" — precies de
prijs die vorige week is rechtgezet. Voor NordVPN noemt Google $3.49 waar wij
$3.09 hebben; dat verschil is het nakijken waard.

---

## 4. Wat ik zou doen

Op volgorde van verwachte opbrengst, niet van moeite.

### a. Eerst de cannibalisatie afmaken (klein, meetbaar)

Vier Iran-pagina's samenvoegen tot één. De dubbele blogpost met `-2026-02`
heeft 6.614 vertoningen die nu tegen de hoofdpagina in werken. Dit is de enige
ingreep in dit document waarvan het effect binnen weken zichtbaar is.

### b. Niet inzetten op de kernterm-clusters

`best vpn for android` (KD 62, huidige positie 55) en `best vpn for privacy`
(KD 52) zijn met DR 0 niet te winnen. Elke uur die daarin gaat zitten is
verloren. Hetzelfde geldt voor `fastest vpn` en `best free vpn`.

### c. Wel inzetten op waar de site al wint

De `/compare`-pagina's staan op **positie 4 tot 11** met een CTR tot 17%:

| Pagina | Positie | CTR |
|---|---:|---:|
| /fr/compare/protonvpn-vs-astrill | 4,4 | 17,6% |
| /compare/protonvpn-vs-ovpn | 4,8 | 25% |
| /compare/protonvpn-vs-hma | 5,1 | 2,8% |
| /compare/protonvpn-vs-astrill | 5,9 | 3,3% |
| /compare/airvpn-vs-ivpn | 7,5 | 2,9% |

Weinig volume per stuk, maar dit is het enige paginatype waar de site
daadwerkelijk rangschikt én klikken krijgt. Negen vergelijkingen staan nu in de
sitemap. Uitbreiden naar de combinaties die mensen echt zoeken (`ivpn vs
mullvad`, `proton vs airvpn` staan al in GSC met vertoningen) is de meest
directe hefboom.

### d. Inhoudelijke niches waar autoriteit minder telt

Uit de PAA en gerelateerde zoekopdrachten, met een concreet en verifieerbaar
antwoord:

- port forwarding per VPN (wie biedt het, wie niet)
- "why avoid NordVPN" — een eerlijk stuk over de beperkingen
- VPN's met een echte gratis proefperiode (`vpns with free trials`:
  12.100 zoekopdrachten per maand, KD 3, CPC $17,24)

Die laatste is de duidelijkste gemiste kans die ik in de data zag: er is geen
pagina voor, het volume is reëel en de commerciële waarde is hoog.

---

## Wat dit document niet bevat

Ik heb de SERP en PAA voor **één** cluster live opgehaald (torrenting) en
keyword-difficulty voor dertien kerntermen. Een volledige PAA-uitvraag over
alle twaalf clusters is nog een reeks DataForSEO-aanroepen; dat is zinvol zodra
besloten is welke clusters aandacht krijgen — en op grond van het bovenstaande
zijn dat er minder dan twaalf.

Zoekvolume per kernterm ontbreekt: de volume-endpoints gaven voor deze termen
niets terug. De cijfers die er wel zijn komen uit keyword-ideas en staan
hierboven met bron vermeld.

---

## Naschrift, 25 juli — de land-duplicaten zijn geen duplicaten

Bij het samenvoegen van de tien landen die zowel `/best/vpn-X` als
`/countries/X` hebben, bleek de aanname onder deze hele exercitie fout.

### Wat ik verwachtte

Twee pagina's over hetzelfde land, dus één is overbodig. Kies de sterkste op
Search Console, leid de andere om, klaar. Zo is Iran gedaan.

### Wat het werkelijk is

Het zijn twee verschillende invalshoeken die toevallig hetzelfde land delen:

- `/countries/X` — de situatie in het land: juridische status, censuur,
  blackouts, wat er geblokkeerd is
- `/best/vpn-X` — de keuzegids: aanbieders, streamingdiensten, vergelijking

Ze concurreren in de zoekresultaten, maar de inhoud overlapt nauwelijks. Een
telling van onderwerpen die alléén op de te verwijderen pagina staan:

| Land | Uniek op `/best/vpn-X` | Op `/countries/X` |
|---|---|---:|
| india | JioHotstar (63 vermeldingen) | 0 |
| russia | Meduza, Radio Free Europe, geblokkeerde nieuwssites | 0 |
| thailand | Netflix (27), Disney+ (9), streaming (65) | 0 |
| vietnam | streaming (57) | 0 |
| china | NoBorders, Lightway, niet-werkende gratis VPN's | 0 |

De blijvende pagina dekt in **geen enkel** geval die onderwerpen. Omleiden zou
dus geen duplicaat opruimen maar inhoud vernietigen.

### Wat dat betekent voor Iran, dat al gedaan is

Ook daar is inhoud verdwenen, al minder dramatisch. De verwijderde pagina had
mirror-downloadsites (in vier talen), een uitleg over deep packet inspection
(27 vermeldingen) en specifieke instructies voor Gmail en Skype. En de dekking
van de apps waar het in Iran om draait is dunner geworden:

| | verwijderde pagina | blijvende pagina |
|---|---:|---:|
| Instagram | 49 | 10 |
| Telegram | 58 | 10 |
| WhatsApp | 58 | 10 |

De blijvende pagina noemt ze nog wel, maar oppervlakkiger. De redirect zelf is
juist — `/countries/iran` is met 3.032 vertoningen en 14 klikken duidelijk de
sterkere URL — maar de inhoud had eerst overgezet moeten worden.

### Wat er dan wél moet gebeuren

Per land één samenvoeging op inhoud, niet op URL:

1. Bepaal de blijvende URL op Search Console-data (staat hieronder).
2. Zet de unieke secties van de andere pagina over.
3. Pas daarna verwijderen en omleiden.

Dat zijn negen redactionele klussen, geen negen redirects. De richting per land,
op vertoningen @ positie (25 apr – 22 jul 2026):

| Land | `/countries/X` | `/best/vpn-X` | Blijft |
|---|---|---|---|
| russia | 3579 @22,2 — 10 klikken | 291 @18,5 — 2 | countries |
| turkey | 632 @28,4 | 257 @11,7 | countries (volume) |
| china | 143 @44,2 | 35 @40,9 | countries |
| india | 79 @40,5 | niet in GSC | countries |
| vietnam | 66 @9,2 | 37 @56,4 | countries |
| thailand | 50 @22,6 | 36 @57,5 | countries |
| uae | 38 @30,0 | 349 @57,8 | best (volume) |
| indonesia | 65 @13,9 | 662 @14,4 | best |
| japan | 11 @59,1 | 244 @52,8 | best |

Bij indonesia, japan en uae wijst de data naar `/best/vpn-X`. Dat botst met de
landen-hub, die 22 statische plus 36 dynamische landen onder `/countries/`
heeft. Die drie horen op termijn ook naar `/countries/` — maar dan pas ná het
overzetten van de inhoud, want daar zit de rijkste tekst.
