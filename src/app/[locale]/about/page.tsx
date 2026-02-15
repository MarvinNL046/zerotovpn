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
  FlaskConical,
  Scale,
  Clock,
  RefreshCw,
  Search,
  BadgeCheck,
  Fingerprint,
  Tv,
  ScrollText,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "About ZeroToVPN | Our Testing Methodology",
    description:
      "Learn about ZeroToVPN's independent VPN testing methodology, our expert team, and our commitment to honest, unbiased reviews. No sponsored rankings.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/about`,
    },
    openGraph: {
      title: "About ZeroToVPN | Our Testing Methodology",
      description:
        "Discover how we independently test and review VPN services. Our rigorous methodology covers speed, security, privacy, and streaming performance.",
      url: `${baseUrl}/about`,
      siteName: "ZeroToVPN",
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="container pt-4">
        <BreadcrumbSchema items={[{ name: "About", href: "/about" }]} />
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              Established 2024 &middot; Independent VPN Testing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              About ZeroToVPN
            </h1>
            <p className="text-xl text-muted-foreground">
              We are an independent VPN review platform dedicated to helping
              people make informed decisions about their online privacy. Every
              rating is earned through rigorous, hands-on testing &mdash; never
              paid for.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Badge variant="green" className="px-3 py-1 text-sm">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                No Sponsored Rankings
              </Badge>
              <Badge variant="blue" className="px-3 py-1 text-sm">
                <FlaskConical className="h-3.5 w-3.5 mr-1" />
                Hands-On Testing
              </Badge>
              <Badge variant="purple" className="px-3 py-1 text-sm">
                <Scale className="h-3.5 w-3.5 mr-1" />
                Editorially Independent
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">
                VPNs Independently Tested
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">
                Speed Tests Conducted
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">
                Security Audits Performed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100K+</div>
              <div className="text-sm text-muted-foreground">
                Monthly Readers
              </div>
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
                  In an age where online privacy is under constant threat,
                  finding the right VPN should not require a cybersecurity
                  degree. With hundreds of providers making bold claims, it is
                  nearly impossible to separate genuine protection from
                  marketing hype.
                </p>
                <p className="text-lg text-muted-foreground">
                  ZeroToVPN exists to solve that problem.{" "}
                  <strong>
                    We provide honest, independent VPN reviews based on
                    real-world testing &mdash; not press releases, not vendor
                    claims, and not sponsored placements.
                  </strong>
                </p>
                <p className="text-lg text-muted-foreground">
                  Every VPN we review is purchased with our own funds, installed
                  on real devices, and put through weeks of rigorous testing
                  before we publish a single word.
                </p>
              </div>
              <Card>
                <CardContent className="space-y-6 pt-2">
                  <h3 className="text-xl font-bold">Our Core Values</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">
                          Independence First
                        </span>
                        <p className="text-sm text-muted-foreground">
                          No VPN provider can pay for a higher ranking. Our
                          editorial team operates independently from our
                          business team.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">
                          Evidence-Based Reviews
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Every claim we make is backed by data from our own
                          testing infrastructure.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">Full Transparency</span>
                        <p className="text-sm text-muted-foreground">
                          We clearly disclose affiliate relationships and how we
                          make money. Read our{" "}
                          <Link
                            href="/affiliate-disclosure"
                            className="text-primary hover:underline"
                          >
                            Affiliate Disclosure
                          </Link>
                          .
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">User-Focused</span>
                        <p className="text-sm text-muted-foreground">
                          Every review is written to help real people &mdash; not
                          to please vendors or maximize commissions.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Testing Methodology */}
      <section id="methodology" className="py-16 lg:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="blue" className="px-4 py-1 mb-4">
                <FlaskConical className="h-3.5 w-3.5 mr-1" />
                Rigorous & Repeatable
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Our Testing Methodology
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every VPN review follows a standardized, multi-phase testing
                protocol. We test on real devices, under real-world conditions,
                across multiple geographic locations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Speed Testing */}
              <Card>
                <CardContent className="pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Speed Testing
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        We measure download speed, upload speed, and latency
                        across 50+ server locations on a standardized 1Gbps
                        baseline connection.
                      </p>
                      <ul className="space-y-1.5">
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Multiple test runs at different times of day
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Tests from US, EU, and Asia-Pacific locations
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          WireGuard, OpenVPN, and IKEv2 protocol comparison
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Audits */}
              <Card>
                <CardContent className="pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Security Audits
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        We perform comprehensive leak tests and evaluate
                        encryption implementation to verify each VPN truly
                        protects your data.
                      </p>
                      <ul className="space-y-1.5">
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          DNS leak testing (IPv4 and IPv6)
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          WebRTC leak detection
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Kill switch reliability testing
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Encryption protocol verification (AES-256, ChaCha20)
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Streaming Tests */}
              <Card>
                <CardContent className="pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <Tv className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Streaming Tests
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        We test each VPN against 15+ major streaming platforms
                        to verify geo-unblocking claims with real subscriptions.
                      </p>
                      <ul className="space-y-1.5">
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Netflix (US, UK, JP, and 7+ other libraries)
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Disney+, BBC iPlayer, Hulu, Amazon Prime
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Streaming quality and buffering assessment
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Policy Analysis */}
              <Card>
                <CardContent className="pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                      <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Privacy Policy Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Our team reads and analyzes every word of each
                        provider&apos;s privacy policy, terms of service, and
                        transparency reports.
                      </p>
                      <ul className="space-y-1.5">
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          No-logs claims verification
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Jurisdiction and data retention analysis
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Third-party audit report review
                        </li>
                        <li className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          Warrant canary and transparency report assessment
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Testing Areas */}
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <div className="bg-card border rounded-lg p-5 text-center">
                <Users className="h-6 w-6 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Customer Support</h3>
                <p className="text-xs text-muted-foreground">
                  We contact each support team with real questions and evaluate
                  response times, helpfulness, and expertise.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5 text-center">
                <Award className="h-6 w-6 text-cyan-600 dark:text-cyan-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Value Assessment</h3>
                <p className="text-xs text-muted-foreground">
                  We compare pricing tiers, features, device limits, and
                  performance to determine true value for money.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-5 text-center">
                <Fingerprint className="h-6 w-6 text-rose-600 dark:text-rose-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">App Security</h3>
                <p className="text-xs text-muted-foreground">
                  We analyze app permissions, third-party trackers, and
                  connection handling to identify potential risks.
                </p>
              </div>
            </div>

            {/* Scoring Methodology */}
            <Card className="mt-8">
              <CardContent className="pt-2">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  How We Calculate Scores
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Each VPN receives a weighted composite score out of 10 based
                  on the following categories:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">30%</div>
                    <div className="text-xs text-muted-foreground">
                      Security & Privacy
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">25%</div>
                    <div className="text-xs text-muted-foreground">
                      Speed & Performance
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">15%</div>
                    <div className="text-xs text-muted-foreground">
                      Streaming & Unblocking
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">10%</div>
                    <div className="text-xs text-muted-foreground">
                      Ease of Use
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">10%</div>
                    <div className="text-xs text-muted-foreground">
                      Value for Money
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">10%</div>
                    <div className="text-xs text-muted-foreground">
                      Customer Support
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                ZeroToVPN is built by a team of cybersecurity professionals,
                tech journalists, and privacy advocates with decades of
                combined experience.
              </p>
            </div>

            {/* Expert Team Box — expanded AuthorBox style */}
            <Card className="mb-8">
              <CardContent className="pt-2">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-xl">
                        ZeroToVPN Expert Team
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-950/30 px-2.5 py-0.5 rounded-full">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified Experts
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      VPN Security Researchers & Privacy Analysts
                    </p>

                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      Our team of cybersecurity professionals has tested and
                      reviewed over 50 VPN services since 2024. We combine
                      hands-on technical testing with in-depth data analysis to
                      provide unbiased VPN recommendations you can trust.
                    </p>

                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-semibold">
                        Team Credentials
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "50+ VPN services tested",
                          "Independent speed & security audits",
                          "No sponsored rankings",
                          "Active since 2024",
                          "Multi-platform testing (Windows, macOS, Linux, iOS, Android)",
                          "Real-world streaming verification",
                        ].map((cred) => (
                          <span
                            key={cred}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted border rounded-md px-2.5 py-1"
                          >
                            <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-semibold">
                        Areas of Expertise
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                          Network security & encryption protocols
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Eye className="h-4 w-4 text-primary flex-shrink-0" />
                          Online privacy & data protection law
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                          Performance benchmarking methodology
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                          Geo-restriction and censorship circumvention
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Roles */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-card border rounded-lg p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FlaskConical className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Research Team</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  VPN Testing & Analysis
                </p>
                <p className="text-sm text-muted-foreground">
                  Our researchers conduct hands-on testing of every VPN across
                  multiple devices, running speed tests, security audits, and
                  usability assessments under standardized conditions.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Editorial Team</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Content & Reviews
                </p>
                <p className="text-sm text-muted-foreground">
                  Our editors transform technical findings into clear, helpful
                  content that anyone can understand. Every article goes through
                  a multi-stage review process before publication.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  Security Advisors
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Cybersecurity Expertise
                </p>
                <p className="text-sm text-muted-foreground">
                  Security professionals who verify the accuracy of our
                  technical assessments and ensure our methodology follows
                  current industry best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Guidelines */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="green" className="px-4 py-1 mb-4">
                <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                E-E-A-T Compliant
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Editorial Guidelines</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our editorial standards ensure every piece of content is
                accurate, fair, and genuinely helpful. Here is how we maintain
                the highest level of quality.
              </p>
            </div>

            <div className="space-y-6">
              {/* Fact-Checking Process */}
              <Card>
                <CardContent className="pt-2">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Fact-Checking Process
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Every article and review goes through a rigorous
                    fact-checking process before publication:
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                        1
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Initial Research
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Data is gathered through hands-on testing and primary
                          source verification.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                        2
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Technical Review
                        </p>
                        <p className="text-xs text-muted-foreground">
                          A security advisor verifies all technical claims and
                          test methodology.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                        3
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Editorial Review</p>
                        <p className="text-xs text-muted-foreground">
                          An editor reviews for accuracy, clarity, and
                          compliance with our style guide.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                        4
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Final Approval
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Senior editor gives final approval before publication.
                          All sources are cited.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Source Requirements */}
              <Card>
                <CardContent className="pt-2">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ScrollText className="h-5 w-5 text-primary" />
                    Source Requirements
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We hold ourselves to strict sourcing standards to ensure
                    reliability:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-sm">
                          Primary sources preferred
                        </span>
                        <p className="text-xs text-muted-foreground">
                          We rely on our own testing data, official VPN
                          documentation, court records, and published audit
                          reports.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-sm">
                          Cross-reference verification
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Claims from VPN providers are cross-referenced with
                          independent third-party sources before inclusion.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-sm">
                          Transparent citations
                        </span>
                        <p className="text-xs text-muted-foreground">
                          All external sources are linked directly in our
                          articles. We never make unsubstantiated claims.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-sm">
                          Unverifiable claims disclosed
                        </span>
                        <p className="text-xs text-muted-foreground">
                          When a provider claim cannot be independently verified
                          (e.g., certain no-logs policies), we explicitly note
                          this limitation.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Update Frequency */}
              <Card>
                <CardContent className="pt-2">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    Update Frequency
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    VPN services evolve rapidly. We maintain the accuracy of our
                    content through a structured update schedule:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm">
                          Quarterly Re-Testing
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Every reviewed VPN is re-tested at minimum once every 3
                        months to verify speed, security, and streaming
                        performance remain consistent.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm">
                          Breaking Changes
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        When a VPN announces significant changes (pricing
                        updates, security incidents, feature additions), we
                        update our reviews within 48 hours.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm">
                          Annual Full Audit
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Once a year, every VPN review receives a complete
                        re-evaluation with fresh testing across all categories.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-sm">
                          &ldquo;Last Updated&rdquo; Dates
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Every article displays a visible &ldquo;Last
                        updated&rdquo; date so you always know how current the
                        information is.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Corrections Policy */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  Corrections Policy
                </h3>
                <p className="text-sm text-muted-foreground">
                  If we discover an error in any of our content, we correct it
                  immediately and add a visible correction note at the top of
                  the article. We take accuracy seriously &mdash; if you spot
                  something that needs updating, please{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    contact us
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us — E-E-A-T Summary */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Trust ZeroToVPN?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trust is earned, not claimed. Here is what sets us apart from
                other VPN review sites.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FlaskConical className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Experience</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We have personally tested over 50 VPN services since 2024,
                  accumulating thousands of hours of real-world usage across
                  Windows, macOS, Linux, iOS, and Android platforms.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Expertise</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our team includes cybersecurity professionals with deep
                  knowledge of encryption protocols, network security, and
                  privacy law. We understand the technology behind the tools.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Authoritativeness</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  With 100,000+ monthly readers and content published in 9
                  languages, ZeroToVPN is a trusted resource for VPN information
                  worldwide. Our reviews are cited by privacy advocates and tech
                  publications.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Trustworthiness</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We disclose all affiliate relationships, never accept payment
                  for rankings, publish corrections openly, and maintain a clear
                  separation between editorial and business operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Have questions about our methodology, want to suggest a VPN for
              review, or found an error in our content? We welcome your
              feedback.
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
            <div className="pt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>General inquiries:</strong>{" "}
                <a
                  href="mailto:hello@zerotovpn.com"
                  className="text-primary hover:underline"
                >
                  hello@zerotovpn.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Press & partnerships:</strong>{" "}
                <a
                  href="mailto:hello@zerotovpn.com"
                  className="text-primary hover:underline"
                >
                  hello@zerotovpn.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Privacy matters:</strong>{" "}
                <a
                  href="mailto:hello@zerotovpn.com"
                  className="text-primary hover:underline"
                >
                  hello@zerotovpn.com
                </a>
              </p>
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
                  href="/reviews"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <BookOpen className="h-4 w-4" />
                  VPN Reviews
                </Link>
                <Link
                  href="/affiliate-disclosure"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  Affiliate Disclosure
                </Link>
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
