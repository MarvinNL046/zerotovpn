import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  Mail,
  MessageSquare,
  Clock,
  Shield,
  FileText,
  HelpCircle,
  Building,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseUrl),
    title: "Contact Us - ZeroToVPN",
    description:
      "Get in touch with the ZeroToVPN team. Questions about VPNs, feedback on our reviews, or business inquiries - we're here to help.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or feedback? We&apos;d love to hear from you.
              Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* General Inquiries */}
              <div className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">General Questions</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Questions about our reviews, recommendations, or anything else?
                </p>
                <a
                  href="mailto:contact@zerotovpn.com"
                  className="text-primary hover:underline font-medium"
                >
                  contact@zerotovpn.com
                </a>
              </div>

              {/* Privacy Concerns */}
              <div className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy Matters</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Questions about your data or exercising your privacy rights.
                </p>
                <a
                  href="mailto:privacy@zerotovpn.com"
                  className="text-primary hover:underline font-medium"
                >
                  privacy@zerotovpn.com
                </a>
              </div>

              {/* Business Inquiries */}
              <div className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <Building className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Business & Press</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Partnership opportunities or media inquiries.
                </p>
                <a
                  href="mailto:business@zerotovpn.com"
                  className="text-primary hover:underline font-medium"
                >
                  business@zerotovpn.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            <form className="bg-card border rounded-xl p-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2.5 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="">Select a topic...</option>
                  <option value="general">General Question</option>
                  <option value="vpn-help">VPN Recommendation Help</option>
                  <option value="review-feedback">Review Feedback</option>
                  <option value="technical">Technical Issue</option>
                  <option value="privacy">Privacy Request</option>
                  <option value="business">Business Inquiry</option>
                  <option value="press">Press / Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-2.5 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and consent to ZeroToVPN storing my information to respond to my
                  inquiry. <span className="text-red-500">*</span>
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We typically respond within 1-2 business days.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">Common Questions</h2>
              <p className="text-muted-foreground">
                Before reaching out, you might find your answer here:
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      Which VPN should I choose?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Check our{" "}
                      <Link
                        href="/best/best-vpn"
                        className="text-primary hover:underline"
                      >
                        Best VPNs of 2026
                      </Link>{" "}
                      guide for personalized recommendations based on your needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      How do you make money?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Read our{" "}
                      <Link
                        href="/affiliate-disclosure"
                        className="text-primary hover:underline"
                      >
                        Affiliate Disclosure
                      </Link>{" "}
                      for full transparency on how we earn revenue.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      How do I delete my data?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      See our{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      for information on your rights and how to request data deletion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      Can I submit a review?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! Visit any{" "}
                      <Link
                        href="/reviews"
                        className="text-primary hover:underline"
                      >
                        VPN review page
                      </Link>{" "}
                      and scroll to the reviews section to share your experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold">Expected Response Times</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">General Questions</span>
                  <Badge variant="secondary">1-2 business days</Badge>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Privacy Requests</span>
                  <Badge variant="secondary">Within 30 days</Badge>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Business Inquiries</span>
                  <Badge variant="secondary">2-3 business days</Badge>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Press / Media</span>
                  <Badge variant="secondary">1-2 business days</Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                * Response times may vary during holidays and peak periods.
                For urgent matters, please indicate this in your subject line.
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
              <h2 className="text-lg font-bold mb-4">Helpful Links</h2>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <Building className="h-4 w-4" />
                  About Us
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
                  href="/affiliate-disclosure"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  Affiliate Disclosure
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
