# Localized blog pagination smoke — 12 August 2026

- Commit: `2ac9b1e` (`fix: localize blog pagination labels`)
- Production deployment: `dpl_6L6YosrPQjWDwZYa8ukoz85asiKa`

Chrome/Playwright checks at 390px confirmed that the pagination labels are localized and remain crawl-safe:

| Route | Pagination text | Robots | H1 | Overflow |
| --- | --- | --- | ---: | --- |
| `/es/blog?page=2` | `Anterior / Página 2 de 11 / Siguiente` | `noindex, follow` | 1 | none |
| `/nl/blog?page=2` | `Vorige / Pagina 2 van 11 / Volgende` | `noindex, follow` | 1 | none |
| `/de/blog?page=2` | `Zurück / Seite 2 von 11 / Weiter` | `noindex, follow` | 1 | none |

The production editorial gate passed **22/22** after the deploy; affiliate rel/slug, disclosure, metadata, image, freshness and cluster-link checks remain clean. The exit-intent popup was not changed and remains newsletter-only.
