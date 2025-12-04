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
  Eye,
  EyeOff,
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  Clock,
  BookOpen,
  FileText,
  Globe,
  Server,
  AlertTriangle,
  Search,
  MapPin,
  Scale,
  ShieldCheck,
  FileWarning,
  Fingerprint,
  Ban,
  ExternalLink,
} from "lucide-react";

const affiliateLinks = {
  expressvpn: "https://go.zerotovpn.com/expressvpn",
  nordvpn: "https://go.zerotovpn.com/nordvpn",
  surfshark: "https://go.zerotovpn.com/surfshark",
  cyberghost: "https://go.zerotovpn.com/cyberghost",
  protonvpn: "https://go.zerotovpn.com/protonvpn",
  pia: "https://go.zerotovpn.com/pia",
};

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "VPN Privacy Guide: No-Logs Policies & Jurisdiction Explained (2025) - ZeroToVPN",
    description:
      "Understand what makes a VPN truly private. Learn about no-logs policies, jurisdiction, independent audits, and how to evaluate VPN privacy claims.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "VPN Privacy Guide: No-Logs Policies & Jurisdiction (2025)",
      description:
        "Understand what makes a VPN truly private. Learn about no-logs policies, jurisdiction, and independent audits.",
      type: "article",
    },
  };
}

export default async function VpnPrivacyGuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.vpnPrivacyGuide");
  const pageUrl = locale === "en" ? `${baseUrl}/guides/vpn-privacy-guide` : `${baseUrl}/${locale}/guides/vpn-privacy-guide`;

  return (
    <>
      <ArticleJsonLd
        title="VPN Privacy Guide: No-Logs Policies & Jurisdiction Explained (2025)"
        description="Understand what makes a VPN truly private. Learn about no-logs policies, jurisdiction, independent audits, and how to evaluate VPN privacy claims."
        url={pageUrl}
        datePublished="2025-01-01"
        dateModified="2025-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "VPN Privacy Guide", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-green-500/10 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "VPN Privacy Guide", href: "/guides/vpn-privacy-guide" }]} className="mb-6" />
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{t("hero.badge")}</Badge>
              <Badge variant="outline">{t("hero.readTime")}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("hero.title")}
            </h1>
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
                { id: "what-is-privacy", title: (t.raw("toc.items") as string[])[0] },
                { id: "no-logs", title: (t.raw("toc.items") as string[])[1] },
                { id: "jurisdiction", title: (t.raw("toc.items") as string[])[2] },
                { id: "audits", title: (t.raw("toc.items") as string[])[3] },
                { id: "red-flags", title: (t.raw("toc.items") as string[])[4] },
                { id: "checklist", title: (t.raw("toc.items") as string[])[5] },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {/* What is VPN Privacy */}
            <div id="what-is-privacy" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <EyeOff className="h-6 w-6 text-primary" />
                {t("sections.whatIsPrivacy.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.whatIsPrivacy.intro1")}
              </p>
              <p className="text-muted-foreground mb-4">
                {t("sections.whatIsPrivacy.intro2")}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.whatIsPrivacy.trustShiftTitle")}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("sections.whatIsPrivacy.trustShiftIntro")}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-red-500" />
                      {t("sections.whatIsPrivacy.withoutVpn.title")}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {t("sections.whatIsPrivacy.withoutVpn.description")}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <EyeOff className="h-4 w-4 text-green-500" />
                      {t("sections.whatIsPrivacy.withVpn.title")}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {t("sections.whatIsPrivacy.withVpn.description")}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-3">{t("sections.whatIsPrivacy.keyElementsTitle")}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {(t.raw("sections.whatIsPrivacy.keyElements") as Array<{ title: string; description: string }>).map((element, index) => {
                  const icons = [Lock, Fingerprint, FileText, Globe];
                  const colors = ["text-green-500", "text-blue-500", "text-purple-500", "text-orange-500"];
                  const IconComponent = icons[index];

                  return (
                    <li key={index} className="flex items-start gap-2">
                      <IconComponent className={`h-5 w-5 ${colors[index]} mt-0.5 flex-shrink-0`} />
                      <div>
                        <strong>{element.title}</strong> {element.description}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* No-Logs Policies */}
            <div id="no-logs" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <FileText className="h-6 w-6 text-primary" />
                {t("sections.noLogs.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.noLogs.intro")}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.noLogs.loggingTypesTitle")}</h3>
                <div className="space-y-4">
                  {(t.raw("sections.noLogs.loggingTypes") as Array<{
                    type: string;
                    badge: string;
                    badgeColor: string;
                    description: string;
                    warning: string;
                  }>).map((logType, index) => {
                    const colors = [
                      { bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-800", text: "text-red-500" },
                      { bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800", text: "text-orange-500" },
                      { bg: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-800", text: "text-yellow-600" },
                      { bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800", text: "text-green-500" },
                    ][index];

                    const badgeVariants: Record<string, string> = {
                      destructive: "destructive",
                      orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
                      secondary: "secondary",
                      green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                    };

                    const warningColors: Record<number, string> = {
                      0: "text-red-600 dark:text-red-400",
                      1: "text-orange-600 dark:text-orange-400",
                      2: "text-yellow-600 dark:text-yellow-400",
                      3: "text-green-600 dark:text-green-400",
                    };

                    return (
                      <div key={index} className={`p-4 ${colors.bg} rounded-lg border ${colors.border}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            {index === 0 ? <Ban className={`h-4 w-4 ${colors.text}`} /> :
                             index === 1 ? <AlertTriangle className={`h-4 w-4 ${colors.text}`} /> :
                             index === 2 ? <FileWarning className={`h-4 w-4 ${colors.text}`} /> :
                             <CheckCircle className={`h-4 w-4 ${colors.text}`} />}
                            {logType.type}
                          </h4>
                          <Badge variant={logType.badgeColor === "destructive" || logType.badgeColor === "secondary" ? logType.badgeColor as "destructive" | "secondary" : "default"}
                                 className={badgeVariants[logType.badgeColor] || ""}>
                            {logType.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {logType.description}
                        </p>
                        <p className={`text-xs font-medium ${warningColors[index]}`}>
                          {logType.warning}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-3">{t("sections.noLogs.verificationTitle")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(t.raw("sections.noLogs.verificationItems") as Array<{ title: string; description: string }>).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>{item.title}</strong> {item.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Jurisdiction */}
            <div id="jurisdiction" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Globe className="h-6 w-6 text-primary" />
                {t("sections.jurisdiction.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.jurisdiction.intro")}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.jurisdiction.eyesAlliancesTitle")}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("sections.jurisdiction.eyesAlliancesIntro")}
                </p>

                <div className="space-y-4">
                  {(t.raw("sections.jurisdiction.eyesAlliances") as Array<{
                    type: string;
                    countries: string;
                    warning: string;
                    color: string;
                  }>).map((alliance, index) => {
                    const colors: Record<string, { bg: string; border: string; text: string }> = {
                      red: { bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-800", text: "text-red-500" },
                      orange: { bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800", text: "text-orange-500" },
                      yellow: { bg: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-800", text: "text-yellow-600" },
                    };
                    const colorClass = colors[alliance.color];

                    return (
                      <div key={index} className={`p-4 ${colorClass.bg} rounded-lg border ${colorClass.border}`}>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Eye className={`h-4 w-4 ${colorClass.text}`} />
                          {alliance.type}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {alliance.countries}
                        </p>
                        {alliance.warning && (
                          <p className={`text-xs mt-1 ${alliance.color === "red" ? "text-red-600 dark:text-red-400" : ""}`}>
                            {alliance.warning}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-3">{t("sections.jurisdiction.privacyFriendlyTitle")}</h3>
              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    Best Choices
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {(t.raw("sections.jurisdiction.bestChoices") as string[]).map((choice, index) => (
                      <li key={index}>{choice}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card border rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    {t("sections.jurisdiction.vpnLocationsTitle")}
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {(t.raw("sections.jurisdiction.vpnLocations") as string[]).map((location, index) => {
                      const vpnName = location.split(" - ")[0];
                      const vpnKey = vpnName.toLowerCase().replace(/\s+/g, "") as keyof typeof affiliateLinks;
                      const hasLink = affiliateLinks[vpnKey];

                      if (hasLink) {
                        return (
                          <li key={index}>
                            <a href={affiliateLinks[vpnKey]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                              {location.split(" - ")[0]} <ExternalLink className="h-2.5 w-2.5" />
                            </a> - {location.split(" - ")[1]}
                          </li>
                        );
                      }
                      return <li key={index}>{location}</li>;
                    })}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t("sections.jurisdiction.importantNoteTitle")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t("sections.jurisdiction.importantNote")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Independent Audits */}
            <div id="audits" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Search className="h-6 w-6 text-primary" />
                {t("sections.audits.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.audits.intro")}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.audits.whatAuditsCheckTitle")}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(t.raw("sections.audits.auditChecks") as Array<{ title: string; description: string }>).map((check, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">{check.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {check.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-3">{t("sections.audits.auditedVpnsTitle")}</h3>
              <div className="space-y-3 my-4">
                {(t.raw("sections.audits.auditedVpns") as Array<{
                  name: string;
                  audits: string;
                  badge: string;
                }>).map((vpn, index) => {
                  const vpnKey = vpn.name.toLowerCase().replace(/\s+/g, "") as keyof typeof affiliateLinks;

                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-card border rounded-lg">
                      <div>
                        <a href={affiliateLinks[vpnKey]} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                          {vpn.name} <ExternalLink className="h-3 w-3" />
                        </a>
                        <p className="text-xs text-muted-foreground">{vpn.audits}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{vpn.badge}</Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Privacy Red Flags */}
            <div id="red-flags" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                {t("sections.redFlags.title")}
              </h2>

              <div className="space-y-4 my-6">
                {(t.raw("sections.redFlags.flags") as Array<{
                  title: string;
                  description: string;
                  severity: string;
                }>).map((flag, index) => {
                  const isCritical = flag.severity === "critical";
                  const IconComponent = isCritical ? XCircle : AlertTriangle;
                  const colorClasses = isCritical
                    ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-500"
                    : "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-orange-500";

                  return (
                    <div key={index} className={`${colorClasses.split(" ").slice(0, 3).join(" ")} rounded-xl p-5`}>
                      <div className="flex items-start gap-4">
                        <IconComponent className={`h-6 w-6 ${colorClasses.split(" ")[3]} flex-shrink-0`} />
                        <div>
                          <h3 className="font-bold mb-1">{flag.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {flag.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Privacy Checklist */}
            <div id="checklist" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
                {t("sections.checklist.title")}
              </h2>

              <div className="bg-card border rounded-xl p-6 my-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {t("sections.checklist.intro")}
                </p>
                <div className="space-y-3">
                  {(t.raw("sections.checklist.items") as Array<{ title: string; description: string }>).map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-sm">{item.title}</span>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h2 className="font-bold mb-3">{t("sections.keyTakeaways.title")}</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(t.raw("sections.keyTakeaways.items") as string[]).map((item, index) => (
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
              title="Related Privacy Guides"
              pages={[
                { title: "What is a VPN?", description: "Understanding VPN basics", href: "/guides/what-is-vpn", icon: "shield" },
                { title: "How VPNs Work", description: "VPN encryption explained", href: "/guides/how-vpn-works", icon: "lock" },
                { title: "VPN for Torrenting", description: "Anonymous downloading", href: "/guides/vpn-for-torrenting", icon: "download" },
                { title: "Best VPNs 2025", description: "Privacy-focused VPN recommendations", href: "/best/best-vpn", icon: "trophy" }
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
              <Shield className="mr-2 h-5 w-5" />
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
