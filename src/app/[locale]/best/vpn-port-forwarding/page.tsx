import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { DEFAULT_OG_IMAGE, OG_LOCALE_MAP, generateAlternates, getShortMonthYear, titelMetMerk } from "@/lib/seo-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQAccordion } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getVpnBySlug } from "@/lib/vpn-data";
import {
  PORT_FORWARDING,
  type PortForwardingStatus,
} from "@/lib/vpn-port-forwarding";
import { CheckCircle, XCircle, CreditCard, History } from "lucide-react";
import { PortForwardingEditorialPage } from "@/components/editorial/port-forwarding-editorial-page";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = getShortMonthYear();

  const titles: Record<string, string> = {
    en: `Best VPNs With Port Forwarding (${m}): Providers Compared`,
    nl: `VPN's met port forwarding (${m}) — wie het nog heeft`,
    de: `VPNs mit Portweiterleitung (${m}) — wer es noch anbietet`,
    es: `VPNs con reenvío de puertos (${m}) — quién lo mantiene`,
    fr: `VPN avec redirection de port (${m}) — qui la propose encore`,
    zh: `支持端口转发的 VPN（${m}）— 谁还提供`,
    ja: `ポートフォワーディング対応VPN（${m}）— 今も使えるのはどこか`,
    ko: `포트 포워딩을 지원하는 VPN (${m}) — 아직 되는 곳`,
    th: `VPN ที่รองรับ Port Forwarding (${m}) — เจ้าไหนยังมี`,
  };

  const descriptions: Record<string, string> = {
    en: "Looking for a VPN with port forwarding? Compare Proton VPN, Private Internet Access and PureVPN, see who dropped the feature, and check current limits at the source.",
    nl: "Drie grote aanbieders ondersteunen port forwarding, vier niet, en één heeft het in 2023 verwijderd — wat de meeste lijstjes gemist hebben. Bij de bron nagelezen, met wat je per aanbieder echt krijgt.",
    de: "Drei große Anbieter unterstützen Portweiterleitung, vier nicht, und einer hat sie 2023 entfernt — was die meisten Listen übersehen haben. An der Quelle geprüft.",
    es: "Tres grandes proveedores admiten reenvío de puertos, cuatro no, y uno lo eliminó en 2023 — algo que casi ninguna lista ha notado. Verificado en la fuente.",
    fr: "Trois grands fournisseurs prennent en charge la redirection de port, quatre non, et un l'a supprimée en 2023 — ce que la plupart des listes n'ont pas remarqué. Vérifié à la source.",
    zh: "三家主流服务商支持端口转发，四家不支持，还有一家在 2023 年取消了——多数榜单都没注意到。逐一核对官方说明。",
    ja: "大手のうち3社はポートフォワーディングに対応し、4社は非対応。1社は2023年に廃止しており、多くのリストがそれを見落としています。提供元で確認しました。",
    ko: "주요 업체 중 3곳은 포트 포워딩을 지원하고 4곳은 지원하지 않으며, 한 곳은 2023년에 없앴습니다. 대부분의 목록이 놓친 사실이죠. 공식 페이지에서 확인했습니다.",
    th: "ผู้ให้บริการรายใหญ่สามเจ้ารองรับ Port Forwarding สี่เจ้าไม่รองรับ และหนึ่งเจ้ายกเลิกไปเมื่อปี 2023 ซึ่งรายการส่วนใหญ่ยังไม่ได้อัปเดต ตรวจสอบจากต้นทาง",
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
    alternates: generateAlternates("/best/vpn-port-forwarding", locale),
  };
}

const STATUS_STIJL: Record<
  PortForwardingStatus,
  { label: string; className: string; Icon: typeof CheckCircle }
> = {
  ja: {
    label: "Yes, included",
    className:
      "border-green-500/50 bg-green-50 text-green-700 dark:bg-transparent dark:text-green-500",
    Icon: CheckCircle,
  },
  betaald: {
    label: "Yes, paid add-on",
    className:
      "border-orange-500/50 bg-orange-50 text-orange-700 dark:bg-transparent dark:text-orange-400",
    Icon: CreditCard,
  },
  verwijderd: {
    label: "Removed in 2023",
    className:
      "border-blue-500/50 bg-blue-50 text-blue-700 dark:bg-transparent dark:text-blue-400",
    Icon: History,
  },
  nee: {
    label: "No",
    className: "border-border text-muted-foreground",
    Icon: XCircle,
  },
};

export default async function VpnPortForwardingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "en") return <PortForwardingEditorialPage />;

  // Alleen Engels redactioneel uitgewerkt, conform de fase-3-scope; de
  // metadata is wel per taal. Bewust, niet vergeten.
  const t = {
    badge: "Checked at the source",
    title: "Best VPNs With Port Forwarding",
    subtitle:
      "A feature that quietly disappeared from half the market. Here is who still offers it, what you actually get, and why the provider everyone used to recommend no longer counts.",
    whyTitle: "What port forwarding is for",
    whyBody:
      "A VPN normally blocks incoming connections. That is the point. Port forwarding opens one anyway, which matters in two situations: seeding torrents, where without it you can only connect to peers who can accept incoming connections, and reaching a device at home — a NAS, a game server, a camera — while you are elsewhere. If neither applies to you, none of this matters and you can ignore the feature entirely.",
    tableTitle: "Who has it",
    tableIntro:
      "Read on the providers' own pages and a dedicated comparison, on 25 July 2026. Each row links to its source.",
    colVpn: "VPN",
    colStatus: "Port forwarding",
    colWhat: "What you get",
    outdatedTitle: "Why most lists get this wrong",
    outdatedBody:
      "Mullvad was the standard recommendation for years. It removed forwarded ports on 1 July 2023, announced five weeks earlier, because people were using them to host malicious services — which got Mullvad's IPs blacklisted and hosting providers cancelling on them. Any list that still names Mullvad here has not been checked since at least 2023, whatever year is in the title.",
    pickTitle: "The short version",
    picks: [
      {
        slug: "protonvpn",
        why: "The best of the three if you want control: up to five ports that you choose. Included in the plan. The catch is the macOS app, which does not support it — you need Windows or Linux.",
      },
      {
        slug: "private-internet-access",
        why: "The simplest: one port, assigned automatically, on every platform and included in the price. You cannot pick the number, and it does not work on US servers.",
      },
      {
        slug: "purevpn",
        why: "The most flexible on paper — up to fifteen ports — but it is a paid add-on, so factor that into the price you are comparing.",
      },
    ],
    startsAt: "From",
    perMonth: "/mo",
    getVpn: "Get",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Does NordVPN support port forwarding?",
        a: "No, on any server. NordVPN frames this as a deliberate security decision, since an open port is an attack surface. That is a defensible position, but it does not change what you can do: if you need a forwarded port, you need a different provider.",
      },
      {
        q: "Does Mullvad still have port forwarding?",
        a: "No. Mullvad announced the removal on 29 May 2023 and switched it off on 1 July 2023. It said forwarded ports were frequently used to host undesirable content, which led to law enforcement contact, blacklisted IPs and hosting providers dropping them.",
      },
      {
        q: "Do I need port forwarding to torrent?",
        a: "No, but it helps. Without it you can still download; you just cannot accept incoming connections, so you only reach peers who can accept yours. On well-seeded files you will not notice. On old or thinly seeded ones you will.",
      },
      {
        q: "Is port forwarding a security risk?",
        a: "It opens a route into your machine that would otherwise be closed, so the software listening on that port had better be sound. For torrent clients that is normally fine. It is the reason NordVPN gives for not offering it at all, and part of why Mullvad stopped.",
      },
      {
        q: "Can I choose which port I get?",
        a: "With Proton VPN and PureVPN, yes. With Private Internet Access the port is assigned at random, which is fine for a torrent client but awkward if you need a fixed port for a service at home.",
      },
      {
        q: "Is there a free VPN that offers port forwarding?",
        a: "Treat that claim cautiously. Port forwarding is commonly limited to paid plans, paid add-ons or a narrow set of servers, and a free label does not prove that inbound connections are supported. Check the provider's current feature and acceptable-use pages before installing anything.",
      },
      {
        q: "How do I set up port forwarding with a VPN?",
        a: "Confirm that the provider supports it on your plan, request or assign the port in its app or account panel, then enter that port in the service that needs inbound connections. Test the port from outside your network and close it again when the service is not needed.",
      },
      {
        q: "Do VPNs use port 443?",
        a: "Some VPN protocols can connect over TCP or UDP port 443, but that is an outbound transport choice and is not the same as forwarding an inbound port to your device. Check the provider's protocol documentation for the exact transport and fallback behavior.",
      },
      {
        q: "Does a static IP automatically include port forwarding?",
        a: "No. A static or dedicated IP can make an address predictable, but it does not by itself open an inbound port. The provider must separately document port-forwarding support, the allowed ports and any add-on cost.",
      },
    ],
    sourcesTitle: "Sources",
    sourcesIntro: "Every row links to where it came from. Read on 25 July 2026.",
  };

  const rijen = PORT_FORWARDING.map((pf) => ({
    pf,
    vpn: getVpnBySlug(pf.slug),
  })).filter((r) => r.vpn !== undefined);

  const picks = t.picks
    .map((p) => ({
      ...p,
      vpn: getVpnBySlug(p.slug),
      pf: PORT_FORWARDING.find((x) => x.slug === p.slug),
    }))
    .filter((p) => p.vpn !== undefined && p.pf !== undefined);

  const bronnen = Array.from(
    new Map(PORT_FORWARDING.map((pf) => [pf.bron.url, pf.bron])).values(),
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Best VPNs", href: "/best/best-vpn" },
          { name: "Port forwarding", href: "/best/vpn-port-forwarding" },
        ]}
      />

      <main>
        <section id="quick-picks" className="scroll-mt-24 border-b py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                {t.badge}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {t.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
              <p className="mt-4 text-sm text-muted-foreground">Reviewed 13 August 2026. Provider features can change by plan, server and app version; the linked source pages are the decision evidence.</p>
              <div className="mt-6">
                <AffiliateDisclosure variant="inline" />
              </div>
            </div>
          </div>
        </section>

        <section id="evidence" className="scroll-mt-24 py-12">
          <div className="container">
            <Card className="mx-auto max-w-3xl">
              <CardContent className="pt-6">
                <h2 className="mb-3 text-xl font-bold">{t.whyTitle}</h2>
                <p className="text-muted-foreground">{t.whyBody}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="comparison" className="scroll-mt-24 border-y bg-muted/30 py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold md:text-3xl">{t.tableTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.tableIntro} We separate documented feature support from what still needs a plan-, location- or device-level check.</p>
            </div>

            <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-4">
              {rijen.map(({ pf, vpn }) => {
                const stijl = STATUS_STIJL[pf.status];
                return (
                  <Card key={pf.slug}>
                    <CardContent className="flex flex-col gap-3 pt-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold">{vpn!.name}</h3>
                        <Badge variant="outline" className={stijl.className}>
                          <stijl.Icon className="mr-1 size-3" aria-hidden="true" />
                          {stijl.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{pf.details}</p>
                      {pf.beperkingen && (
                        <p className="text-xs text-muted-foreground">
                          {pf.beperkingen}
                        </p>
                      )}
                      <a
                        href={pf.bron.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-xs text-primary hover:underline"
                      >
                        {pf.bron.label}
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="context" className="scroll-mt-24 py-12 lg:py-16">
          <div className="container">
            <Card className="mx-auto max-w-3xl border-2 border-blue-500/40">
              <CardContent className="pt-6">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
                  <History className="size-5 text-blue-500" aria-hidden="true" />
                  {t.outdatedTitle}
                </h2>
                <p className="text-muted-foreground">{t.outdatedBody}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="alternatives" className="scroll-mt-24 border-y bg-muted/30 py-12 lg:py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              {t.pickTitle}
            </h2>
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
              {picks.map((pick) => (
                <Card key={pick.slug}>
                  <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold">{pick.vpn!.name}</h3>
                        <Badge
                          variant="outline"
                          className={STATUS_STIJL[pick.pf!.status].className}
                        >
                          {STATUS_STIJL[pick.pf!.status].label}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{pick.why}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-2 md:w-44">
                      <div className="text-sm text-muted-foreground">
                        {t.startsAt}{" "}
                        <span className="metric font-bold text-foreground">
                          ${pick.vpn!.priceTwoYear || pick.vpn!.priceYearly}
                        </span>
                        {t.perMonth}
                      </div>
                      <AffiliateButton
                        vpnId={pick.vpn!.id}
                        vpnName={pick.vpn!.name}
                        affiliateUrl={pick.vpn!.affiliateUrl}
                        className="w-full"
                      >
                        {t.getVpn} {pick.vpn!.name}
                      </AffiliateButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 py-12 lg:py-16">
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

        <section id="sources" className="scroll-mt-24 border-t py-12">
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
              title: "Best VPNs for torrenting",
              description: "Where a forwarded port makes the most difference.",
              href: "/best/vpn-torrenting",
            },
            {
              title: "Is NordVPN safe?",
              description: "Why it does not offer port forwarding, and what else to know.",
              href: "/is-nordvpn-safe",
            },
            {
              title: "VPNs with a real free trial",
              description: "Test one before you pay for it.",
              href: "/best/vpn-free-trial",
            },
            {
              title: "VPN protocols explained",
              description: "See how WireGuard and OpenVPN affect the connection.",
              href: "/guides/vpn-protocols-explained",
            },
          ]}
        />
      </main>
    </>
  );
}
