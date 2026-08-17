import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Gauge,
  Info,
  LineChart,
  LockKeyhole,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { SpeedTestWidget } from "@/components/tools/speed-test-widget";
import type { SpeedTestCopy } from "@/data/speed-test";
import { BASE_URL } from "@/lib/seo-utils";
import styles from "@/components/tools/speed-test-lab.module.css";

const SPEED_TEST_VERSION = "browser-speed-2026-08-v3";
const SPEED_TEST_REVIEWED_AT = "2026-08-16";

const sourceLinks = [
  {
    name: "Cloudflare · Test speed",
    href: "https://developers.cloudflare.com/fundamentals/performance/test-speed/",
  },
  {
    name: "Cloudflare · Speed-test metrics",
    href: "https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/speed-test/",
  },
  {
    name: "Cloudflare · Aggregated Internet Measurement",
    href: "https://developers.cloudflare.com/speed/aim/",
  },
  {
    name: "Cloudflare · Privacy policy",
    href: "https://www.cloudflare.com/policies/privacy/",
  },
] as const;

function localizedPath(locale: SpeedTestCopy["locale"], path: string) {
  return `${locale === "en" ? "" : `/${locale}`}${path}`;
}

function StructuredData({ copy }: { copy: SpeedTestCopy }) {
  const pagePath = localizedPath(copy.locale, "/speed-test");
  const pageUrl = `${BASE_URL}${pagePath}`;
  const isNl = copy.locale === "nl";
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: copy.title,
      url: pageUrl,
      description: copy.metadata.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any operating system with a modern browser",
      browserRequirements: "JavaScript and Fetch API support",
      isAccessibleForFree: true,
      inLanguage: copy.locale,
      dateModified: SPEED_TEST_REVIEWED_AT,
      softwareVersion: SPEED_TEST_VERSION,
      featureList: [
        "Browser-to-Cloudflare throughput snapshot",
        "User-labelled VPN-off and VPN-on comparison",
        "Local result history and CSV export",
      ],
      provider: { "@type": "Organization", name: "ZeroToVPN", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isNl ? "Start" : "Home",
          item: `${BASE_URL}${localizedPath(copy.locale, "") || "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isNl ? "Tools" : "Tools",
          item: `${BASE_URL}${localizedPath(copy.locale, "/tools")}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: isNl ? "Internetsnelheidstest" : "Internet speed test",
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}

function HeroVisual({ copy }: { copy: SpeedTestCopy }) {
  const barHeights = [38, 55, 44, 72, 60, 82, 69, 91];
  return (
    <div className={styles.heroVisual} aria-hidden="true">
      <div className={styles.visualHeader}>
        <span>{SPEED_TEST_VERSION}</span>
        <span>{copy.boundaryTitle}</span>
      </div>
      <div className={styles.visualChart}>
        {barHeights.map((height, index) => (
          <span
            key={`${height}-${index}`}
            style={{ "--height": `${height}%` } as React.CSSProperties}
          />
        ))}
      </div>
      <div className={styles.visualMetrics}>
        {[
          copy.widget.download,
          copy.widget.upload,
          copy.widget.ping,
          copy.widget.jitter,
        ].map((label) => (
          <div key={label}>
            <span>{label}</span>
            <strong>—</strong>
            <small>{copy.widget.phaseIdle}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
}) {
  return (
    <header className={styles.sectionHeader}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2>{title}</h2>
      <p>{intro}</p>
    </header>
  );
}

export function SpeedTestEditorialPage({ copy }: { copy: SpeedTestCopy }) {
  const isNl = copy.locale === "nl";
  const breadcrumbs = {
    tools: "Tools",
    current: isNl ? "Internetsnelheidstest" : "Internet speed test",
  };
  const newsletter = isNl
    ? {
        title: "Ontvang heldere updates over VPN’s en netwerktests",
        body: "Eens per twee weken één praktische update. Geen aftelklokken of nepclaims.",
      }
    : {
        title: "Get clear VPN and network-testing updates",
        body: "One practical update every two weeks. No countdowns or inflated claims.",
      };

  return (
    <div className={styles.page} lang={copy.locale}>
      <StructuredData copy={copy} />

      <div className={styles.pageInner}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">{isNl ? "Start" : "Home"}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/tools">{breadcrumbs.tools}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{breadcrumbs.current}</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1>{copy.title}</h1>
              <p className={styles.heroIntro}>{copy.intro}</p>
              <p className={styles.directTip}>{copy.directTip}</p>
              <div className={styles.trustRow}>
                {copy.trustCues.map((cue) => (
                  <span className={styles.trustCue} key={cue}>
                    <CheckCircle2 aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>
              <p className={styles.updated}>
                <time dateTime={SPEED_TEST_REVIEWED_AT}>
                  {copy.updatedLabel}
                </time>
              </p>
              <div className={styles.boundaryCard}>
                <Info aria-hidden="true" />
                <div>
                  <strong>{copy.boundaryTitle}</strong>
                  <p>{copy.boundary}</p>
                </div>
              </div>
            </div>
            <HeroVisual copy={copy} />
          </div>
        </section>
      </div>

      <nav
        className={styles.jumpNav}
        aria-label={isNl ? "Op deze pagina" : "On this page"}
      >
        <div className={styles.jumpNavInner}>
          <a href="#run-test">{copy.nav.test}</a>
          <a href="#compare">{copy.nav.compare}</a>
          <a href="#understand">{copy.nav.understand}</a>
          <a href="#method">{copy.nav.method}</a>
          <a href="#faq">{copy.nav.faq}</a>
        </div>
      </nav>

      <section className={styles.toolSection} id="run-test">
        <div className={styles.pageInner}>
          <SpeedTestWidget copy={copy.widget} locale={copy.locale} />
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        id="understand"
      >
        <div className={styles.pageInner}>
          <SectionHeader
            eyebrow={copy.metrics.eyebrow}
            title={copy.metrics.title}
            intro={copy.metrics.intro}
          />
          <div className={styles.metricsTableWrap}>
            <table className={styles.metricsTable}>
              <thead>
                <tr>
                  {copy.metrics.headers.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.metrics.rows.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">{row.name}</th>
                    <td>{row.tells}</td>
                    <td>{row.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.metricCardsMobile}>
            {copy.metrics.rows.map((row) => (
              <article className={styles.metricExplainCard} key={row.name}>
                <h3>{row.name}</h3>
                <dl>
                  <div>
                    <dt>{copy.metrics.headers[1]}</dt>
                    <dd>{row.tells}</dd>
                  </div>
                  <div>
                    <dt>{copy.metrics.headers[2]}</dt>
                    <dd>{row.limit}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.pageInner}>
          <SectionHeader
            eyebrow={copy.workflow.eyebrow}
            title={copy.workflow.title}
            intro={copy.workflow.intro}
          />
          <div className={styles.workflowGrid}>
            {copy.workflow.steps.map((step, index) => (
              <article className={styles.workflowCard} key={step.title}>
                <span className={styles.workflowNumber}>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.useCaseGrid}>
            {copy.useCases.items.map((item) => (
              <article className={styles.useCaseCard} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <small>{item.note}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="method">
        <div className={styles.pageInner}>
          <div className={styles.methodPanel}>
            <div>
              <p className={styles.eyebrow}>{copy.method.eyebrow}</p>
              <h2>{copy.method.title}</h2>
              <p>{copy.method.intro}</p>
              <Link className={styles.methodLink} href="/methodology">
                {copy.method.link}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <ul>
              {copy.method.bullets.map((bullet) => (
                <li key={bullet}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.pageInner}>
          <SectionHeader
            title={copy.related.title}
            intro={copy.useCases.intro}
          />
          <div className={styles.relatedGrid}>
            {copy.related.items.map((item, index) => {
              const Icon =
                index === 0 ? LockKeyhole : index === 1 ? Gauge : LineChart;
              return (
                <Link
                  className={styles.relatedCard}
                  href={item.href}
                  key={item.href}
                >
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span>{item.action} →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.pageBottom}`} id="faq">
        <div className={styles.pageInner}>
          <div className={styles.faqGrid}>
            <div>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>{copy.faqTitle}</h2>
              <div className={styles.sourceLedger}>
                <h3>{copy.sources.title}</h3>
                <p>{copy.sources.intro}</p>
                <p>
                  <strong>{copy.sources.checked}</strong>
                </p>
                <ul className={styles.sourceList}>
                  {sourceLinks.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink aria-hidden="true" />
                        {source.name}
                        <span>{copy.sources.open}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.faqList}>
              {copy.faqs.map((faq) => (
                <details className={styles.faqItem} key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <aside className={styles.newsletter}>
            <div>
              <h2>{newsletter.title}</h2>
              <p>{newsletter.body}</p>
            </div>
            <NewsletterForm
              className={styles.newsletterForm}
              variant="inline"
              source="speed-test"
            />
          </aside>
        </div>
      </section>
    </div>
  );
}
