import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd } from "@/components/structured-data";
import { Link } from "@/i18n/navigation";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/pipeline/blog-service";
import {
  AuthorBox,
  FactCheckedBadge,
  SourcesSection,
} from "@/components/blog/author-box";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    metadataBase: new URL(baseUrl),
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ["ZeroToVPN Expert Team"],
    },
  };
}

export default async function DynamicBlogPost({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const readTime = `${Math.max(1, Math.ceil(post.content.length / 1500))} min`;
  const lastUpdated = post.updatedAt.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />
      </div>

      {/* Article Header */}
      <article className="container max-w-4xl py-8 lg:py-12">
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
                {post.publishedAt.toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

          {/* E-E-A-T: Fact-checked badge + author + last updated */}
          <FactCheckedBadge lastUpdated={lastUpdated} />
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={post.featuredImage}
              alt={post.title}
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
          className="blog-content prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:border-border
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto
            prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden
            prose-thead:bg-primary/10 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:border-b prose-th:border-border
            prose-td:p-3 prose-td:border-b prose-td:border-border/50
            prose-tr:hover:bg-muted/30 prose-tr:transition-colors
            prose-li:marker:text-primary
            prose-strong:text-foreground
            prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <style dangerouslySetInnerHTML={{ __html: `
          .blog-content table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; border-radius: 0.5rem; overflow: hidden; }
          .blog-content table thead { background: hsl(var(--primary) / 0.08); }
          .blog-content table th { font-weight: 600; text-align: left; }
          .blog-content table td, .blog-content table th { padding: 0.75rem 1rem; border-bottom: 1px solid hsl(var(--border)); }
          .blog-content table tr:last-child td { border-bottom: none; }
          .blog-content table tr:hover { background: hsl(var(--muted) / 0.4); }
        ` }} />

        {/* E-E-A-T: Sources & References */}
        <SourcesSection content={post.content} />

        {/* E-E-A-T: Author Box */}
        <AuthorBox />
      </article>

      {/* Structured Data */}
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        datePublished={
          post.publishedAt?.toISOString() || post.createdAt.toISOString()
        }
        dateModified={post.updatedAt.toISOString()}
        url={`${baseUrl}/${locale === "en" ? "" : `${locale}/`}blog/${post.slug}`}
      />
    </div>
  );
}
