// Blogcontent komt sinds de Neon-uitfasering uit statische bestanden in het
// repo: src/data/posts/index.json (samenvattingen per locale) en
// src/data/posts/<locale>/<slug>.json (volledige posts, alleen published).
// Nieuwe of gewijzigde posts gaan via een commit + deploy. De oude
// unstable_cache-laag is overbodig: er is geen database meer om te ontzien.
import fs from "fs/promises";
import path from "path";
import postIndex from "@/data/posts/index.json";

// Vorm van een volledige post zoals de detailpagina hem gebruikt. De oude
// drizzle-kolommen die alleen de pipeline nodig had (sourceData/aiPrompt/
// aiModel/featuredImage-base64) bestaan niet meer.
export interface BlogPost {
  id: string;
  slug: string;
  language: string;
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  category: string;
  tags: string[] | null;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  featuredImage: string | null; // altijd null — legacy base64-kolom is vervallen
  featuredImageUrl: string | null;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  language: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[] | null;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  hasFeaturedImage: boolean;
  featuredImageUrl: string | null;
}

// index.json: { [locale]: RawSummary[] } — datums als ISO-strings.
interface RawSummary {
  id: string;
  slug: string;
  language: string;
  title: string;
  excerpt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  category: string;
  tags: string[] | null;
  publishedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  featuredImageUrl: string | null;
  hasFeaturedImage: boolean;
}

const INDEX = postIndex as unknown as Record<string, RawSummary[]>;
const POSTS_DIR = path.join(process.cwd(), "src", "data", "posts");

function toSummary(raw: RawSummary): BlogPostSummary {
  return {
    id: raw.id,
    slug: raw.slug,
    language: raw.language,
    title: raw.title,
    excerpt: raw.excerpt ?? "",
    category: raw.category ?? "",
    tags: raw.tags,
    published: true,
    publishedAt: raw.publishedAt ? new Date(raw.publishedAt) : null,
    createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(0),
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : null,
    hasFeaturedImage: raw.hasFeaturedImage,
    featuredImageUrl: raw.featuredImageUrl,
  };
}

// Samenvattingen voor een taal (nieuwste eerst — index.json is al gesorteerd).
export async function getAllPublishedPostSummaries(
  language: string = "en",
  category?: string,
): Promise<BlogPostSummary[]> {
  const rows = INDEX[language] ?? [];
  const filtered = category ? rows.filter((r) => r.category === category) : rows;
  return filtered.map(toSummary);
}

// Zelfde naam als de oude gecachte variant zodat de lijstpagina niet wijzigt.
export async function getCachedPostSummaries(
  language: string,
): Promise<BlogPostSummary[]> {
  return getAllPublishedPostSummaries(language);
}

// Volledige post op slug + taal, met Engelse fallback (zoals voorheen).
export async function getPostBySlug(
  slug: string,
  language: string = "en",
): Promise<BlogPost | null> {
  const post = await readPostFile(language, slug);
  if (post) return post;
  if (language !== "en") return readPostFile("en", slug);
  return null;
}

async function readPostFile(
  language: string,
  slug: string,
): Promise<BlogPost | null> {
  // Slugs komen uit URL-segmenten; weiger padtrucs vóór het fs-pad.
  if (!/^[a-z0-9-]+$/i.test(slug) || !/^[a-z-]+$/i.test(language)) return null;
  try {
    const raw = await fs.readFile(
      path.join(POSTS_DIR, language, `${slug}.json`),
      "utf8",
    );
    const p = JSON.parse(raw);
    return {
      id: p.id,
      slug: p.slug,
      language: p.language,
      title: p.title,
      excerpt: p.excerpt ?? "",
      content: p.content ?? "",
      metaTitle: p.metaTitle ?? null,
      metaDescription: p.metaDescription ?? null,
      category: p.category ?? "",
      tags: p.tags ?? null,
      published: true,
      publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
      createdAt: p.createdAt ? new Date(p.createdAt) : new Date(0),
      updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(0),
      featuredImage: null,
      featuredImageUrl: p.featuredImageUrl ?? null,
    };
  } catch {
    return null;
  }
}

// Alle published slugs (sitemap + generateStaticParams).
export async function getAllPublishedSlugs(): Promise<
  Array<{ slug: string; language: string; updatedAt: Date }>
> {
  const out: Array<{ slug: string; language: string; updatedAt: Date }> = [];
  for (const rows of Object.values(INDEX)) {
    for (const r of rows) {
      out.push({
        slug: r.slug,
        language: r.language,
        updatedAt: r.updatedAt ? new Date(r.updatedAt) : new Date(0),
      });
    }
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}

// Totaal aantal published posts.
export async function getPublishedPostCount(): Promise<number> {
  return Object.values(INDEX).reduce((s, rows) => s + rows.length, 0);
}
