import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Shield,
  Zap,
  Globe,
  Tv,
  Lock,
  Smartphone,
  Download,
  Server,
  Eye,
  Wifi,
  ArrowRight,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "VPN Guides & Tutorials - ZeroToVPN",
    description:
      "Learn everything about VPNs with our comprehensive guides. From basics to advanced topics, become a VPN expert with ZeroToVPN.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Guide data
const guides = [
  {
    slug: "what-is-vpn",
    title: "What is a VPN?",
    description:
      "Learn the basics of Virtual Private Networks, how they work, and why you might need one.",
    icon: Shield,
    category: "Basics",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "how-vpn-works",
    title: "How Does a VPN Work?",
    description:
      "Understand the technical details behind VPN encryption, tunneling protocols, and data protection.",
    icon: Lock,
    category: "Basics",
    readTime: "10 min read",
    featured: true,
  },
  {
    slug: "vpn-for-streaming",
    title: "Best VPN for Streaming",
    description:
      "Discover how to use a VPN to access Netflix, Disney+, BBC iPlayer and more from anywhere.",
    icon: Tv,
    category: "Use Cases",
    readTime: "7 min read",
    featured: true,
  },
  {
    slug: "vpn-speed-guide",
    title: "VPN Speed Guide",
    description:
      "Learn what affects VPN speed and how to optimize your connection for the best performance.",
    icon: Zap,
    category: "Performance",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "vpn-protocols-explained",
    title: "VPN Protocols Explained",
    description:
      "WireGuard, OpenVPN, IKEv2 - understand the differences between VPN protocols and which to choose.",
    icon: Server,
    category: "Technical",
    readTime: "12 min read",
    featured: false,
  },
  {
    slug: "vpn-for-torrenting",
    title: "VPN for Torrenting",
    description:
      "Stay safe while downloading with P2P-friendly VPNs. Learn about kill switches and leak protection.",
    icon: Download,
    category: "Use Cases",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "vpn-on-mobile",
    title: "VPN on Mobile Devices",
    description:
      "How to set up and use a VPN on your iPhone or Android device for privacy on the go.",
    icon: Smartphone,
    category: "Setup",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "vpn-for-travel",
    title: "VPN for Travel",
    description:
      "Essential tips for using a VPN while traveling abroad, accessing home content, and staying secure on public WiFi.",
    icon: Globe,
    category: "Use Cases",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "public-wifi-safety",
    title: "Public WiFi Safety",
    description:
      "Why public WiFi is dangerous and how a VPN protects you at cafes, airports, and hotels.",
    icon: Wifi,
    category: "Security",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "vpn-privacy-guide",
    title: "VPN Privacy Guide",
    description:
      "Understanding no-logs policies, jurisdiction, and what makes a VPN truly private.",
    icon: Eye,
    category: "Privacy",
    readTime: "10 min read",
    featured: false,
  },
];

const categories = [
  { name: "All", count: guides.length },
  { name: "Basics", count: guides.filter((g) => g.category === "Basics").length },
  { name: "Use Cases", count: guides.filter((g) => g.category === "Use Cases").length },
  { name: "Security", count: guides.filter((g) => g.category === "Security").length },
  { name: "Technical", count: guides.filter((g) => g.category === "Technical").length },
];

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featuredGuides = guides.filter((g) => g.featured);
  const otherGuides = guides.filter((g) => !g.featured);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              VPN Guides & Tutorials
            </h1>
            <p className="text-lg text-muted-foreground">
              From beginner basics to advanced topics - learn everything you need
              to know about VPNs and online privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={category.name === "All" ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Start Here</h2>
            <p className="text-muted-foreground">
              Essential guides for VPN beginners
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group"
                >
                  <div className="bg-card border rounded-xl p-6 h-full hover:shadow-lg hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {guide.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {guide.readTime}
                      </span>
                      <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Guide
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">All Guides</h2>
            <p className="text-muted-foreground">
              Browse our complete collection of VPN guides
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {otherGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group"
                >
                  <div className="bg-card border rounded-lg p-5 flex items-start gap-4 hover:shadow-md hover:border-primary/50 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold group-hover:text-primary transition-colors">
                          {guide.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {guide.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {guide.description}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {guide.readTime}
                      </span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics Overview */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Topics We Cover</h2>
            <p className="text-muted-foreground">
              Everything you need to become a VPN expert
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold mb-2">VPN Basics</h3>
              <p className="text-sm text-muted-foreground">
                Learn what VPNs are, how they work, and why they matter
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold mb-2">Security & Privacy</h3>
              <p className="text-sm text-muted-foreground">
                Deep dives into encryption, protocols, and staying anonymous
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                <Tv className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold mb-2">Streaming & Content</h3>
              <p className="text-sm text-muted-foreground">
                Unblock Netflix, access global content, and stream safely
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-7 w-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-bold mb-2">Setup & How-To</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step guides for all devices and platforms
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Read our beginner&apos;s guide to understand VPN basics, then compare
              the best VPN services to find your perfect match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/guides/what-is-vpn"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center px-6 py-3 border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Compare VPNs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
