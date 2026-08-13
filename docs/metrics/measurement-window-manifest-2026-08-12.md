# Measurement window manifest — 12 August 2026

This manifest is the source-of-truth join contract for the current 14-day review window: **28 July–10 August 2026**.

- Search Console Pages, Queries and the authoritative daily Chart export are real authenticated exports and pass header/size validation.
- Short.io is a real API export for the same dates. Its wildcard/deleted residual stays explicitly unassigned rather than being guessed back onto pages.
- The export now includes a separate ignored `popular-paths.csv` diagnostic file. It improves reconciliation visibility but does not turn wildcard/path-level scores into page attribution.
- A dated Nord partner export now covers **28 July–10 August** and includes clicks, conversions, payout, date and EPC. Its offer rows (`Cyber 3y deal`, `Default`) do not expose the shared Short.io slug or page-level sub-ID, so it is a matched aggregate input rather than page attribution. New Nord clicks now carry a deterministic public-page `aff_sub`; the next export must confirm that field.

The machine-readable version is [measurement-window-manifest-2026-08-12.json](./measurement-window-manifest-2026-08-12.json). Both the input checker and importer reject partner rows outside the declared window. The conversion gate is now `matched: true` and `ready: true`; the remaining open requirement is an attribution field that joins Nord outcomes to Short.io/page slugs before page-level KPI decisions are made.
