# NordVPN affiliate asset inventory

**Source:** `C:\Users\M_Smi\Downloads` ZIP exports received 10 August 2026  
**Project:** `C:\Projecten\zerotovpn`

The 29 NordVPN ZIP archives are now copied locally to:

`C:\Projecten\zerotovpn\assets\affiliate-source\zips`

They are extracted to:

`C:\Projecten\zerotovpn\assets\affiliate-source\extracted`

The source archive is intentionally ignored by Git. Current copy size is approximately 10.21 GB and contains 2,459 extracted files. Website code should reference approved derivatives under `public/affiliate/nordvpn/`, not the ignored source archive.

## Handling decision

The downloaded package is a source library, not something to copy wholesale into the Next.js repository. The ZIPs contain several gigabytes of video and hundreds of localized images. We should copy only the exact assets used by a page, convert/resize them for the web, and keep the original ZIPs outside Git as the source archive.

## Campaign assets

| Package | Contents | Intended use | Guardrail |
|---|---:|---|---|
| NordVPN Global Deal (ex.IT&CH) | 218 PNG | Global campaign creative | Do not use for Italy or Switzerland; verify campaign dates before publishing |
| NordVPN Italy Banners | 14 PNG | Italy-only campaign | Geo-target Italy and Italian pages only; campaign window 29 Jul–9 Sep 2026 |
| NordVPN Switzerland Twint | 28 PNG | Switzerland/TWINT campaign | Geo-target Switzerland and eligible language pages only; campaign window 29 Jul–9 Sep 2026 |
| Generic | 267 JPG/PNG | Evergreen brand/feature creative | Use only when the offer and geography are clear; no unassigned coupon copy |
| Coupons | 162 PNG | Campaign coupon creatives | Never place globally without checking the exact offer, dates and location rules |

The newly added companion packages are also available locally:

| Package | Contents | Intended use |
|---|---:|---|
| App visuals | app UI visuals | Product/device pages after selecting exact screenshots |
| Videos | short-form video assets | Optional review or social embeds; keep video out of the initial Git commit |
| Product images | product/lifestyle imagery | Selected hero/supporting visuals after rights and dimensions review |
| Banners | campaign/banner creatives | Only through the same campaign and geo rules as the source offer |
| Logos | provider logos | Brand-safe provider/review components |
| Mockups | device mockups | Device guides and editorial illustrations |

## Editorial and educational assets

| Package | Contents | Good first destination |
|---|---:|---|
| What is a VPN and how it works — EN | 6 MP4 | `/guides/what-is-vpn` |
| What is NordVPN — localizations | 50 MP4 | `/reviews/nordvpn` or a clearly labelled provider explainer |
| Features | 23 MP4/MOV | Provider review feature sections; use a poster image and lazy loading |
| Application Usage | 72 MP4 | Device/platform guides after selecting relevant clips |
| Screenshots | 251 PNG + PDF | Device guides and evidence sections |
| Lifestyle images | 670 PNG | Selective page hero/supporting imagery; do not bulk-import |
| Apple tvOS | 6 PNG | Apple TV section if the product claims are still current |
| French / German / Italian | 55 MP4 | Only on matching locale pages; confirm transcript and localization quality |

## Infographic assets

The password, stolen-data, online-shopping, business-security and Google-data packages contain localized PNG/SVG infographics. They can support informational articles, but each image needs:

- a useful HTML text equivalent;
- descriptive alt text;
- a source/rights note where required;
- a page that genuinely matches the infographic topic;
- no affiliate CTA on unrelated or restricted content.

## Proposed project staging structure

Keep originals outside Git and copy approved web derivatives into:

```text
public/affiliate/nordvpn/
  global/
  it/
  ch-twint/
  generic/
  editorial/
```

Use content metadata rather than filenames alone:

```ts
{
  asset: "/affiliate/nordvpn/global/en-us/...png",
  campaign: "global-deal-2026-07-29",
  locales: ["en"],
  includedMarkets: ["US"],
  excludedMarkets: ["IT", "CH"],
  validUntil: "2026-10-21",
  offerId: 15,
  disclosureRequired: true
}
```

The `includedMarkets` example above is illustrative; it must be filled from the campaign’s actual targeting rules before publication. The affiliate dashboard’s 232 included locations describe Offer 15 eligibility, not a public NordVPN server-count claim.

## Next asset pass

1. Select one English global banner and one neutral NordVPN review video.
2. Confirm dimensions, file size, alt text, campaign dates and market restrictions.
3. Add them to the NordVPN review only, with a visible affiliate disclosure.
4. Add localized assets later to matching locale routes.
5. Keep regional banners out of the global homepage and generic popups.
