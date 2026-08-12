# Measurement window manifest — 12 August 2026

This manifest is the source-of-truth join contract for the current 14-day review window: **28 July–10 August 2026**.

- Search Console Pages, Queries and the authoritative daily Chart export are real authenticated exports and pass header/size validation.
- Short.io is a real API export for the same dates. Its wildcard/deleted residual stays explicitly unassigned rather than being guessed back onto pages.
- The Nord affiliate screenshot covers **6–12 August**, so it is useful as an interim observation but is not a matched partner export for this window.

The machine-readable version is [measurement-window-manifest-2026-08-12.json](./measurement-window-manifest-2026-08-12.json). Both the input checker and importer reject partner rows outside the declared window. The conversion gate remains `matched: false` and `ready: false` until a downloadable Nord export for the same window provides clicks, conversions, payout/revenue and EPC.
