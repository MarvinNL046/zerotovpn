import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Braces,
  ChevronRight,
  CircleAlert,
  FileCheck2,
  Mail,
  Scale,
  SearchCheck,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  OG_LOCALE_MAP,
  titelMetMerk,
} from "@/lib/seo-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

const AUTHOR_PATH = "/authors/marvin-smit";
const INDEXED_LOCALES = new Set(["en", "nl"]);

const pageCopy = {
  en: {
    metadataTitle: "Marvin Smit — Founder & Developer",
    metadataDescription:
      "Meet Marvin Smit, founder and developer of ZeroToVPN. See his editorial responsibilities, evidence standards, disclosure rules, and correction process.",
    home: "Home",
    authors: "Authors",
    eyebrow: "Author profile",
    name: "Marvin Smit",
    role: "Founder & developer of ZeroToVPN",
    intro:
      "Marvin is a Dutch web developer and digital entrepreneur who builds and maintains ZeroToVPN. On pages carrying his byline, his role is to keep the research scope, source status and commercial boundaries visible to the reader.",
    scopeLabel: "What this byline means",
    scope:
      "A Marvin Smit byline identifies editorial responsibility for the page. It does not imply a laboratory test, professional certification or fresh hands-on measurement unless the article separately shows the setup, date and evidence.",
    responsibilitiesTitle: "Editorial responsibilities",
    responsibilitiesLead:
      "The author profile is deliberately specific about the work behind the publication and the limits of that work.",
    responsibilities: [
      {
        title: "Source and claim review",
        body: "Separate provider documentation from independent sources and from ZeroToVPN observations, so readers can see what each statement is based on.",
        icon: SearchCheck,
      },
      {
        title: "Evidence status",
        body: "Keep unknown, provider-claimed, externally reviewed and directly observed information clearly labelled instead of compressing it into an unsupported score.",
        icon: FileCheck2,
      },
      {
        title: "Technical publishing",
        body: "Maintain the website, structured review templates, internal links and technical SEO checks used to publish and update ZeroToVPN pages.",
        icon: Braces,
      },
      {
        title: "Corrections and updates",
        body: "Review reported factual issues, update verified errors and keep limitations visible when a claim cannot yet be reproduced.",
        icon: BookOpenCheck,
      },
    ],
    standardsTitle: "How the work is governed",
    standards: [
      {
        title: "Method before verdict",
        body: "The public methodology explains how evidence, dated checks and performance measurements should be handled.",
        href: "/methodology",
        linkLabel: "Read the methodology",
        icon: BadgeCheck,
      },
      {
        title: "Editorial independence",
        body: "The editorial policy defines the boundary between publication decisions and commercial relationships.",
        href: "/editorial-policy",
        linkLabel: "Read the editorial policy",
        icon: Scale,
      },
      {
        title: "Affiliate transparency",
        body: "ZeroToVPN may receive a commission through some links. The disclosure explains what this funds and what it must not influence.",
        href: "/affiliate-disclosure",
        linkLabel: "Read the affiliate disclosure",
        icon: CircleAlert,
      },
    ],
    limitationsTitle: "Evidence boundary",
    limitationsBody:
      "ZeroToVPN does not present Marvin as a certified security auditor or an independent VPN laboratory. Provider claims remain claims until an appropriate source or reproducible check supports them. Performance statements should include the relevant device, route, protocol and test date.",
    contactTitle: "Question a claim or report an error",
    contactBody:
      "Send the page URL, the exact statement and any supporting source. That gives us enough context to review the issue and publish a correction when needed.",
    contactLink: "Contact ZeroToVPN",
    profileImageAlt: "Marvin Smit, founder and developer of ZeroToVPN",
  },
  nl: {
    metadataTitle: "Marvin Smit — oprichter en ontwikkelaar",
    metadataDescription:
      "Maak kennis met Marvin Smit, oprichter en ontwikkelaar van ZeroToVPN. Bekijk zijn redactietaken, bewijsregels, disclosure, bewijsgrenzen en correctieproces.",
    home: "Home",
    authors: "Auteurs",
    eyebrow: "Auteursprofiel",
    name: "Marvin Smit",
    role: "Oprichter en ontwikkelaar van ZeroToVPN",
    intro:
      "Marvin is een Nederlandse webontwikkelaar en digitale ondernemer die ZeroToVPN bouwt en onderhoudt. Op pagina’s met zijn naam is zijn rol om de onderzoeksscope, bronstatus en commerciële grenzen zichtbaar te houden voor de lezer.",
    scopeLabel: "Wat deze auteursnaam betekent",
    scope:
      "De naam Marvin Smit geeft aan wie redactioneel verantwoordelijk is voor de pagina. Dat betekent niet automatisch dat er een laboratoriumtest, vakcertificering of nieuwe praktijkmeting is uitgevoerd. Zo’n meting telt pas mee wanneer het artikel ook de opstelling, datum en het bewijs toont.",
    responsibilitiesTitle: "Redactionele verantwoordelijkheden",
    responsibilitiesLead:
      "Dit auteursprofiel benoemt bewust zowel het werk achter de publicatie als de grenzen van dat werk.",
    responsibilities: [
      {
        title: "Bronnen en claims beoordelen",
        body: "Providerdocumentatie scheiden van onafhankelijke bronnen en ZeroToVPN-observaties, zodat lezers kunnen zien waarop een uitspraak is gebaseerd.",
        icon: SearchCheck,
      },
      {
        title: "Bewijsstatus bewaken",
        body: "Onbekende informatie, providerclaims, extern beoordeelde gegevens en directe observaties duidelijk labelen in plaats van samenvoegen tot een onbewezen score.",
        icon: FileCheck2,
      },
      {
        title: "Technische publicatie",
        body: "De website, gestructureerde reviewtemplates, interne links en technische SEO-controles voor publicatie en updates onderhouden.",
        icon: Braces,
      },
      {
        title: "Correcties en updates",
        body: "Gemelde feitelijke problemen beoordelen, bevestigde fouten aanpassen en beperkingen zichtbaar houden wanneer een claim nog niet reproduceerbaar is.",
        icon: BookOpenCheck,
      },
    ],
    standardsTitle: "Hoe het werk wordt bewaakt",
    standards: [
      {
        title: "Methode vóór oordeel",
        body: "De openbare methodologie legt uit hoe bewijs, gedateerde controles en prestatiemetingen behandeld horen te worden.",
        href: "/methodology",
        linkLabel: "Lees de methodologie",
        icon: BadgeCheck,
      },
      {
        title: "Redactionele onafhankelijkheid",
        body: "Het redactionele beleid bepaalt de grens tussen publicatiebeslissingen en commerciële relaties.",
        href: "/editorial-policy",
        linkLabel: "Lees het redactionele beleid",
        icon: Scale,
      },
      {
        title: "Affiliate-transparantie",
        body: "ZeroToVPN kan via sommige links een commissie ontvangen. De disclosure legt uit wat dit financiert en wat het niet mag beïnvloeden.",
        href: "/affiliate-disclosure",
        linkLabel: "Lees de affiliate-disclosure",
        icon: CircleAlert,
      },
    ],
    limitationsTitle: "Grens van het bewijs",
    limitationsBody:
      "ZeroToVPN presenteert Marvin niet als gecertificeerd security-auditor of onafhankelijk VPN-laboratorium. Providerclaims blijven claims totdat een geschikte bron of reproduceerbare controle ze ondersteunt. Prestatieclaims horen het relevante apparaat, de route, het protocol en de testdatum te vermelden.",
    contactTitle: "Betwist een claim of meld een fout",
    contactBody:
      "Stuur de pagina-URL, de precieze uitspraak en een eventuele ondersteunende bron. Daarmee hebben we genoeg context om het probleem te beoordelen en zo nodig een correctie te publiceren.",
    contactLink: "Neem contact op met ZeroToVPN",
    profileImageAlt: "Marvin Smit, oprichter en ontwikkelaar van ZeroToVPN",
  },
} as const;

function getPageLocale(locale: string): keyof typeof pageCopy {
  return locale === "nl" ? "nl" : "en";
}

function getCanonicalUrl(locale: string) {
  return locale === "nl"
    ? `${BASE_URL}/nl${AUTHOR_PATH}`
    : `${BASE_URL}${AUTHOR_PATH}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = pageCopy[getPageLocale(locale)];
  const canonical = getCanonicalUrl(locale);
  const indexable = INDEXED_LOCALES.has(locale);

  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: titelMetMerk(copy.metadataTitle) },
    description: copy.metadataDescription,
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}${AUTHOR_PATH}`,
        nl: `${BASE_URL}/nl${AUTHOR_PATH}`,
        "x-default": `${BASE_URL}${AUTHOR_PATH}`,
      },
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      url: canonical,
      siteName: "ZeroToVPN",
      type: "profile",
      firstName: "Marvin",
      lastName: "Smit",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function MarvinSmitAuthorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = pageCopy[getPageLocale(locale)];
  const canonical = getCanonicalUrl(locale);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}${AUTHOR_PATH}#person`,
    name: "Marvin Smit",
    url: canonical,
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/team/marvin.webp`,
      width: 360,
      height: 360,
    },
    jobTitle: copy.role,
    description: copy.intro,
    worksFor: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "ZeroToVPN",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "ProfilePage",
      "@id": canonical,
      url: canonical,
      name: copy.metadataTitle,
    },
  };

  return (
    <article className="bg-[#f7f8f4] text-slate-950 dark:bg-background dark:text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <header className="border-b border-slate-200 bg-white dark:border-border dark:bg-card">
        <div className="container max-w-6xl py-6 sm:py-8 lg:py-12">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-muted-foreground">
              <li>
                <Link className="rounded-md hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 dark:hover:text-foreground" href="/">
                  {copy.home}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>{copy.authors}</li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="font-medium text-slate-900 dark:text-foreground">
                {copy.name}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
            <div className="relative mx-auto w-full max-w-[280px]">
              <div aria-hidden="true" className="absolute -inset-3 -rotate-3 rounded-[2rem] bg-[#b7ea3f]" />
              <Image
                src="/images/team/marvin.webp"
                alt={copy.profileImageAlt}
                width={360}
                height={360}
                priority
                sizes="(max-width: 1024px) 280px, 280px"
                className="relative aspect-square w-full rounded-[1.65rem] border-4 border-white object-cover shadow-xl dark:border-card"
              />
            </div>

            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">
                {copy.eyebrow}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {copy.name}
              </h1>
              <p className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
                {copy.role}
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-muted-foreground">
                {copy.intro}
              </p>

              <aside className="mt-7 rounded-2xl border border-lime-300 bg-lime-50 p-5 dark:border-lime-900 dark:bg-lime-950/30">
                <p className="font-bold text-slate-950 dark:text-foreground">{copy.scopeLabel}</p>
                <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">{copy.scope}</p>
              </aside>
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="responsibilities-title" className="py-14 sm:py-16 lg:py-20">
        <div className="container max-w-6xl">
          <div className="max-w-3xl">
            <h2 id="responsibilities-title" className="text-3xl font-bold sm:text-4xl">
              {copy.responsibilitiesTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-muted-foreground">
              {copy.responsibilitiesLead}
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {copy.responsibilities.map((item) => (
              <section key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-border dark:bg-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-[#b7ea3f] dark:bg-slate-900">
                    <item.icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600 dark:text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="standards-title" className="border-y border-slate-200 bg-slate-950 py-14 text-white sm:py-16 lg:py-20 dark:border-border">
        <div className="container max-w-6xl">
          <h2 id="standards-title" className="text-3xl font-bold sm:text-4xl">
            {copy.standardsTitle}
          </h2>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {copy.standards.map((item) => (
              <section key={item.title} className="flex flex-col rounded-2xl border border-white/15 bg-white/[0.06] p-6">
                <item.icon aria-hidden="true" className="h-6 w-6 text-[#b7ea3f]" />
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-slate-300">{item.body}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-lg font-bold text-[#b7ea3f] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b7ea3f]"
                >
                  {item.linkLabel}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="limitations-title" className="py-14 sm:py-16 lg:py-20">
        <div className="container max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.65fr)]">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-border dark:bg-card sm:p-9">
              <div className="flex items-start gap-4">
                <CircleAlert aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-orange-600" />
                <div>
                  <h2 id="limitations-title" className="text-2xl font-bold sm:text-3xl">
                    {copy.limitationsTitle}
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-muted-foreground">
                    {copy.limitationsBody}
                  </p>
                </div>
              </div>
            </div>

            <aside className="rounded-2xl bg-[#b7ea3f] p-7 text-slate-950 sm:p-9">
              <Mail aria-hidden="true" className="h-7 w-7" />
              <h2 className="mt-5 text-2xl font-bold">{copy.contactTitle}</h2>
              <p className="mt-3 leading-7 text-slate-800">{copy.contactBody}</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
              >
                {copy.contactLink}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}
