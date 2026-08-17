# English visual screenshot routine

Every rendered UI change must be checked with screenshots of the canonical
English route. English is locale-less on ZeroToVPN, so `/reviews/nordvpn` is a
valid capture target while `/en/reviews/nordvpn` and `/nl/reviews/nordvpn` are
not.

Run:

```bash
npm run qa:screenshots -- /compare/nordvpn-vs-surfshark
```

You may pass a localized route while reviewing it. The routine follows its
English `hreflang` locally and then fails unless the final page is English,
locale-less, HTTP 200, self-canonical, contains one H1, and has no page-level
horizontal overflow or runtime error overlay:

```bash
npm run qa:screenshots -- /nl/compare/nordvpn-vs-surfshark
```

Multiple routes are supported:

```bash
npm run qa:screenshots -- / /reviews/nordvpn /compare/nordvpn-vs-surfshark
```

The default server is `http://127.0.0.1:3001`. Override it when needed:

```bash
npm run qa:screenshots -- /reviews/nordvpn --base-url=http://127.0.0.1:3000
```

For every route the routine saves four image files under
`artifacts/visual-qa/`. Viewport captures use compact WebP; full-page captures
use PNG because long editorial pages can exceed WebP's maximum image height:

- desktop 1440×1000 viewport;
- desktop full page;
- mobile 390×844 viewport;
- mobile full page.

Long full pages are captured in bounded vertical tiles and stitched into one
lossless PNG. This avoids Chromium's rendering limit on pages taller than
16,384 pixels.

It also writes `manifest.json` with the resolved English route, canonical URL,
viewport, file hashes, masking count, browser errors, and QA assertions.

After generation, inspect all four screenshots. Pay particular attention to
overflow, clipped text, unreadable contrast, broken images, sticky or fixed UI
covering content, and the visual rhythm from hero through footer.

## Privacy

Generated screenshots are local QA artifacts and are ignored by Git. Never
capture visitor IPs, account details, email addresses, checkout information,
tokens, or personalized data. Add `data-screenshot-sensitive` to any rendered
element containing such data; the routine masks it automatically.
