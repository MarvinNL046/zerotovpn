import Image from "next/image";
import type { ComponentType } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Equal,
  ExternalLink,
  FileCheck2,
  Gauge,
  Laptop,
  MonitorSmartphone,
  RefreshCw,
  Scale,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tv,
  Users,
  WalletCards,
  Wifi,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  AffiliateButton,
  AffiliateTextLink,
} from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { FaqSchema } from "@/components/structured-data";
import { getVpnAffiliateUrl, getVpnWebsiteUrl } from "@/lib/vpn-links";
import {
  getNordvpnSurfsharkCopy,
  NORDVPN_SURFSHARK_UPDATED_AT,
  nordvpnSurfsharkSources,
  type ComparisonCopy,
  type ComparisonOutcome,
  type EvidenceState,
} from "@/data/nordvpn-surfshark-comparison";
import styles from "./nordvpn-surfshark-comparison-page.module.css";

const BASE_URL = "https://www.zerotovpn.com";

const providers = {
  nordvpn: {
    id: "nordvpn",
    name: "NordVPN",
    logo: "/logos/nordvpn.svg",
    reviewHref: "/reviews/nordvpn",
    affiliateUrl: getVpnAffiliateUrl("nordvpn"),
  },
  surfshark: {
    id: "surfshark",
    name: "Surfshark",
    logo: "/logos/surfshark.svg",
    reviewHref: "/reviews/surfshark",
    affiliateUrl: getVpnAffiliateUrl("surfshark"),
  },
} as const;

const nlSourceLabels: Record<string, string> = {
  "nord-devices": "Aantal apparaten tegelijk",
  "nord-refund": "Regels voor terugbetaling",
  "nord-privacy": "Aankondiging privacycontrole 2025",
  "nord-protocols": "Ondersteunde verbindingstypen",
  "surf-devices": "Aantal apparaten tegelijk",
  "surf-refund": "Voorwaarden, verlenging en terugbetaling",
  "surf-privacy": "Deloitte-rapport over het privacybeleid",
  "surf-protocols": "Ondersteunde verbindingstypen",
  ownership: "Bedrijfsgeschiedenis en werkwijze",
};

const outcomeIcons: Record<
  ComparisonOutcome,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  nordvpn: ShieldCheck,
  surfshark: Users,
  tie: Equal,
  retest: RefreshCw,
};

const evidenceIcons: Record<
  EvidenceState,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  desk: FileCheck2,
  provider: BookOpen,
  retest: RefreshCw,
};

const useCaseIcons: Array<
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = [Users, Sparkles, Gauge, Tv, Wifi, ShieldCheck];

function ProviderLogo({ provider }: { provider: keyof typeof providers }) {
  const item = providers[provider];
  return (
    <span className={styles.logoFrame} data-provider={provider}>
      <Image
        src={item.logo}
        alt=""
        width={provider === "nordvpn" ? 142 : 137}
        height={32}
        className={styles.logoImage}
      />
      <span className="sr-only">{item.name}</span>
    </span>
  );
}

function ProviderAction({
  provider,
  label,
  locale,
  className = "",
}: {
  provider: keyof typeof providers;
  label: string;
  locale: ComparisonCopy["locale"];
  className?: string;
}) {
  const item = providers[provider];
  const isAffiliate = Boolean(item.affiliateUrl);
  const linkKindLabel = isAffiliate
    ? locale === "nl"
      ? "Commissielink"
      : "Commission link"
    : locale === "nl"
      ? "Officiële providerlink"
      : "Official provider link";
  const actionClassName = `${styles.providerAction} ${
    isAffiliate ? styles.commissionAction : styles.officialAction
  } ${className}`;

  if (!item.affiliateUrl) {
    return (
      <a
        href={getVpnWebsiteUrl(item.id)}
        target="_blank"
        rel="noopener noreferrer"
        className={actionClassName}
      >
        <span className={styles.providerActionCopy}>
          <span>{label}</span>
          <span className={styles.providerActionMeta}>{linkKindLabel}</span>
        </span>
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    );
  }
  return (
    <AffiliateButton
      vpnId={item.id}
      vpnName={item.name}
      affiliateUrl={item.affiliateUrl}
      className={actionClassName}
    >
      <span className={styles.providerActionCopy}>
        <span>{label}</span>
        <span className={styles.providerActionMeta}>{linkKindLabel}</span>
      </span>
      <ArrowRight className="size-4" aria-hidden="true" />
    </AffiliateButton>
  );
}

function ComparisonJsonLd({ copy }: { copy: ComparisonCopy }) {
  const prefix = copy.locale === "en" ? "" : `/${copy.locale}`;
  const pageUrl = `${BASE_URL}${prefix}/compare/nordvpn-vs-surfshark`;
  const authorUrl = `${BASE_URL}${prefix}/authors/marvin-smit`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: copy.title,
        description: copy.metadata.description,
        mainEntityOfPage: pageUrl,
        inLanguage: copy.locale,
        datePublished: NORDVPN_SURFSHARK_UPDATED_AT,
        dateModified: NORDVPN_SURFSHARK_UPDATED_AT,
        author: {
          "@type": "Person",
          "@id": `${authorUrl}#person`,
          name: "Marvin Smit",
          url: authorUrl,
        },
        reviewedBy: {
          "@type": "Person",
          "@id": `${authorUrl}#person`,
          name: "Marvin Smit",
        },
        publisher: {
          "@type": "Organization",
          name: "ZeroToVPN",
          url: BASE_URL,
        },
        image: `${pageUrl}/opengraph-image`,
        about: [
          {
            "@type": "SoftwareApplication",
            name: "NordVPN",
            url: `${BASE_URL}${prefix}/reviews/nordvpn`,
          },
          {
            "@type": "SoftwareApplication",
            name: "Surfshark",
            url: `${BASE_URL}/reviews/surfshark`,
          },
        ],
        citation: nordvpnSurfsharkSources.map((source) => source.url),
      },
      {
        "@type": "ItemList",
        name: copy.breadcrumbs.current,
        numberOfItems: 2,
        itemListOrder: "https://schema.org/ItemListUnordered",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "SoftwareApplication",
              name: "NordVPN",
              applicationCategory: "SecurityApplication",
              url: `${BASE_URL}${prefix}/reviews/nordvpn`,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "SoftwareApplication",
              name: "Surfshark",
              applicationCategory: "SecurityApplication",
              url: `${BASE_URL}/reviews/surfshark`,
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE_URL}${prefix || "/"}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumbs.compare,
            item: `${BASE_URL}${prefix}/compare`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: copy.breadcrumbs.current,
            item: pageUrl,
          },
        ],
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

function Breadcrumbs({ copy }: { copy: ComparisonCopy }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ol>
        <li>
          <Link href="/">{copy.locale === "nl" ? "Start" : "Home"}</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/compare">{copy.breadcrumbs.compare}</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{copy.breadcrumbs.current}</li>
      </ol>
    </nav>
  );
}

function ProviderVisual({
  provider,
  locale,
}: {
  provider: keyof typeof providers;
  locale: ComparisonCopy["locale"];
}) {
  return (
    <div
      className={styles.providerVisual}
      data-provider={provider}
      aria-hidden="true"
    >
      <div className={styles.visualOrb} />
      <div className={styles.laptopFrame}>
        <div className={styles.laptopBar}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.laptopScreen}>
          <ShieldCheck />
          <span>{provider === "nordvpn" ? "10" : "∞"}</span>
          <small>
            {provider === "nordvpn"
              ? locale === "nl"
                ? "apparaten"
                : "devices"
              : locale === "nl"
                ? "verbindingen"
                : "connections"}
          </small>
        </div>
      </div>
      <div className={styles.phoneFrame}>
        <div className={styles.phoneNotch} />
        <CheckCircle2 />
      </div>
      <div className={styles.signalLine}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function SplitHero({ copy }: { copy: ComparisonCopy }) {
  return (
    <section
      id="verdict"
      className={styles.splitHero}
      aria-labelledby="comparison-title"
    >
      <div className={styles.providerGrid}>
        <aside className={styles.verdictCard}>
          <span className={styles.verdictLabel}>
            <Scale aria-hidden="true" />
            {copy.verdict.label}
          </span>
          <h2>{copy.verdict.title}</h2>
          <p>{copy.verdict.body}</p>
          <div className={styles.verdictCaveat}>
            <CircleHelp aria-hidden="true" />
            <span>{copy.verdict.caveat}</span>
          </div>
        </aside>
        {(["nordvpn", "surfshark"] as const).map((key) => {
          const provider = providers[key];
          const item = copy.providers[key];
          return (
            <article
              key={key}
              className={styles.providerPanel}
              data-provider={key}
              aria-labelledby={`hero-${key}-title`}
            >
              <h3 id={`hero-${key}-title`} className="sr-only">
                {provider.name}
              </h3>
              <div className={styles.providerTopline}>
                <ProviderLogo provider={key} />
                <span>{item.bestFor}</span>
              </div>
              <ProviderVisual provider={key} locale={copy.locale} />
              <p className={styles.providerSummary}>{item.summary}</p>
              <ul className={styles.factList}>
                {item.facts.map((fact) => (
                  <li key={fact}>
                    <Check aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
              <p className={styles.providerLimit}>
                <AlertTriangle aria-hidden="true" />
                {item.limit}
              </p>
              <div className={styles.providerActions}>
                <ProviderAction
                  provider={key}
                  label={item.cta}
                  locale={copy.locale}
                />
                {provider.affiliateUrl &&
                !(copy.locale === "nl" && key === "surfshark") ? (
                  <Link
                    href={provider.reviewHref}
                    className={styles.reviewLink}
                  >
                    {item.review}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className={styles.sectionIntro}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {intro ? (
        <div className={styles.sectionRule}>
          <span />
          <p>{intro}</p>
        </div>
      ) : null}
    </header>
  );
}

function EvidenceBadge({
  state,
  label,
}: {
  state: EvidenceState;
  label: string;
}) {
  const Icon = evidenceIcons[state];
  return (
    <span className={styles.evidenceBadge} data-state={state}>
      <Icon aria-hidden={true} />
      {label}
    </span>
  );
}

export function NordvpnSurfsharkComparisonPage({ locale }: { locale: string }) {
  const copy = getNordvpnSurfsharkCopy(locale);

  return (
    <article
      className={styles.page}
      data-comparison-template="evidence-led-head-to-head"
      data-last-reviewed-at={NORDVPN_SURFSHARK_UPDATED_AT}
      data-affiliate-context="dual-provider-comparison"
    >
      <ComparisonJsonLd copy={copy} />
      <FaqSchema faqs={copy.faqs} />

      <div className={styles.headerShell}>
        <div className={styles.container}>
          <Breadcrumbs copy={copy} />
          <header className={styles.editorialHeader}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 id="comparison-title">{copy.title}</h1>
            <p className={styles.dek}>{copy.dek}</p>
            <div className={styles.bylineRow}>
              <Link href="/authors/marvin-smit" className={styles.byline}>
                <Image
                  src="/images/team/marvin.webp"
                  alt=""
                  width={42}
                  height={42}
                />
                <span>{copy.reviewedLabel}</span>
              </Link>
              <span className={styles.statusPill}>
                <RefreshCw aria-hidden="true" />
                {copy.testStatus}
              </span>
              <Link href="/methodology" className={styles.methodLink}>
                {copy.methodologyLabel}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <AffiliateDisclosure
              variant="card"
              className={styles.disclosure}
              linkLabel={copy.disclosureLinkLabel}
            />
          </header>
          <SplitHero copy={copy} />
        </div>
      </div>

      <nav
        className={styles.stickyNav}
        aria-label={copy.locale === "nl" ? "Op deze pagina" : "On this page"}
      >
        <div className={styles.container}>
          {copy.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div>
        <section id="matrix" className={styles.section}>
          <div className={styles.container}>
            <SectionIntro
              eyebrow={copy.matrix.eyebrow}
              title={copy.matrix.title}
              intro={copy.matrix.intro}
            />
            <div className={styles.matrixCards} aria-label={copy.matrix.title}>
              {copy.matrix.rows.map((row) => {
                const OutcomeIcon = outcomeIcons[row.outcome];
                return (
                  <article key={row.category} className={styles.matrixCard}>
                    <h3>
                      <a href={row.href}>{row.category}</a>
                    </h3>
                    <span className={styles.outcome} data-outcome={row.outcome}>
                      <OutcomeIcon aria-hidden={true} />
                      {row.outcomeLabel}
                    </span>
                    <p>{row.reason}</p>
                    <EvidenceBadge
                      state={row.evidence}
                      label={row.evidenceLabel}
                    />
                  </article>
                );
              })}
            </div>
            <div className={`${styles.matrixWrap} ${styles.desktopTable}`}>
              <table className={styles.matrixTable}>
                <caption className="sr-only">{copy.matrix.title}</caption>
                <thead>
                  <tr>
                    <th scope="col">{copy.matrix.columns.category}</th>
                    <th scope="col">{copy.matrix.columns.outcome}</th>
                    <th scope="col">{copy.matrix.columns.reason}</th>
                    <th scope="col">{copy.matrix.columns.evidence}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.matrix.rows.map((row) => {
                    const OutcomeIcon = outcomeIcons[row.outcome];
                    return (
                      <tr key={row.category}>
                        <th scope="row">
                          <a href={row.href}>{row.category}</a>
                        </th>
                        <td>
                          <span
                            className={styles.outcome}
                            data-outcome={row.outcome}
                          >
                            <OutcomeIcon aria-hidden={true} />
                            {row.outcomeLabel}
                          </span>
                        </td>
                        <td>{row.reason}</td>
                        <td>
                          <EvidenceBadge
                            state={row.evidence}
                            label={row.evidenceLabel}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="pricing" className={styles.section}>
          <div className={styles.container}>
            <SectionIntro
              eyebrow={copy.pricing.eyebrow}
              title={copy.pricing.title}
              intro={copy.pricing.intro}
            />
            <div className={styles.pricingCards}>
              {(["nordvpn", "surfshark"] as const).map((key) => (
                <article
                  key={key}
                  className={styles.pricingCard}
                  aria-labelledby={`price-${key}`}
                >
                  <h3 id={`price-${key}`}>
                    <ProviderLogo provider={key} />
                  </h3>
                  <dl>
                    {copy.pricing.rows.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row[key]}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
            <div
              className={`${styles.pricingTableWrap} ${styles.desktopTable}`}
            >
              <table className={styles.pricingTable}>
                <caption className="sr-only">{copy.pricing.title}</caption>
                <thead>
                  <tr>
                    <th scope="col">
                      {copy.locale === "nl" ? "Controle" : "Check"}
                    </th>
                    <th scope="col">
                      <ProviderLogo provider="nordvpn" />
                    </th>
                    <th scope="col">
                      <ProviderLogo provider="surfshark" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {copy.pricing.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.nordvpn}</td>
                      <td>{row.surfshark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.contextualLinks}>
              {copy.locale === "nl" ? "Controleer " : "Check "}
              {providers.nordvpn.affiliateUrl ? (
                <AffiliateTextLink
                  vpnId="nordvpn"
                  vpnName="NordVPN"
                  affiliateUrl={providers.nordvpn.affiliateUrl}
                  dataPriceLink
                >
                  {copy.locale === "nl"
                    ? "de actuele NordVPN-totaalprijs"
                    : "NordVPN's current total price"}
                  <span className={styles.contextualLinkKind}>
                    {copy.locale === "nl"
                      ? " (commissielink)"
                      : " (commission link)"}
                  </span>
                </AffiliateTextLink>
              ) : (
                <a
                  href={getVpnWebsiteUrl("nordvpn")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.locale === "nl"
                    ? "de actuele NordVPN-totaalprijs"
                    : "NordVPN's current total price"}
                  <span className={styles.contextualLinkKind}>
                    {copy.locale === "nl"
                      ? " (officiële providerlink)"
                      : " (official provider link)"}
                  </span>
                </a>
              )}
              {copy.locale === "nl" ? " en " : " and "}
              {providers.surfshark.affiliateUrl ? (
                <AffiliateTextLink
                  vpnId="surfshark"
                  vpnName="Surfshark"
                  affiliateUrl={providers.surfshark.affiliateUrl}
                  dataPriceLink
                >
                  {copy.locale === "nl"
                    ? "de actuele Surfshark-totaalprijs"
                    : "Surfshark's current total price"}
                  <span className={styles.contextualLinkKind}>
                    {copy.locale === "nl"
                      ? " (commissielink)"
                      : " (commission link)"}
                  </span>
                </AffiliateTextLink>
              ) : (
                <a
                  href={getVpnWebsiteUrl("surfshark")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.locale === "nl"
                    ? "de actuele Surfshark-totaalprijs"
                    : "Surfshark's current total price"}
                  <span className={styles.contextualLinkKind}>
                    {copy.locale === "nl"
                      ? " (officiële providerlink)"
                      : " (official provider link)"}
                  </span>
                </a>
              )}
              {copy.locale === "nl"
                ? " naast elkaar voordat je betaalt."
                : " side by side before paying."}
            </p>
            <aside className={styles.priceWarning}>
              <WalletCards aria-hidden="true" />
              <div>
                <h3>{copy.pricing.warningTitle}</h3>
                <p>{copy.pricing.warningBody}</p>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="apps"
          className={`${styles.section} ${styles.softSection}`}
        >
          <div className={styles.container}>
            <SectionIntro
              eyebrow={copy.apps.eyebrow}
              title={copy.apps.title}
              intro={copy.apps.intro}
            />
            <div className={styles.appComparison}>
              <div className={styles.deviceScene} aria-hidden="true">
                <div className={styles.deviceLaptop}>
                  <Laptop />
                  <span>10</span>
                  <small>NordVPN</small>
                </div>
                <div className={styles.deviceBridge}>
                  <ArrowRight />
                  <span>{copy.locale === "nl" ? "apparaten" : "devices"}</span>
                </div>
                <div className={styles.devicePhones}>
                  <Smartphone />
                  <Smartphone />
                  <Smartphone />
                  <span>∞</span>
                  <small>Surfshark</small>
                </div>
              </div>
              <aside>
                <MonitorSmartphone aria-hidden="true" />
                <h3>{copy.apps.deviceTitle}</h3>
                <p>{copy.apps.deviceBody}</p>
                <Link
                  href={
                    copy.locale === "nl"
                      ? "/guides/what-is-vpn"
                      : "/best/vpn-mobile"
                  }
                  className={styles.inlineArrow}
                >
                  {copy.locale === "nl"
                    ? "Lees hoe een VPN op je apparaten werkt"
                    : "See VPNs on phones and tablets"}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </aside>
            </div>
            <div className={styles.taskGrid}>
              {copy.apps.tasks.map((task, index) => (
                <article key={task.task}>
                  <span className={styles.taskNumber}>0{index + 1}</span>
                  <h3>{task.task}</h3>
                  <div>
                    <ProviderLogo provider="nordvpn" />
                    <p>{task.nordvpn}</p>
                  </div>
                  <div>
                    <ProviderLogo provider="surfshark" />
                    <p>{task.surfshark}</p>
                  </div>
                  <p className={styles.taskResult}>
                    <Scale aria-hidden="true" />
                    {task.result}
                  </p>
                </article>
              ))}
            </div>
            <Link
              href={
                copy.locale === "nl"
                  ? "/guides/vpn-speed-guide"
                  : "/guides/vpn-protocols-explained"
              }
              className={styles.inlineArrow}
            >
              {copy.locale === "nl"
                ? "Lees waarom VPN-prestaties kunnen verschillen"
                : "Read how VPN connections work in plain language"}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section id="privacy" className={styles.section}>
          <div className={styles.container}>
            <SectionIntro
              eyebrow={copy.privacy.eyebrow}
              title={copy.privacy.title}
              intro={copy.privacy.intro}
            />
            <div className={styles.privacyGrid}>
              {(["nordvpn", "surfshark"] as const).map((key) => {
                const item = copy.privacy.cards[key];
                const source = nordvpnSurfsharkSources.find(
                  (entry) =>
                    entry.id ===
                    (key === "nordvpn" ? "nord-privacy" : "surf-privacy"),
                );
                return (
                  <article
                    key={key}
                    className={styles.privacyCard}
                    data-provider={key}
                  >
                    <div className={styles.cardProvider}>
                      <ProviderLogo provider={key} />
                      <time dateTime="2025">{item.date}</time>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <dl>
                      <div>
                        <dt>
                          {copy.locale === "nl"
                            ? "Wat is bekeken"
                            : "What was checked"}
                        </dt>
                        <dd>{item.scope}</dd>
                      </div>
                      <div>
                        <dt>
                          {copy.locale === "nl"
                            ? "Wat dit niet bewijst"
                            : "What this does not prove"}
                        </dt>
                        <dd>{item.limitation}</dd>
                      </div>
                    </dl>
                    {source ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sourceLink}
                      >
                        {item.sourceLabel}
                        <ExternalLink aria-hidden="true" />
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>
            <aside className={styles.ownershipCard}>
              <Scale aria-hidden="true" />
              <div>
                <h3>{copy.privacy.sharedOwnershipTitle}</h3>
                <p>{copy.privacy.sharedOwnershipBody}</p>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="tests"
          className={`${styles.section} ${styles.darkSection}`}
        >
          <div className={styles.container}>
            <SectionIntro
              eyebrow={copy.tests.eyebrow}
              title={copy.tests.title}
              intro={copy.tests.intro}
            />
            <div className={styles.shortTestDecision}>
              <Gauge aria-hidden="true" />
              <p>{copy.tests.note}</p>
              <Link
                href="/guides/vpn-speed-guide"
                className={styles.inlineArrow}
              >
                {copy.locale === "nl"
                  ? "Lees hoe we VPN-snelheid testen"
                  : "Read how we test VPN speed"}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.useCaseSection}`}>
          <div className={styles.container}>
            <SectionIntro
              eyebrow={copy.useCases.eyebrow}
              title={copy.useCases.title}
            />
            <div className={styles.useCaseGrid}>
              {copy.useCases.cards.map((card, index) => {
                const Icon = useCaseIcons[index] ?? CircleHelp;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className={styles.useCaseCard}
                  >
                    <span>
                      <Icon aria-hidden={true} />
                    </span>
                    <div>
                      <p>{card.outcome}</p>
                      <h3>{card.title}</h3>
                      <small>{card.body}</small>
                    </div>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="alternatives"
          className={`${styles.section} ${styles.softSection}`}
        >
          <div className={styles.container}>
            <SectionIntro
              eyebrow={copy.alternatives.eyebrow}
              title={copy.alternatives.title}
              intro={copy.alternatives.intro}
            />
            <div className={styles.alternativeGrid}>
              {copy.alternatives.cards.map((card, index) => (
                <Link
                  key={card.name}
                  href={card.href}
                  className={styles.alternativeCard}
                >
                  <span>0{index + 1}</span>
                  <h3>{card.name}</h3>
                  <p>{card.reason}</p>
                  <strong>
                    {copy.locale === "nl" ? "Bekijk optie" : "See option"}
                    <ArrowRight aria-hidden="true" />
                  </strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.methodSection}`}>
          <div className={styles.container}>
            <details className={styles.methodDetails}>
              <summary>
                <span>
                  <FileCheck2 aria-hidden="true" />
                </span>
                <span>
                  <small>{copy.method.eyebrow}</small>
                  <strong>{copy.method.title}</strong>
                </span>
                <span aria-hidden="true">+</span>
              </summary>
              <div className={styles.methodDetailsBody}>
                <p>{copy.method.intro}</p>
                <div className={styles.methodStates}>
                  {copy.method.states.map((state, index) => (
                    <article key={state.label}>
                      <span>{index + 1}</span>
                      <div>
                        <h3>{state.label}</h3>
                        <p>{state.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <aside className={styles.changeLog}>
                  <Clock3 aria-hidden="true" />
                  <div>
                    <h3>{copy.method.changeTitle}</h3>
                    <p>{copy.method.changeBody}</p>
                  </div>
                </aside>
                <Link href="/methodology" className={styles.methodButton}>
                  {copy.method.link}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </details>
          </div>
        </section>

        <section id="faq" className={styles.section}>
          <div className={styles.container}>
            <SectionIntro eyebrow="FAQ" title={copy.faqTitle} />
            <div className={styles.faqGrid}>
              {copy.faqs.map((faq) => (
                <details key={faq.question} className={styles.faqItem}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sourcesSection}`}>
          <div className={styles.container}>
            <div className={styles.sourcesGrid}>
              <details className={styles.sourceDetails}>
                <summary>
                  <span>{copy.sourcesTitle}</span>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{copy.sourcesIntro}</p>
                <ol className={styles.sourceList}>
                  {nordvpnSurfsharkSources.map((source, index) => {
                    const sourceLabel =
                      copy.locale === "nl"
                        ? (nlSourceLabels[source.id] ?? source.label)
                        : source.label;
                    return (
                      <li key={source.id}>
                        <span>{index + 1}</span>
                        <div>
                          <strong>
                            {source.provider} · {sourceLabel}
                          </strong>
                          <small>
                            {copy.locale === "nl" ? "Bekeken" : "Checked"}:{" "}
                            <time dateTime={source.checkedAt}>
                              {source.checkedAt}
                            </time>
                          </small>
                        </div>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${source.provider}: ${sourceLabel}`}
                        >
                          <ExternalLink aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </details>
              <aside className={styles.newsletter}>
                <Sparkles aria-hidden="true" />
                <h2>{copy.newsletterTitle}</h2>
                <p>{copy.newsletterBody}</p>
                <NewsletterForm
                  variant="compact"
                  source="nordvpn-surfshark-comparison"
                  className={styles.newsletterForm}
                />
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.relatedSection}>
          <div className={styles.container}>
            <h2>{copy.relatedTitle}</h2>
            <div className={styles.relatedGrid}>
              {copy.related.map((card) => (
                <Link key={card.href} href={card.href}>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className={styles.canonicalNote}>
              {copy.locale === "nl"
                ? "Deze vergelijking heeft één vaste volgorde: NordVPN vs Surfshark."
                : "This comparison uses one canonical order: NordVPN vs Surfshark."}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
