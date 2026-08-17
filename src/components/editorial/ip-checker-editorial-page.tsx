import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Gauge,
  Globe2,
  Info,
  Laptop,
  LockKeyhole,
  Network,
  Router,
  ShieldQuestion,
  TriangleAlert,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { IpLookupWidget } from "@/components/tools/ip-lookup-widget";
import { ipCheckerSources, type IpCheckerCopy } from "@/data/ip-checker";
import { BASE_URL } from "@/lib/seo-utils";
import styles from "@/components/tools/ip-checker.module.css";

const REVIEWED_AT = "2026-08-16";
const TOOL_VERSION = "public-route-v1";

function localizedPath(locale: IpCheckerCopy["locale"], path: string) {
  return `${locale === "en" ? "" : `/${locale}`}${path}`;
}

function StructuredData({ copy }: { copy: IpCheckerCopy }) {
  const pagePath = localizedPath(copy.locale, "/tools/what-is-my-ip");
  const pageUrl = `${BASE_URL}${pagePath}`;
  const homeLabel = copy.locale === "nl" ? "Start" : "Home";
  const toolsLabel = copy.locale === "nl" ? "Hulpmiddelen" : "Tools";
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: copy.hero.title,
      url: pageUrl,
      description: copy.metadata.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any operating system with a modern browser",
      browserRequirements: "JavaScript and Fetch API support",
      isAccessibleForFree: true,
      inLanguage: copy.locale,
      dateModified: REVIEWED_AT,
      softwareVersion: TOOL_VERSION,
      featureList: [
        "Public IP address snapshot",
        "IPv4 or IPv6 address type",
        "Approximate hosting geolocation when available",
        "Explicit unsupported VPN-detection state",
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
          name: homeLabel,
          item: `${BASE_URL}${localizedPath(copy.locale, "") || "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: toolsLabel,
          item: `${BASE_URL}${localizedPath(copy.locale, "/tools")}`,
        },
        {
          "@type": "ListItem",
          position: 3,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}

function HeroVisual({ copy }: { copy: IpCheckerCopy }) {
  const isNl = copy.locale === "nl";
  return (
    <div className={styles.heroVisual} aria-hidden="true">
      <span className={styles.visualLabel}>
        {isNl ? "Voorbeeld · gemaskeerd" : "Example · masked"}
      </span>
      <div className={styles.visualIp}>198.51.100.•••</div>
      <div className={styles.visualRoute}>
        <span className={styles.visualNode}>
          <Laptop />
          {isNl ? "Browser" : "Browser"}
        </span>
        <span className={styles.visualArrow}>→</span>
        <span className={styles.visualNode}>
          <Router />
          {isNl ? "Route" : "Route"}
        </span>
        <span className={styles.visualArrow}>→</span>
        <span className={styles.visualNode}>
          <Globe2 />
          ZeroToVPN
        </span>
      </div>
      <p className={styles.visualBoundary}>
        {isNl
          ? "IP ontvangen · locatie geschat · VPN niet getest"
          : "IP received · location estimated · VPN not tested"}
      </p>
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

export function IpCheckerEditorialPage({ copy }: { copy: IpCheckerCopy }) {
  const isNl = copy.locale === "nl";
  const homeLabel = isNl ? "Start" : "Home";
  const toolsLabel = isNl ? "Hulpmiddelen" : "Tools";
  const relatedIcons = [LockKeyhole, Gauge, ShieldQuestion] as const;

  return (
    <div className={styles.page} lang={copy.locale}>
      <StructuredData copy={copy} />

      <div className={styles.pageInner}>
        <nav
          className={styles.breadcrumbs}
          aria-label={isNl ? "Kruimelpad" : "Breadcrumb"}
        >
          <Link href="/">{homeLabel}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/tools">{toolsLabel}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.breadcrumb}</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title}</h1>
              <p className={styles.heroIntro}>{copy.hero.intro}</p>
              <p className={styles.directAnswer}>{copy.hero.directAnswer}</p>
              <div className={styles.trustRow}>
                {copy.hero.cues.map((cue) => (
                  <span className={styles.trustCue} key={cue}>
                    <CheckCircle2 aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>
              <p className={styles.reviewed}>
                <time dateTime={REVIEWED_AT}>{copy.hero.reviewed}</time>
              </p>
              <aside className={styles.privacyCard}>
                <Info aria-hidden="true" />
                <div>
                  <strong>{copy.hero.privacyTitle}</strong>
                  <p>{copy.hero.privacyBody}</p>
                  <Link href="/privacy-policy">
                    {isNl
                      ? "Lees het privacybeleid"
                      : "Read the privacy policy"}{" "}
                    →
                  </Link>
                </div>
              </aside>
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
          <a href="#result">{copy.navigation.result}</a>
          <a href="#meaning">{copy.navigation.meaning}</a>
          <a href="#compare">{copy.navigation.compare}</a>
          <a href="#faq">{copy.navigation.faq}</a>
        </div>
      </nav>

      <section className={styles.toolSection} id="result">
        <div className={styles.pageInner}>
          <IpLookupWidget copy={copy.tool} locale={copy.locale} />
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        id="meaning"
      >
        <div className={styles.pageInner}>
          <SectionHeader
            eyebrow={copy.meaning.eyebrow}
            title={copy.meaning.title}
            intro={copy.meaning.intro}
          />
          <div className={styles.meaningGrid}>
            {copy.meaning.cards.map((card, index) => {
              const Icon =
                index === 0 ? Network : index === 1 ? Globe2 : ShieldQuestion;
              return (
                <article className={styles.meaningCard} key={card.title}>
                  <Icon aria-hidden="true" />
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              );
            })}
          </div>
          <div className={styles.routePanel}>
            <h3>{copy.meaning.routeTitle}</h3>
            <p>{copy.meaning.routeIntro}</p>
            <div className={styles.routeSteps}>
              {copy.meaning.routeSteps.map((step) => (
                <div className={styles.routeStep} key={step.label}>
                  <strong>{step.label}</strong>
                  <span>{step.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="compare">
        <div className={styles.pageInner}>
          <SectionHeader
            eyebrow={copy.compare.eyebrow}
            title={copy.compare.title}
            intro={copy.compare.intro}
          />
          <div className={styles.compareGrid}>
            {copy.compare.steps.map((step, index) => (
              <article className={styles.compareCard} key={step.title}>
                <span className={styles.compareNumber}>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <aside className={styles.warningCard}>
            <TriangleAlert aria-hidden="true" />
            <div>
              <strong>{copy.compare.warningTitle}</strong>
              <p>{copy.compare.warningBody}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
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
            eyebrow={copy.related.eyebrow}
            title={copy.related.title}
            intro={copy.related.intro}
          />
          <div className={styles.relatedGrid}>
            {copy.related.items.map((item, index) => {
              const Icon = relatedIcons[index] ?? Globe2;
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
            <div className={styles.faqIntro}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>{copy.faqTitle}</h2>
              <div className={styles.sourceLedger}>
                <h3>{copy.sources.title}</h3>
                <p>{copy.sources.intro}</p>
                <p>
                  <strong>{copy.sources.checked}</strong>
                </p>
                <ul className={styles.sourceList}>
                  {ipCheckerSources.map((source) => (
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
              <h2>{copy.newsletter.title}</h2>
              <p>{copy.newsletter.body}</p>
            </div>
            <NewsletterForm
              className={styles.newsletterForm}
              variant="inline"
              source="ip-checker"
            />
          </aside>
        </div>
      </section>
    </div>
  );
}
