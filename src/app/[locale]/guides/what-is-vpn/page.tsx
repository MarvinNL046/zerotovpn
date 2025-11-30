import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  Shield,
  Lock,
  Globe,
  Eye,
  EyeOff,
  Wifi,
  Server,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Tv,
  Download,
  Smartphone,
  Building,
  Clock,
  BookOpen,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "What is a VPN? Complete Beginner's Guide 2025 - ZeroToVPN",
    description:
      "Learn what a VPN is, how it works, and why you need one. Our comprehensive beginner's guide explains VPN technology in simple terms.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "What is a VPN? Complete Beginner's Guide 2025",
      description:
        "Learn what a VPN is, how it works, and why you need one. Our comprehensive beginner's guide explains VPN technology in simple terms.",
      type: "article",
    },
  };
}

export default async function WhatIsVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.whatIsVpn");
  const pageUrl = locale === "en" ? `${baseUrl}/guides/what-is-vpn` : `${baseUrl}/${locale}/guides/what-is-vpn`;

  return (
    <>
      <ArticleJsonLd
        title="What is a VPN? Complete Beginner's Guide 2025"
        description="Learn what a VPN is, how it works, and why you need one. Our comprehensive beginner's guide explains VPN technology in simple terms."
        url={pageUrl}
        datePublished="2025-01-01"
        dateModified="2025-11-28"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Guides", url: `${baseUrl}/guides` },
          { name: "What is a VPN?", url: pageUrl },
        ]}
      />
      <article className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "What is a VPN?", href: "/guides/what-is-vpn" }]} className="mb-6" />
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
              {(t.raw("toc.items") as string[]).map((item, index) => (
                <a
                  key={index}
                  href={`#${["what-is-vpn", "how-vpn-works", "why-use-vpn", "vpn-benefits", "vpn-limitations", "choosing-vpn"][index]}`}
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
            {/* What is a VPN */}
            <div id="what-is-vpn" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Shield className="h-6 w-6 text-primary" />
                {t("sections.whatIsVpn.title")}
              </h2>
              {(t.raw("sections.whatIsVpn.intro") as string[]).map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4">
                  {paragraph}
                </p>
              ))}

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-red-500" />
                  {t("sections.whatIsVpn.withoutVpn.title")}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {(t.raw("sections.whatIsVpn.withoutVpn.items") as string[]).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border rounded-xl p-6 my-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <EyeOff className="h-5 w-5 text-green-500" />
                  {t("sections.whatIsVpn.withVpn.title")}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {(t.raw("sections.whatIsVpn.withVpn.items") as string[]).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How VPN Works */}
            <div id="how-vpn-works" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Server className="h-6 w-6 text-primary" />
                {t("sections.howVpnWorks.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.howVpnWorks.intro")}
              </p>

              <div className="space-y-4 my-6">
                {(t.raw("sections.howVpnWorks.steps") as Array<{ number: number; title: string; description: string }>).map((step) => (
                  <div key={step.number} className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Use a VPN */}
            <div id="why-use-vpn" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Globe className="h-6 w-6 text-primary" />
                {t("sections.whyUseVpn.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.whyUseVpn.intro")}
              </p>

              <div className="grid gap-4 my-6">
                {(t.raw("sections.whyUseVpn.useCases") as Array<{ title: string; description: string; icon: string }>).map((useCase, index) => {
                  const iconMap: Record<string, typeof Lock> = {
                    Lock,
                    Wifi,
                    Tv,
                    Download,
                    Building,
                    Smartphone,
                  };
                  const IconComponent = iconMap[useCase.icon as keyof typeof iconMap];
                  const colorClasses = [
                    { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
                    { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400" },
                    { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
                    { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400" },
                    { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400" },
                    { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600 dark:text-cyan-400" },
                  ][index];

                  return (
                    <div key={index} className="bg-card border rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg ${colorClasses.bg} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`h-5 w-5 ${colorClasses.text}`} />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{useCase.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {useCase.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Benefits */}
            <div id="vpn-benefits" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                {t("sections.vpnBenefits.title")}
              </h2>

              <div className="grid gap-3 my-6">
                {(t.raw("sections.vpnBenefits.benefits") as string[]).map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Limitations */}
            <div id="vpn-limitations" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                {t("sections.vpnLimitations.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.vpnLimitations.intro")}
              </p>

              <div className="space-y-3 my-6">
                {(t.raw("sections.vpnLimitations.limitations") as Array<{ title: string; description: string }>).map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                  >
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Choosing a VPN */}
            <div id="choosing-vpn" className="scroll-mt-20 mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Shield className="h-6 w-6 text-primary" />
                {t("sections.choosingVpn.title")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t("sections.choosingVpn.intro")}
              </p>

              <div className="space-y-4 my-6">
                {(t.raw("sections.choosingVpn.features") as Array<{ title: string; description: string }>).map((feature, index) => (
                  <div key={index} className="bg-card border rounded-lg p-5">
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">{t("cta.title")}</h2>
            <p className="text-muted-foreground">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/compare">
                  {t("cta.primaryButton")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/best/best-vpn">{t("cta.secondaryButton")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FAQSchema
              faqs={[
                {
                  question: "What does VPN stand for?",
                  answer: "VPN stands for Virtual Private Network. It's a technology that creates a secure, encrypted connection between your device and a remote server, protecting your online privacy and data."
                },
                {
                  question: "How does a VPN protect my privacy?",
                  answer: "A VPN protects your privacy by encrypting all your internet traffic and hiding your real IP address. This prevents your ISP, government, hackers, and websites from seeing what you do online or tracking your location."
                },
                {
                  question: "Do I need a VPN at home?",
                  answer: "Yes, a VPN is beneficial even at home. It protects you from ISP tracking and data selling, secures your connection when accessing sensitive accounts, and allows you to access geo-restricted content. While your home network is more secure than public WiFi, your ISP can still see and log all your online activity without a VPN."
                },
                {
                  question: "Can websites still track me with a VPN?",
                  answer: "While a VPN hides your IP address and encrypts your traffic, websites can still track you through cookies, browser fingerprinting, and login sessions. For maximum privacy, combine a VPN with privacy-focused browsers, cookie blockers, and avoid logging into accounts that can identify you."
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <RelatedPages
              title="Continue Learning"
              pages={[
                { title: "How VPNs Work", description: "Technical deep-dive into VPN technology", href: "/guides/how-vpn-works", icon: "zap" },
                { title: "VPN Protocols Explained", description: "Compare WireGuard, OpenVPN, and more", href: "/guides/vpn-protocols-explained", icon: "lock" },
                { title: "Best VPNs 2025", description: "Our top-rated VPN recommendations", href: "/best/best-vpn", icon: "trophy" },
                { title: "VPN Privacy Guide", description: "Maximize your online privacy", href: "/guides/vpn-privacy-guide", icon: "shield" }
              ]}
            />
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
