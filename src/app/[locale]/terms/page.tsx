import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  FileText,
  Scale,
  AlertTriangle,
  Users,
  Ban,
  Copyright,
  Mail,
  Shield,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms of Service - ZeroToVPN",
    description:
      "Read the terms and conditions for using ZeroToVPN. Understand your rights and responsibilities when using our VPN comparison and review website.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsPage({ params }: Props) {
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
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms carefully before using our website.
              By accessing ZeroToVPN, you agree to be bound by these terms.
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
              {/* Agreement */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Agreement to Terms
                </h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using ZeroToVPN (&quot;Website&quot;), you accept and
                  agree to be bound by these Terms of Service (&quot;Terms&quot;). If you
                  disagree with any part of these terms, you may not access the
                  Website.
                </p>
                <p className="text-muted-foreground">
                  These Terms constitute a legally binding agreement between you
                  and ZeroToVPN (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) regarding your use
                  of our Website located at zerotovpn.com and any related services.
                </p>
              </div>

              {/* Description of Service */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Description of Service
                </h2>
                <p className="text-muted-foreground mb-4">
                  ZeroToVPN is an informational website that provides:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>VPN provider reviews and comparisons</li>
                  <li>Educational content about VPNs and online privacy</li>
                  <li>User reviews and ratings of VPN services</li>
                  <li>Affiliate links to VPN provider websites</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm font-medium flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Important:</strong> We do not provide VPN services
                      ourselves. We are an independent review and comparison platform.
                      All VPN services are provided by third-party companies.
                    </span>
                  </p>
                </div>
              </div>

              {/* Affiliate Disclosure */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Affiliate Relationships</h2>
                <p className="text-muted-foreground mb-4">
                  ZeroToVPN participates in affiliate programs. This means:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    We may earn commissions when you purchase VPN services through
                    our affiliate links
                  </li>
                  <li>
                    Affiliate relationships do not influence our editorial content
                    or ratings
                  </li>
                  <li>
                    Using our affiliate links does not cost you any extra money
                  </li>
                  <li>
                    We are committed to providing honest, unbiased reviews
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  For more details, please read our{" "}
                  <Link
                    href="/affiliate-disclosure"
                    className="text-primary hover:underline"
                  >
                    Affiliate Disclosure
                  </Link>
                  .
                </p>
              </div>

              {/* User Responsibilities */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  User Responsibilities
                </h2>
                <p className="text-muted-foreground mb-4">
                  When using our Website, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Use the Website only for lawful purposes</li>
                  <li>Provide accurate information when submitting reviews</li>
                  <li>
                    Not attempt to interfere with the proper functioning of the
                    Website
                  </li>
                  <li>Not engage in any activity that could harm our reputation</li>
                  <li>Comply with all applicable local, state, and national laws</li>
                  <li>Respect the intellectual property rights of others</li>
                </ul>
              </div>

              {/* User Reviews */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">User-Submitted Content</h2>
                <p className="text-muted-foreground mb-4">
                  By submitting reviews or other content to our Website, you:
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Grant Us a License
                </h3>
                <p className="text-muted-foreground mb-4">
                  You grant ZeroToVPN a non-exclusive, worldwide, royalty-free,
                  perpetual license to use, display, reproduce, modify, and
                  distribute your submitted content on our Website and related
                  marketing materials.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Represent and Warrant That
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You own or have the right to submit the content</li>
                  <li>
                    The content is truthful and based on your genuine experience
                  </li>
                  <li>
                    The content does not violate any third party&apos;s rights
                  </li>
                  <li>
                    The content does not contain defamatory, obscene, or illegal
                    material
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Moderation Rights
                </h3>
                <p className="text-muted-foreground">
                  We reserve the right to moderate, edit, or remove any
                  user-submitted content at our sole discretion, including content
                  that violates these Terms or is otherwise objectionable.
                </p>
              </div>

              {/* Prohibited Activities */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Ban className="h-6 w-6 text-primary" />
                  Prohibited Activities
                </h2>
                <p className="text-muted-foreground mb-4">
                  You are prohibited from:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    Using automated systems (bots, scrapers) to access the Website
                    without permission
                  </li>
                  <li>
                    Attempting to gain unauthorized access to our systems or servers
                  </li>
                  <li>
                    Submitting fake reviews or manipulating ratings
                  </li>
                  <li>
                    Impersonating another person or misrepresenting your affiliation
                  </li>
                  <li>
                    Uploading malware, viruses, or other malicious code
                  </li>
                  <li>
                    Engaging in spamming, phishing, or other deceptive practices
                  </li>
                  <li>
                    Using the Website to harass, abuse, or harm others
                  </li>
                  <li>
                    Circumventing or attempting to circumvent any security measures
                  </li>
                  <li>
                    Copying, reproducing, or redistributing our content without
                    permission
                  </li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Copyright className="h-6 w-6 text-primary" />
                  Intellectual Property
                </h2>
                <p className="text-muted-foreground mb-4">
                  The Website and its original content (excluding user-submitted
                  content), features, and functionality are owned by ZeroToVPN and
                  are protected by international copyright, trademark, and other
                  intellectual property laws.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our trademarks and trade dress may not be used without our prior
                  written permission. Third-party trademarks, service marks, and
                  logos (such as VPN provider logos) are the property of their
                  respective owners.
                </p>
                <p className="text-muted-foreground">
                  You may view, download, and print pages from the Website for your
                  personal, non-commercial use only, subject to the restrictions set
                  out in these Terms.
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  Disclaimer
                </h2>

                <h3 className="text-xl font-semibold mt-4 mb-3">
                  No Professional Advice
                </h3>
                <p className="text-muted-foreground mb-4">
                  The information on this Website is provided for general
                  informational purposes only and does not constitute professional
                  advice. You should not rely solely on our content when making
                  decisions about VPN services or online security.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-3">
                  &quot;As Is&quot; Basis
                </h3>
                <p className="text-muted-foreground mb-4">
                  THE WEBSITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS
                  WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
                  INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF
                  PERFORMANCE.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-3">
                  Third-Party Services
                </h3>
                <p className="text-muted-foreground">
                  We do not guarantee or warrant any third-party VPN services
                  featured on our Website. Your use of any VPN service is at your
                  own risk and subject to that provider&apos;s terms of service.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, ZEROTOVPN SHALL NOT BE
                  LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                  PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Loss of profits, revenue, or data</li>
                  <li>Interruption of business</li>
                  <li>Cost of substitute services</li>
                  <li>
                    Any damages resulting from your use of third-party VPN services
                  </li>
                  <li>
                    Any damages resulting from unauthorized access to your data
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  Our total liability for any claim arising from your use of the
                  Website shall not exceed the amount you have paid us (if any) in
                  the twelve (12) months preceding the claim.
                </p>
              </div>

              {/* Indemnification */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                <p className="text-muted-foreground">
                  You agree to indemnify, defend, and hold harmless ZeroToVPN, its
                  officers, directors, employees, agents, and affiliates from any
                  claims, liabilities, damages, losses, costs, or expenses
                  (including reasonable attorneys&apos; fees) arising from: (a) your
                  use of the Website; (b) your violation of these Terms; (c) your
                  violation of any third party&apos;s rights; or (d) any content you
                  submit to the Website.
                </p>
              </div>

              {/* External Links */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">External Links</h2>
                <p className="text-muted-foreground mb-4">
                  Our Website contains links to third-party websites, including VPN
                  provider websites. These links are provided for your convenience
                  and do not signify our endorsement of such websites.
                </p>
                <p className="text-muted-foreground">
                  We have no control over and assume no responsibility for the
                  content, privacy policies, or practices of any third-party
                  websites. You access linked sites at your own risk.
                </p>
              </div>

              {/* Termination */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Termination</h2>
                <p className="text-muted-foreground mb-4">
                  We may terminate or suspend your access to the Website
                  immediately, without prior notice or liability, for any reason,
                  including without limitation if you breach these Terms.
                </p>
                <p className="text-muted-foreground">
                  Upon termination, your right to use the Website will immediately
                  cease. All provisions of these Terms which by their nature should
                  survive termination shall survive, including ownership provisions,
                  warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </div>

              {/* Governing Law */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with
                  the laws of the Netherlands, without regard to its conflict of law
                  provisions. Any disputes arising from these Terms or your use of
                  the Website shall be resolved in the competent courts of the
                  Netherlands.
                </p>
              </div>

              {/* Severability */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Severability</h2>
                <p className="text-muted-foreground">
                  If any provision of these Terms is found to be invalid, illegal,
                  or unenforceable, the remaining provisions shall continue in full
                  force and effect. The invalid provision shall be modified to the
                  minimum extent necessary to make it valid and enforceable while
                  preserving its original intent.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms at any time. We will
                  notify users of any material changes by posting the updated Terms
                  on this page and updating the &quot;Last updated&quot; date. Your
                  continued use of the Website after any changes constitutes
                  acceptance of the new Terms.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold">ZeroToVPN</p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a
                      href="mailto:legal@zerotovpn.com"
                      className="text-primary hover:underline"
                    >
                      legal@zerotovpn.com
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
