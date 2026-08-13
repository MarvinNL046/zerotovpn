import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { DEFAULT_OG_IMAGE, OG_LOCALE_MAP, generateAlternates, getShortMonthYear, titelMetMerk } from "@/lib/seo-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQAccordion } from "@/components/seo/faq-schema";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Link } from "@/i18n/navigation";
import { getVpnBySlug } from "@/lib/vpn-data";
import { VPN_TRIALS, GRATIS_ABONNEMENT } from "@/lib/vpn-trials";
import { CheckCircle, XCircle, CreditCard, Clock, AlertTriangle } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = getShortMonthYear();

  const titles: Record<string, string> = {
    en: `Best VPN Free Trials (${m}): 7-Day & No-Card Options`,
    nl: `VPN's met een échte gratis proefperiode (${m}) — bij de bron gecheckt`,
    de: `VPNs mit echter kostenloser Testphase (${m}) — an der Quelle geprüft`,
    es: `VPNs con prueba gratuita real (${m}) — verificado en la fuente`,
    fr: `VPN avec un vrai essai gratuit (${m}) — vérifié à la source`,
    zh: `提供真正免费试用的 VPN（${m}）— 逐一核对官方说明`,
    ja: `本当に無料で試せるVPN（${m}）— 提供元で確認`,
    ko: `진짜 무료 체험이 있는 VPN (${m}) — 공식 페이지에서 확인`,
    th: `VPN ที่มีทดลองใช้ฟรีจริง (${m}) — ตรวจสอบจากต้นทาง`,
  };

  const descriptions: Record<string, string> = {
    en: "Compare genuine VPN free trials, 7-day options and no-card tests. We check provider terms, payment requirements, refund windows and source dates.",
    nl: "De meeste 'gratis proefperiodes' zijn een geld-terug-garantie in vermomming. We controleerden elke claim op de pagina van de aanbieder zelf: wie geeft echt een proefperiode, hoe lang, en moet je eerst betaalgegevens invullen?",
    de: "Die meisten VPN-Testphasen sind verkappte Geld-zurück-Garantien. Wir haben jede Angabe auf der Seite des Anbieters geprüft: Wer bietet wirklich eine Testphase, wie lange, und sind Zahlungsdaten nötig?",
    es: "La mayoría de las pruebas gratuitas son garantías de devolución disfrazadas. Verificamos cada dato en la página del proveedor: quién ofrece prueba real, cuántos días y si exigen datos de pago.",
    fr: "La plupart des « essais gratuits » sont des garanties de remboursement déguisées. Nous avons vérifié chaque affirmation sur le site du fournisseur : qui propose un vrai essai, combien de jours, et faut-il donner sa carte ?",
    zh: "多数所谓的免费试用其实是退款保证。我们逐条核对了各服务商官网的说法：谁提供真正的试用、多长时间、是否必须先填付款信息。",
    ja: "多くの「無料トライアル」は実際には返金保証です。各提供元の公式ページで確認しました。本当に試せるのはどこか、何日間か、支払い情報は必要か。",
    ko: "대부분의 '무료 체험'은 사실상 환불 보장입니다. 각 업체의 공식 페이지에서 직접 확인했습니다. 진짜 체험을 주는 곳은 어디인지, 며칠인지, 결제 정보가 필요한지.",
    th: "ส่วนใหญ่ที่เรียกว่าทดลองใช้ฟรีคือการรับประกันคืนเงิน เราตรวจสอบทุกข้อความจากหน้าเว็บของผู้ให้บริการเอง ใครให้ทดลองจริง กี่วัน และต้องกรอกข้อมูลการชำระเงินก่อนหรือไม่",
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
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: generateAlternates("/best/vpn-free-trial", locale),
  };
}

export default async function VpnFreeTrialPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = {
    en: {
      badge: "Checked at the source",
      title: "VPNs With a Real Free Trial",
      subtitle:
        "Three different things get sold as a “free trial”. Only one of them lets you test a VPN without paying anything first.",
      typesTitle: "What counts as a free trial",
      types: [
        {
          title: "A real trial",
          desc: "You use the full service for a set number of days and pay nothing. Sometimes you still have to enter card details, but nothing is charged.",
          good: true,
        },
        {
          title: "A money-back guarantee",
          desc: "You pay the full amount up front and ask for a refund within 30 to 45 days. Useful, but it is not free — your money is gone in the meantime.",
          good: false,
        },
        {
          title: "A permanently free plan",
          desc: "Not a trial at all: a free tier you can keep using, usually with a data cap or fewer servers. Often the better way to test.",
          good: true,
        },
      ],
      tableTitle: "What each provider actually offers",
      tableIntro:
        "Each row below has a provider source and checked date in the Sources section. Where other sites disagree, we follow the provider's first-party wording.",
      colVpn: "VPN",
      colTrial: "Free trial",
      colPlatforms: "Where",
      colCard: "Card needed first",
      colRefund: "Money-back",
      noTrial: "None",
      days: "days",
      day: "day",
      hours: "24 hours",
      yes: "Yes",
      no: "No",
      correctionsTitle: "Two things you will read elsewhere that are wrong",
      corrections: [
        "Google's AI summary says ExpressVPN gives a 7-day mobile trial. ExpressVPN's own page says 3 days, on iOS and Android only.",
        "Several large review sites list a 7-day NordVPN trial on iOS and Android. NordVPN's own page says 3 days, Android only.",
      ],
      freeTierTitle: "Want to test without any deadline?",
      freeTierIntro:
        "These have a free plan that does not expire. Slower and more limited than paid, but you can take your time.",
      pickTitle: "Which to pick",
      picks: [
        {
          slug: "surfshark",
          verdict:
            "The longest trial that works on a computer: 7 days on desktop and mobile. You do enter payment details, but nothing is charged and you can cancel inside the week.",
        },
        {
          slug: "cyberghost",
          verdict:
            "The only one you can start on a laptop without handing over a card at all — but it is 24 hours, so plan what you want to test. The 45-day refund window is the longest of the four.",
        },
        {
          slug: "expressvpn",
          verdict:
            "Three days, phone or tablet only, through the app store. Note that buying via the app store puts you outside ExpressVPN's own 30-day refund policy.",
        },
        {
          slug: "nordvpn",
          verdict:
            "Three days, Android only. On any other device there is no trial — just the 30-day money-back route.",
        },
      ],
      startsAt: "From",
      perMonth: "/mo",
      getVpn: "Try",
      faqTitle: "Frequently asked questions",
      faqs: [
        {
          q: "Is there a VPN free trial without a credit card?",
          a: "Yes. CyberGhost's 24-hour Windows and macOS trial asks for no payment details. NordVPN says its 7-day trial can use PayPal instead of a card, while mobile app-store trials generally require a payment method. Check the provider's current checkout and country rules before starting.",
        },
        {
          q: "Is a 30-day money-back guarantee the same as a free trial?",
          a: "No. You pay the full subscription first and have to ask for the money back within the window. You will usually get it, but it is a refund, not a trial — and refunds can take days to appear on your statement.",
        },
        {
          q: "What is the longest VPN free trial?",
          a: "Seven days is currently listed by Surfshark and NordVPN's new-user plan. CyberGhost also lists seven days on iOS; its Windows and macOS option is 24 hours. Eligibility, plan length and payment rules differ, so compare the provider source rather than the headline number.",
        },
        {
          q: "Will I be charged automatically after the trial?",
          a: "Often, yes. Surfshark and NordVPN state that the selected plan is charged when the trial ends unless you cancel in time. Set a reminder, read the cancellation path and keep the confirmation; app-store billing follows the store's own rules.",
        },
        {
          q: "Can I just use a free VPN instead?",
          a: "For testing, often yes. Proton VPN, Windscribe, hide.me and TunnelBear have free plans that never expire. They are slower and more limited, but there is no clock running and no payment details involved.",
        },
        {
          q: "Which VPN has a 30-day free trial?",
          a: "A standard 30-day free trial is not the same as a 30-day money-back guarantee. ExpressVPN and several other providers use the latter: you pay first and request a refund within the window. The genuine trials listed here are shorter and device- or plan-specific.",
        },
        {
          q: "Which VPN gives you a free trial?",
          a: "The current provider pages list Surfshark for 7 days, CyberGhost for 24 hours on Windows and macOS plus mobile trials, ExpressVPN for 3 days through its iOS or Android app, and NordVPN for 7 days on eligible new-user plans plus a separate Android route. These are not interchangeable offers, so check the source and eligibility before clicking through.",
        },
        {
          q: "Is there any 100% free VPN?",
          a: "Yes, some providers offer a permanent free tier, but that is a different product from a time-limited trial. Compare limits, data policies, supported locations and device coverage in our evidence-led free VPN comparison before choosing one.",
        },
      ],
      sourcesTitle: "Sources",
      sourcesIntro: "Each claim above links to the provider page it came from; the checked date is shown beside the source.",
      checkedOn: "checked",
    },
  } as const;

  // Alleen Engels is redactioneel uitgewerkt; de andere talen krijgen de
  // Engelse tekst tot ze vertaald zijn. Beter zichtbaar Engels dan een half
  // vertaalde pagina met verzonnen termen — de metadata is wél per taal.
  const t = content.en;
  const picks = t.picks.map((pick) => pick.slug === "nordvpn"
    ? {
        ...pick,
        verdict: "Seven days for new users on 1- and 2-year plans, with payment details required. NordVPN also lists a separate 3-day Android route through Google Play; cancel before the trial ends or the chosen plan is charged.",
      }
    : pick);
  const localizedPageUrl = locale === "en" ? `${baseUrl}/best/vpn-free-trial` : `${baseUrl}/${locale}/best/vpn-free-trial`;

  const rijen = VPN_TRIALS.map((trial) => ({
    trial,
    vpn: getVpnBySlug(trial.slug),
  })).filter((r) => r.vpn !== undefined);

  const gratis = GRATIS_ABONNEMENT.map((slug) => getVpnBySlug(slug)).filter(
    (v) => v !== undefined,
  );

  const duur = (dagen: number | null) =>
    dagen === null ? t.noTrial : dagen === 1 ? t.hours : `${dagen} ${t.days}`;

  return (
    <>
      <ArticleJsonLd
        title="Best VPN Free Trials: Real Trials, Refunds & No-Card Options"
        description="Compare genuine VPN trials with money-back guarantees and permanently free tiers, using provider sources and checked dates."
        url={localizedPageUrl}
        datePublished="2026-01-01"
        dateModified="2026-08-13"
      />
      <BreadcrumbSchema
        items={[
          { name: "Best VPNs", href: "/best/best-vpn" },
          { name: "Free trial", href: "/best/vpn-free-trial" },
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
                Best VPN Free Trials: Real Trials, Refunds &amp; No-Card Options
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
              <div className="mt-6">
                <AffiliateDisclosure variant="inline" />
              </div>
              {false && (
              <p className="mt-4 text-sm text-muted-foreground hidden" aria-hidden="true">
                Last reviewed: 11 August 2026 ·{" "}
                <Link href="/methodology" className="text-primary hover:underline">
                  How we test and verify provider claims
                </Link>
              </p>
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                Last reviewed: 13 August 2026 ·{" "}
                <Link href="/methodology" className="text-primary hover:underline">
                  How we test and verify provider claims
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Wat telt als proefperiode */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              {t.typesTitle}
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {t.types.map((type) => (
                <Card key={type.title}>
                  <CardContent className="flex flex-col gap-3 pt-6">
                    {type.good ? (
                      <CheckCircle
                        className="size-6 text-green-600 dark:text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <AlertTriangle
                        className="size-6 text-orange-500"
                        aria-hidden="true"
                      />
                    )}
                    <h3 className="font-semibold">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">{type.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* De tabel */}
        <section id="comparison" className="border-y bg-muted/30 py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold md:text-3xl">{t.tableTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.tableIntro}</p>
            </div>

            <div className="mx-auto mt-8 max-w-5xl overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">VPN free trial comparison</caption>
                <thead>
                  <tr className="border-b text-left">
                    <th scope="col" className="p-3 font-semibold">{t.colVpn}</th>
                    <th scope="col" className="p-3 font-semibold">{t.colTrial}</th>
                    <th scope="col" className="p-3 font-semibold">{t.colPlatforms}</th>
                    <th scope="col" className="p-3 font-semibold">{t.colCard}</th>
                    <th scope="col" className="p-3 font-semibold">{t.colRefund}</th>
                  </tr>
                </thead>
                <tbody>
                  {rijen.map(({ trial, vpn }) => (
                    <tr key={trial.slug} className="border-b hover:bg-background/60">
                      <td className="p-3 font-medium">{vpn!.name}</td>
                      <td className="metric p-3 font-semibold">
                        {duur(trial.dagen)}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {trial.platforms.join(", ")}
                      </td>
                      <td className="p-3">
                        {trial.betaalgegevensNodig ? (
                          <span className="inline-flex items-center gap-1.5">
                            <CreditCard
                              className="size-4 text-orange-500"
                              aria-hidden="true"
                            />
                            {t.yes}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-500">
                            <XCircle className="size-4" aria-hidden="true" />
                            {t.no}
                          </span>
                        )}
                      </td>
                      <td className="metric p-3">
                        {trial.moneyBackDagen} {t.days}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Correcties op wat elders staat */}
            <div className="mx-auto mt-8 max-w-3xl">
              <h3 className="mb-3 font-semibold">{t.correctionsTitle}</h3>
              <ul className="flex flex-col gap-2">
                {t.corrections.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm">
                    <AlertTriangle
                      className="mt-0.5 size-4 shrink-0 text-orange-500"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Per aanbieder */}
        <section id="faq" className="py-12 lg:py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              {t.pickTitle}
            </h2>
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
              {picks.map((pick) => {
                const vpn = getVpnBySlug(pick.slug);
                const trial = VPN_TRIALS.find((x) => x.slug === pick.slug);
                if (!vpn || !trial) return null;
                return (
                  <Card key={pick.slug}>
                    <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold">{vpn.name}</h3>
                          <Badge variant="outline" className="gap-1">
                            <Clock className="size-3" aria-hidden="true" />
                            <span className="metric">{duur(trial.dagen)}</span>
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {pick.verdict}
                        </p>
                        {trial.voorwaarde && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            {trial.voorwaarde}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 flex-col items-center gap-2 md:w-44">
                        <div className="text-sm text-muted-foreground">
                          {t.startsAt}{" "}
                          <span className="metric font-bold text-foreground">
                            <AffiliateTextLink
                              vpnId={vpn.id}
                              vpnName={vpn.name}
                              affiliateUrl={vpn.affiliateUrl}
                              className="font-bold text-primary underline underline-offset-4 hover:text-primary/80"
                            >
                              ${vpn.priceTwoYear || vpn.priceYearly}
                            </AffiliateTextLink>
                          </span>
                          {t.perMonth}
                        </div>
                        <AffiliateButton
                          vpnId={vpn.id}
                          vpnName={vpn.name}
                          affiliateUrl={vpn.affiliateUrl}
                          className="w-full"
                        >
                          {t.getVpn} {vpn.name}
                        </AffiliateButton>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gratis abonnement als alternatief */}
        <section className="border-y bg-muted/30 py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold md:text-3xl">{t.freeTierTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.freeTierIntro}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Want a plan that never expires? See our{" "}
                <Link href="/best/free-vpn" className="text-primary hover:underline">
                  evidence-led free VPN comparison
                </Link>
                .
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {gratis.map((vpn) => (
                <Card key={vpn!.id}>
                  <CardContent className="flex flex-col gap-3 pt-6 text-center">
                    <h3 className="font-semibold">{vpn!.name}</h3>
                    <AffiliateButton
                      vpnId={vpn!.id}
                      vpnName={vpn!.name}
                      affiliateUrl={vpn!.affiliateUrl}
                      size="sm"
                      className="w-full"
                    >
                      {t.getVpn} {vpn!.name}
                    </AffiliateButton>
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
              <FAQAccordion faqs={t.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
            </div>
          </div>
        </section>

        {/* Bronnen — elke claim hierboven komt van de aanbieder zelf */}
        <section id="sources" className="border-t py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-2 text-lg font-semibold">{t.sourcesTitle}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{t.sourcesIntro}</p>
              <ul className="flex flex-col gap-2 text-sm">
                {VPN_TRIALS.map((trial) => {
                  const vpn = getVpnBySlug(trial.slug);
                  return (
                    <li key={trial.slug}>
                      <a
                        href={trial.bron}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary hover:underline"
                      >
                        {vpn?.name ?? trial.slug} — {trial.bron}
                      </a>{" "}
                      <span className="text-muted-foreground">
                        ({t.checkedOn} {trial.gecontroleerd})
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <RelatedPages
          pages={[
            {
              title: "Best Free VPN",
              description: "VPNs with a free plan that never expires.",
              href: "/best/free-vpn",
            },
            {
              title: "Best Cheap VPN",
              description: "The lowest prices that still pass our checks.",
              href: "/best/vpn-cheap",
            },
            {
              title: "Best VPNs Overall",
              description: "Our full ranking across every category.",
              href: "/best/best-vpn",
            },
          ]}
        />
      </main>
    </>
  );
}
