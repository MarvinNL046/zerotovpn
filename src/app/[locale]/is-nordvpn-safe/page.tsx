import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { OG_LOCALE_MAP, generateAlternates, getShortMonthYear, titelMetMerk } from "@/lib/seo-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQAccordion } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getVpnBySlug } from "@/lib/vpn-data";
import {
  NORDVPN_KRITIEK,
  NORDVPN_STERK,
  type Oordeel,
} from "@/lib/nordvpn-criticism";
import { Link } from "@/i18n/navigation";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = getShortMonthYear();

  const titles: Record<string, string> = {
    en: `Why People Say to Avoid NordVPN (${m}) — What Holds Up`,
    nl: `Waarom mensen NordVPN afraden (${m}) — wat ervan klopt`,
    de: `Warum von NordVPN abgeraten wird (${m}) — was davon stimmt`,
    es: `Por qué dicen que evites NordVPN (${m}) — qué es cierto`,
    fr: `Pourquoi certains déconseillent NordVPN (${m}) — ce qui tient`,
    zh: `为什么有人建议避开 NordVPN（${m}）— 哪些说法站得住脚`,
    ja: `NordVPNを避けるべきと言われる理由（${m}）— 事実はどこまでか`,
    ko: `NordVPN을 피하라는 이유 (${m}) — 사실은 어디까지인가`,
    th: `ทำไมบางคนบอกให้เลี่ยง NordVPN (${m}) — ข้อไหนจริง`,
  };

  const descriptions: Record<string, string> = {
    en: "We rank NordVPN first on most of our lists and earn a commission from it. So here is every criticism we could find, with a verdict on each: which are fair, which need context, and which are internet rumour.",
    nl: "Wij zetten NordVPN op de meeste lijsten op één en verdienen er commissie aan. Daarom hier elk kritiekpunt dat we konden vinden, met een oordeel: wat klopt, wat vraagt om context, en wat is internetgerucht.",
    de: "Wir setzen NordVPN in den meisten Listen auf Platz eins und verdienen daran mit. Deshalb hier jeder Kritikpunkt mit Bewertung: was stimmt, was braucht Kontext, was ist Gerücht.",
    es: "Colocamos NordVPN en primer lugar en casi todas nuestras listas y ganamos comisión. Por eso: cada crítica con un veredicto — cuál es justa, cuál necesita contexto y cuál es rumor.",
    fr: "Nous classons NordVPN premier dans la plupart de nos listes et touchons une commission. Voici donc chaque critique avec un verdict : ce qui tient, ce qui demande du contexte, ce qui relève de la rumeur.",
    zh: "我们在多数榜单里把 NordVPN 排在第一，并从中获得佣金。所以这里逐条列出批评并给出判断：哪些成立、哪些需要背景、哪些只是传言。",
    ja: "当サイトは多くのランキングでNordVPNを1位にしており、紹介料も得ています。だからこそ、見つけたすべての批判に判断を付けて並べます。妥当なもの、文脈が要るもの、単なる噂。",
    ko: "저희는 대부분의 목록에서 NordVPN을 1위로 두고 수수료도 받습니다. 그래서 찾은 모든 비판에 판단을 붙였습니다. 타당한 것, 맥락이 필요한 것, 그리고 소문.",
    th: "เราจัดอันดับ NordVPN เป็นอันดับหนึ่งในรายการส่วนใหญ่และได้รับค่าคอมมิชชัน จึงรวบรวมทุกคำวิจารณ์พร้อมคำตัดสิน ข้อไหนสมเหตุสมผล ข้อไหนต้องมีบริบท และข้อไหนเป็นเพียงข่าวลือ",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: titelMetMerk(titles[locale] || titles.en) },
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "article",
    },
    alternates: generateAlternates("/is-nordvpn-safe", locale),
  };
}

const OORDEEL_STIJL: Record<
  Oordeel,
  { label: string; className: string; Icon: typeof CheckCircle }
> = {
  terecht: {
    label: "Fair",
    className: "border-orange-500/50 bg-orange-50 text-orange-700 dark:bg-transparent dark:text-orange-400",
    Icon: AlertTriangle,
  },
  genuanceerd: {
    label: "True, with context",
    className: "border-blue-500/50 bg-blue-50 text-blue-700 dark:bg-transparent dark:text-blue-400",
    Icon: Info,
  },
  onbewezen: {
    label: "Not supported",
    className: "border-green-500/50 bg-green-50 text-green-700 dark:bg-transparent dark:text-green-500",
    Icon: XCircle,
  },
};

export default async function IsNordVpnSafePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Alleen Engels redactioneel uitgewerkt, conform de fase-3-scope. De
  // metadata is wel per taal; dit is bewust, niet vergeten.
  const t = {
    badge: "Sourced, point by point",
    title: "Why People Say to Avoid NordVPN",
    subtitle:
      "We put NordVPN first on most of our lists, and we earn a commission when you buy through us. That is exactly why this page exists: if the criticism is fair, you should read it here rather than find it later.",
    verdictTitle: "The short answer",
    verdictBody:
      "Nothing we found makes NordVPN unsafe to use. Two things are worth knowing before you buy: there is no port forwarding, and the renewal price is well above the advertised one. If your threat model involves a government rather than an advertiser, the closed-source apps and the European staff base are reasons to look at Mullvad or Proton VPN instead.",
    pointsTitle: "Every criticism, weighed",
    pointsIntro:
      "Each point below links to where it comes from. We include the ones that do not hold up, because you will meet them anyway.",
    theClaim: "The claim",
    ourRead: "Our read",
    strongTitle: "What is genuinely good",
    strongIntro:
      "A page that only lists complaints is not an assessment. These are the reasons NordVPN still leads most of our lists.",
    altTitle: "If one of these is a dealbreaker",
    alts: [
      {
        slug: "protonvpn",
        why: "Open-source apps, Swiss jurisdiction, and port forwarding. The usual choice when the closed-source objection matters to you.",
      },
      {
        slug: "mullvad",
        why: "No account, no email, flat pricing with no renewal jump, and open-source clients. The strictest option on this list.",
      },
    ],
    getVpn: "Get",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Is NordVPN safe to use?",
        a: "Yes, in the sense that matters for most people: the encryption is standard and sound, the no-logs policy has been audited by external firms more than once, and servers run from RAM so a seized machine holds nothing. The criticisms on this page are about company behaviour and missing features, not about whether the tunnel protects you.",
      },
      {
        q: "What is the NordVPN controversy?",
        a: "Usually one of two things. The 2018 breach: an intruder reached a single rented server in Finland, and NordVPN did not disclose it until late 2019. Or the Tesonet claim: NordVPN's founders also founded Tesonet, which owns a web-scraping company, and people infer that user data is shared. The breach is real and the delay is a fair complaint. The data-sharing claim has never been demonstrated.",
      },
      {
        q: "Does NordVPN support port forwarding?",
        a: "No, on any server. NordVPN frames this as a security decision, since an open port is an attack surface. If you seed torrents or need to reach a device at home, Proton VPN and Private Internet Access do offer it.",
      },
      {
        q: "Is NordVPN really based in Panama?",
        a: "It is incorporated in Panama, and that is what determines which courts can compel it to hand over data. Most of the staff work from Lithuania and the Netherlands, and the Netherlands is part of the 9 Eyes arrangement. Both facts are true at once; which one you weigh more heavily depends on who you are hiding from.",
      },
      {
        q: "Why does this site still rank NordVPN first?",
        a: "Because speed, audit history and reliability still put it at the top for the average buyer, and because none of the criticisms above affect whether the connection is secure. Where a criticism does matter — seeding, open-source code, price on renewal — we say so on this page and point to a provider that solves it.",
      },
    ],
    sourcesTitle: "Sources",
    sourcesIntro: "Every point above links to where it came from. Read on 25 July 2026.",
  };

  const alternatieven = t.alts
    .map((a) => ({ ...a, vpn: getVpnBySlug(a.slug) }))
    .filter((a) => a.vpn !== undefined);

  const bronnen = Array.from(
    new Map(
      [
        ...NORDVPN_KRITIEK.map((k) => k.bron),
        ...NORDVPN_STERK.map((s) => s.bron),
      ]
        .filter((b) => b !== undefined)
        .map((b) => [b!.url, b!]),
    ).values(),
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Reviews", href: "/reviews" },
          { name: "Is NordVPN safe?", href: "/is-nordvpn-safe" },
        ]}
      />

      <main>
        <section className="border-b py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                {t.badge}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {t.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
              <div className="mt-6">
                <AffiliateDisclosure variant="inline" />
              </div>
            </div>
          </div>
        </section>

        {/* Het korte antwoord bovenaan — niet onderaan verstoppen */}
        <section className="py-12">
          <div className="container">
            <Card className="mx-auto max-w-3xl border-2 border-primary/40">
              <CardContent className="pt-6">
                <h2 className="mb-3 text-xl font-bold">{t.verdictTitle}</h2>
                <p className="text-muted-foreground">{t.verdictBody}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y bg-muted/30 py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold md:text-3xl">{t.pointsTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.pointsIntro}</p>
            </div>

            <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-6">
              {NORDVPN_KRITIEK.map((punt) => {
                const stijl = OORDEEL_STIJL[punt.oordeel];
                return (
                  <Card key={punt.id}>
                    <CardContent className="flex flex-col gap-3 pt-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold">{punt.kop}</h3>
                        <Badge variant="outline" className={stijl.className}>
                          <stijl.Icon className="mr-1 size-3" aria-hidden="true" />
                          {stijl.label}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {t.theClaim}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {punt.kritiek}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {t.ourRead}
                        </p>
                        <p className="mt-1 text-sm">{punt.onsOordeel}</p>
                      </div>

                      {punt.bron && (
                        <a
                          href={punt.bron.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-xs text-primary hover:underline"
                        >
                          {punt.bron.label}
                        </a>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold md:text-3xl">{t.strongTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.strongIntro}</p>
            </div>
            <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
              {NORDVPN_STERK.map((s) => (
                <Card key={s.kop}>
                  <CardContent className="flex flex-col gap-3 pt-6">
                    <CheckCircle
                      className="size-6 text-green-600 dark:text-green-500"
                      aria-hidden="true"
                    />
                    <h3 className="font-semibold">{s.kop}</h3>
                    <p className="text-sm text-muted-foreground">{s.tekst}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Alternatieven — het punt van de pagina is dat de lezer kan kiezen */}
        <section className="border-y bg-muted/30 py-12 lg:py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              {t.altTitle}
            </h2>
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
              {alternatieven.map((alt) => (
                <Card key={alt.slug}>
                  <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{alt.vpn!.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{alt.why}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-2 md:w-44">
                      <div className="metric text-2xl font-bold text-primary">
                        ${alt.vpn!.priceTwoYear || alt.vpn!.priceYearly}
                      </div>
                      <AffiliateButton
                        vpnId={alt.vpn!.id}
                        vpnName={alt.vpn!.name}
                        affiliateUrl={alt.vpn!.affiliateUrl}
                        className="w-full"
                      >
                        {t.getVpn} {alt.vpn!.name}
                      </AffiliateButton>
                      <Link
                        href={`/compare/nordvpn-vs-${alt.slug}`}
                        className="text-xs text-primary hover:underline"
                      >
                        NordVPN vs {alt.vpn!.name}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
                {t.faqTitle}
              </h2>
              <FAQAccordion
                faqs={t.faqs.map((f) => ({ question: f.q, answer: f.a }))}
              />
            </div>
          </div>
        </section>

        <section className="border-t py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-2 text-lg font-semibold">{t.sourcesTitle}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{t.sourcesIntro}</p>
              <ul className="flex flex-col gap-2 text-sm">
                {bronnen.map((b) => (
                  <li key={b.url}>
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary hover:underline"
                    >
                      {b.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <RelatedPages
          pages={[
            {
              title: "NordVPN review",
              description: "Our full review, with speed and streaming results.",
              href: "/reviews/nordvpn",
            },
            {
              title: "NordVPN vs Proton VPN",
              description: "Side by side on privacy, speed and price.",
              href: "/compare/nordvpn-vs-protonvpn",
            },
            {
              title: "Best VPNs for torrenting",
              description: "Where port forwarding actually matters.",
              href: "/best/vpn-torrenting",
            },
          ]}
        />
      </main>
    </>
  );
}
