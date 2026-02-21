import { getTranslations, setRequestLocale } from "next-intl/server";
import { SpeedTestWidget } from "@/components/tools/speed-test-widget";
import { VpnCard } from "@/components/vpn/vpn-card";
import { vpnProviders } from "@/lib/vpn-data";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Link } from "@/i18n/navigation";
import {
  Zap,
  Play,
  Clock,
  BarChart3,
  Download,
  Upload,
  Activity,
  Signal,
  ChevronDown,
} from "lucide-react";
import type { Metadata } from "next";
import { generateAlternates } from "@/lib/seo-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "speedTest" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: generateAlternates("/speed-test", locale),
  };
}

export default async function SpeedTestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("speedTest");

  // Get top 3 fastest VPNs by speedScore
  const fastestVpns = [...vpnProviders]
    .sort((a, b) => b.speedScore - a.speedScore)
    .slice(0, 3);

  // Build FAQ items for JSON-LD schema
  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: t(`faq${i + 1}Q`),
    answer: t(`faq${i + 1}A`),
  }));

  // Speed tier rows
  const speedTiers = [
    {
      speed: t("tier1Speed"),
      rating: t("slow"),
      goodFor: t("tierBrowsing"),
      ratingClass: "text-red-500",
    },
    {
      speed: t("tier2Speed"),
      rating: t("moderate"),
      goodFor: t("tierStreaming"),
      ratingClass: "text-yellow-500",
    },
    {
      speed: t("tier3Speed"),
      rating: t("fast"),
      goodFor: t("tierGaming"),
      ratingClass: "text-emerald-500",
    },
    {
      speed: t("tier4Speed"),
      rating: t("veryFast"),
      goodFor: t("tierEverything"),
      ratingClass: "text-green-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumbs */}
      <BreadcrumbSchema
        items={[{ name: t("title"), href: "/speed-test" }]}
        className="mb-8"
      />

      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Zap className="h-4 w-4" />
          {t("title")}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t("pageTitle")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("pageDescription")}
        </p>
      </div>

      {/* Speed Test Widget */}
      <div className="mb-12">
        <SpeedTestWidget />
      </div>

      {/* How It Works Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("howItWorks")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-card rounded-xl border p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                1
              </span>
              <div className="p-2 rounded-lg bg-primary/10">
                <Play className="h-5 w-5 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t("step1Title")}</h3>
            <p className="text-muted-foreground text-sm">{t("step1Desc")}</p>
          </div>

          {/* Step 2 */}
          <div className="bg-card rounded-xl border p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                2
              </span>
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t("step2Title")}</h3>
            <p className="text-muted-foreground text-sm">{t("step2Desc")}</p>
          </div>

          {/* Step 3 */}
          <div className="bg-card rounded-xl border p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                3
              </span>
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t("step3Title")}</h3>
            <p className="text-muted-foreground text-sm">{t("step3Desc")}</p>
          </div>
        </div>
      </div>

      {/* Understanding Your Results Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("understandingResults")}</h2>

        {/* Metric explanation cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-xl border p-5 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
              <Download className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t("download")}</h3>
              <p className="text-sm text-muted-foreground">{t("downloadExplain")}</p>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-500/10 shrink-0">
              <Upload className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t("upload")}</h3>
              <p className="text-sm text-muted-foreground">{t("uploadExplain")}</p>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-cyan-500/10 shrink-0">
              <Activity className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t("ping")} / {t("latency")}</h3>
              <p className="text-sm text-muted-foreground">{t("pingExplain")}</p>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-orange-500/10 shrink-0">
              <Signal className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t("jitter")}</h3>
              <p className="text-sm text-muted-foreground">{t("jitterExplain")}</p>
            </div>
          </div>
        </div>

        {/* Speed tier table */}
        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="p-5 border-b">
            <h3 className="font-semibold">{t("speedTierTable")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">{t("tierSpeed")}</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">{t("tierRating")}</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">{t("tierGoodFor")}</th>
                </tr>
              </thead>
              <tbody>
                {speedTiers.map((tier, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-medium tabular-nums">{tier.speed}</td>
                    <td className={`px-5 py-3 font-semibold ${tier.ratingClass}`}>{tier.rating}</td>
                    <td className="px-5 py-3 text-muted-foreground">{tier.goodFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VPN Speed Impact Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{t("vpnImpactTitle")}</h2>
        <div className="bg-card rounded-xl border p-6">
          <p className="text-muted-foreground mb-4">{t("vpnImpactContent")}</p>
          <Link
            href="/guides/vpn-speed-guide/"
            className="inline-flex items-center gap-1 text-primary font-medium hover:underline mb-6"
          >
            {t("vpnSpeedGuideLink")} &rarr;
          </Link>
          <ul className="space-y-2 mt-2">
            <li className="flex items-start gap-2 text-sm">
              <span className="text-primary font-bold mt-0.5">&#8250;</span>
              <span>{t("vpnTip1")}</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-primary font-bold mt-0.5">&#8250;</span>
              <span>{t("vpnTip2")}</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <span className="text-primary font-bold mt-0.5">&#8250;</span>
              <span>{t("vpnTip3")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        {/* FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map((item) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer,
                },
              })),
            }),
          }}
        />

        <h2 className="text-2xl font-bold mb-6">{t("faqTitle")}</h2>
        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="group bg-card rounded-xl border overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none hover:bg-muted/30 transition-colors">
                <span className="font-medium">{item.question}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-5 pt-1">
                <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Fastest VPNs Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          {t("recommendedVpns")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {fastestVpns.map((vpn, index) => (
            <VpnCard key={vpn.id} vpn={vpn} rank={index + 1} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
