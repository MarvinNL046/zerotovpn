import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArticleJsonLd } from "@/components/structured-data";
import { Link } from "@/i18n/navigation";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/pipeline/blog-service";

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
            <Badge variant="secondary">{post.category}</Badge>
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

          <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        </div>

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
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-lg prose-img:shadow-md
            prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-table:border prose-th:bg-muted prose-th:p-3 prose-td:p-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
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
