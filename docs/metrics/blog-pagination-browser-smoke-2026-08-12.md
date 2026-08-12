# Blog pagination browser smoke — 12 August 2026

## Release

- Commit: `2319f0d` (`perf: paginate blog index`)
- Production deployment: `dpl_7xMCUNm16n4gMbJFWWbwf6z5ehc5`
- URL: https://www.zerotovpn.com/es/blog
- Status: Ready; production aliases updated.

## Before/after signal

The Spanish blog index previously rendered roughly 2.73 MB of HTML and about 498 article cards in one response. The new index renders one featured article plus 24 recent-post slots per page. The live page response measured about 678 KB, with the remaining articles available through query pagination.

## Live checks

Using Chrome/Playwright at a 390px viewport:

| URL | HTTP | H1 | Cards | Robots | Overflow |
| --- | ---: | ---: | ---: | --- | --- |
| `/es/blog` | 200 | 1 | 23 | `index, follow` | none (`390px / 390px`) |
| `/es/blog?page=2` | 200 | 1 | 24 | `noindex, follow` | none (`390px / 390px`) |

The canonical `/es/blog` remains indexable and the pagination variants are excluded from indexing while remaining crawlable. The canonical blog route is still present in the generated static sitemap route set (90 locale routes). Two console 403s came from an external advertising endpoint and were excluded from the site-error result.

The production editorial gate also passed **22/22** after this deploy: 123 affiliate links, zero missing `sponsored nofollow`, zero missing disclosure, zero cluster-link, metadata, image or freshness failures. The exit-intent popup remains enabled for first-party newsletter collection only.
