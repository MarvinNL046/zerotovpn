import { getTranslations, setRequestLocale } from "next-intl/server";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Link } from "@/i18n/navigation";
import { Globe, Shield, ShieldAlert, Zap, Wrench } from "lucide-react";
import type { Metadata } from "next";
import { generateAlternates } from "@/lib/seo-utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Free VPN & Privacy Tools",
    description:
      "Free online tools to check your IP address, test for DNS leaks, and measure your internet speed. Stay safe and private online.",
    alternates: generateAlternates("/tools", locale),
  };
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const ipT = await getTranslations("ipTool");
  const dnsT = await getTranslations("dnsLeakTest");
  const speedT = await getTranslations("speedTest");

  const tools = [
    {
      title: ipT("pageTitle"),
      description: ipT("pageSubtitle"),
      href: "/tools/what-is-my-ip",
      icon: Globe,
      color: "blue",
    },
    {
      title: dnsT("pageTitle"),
      description: dnsT("pageSubtitle"),
      href: "/tools/dns-leak-test",
      icon: ShieldAlert,
      color: "red",
    },
    {
      title: speedT("pageTitle"),
      description: speedT("pageSubtitle"),
      href: "/speed-test",
      icon: Zap,
      color: "amber",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BreadcrumbSchema
        items={[{ name: t("tools"), href: "/tools" }]}
        className="mb-8"
      />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Wrench className="h-4 w-4" />
          {t("tools")}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Free VPN &amp; Privacy Tools
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Check your online privacy and security with our free tools. No signup
          required.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const colorMap: Record<string, string> = {
            blue: "bg-blue-500/10 text-blue-500",
            red: "bg-red-500/10 text-red-500",
            amber: "bg-amber-500/10 text-amber-500",
          };
          return (
            <Link key={tool.href} href={tool.href} className="group">
              <div className="bg-card rounded-xl border p-6 h-full hover:border-primary/50 hover:shadow-lg transition-all">
                <div
                  className={`p-3 rounded-lg ${colorMap[tool.color]} w-fit mb-4`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {tool.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* NordVPN CTA */}
      <div className="mt-12 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Try NordVPN Now</h2>
            <p className="text-white/80">
              Protect your IP, prevent DNS leaks, and browse securely. Get the #1 rated VPN with a 30-day money-back guarantee.
            </p>
          </div>
          <a
            href="https://go.zerotovpn.com/nordvpn"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors shrink-0 text-base shadow-lg"
          >
            <Shield className="h-5 w-5" />
            Get NordVPN
          </a>
        </div>
      </div>
    </div>
  );
}
