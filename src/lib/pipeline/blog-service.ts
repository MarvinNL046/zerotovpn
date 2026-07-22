import { eq, and, desc, asc, count, sql } from "drizzle-orm";
import { unstable_cache, revalidateTag } from "next/cache";
import { getDb, blogPosts, type BlogPost, type NewBlogPost } from "@/lib/db";

// Blogposts wijzigen alleen als de pipeline er nieuwe genereert (een paar keer
// per dag). Toch werd elke bezoeker van /blog/[slug] live tegen Postgres
// gequeryd — twee keer zelfs (metadata + body) — wat samen met de VPN-pagina's
// de Neon-compute wakker hield. Lees-queries cachen we daarom onder deze tag;
// createPost/updatePost invalideren hem zodat nieuwe posts direct verschijnen.
const BLOG_CACHE_TAG = "blog-posts";

// Lightweight type for blog index (no content/sourceData/aiPrompt)
export type BlogPostSummary = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "category" | "tags" | "published" | "publishedAt" | "createdAt" | "updatedAt" | "language" | "id"
> & { hasFeaturedImage: boolean; featuredImageUrl: string | null };

// Get all published posts for a language and optional category
export async function getAllPublishedPosts(
  language: string = "en",
  category?: string
): Promise<BlogPost[]> {
  const db = getDb();

  const conditions = [
    eq(blogPosts.language, language),
    eq(blogPosts.published, true),
  ];

  if (category) {
    conditions.push(eq(blogPosts.category, category));
  }

  return db
    .select()
    .from(blogPosts)
    .where(and(...conditions))
    .orderBy(desc(blogPosts.publishedAt));
}

// Lightweight version for blog index page — excludes heavy content/sourceData/aiPrompt columns
export async function getAllPublishedPostSummaries(
  language: string = "en",
  category?: string
): Promise<BlogPostSummary[]> {
  const db = getDb();

  const conditions = [
    eq(blogPosts.language, language),
    eq(blogPosts.published, true),
  ];

  if (category) {
    conditions.push(eq(blogPosts.category, category));
  }

  return db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      language: blogPosts.language,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      category: blogPosts.category,
      tags: blogPosts.tags,
      published: blogPosts.published,
      publishedAt: blogPosts.publishedAt,
      createdAt: blogPosts.createdAt,
      updatedAt: blogPosts.updatedAt,
      // featuredImageUrl is een korte Blob-URL en mag dus wél mee in de lijst.
      // De oude featuredImage-kolom bleef hier bewust buiten: die bevat base64
      // van gemiddeld 700 kB per post.
      featuredImageUrl: blogPosts.featuredImageUrl,
      hasFeaturedImage: sql<boolean>`("featuredImageUrl" IS NOT NULL OR "featuredImage" IS NOT NULL)`.as('hasFeaturedImage'),
    })
    .from(blogPosts)
    .where(and(...conditions))
    .orderBy(desc(blogPosts.publishedAt));
}

// Cached version for blog listing page — caches results for 1 hour
export const getCachedPostSummaries = unstable_cache(
  async (language: string) => {
    return getAllPublishedPostSummaries(language);
  },
  // Sleutel meeverhoogd toen featuredImageUrl aan de samenvatting werd
  // toegevoegd. Vercels datacache blijft over deploys heen bestaan, dus zonder
  // nieuwe sleutel bleef de lijstpagina een uur lang oude samenvattingen
  // serveren (zonder Blob-URL) en viel hij terug op /api/blog-image.
  // Verhoog dit nummer bij elke wijziging aan de vorm van de samenvatting.
  ["blog-post-summaries-v2"],
  { tags: [BLOG_CACHE_TAG], revalidate: 3600 }
);

// Get a single post by slug and language, with English fallback
const getPostBySlugCached = unstable_cache(
  async (
    slug: string,
    language: string = "en"
  ): Promise<BlogPost | null> => {
  const db = getDb();

  // Try requested language first
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.slug, slug),
        eq(blogPosts.language, language),
        eq(blogPosts.published, true)
      )
    )
    .limit(1);

  if (post) return post;

  // Fallback to English if no translation exists
  if (language !== "en") {
    const [enPost] = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.slug, slug),
          eq(blogPosts.language, "en"),
          eq(blogPosts.published, true)
        )
      )
      .limit(1);

    return enPost ?? null;
  }

  return null;
  },
  ["blog-post-by-slug"],
  { tags: [BLOG_CACHE_TAG], revalidate: 3600 }
);

// unstable_cache serialiseert het resultaat naar JSON en terug, waardoor
// Date-velden (publishedAt/createdAt/updatedAt) STRINGS worden bij een
// cache-hit. De blog-detailpagina roept .getMonth()/.toISOString() op die
// velden aan en crashte daardoor met een 500. Rehydrateer de datums terug
// naar Date na de cache.
export async function getPostBySlug(
  slug: string,
  language: string = "en",
): Promise<BlogPost | null> {
  const post = await getPostBySlugCached(slug, language);
  if (!post) return null;
  return {
    ...post,
    createdAt: post.createdAt ? new Date(post.createdAt) : post.createdAt,
    updatedAt: post.updatedAt ? new Date(post.updatedAt) : post.updatedAt,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : post.publishedAt,
  };
}

// Get a post by ID (any status)
export async function getPostById(id: string): Promise<BlogPost | null> {
  const db = getDb();
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);
  return post ?? null;
}

// Get a post by slug regardless of published status (for admin/preview)
export async function getPostBySlugAdmin(
  slug: string,
  language: string = "en"
): Promise<BlogPost | null> {
  const db = getDb();

  const [post] = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.language, language)))
    .limit(1);

  return post ?? null;
}

// Create a new blog post
export async function createPost(
  data: Omit<NewBlogPost, "id" | "createdAt" | "updatedAt">
): Promise<BlogPost> {
  const db = getDb();

  const [post] = await db
    .insert(blogPosts)
    .values(data)
    .returning();

  revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  return post;
}

// Update an existing blog post
export async function updatePost(
  id: string,
  data: Partial<Omit<NewBlogPost, "id" | "createdAt">>
): Promise<BlogPost> {
  const db = getDb();

  const [post] = await db
    .update(blogPosts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(blogPosts.id, id))
    .returning();

  revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  return post;
}

// Publish a post
export async function publishPost(id: string): Promise<BlogPost> {
  return updatePost(id, {
    published: true,
    publishedAt: new Date(),
  });
}

// Unpublish a post
export async function unpublishPost(id: string): Promise<BlogPost> {
  return updatePost(id, {
    published: false,
    publishedAt: null,
  });
}

// Get all published post slugs (for sitemap generation)
export async function getAllPublishedSlugs(): Promise<
  Array<{ slug: string; language: string; updatedAt: Date }>
> {
  const db = getDb();

  return db
    .select({
      slug: blogPosts.slug,
      language: blogPosts.language,
      updatedAt: blogPosts.updatedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(asc(blogPosts.slug));
}

// Get total published post count
export async function getPublishedPostCount(): Promise<number> {
  const db = getDb();
  const [result] = await db
    .select({ count: count() })
    .from(blogPosts)
    .where(eq(blogPosts.published, true));
  return result?.count ?? 0;
}
