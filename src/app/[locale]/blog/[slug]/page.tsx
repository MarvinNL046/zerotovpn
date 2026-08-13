import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd } from "@/components/structured-data";
import { Link } from "@/i18n/navigation";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getPostBySlug, getAllPublishedSlugs } from "@/lib/pipeline/blog-service";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { routing } from "@/i18n/routing";
import { DEFAULT_OG_IMAGE, generateAlternates, titelMetMerk } from "@/lib/seo-utils";
import { getRelatedContent } from "@/lib/content-links";
import { RelatedContent } from "@/components/seo/related-content";
import InlineAd from "@/components/ads/InlineAd";
import {
  normaliseerAffiliateLinks,
  normaliseerArtikelKoppen,
  verwijderAffiliateLinks,
} from "@/lib/blog-content";
import {
  AuthorBox,
  FactCheckedBadge,
  SourcesSection,
} from "@/components/blog/author-box";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { IranEditorialQuickPicks } from "@/components/editorial/iran-editorial-quick-picks";
import type { EditorialContentBrief } from "@/lib/editorial-content-brief";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";
import {
  iranVpnEditorialFaq,
  iranVpnEditorialContent,
  iranVpnEditorialTitle,
  iranVpnEditorialExcerpt,
} from "@/data/editorial/iran-vpn-2026";
import {
  telegramVpnEditorialFaq,
  telegramVpnEditorialTitle,
  telegramVpnEditorialExcerpt,
} from "@/data/editorial/telegram-vpn-2026";
import {
  connectionDropsEditorialFaq,
  connectionDropsEditorialTitle,
  connectionDropsEditorialExcerpt,
} from "@/data/editorial/connection-drops-2026";
import {
  serverLocationEditorialFaq,
  serverLocationEditorialTitle,
  serverLocationEditorialExcerpt,
} from "@/data/editorial/server-location-2026";
import {
  ispPrivacyEditorialFaq,
  ispPrivacyEditorialTitle,
  ispPrivacyEditorialExcerpt,
  ispPrivacyEditorialContent,
} from "@/data/editorial/isp-privacy-2026";
import {
  braveVpnEditorialFaq,
  braveVpnEditorialTitle,
  braveVpnEditorialExcerpt,
  braveVpnEditorialContent,
} from "@/data/editorial/brave-vpn-2026";
import {
  vpnAccountSharingEditorialFaq,
  vpnAccountSharingEditorialTitle,
  vpnAccountSharingEditorialExcerpt,
  vpnAccountSharingEditorialContent,
} from "@/data/editorial/vpn-account-sharing-2026";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

const iranContentBrief = {
  primaryKeyword: "best vpn for iran",
  intent: "commercial",
  cluster: "censorship-restricted-networks",
  lastReviewedAt: "2026-08-11",
  evidence: [
    "docs/research/dataforseo-iran-cluster-2026-08-11.md",
    "/methodology",
    "https://freedomhouse.org/country/iran/freedom-net/2025",
  ],
  affiliateContext: "vpn-selection",
  schemaType: "Article",
} satisfies EditorialContentBrief;

const connectionDropsContentBrief = {
  primaryKeyword: "vpn keeps disconnecting",
  intent: "informational",
  cluster: "protocol-and-technical-literacy",
  lastReviewedAt: "2026-08-13",
  evidence: [
    "docs/research/dataforseo-connection-drops-cluster-2026-08-13.md",
    "/methodology",
    "/guides/vpn-protocols-explained",
  ],
  affiliateContext: "none",
  schemaType: "Article",
} satisfies EditorialContentBrief;

const serverLocationContentBrief = {
  primaryKeyword: "best vpn server location",
  intent: "commercial",
  cluster: "travel-and-public-wifi",
  lastReviewedAt: "2026-08-13",
  evidence: [
    "docs/research/dataforseo-server-location-cluster-2026-08-13.md",
    "/methodology",
    "/guides/vpn-speed-guide",
  ],
  affiliateContext: "none",
  schemaType: "Article",
} satisfies EditorialContentBrief;

const ispPrivacyContentBrief = {
  primaryKeyword: "can a vpn hide you from your isp",
  intent: "informational",
  cluster: "privacy-and-trust",
  lastReviewedAt: "2026-08-13",
  evidence: [
    "docs/research/dataforseo-isp-privacy-cluster-2026-08-13.md",
    "/methodology",
    "/tools/dns-leak-test",
  ],
  affiliateContext: "none",
  schemaType: "Article",
} satisfies EditorialContentBrief;

const braveVpnContentBrief = {
  primaryKeyword: "is brave vpn free",
  intent: "commercial",
  cluster: "privacy-and-trust",
  lastReviewedAt: "2026-08-13",
  evidence: [
    "docs/research/dataforseo-brave-vpn-cluster-2026-08-13.md",
    "/methodology",
    "/best/free-vpn",
  ],
  affiliateContext: "none",
  schemaType: "Article",
} satisfies EditorialContentBrief;

const vpnAccountSharingContentBrief = {
  primaryKeyword: "can you share a vpn account",
  intent: "informational",
  cluster: "privacy-and-trust",
  lastReviewedAt: "2026-08-13",
  evidence: [
    "docs/research/dataforseo-vpn-account-sharing-cluster-2026-08-13.md",
    "/methodology",
    "/terms",
  ],
  affiliateContext: "none",
  schemaType: "Article",
} satisfies EditorialContentBrief;

type ClusterLink = {
  title: string;
  description: string;
  href: string;
};

const censorshipClusterLinks: Record<string, ClusterLink[]> = {
  "best-vpn-for-iran-2026-bypass-internet-censorship": [
    {
      title: "Iran evidence checklist",
      description: "Separate current legal, network, and provider evidence from permanent access claims.",
      href: "/countries/iran",
    },
    {
      title: "VPNs for Russia",
      description: "Compare the same censorship questions in Russia's changing network environment.",
      href: "/countries/russia",
    },
    {
      title: "Unblock Telegram",
      description: "See why obfuscation and a pre-travel setup matter for restricted messaging apps.",
      href: "/blog/best-vpn-for-telegram-2026",
    },
  ],
  "best-vpn-for-telegram-2026": [
    {
      title: "Iran evidence checklist",
      description: "Country-specific checks for lawful VPN testing when network conditions are restrictive.",
      href: "/countries/iran",
    },
    {
      title: "VPNs for Russia",
      description: "A current country guide for blocked services, protocols, and fallback planning.",
      href: "/countries/russia",
    },
    {
      title: "VPNs for China",
      description: "Understand obfuscation, app preparation, and Great Firewall constraints.",
      href: "/countries/china",
    },
  ],
};

const clusterMetadata: Record<string, { title: string; description: string }> = {
  "best-vpn-for-iran-2026-bypass-internet-censorship": {
    title: iranVpnEditorialTitle,
    description:
      iranVpnEditorialExcerpt,
  },
  "best-vpn-for-telegram-2026": {
    title: telegramVpnEditorialTitle,
    description:
      telegramVpnEditorialExcerpt,
  },
  "best-vpn-for-chatgpt-2026": {
    title: "Best VPNs for ChatGPT 2026: What Works in Restricted Countries",
    description:
      "Compare VPNs for ChatGPT and OpenAI in restricted countries: access checks, latency, mobile setup and privacy limits before you connect.",
  },
  "vpn-connection-drops-why-disconnects-how-to-fix-2026": {
    title: connectionDropsEditorialTitle,
    description: connectionDropsEditorialExcerpt,
  },
  "best-country-for-vpn-server-location-2026": {
    title: serverLocationEditorialTitle,
    description: serverLocationEditorialExcerpt,
  },
  "can-vpn-hide-from-isp": {
    title: ispPrivacyEditorialTitle,
    description: ispPrivacyEditorialExcerpt,
  },
  "is-brave-vpn-free-2026": {
    title: braveVpnEditorialTitle,
    description: braveVpnEditorialExcerpt,
  },
  "vpn-account-sharing-safe-guide-2026": {
    title: vpnAccountSharingEditorialTitle,
    description: vpnAccountSharingEditorialExcerpt,
  },
};

const aiPrivacyClusterLinks: Record<string, ClusterLink[]> = {
  "best-vpn-for-chatgpt-2026": [
    {
      title: "Best VPNs overall",
      description: "Compare privacy, streaming, speed and value before choosing a provider.",
      href: "/best/vpn",
    },
    {
      title: "AI privacy and data leaks",
      description: "Learn what a VPN can and cannot protect when you use ChatGPT and other AI tools.",
      href: "/blog/vpn-generative-ai-privacy-chatgpt-claude-gemini-data-leaks",
    },
    {
      title: "VPNs for China",
      description: "Check obfuscation, app preparation and network limits before travelling.",
      href: "/countries/china",
    },
  ],
};

const technicalClusterLinks: Record<string, ClusterLink[]> = {
  "vpn-connection-drops-why-disconnects-how-to-fix-2026": [
    {
      title: "VPN protocol guide",
      description: "Compare WireGuard, OpenVPN and IKEv2 before changing the protocol.",
      href: "/guides/vpn-protocols-explained",
    },
    {
      title: "VPN speed guide",
      description: "Separate baseline internet problems from VPN route and server effects.",
      href: "/guides/vpn-speed-guide",
    },
    {
      title: "VPNs for mobile devices",
      description: "Check background permissions and network handoffs on phones and tablets.",
      href: "/best/vpn-mobile",
    },
  ],
};

const locationClusterLinks: Record<string, ClusterLink[]> = {
  "best-country-for-vpn-server-location-2026": [
    {
      title: "VPN speed guide",
      description: "Measure latency, throughput and stability instead of trusting a fixed country ranking.",
      href: "/guides/vpn-speed-guide",
    },
    {
      title: "VPN privacy comparison",
      description: "Review logging policy, ownership and jurisdiction evidence separately from server location.",
      href: "/best/vpn-privacy",
    },
    {
      title: "VPNs for travel",
      description: "Prepare devices and networks before relying on a VPN while travelling.",
      href: "/guides/vpn-for-travel",
    },
  ],
};

const ispPrivacyClusterLinks: Record<string, ClusterLink[]> = {
  "can-vpn-hide-from-isp": [
    {
      title: "VPN encryption explained",
      description: "Understand what the encrypted tunnel protects and where its boundary ends.",
      href: "/vpn-encryption-explained",
    },
    {
      title: "DNS leak test",
      description: "Check whether DNS requests follow the VPN instead of falling back to the ISP.",
      href: "/tools/dns-leak-test",
    },
    {
      title: "VPN privacy comparison",
      description: "Compare logging, ownership and jurisdiction evidence before trusting a provider.",
      href: "/best/vpn-privacy",
    },
  ],
};

const braveVpnClusterLinks: Record<string, ClusterLink[]> = {
  "is-brave-vpn-free-2026": [
    {
      title: "Free VPN guide",
      description: "Compare documented limits and privacy trade-offs instead of assuming every free VPN is equivalent.",
      href: "/best/free-vpn",
    },
    {
      title: "VPN privacy comparison",
      description: "Review logging, ownership and jurisdiction evidence before trusting a provider.",
      href: "/best/vpn-privacy",
    },
    {
      title: "VPN methodology",
      description: "See how current provider terms and hands-on checks should be evaluated.",
      href: "/methodology",
    },
  ],
};

const vpnAccountSharingClusterLinks: Record<string, ClusterLink[]> = {
  "vpn-account-sharing-safe-guide-2026": [
    {
      title: "VPN privacy comparison",
      description: "Review logging, account controls and jurisdiction evidence before choosing a provider.",
      href: "/best/vpn-privacy",
    },
    {
      title: "VPN testing methodology",
      description: "See how provider terms and device behaviour should be checked over time.",
      href: "/methodology",
    },
    {
      title: "VPN terms and policies",
      description: "Start with the site's current terms before treating any sharing rule as permission.",
      href: "/terms",
    },
  ],
};

// Pre-render alle gepubliceerde blogposts bij het bouwen, in elke taal (met
// Engelse fallback). Zonder dit werd elke blog-URL on-demand gerenderd en
// query'de een crawler door 511 posts telkens live Postgres — wat de
// Neon-compute wakker hield. Nu serveert runtime statische HTML.
// dynamicParams blijft standaard true: nieuw gegenereerde posts renderen bij
// het eerste bezoek (ISR) en verschijnen zonder rebuild.
export async function generateStaticParams() {
  const posts = await getAllPublishedSlugs();
  const slugs = [...new Set(posts.map((p) => p.slug))];
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

// Eens per dag revalideren zodat inhoudelijke wijzigingen doorkomen zonder de
// database vaker dan nodig te raken (de datalaag cachet bovendien al 1 uur).
export const revalidate = 86400;

function formatDate(date: Date, locale: string): string {
  const months: Record<string, string[]> = {
    en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    nl: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
    de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
    fr: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
  };
  const m = months[locale] || months.en;
  return `${m[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const override = clusterMetadata[slug];

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: titelMetMerk(override?.title || post.metaTitle || post.title) },
    description: override?.description || post.metaDescription || post.excerpt,
    openGraph: {
      title: override?.title || post.metaTitle || post.title,
      description: override?.description || post.metaDescription || post.excerpt,
      type: "article",
      images: [DEFAULT_OG_IMAGE],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ["ZeroToVPN Expert Team"],
    },
    alternates: generateAlternates(`/blog/${slug}`, locale),
  };
}

export default async function DynamicBlogPost({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const clusterLinks = censorshipClusterLinks[slug] || aiPrivacyClusterLinks[slug] || technicalClusterLinks[slug] || locationClusterLinks[slug] || ispPrivacyClusterLinks[slug] || braveVpnClusterLinks[slug] || vpnAccountSharingClusterLinks[slug] || [];
  const isIranEditorial = slug === "best-vpn-for-iran-2026-bypass-internet-censorship";
  const isTelegramEditorial = slug === "best-vpn-for-telegram-2026";
  const isChatgptEditorial = slug === "best-vpn-for-chatgpt-2026";
  const isConnectionDropsEditorial = slug === "vpn-connection-drops-why-disconnects-how-to-fix-2026";
  const isServerLocationEditorial = slug === "best-country-for-vpn-server-location-2026";
  const isIspPrivacyEditorial = slug === "can-vpn-hide-from-isp";
  const isBraveVpnEditorial = slug === "is-brave-vpn-free-2026";
  const isVpnAccountSharingEditorial = slug === "vpn-account-sharing-safe-guide-2026";
  const isCensorshipEditorial = isIranEditorial || isTelegramEditorial;
  const isRestrictedAffiliateContext =
    slug === "vpn-blockchain-privacy-mask-wallet-activity-2026";
  const displayTitle = isIranEditorial
    ? iranVpnEditorialTitle
    : isTelegramEditorial
      ? telegramVpnEditorialTitle
      : isChatgptEditorial
        ? clusterMetadata[slug].title
        : isIspPrivacyEditorial
          ? ispPrivacyEditorialTitle
          : isBraveVpnEditorial
            ? braveVpnEditorialTitle
            : isVpnAccountSharingEditorial
              ? vpnAccountSharingEditorialTitle
        : post.title;
  const displayExcerpt = isIranEditorial
    ? iranVpnEditorialExcerpt
    : isTelegramEditorial
      ? telegramVpnEditorialExcerpt
      : isChatgptEditorial
        ? clusterMetadata[slug].description
        : isIspPrivacyEditorial
          ? ispPrivacyEditorialExcerpt
          : isBraveVpnEditorial
            ? braveVpnEditorialExcerpt
            : isVpnAccountSharingEditorial
              ? vpnAccountSharingEditorialExcerpt
        : post.excerpt;
  const editorialVpns = isCensorshipEditorial ? await getAllVpns() : [];
  const relatedLinks = getRelatedContent({
    currentHref: `/blog/${slug}`,
    tags: post.tags || [],
    currentType: "blog",
    limit: 6,
    extraLinks: clusterLinks.map((link) => ({
      ...link,
      type: "guide" as const,
      titleNl: link.title,
      descriptionNl: link.description,
      tags: ["censorship", "country", "obfuscation"],
      icon: "globe",
    })),
  });

  // Strip base64 images and HTML tags before calculating read time
  const textOnly = post.content
    .replace(/data:[^"]+/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const readTime = `${Math.max(1, Math.ceil(textOnly.length / 1500))} min`;
  const lastUpdated = formatDate(post.updatedAt, locale);
  const articleContent = isIranEditorial
    ? iranVpnEditorialContent
    : isIspPrivacyEditorial
      ? ispPrivacyEditorialContent
    : isBraveVpnEditorial
      ? braveVpnEditorialContent
    : isVpnAccountSharingEditorial
      ? vpnAccountSharingEditorialContent
    : isRestrictedAffiliateContext
      ? verwijderAffiliateLinks(post.content)
      : post.content;

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[
            { name: "Blog", href: "/blog" },
            { name: displayTitle, href: `/blog/${post.slug}` },
          ]}
        />
      </div>

      {/* Article Header and shared editorial disclosure/jump navigation */}
      <BestVpnEditorialTemplate
        brief={isIranEditorial ? iranContentBrief : isTelegramEditorial ? editorialContentBriefs.telegram : isConnectionDropsEditorial ? connectionDropsContentBrief : isServerLocationEditorial ? serverLocationContentBrief : isIspPrivacyEditorial ? ispPrivacyContentBrief : isBraveVpnEditorial ? braveVpnContentBrief : isVpnAccountSharingEditorial ? vpnAccountSharingContentBrief : undefined}
        navigation={[
          { href: "#article-content", label: "Article" },
          ...(isCensorshipEditorial ? [{ href: "#quick-picks", label: "Shortlist" }] : []),
          ...(clusterLinks.length > 0 ? [{ href: "#cluster-links", label: "Cluster" }] : []),
          { href: "#sources", label: "Sources" },
          { href: "#related-content", label: "Related" },
        ]}
      >
      <article id="article-content" className="container max-w-4xl py-8 lg:py-12">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="capitalize">{post.category}</Badge>
            {post.publishedAt && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Posted: {formatDate(post.publishedAt, locale)}
              </span>
            )}
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Updated: {lastUpdated}
            </span>
            {!post.publishedAt && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Posted: {formatDate(post.createdAt, locale)}
              </span>
            )}
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {displayTitle}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">{displayExcerpt}</p>

          {clusterLinks.length > 0 && (
            <nav
              id="cluster-links"
              aria-label={isConnectionDropsEditorial ? "Technical VPN troubleshooting cluster" : isServerLocationEditorial ? "VPN server location cluster" : isIspPrivacyEditorial ? "VPN ISP privacy cluster" : isBraveVpnEditorial ? "Brave VPN research cluster" : isVpnAccountSharingEditorial ? "VPN account-sharing cluster" : "Censorship research cluster"}
              className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5"
            >
              <p className="mb-3 text-sm font-semibold text-primary">
                {isConnectionDropsEditorial ? "Technical VPN troubleshooting cluster" : isServerLocationEditorial ? "VPN server location cluster" : isIspPrivacyEditorial ? "VPN ISP privacy cluster" : isBraveVpnEditorial ? "Brave VPN research cluster" : isVpnAccountSharingEditorial ? "VPN account-sharing cluster" : "Censorship research cluster"}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {clusterLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg bg-background/80 p-3 transition-colors hover:bg-background"
                  >
                    <span className="block text-sm font-semibold">{link.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          )}

          {/* E-E-A-T: Fact-checked badge + author + last updated */}
          <FactCheckedBadge lastUpdated={lastUpdated} />
        </div>

        {isCensorshipEditorial && (
          <IranEditorialQuickPicks
            vpns={editorialVpns}
            heading={isTelegramEditorial ? "Start with documented Telegram options" : undefined}
            eyebrow={isTelegramEditorial ? "Telegram shortlist" : undefined}
            description={isTelegramEditorial
              ? "These are contextual affiliate links to providers worth evaluating for Telegram access. They are not proof of a current connection on your network; compare Telegram's MTProxy option and verify the live provider documentation first."
              : undefined}
          />
        )}

        {/* Featured Image */}
        {(post.featuredImageUrl || post.featuredImage) && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            {/* Blob-URL heeft voorrang; de oude base64 blijft als vangnet tot
                de featuredImage-kolom is opgeschoond. Die inlinede ~1 MB aan
                base64 in de HTML van elke blogpagina. */}
            <img
              src={post.featuredImageUrl || post.featuredImage!}
              alt={displayTitle}
              width="1200"
              height="630"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Article Content */}
        <div
          className="blog-content max-w-none"
          dangerouslySetInnerHTML={{
            __html: normaliseerAffiliateLinks(normaliseerArtikelKoppen(articleContent)),
          }}
        />

        {isIranEditorial && <FAQSchema title="Iran VPN FAQ" faqs={iranVpnEditorialFaq} />}
        {isTelegramEditorial && <FAQSchema title="Telegram VPN FAQ" faqs={telegramVpnEditorialFaq} />}
        {isConnectionDropsEditorial && <FAQSchema title="VPN disconnection FAQ" faqs={connectionDropsEditorialFaq} />}
        {isServerLocationEditorial && <FAQSchema title="VPN server location FAQ" faqs={serverLocationEditorialFaq} />}
        {isIspPrivacyEditorial && <FAQSchema title="VPN ISP privacy FAQ" faqs={ispPrivacyEditorialFaq} />}
        {isBraveVpnEditorial && <FAQSchema title="Brave VPN FAQ" faqs={braveVpnEditorialFaq} />}
        {isVpnAccountSharingEditorial && <FAQSchema title="VPN account-sharing FAQ" faqs={vpnAccountSharingEditorialFaq} />}

        {/* Ad placement */}
        <InlineAd />

        {/* E-E-A-T: Sources & References */}
        <div id="sources" className="scroll-mt-20">
          <SourcesSection content={articleContent} />
        </div>

        {/* E-E-A-T: Author Box */}
        <AuthorBox />

        {/* Related Content */}
        <div id="related-content" className="scroll-mt-20">
          <RelatedContent links={relatedLinks} locale={locale} className="mt-12" />
        </div>
      </article>
      </BestVpnEditorialTemplate>

      {/* Structured Data */}
      <ArticleJsonLd
        title={displayTitle}
        description={displayExcerpt}
        datePublished={
          post.publishedAt?.toISOString() || post.createdAt.toISOString()
        }
        dateModified={post.updatedAt.toISOString()}
        url={`${baseUrl}/${locale === "en" ? "" : `${locale}/`}blog/${post.slug}`}
      />
    </div>
  );
}
