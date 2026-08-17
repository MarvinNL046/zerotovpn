import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  ExternalLink,
  EyeOff,
  Gauge,
  Globe2,
  Info,
  Laptop,
  Network,
  Server,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { FAQAccordion } from "@/components/seo/faq-schema";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { DnsLeakWidget } from "@/components/tools/dns-leak-widget";
import { DnsFixTabs } from "@/components/tools/dns-fix-tabs";
import {
  DNS_LEAK_PAGE_REVIEWED_AT,
  DNS_ROUTE_CHECK_VERSION,
  dnsLeakSources,
  dnsProviderGuides,
  type DnsLeakCopy,
} from "@/data/dns-leak-test";
import { getVpnAffiliateUrl, type VpnLinkSlug } from "@/lib/vpn-links";
import { BASE_URL } from "@/lib/seo-utils";
import styles from "@/components/tools/dns-leak-diagnostic.module.css";

const trustIcons = [ShieldCheck, EyeOff, CircleHelp] as const;
const relatedIcons = [Globe2, Gauge, ShieldCheck] as const;

function localePath(locale: DnsLeakCopy["locale"], path: string) {
  return `${locale === "en" ? "" : `/${locale}`}${path}`;
}

function PageStructuredData({ copy }: { copy: DnsLeakCopy }) {
  const path = localePath(copy.locale, "/tools/dns-leak-test");
  const pageUrl = `${BASE_URL}${path}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}${localePath(copy.locale, "") || "/"}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${BASE_URL}${localePath(copy.locale, "/tools")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: copy.breadcrumb,
        item: pageUrl,
      },
    ],
  };
  const application = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: copy.hero.title,
    url: pageUrl,
    description: copy.metadata.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any operating system with a modern web browser",
    browserRequirements: "JavaScript",
    isAccessibleForFree: true,
    inLanguage: copy.locale,
    dateModified: DNS_LEAK_PAGE_REVIEWED_AT,
    softwareVersion: DNS_ROUTE_CHECK_VERSION,
    featureList: [
      "Public browser route snapshot",
      "DNS resolver comparison guide",
      "Device-specific DNS troubleshooting steps",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(application) }}
      />
    </>
  );
}

function HeroNetwork({ copy }: { copy: DnsLeakCopy }) {
  const nodes = [
    {
      label: copy.tool.route.device,
      detail: copy.tool.route.measured,
      Icon: Laptop,
      unknown: false,
    },
    {
      label: copy.tool.route.publicRoute,
      detail: copy.tool.route.measured,
      Icon: Network,
      unknown: false,
    },
    {
      label: copy.tool.route.resolver,
      detail: copy.tool.route.notMeasured,
      Icon: Server,
      unknown: true,
    },
    {
      label: copy.tool.route.destination,
      detail: copy.tool.route.notMeasured,
      Icon: Globe2,
      unknown: true,
    },
  ];

  return (
    <div className={styles.heroVisual} aria-hidden="true">
      <div className={styles.heroVisualHeader}>
        <span>{DNS_ROUTE_CHECK_VERSION}</span>
        <span>{copy.tool.labels.notMeasured}</span>
      </div>
      <div className={styles.heroNetwork}>
        {nodes.map(({ label, detail, Icon, unknown }, index) => (
          <div
            className={styles.heroNetworkNode}
            data-unknown={unknown}
            key={label}
          >
            <Icon />
            <strong>{label}</strong>
            <span>{detail}</span>
            {index < nodes.length - 1 ? (
              <ArrowRight className={styles.heroNetworkArrow} />
            ) : null}
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
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className={styles.sectionHeader}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      <p>{intro}</p>
    </header>
  );
}

function SignalIcon({ tone }: { tone: "info" | "good" | "warning" }) {
  const Icon =
    tone === "warning" ? AlertTriangle : tone === "good" ? CheckCircle2 : Info;
  return (
    <span className={styles.signalIcon} data-tone={tone}>
      <Icon aria-hidden="true" />
    </span>
  );
}

function ProviderCard({
  provider,
  copy,
}: {
  provider: (typeof dnsProviderGuides)[number];
  copy: DnsLeakCopy;
}) {
  const affiliateUrl = getVpnAffiliateUrl(provider.id as VpnLinkSlug);
  const description =
    copy.locale === "nl" ? provider.descriptionNl : provider.descriptionEn;

  return (
    <article
      className={styles.providerCard}
      aria-labelledby={`provider-${provider.id}`}
    >
      <div className={styles.providerLogo}>
        <Image src={provider.logo} alt="" width={160} height={48} />
      </div>
      <h3 id={`provider-${provider.id}`}>{provider.name}</h3>
      <p>{description}</p>
      <p className={styles.sourceStamp}>{copy.providers.sourceLabel}</p>
      <div className={styles.providerActions}>
        <a
          className={styles.providerDoc}
          href={provider.documentationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.providers.documentation}
          <ExternalLink aria-hidden="true" />
        </a>
        <Link className={styles.providerReview} href={provider.reviewHref}>
          {copy.providers.review}
          <ArrowRight aria-hidden="true" />
        </Link>
        {affiliateUrl ? (
          <AffiliateButton
            vpnId={provider.id}
            vpnName={provider.name}
            affiliateUrl={affiliateUrl}
            className={styles.providerPlans}
          >
            {copy.providers.plans}
            <ExternalLink aria-hidden="true" />
          </AffiliateButton>
        ) : null}
      </div>
    </article>
  );
}

export function DnsLeakEditorialPage({ copy }: { copy: DnsLeakCopy }) {
  const interpretMeaning = copy.interpret.headers[1];
  const interpretLimit = copy.interpret.headers[2];

  return (
    <article className={styles.page}>
      <PageStructuredData copy={copy} />

      <nav className={styles.stickyNav} aria-label={copy.breadcrumb}>
        <div className={`container ${styles.stickyNavInner}`}>
          {copy.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <header className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/tools">Tools</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.breadcrumb}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1 className={styles.heroTitle}>{copy.hero.title}</h1>
              <p className={styles.heroSubtitle}>{copy.hero.subtitle}</p>
              <a className={styles.heroCta} href="#check">
                {copy.tool.start}
                <ArrowRight aria-hidden="true" />
              </a>
              <aside className={styles.boundary}>
                <AlertTriangle aria-hidden="true" />
                <p>
                  <strong>{copy.hero.boundaryTitle}</strong>
                  {copy.hero.boundaryBody}
                </p>
              </aside>
              <ul className={styles.trustRow}>
                {copy.hero.cues.map((cue, index) => {
                  const Icon = trustIcons[index] ?? ShieldCheck;
                  return (
                    <li key={cue}>
                      <Icon aria-hidden="true" />
                      {cue}
                    </li>
                  );
                })}
              </ul>
              <p className={styles.reviewed}>{copy.hero.reviewed}</p>
            </div>
            <HeroNetwork copy={copy} />
          </div>
        </div>
      </header>

      <section className={styles.toolSection} id="check">
        <div className="container">
          <DnsLeakWidget copy={copy.tool} />
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        id="interpret"
      >
        <div className="container">
          <SectionHeader
            eyebrow={copy.interpret.eyebrow}
            title={copy.interpret.title}
            intro={copy.interpret.intro}
          />
          <table className={styles.interpretTable}>
            <caption className="sr-only">{copy.interpret.title}</caption>
            <thead>
              <tr>
                {copy.interpret.headers.map((header) => (
                  <th scope="col" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {copy.interpret.rows.map((row) => (
                <tr key={row.signal}>
                  <th scope="row">
                    <span className={styles.signalLabel}>
                      <SignalIcon tone={row.tone} />
                      {row.signal}
                    </span>
                  </th>
                  <td>{row.meaning}</td>
                  <td>{row.limitation}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.interpretCards}>
            {copy.interpret.rows.map((row) => (
              <article className={styles.interpretCard} key={row.signal}>
                <h3>
                  <SignalIcon tone={row.tone} />
                  {row.signal}
                </h3>
                <dl>
                  <div>
                    <dt>{interpretMeaning}</dt>
                    <dd>{row.meaning}</dd>
                  </div>
                  <div>
                    <dt>{interpretLimit}</dt>
                    <dd>{row.limitation}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="fix">
        <div className="container">
          <SectionHeader
            eyebrow={copy.workflow.eyebrow}
            title={copy.workflow.title}
            intro={copy.workflow.intro}
          />
          <div className={styles.workflowGrid}>
            {copy.workflow.steps.map((step, index) => (
              <article className={styles.workflowCard} key={step.title}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <DnsFixTabs copy={copy.deviceFix} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <SectionHeader
            eyebrow={copy.related.eyebrow}
            title={copy.related.title}
            intro={copy.hero.boundaryBody}
          />
          <div className={styles.relatedGrid}>
            {copy.related.items.map((item, index) => {
              const Icon = relatedIcons[index] ?? Wifi;
              return (
                <Link
                  className={styles.relatedCard}
                  href={item.href}
                  key={item.href}
                >
                  <Icon aria-hidden="true" />
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                  <span>
                    {item.action}
                    <ArrowRight aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.providerSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow={copy.providers.eyebrow}
            title={copy.providers.title}
            intro={copy.providers.intro}
          />
          <aside className={styles.disclosure}>
            <Info aria-hidden="true" />
            <p>
              {copy.providers.disclosure}{" "}
              <Link href="/affiliate-disclosure">
                {copy.providers.disclosureLink}
              </Link>
            </p>
          </aside>
          <div className={styles.providerGrid}>
            {dnsProviderGuides.map((provider) => (
              <ProviderCard copy={copy} key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion
        className={`container ${styles.faqSection}`}
        faqs={copy.faqs}
        title={copy.faqTitle}
      />

      <section className={`container ${styles.bottomGrid}`} id="sources">
        <div className={styles.sourcePanel}>
          <p className={styles.eyebrow}>{copy.sources.eyebrow}</p>
          <h2>{copy.sources.title}</h2>
          <p>{copy.sources.intro}</p>
          <details className={styles.sourceLedger}>
            <summary>{copy.sources.open}</summary>
            <ul className={styles.sourceList}>
              {dnsLeakSources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <strong>
                        {copy.locale === "nl" ? source.labelNl : source.labelEn}
                      </strong>
                      <span>
                        {source.organisation} ·{" "}
                        {copy.locale === "nl" ? source.typeNl : source.typeEn}
                      </span>
                    </span>
                    <ExternalLink aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <aside className={styles.newsletterPanel}>
          <p className={styles.eyebrow}>{copy.newsletter.eyebrow}</p>
          <h2>{copy.newsletter.title}</h2>
          <p>{copy.newsletter.body}</p>
          <NewsletterForm
            className={styles.newsletterForm}
            source="dns-leak-test"
            variant="compact"
          />
        </aside>
      </section>
    </article>
  );
}
