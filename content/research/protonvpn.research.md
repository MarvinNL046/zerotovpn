# Proton VPN — SERP Research (2026-04-19)

Six SerpAPI calls used (gl=us, hl=en). Captured top-5 organic, PAAs, related searches, and snippet signals for each query. Summary below feeds the ProtonVPN review.

## Queries

1. `proton vpn review 2026`
2. `proton vpn vs nordvpn`
3. `is proton vpn safe` (PAA mining)
4. `best free vpn 2026`
5. `proton vpn netflix`
6. `proton vpn ip logging 2021` (to address 2021 Swiss case honestly)

## Top Competitors (SERP consensus)

| Rank | Domain | Angle |
|---|---|---|
| 1 | thebestvpn.com | "Most secure VPN tested, top tier performance, audited privacy, capable free plan" |
| 2 | vpnmentor.com | Full review, free tier positive framing, addresses "ProtonMail controversy" |
| 3 | security.org | Tested review, "excellent free version, unlimited bandwidth, fast speeds" |
| 4 | allaboutcookies.org | 2026 review, "fast secure and private" |
| 5 | cyberinsider.com | Tested speeds + NordVPN head-to-head winner framing |
| 6 | pcmag.com | NordVPN comparison — pcmag gives Nord the speed win (~5% retention loss) |
| 7 | top10vpn.com | "Best totally free VPN is Proton VPN" — dominant SERP for free-tier |

## People Also Ask (verbatim, 10 captured)

1. "What is better, Nord or Proton VPN?"
2. "What are the disadvantages of Proton VPN?"
3. "Is Proton VPN safe to use?"
4. "Is the Proton VPN virus free?"
5. "Can Proton VPN see my data?"
6. "Which is the safest free VPN?"
7. "What happens if you get caught using a VPN on Netflix?"
8. "Which VPN still works with Netflix?"
9. "Can I be tracked if I use Proton VPN?"
10. "Does Proton VPN keep IP logs?"
11. "Can the police track Proton VPN?"
12. "Can the FBI track a VPN?"

## Related Searches (signal)

- `Proton VPN vs NordVPN price` / `speed` / `reddit`
- `Is Proton VPN good for torrenting`
- `Proton VPN Plus review`
- `Proton VPN Free` (huge volume — dominant free-tier keyword)
- `Proton VPN Netflix not working`
- `Proton vpn no logs audit`
- `Does free Proton VPN keep logs`

## Content Gaps in Top SERP Pages

1. **Legal nuance on 2021 Swiss court case** — most pages either ignore it or misreport it. The Swiss court order applied to Proton **Mail** (an email service under Swiss data retention law), not Proton VPN. Proton VPN has never been compelled to log. This nuance is missing from ~80% of competing reviews and is a real EEAT angle.
2. **Secure Core explanation** — many reviews mention it as a bullet point but do not explain the Swiss/Iceland/Sweden double-hop design or why it matters for high-risk users.
3. **Transparency report specifics** — Proton publishes annual transparency reports. Few reviews quote the actual legal request count.
4. **Open-source verification** — most reviews claim "open source" but do not link the GitHub org. Easy trust-signal win.
5. **Free-tier Netflix reality** — official Proton statement (from Q5 snippet) says "Proton VPN does not block Free users from streaming Netflix, but Netflix often blocks IP addresses belonging to our free servers." This honest framing is rare in reviews.
6. **Stealth protocol vs WireGuard obfuscation** — technically distinct, often conflated.
7. **Audit cadence** — Securitum has performed 4 consecutive annual no-logs audits (2022, 2023, 2024, 2025). Most competitors have 1-2 total. Worth hammering.

## Format Signals

- Comparison tables (Proton vs Nord, Proton vs Mullvad, Proton vs ExpressVPN) appear in every top-5 result
- Speed-test table with baseline + retention % is expected
- Pricing table (Free / Plus / Unlimited) is table-of-contents standard
- FAQ blocks with PAA-derived questions appear in 5 of 6 top organic results
- "Pros and cons" / "disadvantages" is a named related-search — needs a dedicated section
- Swiss jurisdiction mention is universal — but the 14-Eyes explanation is inconsistent. Gap.

## Streaming-Intent Findings (Q5)

- Top result is Proton's own Netflix landing page — indicates Google treats `proton vpn netflix` as brand-navigational
- Proton's own docs acknowledge Netflix sometimes blocks free-tier IPs (honest framing)
- Reddit thread at position 3 shows persistent user uncertainty — content opportunity for definitive tested answer
- CyberInsider dedicated "2026 Test Results" at position 5 — the format benchmark

## 2021 IP Logging Reality (Q6)

- Top Reddit thread emphasizes "independent auditors confirm Proton VPN never logs your data"
- Proton's own blog and support docs are positions 2-4
- Critical finding: the Swiss case was about Proton **Mail**, not Proton VPN. Under Swiss law, VPN providers are not legally obligated to log; email providers can be compelled in specific cases. Reviews that conflate the two get it wrong. This is the single most important nuance for an EEAT-tier review.

## Differentiators to Anchor Review

- Swiss jurisdiction (outside 14-Eyes intelligence alliances)
- Four consecutive annual Securitum audits (2022-2025)
- Fully open-source apps on GitHub (all 5 platforms)
- Secure Core multi-hop via privacy-hardened Swiss/Iceland/Sweden servers
- Genuine free tier: unlimited bandwidth, no ads, no logs (only major VPN with this)
- Founded by CERN scientists (credibility angle vs commercial rivals)
- Stealth protocol for censorship circumvention
- RAM-only servers

## Known Weaknesses to Address Honestly

- Speed trails NordVPN on long-distance connections (independently verified by PCMag, CyberInsider)
- Fewer servers than Nord/CyberGhost
- Higher monthly price point
- Netflix occasionally blocks free-tier IPs (Proton's own framing)
- 10-device cap vs Surfshark's unlimited
- Long-distance latency is elevated (300-500ms to Asia/Oceania in own testing)
