import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import type {
  BestVpnProvider,
  BestVpnRoundupCopy,
} from "@/data/best-vpn-roundup";
import {
  getVpnAffiliateUrl,
  getVpnWebsiteUrl,
  type VpnLinkSlug,
} from "@/lib/vpn-links";
import styles from "./best-vpn-roundup-page.module.css";

const BASE_URL = "https://www.zerotovpn.com";

function localPath(locale: BestVpnRoundupCopy["locale"], path: string) {
  return `${locale === "nl" ? "/nl" : ""}${path}`;
}

function reviewPath(
  locale: BestVpnRoundupCopy["locale"],
  provider: BestVpnProvider,
) {
  if (locale === "nl" && provider.slug === "nordvpn") {
    return `/nl/reviews/${provider.slug}`;
  }
  return `/reviews/${provider.slug}`;
}

function reviewHref(
  locale: BestVpnRoundupCopy["locale"],
  provider: BestVpnProvider,
) {
  if (locale === "nl" && provider.slug !== "nordvpn") {
    return `/en/reviews/${provider.slug}`;
  }
  return reviewPath(locale, provider);
}

function JsonLd({ copy }: { copy: BestVpnRoundupCopy }) {
  const prefix = copy.locale === "nl" ? "/nl" : "";
  const pageUrl = `${BASE_URL}${prefix}/best/best-vpn`;
  const authorUrl = `${BASE_URL}${prefix}/authors/marvin-smit`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: copy.meta.title,
        description: copy.meta.description,
        url: pageUrl,
        inLanguage: copy.locale,
        datePublished: "2026-08-16",
        dateModified: "2026-08-16",
        author: {
          "@type": "Person",
          "@id": `${authorUrl}#person`,
          name: "Marvin Smit",
          url: authorUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "ZeroToVPN",
          url: BASE_URL,
        },
        mainEntity: { "@id": `${pageUrl}#options` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#options`,
        name: copy.shortlist.title,
        itemListOrder: "https://schema.org/ItemListUnordered",
        numberOfItems: copy.providers.length,
        itemListElement: copy.providers.map((provider) => ({
          "@type": "ListItem",
          name: provider.name,
          url: `${BASE_URL}${reviewPath(copy.locale, provider)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumb.home,
            item: `${BASE_URL}${prefix || "/"}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumb.current,
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

function ProviderCard({
  copy,
  provider,
}: {
  copy: BestVpnRoundupCopy;
  provider: BestVpnProvider;
}) {
  const affiliateUrl = getVpnAffiliateUrl(provider.slug as VpnLinkSlug);
  const websiteUrl = getVpnWebsiteUrl(provider.slug as VpnLinkSlug);

  return (
    <article className={styles.providerCard} id={provider.slug}>
      <div className={styles.providerHeader}>
        <div className={styles.logoBox}>
          <Image
            src={provider.logo}
            alt={`${provider.name} logo`}
            width={provider.logoWidth}
            height={provider.logoHeight}
            sizes="160px"
          />
        </div>
        <div>
          <p className={styles.fitLabel}>{provider.fitLabel}</p>
          <h3>{provider.name}</h3>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div>
          <p className={styles.cardLabel}>{copy.shortlist.fits}</p>
          <p className={styles.fitCopy}>{provider.fit}</p>
          <ul className={styles.reasonList}>
            {provider.reasons.map((reason) => (
              <li key={reason}>
                <CheckCircle2 aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.watchBox}>
          <CircleAlert aria-hidden="true" />
          <div>
            <p className={styles.cardLabel}>{copy.shortlist.watchOut}</p>
            <p>{provider.watchOut}</p>
          </div>
        </div>

        <dl className={styles.evidenceList}>
          <div>
            <dt>{copy.shortlist.evidence}</dt>
            <dd>{provider.evidenceStatus}</dd>
            <small>{provider.evidenceDate}</small>
          </div>
          <div>
            <dt>{copy.shortlist.test}</dt>
            <dd>{provider.testStatus}</dd>
          </div>
        </dl>
      </div>

      <div className={styles.cardActions}>
        {affiliateUrl ? (
          <AffiliateButton
            vpnId={provider.slug}
            vpnName={provider.name}
            affiliateUrl={affiliateUrl}
            className={styles.affiliateCta}
          >
            {provider.cta}
            <ArrowRight aria-hidden="true" />
          </AffiliateButton>
        ) : (
          <a
            className={styles.affiliateCta}
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.shortlist.officialFallback}
            <ArrowRight aria-hidden="true" />
          </a>
        )}
        <p className={styles.partnerLabel}>
          {affiliateUrl
            ? copy.shortlist.partnerLabel
            : copy.locale === "nl"
              ? "Officiële link"
              : "Official link"}
        </p>
        <Link
          className={styles.reviewLink}
          href={reviewHref(copy.locale, provider)}
        >
          {provider.review}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function BestVpnRoundupPage({ copy }: { copy: BestVpnRoundupCopy }) {
  return (
    <article className={styles.page}>
      <JsonLd copy={copy} />

      <div className={styles.container}>
        <nav
          className={styles.breadcrumb}
          aria-label={copy.locale === "nl" ? "Broodkruimelpad" : "Breadcrumb"}
        >
          <Link href={localPath(copy.locale, "") || "/"}>
            {copy.breadcrumb.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.breadcrumb.current}</span>
        </nav>
      </div>

      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            <p className={styles.heroAnswer}>{copy.hero.answer}</p>
            <div className={styles.byline}>
              <Link href={localPath(copy.locale, "/authors/marvin-smit")}>
                <ShieldCheck aria-hidden="true" />
                {copy.hero.author}
              </Link>
              <span>{copy.hero.reviewed}</span>
            </div>
          </div>

          <aside
            className={styles.scoreboard}
            aria-label={
              copy.locale === "nl"
                ? "Samenvatting van het bewijs"
                : "Evidence summary"
            }
          >
            <p className={styles.scoreboardTitle}>
              {copy.locale === "nl"
                ? "ZeroToVPN-besliskader"
                : "ZeroToVPN decision notes"}
            </p>
            <div className={styles.scoreGrid}>
              {copy.hero.facts.map((fact) => (
                <div key={fact.label} data-tone={fact.tone}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </header>

      <div
        className={`${styles.container} ${styles.disclosureWrap}`}
        data-commercial-disclosure="true"
      >
        <AffiliateDisclosure
          variant="card"
          linkLabel={copy.disclosureLink}
          className={styles.disclosure}
        />
      </div>

      <nav
        className={styles.jumpNav}
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
        <section
          className={`${styles.container} ${styles.decisionSection}`}
          id="choose"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.decisions.eyebrow}</p>
            <h2>{copy.decisions.title}</h2>
            <p>{copy.decisions.intro}</p>
          </div>
          <div className={styles.decisionGrid}>
            {copy.decisions.items.map((item) => (
              <a key={item.question} href={item.href}>
                <SearchCheck aria-hidden="true" />
                <span>
                  <strong>{item.question}</strong>
                  <small>{item.answer}</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className={styles.shortlistSection} id="shortlist">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.shortlist.eyebrow}</p>
              <h2>{copy.shortlist.title}</h2>
              <p>{copy.shortlist.intro}</p>
            </div>
            <div className={styles.providerGrid}>
              {copy.providers.map((provider) => (
                <ProviderCard
                  key={provider.slug}
                  copy={copy}
                  provider={provider}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.container} ${styles.compareSection}`}
          id="compare"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.compare.eyebrow}</p>
            <h2>{copy.compare.title}</h2>
            <p>{copy.compare.intro}</p>
          </div>
          <div className={styles.tableWrap}>
            <table>
              <caption className="sr-only">{copy.compare.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">{copy.compare.columns.question}</th>
                  <th scope="col">{copy.compare.columns.nordvpn}</th>
                  <th scope="col">{copy.compare.columns.surfshark}</th>
                  <th scope="col">{copy.compare.columns.protonvpn}</th>
                </tr>
              </thead>
              <tbody>
                {copy.compare.rows.map((row) => (
                  <tr key={row.question}>
                    <th scope="row">{row.question}</th>
                    <td>{row.nordvpn}</td>
                    <td>{row.surfshark}</td>
                    <td>{row.protonvpn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.mobileCompare}>
            {copy.compare.rows.map((row) => (
              <article key={row.question}>
                <h3>{row.question}</h3>
                <dl>
                  <div>
                    <dt>{copy.compare.columns.nordvpn}</dt>
                    <dd>{row.nordvpn}</dd>
                  </div>
                  <div>
                    <dt>{copy.compare.columns.surfshark}</dt>
                    <dd>{row.surfshark}</dd>
                  </div>
                  <div>
                    <dt>{copy.compare.columns.protonvpn}</dt>
                    <dd>{row.protonvpn}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.boundarySection} id="evidence">
          <div className={`${styles.container} ${styles.boundaryGrid}`}>
            <div className={styles.boundaryCopy}>
              <p className={styles.eyebrow}>{copy.boundary.eyebrow}</p>
              <h2>{copy.boundary.title}</h2>
              <p>{copy.boundary.intro}</p>
              <Link href={localPath(copy.locale, "/methodology")}>
                <FileCheck2 aria-hidden="true" />
                {copy.boundary.methodology}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.boundaryCards}>
              {copy.boundary.items.map((item) => (
                <article key={item.title} data-tone={item.tone}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.container} ${styles.stepsSection}`}
          id="steps"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.steps.eyebrow}</p>
            <h2>{copy.steps.title}</h2>
            <p>{copy.steps.intro}</p>
          </div>
          <ol className={styles.stepsGrid}>
            {copy.steps.items.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.pathSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.paths.eyebrow}</p>
              <h2>{copy.paths.title}</h2>
            </div>
            <div className={styles.pathGrid}>
              {copy.paths.items.map((item) => (
                <article key={item.href}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Link href={localPath(copy.locale, item.href)}>
                    {item.action}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.container} ${styles.faqSection}`}
          id="faq"
        >
          <div className={styles.sectionHeading}>
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
        </section>

        <section className={styles.sourcesSection}>
          <div className={`${styles.container} ${styles.sourcesGrid}`}>
            <div>
              <p className={styles.eyebrow}>{copy.sources.eyebrow}</p>
              <h2>{copy.sources.title}</h2>
              <p>{copy.sources.intro}</p>
              <small>{copy.sources.checked}</small>
            </div>
            <ul>
              {copy.sources.items.map((item) => (
                <li key={item.href}>
                  <span>{item.provider}</span>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                    <ExternalLink aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}
