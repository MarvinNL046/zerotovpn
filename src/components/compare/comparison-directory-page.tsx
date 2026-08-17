import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleAlert,
  FileCheck2,
  HelpCircle,
  Languages,
  Scale,
  ShieldCheck,
} from "lucide-react";
import type {
  ComparisonDirectoryCopy,
  ComparisonDirectoryEntry,
  ComparisonDirectoryLocale,
} from "@/data/comparison-directory";
import { BASE_URL } from "@/lib/seo-utils";
import styles from "./comparison-directory-page.module.css";

const PATH = "/compare";

function localizedPath(path: string, locale: ComparisonDirectoryLocale) {
  return locale === "nl" ? `/nl${path}` : path;
}

function entryPath(
  entry: ComparisonDirectoryEntry,
  locale: ComparisonDirectoryLocale,
) {
  return entry.languages.includes(locale)
    ? localizedPath(entry.href, locale)
    : entry.href;
}

function ComparisonDirectorySchema({
  copy,
}: {
  copy: ComparisonDirectoryCopy;
}) {
  const canonical = `${BASE_URL}${localizedPath(PATH, copy.locale)}`;
  const home = `${BASE_URL}${copy.locale === "nl" ? "/nl" : ""}`;
  const itemListId = `${canonical}#comparison-list`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: copy.locale,
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumb.home,
            item: home,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumb.compare,
            item: canonical,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: copy.directory.title,
        itemListOrder: "https://schema.org/ItemListUnordered",
        numberOfItems: copy.entries.length,
        itemListElement: copy.entries.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebPage",
            name: `${entry.providers[0]} vs ${entry.providers[1]}`,
            url: `${BASE_URL}${entryPath(entry, copy.locale)}`,
          },
        })),
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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function ComparisonDirectoryPage({
  copy,
}: {
  copy: ComparisonDirectoryCopy;
}) {
  return (
    <div className={styles.page}>
      <ComparisonDirectorySchema copy={copy} />

      <div className={styles.breadcrumbWrap}>
        <nav
          aria-label={copy.locale === "nl" ? "Broodkruimelpad" : "Breadcrumb"}
          className={styles.breadcrumb}
        >
          <Link href={localizedPath("", copy.locale)}>
            {copy.breadcrumb.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.breadcrumb.compare}</span>
        </nav>
      </div>

      <section className={styles.hero} aria-labelledby="comparison-page-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 id="comparison-page-title">{copy.hero.title}</h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>

            <div className={styles.directAnswer}>
              <Scale aria-hidden="true" />
              <p>{copy.hero.directAnswer}</p>
            </div>

            <ul className={styles.cueList} aria-label={copy.hero.boardTitle}>
              {copy.hero.cues.map((cue) => (
                <li key={cue}>
                  <Check aria-hidden="true" />
                  {cue}
                </li>
              ))}
            </ul>

            <Link className={styles.heroAction} href="#comparison-library">
              {copy.directory.eyebrow}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <aside className={styles.board} aria-label={copy.hero.boardTitle}>
            <header>
              <span>
                <ShieldCheck aria-hidden="true" />
              </span>
              <div>
                <p>{copy.hero.eyebrow}</p>
                <h2>{copy.hero.boardTitle}</h2>
              </div>
            </header>
            <dl>
              {copy.hero.boardRows.map((row) => (
                <div key={row.label} data-tone={row.tone}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.boardNote}>{copy.method.noteBody}</p>
          </aside>
        </div>
      </section>

      <section
        className={styles.directorySection}
        id="comparison-library"
        aria-labelledby="comparison-library-title"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.directory.eyebrow}</p>
            <h2 id="comparison-library-title">{copy.directory.title}</h2>
            <p>{copy.directory.intro}</p>
          </div>

          <div className={styles.comparisonGrid}>
            {copy.entries.map((entry) => (
              <article className={styles.comparisonCard} key={entry.id}>
                <header className={styles.cardHeader}>
                  <div
                    className={styles.providerPair}
                    aria-label={`${entry.providers[0]} ${
                      copy.locale === "nl" ? "tegen" : "versus"
                    } ${entry.providers[1]}`}
                  >
                    <span>{entry.providers[0]}</span>
                    <b aria-hidden="true">VS</b>
                    <span>{entry.providers[1]}</span>
                  </div>
                  <span className={styles.languageBadge}>
                    <Languages aria-hidden="true" />
                    {entry.languageNote}
                  </span>
                </header>

                <div className={styles.cardBody}>
                  <p className={styles.cardEyebrow}>{entry.eyebrow}</p>
                  <h3>
                    {entry.providers[0]} vs {entry.providers[1]}
                  </h3>
                  <span className={styles.statusBadge}>
                    <FileCheck2 aria-hidden="true" />
                    {entry.status}
                  </span>
                  <p className={styles.cardAnswer}>{entry.answer}</p>

                  <div className={styles.usefulFor}>
                    <h4>{copy.directory.bestForLabel}</h4>
                    <ul>
                      {entry.bestFor.map((item) => (
                        <li key={item}>
                          <Check aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className={styles.evidenceList}>
                    <div>
                      <dt>
                        <FileCheck2 aria-hidden="true" />
                        {copy.directory.evidenceLabel}
                      </dt>
                      <dd>{entry.evidence}</dd>
                    </div>
                    <div className={styles.limitRow}>
                      <dt>
                        <CircleAlert aria-hidden="true" />
                        {copy.directory.limitationLabel}
                      </dt>
                      <dd>{entry.limitation}</dd>
                    </div>
                  </dl>
                </div>

                <footer className={styles.cardFooter}>
                  <time dateTime={entry.checkedAt}>
                    <CalendarDays aria-hidden="true" />
                    {entry.checkedLabel}
                  </time>
                  <Link href={entryPath(entry, copy.locale)}>
                    {entry.action}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.questionSection}
        aria-labelledby="question-title"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.questions.eyebrow}</p>
            <h2 id="question-title">{copy.questions.title}</h2>
            <p>{copy.questions.intro}</p>
          </div>
          <ol className={styles.questionGrid}>
            {copy.questions.items.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.methodSection} aria-labelledby="method-title">
        <div className={styles.container}>
          <div className={styles.methodHeading}>
            <div>
              <p className={styles.eyebrow}>{copy.method.eyebrow}</p>
              <h2 id="method-title">{copy.method.title}</h2>
              <p>{copy.method.intro}</p>
            </div>
            <Scale aria-hidden="true" />
          </div>

          <ol className={styles.methodGrid}>
            {copy.method.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>

          <aside className={styles.methodNote}>
            <HelpCircle aria-hidden="true" />
            <div>
              <h3>{copy.method.noteTitle}</h3>
              <p>{copy.method.noteBody}</p>
            </div>
            <Link href={localizedPath("/methodology", copy.locale)}>
              {copy.method.action}
              <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section
        className={styles.boundarySection}
        aria-labelledby="boundary-title"
      >
        <div className={styles.boundaryGrid}>
          <div>
            <p className={styles.eyebrow}>{copy.boundary.eyebrow}</p>
            <h2 id="boundary-title">{copy.boundary.title}</h2>
            <p>{copy.boundary.body}</p>
          </div>
          <div className={styles.boundaryCards}>
            {copy.boundary.items.map((item) => (
              <article key={item.title}>
                <CircleAlert aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>FAQ</p>
            <h2 id="faq-title">{copy.faq.title}</h2>
          </div>
          <div className={styles.faqGrid}>
            {copy.faq.items.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.nextSection} aria-labelledby="next-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.next.eyebrow}</p>
            <h2 id="next-title">{copy.next.title}</h2>
          </div>
          <div className={styles.nextGrid}>
            {copy.next.items.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(item.href, copy.locale)}
              >
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span>{item.action}</span>
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
