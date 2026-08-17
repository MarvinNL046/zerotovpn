import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Gauge,
  Globe2,
  Info,
  Network,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { ToolsHubDirectory } from "@/components/tools/tools-hub-directory";
import type { ToolIcon, ToolsHubCopy } from "@/data/tools-hub";
import { BASE_URL } from "@/lib/seo-utils";
import styles from "@/components/tools/tools-hub.module.css";

const REVIEWED_AT = "2026-08-16";

const icons = {
  globe: Globe2,
  network: Network,
  gauge: Gauge,
  compass: Compass,
} satisfies Record<ToolIcon, typeof Globe2>;

function localizedPath(locale: ToolsHubCopy["locale"], path: string) {
  return `${locale === "en" ? "" : `/${locale}`}${path}`;
}

function safeJson(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function StructuredData({ copy }: { copy: ToolsHubCopy }) {
  const pageUrl = `${BASE_URL}${localizedPath(copy.locale, "/tools")}`;
  const homeLabel = copy.locale === "nl" ? "Start" : "Home";
  const itemList = {
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: copy.tools.length,
    itemListElement: copy.tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${BASE_URL}${localizedPath(copy.locale, tool.href)}`,
      description: tool.summary,
    })),
  };
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.hero.title,
      url: pageUrl,
      description: copy.metadata.description,
      inLanguage: copy.locale,
      dateModified: REVIEWED_AT,
      isAccessibleForFree: true,
      mainEntity: itemList,
      publisher: { "@type": "Organization", name: "ZeroToVPN", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: homeLabel,
          item: `${BASE_URL}${localizedPath(copy.locale, "") || "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: copy.breadcrumb,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: copy.locale,
      mainEntity: copy.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return graph.map((item, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(item) }}
    />
  ));
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      <p>{intro}</p>
    </div>
  );
}

function HeroVisual({ copy }: { copy: ToolsHubCopy }) {
  return (
    <div className={styles.heroVisual} aria-hidden="true">
      <div className={styles.visualTopbar}>
        <span>{copy.hero.visualTitle}</span>
        <span>overview-v1</span>
      </div>
      <div className={styles.visualRows}>
        {copy.hero.visualRows.map((row) => (
          <div className={styles.visualRow} key={row.label}>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
            <span>{row.state}</span>
          </div>
        ))}
      </div>
      <p className={styles.visualNote}>{copy.hero.visualNote}</p>
    </div>
  );
}

export function ToolsHubEditorialPage({ copy }: { copy: ToolsHubCopy }) {
  const homeLabel = copy.locale === "nl" ? "Start" : "Home";

  return (
    <article className={styles.page}>
      <StructuredData copy={copy} />

      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">{homeLabel}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.breadcrumb}</span>
        </nav>
      </div>

      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            <p className={styles.directAnswer}>{copy.hero.directAnswer}</p>
            <ul className={styles.cueList} aria-label={copy.hero.eyebrow}>
              {copy.hero.cues.map((cue) => (
                <li key={cue}>
                  <CheckCircle2 aria-hidden="true" />
                  {cue}
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual copy={copy} />
        </div>
      </header>

      <div className={styles.container}>
        <ToolsHubDirectory
          locale={copy.locale}
          directory={copy.directory}
          tools={copy.tools}
        />
      </div>

      <section className={`${styles.section} ${styles.softSection}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow={copy.chooser.eyebrow}
            title={copy.chooser.title}
            intro={copy.chooser.intro}
          />
          <div className={styles.chooserGrid}>
            {copy.chooser.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <article className={styles.chooserCard} key={item.title}>
                  <span className={styles.chooserIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Link className={styles.chooserAction} href={item.href}>
                    {item.action}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.workflowGrid}`}>
          <div>
            <SectionHeading
              eyebrow={copy.workflow.eyebrow}
              title={copy.workflow.title}
              intro={copy.workflow.intro}
            />
            <p className={styles.workflowNote}>{copy.workflow.note}</p>
          </div>
          <ol className={styles.stepList}>
            {copy.workflow.steps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow={copy.boundary.eyebrow}
            title={copy.boundary.title}
            intro={copy.boundary.intro}
          />
          <div className={styles.boundaryGrid}>
            {copy.boundary.items.map((item) => (
              <article className={styles.boundaryCard} key={item.title}>
                <span className={styles.boundaryState}>{item.state}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.boundaryWarning}>
            <Info aria-hidden="true" />
            <span>{copy.boundary.warning}</span>
          </div>
          <Link href="/methodology" className={styles.methodLink}>
            <ShieldCheck aria-hidden="true" />
            {copy.boundary.methodLink}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow={copy.privacy.eyebrow}
            title={copy.privacy.title}
            intro={copy.privacy.intro}
          />
          <div className={styles.privacyWrap}>
            <table className={styles.privacyTable}>
              <thead>
                <tr>
                  {copy.privacy.headers.map((header) => (
                    <th scope="col" key={header}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.tools.map((tool) => (
                  <tr key={tool.id}>
                    <td data-label={copy.privacy.headers[0]}>{tool.title}</td>
                    <td data-label={copy.privacy.headers[1]}>{tool.privacy}</td>
                    <td data-label={copy.privacy.headers[2]}>{tool.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            eyebrow={copy.learning.eyebrow}
            title={copy.learning.title}
            intro={
              copy.locale === "nl"
                ? "Lees alleen verder waar je vraag om vraagt."
                : "Continue only where your question needs more context."
            }
          />
          <div className={styles.learningGrid}>
            {copy.learning.items.map((item) => (
              <article className={styles.learningCard} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link className={styles.learningAction} href={item.href}>
                  {item.action}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`} id="faq">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="FAQ"
            title={copy.faqTitle}
            intro={
              copy.locale === "nl"
                ? "Korte antwoorden zonder technisch omweggetje."
                : "Short answers without a technical detour."
            }
          />
          <div className={styles.faqList}>
            {copy.faqs.map((faq) => (
              <details className={styles.faqItem} key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.newsletter}>
            <div>
              <p className={styles.eyebrow}>{copy.newsletter.eyebrow}</p>
              <h2>{copy.newsletter.title}</h2>
              <p>{copy.newsletter.body}</p>
            </div>
            <div className={styles.newsletterForm}>
              <NewsletterForm variant="default" source="tools-hub" />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
