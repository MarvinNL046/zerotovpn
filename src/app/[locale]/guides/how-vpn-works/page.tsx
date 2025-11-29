import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  Lock,
  Server,
  Shield,
  Wifi,
  ArrowRight,
  CheckCircle,
  Globe,
  Key,
  Network,
  Layers,
  Zap,
  Clock,
  BookOpen,
  Eye,
  EyeOff,
  Router,
  Cloud,
  FileKey,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How Does a VPN Work? Technical Guide 2025 - ZeroToVPN",
    description:
      "Understand the technical details behind VPN technology. Learn about encryption, tunneling protocols, and how VPNs protect your data step by step.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "How Does a VPN Work? Technical Guide 2025",
      description:
        "Understand the technical details behind VPN technology. Learn about encryption, tunneling protocols, and how VPNs protect your data.",
      type: "article",
    },
  };
}

export default async function HowVpnWorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.howVpnWorks");

  const baseUrl = "https://zerotovpn.com";
  const pageUrl = locale === "en" ? `${baseUrl}/guides/how-vpn-works` : `${baseUrl}/${locale}/guides/how-vpn-works`;

  return (
    <>
      <ArticleJsonLd
        title="How Does a VPN Work? Technical Guide 2025"
        description="Understand the technical details behind VPN technology. Learn about encryption, tunneling protocols, and how VPNs protect your data step by step."
        url={pageUrl}
        datePublished="2025-01-01"
        dateModified="2025-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "How VPN Works", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
        {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
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
              {(t.raw("toc.items") as string[]).map((item, index) => {
                const hrefs = ["#overview", "#encryption", "#tunneling", "#protocols", "#step-by-step", "#security-features"];
                return (
                  <a key={index} href={hrefs[index]} className="text-primary hover:underline">
                    {item}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {/* VPN Connection Overview */}
            <div id="overview" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Network className="h-6 w-6 text-primary" />
                {t("sections.overview.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.overview.intro")}
              </p>

              {/* Visual Diagram */}
              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4 text-center">{t("sections.overview.diagram.title")}</h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg w-full md:w-auto">
                    <Wifi className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <span className="text-sm font-medium">{t("sections.overview.diagram.steps.0.label")}</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-6 w-6 text-green-500" />
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs text-green-700 dark:text-green-300 mx-2">
                      {t("sections.overview.diagram.steps.1.label")}
                    </div>
                    <ArrowRight className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg w-full md:w-auto">
                    <Server className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <span className="text-sm font-medium">{t("sections.overview.diagram.steps.2.label")}</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg w-full md:w-auto">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <span className="text-sm font-medium">{t("sections.overview.diagram.steps.3.label")}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">
                {t("sections.overview.note")}
              </p>
            </div>

            {/* Encryption Explained */}
            <div id="encryption" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Key className="h-6 w-6 text-primary" />
                {t("sections.encryption.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.encryption.intro")}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-3">{t("sections.encryption.aes256.title")}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("sections.encryption.aes256.description")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">{t("sections.encryption.aes256.specs.0.title")}</h4>
                    <p className="text-xs text-muted-foreground">
                      {t("sections.encryption.aes256.specs.0.description")}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">{t("sections.encryption.aes256.specs.1.title")}</h4>
                    <p className="text-xs text-muted-foreground">
                      {t("sections.encryption.aes256.specs.1.description")}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-3">{t("sections.encryption.keyTypes.title")}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {(t.raw("sections.encryption.keyTypes.items") as Array<{ type: string; description: string }>).map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>{item.type}:</strong> {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* VPN Tunneling */}
            <div id="tunneling" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Layers className="h-6 w-6 text-primary" />
                {t("sections.tunneling.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.tunneling.intro")}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.tunneling.process.title")}</h3>
                <div className="space-y-3">
                  {(t.raw("sections.tunneling.process.steps") as Array<{ number: number; title: string; description: string }>).map((step) => {
                    const colors = [
                      { bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800", badge: "bg-blue-500" },
                      { bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800", badge: "bg-green-500" },
                      { bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800", badge: "bg-purple-500" },
                      { bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800", badge: "bg-orange-500" },
                    ];
                    const color = colors[step.number - 1];
                    return (
                      <div key={step.number} className={`flex items-center gap-4 p-3 ${color.bg} rounded-lg border ${color.border}`}>
                        <div className={`w-8 h-8 ${color.badge} text-white rounded-full flex items-center justify-center font-bold text-sm`}>{step.number}</div>
                        <div>
                          <strong className="text-sm">{step.title}</strong>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* VPN Protocols Compared */}
            <div id="protocols" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <FileKey className="h-6 w-6 text-primary" />
                {t("sections.protocols.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.protocols.intro")}
              </p>

              <div className="space-y-4 my-6">
                {(t.raw("sections.protocols.list") as Array<{ name: string; badge: string; description: string; ratings: { speed: string; security: string; compatibility: string } }>).map((protocol, index) => {
                  const icons = [
                    <Zap key="zap" className="h-5 w-5 text-yellow-500" />,
                    <Lock key="lock" className="h-5 w-5 text-blue-500" />,
                    <Router key="router" className="h-5 w-5 text-purple-500" />,
                  ];
                  const badgeVariants = ["default", "secondary", "outline"] as const;
                  const badgeColors = [
                    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                    "",
                    "",
                  ];
                  const getRatingColor = (rating: string) => {
                    return rating === "Excellent" ? "text-green-500" : "text-yellow-500";
                  };

                  return (
                    <div key={protocol.name} className="bg-card border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold flex items-center gap-2">
                          {icons[index]}
                          {protocol.name}
                        </h3>
                        <Badge variant={badgeVariants[index]} className={badgeColors[index]}>
                          {protocol.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {protocol.description}
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-muted rounded">
                          <div className={`font-bold ${getRatingColor(protocol.ratings.speed)}`}>{protocol.ratings.speed}</div>
                          <div className="text-muted-foreground">Speed</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className={`font-bold ${getRatingColor(protocol.ratings.security)}`}>{protocol.ratings.security}</div>
                          <div className="text-muted-foreground">Security</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className={`font-bold ${getRatingColor(protocol.ratings.compatibility)}`}>{protocol.ratings.compatibility}</div>
                          <div className="text-muted-foreground">Compatibility</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step-by-Step Process */}
            <div id="step-by-step" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Clock className="h-6 w-6 text-primary" />
                {t("sections.stepByStep.title")}
              </h2>

              <div className="space-y-4 my-6">
                {(t.raw("sections.stepByStep.steps") as Array<{ number: number; title: string; description: string }>).map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">{step.number}</div>
                    <div>
                      <h4 className="font-bold">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Features */}
            <div id="security-features" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Shield className="h-6 w-6 text-primary" />
                {t("sections.securityFeatures.title")}
              </h2>

              <div className="grid gap-4 my-6">
                {(t.raw("sections.securityFeatures.features") as Array<{ name: string; icon: string; description: string }>).map((feature, index) => {
                  const icons = {
                    EyeOff: <EyeOff className="h-6 w-6 text-red-500" />,
                    Cloud: <Cloud className="h-6 w-6 text-blue-500" />,
                    Lock: <Lock className="h-6 w-6 text-green-500" />,
                    Server: <Server className="h-6 w-6 text-purple-500" />,
                  };
                  const bgColors = [
                    "bg-red-100 dark:bg-red-900/30",
                    "bg-blue-100 dark:bg-blue-900/30",
                    "bg-green-100 dark:bg-green-900/30",
                    "bg-purple-100 dark:bg-purple-900/30",
                  ];

                  return (
                    <div key={feature.name} className="bg-card border rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 ${bgColors[index]} rounded-lg`}>
                          {icons[feature.icon as keyof typeof icons]}
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{feature.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
            <h2 className="text-2xl font-bold mb-6">{t("relatedGuides.title")}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {(t.raw("relatedGuides.guides") as Array<{ title: string; description: string; url: string }>).map((guide) => (
                <Link
                  key={guide.url}
                  href={guide.url}
                  className="bg-card border rounded-lg p-5 hover:shadow-md hover:border-primary/50 transition-all group"
                >
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
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
