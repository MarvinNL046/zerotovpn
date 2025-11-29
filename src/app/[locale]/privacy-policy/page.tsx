import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Shield, Cookie, Eye, UserCheck, Mail, FileText } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy - ZeroToVPN",
    description:
      "Learn how ZeroToVPN collects, uses, and protects your personal information. Our privacy policy explains your rights and our data practices.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lastUpdated = "November 28, 2025";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect,
              use, and protect your personal information.
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
              {/* Introduction */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Introduction
                </h2>
                <p className="text-muted-foreground mb-4">
                  Welcome to ZeroToVPN (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to
                  protecting your privacy and ensuring you understand how we handle your
                  personal data. This Privacy Policy applies to our website at
                  zerotovpn.com (the &quot;Website&quot;) and describes our practices regarding
                  the collection, use, and disclosure of your information.
                </p>
                <p className="text-muted-foreground">
                  By using our Website, you agree to the collection and use of information
                  in accordance with this policy. If you do not agree with our policies,
                  please do not use our Website.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Eye className="h-6 w-6 text-primary" />
                  Information We Collect
                </h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Information You Provide Directly
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>
                    <strong>Contact Information:</strong> When you contact us or submit
                    a review, we may collect your name and email address.
                  </li>
                  <li>
                    <strong>Newsletter Subscription:</strong> If you subscribe to our
                    newsletter, we collect your email address with your explicit consent.
                  </li>
                  <li>
                    <strong>User Reviews:</strong> If you submit a review, we collect
                    your name, email, rating, and review content.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Information Collected Automatically
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    <strong>Device Information:</strong> Browser type, operating system,
                    device type, and screen resolution.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Pages visited, time spent on pages,
                    referring URLs, and click patterns.
                  </li>
                  <li>
                    <strong>IP Address:</strong> Used for analytics and security purposes.
                    We anonymize IP addresses where possible.
                  </li>
                  <li>
                    <strong>Cookies and Similar Technologies:</strong> See our Cookie
                    section below for details.
                  </li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <UserCheck className="h-6 w-6 text-primary" />
                  How We Use Your Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>To provide, maintain, and improve our Website and services</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To send newsletters and marketing communications (with your consent)</li>
                  <li>To display user reviews on our Website</li>
                  <li>To analyze usage patterns and improve user experience</li>
                  <li>To detect, prevent, and address security issues</li>
                  <li>To comply with legal obligations</li>
                  <li>To display relevant advertisements through Google AdSense</li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Cookie className="h-6 w-6 text-primary" />
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar tracking technologies to enhance your
                  experience on our Website. Cookies are small data files stored on
                  your device.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Types of Cookies We Use</h3>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Essential Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Required for the Website to function properly. These cannot be
                      disabled without affecting site functionality.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our Website by
                      collecting and reporting information anonymously.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Advertising Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Used by Google AdSense to display relevant advertisements based
                      on your interests. These cookies track your visits to our site
                      and other websites.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Preference Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Remember your preferences such as language selection and dark/light
                      mode settings.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3">Managing Cookies</h3>
                <p className="text-muted-foreground">
                  You can control cookies through your browser settings. Most browsers
                  allow you to refuse cookies or delete existing cookies. Please note
                  that disabling cookies may affect the functionality of our Website.
                </p>
              </div>

              {/* Third-Party Services */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground mb-4">
                  We use the following third-party services that may collect and
                  process your data:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Google AdSense</h4>
                    <p className="text-sm text-muted-foreground">
                      We display advertisements through Google AdSense, which uses
                      cookies to serve ads based on your visits to our site and other
                      websites. You can opt out of personalized advertising by visiting{" "}
                      <a
                        href="https://www.google.com/settings/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Ads Settings
                      </a>
                      .
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Google Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      We use Google Analytics to analyze website traffic and usage
                      patterns. This service collects anonymized data about your visits.
                      Learn more at{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Privacy Policy
                      </a>
                      .
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Affiliate Partners</h4>
                    <p className="text-sm text-muted-foreground">
                      When you click on affiliate links to VPN providers, you will be
                      redirected to their websites. These third-party sites have their
                      own privacy policies. We encourage you to review their policies
                      before providing any personal information. See our{" "}
                      <Link
                        href="/affiliate-disclosure"
                        className="text-primary hover:underline"
                      >
                        Affiliate Disclosure
                      </Link>{" "}
                      for more information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Retention */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                <p className="text-muted-foreground mb-4">
                  We retain your personal data only for as long as necessary to fulfill
                  the purposes for which it was collected:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    <strong>Newsletter subscriptions:</strong> Until you unsubscribe
                  </li>
                  <li>
                    <strong>User reviews:</strong> As long as they remain published on
                    our site, or until you request deletion
                  </li>
                  <li>
                    <strong>Analytics data:</strong> 26 months (Google Analytics default)
                  </li>
                  <li>
                    <strong>Contact inquiries:</strong> 2 years after resolution
                  </li>
                </ul>
              </div>

              {/* Your Rights (GDPR) */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Your Rights Under GDPR
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you are located in the European Economic Area (EEA), you have
                  certain data protection rights under the General Data Protection
                  Regulation (GDPR):
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Right to Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Request a copy of the personal data we hold about you.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Right to Rectification</h4>
                    <p className="text-sm text-muted-foreground">
                      Request correction of inaccurate or incomplete data.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Right to Erasure</h4>
                    <p className="text-sm text-muted-foreground">
                      Request deletion of your personal data (&quot;right to be forgotten&quot;).
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Right to Restrict Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Request limitation of how we use your data.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Right to Data Portability</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive your data in a structured, machine-readable format.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Right to Object</h4>
                    <p className="text-sm text-muted-foreground">
                      Object to processing of your personal data for certain purposes.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Right to Withdraw Consent</h4>
                    <p className="text-sm text-muted-foreground">
                      Withdraw consent at any time where we rely on consent for processing.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Right to Lodge a Complaint</h4>
                    <p className="text-sm text-muted-foreground">
                      File a complaint with a supervisory authority.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mt-4">
                  To exercise any of these rights, please contact us using the
                  information provided in the Contact section below.
                </p>
              </div>

              {/* California Privacy Rights */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  California Privacy Rights (CCPA)
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you are a California resident, you have additional rights under
                  the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    The right to know what personal information we collect, use, disclose,
                    and sell
                  </li>
                  <li>The right to request deletion of your personal information</li>
                  <li>
                    The right to opt-out of the sale of your personal information
                    (note: we do not sell personal information)
                  </li>
                  <li>
                    The right to non-discrimination for exercising your privacy rights
                  </li>
                </ul>
              </div>

              {/* Children's Privacy */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Children&apos;s Privacy</h2>
                <p className="text-muted-foreground">
                  Our Website is not intended for children under the age of 16. We do
                  not knowingly collect personal information from children under 16.
                  If you are a parent or guardian and believe your child has provided
                  us with personal information, please contact us immediately. If we
                  discover that a child under 16 has provided us with personal information,
                  we will delete such information from our servers.
                </p>
              </div>

              {/* Security */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate technical and organizational security measures
                  to protect your personal data against unauthorized access, alteration,
                  disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal data</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  However, no method of transmission over the Internet or electronic
                  storage is 100% secure. While we strive to protect your personal
                  data, we cannot guarantee absolute security.
                </p>
              </div>

              {/* International Transfers */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and maintained on servers
                  located outside of your country of residence. If you are located
                  outside the United States and choose to provide information to us,
                  please note that we transfer the data to the United States and process
                  it there. By using our Website, you consent to this transfer. We
                  ensure that any international transfers comply with applicable data
                  protection laws.
                </p>
              </div>

              {/* Changes to Policy */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify
                  you of any changes by posting the new Privacy Policy on this page
                  and updating the &quot;Last updated&quot; date. You are advised to review
                  this Privacy Policy periodically for any changes. Changes to this
                  Privacy Policy are effective when they are posted on this page.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy, your personal
                  data, or wish to exercise your rights, please contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold">ZeroToVPN</p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a
                      href="mailto:privacy@zerotovpn.com"
                      className="text-primary hover:underline"
                    >
                      privacy@zerotovpn.com
                    </a>
                  </p>
                </div>
                <p className="text-muted-foreground mt-4">
                  We aim to respond to all requests within 30 days.
                </p>
              </div>

              {/* Related Pages */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Related Pages</h2>
                <div className="flex flex-wrap gap-4">
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
