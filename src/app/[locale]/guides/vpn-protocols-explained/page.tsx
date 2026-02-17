import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { TableOfContents } from "@/components/seo/table-of-contents";
import {
  Shield,
  Zap,
  Lock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock,
  BookOpen,
  Settings,
  History,
  Smartphone,
  Globe,
  Key,
  FileKey,
  ExternalLink,
} from "lucide-react";
import { LastUpdated } from "@/components/last-updated";

// Type definitions
type DeterminesItem = {
  title: string;
  description: string;
};

type ProtocolStat = {
  value: string;
  label: string;
};

type AdvantagesDisadvantages = {
  title: string;
  items: string[];
};

type BestFor = {
  title: string;
  description: string;
};

type ProtocolSection = {
  title: string;
  badge: string;
  released: string;
  intro: string;
  stats: ProtocolStat[];
  advantages: AdvantagesDisadvantages;
  disadvantages: AdvantagesDisadvantages;
  bestFor: BestFor;
};

type OpenVpnSection = ProtocolSection & {
  tcpVsUdp: {
    title: string;
    udp: { title: string; description: string };
    tcp: { title: string; description: string };
  };
};

type OtherProtocol = {
  name: string;
  badge: string;
  description: string;
  verdict: string;
};

type ComparisonRow = {
  protocol: string;
  speed: string;
  security: string;
  stability: string;
  mobile: string;
};

type RecommendationItem = {
  title: string;
  description: string;
};

const affiliateLinks = {
  expressvpn: "https://go.zerotovpn.com/expressvpn",
  nordvpn: "https://go.zerotovpn.com/nordvpn",
  surfshark: "https://go.zerotovpn.com/surfshark",
};

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "VPN Protocols Explained: WireGuard vs OpenVPN vs IKEv2 (2026) - ZeroToVPN",
    description:
      "Understand the differences between VPN protocols. Compare WireGuard, OpenVPN, IKEv2, and others to choose the best protocol for your needs.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "VPN Protocols Explained: WireGuard vs OpenVPN vs IKEv2 (2026)",
      description:
        "Understand the differences between VPN protocols and choose the best one for your needs.",
      type: "article",
    },
  };
}

export default async function VpnProtocolsExplainedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.vpnProtocolsExplained");
  const pageUrl = locale === "en" ? `${baseUrl}/guides/vpn-protocols-explained` : `${baseUrl}/${locale}/guides/vpn-protocols-explained`;

  // Get sections data
  const whatIsProtocol = t.raw("sections.whatIsProtocol") as { title: string; intro: string; determines: { title: string; items: DeterminesItem[] } };
  const wireguard = t.raw("sections.wireguard") as ProtocolSection;
  const openvpn = t.raw("sections.openvpn") as OpenVpnSection;
  const ikev2 = t.raw("sections.ikev2") as ProtocolSection;
  const others = t.raw("sections.others") as { title: string; protocols: OtherProtocol[] };
  const comparison = t.raw("sections.comparison") as { title: string; table: { headers: string[]; rows: ComparisonRow[] }; recommendations: { title: string; items: RecommendationItem[] } };
  const summary = t.raw("sections.summary") as { title: string; items: string[] };

  return (
    <>
      <ArticleJsonLd
        title="VPN Protocols Explained: WireGuard vs OpenVPN vs IKEv2 (2026)"
        description="Understand the differences between VPN protocols. Compare WireGuard, OpenVPN, IKEv2, and others to choose the best protocol for your needs."
        url={pageUrl}
        datePublished="2026-01-01"
        dateModified="2026-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "VPN Protocols Explained", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-500/10 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "VPN Protocols", href: "/guides/vpn-protocols-explained" }]} className="mb-6" />
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{t("hero.badge")}</Badge>
              <Badge variant="outline">{t("hero.readTime")}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              {t("hero.title")}
            </h1>
            <LastUpdated locale={locale} className="mb-4" />
            <p className="text-xl text-muted-foreground mb-6">
              {t("hero.subtitle")}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {t("hero.updated")}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {t("hero.level")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <TableOfContents
              title={t("toc.title")}
              items={[
                { id: "what-is-protocol", title: (t.raw("toc.items") as string[])[0] },
                { id: "wireguard", title: (t.raw("toc.items") as string[])[1] },
                { id: "openvpn", title: (t.raw("toc.items") as string[])[2] },
                { id: "ikev2", title: (t.raw("toc.items") as string[])[3] },
                { id: "others", title: (t.raw("toc.items") as string[])[4] },
                { id: "comparison", title: (t.raw("toc.items") as string[])[5] },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {/* What is a VPN Protocol */}
            <div id="what-is-protocol" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <FileKey className="h-6 w-6 text-primary" />
                {whatIsProtocol.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {whatIsProtocol.intro}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{whatIsProtocol.determines.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {whatIsProtocol.determines.items.map((item, index) => {
                    const icons = [Lock, Key, Zap, Shield];
                    const colors = ["text-green-500", "text-blue-500", "text-yellow-500", "text-purple-500"];
                    const Icon = icons[index];
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 ${colors[index]} mt-0.5`} />
                        <div>
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* WireGuard */}
            <div id="wireguard" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Zap className="h-6 w-6 text-yellow-500" />
                {wireguard.title}
              </h2>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 my-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">{wireguard.badge}</Badge>
                  <span className="text-sm text-muted-foreground">{wireguard.released}</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {wireguard.intro}
                </p>

                <div className="grid md:grid-cols-4 gap-3 text-center text-sm mb-4">
                  {wireguard.stats.map((stat, index) => {
                    const colors = ["text-green-500", "text-green-500", "text-green-500", "text-blue-500"];
                    return (
                      <div key={index} className="p-3 bg-background rounded-lg">
                        <div className={`font-bold text-2xl ${colors[index]}`}>{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {wireguard.advantages.title}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {wireguard.advantages.items.map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      {wireguard.disadvantages.title}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {wireguard.disadvantages.items.map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-4">
                <h4 className="font-bold text-sm mb-1">{wireguard.bestFor.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {wireguard.bestFor.description}
                </p>
              </div>
            </div>

            {/* OpenVPN */}
            <div id="openvpn" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Lock className="h-6 w-6 text-blue-500" />
                {openvpn.title}
              </h2>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 my-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">{openvpn.badge}</Badge>
                  <span className="text-sm text-muted-foreground">{openvpn.released}</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {openvpn.intro}
                </p>

                <div className="grid md:grid-cols-4 gap-3 text-center text-sm mb-4">
                  {openvpn.stats.map((stat, index) => {
                    const colors = ["text-orange-500", "text-yellow-500", "text-green-500", "text-green-500"];
                    return (
                      <div key={index} className="p-3 bg-background rounded-lg">
                        <div className={`font-bold text-2xl ${colors[index]}`}>{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {openvpn.advantages.title}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {openvpn.advantages.items.map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      {openvpn.disadvantages.title}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {openvpn.disadvantages.items.map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-xl p-4 my-4">
                <h4 className="font-bold text-sm mb-2">{openvpn.tcpVsUdp.title}</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted rounded-lg">
                    <strong>{openvpn.tcpVsUdp.udp.title}</strong>
                    <p className="text-xs text-muted-foreground mt-1">
                      {openvpn.tcpVsUdp.udp.description}
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <strong>{openvpn.tcpVsUdp.tcp.title}</strong>
                    <p className="text-xs text-muted-foreground mt-1">
                      {openvpn.tcpVsUdp.tcp.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-4">
                <h4 className="font-bold text-sm mb-1">{openvpn.bestFor.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {openvpn.bestFor.description}
                </p>
              </div>
            </div>

            {/* IKEv2 */}
            <div id="ikev2" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Smartphone className="h-6 w-6 text-purple-500" />
                {ikev2.title}
              </h2>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 my-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{ikev2.badge}</Badge>
                  <span className="text-sm text-muted-foreground">{ikev2.released}</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {ikev2.intro}
                </p>

                <div className="grid md:grid-cols-4 gap-3 text-center text-sm mb-4">
                  {ikev2.stats.map((stat, index) => (
                    <div key={index} className="p-3 bg-background rounded-lg">
                      <div className="font-bold text-2xl text-green-500">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {ikev2.advantages.title}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {ikev2.advantages.items.map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      {ikev2.disadvantages.title}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {ikev2.disadvantages.items.map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-4">
                <h4 className="font-bold text-sm mb-1">{ikev2.bestFor.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {ikev2.bestFor.description}
                </p>
              </div>
            </div>

            {/* Other Protocols */}
            <div id="others" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <History className="h-6 w-6 text-primary" />
                {others.title}
              </h2>

              <div className="space-y-4 my-6">
                {others.protocols.map((protocol, index) => {
                  const badgeVariants: Record<string, "outline" | "destructive" | "secondary"> = {
                    "Outdated": "outline",
                    "Insecure": "destructive",
                    "Windows Only": "secondary",
                    "Varies": "outline"
                  };
                  const badgeColors: Record<string, string> = {
                    "Outdated": "text-yellow-600 border-yellow-600"
                  };

                  return (
                    <div key={index} className="bg-card border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">{protocol.name}</h3>
                        <Badge
                          variant={badgeVariants[protocol.badge] || "outline"}
                          className={badgeColors[protocol.badge] || ""}
                        >
                          {protocol.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {protocol.name === "Proprietary Protocols" ? (
                          <>
                            Some VPN providers create their own protocols: Lightway (<a href={affiliateLinks.expressvpn} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">ExpressVPN<ExternalLink className="h-2.5 w-2.5 ml-0.5" /></a>),
                            NordLynx (<a href={affiliateLinks.nordvpn} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">NordVPN<ExternalLink className="h-2.5 w-2.5 ml-0.5" /></a>&apos;s WireGuard implementation), Chameleon (VyprVPN).
                          </>
                        ) : (
                          protocol.description
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Verdict:</strong> {protocol.verdict}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Protocol Comparison */}
            <div id="comparison" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Settings className="h-6 w-6 text-primary" />
                {comparison.title}
              </h2>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-sm border rounded-xl overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      {comparison.table.headers.map((header: string, index: number) => (
                        <th key={index} className={`p-3 ${index === 0 ? 'text-left' : 'text-center'} font-bold`}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {comparison.table.rows.map((row, index) => {
                      const rowClass = row.protocol === "WireGuard"
                        ? "bg-green-50/50 dark:bg-green-900/10"
                        : row.protocol === "PPTP"
                        ? "bg-red-50/50 dark:bg-red-900/10"
                        : "";

                      const badgeColors: Record<string, string> = {
                        "Excellent": "bg-green-100 text-green-800",
                        "Good": "",
                        "Moderate": "",
                        "Poor": ""
                      };

                      const badgeVariants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
                        "Excellent": "default",
                        "Good": "secondary",
                        "Moderate": "outline",
                        "Poor": "destructive"
                      };

                      return (
                        <tr key={index} className={rowClass}>
                          <td className="p-3 font-medium">{row.protocol}</td>
                          <td className="p-3 text-center">
                            <Badge
                              variant={badgeVariants[row.speed]}
                              className={badgeColors[row.speed]}
                            >
                              {row.speed}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Badge
                              variant={badgeVariants[row.security]}
                              className={badgeColors[row.security]}
                            >
                              {row.security}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Badge
                              variant={badgeVariants[row.stability]}
                              className={badgeColors[row.stability]}
                            >
                              {row.stability}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Badge
                              variant={badgeVariants[row.mobile]}
                              className={badgeColors[row.mobile]}
                            >
                              {row.mobile}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-6">
                <h3 className="font-bold mb-3">{comparison.recommendations.title}</h3>
                <div className="space-y-2 text-sm">
                  {comparison.recommendations.items.map((item, index) => {
                    const icons = [Zap, Globe, Smartphone, Shield];
                    const colors = ["text-yellow-500", "text-blue-500", "text-purple-500", "text-green-500"];
                    const Icon = icons[index];

                    return (
                      <div key={index} className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${colors[index]}`} />
                        <span><strong>{item.title}:</strong> {item.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h2 className="font-bold mb-3">{summary.title}</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {summary.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <RelatedPages
              title="Related Technical Guides"
              pages={[
                { title: "How VPNs Work", description: "Understanding VPN encryption", href: "/guides/how-vpn-works", icon: "lock" },
                { title: "VPN Speed Guide", description: "Protocol performance comparison", href: "/guides/vpn-speed-guide", icon: "zap" },
                { title: "VPN on Mobile", description: "Protocol setup on iOS and Android", href: "/guides/vpn-on-mobile", icon: "smartphone" },
                { title: "Best VPNs 2026", description: "VPNs with modern protocols", href: "/best/best-vpn", icon: "trophy" }
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">{t("cta.title")}</h2>
            <p className="text-muted-foreground">
              {t("cta.description")}
            </p>
            <Link
              href="/best/best-vpn"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {t("cta.button")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
