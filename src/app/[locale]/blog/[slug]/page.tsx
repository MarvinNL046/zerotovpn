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
import { generateAlternates, titelMetMerk } from "@/lib/seo-utils";
import { getRelatedContent } from "@/lib/content-links";
import { RelatedContent } from "@/components/seo/related-content";
import InlineAd from "@/components/ads/InlineAd";
import { normaliseerArtikelKoppen } from "@/lib/blog-content";
import {
  AuthorBox,
  FactCheckedBadge,
  SourcesSection,
} from "@/components/blog/author-box";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { IranEditorialQuickPicks } from "@/components/editorial/iran-editorial-quick-picks";
import {
  iranVpnEditorialFaq,
  iranVpnEditorialTitle,
  iranVpnEditorialExcerpt,
} from "@/data/editorial/iran-vpn-2026";
import {
  telegramVpnEditorialFaq,
  telegramVpnEditorialTitle,
  telegramVpnEditorialExcerpt,
} from "@/data/editorial/telegram-vpn-2026";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

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

  const clusterLinks = censorshipClusterLinks[slug] || [];
  const isIranEditorial = slug === "best-vpn-for-iran-2026-bypass-internet-censorship";
  const isTelegramEditorial = slug === "best-vpn-for-telegram-2026";
  const isCensorshipEditorial = isIranEditorial || isTelegramEditorial;
  const displayTitle = isIranEditorial
    ? iranVpnEditorialTitle
    : isTelegramEditorial
      ? telegramVpnEditorialTitle
      : post.title;
  const displayExcerpt = isIranEditorial
    ? iranVpnEditorialExcerpt
    : isTelegramEditorial
      ? telegramVpnEditorialExcerpt
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
              aria-label="Censorship research cluster"
              className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5"
            >
              <p className="mb-3 text-sm font-semibold text-primary">
                Censorship research cluster
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
          dangerouslySetInnerHTML={{ __html: normaliseerArtikelKoppen(post.content) }}
        />

        {isIranEditorial && <FAQSchema title="Iran VPN FAQ" faqs={iranVpnEditorialFaq} />}
        {isTelegramEditorial && <FAQSchema title="Telegram VPN FAQ" faqs={telegramVpnEditorialFaq} />}

        {/* Ad placement */}
        <InlineAd />

        {/* E-E-A-T: Sources & References */}
        <div id="sources" className="scroll-mt-20">
          <SourcesSection content={post.content} />
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
