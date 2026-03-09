import { neon } from '@neondatabase/serverless';
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'fs';

const DATABASE_URL = readFileSync('.env.local', 'utf-8')
  .split('\n')
  .find(l => l.startsWith('DATABASE_URL'))
  .match(/"(.+)"/)[1];

const sql = neon(DATABASE_URL);
const ALL_LOCALES = ['en', 'nl', 'de', 'es', 'fr', 'zh', 'ja', 'ko', 'th'];
const LOCALE_PRIORITY = { nl: 1, de: 2, es: 3, fr: 4, zh: 5, ja: 6, ko: 7, th: 8 };

async function main() {
  const queue = [];

  // 1. Best-of pages with missing translations
  const bestDir = 'src/app/[locale]/best';
  const bestPages = readdirSync(bestDir).filter(f => {
    return existsSync(`${bestDir}/${f}/page.tsx`) && f !== '[slug]';
  });

  for (const page of bestPages) {
    const content = readFileSync(`${bestDir}/${page}/page.tsx`, 'utf-8');
    for (const locale of ALL_LOCALES) {
      if (locale === 'en') continue;
      // Check for locale key in content object - look for patterns like `nl:` or `"nl":`
      const patterns = [
        `  ${locale}:`,
        `"${locale}":`,
        `'${locale}':`,
        `\t${locale}:`,
      ];
      const hasLocale = patterns.some(p => content.includes(p));
      if (!hasLocale) {
        queue.push({
          id: `best-page-${page}-${locale}`,
          type: 'best-page',
          file: `src/app/[locale]/best/${page}/page.tsx`,
          page,
          locale,
          status: 'pending',
          priority: LOCALE_PRIORITY[locale],
        });
      }
    }
  }

  // 2. Blog posts missing in other languages
  const posts = await sql`SELECT slug, language, title, excerpt, content, category, tags FROM "BlogPost" WHERE language = 'en' ORDER BY slug`;

  for (const post of posts) {
    const existingLangs = await sql`SELECT language FROM "BlogPost" WHERE slug = ${post.slug}`;
    const existingSet = new Set(existingLangs.map(r => r.language));

    for (const locale of ALL_LOCALES) {
      if (locale === 'en') continue;
      if (existingSet.has(locale)) continue;
      queue.push({
        id: `blog-post-${post.slug}-${locale}`,
        type: 'blog-post',
        slug: post.slug,
        locale,
        enTitle: post.title,
        status: 'pending',
        priority: LOCALE_PRIORITY[locale],
      });
    }
  }

  // 3. Review FAQ translation (single item — modifies the review page template)
  queue.push({
    id: 'review-faq-translations',
    type: 'review-faq',
    file: 'src/app/[locale]/reviews/[slug]/page.tsx',
    locale: 'all',
    status: 'pending',
    priority: 0, // highest priority
  });

  // Sort by priority then type
  queue.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return a.id.localeCompare(b.id);
  });

  const result = {
    locales: ALL_LOCALES.filter(l => l !== 'en'),
    stats: {
      total: queue.length,
      completed: 0,
      inProgress: 0,
    },
    queue,
  };

  writeFileSync('data/translation-queue.json', JSON.stringify(result, null, 2));
  console.log(`Queue generated: ${queue.length} items`);
  console.log(`  - best-page: ${queue.filter(q => q.type === 'best-page').length}`);
  console.log(`  - blog-post: ${queue.filter(q => q.type === 'blog-post').length}`);
  console.log(`  - review-faq: ${queue.filter(q => q.type === 'review-faq').length}`);
  console.log(`By locale:`);
  for (const locale of ALL_LOCALES.filter(l => l !== 'en')) {
    const count = queue.filter(q => q.locale === locale || q.locale === 'all').length;
    console.log(`  ${locale}: ${count}`);
  }
}

main();
