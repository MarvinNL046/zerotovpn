// Blogcontent komt sinds de Neon-uitfasering uit statische bestanden in het
// repo: src/data/posts/index.json (samenvattingen per locale) en
// src/data/posts/<locale>/<slug>.json (volledige posts, alleen published).
// Nieuwe of gewijzigde posts gaan via een commit + deploy. De oude
// unstable_cache-laag is overbodig: er is geen database meer om te ontzien.
import fs from "fs/promises";
import path from "path";
import postIndex from "@/data/posts/index.json";
import {
  iranVpnEditorialContent,
  iranVpnEditorialExcerpt,
  iranVpnEditorialTitle,
  iranVpnEditorialUpdatedAt,
} from "@/data/editorial/iran-vpn-2026";
import {
  telegramVpnEditorialContent,
  telegramVpnEditorialExcerpt,
  telegramVpnEditorialTitle,
  telegramVpnEditorialUpdatedAt,
} from "@/data/editorial/telegram-vpn-2026";
import {
  connectionDropsEditorialContent,
  connectionDropsEditorialExcerpt,
  connectionDropsEditorialTitle,
  connectionDropsEditorialUpdatedAt,
} from "@/data/editorial/connection-drops-2026";
import {
  serverLocationEditorialContent,
  serverLocationEditorialExcerpt,
  serverLocationEditorialTitle,
  serverLocationEditorialUpdatedAt,
} from "@/data/editorial/server-location-2026";
import {
  ispPrivacyEditorialContent,
  ispPrivacyEditorialExcerpt,
  ispPrivacyEditorialTitle,
  ispPrivacyEditorialUpdatedAt,
} from "@/data/editorial/isp-privacy-2026";
import {
  braveVpnEditorialContent,
  braveVpnEditorialExcerpt,
  braveVpnEditorialTitle,
  braveVpnEditorialUpdatedAt,
} from "@/data/editorial/brave-vpn-2026";

const IRAN_EDITORIAL_SLUG = "best-vpn-for-iran-2026-bypass-internet-censorship";
const TELEGRAM_EDITORIAL_SLUG = "best-vpn-for-telegram-2026";
const CONNECTION_DROPS_EDITORIAL_SLUG = "vpn-connection-drops-why-disconnects-how-to-fix-2026";
const SERVER_LOCATION_EDITORIAL_SLUG = "best-country-for-vpn-server-location-2026";
const ISP_PRIVACY_EDITORIAL_SLUG = "can-vpn-hide-from-isp";
const BRAVE_VPN_EDITORIAL_SLUG = "is-brave-vpn-free-2026";

// Legacy deal/coupon content is not a compliant commercial surface: it contains
// unassigned coupon language and stale promotional prices. Keep the records for
// audit history, but never render or include these slugs in the published corpus;
// next.config.ts sends the old URLs to the evidence-led cheap-VPN pillar.
const BLOCKED_PUBLISHED_SLUGS = new Set([
  "vpn-price-comparison-best-deals",
  "vpn-black-friday-2026",
]);

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

const EDITORIAL_SUMMARIES: Record<string, { title: string; excerpt: string; updatedAt: string }> = {
  [IRAN_EDITORIAL_SLUG]: {
    title: iranVpnEditorialTitle,
    excerpt: iranVpnEditorialExcerpt,
    updatedAt: iranVpnEditorialUpdatedAt,
  },
  [TELEGRAM_EDITORIAL_SLUG]: {
    title: telegramVpnEditorialTitle,
    excerpt: telegramVpnEditorialExcerpt,
    updatedAt: telegramVpnEditorialUpdatedAt,
  },
  [CONNECTION_DROPS_EDITORIAL_SLUG]: {
    title: connectionDropsEditorialTitle,
    excerpt: connectionDropsEditorialExcerpt,
    updatedAt: connectionDropsEditorialUpdatedAt,
  },
  [SERVER_LOCATION_EDITORIAL_SLUG]: {
    title: serverLocationEditorialTitle,
    excerpt: serverLocationEditorialExcerpt,
    updatedAt: serverLocationEditorialUpdatedAt,
  },
  [ISP_PRIVACY_EDITORIAL_SLUG]: {
    title: ispPrivacyEditorialTitle,
    excerpt: ispPrivacyEditorialExcerpt,
    updatedAt: ispPrivacyEditorialUpdatedAt,
  },
  [BRAVE_VPN_EDITORIAL_SLUG]: {
    title: braveVpnEditorialTitle,
    excerpt: braveVpnEditorialExcerpt,
    updatedAt: braveVpnEditorialUpdatedAt,
  },
};

function toSummary(raw: RawSummary): BlogPostSummary {
  const editorial = raw.language === "en" ? EDITORIAL_SUMMARIES[raw.slug] : undefined;
  return {
    id: raw.id,
    slug: raw.slug,
    language: raw.language,
    title: editorial?.title ?? raw.title,
    excerpt: editorial?.excerpt ?? raw.excerpt ?? "",
    category: raw.category ?? "",
    tags: raw.tags,
    published: true,
    publishedAt: raw.publishedAt ? new Date(raw.publishedAt) : null,
    createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(0),
    updatedAt: editorial
      ? new Date(editorial.updatedAt)
      : raw.updatedAt
        ? new Date(raw.updatedAt)
        : null,
    hasFeaturedImage: raw.hasFeaturedImage,
    featuredImageUrl: raw.featuredImageUrl,
  };
}

// Samenvattingen voor een taal (nieuwste eerst — index.json is al gesorteerd).
export async function getAllPublishedPostSummaries(
  language: string = "en",
  category?: string,
): Promise<BlogPostSummary[]> {
  const rows = (INDEX[language] ?? []).filter(
    (r) => !BLOCKED_PUBLISHED_SLUGS.has(r.slug),
  );
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
  if (BLOCKED_PUBLISHED_SLUGS.has(slug)) return null;
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
    const isIranEditorial = language === "en" && slug === IRAN_EDITORIAL_SLUG;
    const isTelegramEditorial = language === "en" && slug === TELEGRAM_EDITORIAL_SLUG;
    const isConnectionDropsEditorial = language === "en" && slug === CONNECTION_DROPS_EDITORIAL_SLUG;
    const isServerLocationEditorial = language === "en" && slug === SERVER_LOCATION_EDITORIAL_SLUG;
    const isIspPrivacyEditorial = language === "en" && slug === ISP_PRIVACY_EDITORIAL_SLUG;
    const isBraveVpnEditorial = language === "en" && slug === BRAVE_VPN_EDITORIAL_SLUG;
    const editorial = isIranEditorial
      ? { title: iranVpnEditorialTitle, excerpt: iranVpnEditorialExcerpt, content: iranVpnEditorialContent, updatedAt: iranVpnEditorialUpdatedAt }
      : isTelegramEditorial
        ? { title: telegramVpnEditorialTitle, excerpt: telegramVpnEditorialExcerpt, content: telegramVpnEditorialContent, updatedAt: telegramVpnEditorialUpdatedAt }
        : isConnectionDropsEditorial
          ? { title: connectionDropsEditorialTitle, excerpt: connectionDropsEditorialExcerpt, content: connectionDropsEditorialContent, updatedAt: connectionDropsEditorialUpdatedAt }
          : isServerLocationEditorial
            ? { title: serverLocationEditorialTitle, excerpt: serverLocationEditorialExcerpt, content: serverLocationEditorialContent, updatedAt: serverLocationEditorialUpdatedAt }
            : isIspPrivacyEditorial
              ? { title: ispPrivacyEditorialTitle, excerpt: ispPrivacyEditorialExcerpt, content: ispPrivacyEditorialContent, updatedAt: ispPrivacyEditorialUpdatedAt }
              : isBraveVpnEditorial
                ? { title: braveVpnEditorialTitle, excerpt: braveVpnEditorialExcerpt, content: braveVpnEditorialContent, updatedAt: braveVpnEditorialUpdatedAt }
                : null;
    return {
      id: p.id,
      slug: p.slug,
      language: p.language,
      title: editorial?.title ?? p.title,
      excerpt: editorial?.excerpt ?? p.excerpt ?? "",
      content: editorial?.content ?? p.content ?? "",
      metaTitle: editorial?.title ?? p.metaTitle ?? null,
      metaDescription: editorial?.excerpt ?? p.metaDescription ?? null,
      category: p.category ?? "",
      tags: p.tags ?? null,
      published: true,
      publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
      createdAt: p.createdAt ? new Date(p.createdAt) : new Date(0),
      updatedAt: editorial
        ? new Date(editorial.updatedAt)
        : p.updatedAt
          ? new Date(p.updatedAt)
          : new Date(0),
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
      if (BLOCKED_PUBLISHED_SLUGS.has(r.slug)) continue;
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
