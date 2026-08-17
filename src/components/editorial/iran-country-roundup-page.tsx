import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  CircleHelp,
  ExternalLink,
  FileCheck2,
  KeyRound,
  LockKeyhole,
  RefreshCw,
  Router,
  ShieldCheck,
  Smartphone,
  WifiOff,
} from "lucide-react";

import { ZeroToVpnMark } from "@/components/brand/zerotovpn-logo";
import { FAQAccordion } from "@/components/seo/faq-schema";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import {
  AffiliateButton,
  AffiliateTextLink,
} from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { Link } from "@/i18n/navigation";
import type { VpnData } from "@/lib/vpn-data-layer";
import { BASE_URL } from "@/lib/seo-utils";
import {
  getIranRoundupLocale,
  IRAN_ROUNDUP_SLUG,
  IRAN_ROUNDUP_UPDATED_AT,
  iranRoundupCopy,
  type IranRoundupProvider,
} from "@/data/roundup/iran-country-roundup";
import styles from "./iran-country-roundup-page.module.css";

type IranCountryRoundupPageProps = {
  locale: string;
  vpns: VpnData[];
};

const providerLogo: Record<IranRoundupProvider["slug"], string> = {
  nordvpn: "/logos/nordvpn.svg",
  surfshark: "/logos/surfshark.svg",
  protonvpn: "/logos/protonvpn.svg",
};

const criteriaIcons = [ShieldCheck, Smartphone, WifiOff, FileCheck2] as const;
const prepareIcons = [
  Smartphone,
  KeyRound,
  BookOpenCheck,
  LockKeyhole,
] as const;

function jsonLd(schema: object) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

function ProviderLogo({
  slug,
  name,
  size = "normal",
}: {
  slug: IranRoundupProvider["slug"];
  name: string;
  size?: "normal" | "small";
}) {
  const iconOnly = slug === "protonvpn";

  return (
    <span className={styles.providerIdentity} data-size={size}>
      <span className={styles.providerLogoFrame}>
        <Image
          src={providerLogo[slug]}
          alt={iconOnly ? "" : name}
          width={iconOnly ? 36 : 142}
          height={iconOnly ? 36 : 32}
          className={styles.providerLogoImage}
          style={{ width: "auto", height: "auto" }}
        />
        {iconOnly && <span className={styles.providerLogoText}>{name}</span>}
      </span>
    </span>
  );
}

function ProviderAction({
  provider,
  copy,
  className,
}: {
  provider: VpnData;
  copy: IranRoundupProvider;
  className?: string;
}) {
  if (!provider.affiliateUrl) {
    return (
      <Link
        href={`/reviews/${provider.slug}`}
        className={`${styles.limeButton} inline-flex items-center justify-center gap-2 rounded-lg ${className ?? ""}`}
      >
        {copy.reviewLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <AffiliateButton
      vpnId={provider.slug}
      vpnName={provider.name}
      affiliateUrl={provider.affiliateUrl}
      className={`${styles.limeButton} w-full justify-center ${className ?? ""}`}
    >
      <span>{copy.ctaLabel}</span>
      <ArrowRight className="size-4" aria-hidden="true" />
    </AffiliateButton>
  );
}

function ProviderVisual({
  slug,
  name,
  label,
}: {
  slug: IranRoundupProvider["slug"];
  name: string;
  label: string;
}) {
  if (slug === "nordvpn") {
    return (
      <Image
        src="/affiliate/nordvpn/review/android-specialty-servers-us.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 38vw, 100vw"
        className={styles.phoneImage}
        unoptimized
      />
    );
  }

  return (
    <div className={styles.providerDiagram} aria-hidden="true">
      <div className={styles.diagramCard}>
        <ProviderLogo slug={slug} name={name} />
        <div className="mt-5 flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#24c6dc]/15 text-[#24c6dc]">
            <Router className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className={styles.diagramLine} />
            <p className="mt-2 text-sm font-bold text-white">{label}</p>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#b8e34a] text-[#071226]">
            <ShieldCheck className="size-5" />
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {["App", "Route", "Result"].map((item) => (
            <span
              key={item}
              className="rounded-lg border border-white/15 bg-white/5 px-2 py-3 text-center text-[0.68rem] font-bold uppercase tracking-wider text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function IranCountryRoundupPage({
  locale,
  vpns,
}: IranCountryRoundupPageProps) {
  const contentLocale = getIranRoundupLocale(locale);
  const copy = iranRoundupCopy[contentLocale];
  const prefix = contentLocale === "nl" ? "/nl" : "";
  const path = `/blog/${IRAN_ROUNDUP_SLUG}`;
  const canonical = `${BASE_URL}${prefix}${path}`;
  const providers = copy.providers
    .map((item) => ({
      copy: item,
      provider: vpns.find((vpn) => vpn.slug === item.slug),
    }))
    .filter((item): item is { copy: IranRoundupProvider; provider: VpnData } =>
      Boolean(item.provider),
    );
  const nordProvider = providers.find(
    ({ provider }) => provider.slug === "nordvpn",
  )?.provider;
  const heroDekAfterNordvpn = copy.dek.startsWith("NordVPN")
    ? copy.dek.slice("NordVPN".length)
    : ` ${copy.dek}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: copy.home,
        item: `${BASE_URL}${prefix || ""}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.blog,
        item: `${BASE_URL}${prefix}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: copy.title,
        item: canonical,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: copy.title,
    description: copy.metadataDescription,
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/home/iran-tehran-editorial-og-v2.webp`,
      width: 1200,
      height: 630,
    },
    datePublished: "2026-02-15T22:01:45.000Z",
    dateModified: IRAN_ROUNDUP_UPDATED_AT,
    inLanguage: contentLocale,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}${prefix}/authors/marvin-smit#person`,
      name: "Marvin Smit",
      url: `${BASE_URL}${prefix}/authors/marvin-smit`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "ZeroToVPN",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.shortlistTitle,
    numberOfItems: providers.length,
    itemListElement: providers.map(({ provider }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: provider.name,
        applicationCategory: "VPN service",
        url: `${BASE_URL}${prefix}/reviews/${provider.slug}`,
      },
    })),
  };

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema) }}
      />

      <div className="container max-w-7xl pt-6 sm:pt-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex min-h-12 flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
        >
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-md px-2 font-medium hover:text-slate-950 dark:hover:text-white"
          >
            {copy.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/blog"
            className="inline-flex min-h-12 items-center rounded-md px-2 font-medium hover:text-slate-950 dark:hover:text-white"
          >
            {copy.blog}
          </Link>
          <span aria-hidden="true">/</span>
          <span
            aria-current="page"
            className="px-2 text-slate-500 dark:text-slate-400"
          >
            Iran
          </span>
        </nav>

        <section className={styles.hero} aria-labelledby="iran-roundup-title">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b8e34a]">
                {copy.eyebrow}
              </p>
              <h1
                id="iran-roundup-title"
                className="mt-4 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.8rem]"
              >
                {copy.title}
              </h1>
              <AffiliateDisclosure
                variant="inline"
                tone="onDark"
                linkLabel={copy.disclosureLink}
                className={styles.heroDisclosure}
              />
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                {nordProvider?.affiliateUrl ? (
                  <AffiliateTextLink
                    vpnId="nordvpn"
                    vpnName={nordProvider.name}
                    affiliateUrl={nordProvider.affiliateUrl}
                    className={styles.heroAffiliateLink}
                  >
                    NordVPN
                  </AffiliateTextLink>
                ) : (
                  <Link
                    href="/reviews/nordvpn"
                    className={styles.heroAffiliateLink}
                  >
                    NordVPN
                  </Link>
                )}
                {heroDekAfterNordvpn}
              </p>

              <div className="mt-7 rounded-2xl border border-white/15 bg-white/[0.07] p-5 sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#24c6dc]">
                  {copy.directAnswerLabel}
                </p>
                <p className="mt-3 text-lg font-bold leading-7 text-white">
                  {copy.directAnswer}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {copy.networkStatus}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-3">
                  <BadgeCheck
                    className="size-4 text-[#b8e34a]"
                    aria-hidden="true"
                  />
                  {copy.authorLine}
                </span>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-3">
                  <RefreshCw
                    className="size-4 text-[#24c6dc]"
                    aria-hidden="true"
                  />
                  {copy.updatedLine}
                </span>
              </div>
            </div>

            <figure className={styles.heroVisual}>
              <Image
                src="/images/home/iran-tehran-editorial-hero-v2.webp"
                alt={copy.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={styles.heroImage}
              />
              <figcaption className={styles.heroCaption}>
                {copy.imageCaption}
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="flex justify-end py-5">
          <div className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 text-sm font-bold text-amber-950 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100">
            <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
            {copy.evidenceLine}
          </div>
        </div>
      </div>

      <nav className={styles.stickyNav} aria-label="Article sections">
        <div className={`container max-w-7xl ${styles.navInner}`}>
          {copy.nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="how-to-choose"
        className={`${styles.section} container max-w-7xl py-14 sm:py-20`}
      >
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1268f3] dark:text-[#24c6dc]">
            {copy.criteriaEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
            {copy.criteriaTitle}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {copy.criteriaIntro}
          </p>
        </div>
        <div className={`${styles.criteriaGrid} mt-8`}>
          {copy.criteria.map((item, index) => {
            const Icon = criteriaIcons[index];
            return (
              <article key={item.title} className={styles.criteriaCard}>
                <span className={styles.criteriaIcon}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
        <p className="mt-7 max-w-4xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {contentLocale === "nl" ? "Lees eerst " : "First read "}
          <Link
            href="/guides/vpn-obfuscation-explained"
            className="font-bold text-[#1268f3] underline decoration-2 underline-offset-4 dark:text-[#24c6dc]"
          >
            {contentLocale === "nl"
              ? "hoe VPN-versluiering werkt"
              : "how VPN obfuscation works"}
          </Link>
          {contentLocale === "nl" ? " en vergelijk daarna " : ", then compare "}
          <Link
            href="/guides/vpn-protocols-explained"
            className="font-bold text-[#1268f3] underline decoration-2 underline-offset-4 dark:text-[#24c6dc]"
          >
            {contentLocale === "nl"
              ? "OpenVPN, WireGuard en Stealth"
              : "OpenVPN, WireGuard and Stealth"}
          </Link>
          {contentLocale === "nl" ? "." : "."}
        </p>
      </section>

      <section
        id="shortlist"
        className={`${styles.section} border-y border-slate-200 bg-white/70 py-14 dark:border-slate-700 dark:bg-slate-950/45 sm:py-20`}
      >
        <div className="container max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1268f3] dark:text-[#24c6dc]">
              {copy.shortlistEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              {copy.shortlistTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {copy.shortlistIntro}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-[#b8e34a] px-3 py-2 text-[#071226]">
              {copy.evidenceLegend.documented}
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-2 text-amber-950 dark:bg-amber-900/40 dark:text-amber-100">
              {copy.evidenceLegend.notRetested}
            </span>
            <span className="rounded-full bg-slate-200 px-3 py-2 text-slate-700 dark:bg-slate-700 dark:text-slate-100">
              {copy.evidenceLegend.unknown}
            </span>
          </div>

          <div className={`${styles.shortlistGrid} mt-8`}>
            {providers.map(({ copy: item, provider }, index) => (
              <article key={provider.slug} className={styles.providerCard}>
                <div className={styles.cardTopline} />
                <div className="flex h-full flex-col p-5 sm:p-6">
                  <div className={styles.providerCardHeader}>
                    <ProviderLogo slug={item.slug} name={provider.name} />
                    <span className={styles.rankBadge}>
                      <span className={styles.rankNumber}>{index + 1}</span>
                      <span>{item.badge}</span>
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
                    {item.summary}
                  </p>

                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="font-black text-slate-950 dark:text-white">
                        {contentLocale === "nl" ? "Geschikt voor" : "Best for"}
                      </dt>
                      <dd className="mt-1 leading-6 text-slate-600 dark:text-slate-300">
                        {item.bestFor}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-black text-slate-950 dark:text-white">
                        {contentLocale === "nl" ? "Kijk verder als" : "Skip if"}
                      </dt>
                      <dd className="mt-1 leading-6 text-slate-600 dark:text-slate-300">
                        {item.skipIf}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5 space-y-2 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-950/65">
                    <p className="flex gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      {item.documentedFeature}
                    </p>
                    <p className="flex gap-2 text-slate-600 dark:text-slate-300">
                      <CircleHelp
                        className="mt-0.5 size-4 shrink-0 text-[#1268f3] dark:text-[#24c6dc]"
                        aria-hidden="true"
                      />
                      {item.requirement}
                    </p>
                    <p className="flex gap-2 text-amber-800 dark:text-amber-200">
                      <AlertTriangle
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item.testStatus}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <ProviderAction provider={provider} copy={item} />
                    <p className={styles.partnerLabel}>{copy.partnerLabel}</p>
                    <div className="mt-3 flex flex-col gap-2 text-sm">
                      <Link
                        href={`/reviews/${provider.slug}`}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg font-bold text-[#1268f3] hover:underline dark:text-[#24c6dc]"
                      >
                        {item.reviewLabel}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg text-center font-semibold text-slate-600 hover:text-slate-950 hover:underline dark:text-slate-300 dark:hover:text-white"
                      >
                        {item.sourceLabel}
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="comparison"
        className={`${styles.section} container max-w-7xl py-14 sm:py-20`}
      >
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-[-0.035em] sm:text-4xl">
            {copy.compareTitle}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {copy.compareIntro}
          </p>
        </div>
        <div className={`${styles.tableWrap} mt-8`}>
          <table className={styles.comparisonTable}>
            <caption className="sr-only">{copy.compareTitle}</caption>
            <thead>
              <tr>
                {copy.compareHeaders.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {copy.compareRows.map((row) => {
                const provider = providers.find(
                  (item) => item.copy.slug === row.slug,
                )?.provider;
                if (!provider) return null;
                return (
                  <tr key={row.slug}>
                    <th scope="row">
                      <ProviderLogo
                        slug={row.slug}
                        name={provider.name}
                        size="small"
                      />
                    </th>
                    <td>{row.feature}</td>
                    <td>{row.setup}</td>
                    <td>{row.devices}</td>
                    <td>{row.limit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/70 py-14 dark:border-slate-700 dark:bg-slate-950/45 sm:py-20">
        <div className="container max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1268f3] dark:text-[#24c6dc]">
              {copy.deepDiveEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              {copy.deepDiveTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {copy.deepDiveIntro}
            </p>
          </div>

          <div className="mt-9 space-y-7">
            {providers.map(({ copy: item, provider }, index) => (
              <article key={provider.slug} className={styles.deepDive}>
                <figure className={styles.deepVisual}>
                  <ProviderVisual
                    slug={item.slug}
                    name={provider.name}
                    label={item.documentedFeature}
                  />
                  {item.slug === "nordvpn" && (
                    <figcaption className={styles.providerCaption}>
                      {copy.nordImageCaption}
                    </figcaption>
                  )}
                </figure>
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <ProviderLogo slug={item.slug} name={provider.name} />
                    <span className="rounded-full bg-[#b8e34a] px-3 py-2 text-xs font-black text-[#071226]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-[-0.025em]">
                    {index + 1}. {provider.name}: {item.bestFor}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                    {item.summary}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-6">
                    <li className="flex gap-3">
                      <Check
                        className="mt-1 size-4 shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      <span>{item.documentedFeature}</span>
                    </li>
                    <li className="flex gap-3">
                      <CircleHelp
                        className="mt-1 size-4 shrink-0 text-[#1268f3] dark:text-[#24c6dc]"
                        aria-hidden="true"
                      />
                      <span>{item.requirement}</span>
                    </li>
                    <li className="flex gap-3">
                      <AlertTriangle
                        className="mt-1 size-4 shrink-0 text-amber-600"
                        aria-hidden="true"
                      />
                      <span>{item.testStatus}</span>
                    </li>
                  </ul>
                  <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {contentLocale === "nl"
                      ? "Wil je de actuele voorwaarden zelf zien? "
                      : "Want to check the current terms yourself? "}
                    {provider.affiliateUrl ? (
                      <AffiliateTextLink
                        vpnId={provider.slug}
                        vpnName={provider.name}
                        affiliateUrl={provider.affiliateUrl}
                        className="font-bold text-[#1268f3] underline decoration-2 underline-offset-4 dark:text-[#24c6dc]"
                      >
                        {contentLocale === "nl"
                          ? `Open de actuele ${provider.name}-pagina`
                          : `Open the current ${provider.name} page`}
                      </AffiliateTextLink>
                    ) : (
                      <Link
                        href={`/reviews/${provider.slug}`}
                        className="font-bold text-[#1268f3] underline decoration-2 underline-offset-4 dark:text-[#24c6dc]"
                      >
                        {item.reviewLabel}
                      </Link>
                    )}
                    .
                  </p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <ProviderAction provider={provider} copy={item} />
                    <Link
                      href={`/reviews/${provider.slug}`}
                      className={`${styles.outlineButton} inline-flex items-center justify-center gap-2 rounded-lg border font-bold`}
                    >
                      {item.reviewLabel}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container max-w-7xl py-14 sm:py-20">
        <div className={`${styles.methodPanel} p-6 sm:p-9 lg:p-12`}>
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b8e34a]">
              Evidence, not theatre
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
              {copy.methodTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {copy.methodIntro}
            </p>
          </div>
          <div className={`${styles.methodGrid} mt-8`}>
            {copy.methodCards.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/15 bg-white/[0.07] p-5"
              >
                <p
                  className={`text-xs font-black uppercase tracking-[0.17em] ${index === 0 ? "text-[#b8e34a]" : index === 1 ? "text-[#24c6dc]" : "text-amber-300"}`}
                >
                  {item.label}
                </p>
                <h3 className="mt-3 text-lg font-black text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="prepare"
        className={`${styles.section} border-y border-slate-200 bg-white/70 py-14 dark:border-slate-700 dark:bg-slate-950/45 sm:py-20`}
      >
        <div className="container max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1268f3] dark:text-[#24c6dc]">
              {copy.prepareEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              {copy.prepareTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {copy.prepareIntro}
            </p>
          </div>
          <ol className={`${styles.prepareGrid} mt-8`}>
            {copy.prepareSteps.map((step, index) => {
              const Icon = prepareIcons[index];
              return (
                <li key={step.title} className={styles.prepareCard}>
                  <div className={styles.prepareCardHeader}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <span className={styles.prepareIcon}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-black">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className={styles.troublePanel}>
            <div>
              <span className={styles.troubleIcon}>
                <WifiOff className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-black">{copy.troubleTitle}</h2>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                {copy.troubleIntro}
              </p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {copy.troubleSteps.map((step, index) => (
                <li key={step} className={styles.troubleStep}>
                  <span className={styles.troubleStepNumber}>{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="mt-8 flex gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100 sm:p-6">
            <AlertTriangle
              className="mt-1 size-6 shrink-0"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-xl font-black">{copy.safetyTitle}</h2>
              <p className="mt-2 max-w-4xl leading-7">{copy.safetyBody}</p>
              <Link
                href="/countries/iran"
                className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-lg font-black underline decoration-2 underline-offset-4"
              >
                {copy.safetyLink}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="faq"
        className={`${styles.section} container max-w-4xl py-14 sm:py-20`}
      >
        <FAQAccordion faqs={copy.faqs} title={copy.faqTitle} />
      </section>

      <section className="border-y border-slate-200 bg-white/70 py-14 dark:border-slate-700 dark:bg-slate-950/45 sm:py-20">
        <div className="container grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.035em]">
              {copy.sourcesTitle}
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
              {copy.sourcesIntro}
            </p>
            <ol className="mt-6 space-y-3">
              {copy.sources.map((source, index) => (
                <li
                  key={source.url}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                >
                  <span className={styles.sourceNumber}>{index + 1}</span>
                  <div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center gap-2 font-bold text-[#1268f3] hover:underline dark:text-[#24c6dc]"
                    >
                      {source.label}
                      <ExternalLink
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {source.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="self-start rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
            <div className="flex items-center gap-4">
              <Image
                src="/images/team/marvin.webp"
                alt=""
                width={72}
                height={72}
                className="size-[4.5rem] rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-black">{copy.authorTitle}</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {copy.authorRole}
                </p>
              </div>
            </div>
            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
              {copy.authorBody}
            </p>
            <Link
              href="/authors/marvin-smit"
              className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-lg font-black text-[#1268f3] hover:underline dark:text-[#24c6dc]"
            >
              {copy.authorLink}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="container max-w-7xl py-14 sm:py-20">
        <div className={styles.newsletter}>
          <div className="flex gap-5">
            <ZeroToVpnMark className="hidden size-16 sm:block" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em]">
                {copy.newsletterEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">
                {copy.newsletterTitle}
              </h2>
              <p className="mt-3 max-w-2xl leading-7">{copy.newsletterBody}</p>
            </div>
          </div>
          <NewsletterForm
            variant="inline"
            source="iran-roundup"
            className={styles.newsletterForm}
          />
        </div>
      </section>

      <section className={`${styles.relatedSection} container max-w-7xl`}>
        <h2 className="text-2xl font-black">{copy.relatedTitle}</h2>
        <div className={`${styles.relatedGrid} mt-6`}>
          {copy.related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="flex items-center justify-between gap-3 text-lg font-black">
                {item.label}
                <ArrowRight
                  className="size-5 shrink-0 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.body}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
