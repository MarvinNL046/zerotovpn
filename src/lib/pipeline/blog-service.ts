import { eq, and, desc, asc, count } from "drizzle-orm";
import { getDb, blogPosts, type BlogPost, type NewBlogPost } from "@/lib/db";

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

// Get a single post by slug and language, with English fallback
export async function getPostBySlug(
  slug: string,
  language: string = "en"
): Promise<BlogPost | null> {
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
