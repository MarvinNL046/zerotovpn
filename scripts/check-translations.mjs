import { neon } from '@neondatabase/serverless';
import { readFileSync, readdirSync, existsSync } from 'fs';

const DATABASE_URL = readFileSync('.env.local', 'utf-8')
  .split('\n')
  .find(l => l.startsWith('DATABASE_URL'))
  .match(/"(.+)"/)[1];

const sql = neon(DATABASE_URL);
const ALL_LOCALES = ['en', 'nl', 'de', 'es', 'fr', 'zh', 'ja', 'ko', 'th'];

async function main() {
  // 1. Blog posts from DB
  const posts = await sql`SELECT slug, language, title FROM "BlogPost" ORDER BY slug, language`;
  const blogBySlug = {};
  for (const p of posts) {
    if (!blogBySlug[p.slug]) blogBySlug[p.slug] = {};
    blogBySlug[p.slug][p.language] = p.title;
  }

  const blogQueue = [];
  for (const [slug, langs] of Object.entries(blogBySlug)) {
    if (!langs.en) continue; // Skip if no EN source
    for (const locale of ALL_LOCALES) {
      if (locale === 'en') continue;
      if (!langs[locale]) {
        blogQueue.push({ type: 'blog-post', slug, locale, enTitle: langs.en });
      }
    }
  }

  // 2. Best-of pages with missing inline translations
  const bestDir = 'src/app/[locale]/best';
  const bestPages = readdirSync(bestDir).filter(f => {
    const path = `${bestDir}/${f}/page.tsx`;
    return existsSync(path) && f !== '[slug]';
  });

  const pageQueue = [];
  for (const page of bestPages) {
    const content = readFileSync(`${bestDir}/${page}/page.tsx`, 'utf-8');
    for (const locale of ALL_LOCALES) {
      if (locale === 'en') continue;
      // Check if locale key exists in the content object
      const hasLocale = content.includes(`${locale}:`) || content.includes(`"${locale}":`);
      if (!hasLocale) {
        pageQueue.push({ type: 'best-page', page, locale });
      }
    }
  }

  // 3. Review FAQ (hardcoded EN)
  const reviewContent = readFileSync('src/app/[locale]/reviews/[slug]/page.tsx', 'utf-8');
  const hasFaqTranslation = reviewContent.includes('locale') && reviewContent.includes('generateFaqs');

  console.log(JSON.stringify({
    blogMissing: blogQueue.length,
    blogSample: blogQueue.slice(0, 10),
    pageMissing: pageQueue.length,
    pageQueue: pageQueue,
    reviewFaqTranslated: hasFaqTranslation,
    totalBlogSlugs: Object.keys(blogBySlug).length,
    blogLanguageCounts: Object.fromEntries(
      ALL_LOCALES.map(l => [l, posts.filter(p => p.language === l).length])
    )
  }, null, 2));
}

main();
