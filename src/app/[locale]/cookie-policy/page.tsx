import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { generateAlternates } from "@/lib/seo-utils";
import { Cookie, Shield, Settings, BarChart3, Megaphone, Mail, FileText } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(baseUrl),
    title: "Cookie Policy - ZeroToVPN",
    description:
      "Learn how ZeroToVPN uses cookies and similar tracking technologies. Understand the types of cookies we use, their purpose, and how to manage your preferences.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: generateAlternates("/cookie-policy", locale),
  };
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lastUpdated = "March 16, 2026";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              This policy explains how ZeroToVPN uses cookies and similar
              technologies when you visit our website.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* What Are Cookies */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  What Are Cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files that are placed on your device
                  (computer, tablet, or phone) when you visit a website. They are
                  widely used to make websites work more efficiently and to
                  provide information to site owners.
                </p>
                <p className="text-muted-foreground">
                  ZeroToVPN uses cookies and similar technologies (such as local
                  storage and pixel tags) to recognize your browser, remember
                  your preferences, and understand how you interact with our
                  website.
                </p>
              </div>

              {/* Types of Cookies We Use */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Settings className="h-6 w-6 text-primary" />
                  Types of Cookies We Use
                </h2>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Strictly Necessary Cookies
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies are essential for the website to function
                      properly. They enable core functionality such as security,
                      language preferences, and consent management. You cannot
                      disable these cookies without affecting the functionality of
                      the website.
                    </p>
                    <div className="text-xs text-muted-foreground bg-background rounded p-3 mt-2">
                      <p className="font-medium mb-1">Examples:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Session cookies for website navigation</li>
                        <li>Cookie consent preference storage</li>
                        <li>Language and locale selection</li>
                        <li>Dark/light mode preference</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      Analytics Cookies
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies help us understand how visitors interact with
                      our website by collecting and reporting information. All
                      data is aggregated and therefore anonymous.
                    </p>
                    <div className="text-xs text-muted-foreground bg-background rounded p-3 mt-2">
                      <p className="font-medium mb-1">Services used:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>Google Analytics</strong> &mdash; tracks page
                          views, session duration, bounce rate, and traffic
                          sources. IP addresses are anonymized. Data retention is
                          set to 26 months.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Megaphone className="h-4 w-4 text-primary" />
                      Advertising Cookies
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies are set by our advertising partners to build
                      a profile of your interests and show you relevant
                      advertisements on other websites.
                    </p>
                    <div className="text-xs text-muted-foreground bg-background rounded p-3 mt-2">
                      <p className="font-medium mb-1">Services used:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>Google AdSense</strong> &mdash; displays
                          advertisements that may be personalized based on your
                          browsing behavior. You can opt out of personalized ads
                          at{" "}
                          <a
                            href="https://www.google.com/settings/ads"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Google Ads Settings
                          </a>
                          .
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Affiliate Cookies</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      When you click on an affiliate link to a VPN provider, a
                      cookie may be placed by the affiliate tracking service
                      (Short.io) or the VPN provider itself. These cookies track
                      whether a purchase was made so we can receive a commission.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      For more details, see our{" "}
                      <Link
                        href="/affiliate-disclosure"
                        className="text-primary hover:underline"
                      >
                        Affiliate Disclosure
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Third-Party Cookies */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Some cookies on our website are placed by third-party services
                  that appear on our pages. We do not control these cookies. The
                  third-party services we use that may set cookies include:
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Google (Analytics &amp; AdSense)</h4>
                    <p className="text-sm text-muted-foreground">
                      Used for website analytics and advertising. See{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://policies.google.com/technologies/cookies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        How Google Uses Cookies
                      </a>
                      .
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">VPN Provider Websites</h4>
                    <p className="text-sm text-muted-foreground">
                      When you click affiliate links, the destination VPN
                      provider may place their own cookies. These are governed by
                      the respective provider&apos;s cookie and privacy policies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Managing Cookies */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
                <p className="text-muted-foreground mb-4">
                  You can control and manage cookies in several ways:
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Browser Settings</h3>
                <p className="text-muted-foreground mb-4">
                  Most web browsers allow you to manage cookies through their
                  settings. You can typically find these in the
                  &quot;Options,&quot; &quot;Preferences,&quot; or
                  &quot;Settings&quot; menu of your browser. You can set your
                  browser to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Block all cookies</li>
                  <li>Accept only first-party cookies</li>
                  <li>Delete cookies when you close your browser</li>
                  <li>Notify you when a cookie is being set</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Opt-Out of Interest-Based Advertising
                </h3>
                <p className="text-muted-foreground mb-4">
                  You can opt out of interest-based advertising through industry
                  tools:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Ads Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youronlinechoices.eu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Your Online Choices (EU)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://optout.aboutads.info/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Digital Advertising Alliance Opt-Out
                    </a>
                  </li>
                </ul>

                <div className="mt-4 bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Disabling cookies may affect the
                    functionality of our website. Some features, such as language
                    preferences and theme settings, rely on cookies to work
                    properly.
                  </p>
                </div>
              </div>

              {/* Cookie Retention */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Cookie Retention Periods</h2>
                <p className="text-muted-foreground mb-4">
                  Cookies have different lifespans depending on their purpose:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Session Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Deleted automatically when you close your browser.
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Persistent Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Remain on your device for a set period (typically 30 days
                      to 2 years) or until you manually delete them.
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Google Analytics cookies expire after 26 months of
                      inactivity.
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Affiliate Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Duration varies by VPN provider, typically 30 to 90 days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Updates */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect
                  changes in our use of cookies or for other operational, legal,
                  or regulatory reasons. We will update the &quot;Last
                  updated&quot; date at the top of this page when changes are
                  made. We encourage you to review this page periodically.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about our use of cookies or this
                  Cookie Policy, please contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold">ZeroToVPN</p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a
                      href="mailto:hello@zerotovpn.com"
                      className="text-primary hover:underline"
                    >
                      hello@zerotovpn.com
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
                    <FileText className="h-4 w-4" />
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
                    href="/affiliate-disclosure"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    Affiliate Disclosure
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
