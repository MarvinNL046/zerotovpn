# ZeroToVPN Translation Loop Prompt

## Usage
```
cd /home/marvin/Projecten/zerotovpn
/loop 5m Process the next pending translation job from data/translation-queue.json. Follow these rules EXACTLY:

## Step 1: Read Queue
Read data/translation-queue.json. Find the FIRST item with status "pending". If no pending items exist, report "All translations complete!" and stop.

## Step 2: Lock Item
Set the item's status to "in_progress" and write the file back immediately. This prevents duplicate work.

## Step 3: Translate Based on Type

### Type: "best-page"
- Read the source file (the "file" field)
- Find the `en:` content object (this is the English source)
- Translate ALL content to the target locale — titles, descriptions, badges, feature lists, FAQ questions AND answers, tips, statistics labels, everything
- Add the new locale key to the content object in the same file
- DO NOT translate: VPN names, URLs, technical terms (WireGuard, OpenVPN, AES-256), prices, numbers
- DO translate naturally — not word-for-word. Write as a native speaker would.
- Locale guide: nl=Dutch, de=German, es=Spanish, fr=French, zh=Simplified Chinese, ja=Japanese, ko=Korean, th=Thai

### Type: "blog-post"
- Read the English blog post from the database. Use this pattern:
```bash
cd /home/marvin/Projecten/zerotovpn && export DATABASE_URL=$(grep DATABASE_URL .env.local | cut -d'"' -f2) && node -e "
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
sql\`SELECT title, excerpt, content, category, tags, \"metaTitle\", \"metaDescription\", \"featuredImage\" FROM \"BlogPost\" WHERE slug = 'THE_SLUG' AND language = 'en'\`.then(r => console.log(JSON.stringify(r[0])));
"
```
- Translate title, excerpt, content (full HTML), metaTitle, metaDescription to the target locale
- DO NOT translate: HTML tags, URLs, VPN names, CSS classes, image paths, affiliate links
- Insert the translated post into the database:
```bash
cd /home/marvin/Projecten/zerotovpn && export DATABASE_URL=$(grep DATABASE_URL .env.local | cut -d'"' -f2) && node -e "
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
sql\`INSERT INTO \"BlogPost\" (id, slug, language, title, excerpt, content, category, tags, \"metaTitle\", \"metaDescription\", \"featuredImage\", published, \"publishedAt\", \"createdAt\", \"updatedAt\")
VALUES (gen_random_uuid(), 'THE_SLUG', 'THE_LOCALE', 'TRANSLATED_TITLE', 'TRANSLATED_EXCERPT', 'TRANSLATED_CONTENT', 'CATEGORY', ARRAY['tag1','tag2'], 'TRANSLATED_META_TITLE', 'TRANSLATED_META_DESC', 'IMAGE_URL', true, NOW(), NOW(), NOW())\`.then(() => console.log('Inserted'));
"
```

### Type: "review-faq"
- Read src/app/[locale]/reviews/[slug]/page.tsx
- Find the generateFaqs function
- Make it locale-aware: accept a locale parameter and return translated FAQ questions and answers for all 8 non-EN locales
- Use a content object pattern like the best-pages use: `const faqContent = { en: {...}, nl: {...}, ... }`
- Translate all FAQ questions AND answers naturally

## Step 4: Mark Complete
Update the item's status to "completed" in data/translation-queue.json. Update stats.completed count.

## Step 5: Commit
```bash
git add -A && git commit -m "translate: [type] [page/slug] to [LOCALE] ([completed]/[total])"
```

## Step 6: Report
Print: "✅ Translated [type] [page/slug] → [LOCALE] ([completed]/[total] done)"

## Rules
- ONE item per loop iteration — do not batch
- If an item has status "in_progress" for more than 10 minutes, treat it as failed and reset to "pending"
- Always translate ALL content, not just titles — descriptions, FAQs, tips, feature lists, everything
- Write natural translations as a native speaker would
- Never skip or partially translate
- If translation fails, set status back to "pending" and report the error
```
