import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  Users,
  Target,
  Shield,
  Award,
  CheckCircle,
  Zap,
  Globe,
  Eye,
  BookOpen,
  Mail,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Us - ZeroToVPN",
    description:
      "Learn about ZeroToVPN, our mission to help people find the best VPN services, and our commitment to honest, independent reviews.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              Established 2024
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              About ZeroToVPN
            </h1>
            <p className="text-xl text-muted-foreground">
              From zero knowledge to VPN expert. We help you navigate the complex
              world of online privacy and find the perfect VPN for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">VPNs Tested</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Speed Tests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">9</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100K+</div>
              <div className="text-sm text-muted-foreground">Monthly Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  In an age where online privacy is increasingly important, finding
                  the right VPN can be overwhelming. With hundreds of providers
                  making bold claims, how do you know which one to trust?
                </p>
                <p className="text-lg text-muted-foreground">
                  That&apos;s where ZeroToVPN comes in. Our mission is simple:{" "}
                  <strong>
                    provide honest, independent VPN reviews that help real people
                    make informed decisions about their online privacy.
                  </strong>
                </p>
                <p className="text-lg text-muted-foreground">
                  We test every VPN ourselves, cut through the marketing hype, and
                  give you the facts you need to choose the right service.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-8 space-y-6">
                <h3 className="text-xl font-bold">Our Core Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Honesty First</span>
                      <p className="text-sm text-muted-foreground">
                        We tell it like it is, even when VPNs are our partners
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">User-Focused</span>
                      <p className="text-sm text-muted-foreground">
                        Every review is written with your needs in mind
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Independent Testing</span>
                      <p className="text-sm text-muted-foreground">
                        We don&apos;t rely on press releases or marketing claims
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Transparency</span>
                      <p className="text-sm text-muted-foreground">
                        We clearly disclose how we make money
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Test */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How We Test VPNs</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our rigorous testing methodology ensures every review is accurate,
                fair, and useful. Here&apos;s what we evaluate:
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Speed Testing</h3>
                <p className="text-muted-foreground text-sm">
                  We run speed tests across 50+ server locations using standardized
                  conditions to measure real-world performance.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Security Audits</h3>
                <p className="text-muted-foreground text-sm">
                  We test for DNS leaks, WebRTC leaks, and evaluate encryption
                  protocols to ensure your data stays private.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Streaming Tests</h3>
                <p className="text-muted-foreground text-sm">
                  We verify which VPNs work with Netflix, Disney+, BBC iPlayer, and
                  other popular streaming services.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  We analyze privacy policies, jurisdiction implications, and
                  verify no-logs claims where possible.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
                <p className="text-muted-foreground text-sm">
                  We contact support teams with real questions and evaluate
                  response times, helpfulness, and expertise.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Value Assessment</h3>
                <p className="text-muted-foreground text-sm">
                  We compare pricing, features, and performance to determine which
                  VPNs offer the best value for money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Editorial Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                ZeroToVPN is run by a team of cybersecurity enthusiasts and tech
                journalists passionate about online privacy.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-card border rounded-lg p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Research Team</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  VPN Testing & Analysis
                </p>
                <p className="text-sm text-muted-foreground">
                  Our researchers conduct hands-on testing of every VPN, running
                  speed tests, security audits, and usability assessments.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Editorial Team</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Content & Reviews
                </p>
                <p className="text-sm text-muted-foreground">
                  Our editors transform technical findings into clear, helpful
                  content that anyone can understand.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Security Advisors</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Cybersecurity Expertise
                </p>
                <p className="text-sm text-muted-foreground">
                  Security professionals who ensure our technical assessments are
                  accurate and up-to-date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Trust ZeroToVPN?</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Independent & Unbiased
                </h3>
                <p className="text-muted-foreground">
                  While we have affiliate relationships with some VPN providers, our
                  editorial content is completely independent. We rate VPNs based on
                  their performance, not their commission rates. Our top picks have
                  earned their position through real-world testing.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Hands-On Testing</h3>
                <p className="text-muted-foreground">
                  We don&apos;t just read press releases. Every VPN we review is
                  personally tested by our team. We purchase subscriptions with our
                  own money, install the apps, run speed tests, and use the VPNs for
                  everyday tasks. This ensures our reviews reflect real user
                  experiences.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Regular Updates</h3>
                <p className="text-muted-foreground">
                  VPN services change constantly - new features are added, prices
                  change, and security vulnerabilities are discovered. We regularly
                  re-test and update our reviews to ensure the information you find
                  is accurate and current.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Transparent Business Model
                </h3>
                <p className="text-muted-foreground">
                  We&apos;re open about how we make money. Read our{" "}
                  <Link
                    href="/affiliate-disclosure"
                    className="text-primary hover:underline"
                  >
                    Affiliate Disclosure
                  </Link>{" "}
                  for full details. We believe transparency builds trust, and trust
                  is essential for a review site to have value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Have questions, suggestions, or feedback? We&apos;d love to hear from
              you. Our team is always happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-8 border-t">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Learn More</h2>
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
      </section>
    </div>
  );
}
