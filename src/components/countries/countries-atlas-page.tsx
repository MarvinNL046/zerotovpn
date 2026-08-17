import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Map,
  ShieldCheck,
} from "lucide-react";
import type { CountriesDirectoryCopy } from "@/data/countries-directory";
import { getIndexableLocalesForPath } from "@/lib/indexability";
import { CountriesDirectory } from "./countries-directory";
import styles from "./countries-directory.module.css";

const BASE_URL = "https://www.zerotovpn.com";

function localizedPath(locale: CountriesDirectoryCopy["locale"], path: string) {
  return `${locale === "nl" ? "/nl" : ""}${path}`;
}

function admittedPath(locale: CountriesDirectoryCopy["locale"], path: string) {
  const admittedLocales = getIndexableLocalesForPath(path) ?? [];
  if (admittedLocales.includes(locale)) return localizedPath(locale, path);
  if (admittedLocales.includes("en")) return path;
  return null;
}

function CountriesJsonLd({ copy }: { copy: CountriesDirectoryCopy }) {
  const pageUrl = `${BASE_URL}${localizedPath(copy.locale, "/countries")}`;
  const homeUrl = `${BASE_URL}${localizedPath(copy.locale, "") || "/"}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: copy.locale,
        mainEntity: { "@id": `${pageUrl}#country-guides` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#country-guides`,
        name: copy.directory.title,
        itemListOrder: "https://schema.org/ItemListUnordered",
        numberOfItems: copy.entries.length,
        itemListElement: copy.entries.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.name,
          url: `${BASE_URL}${localizedPath(entry.routeLocale, `/countries/${entry.slug}`)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumb.home,
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumb.countries,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export function CountriesAtlasPage({ copy }: { copy: CountriesDirectoryCopy }) {
  const travelGuideHref = admittedPath(copy.locale, "/guides/vpn-for-travel");

  return (
    <article className={styles.page}>
      <CountriesJsonLd copy={copy} />

      <div className={styles.container}>
        <nav
          className={styles.breadcrumb}
          aria-label={copy.locale === "nl" ? "Broodkruimelpad" : "Breadcrumb"}
        >
          <Link href={localizedPath(copy.locale, "") || "/"}>
            {copy.breadcrumb.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.breadcrumb.countries}</span>
        </nav>
      </div>

      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            <p className={styles.directAnswer}>{copy.hero.directAnswer}</p>
            <ul className={styles.cueList}>
              {copy.hero.cues.map((cue) => (
                <li key={cue}>
                  <CheckCircle2 aria-hidden="true" />
                  {cue}
                </li>
              ))}
            </ul>
          </div>

          <aside
            className={styles.checkPanel}
            aria-label={copy.hero.panelLabel}
          >
            <p className={styles.panelLabel}>{copy.hero.panelLabel}</p>
            <h2>{copy.hero.panelTitle}</h2>
            <ol>
              {copy.hero.steps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <div className={`${styles.container} ${styles.metrics}`}>
          {copy.hero.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </header>

      <section className={styles.boundary}>
        <div className={`${styles.container} ${styles.boundaryInner}`}>
          <span className={styles.boundaryIcon}>
            <ShieldCheck aria-hidden="true" />
          </span>
          <div>
            <p className={styles.eyebrow}>{copy.boundary.eyebrow}</p>
            <h2>{copy.boundary.title}</h2>
            <p>{copy.boundary.body}</p>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <CountriesDirectory
          locale={copy.locale}
          directory={copy.directory}
          entries={copy.entries}
        />
      </div>

      <section className={styles.methodSection}>
        <div className={`${styles.container} ${styles.methodGrid}`}>
          <div className={styles.methodIntro}>
            <p className={styles.eyebrow}>{copy.method.eyebrow}</p>
            <h2>{copy.method.title}</h2>
            <p>{copy.method.intro}</p>
            <Link href={localizedPath(copy.locale, "/methodology")}>
              <ClipboardCheck aria-hidden="true" />
              {copy.method.methodologyLabel}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.methodItems}>
            {copy.method.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.checklist}`}>
        <div className={styles.checklistCopy}>
          <p className={styles.eyebrow}>{copy.checklist.eyebrow}</p>
          <h2>{copy.checklist.title}</h2>
          <p>{copy.checklist.body}</p>
          {travelGuideHref ? (
            <Link href={travelGuideHref}>
              {copy.checklist.travelGuideLabel}
              <ExternalLink aria-hidden="true" />
            </Link>
          ) : null}
        </div>
        <ul>
          {copy.checklist.items.map((item) => (
            <li key={item}>
              <span>
                <CheckCircle2 aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.container}>
          <div className={styles.faqHeading}>
            <Map aria-hidden="true" />
            <div>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>{copy.faq.title}</h2>
            </div>
          </div>
          <div className={styles.faqGrid}>
            {copy.faq.items.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
