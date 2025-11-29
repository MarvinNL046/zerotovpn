import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  Plane,
  Globe,
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock,
  BookOpen,
  AlertTriangle,
  MapPin,
  CreditCard,
  Wifi,
  Smartphone,
  Tv,
  Play,
  Download,
  Ban,
  Building,
  Hotel,
  Car,
  Ship,
  Flag,
  Key,
  DollarSign,
  Calendar,
  ExternalLink,
} from "lucide-react";

// Affiliate links
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
    title: "VPN for Travel: Essential Guide to Staying Connected Abroad (2025) - ZeroToVPN",
    description:
      "Learn why you need a VPN when traveling. Access home content, bypass censorship, protect on hotel WiFi, and find deals. Complete travel VPN guide.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "VPN for Travel: Essential Guide to Staying Connected Abroad (2025)",
      description:
        "Learn why you need a VPN when traveling. Access home content, bypass censorship, and stay secure.",
      type: "article",
    },
  };
}

export default async function VpnForTravelPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.vpnForTravel");
  const pageUrl = locale === "en" ? `${baseUrl}/guides/vpn-for-travel` : `${baseUrl}/${locale}/guides/vpn-for-travel`;

  const tocItems = t.raw("toc.items") as string[];
  const relatedGuides = t.raw("relatedGuides.guides") as Array<{ title: string; description: string; url: string }>;
  const whyNeedVpnReasons = t.raw("sections.whyNeedVpn.reasons") as Array<{ title: string; description: string; icon: string }>;
  const accessHomeContentServices = t.raw("sections.accessHomeContent.services") as Array<{ title: string; description: string; solution: string; icon: string }>;
  const censorshipCountries = t.raw("sections.bypassCensorship.countries") as Array<{ country: string; blocked: string; status: string; statusVariant: string; icon: string }>;
  const censorshipTips = t.raw("sections.bypassCensorship.tips.items") as string[];
  const travelSecurityNetworks = t.raw("sections.travelSecurity.networks") as Array<{ title: string; description: string; icon: string }>;
  const securityDos = t.raw("sections.travelSecurity.dos.items") as string[];
  const securityDonts = t.raw("sections.travelSecurity.donts.items") as string[];
  const saveMoneyServices = t.raw("sections.saveMoney.services") as Array<{ title: string; description: string; tip: string; icon: string }>;
  const saveMoneyExamples = t.raw("sections.saveMoney.howItWorks.examples") as Array<{ price: string; location: string; color: string }>;
  const bestVpns = t.raw("sections.bestVpns.vpns") as Array<{ name: string; badge: string; badgeVariant: string; description: string; features: string[]; link: string }>;
  const featureChecklist = t.raw("sections.bestVpns.featureChecklist.features") as string[];
  const checklistBefore = t.raw("sections.preTravel.beforeDeparture.items") as string[];
  const checklistArrival = t.raw("sections.preTravel.uponArrival.items") as string[];

  return (
    <>
      <ArticleJsonLd
        title="VPN for Travel: Essential Guide to Staying Connected Abroad (2025)"
        description="Learn why you need a VPN when traveling. Access home content, bypass censorship, protect on hotel WiFi, and find deals. Complete travel VPN guide."
        url={pageUrl}
        datePublished="2025-01-01"
        dateModified="2025-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "VPN for Travel", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-cyan-500/10 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
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
      <section className="py-8 border-b bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bold mb-4">{t("toc.title")}</h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {tocItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(/\d+\.\s+/g, "").replace(/\s+/g, "-")}`}
                  className="text-primary hover:underline"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Why Travel VPN */}
            <section id="why-you-need-a-vpn-for-travel">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Plane className="h-6 w-6 text-cyan-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.whyNeedVpn.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.whyNeedVpn.intro")}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {whyNeedVpnReasons.map((reason, index) => {
                  const IconComponent = reason.icon === "Tv" ? Tv : reason.icon === "Shield" ? Shield : reason.icon === "Globe" ? Globe : DollarSign;
                  const iconColor = reason.icon === "Tv" ? "text-blue-500" : reason.icon === "Shield" ? "text-green-500" : reason.icon === "Globe" ? "text-purple-500" : "text-orange-500";

                  return (
                    <div key={index} className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <IconComponent className={`h-4 w-4 ${iconColor}`} />
                        {reason.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4">
                <p className="text-sm">
                  {t("sections.whyNeedVpn.proTip")}
                </p>
              </div>
            </section>

            {/* Access Home Content */}
            <section id="accessing-content-from-home">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Play className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.accessHomeContent.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.accessHomeContent.intro")}
              </p>

              <div className="space-y-4 mb-6">
                {accessHomeContentServices.map((service, index) => {
                  const IconComponent = service.icon === "Tv" ? Tv : service.icon === "CreditCard" ? CreditCard : MapPin;
                  const iconColor = service.icon === "Tv" ? "text-red-500" : service.icon === "CreditCard" ? "text-blue-500" : "text-green-500";

                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className={`h-5 w-5 ${iconColor}`} />
                        <h4 className="font-semibold">{service.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                      <div className="bg-muted/50 rounded p-2 text-xs">
                        <strong>VPN Solution:</strong> {service.solution}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                      {t("sections.accessHomeContent.legalNote.title")}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {t("sections.accessHomeContent.legalNote.text")}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bypassing Censorship */}
            <section id="bypassing-censorship">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Ban className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.bypassCensorship.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.bypassCensorship.intro")}
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">{t("sections.bypassCensorship.tableHeaders.country")}</th>
                      <th className="text-left py-3 px-4 font-semibold">{t("sections.bypassCensorship.tableHeaders.blocked")}</th>
                      <th className="text-left py-3 px-4 font-semibold">{t("sections.bypassCensorship.tableHeaders.status")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {censorshipCountries.map((country, index) => {
                      const iconColor = country.icon === "red" ? "text-red-500" : country.icon === "orange" ? "text-orange-500" : country.icon === "blue" ? "text-blue-500" : country.icon === "purple" ? "text-purple-500" : "text-green-500";
                      const badgeVariant = country.statusVariant === "destructive" ? "destructive" : "secondary";

                      return (
                        <tr key={index}>
                          <td className="py-3 px-4 font-medium flex items-center gap-2">
                            <Flag className={`h-4 w-4 ${iconColor}`} />
                            {country.country}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {country.blocked}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={badgeVariant as "destructive" | "secondary"}>{country.status}</Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  {t("sections.bypassCensorship.tips.title")}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {censorshipTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-200">
                      {t("sections.bypassCensorship.legalWarning.title")}
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {t("sections.bypassCensorship.legalWarning.text")}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Travel Security */}
            <section id="travel-security-tips">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.travelSecurity.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.travelSecurity.intro")}
              </p>

              <div className="space-y-4 mb-6">
                {travelSecurityNetworks.map((network, index) => {
                  const IconComponent = network.icon === "Hotel" ? Hotel : network.icon === "Plane" ? Plane : network.icon === "Car" ? Car : Ship;
                  const iconColor = network.icon === "Hotel" ? "text-purple-500" : network.icon === "Plane" ? "text-blue-500" : network.icon === "Car" ? "text-orange-500" : "text-cyan-500";

                  return (
                    <div key={index} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                      <IconComponent className={`h-5 w-5 ${iconColor} flex-shrink-0 mt-1`} />
                      <div>
                        <h4 className="font-semibold mb-1">{network.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {network.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    {t("sections.travelSecurity.dos.title")}
                  </h4>
                  <ul className="text-sm text-green-600 dark:text-green-400 space-y-2">
                    {securityDos.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    {t("sections.travelSecurity.donts.title")}
                  </h4>
                  <ul className="text-sm text-red-600 dark:text-red-400 space-y-2">
                    {securityDonts.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Save Money */}
            <section id="saving-money-with-vpns">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <DollarSign className="h-6 w-6 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.saveMoney.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.saveMoney.intro")}
              </p>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t("sections.saveMoney.howItWorks.title")}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {t("sections.saveMoney.howItWorks.description")}
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {saveMoneyExamples.map((example, index) => {
                    const colorClass = example.color === "red" ? "text-red-500" : example.color === "orange" ? "text-orange-500" : "text-green-500";

                    return (
                      <div key={index} className="bg-background rounded p-2 text-center">
                        <div className={`text-lg font-bold ${colorClass}`}>{example.price}</div>
                        <div className="text-muted-foreground">{example.location}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {saveMoneyServices.map((service, index) => {
                  const IconComponent = service.icon === "Plane" ? Plane : service.icon === "Building" ? Building : Car;
                  const iconColor = service.icon === "Plane" ? "text-blue-500" : service.icon === "Building" ? "text-purple-500" : "text-orange-500";

                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <IconComponent className={`h-4 w-4 ${iconColor}`} />
                        {service.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {service.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Tip:</strong> {service.tip}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                      {t("sections.saveMoney.realityCheck.title")}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {t("sections.saveMoney.realityCheck.text")}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Best VPNs for Travel */}
            <section id="best-vpns-for-travelers">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{t("sections.bestVpns.title")}</h2>
              </div>

              <p className="text-muted-foreground mb-6">
                {t("sections.bestVpns.intro")}
              </p>

              <div className="space-y-4 mb-6">
                {bestVpns.map((vpn, index) => {
                  const badgeVariant = vpn.badgeVariant === "default" ? "default" : "secondary";
                  const linkKey = vpn.link as keyof typeof affiliateLinks;

                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <a
                            href={affiliateLinks[linkKey]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {vpn.name}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <p className="text-sm text-muted-foreground">
                            {vpn.description}
                          </p>
                        </div>
                        <Badge variant={badgeVariant as "default" | "secondary"}>{vpn.badge}</Badge>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                        {vpn.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={affiliateLinks[linkKey]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        Visit {vpn.name}
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {t("sections.bestVpns.featureChecklist.title")}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {featureChecklist.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Pre-Travel Checklist */}
            <section className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">{t("sections.preTravel.title")}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">{t("sections.preTravel.beforeDeparture.title")}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {checklistBefore.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 border rounded" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">{t("sections.preTravel.uponArrival.title")}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {checklistArrival.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 border rounded" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {t("cta.title")}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {t("cta.description")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/best/best-vpn"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/guides/public-wifi-safety"
                  className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                >
                  {relatedGuides[0].title}
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
