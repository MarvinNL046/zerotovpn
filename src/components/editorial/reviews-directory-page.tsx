import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { ReviewsDirectory } from "@/components/reviews/reviews-directory";
import type { ReviewsDirectoryCopy } from "@/data/reviews-directory";
import styles from "@/components/reviews/reviews-directory.module.css";

const BASE_URL = "https://www.zerotovpn.com";

function localizedPath(locale: ReviewsDirectoryCopy["locale"], path: string) {
  return `${locale === "nl" ? "/nl" : ""}${path}`;
}

function JsonLd({ copy }: { copy: ReviewsDirectoryCopy }) {
  const pageUrl = `${BASE_URL}${localizedPath(copy.locale, "/reviews")}`;
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
        mainEntity: { "@id": `${pageUrl}#reviews` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#reviews`,
        name: copy.hero.title,
        itemListOrder: "https://schema.org/ItemListUnordered",
        numberOfItems: copy.entries.length,
        itemListElement: copy.entries.map((entry, index) => {
          const useDutch =
            copy.locale === "nl" && entry.languages.includes("nl");
          return {
            "@type": "ListItem",
            position: index + 1,
            name: entry.name,
            url: `${BASE_URL}${useDutch ? "/nl" : ""}/reviews/${entry.slug}`,
          };
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumb.home,
            item: `${BASE_URL}${localizedPath(copy.locale, "") || "/"}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumb.reviews,
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

export function ReviewsDirectoryPage({ copy }: { copy: ReviewsDirectoryCopy }) {
  return (
    <article className={styles.page}>
      <JsonLd copy={copy} />

      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={localizedPath(copy.locale, "") || "/"}>
            {copy.breadcrumb.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.breadcrumb.reviews}</span>
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

          <aside className={styles.ledger} aria-label={copy.hero.ledgerTitle}>
            <p className={styles.ledgerTitle}>{copy.hero.ledgerTitle}</p>
            <div className={styles.ledgerGrid}>
              {copy.hero.ledger.map((item) => (
                <div
                  className={styles.ledgerItem}
                  data-tone={item.tone}
                  key={item.label}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </header>

      <div className={styles.container}>
        <ReviewsDirectory
          locale={copy.locale}
          directory={copy.directory}
          entries={copy.entries}
        />
      </div>

      <section className={styles.boundary}>
        <div className={`${styles.container} ${styles.boundaryGrid}`}>
          <div className={styles.boundaryCopy}>
            <p className={styles.eyebrow}>{copy.boundary.eyebrow}</p>
            <h2>{copy.boundary.title}</h2>
            <p>{copy.boundary.intro}</p>
            <Link
              className={styles.methodLink}
              href={localizedPath(copy.locale, "/methodology")}
            >
              <ShieldCheck aria-hidden="true" />
              {copy.boundary.methodology}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.boundaryItems}>
            {copy.boundary.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.pathways}`}>
        <p className={styles.eyebrow}>{copy.pathways.eyebrow}</p>
        <h2>{copy.pathways.title}</h2>
        <div className={styles.pathwayGrid}>
          {copy.pathways.items.map((item) => (
            <article key={item.href}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link href={localizedPath(copy.locale, item.href)}>
                {item.action}
                <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.container}>
          <div className={styles.faq}>
            <p className={styles.eyebrow}>FAQ</p>
            <h2>{copy.faq.title}</h2>
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

      <section className={`${styles.container} ${styles.newsletter}`}>
        <div>
          <p className={styles.eyebrow}>{copy.newsletter.eyebrow}</p>
          <h2>{copy.newsletter.title}</h2>
          <p>{copy.newsletter.body}</p>
        </div>
        <NewsletterForm
          variant="inline"
          source="reviews-directory"
          className={styles.newsletterForm}
        />
      </section>
    </article>
  );
}
