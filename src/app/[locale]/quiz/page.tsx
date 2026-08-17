import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Info,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { QuizWizard } from "@/components/quiz/quiz-wizard";
import { FAQAccordion } from "@/components/seo/faq-schema";
import {
  getVpnFinderCopy,
  isFinderLocaleFullyLocalized,
  VPN_FINDER_DATA_CHECKED_AT,
  VPN_FINDER_MODEL_VERSION,
  vpnFinderProviderProfiles,
  vpnFinderSources,
} from "@/data/vpn-finder";
import { getVpnBySlug } from "@/lib/vpn-data-layer";
import { BASE_URL, OG_LOCALE_MAP } from "@/lib/seo-utils";
import styles from "@/components/quiz/vpn-finder.module.css";

type Props = {
  params: Promise<{ locale: string }>;
};

function finderAlternates(locale: string) {
  const localized = isFinderLocaleFullyLocalized(locale);
  const canonical =
    locale === "nl" ? `${BASE_URL}/nl/quiz` : `${BASE_URL}/quiz`;

  return {
    canonical: localized ? canonical : `${BASE_URL}/quiz`,
    languages: {
      en: `${BASE_URL}/quiz`,
      nl: `${BASE_URL}/nl/quiz`,
      "x-default": `${BASE_URL}/quiz`,
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = getVpnFinderCopy(locale);
  const localized = isFinderLocaleFullyLocalized(locale);
  const canonical =
    locale === "nl" ? `${BASE_URL}/nl/quiz` : `${BASE_URL}/quiz`;
  const image = `${BASE_URL}/quiz/opengraph-image`;

  return {
    title: { absolute: copy.metadata.title },
    description: copy.metadata.description,
    metadataBase: new URL(BASE_URL),
    alternates: finderAlternates(locale),
    robots: localized
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: "ZeroToVPN",
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      title: copy.metadata.title,
      description: copy.metadata.description,
      url: localized ? canonical : `${BASE_URL}/quiz`,
      images: [
        { url: image, width: 1200, height: 630, alt: copy.metadata.ogAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.title,
      description: copy.metadata.description,
      images: [image],
    },
  };
}

export default async function QuizPage({ params }: Props) {
  const { locale } = await params;
  if (!isFinderLocaleFullyLocalized(locale)) permanentRedirect("/en/quiz");
  setRequestLocale(locale);
  const copy = getVpnFinderCopy(locale);
  const nordvpn = await getVpnBySlug("nordvpn");
  const providers = vpnFinderProviderProfiles.map((provider) => ({
    ...provider,
    affiliateUrl:
      provider.id === "nordvpn" ? (nordvpn?.affiliateUrl ?? "") : "",
  }));
  const isNl = copy.locale === "nl";
  const checkedDateLabel = isNl ? "16 aug 2026" : "16 Aug 2026";

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: copy.metadata.title.replace(/\s*\|\s*ZeroToVPN$/u, ""),
    url: locale === "nl" ? `${BASE_URL}/nl/quiz` : `${BASE_URL}/quiz`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    inLanguage: copy.locale,
    isAccessibleForFree: true,
    dateModified: VPN_FINDER_DATA_CHECKED_AT,
    softwareVersion: VPN_FINDER_MODEL_VERSION,
    description: copy.metadata.description,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: locale === "nl" ? `${BASE_URL}/nl` : BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.breadcrumb,
        item: locale === "nl" ? `${BASE_URL}/nl/quiz` : `${BASE_URL}/quiz`,
      },
    ],
  };

  return (
    <div className={styles.page} lang={copy.locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className={styles.hero}>
        <div className={`container max-w-7xl ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 className={styles.heroTitle}>{copy.hero.title}</h1>
            <p className={styles.heroSubtitle}>{copy.hero.subtitle}</p>
            <p className={styles.heroCaveat}>{copy.hero.caveat}</p>
            <ul className={styles.trustRow}>
              {copy.hero.cues.map((cue, index) => (
                <li key={cue}>
                  {index === 0 ? (
                    <Sparkles aria-hidden="true" />
                  ) : index === 1 ? (
                    <ShieldCheck aria-hidden="true" />
                  ) : (
                    <FileCheck2 aria-hidden="true" />
                  )}
                  {cue}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroPath}>
              <span className={styles.heroNode}>
                <ListChecks />
                <strong>{isNl ? "5 antwoorden" : "5 answers"}</strong>
              </span>
              <span className={styles.heroNode}>
                <FileCheck2 />
                <strong>
                  {isNl ? "Bronnen gecontroleerd" : "Sources checked"}
                </strong>
              </span>
              <span className={styles.heroNode}>
                <CheckCircle2 />
                <strong>
                  {isNl ? "Shortlist met uitleg" : "Explained shortlist"}
                </strong>
              </span>
            </div>
            <div className={styles.heroModel}>
              <span>{copy.methodology.modelLabel}</span>
              <strong>{checkedDateLabel}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-7xl">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link> /{" "}
          <span aria-current="page">{copy.breadcrumb}</span>
        </nav>
        <aside className={styles.disclosure}>
          <Info aria-hidden="true" />
          <p>
            {copy.disclosure}{" "}
            <Link href="/affiliate-disclosure">{copy.disclosureLink}</Link>
          </p>
        </aside>
      </div>

      <section className={styles.quizSection} aria-label={copy.hero.eyebrow}>
        <div className="container max-w-7xl">
          <QuizWizard
            copy={copy}
            providers={providers}
            sources={vpnFinderSources}
          />
        </div>
      </section>

      <section className={styles.methodSection}>
        <div className="container max-w-7xl">
          <header className={styles.methodHeader}>
            <p>{copy.methodology.eyebrow}</p>
            <h2>{copy.methodology.title}</h2>
            <p>{copy.methodology.intro}</p>
          </header>
          <div className={styles.methodGrid}>
            {copy.methodology.items.map((item) => (
              <article key={item.title} className={styles.methodCard}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.methodMeta}>
            <span>
              {copy.methodology.modelLabel}:{" "}
              <time dateTime={VPN_FINDER_DATA_CHECKED_AT}>
                {checkedDateLabel}
              </time>
            </span>
            <Link href="/methodology">{copy.methodology.link}</Link>
          </div>
        </div>
      </section>

      <section className={`container max-w-7xl ${styles.relatedSection}`}>
        <h2>{copy.related.title}</h2>
        <div className={styles.relatedGrid}>
          {copy.related.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.relatedCard}
            >
              <strong>{item.title}</strong>
              <span>{item.body}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <FAQAccordion
        faqs={copy.faqs}
        title={copy.faqTitle}
        className={`container max-w-4xl ${styles.faqSection}`}
      />

      <section className={`container max-w-7xl ${styles.sourcesSection}`}>
        <h2>{copy.sourcesTitle}</h2>
        <p>{copy.sourcesIntro}</p>
        <details className={styles.sourceLedger}>
          <summary>
            {isNl
              ? `Bekijk alle ${vpnFinderSources.length} officiële bronnen`
              : `View all ${vpnFinderSources.length} official sources`}
          </summary>
          <div className={styles.sourceGrid}>
            {vpnFinderSources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <strong>{source.provider}</strong>:{" "}
                  {copy.locale === "nl" ? source.labelNl : source.label}
                </span>
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
          </div>
        </details>
      </section>
    </div>
  );
}
