import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ComparisonTable } from "@/components/vpn/comparison-table";
import { VpnCard } from "@/components/vpn/vpn-card";
import { getFeaturedVpns } from "@/lib/vpn-data";
import { Link } from "@/i18n/navigation";
import { Shield, Zap, Globe, CheckCircle, ArrowRight } from "lucide-react";
import {
  OrganizationSchema,
  WebsiteSchema,
  ComparisonTableSchema,
  FaqSchema,
} from "@/components/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featuredVpns = getFeaturedVpns();

  // FAQ data for structured data
  const faqs = [
    {
      question: "What is a VPN?",
      answer:
        "A VPN (Virtual Private Network) encrypts your internet connection and hides your IP address, protecting your privacy online and allowing you to access geo-restricted content.",
    },
    {
      question: "Which VPN is the best in 2025?",
      answer:
        "Based on our testing, NordVPN is the best overall VPN in 2025, offering excellent speeds, strong security, and great value. Surfshark is the best budget option with unlimited devices.",
    },
    {
      question: "Are free VPNs safe?",
      answer:
        "Most free VPNs are not recommended as they may log your data, show ads, or have security vulnerabilities. ProtonVPN offers a trustworthy free tier with no data limits.",
    },
    {
      question: "Can a VPN be traced?",
      answer:
        "Quality VPNs with no-logs policies cannot be traced back to you. The VPN provider doesn't store any information about your online activities.",
    },
  ];

  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <ComparisonTableSchema vpns={featuredVpns} />
      <FaqSchema faqs={faqs} />
      <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-1">
              Updated for 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Find Your{" "}
              <span className="text-primary">Perfect VPN</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From zero to secure in minutes. Expert reviews, honest comparisons,
              and exclusive deals on the best VPN services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#comparison">
                  Compare VPNs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/guides/what-is-vpn">What is a VPN?</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by over 100,000 readers worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">VPNs Tested</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100K+</div>
              <div className="text-sm text-muted-foreground">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Speed Tests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Best VPNs of 2025
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Independently tested and reviewed. We test every VPN for speed,
              security, streaming, and value for money.
            </p>
          </div>
          <ComparisonTable vpns={featuredVpns} />
        </div>
      </section>

      {/* VPN Cards (Mobile-friendly alternative) */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top VPN Picks</h2>
            <p className="text-muted-foreground">
              Our experts&apos; top recommendations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVpns.slice(0, 3).map((vpn, index) => (
              <VpnCard key={vpn.id} vpn={vpn} rank={index + 1} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Use a VPN */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why You Need a VPN
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Protect your privacy, access global content, and stay secure online.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy Protection</h3>
              <p className="text-muted-foreground">
                Hide your IP address and encrypt your internet traffic to keep your
                online activities private from hackers, ISPs, and advertisers.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Global Content</h3>
              <p className="text-muted-foreground">
                Bypass geo-restrictions to access streaming services, websites,
                and content from anywhere in the world.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Public WiFi</h3>
              <p className="text-muted-foreground">
                Stay safe on public WiFi networks at cafes, airports, and hotels
                with military-grade encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Test */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How We Test VPNs</h2>
              <p className="text-muted-foreground">
                Our rigorous testing methodology ensures honest, unbiased reviews.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Speed tests across 50+ server locations",
                "Security audits and leak testing",
                "Streaming platform compatibility checks",
                "Privacy policy and jurisdiction analysis",
                "Customer support responsiveness",
                "Value for money assessment",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Compare the best VPNs and find the perfect one for your needs.
            </p>
            <Button size="lg" asChild>
              <a href="#comparison">
                View All VPNs
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
