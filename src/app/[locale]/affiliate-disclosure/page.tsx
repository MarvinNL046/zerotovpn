import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  HandCoins,
  Shield,
  CheckCircle,
  Info,
  FileText,
  Mail,
  ExternalLink,
  Scale,
} from "lucide-react";
import { getAllVpns } from "@/lib/vpn-data-layer";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "Affiliate Disclosure - ZeroToVPN",
    description:
      "Learn how ZeroToVPN earns money through affiliate partnerships. We believe in full transparency about our business relationships.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AffiliateDisclosurePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const vpnProviders = await getAllVpns();
  const lastUpdated = "February 15, 2026";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <HandCoins className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Affiliate Disclosure
            </h1>
            <p className="text-lg text-muted-foreground">
              Transparency is one of our core values. Here&apos;s how we earn money
              and how it affects (and doesn&apos;t affect) our reviews.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Quick Summary
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    We earn commissions from purchases via the links on this site, at no extra cost to you
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Some links on this website are affiliate links. This means we may earn a commission if you click on a link and make a purchase. This comes at no additional cost to you.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    You pay the same price whether you use our links or not
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Affiliate partnerships do NOT influence our ratings or reviews
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    We test every VPN ourselves before recommending it
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* How We Make Money */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <HandCoins className="h-6 w-6 text-primary" />
                  How We Make Money
                </h2>
                <p className="text-muted-foreground mb-4">
                  ZeroToVPN is a free resource that earns revenue through affiliate
                  marketing. This means we have partnerships with some of the VPN
                  providers we review, and we receive a commission when you sign up
                  for their services through our links.
                </p>
                <p className="text-muted-foreground mb-4">
                  Here&apos;s how it works:
                </p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4">
                  <li>You read our reviews and comparisons</li>
                  <li>You click on a link to a VPN provider</li>
                  <li>You purchase a subscription</li>
                  <li>We receive a commission from the VPN provider</li>
                </ol>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm font-medium flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Important:</strong> Using our affiliate links costs you
                      nothing extra. The VPN provider pays us from their marketing
                      budget, not from your purchase.
                    </span>
                  </p>
                </div>
              </div>

              {/* Editorial Independence */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Scale className="h-6 w-6 text-primary" />
                  Our Editorial Independence
                </h2>
                <p className="text-muted-foreground mb-4">
                  Our commitment to you is to provide honest, unbiased reviews
                  regardless of our affiliate relationships. Here&apos;s how we maintain
                  editorial independence:
                </p>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Testing Before Recommending</h4>
                    <p className="text-sm text-muted-foreground">
                      We personally test every VPN we review, including speed tests,
                      security audits, streaming compatibility, and customer support
                      responsiveness.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      Ratings Based on Performance
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Our ratings are based solely on our testing methodology, not on
                      commission rates. A VPN with a lower commission can still rank
                      higher if it performs better.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Including Non-Partners</h4>
                    <p className="text-sm text-muted-foreground">
                      We include VPNs in our reviews even if they don&apos;t have affiliate
                      programs. Our goal is to provide comprehensive information, not
                      just promote partners.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Highlighting Cons</h4>
                    <p className="text-sm text-muted-foreground">
                      Every review includes pros AND cons. We don&apos;t hide the
                      weaknesses of VPNs just because they&apos;re our affiliate partners.
                    </p>
                  </div>
                </div>
              </div>

              {/* Affiliate Partners */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ExternalLink className="h-6 w-6 text-primary" />
                  Our Affiliate Partners
                </h2>
                <p className="text-muted-foreground mb-4">
                  We currently have affiliate relationships with the following VPN
                  providers. When you click links to these services on our site, we
                  may earn a commission:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vpnProviders.map((vpn) => (
                    <div
                      key={vpn.id}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{vpn.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Rating: {vpn.overallRating}/5
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  This list is subject to change as we add or remove affiliate
                  partnerships. Not all VPNs we review may be affiliate partners.
                </p>
              </div>

              {/* What This Means for You */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">What This Means for You</h2>
                <p className="text-muted-foreground mb-4">
                  As a reader of ZeroToVPN, here&apos;s what you should know:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">No Extra Cost</h4>
                      <p className="text-sm text-muted-foreground">
                        You never pay more by using our affiliate links. Prices are
                        the same as if you went directly to the VPN website.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Support Our Work</h4>
                      <p className="text-sm text-muted-foreground">
                        Using our links helps support ZeroToVPN and allows us to
                        continue providing free, in-depth VPN reviews and guides.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Honest Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Our reviews are based on real testing and honest opinions.
                        We recommend VPNs we genuinely believe are good products.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Your Choice</h4>
                      <p className="text-sm text-muted-foreground">
                        You&apos;re never obligated to use our affiliate links. If you
                        prefer, you can search for the VPN directly in your browser.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FTC Compliance */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">FTC Compliance Statement</h2>
                <p className="text-muted-foreground mb-4">
                  In accordance with the Federal Trade Commission&apos;s (FTC)
                  guidelines concerning the use of endorsements and testimonials in
                  advertising, we want to make it clear that:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    ZeroToVPN may receive monetary compensation when you click on
                    links and make purchases on partner websites
                  </li>
                  <li>
                    This compensation may affect which products we write about, where
                    they appear on the site, and the order in which they appear
                  </li>
                  <li>
                    Our testing methodology and editorial standards remain independent
                    of our affiliate relationships
                  </li>
                  <li>
                    We strive to provide accurate and up-to-date information, but we
                    cannot guarantee all information is error-free
                  </li>
                </ul>
              </div>

              {/* Google AdSense */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Advertising Disclosure</h2>
                <p className="text-muted-foreground mb-4">
                  In addition to affiliate links, ZeroToVPN displays advertisements
                  through Google AdSense. These ads:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Are clearly marked as advertisements</li>
                  <li>
                    May be personalized based on your browsing history (you can opt
                    out via{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Ads Settings
                    </a>
                    )
                  </li>
                  <li>Do not influence our editorial content or ratings</li>
                  <li>Help fund our independent review process</li>
                </ul>
              </div>

              {/* Questions */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Questions?
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about our affiliate relationships or
                  how we make money, please don&apos;t hesitate to contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold">ZeroToVPN</p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a
                      href="mailto:contact@zerotovpn.com"
                      className="text-primary hover:underline"
                    >
                      contact@zerotovpn.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Related Pages */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Related Pages</h2>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/privacy-policy"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Shield className="h-4 w-4" />
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    Terms of Service
                  </Link>
                  <Link
                    href="/about"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Info className="h-4 w-4" />
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
