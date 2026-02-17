import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { HowToSchema } from "@/components/seo/howto-schema";
import {
  Tv,
  Globe,
  Play,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Clock,
  BookOpen,
  Film,
  Monitor,
  Smartphone,
  Server,
  AlertTriangle,
  Star,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { LastUpdated } from "@/components/last-updated";

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
    title: "Best VPN for Streaming Netflix, Disney+ & More (2026 Guide) - ZeroToVPN",
    description:
      "Discover how to use a VPN to access Netflix, Disney+, BBC iPlayer and more streaming services from anywhere. Find the best VPNs for streaming.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Best VPN for Streaming Netflix, Disney+ & More (2026)",
      description:
        "Discover how to use a VPN to access Netflix, Disney+, BBC iPlayer and more streaming services from anywhere.",
      type: "article",
    },
  };
}

export default async function VpnForStreamingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.vpnForStreaming");
  const pageUrl = locale === "en" ? `${baseUrl}/guides/vpn-for-streaming` : `${baseUrl}/${locale}/guides/vpn-for-streaming`;

  return (
    <>
      <ArticleJsonLd
        title="Best VPN for Streaming Netflix, Disney+ & More (2026 Guide)"
        description="Discover how to use a VPN to access Netflix, Disney+, BBC iPlayer and more streaming services from anywhere. Find the best VPNs for streaming."
        url={pageUrl}
        datePublished="2026-01-01"
        dateModified="2026-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "VPN for Streaming", url: pageUrl },
        ]}
      />
      <HowToSchema
        name="How to Use a VPN for Streaming Netflix and Other Services"
        description="Step-by-step guide to accessing geo-restricted streaming content using a VPN service."
        totalTime="PT10M"
        steps={[
          {
            name: "Choose a Streaming-Optimized VPN",
            text: "Select a VPN service known for reliable streaming support like ExpressVPN, NordVPN, or Surfshark. These VPNs have servers specifically optimized to bypass geo-restrictions and work with Netflix, Disney+, BBC iPlayer, and other streaming platforms."
          },
          {
            name: "Install and Connect to Server",
            text: "Download and install the VPN application on your device. Launch the app, select a server in the country whose content you want to access (e.g., US server for US Netflix), and click connect."
          },
          {
            name: "Access Streaming Services",
            text: "Once connected, open your streaming service website or app. You should now have access to the content library from the server's location. Clear your browser cache if you still see your old location's content."
          },
          {
            name: "Enjoy Unrestricted Content",
            text: "Start streaming your favorite shows and movies. For best performance, choose a nearby server or one optimized for streaming to ensure fast speeds and no buffering."
          }
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-purple-500/10 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "VPN for Streaming", href: "/guides/vpn-for-streaming" }]} className="mb-6" />
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
      <section className="py-8 border-b bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-bold mb-4">{t("toc.title")}</h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {(t.raw("toc.items") as string[]).map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
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
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {/* Why Use VPN for Streaming */}
            <div id="why-vpn-streaming" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Tv className="h-6 w-6 text-primary" />
                {t("sections.whyUseVpn.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.whyUseVpn.intro")}
              </p>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-4">{t("sections.whyUseVpn.geoRestrictionTitle")}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(t.raw("sections.whyUseVpn.regions") as Array<{ name: string; description: string; color: string }>).map((region, index) => {
                    const colorClasses = {
                      red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500",
                      orange: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-500",
                      yellow: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-600",
                      blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-500",
                    }[region.color] || "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-500";

                    return (
                      <div key={index} className={`p-4 rounded-lg border ${colorClasses.split(" ").slice(0, 2).join(" ")}`}>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Globe className={`h-4 w-4 ${colorClasses.split(" ").slice(2).join(" ")}`} />
                          {region.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {region.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <h3 className="font-bold mt-6 mb-3">{t("sections.whyUseVpn.benefitsTitle")}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {(t.raw("sections.whyUseVpn.benefits") as Array<{ title: string; description: string }>).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>{benefit.title}</strong> {benefit.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* How It Works */}
            <div id="how-it-works" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Play className="h-6 w-6 text-primary" />
                {t("sections.howItWorks.title")}
              </h2>

              <div className="bg-card border rounded-xl p-6 my-6">
                <div className="space-y-4">
                  {(t.raw("sections.howItWorks.steps") as Array<{ number: number; title: string; description: string }>).map((step) => (
                    <div key={step.number} className="flex items-start gap-4">
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

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 my-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t("sections.howItWorks.warningTitle")}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t("sections.howItWorks.warningText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Streaming Services */}
            <div id="streaming-services" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Film className="h-6 w-6 text-primary" />
                {t("sections.streamingServices.title")}
              </h2>

              <div className="space-y-4 my-6">
                {(t.raw("sections.streamingServices.services") as Array<{
                  name: string;
                  badge: string;
                  badgeColor: string;
                  icon: string;
                  iconColor: string;
                  description: string;
                  features: string[];
                }>).map((service, index) => {
                  const badgeClasses = {
                    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                  }[service.badgeColor] || "";

                  return (
                    <div key={index} className="bg-card border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          <div className={`w-8 h-8 bg-${service.iconColor} rounded flex items-center justify-center text-white text-xs font-bold`}>{service.icon}</div>
                          {service.name}
                        </h3>
                        <Badge className={badgeClasses}>{service.badge}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs">{feature}</Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Best VPNs for Streaming */}
            <div id="best-vpns" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Star className="h-6 w-6 text-primary" />
                {t("sections.bestVpns.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.bestVpns.intro")}
              </p>

              <div className="space-y-4 my-6">
                {(t.raw("sections.bestVpns.vpns") as Array<{
                  name: string;
                  badge: string;
                  rating: string;
                  description: string;
                  supportedServices: string[];
                }>).map((vpn, index) => {
                  const vpnKey = vpn.name.toLowerCase().replace(/\s+/g, "") as keyof typeof affiliateLinks;
                  const isPrimary = index === 0;

                  return (
                    <div key={index} className={`bg-card border${isPrimary ? "-2 border-primary" : ""} rounded-xl p-5`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <Badge className={isPrimary ? "mb-2 bg-primary/10 text-primary" : "mb-2"} variant={isPrimary ? "default" : "secondary"}>{vpn.badge}</Badge>
                          <a
                            href={affiliateLinks[vpnKey]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-lg text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {vpn.name}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-500 mb-1">
                            {[...Array(5)].map((_, starIndex) => (
                              <Star key={starIndex} className={`h-4 w-4 ${starIndex < 4 || (starIndex === 4 && index < 2) ? "fill-current" : ""}`} />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{vpn.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {vpn.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        {vpn.supportedServices.map((service, serviceIndex) => (
                          <div key={serviceIndex} className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-6">
                <Link
                  href="/best/best-vpn"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  {t("sections.bestVpns.viewFullComparison")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Tips for Better Streaming */}
            <div id="tips" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                {t("sections.tips.title")}
              </h2>

              <div className="grid gap-4 my-6">
                {(t.raw("sections.tips.items") as Array<{
                  icon: string;
                  iconColor: string;
                  title: string;
                  description: string;
                }>).map((tip, index) => {
                  const iconMap: Record<string, typeof Server> = {
                    Server,
                    Zap,
                    Monitor,
                    Smartphone,
                    Shield,
                  };
                  const IconComponent = iconMap[tip.icon];
                  const colorClasses = {
                    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-500",
                    green: "bg-green-100 dark:bg-green-900/30 text-green-500",
                    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-500",
                    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-500",
                    red: "bg-red-100 dark:bg-red-900/30 text-red-500",
                  }[tip.iconColor] || "";

                  return (
                    <div key={index} className="bg-card border rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 ${colorClasses.split(" ").slice(0, 1).join(" ")} rounded-lg`}>
                          <IconComponent className={`h-6 w-6 ${colorClasses.split(" ").slice(1).join(" ")}`} />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{tip.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ */}
            <div id="faq" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                {t("sections.faq.title")}
              </h2>

              <div className="space-y-4 my-6">
                {(t.raw("sections.faq.items") as Array<{ question: string; answer: string }>).map((faq, index) => (
                  <div key={index} className="bg-card border rounded-xl p-5">
                    <h3 className="font-bold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
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

      {/* FAQ Section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FAQSchema
              faqs={[
                {
                  question: "Can I watch Netflix with a VPN?",
                  answer: "Yes, you can watch Netflix with a VPN, but not all VPNs work with Netflix. Premium VPNs like ExpressVPN, NordVPN, and Surfshark have servers specifically optimized to bypass Netflix's VPN detection. These VPNs regularly update their servers to maintain access to Netflix libraries from different countries."
                },
                {
                  question: "Is it legal to use a VPN for streaming?",
                  answer: "Using a VPN is legal in most countries, including the US, UK, Canada, and EU countries. However, accessing geo-restricted content may violate the streaming service's terms of service. While this rarely results in account termination, it's important to review your service's terms. Note that VPNs are restricted or illegal in some countries like China, Russia, and UAE."
                },
                {
                  question: "Which VPN is best for streaming?",
                  answer: "ExpressVPN is widely considered the best VPN for streaming due to its fast speeds, reliable Netflix access, and extensive server network. NordVPN and Surfshark are excellent alternatives, offering similar streaming capabilities at more affordable prices. The best choice depends on your specific needs, budget, and which streaming services you use most."
                },
                {
                  question: "Why does Netflix block VPNs?",
                  answer: "Netflix blocks VPNs because of licensing agreements with content creators and studios. These agreements restrict where specific movies and shows can be streamed. When users bypass geo-restrictions with VPNs, it violates these licensing terms. Netflix uses sophisticated detection methods to identify and block VPN traffic, though premium VPNs continuously develop new ways to bypass these blocks."
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <RelatedPages
              title="Related Guides"
              pages={[
                { title: "VPN Speed Guide", description: "Optimize speed for 4K streaming", href: "/guides/vpn-speed-guide", icon: "zap" },
                { title: "Best Gaming VPNs", description: "Low-latency VPNs for gaming", href: "/best/best-gaming-vpn", icon: "gamepad" },
                { title: "VPN for Torrenting", description: "Stay safe while downloading", href: "/guides/vpn-for-torrenting", icon: "download" },
                { title: "Best VPNs 2026", description: "Top-rated streaming VPNs", href: "/best/best-vpn", icon: "trophy" }
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
              <Tv className="mr-2 h-5 w-5" />
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
