import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  ExternalLink,
  FileSearch,
  Globe2,
  Laptop,
  MonitorCog,
  Router,
  Server,
  Settings2,
  ShieldCheck,
  Smartphone,
  Waypoints,
  Wifi,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import {
  connectionDropsCopy,
  getConnectionDropsLocale,
  CONNECTION_DROPS_SLUG,
  type ConnectionDropsCopy,
} from "@/data/blog-detail/connection-drops";
import { ArticleTestLogActions } from "./article-test-log-actions";
import { BlogArticleShell } from "./blog-article-shell";
import shellStyles from "./blog-article-shell.module.css";
import styles from "./connection-drops-article-page.module.css";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const baseUrl = "https://www.zerotovpn.com";
const heroImage = "/images/blog/journal-vpn-disconnect-lead-v1.webp";

const networkIcons: IconComponent[] = [
  Laptop,
  Wifi,
  ShieldCheck,
  Server,
  Globe2,
];
const quickIcons: IconComponent[] = [ShieldCheck, Wifi, FileSearch, Settings2];
const deviceIcons: IconComponent[] = [
  Smartphone,
  Smartphone,
  Laptop,
  MonitorCog,
  Router,
];

function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className={shellStyles.sectionHeader}>
      <p className={shellStyles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={shellStyles.sectionTitle}>
        {title}
      </h2>
      <p className={shellStyles.sectionIntro}>{intro}</p>
    </header>
  );
}

function buildStructuredData(copy: ConnectionDropsCopy) {
  const prefix = copy.locale === "nl" ? "/nl" : "";
  const url = `${baseUrl}${prefix}/blog/${CONNECTION_DROPS_SLUG}`;
  const language = copy.locale === "nl" ? "nl-NL" : "en-US";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: copy.hero.title,
      description: copy.metadata.description,
      image: [`${baseUrl}${heroImage}`],
      datePublished: "2026-02-16T00:00:00.000Z",
      dateModified: "2026-08-16T00:00:00.000Z",
      inLanguage: language,
      articleSection:
        copy.locale === "nl" ? "Probleem oplossen" : "Troubleshooting",
      isAccessibleForFree: true,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: {
        "@type": "Person",
        name: "Marvin Smit",
        url: `${baseUrl}${prefix}/authors/marvin-smit`,
      },
      publisher: {
        "@type": "Organization",
        name: "ZeroToVPN",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/icon-512.png`,
          width: 512,
          height: 512,
        },
      },
      citation: copy.sources.records.map((source) => source.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${baseUrl}${prefix}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: copy.breadcrumb.journal,
          item: `${baseUrl}${prefix}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: copy.breadcrumb.current,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];
}

export function ConnectionDropsArticlePage({ locale }: { locale: string }) {
  const contentLocale = getConnectionDropsLocale(locale);
  const copy = connectionDropsCopy[contentLocale];
  const isNl = contentLocale === "nl";
  const networkLabels = isNl
    ? [
        ["Apparaat", "Slaapstand en rechten"],
        ["Wifi of mobiel", "Signaal en netwerkwissel"],
        ["VPN-app", "Server en verbindingstype"],
        ["VPN-server", "Drukte en route"],
        ["Internet", "Website of dienst"],
      ]
    : [
        ["Device", "Sleep and permissions"],
        ["Wi-Fi or mobile", "Signal and network handoff"],
        ["VPN app", "Server and connection method"],
        ["VPN server", "Load and route"],
        ["Internet", "Website or service"],
      ];

  return (
    <BlogArticleShell
      locale={contentLocale}
      breadcrumb={copy.breadcrumb}
      hero={copy.hero}
      heroImage={heroImage}
      nav={copy.nav}
      structuredData={buildStructuredData(copy)}
    >
      <section className={shellStyles.section} aria-labelledby="before-title">
        <SectionHeader
          id="before-title"
          eyebrow={copy.before.eyebrow}
          title={copy.before.title}
          intro={copy.before.intro}
        />

        <div className={styles.quickGrid}>
          {copy.before.steps.map((step, index) => {
            const Icon = quickIcons[index] ?? Check;
            return (
              <article
                key={step.title}
                className={`${shellStyles.card} ${styles.quickCard}`}
              >
                <span className={styles.quickNumber}>{index + 1}</span>
                <Icon
                  aria-hidden="true"
                  className="absolute right-5 top-5 size-5 text-[#1268f3]"
                />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            );
          })}
        </div>

        <aside className={styles.warning}>
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5" />
          <div>
            <h3>{copy.before.warningTitle}</h3>
            <p>{copy.before.warning}</p>
          </div>
        </aside>
      </section>

      <section
        id="diagnose"
        className={`${shellStyles.section} ${shellStyles.darkPanel} ${styles.diagnosisPanel}`}
        aria-labelledby="diagnose-title"
      >
        <SectionHeader
          id="diagnose-title"
          eyebrow={copy.diagnosis.eyebrow}
          title={copy.diagnosis.title}
          intro={copy.diagnosis.intro}
        />

        <div
          className={styles.networkPath}
          aria-label={
            isNl
              ? "De vijf onderdelen van een VPN-verbinding"
              : "The five layers of a VPN connection"
          }
        >
          {networkLabels.flatMap(([title, note], index) => {
            const Icon = networkIcons[index] ?? Waypoints;
            const node = (
              <div className={styles.networkNode} key={`node-${title}`}>
                <Icon aria-hidden="true" className="size-6" />
                <strong>{title}</strong>
                <span>{note}</span>
              </div>
            );
            if (index === networkLabels.length - 1) return [node];
            return [
              node,
              <div
                key={`arrow-${title}`}
                className={styles.networkArrow}
                aria-hidden="true"
              >
                <ArrowRight className="size-4" />
              </div>,
            ];
          })}
        </div>

        <div className={styles.questionGrid}>
          {copy.diagnosis.questions.map((item, index) => (
            <article key={item.question} className={styles.questionCard}>
              <h3>
                {index + 1}. {item.question}
              </h3>
              <span className={styles.questionOutcome}>{item.outcome}</span>
              <p>{item.action}</p>
              <small>
                {isNl ? "Noteer: " : "Record: "}
                {item.record}
              </small>
            </article>
          ))}
        </div>

        <div
          className={`${styles.tableWrap} mt-6 rounded-xl border border-white/15`}
        >
          <table className={styles.table}>
            <caption>
              {isNl
                ? "Snelle tabel: van probleem naar eerste controle"
                : "Quick table: match the symptom to the first check"}
            </caption>
            <thead>
              <tr>
                <th scope="col">{copy.diagnosis.table.symptom}</th>
                <th scope="col">{copy.diagnosis.table.layer}</th>
                <th scope="col">{copy.diagnosis.table.firstAction}</th>
              </tr>
            </thead>
            <tbody>
              {copy.diagnosis.questions.map((item) => (
                <tr key={item.question}>
                  <th scope="row">{item.question}</th>
                  <td>{item.outcome}</td>
                  <td>{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        id="safe-fixes"
        className={shellStyles.section}
        aria-labelledby="fixes-title"
      >
        <SectionHeader
          id="fixes-title"
          eyebrow={copy.fixes.eyebrow}
          title={copy.fixes.title}
          intro={copy.fixes.intro}
        />
        <div className={styles.fixList}>
          {copy.fixes.items.map((item, index) => (
            <article
              key={item.title}
              className={`${shellStyles.card} ${styles.fixCard}`}
            >
              <header className={styles.fixHeader}>
                <span>{index + 1}</span>
                <h3>{item.title}</h3>
              </header>
              <div className={styles.fixBody}>
                <div className={styles.fixPoint}>
                  <strong>{copy.fixes.labels.why}</strong>
                  <p>{item.why}</p>
                </div>
                <div className={styles.fixPoint}>
                  <strong>{copy.fixes.labels.try}</strong>
                  <p>{item.try}</p>
                </div>
                <div className={styles.fixPoint}>
                  <strong>{copy.fixes.labels.result}</strong>
                  <p>{item.result}</p>
                </div>
                <div className={`${styles.fixPoint} ${styles.fixLimit}`}>
                  <strong>{copy.fixes.labels.limit}</strong>
                  <p>{item.limit}</p>
                </div>
                {item.link && (
                  <Link href={item.link.href} className={styles.naturalLink}>
                    {item.link.label}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="by-device"
        className={shellStyles.section}
        aria-labelledby="devices-title"
      >
        <SectionHeader
          id="devices-title"
          eyebrow={copy.devices.eyebrow}
          title={copy.devices.title}
          intro={copy.devices.intro}
        />
        <div className={styles.deviceGrid}>
          {copy.devices.items.map((item, index) => {
            const Icon = deviceIcons[index] ?? Settings2;
            return (
              <article
                key={item.title}
                className={`${shellStyles.card} ${styles.deviceCard}`}
              >
                <span className={styles.deviceIcon}>
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3>{item.title}</h3>
                <ul className={styles.checkList}>
                  {item.checks.map((check) => (
                    <li key={check}>
                      <Check aria-hidden="true" className="size-4" />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
                {item.link && (
                  <Link href={item.link.href} className={styles.naturalLink}>
                    {item.link.label}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="evidence"
        className={shellStyles.section}
        aria-labelledby="evidence-title"
      >
        <SectionHeader
          id="evidence-title"
          eyebrow={copy.evidence.eyebrow}
          title={copy.evidence.title}
          intro={copy.evidence.intro}
        />
        <div className={styles.evidenceGrid}>
          {copy.evidence.cards.map((card) => (
            <article
              key={card.title}
              className={`${shellStyles.card} ${styles.evidenceCard}`}
            >
              <span className={styles.status}>{card.status}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.logPanel}>
          <div className={styles.logCopy}>
            <h3>{copy.evidence.logTitle}</h3>
            <p>{copy.evidence.logIntro}</p>
            <ArticleTestLogActions
              checklist={copy.fixes.items.map(
                (item) => `${item.title}: ${item.try}`,
              )}
              copyLabel={copy.evidence.copyAction}
              downloadLabel={copy.evidence.downloadAction}
              copiedLabel={copy.evidence.copied}
              headers={copy.evidence.headers}
            />
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption>
                {isNl
                  ? "Voorbeeldgegevens — niet afkomstig uit een providertest"
                  : "Example data — not a provider test result"}
              </caption>
              <thead>
                <tr>
                  {copy.evidence.headers.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.evidence.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className={styles.privacyNote}>
          <ShieldCheck aria-hidden="true" className="mr-1 inline size-4" />
          {copy.evidence.note}
        </p>
      </section>

      <section
        id="support"
        className={shellStyles.section}
        aria-labelledby="support-title"
      >
        <SectionHeader
          id="support-title"
          eyebrow={copy.support.eyebrow}
          title={copy.support.title}
          intro={copy.support.intro}
        />
        <div className={styles.supportGrid}>
          <article className={`${shellStyles.card} ${styles.supportCard}`}>
            <h3>{copy.support.contactTitle}</h3>
            <ul className={styles.checkList}>
              {copy.support.contact.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" className="size-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className={`${shellStyles.card} ${styles.supportCard}`}>
            <h3>{copy.support.alternativesTitle}</h3>
            <ul className={styles.checkList}>
              {copy.support.alternatives.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" className="size-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/compare" className={styles.naturalLink}>
            {copy.support.comparisonLink}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link href="/methodology" className={styles.naturalLink}>
            {copy.support.methodLink}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section
        id="sources"
        className={shellStyles.section}
        aria-labelledby="sources-title"
      >
        <SectionHeader
          id="sources-title"
          eyebrow={copy.sources.eyebrow}
          title={copy.sources.title}
          intro={copy.sources.intro}
        />
        <div className={styles.sourceList}>
          {copy.sources.records.map((source, index) => (
            <article key={source.href} className={styles.sourceCard}>
              <div>
                <span className={styles.status}>{index + 1}</span>
                <h3 className="mt-2">{source.label}</h3>
                <p className={styles.sourceMeta}>
                  {copy.sources.columns.checked}:{" "}
                  <time dateTime="2026-08-16">{source.checked}</time>
                </p>
              </div>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceLink}
              >
                {source.source}
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
              <p className={styles.sourceMeta}>
                <strong>{copy.sources.columns.limitation}:</strong>{" "}
                {source.limitation}
              </p>
            </article>
          ))}
        </div>

        <aside className={`${shellStyles.card} ${styles.authorCard}`}>
          <Image
            src="/images/team/marvin.webp"
            alt={copy.author.name}
            width={80}
            height={80}
            className={styles.authorImage}
          />
          <div>
            <h3>{copy.author.title}</h3>
            <p className={styles.authorRole}>
              <strong>{copy.author.name}</strong> · {copy.author.role}
            </p>
            <p className={styles.authorBody}>{copy.author.body}</p>
            <Link href="/authors/marvin-smit" className={styles.naturalLink}>
              {copy.author.link}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </aside>
      </section>

      <section
        id="faq"
        className={shellStyles.section}
        aria-labelledby="faq-title"
      >
        <SectionHeader
          id="faq-title"
          eyebrow={copy.faq.eyebrow}
          title={copy.faq.title}
          intro={
            isNl
              ? "Korte antwoorden zonder verkooppraat."
              : "Short answers without a sales pitch."
          }
        />
        <div className={styles.faqList}>
          {copy.faq.items.map((item, index) => (
            <details
              key={item.question}
              className={styles.faqItem}
              open={index === 0}
            >
              <summary>
                {item.question}
                <ChevronDown aria-hidden="true" className="size-4 shrink-0" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={shellStyles.section} aria-labelledby="related-title">
        <SectionHeader
          id="related-title"
          eyebrow={copy.related.eyebrow}
          title={copy.related.title}
          intro={
            isNl
              ? "Logische vervolgstappen binnen hetzelfde onderwerp."
              : "Useful next steps in the same topic cluster."
          }
        />
        <div className={styles.relatedGrid}>
          {copy.related.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.relatedCard}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <ArrowRight
                aria-hidden="true"
                className={`${styles.relatedArrow} size-5`}
              />
            </Link>
          ))}
        </div>

        <div className={styles.newsletter}>
          <div>
            <p className={shellStyles.eyebrow}>{copy.newsletter.eyebrow}</p>
            <h3>{copy.newsletter.title}</h3>
            <p>{copy.newsletter.body}</p>
            <p>
              <small>{copy.newsletter.note}</small>
            </p>
          </div>
          <NewsletterForm
            variant="inline"
            source="connection-drops-article"
            className={styles.newsletterForm}
          />
        </div>
      </section>
    </BlogArticleShell>
  );
}
