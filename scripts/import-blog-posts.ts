/**
 * Import markdown blog posts from src/content/blog/ into the Neon PostgreSQL database.
 * Converts markdown to HTML before inserting (the blog template renders HTML).
 *
 * Usage: npx tsx scripts/import-blog-posts.ts
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import { marked } from "marked";

dotenv.config({ path: ".env.local" });

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

interface Frontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  description: string;
  tags: string[];
  [key: string]: unknown;
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("No frontmatter found");

  const fm: Record<string, unknown> = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (value.startsWith("[")) {
      try {
        fm[key] = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        fm[key] = value;
      }
    } else {
      fm[key] = value;
    }
  }

  return {
    frontmatter: fm as unknown as Frontmatter,
    body: match[2].trim(),
  };
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL not set in .env.local");
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith(".md"));
  console.log(`Found ${files.length} markdown files to import\n`);

  let imported = 0;
  let updated = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");

    try {
      const { frontmatter, body } = parseFrontmatter(raw);
      const slug = frontmatter.slug || file.replace(".md", "");

      // Convert markdown to HTML
      const htmlContent = await marked(body);

      // Check if post exists
      const existing = await db
        .select()
        .from(schema.blogPosts)
        .where(and(eq(schema.blogPosts.slug, slug), eq(schema.blogPosts.language, "en")));

      const postData = {
        slug,
        language: "en",
        title: frontmatter.title || slug,
        excerpt: frontmatter.description || "",
        content: htmlContent,
        metaTitle: frontmatter.title,
        metaDescription: frontmatter.description,
        category: frontmatter.category || "guide",
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        published: true,
        publishedAt: new Date(frontmatter.date || Date.now()),
        updatedAt: new Date(),
      };

      if (existing.length > 0) {
        await db
          .update(schema.blogPosts)
          .set(postData)
          .where(and(eq(schema.blogPosts.slug, slug), eq(schema.blogPosts.language, "en")));
        console.log(`  ✅ Updated: ${slug} (${body.split(/\s+/).length}w → HTML)`);
        updated++;
      } else {
        await db.insert(schema.blogPosts).values({
          ...postData,
          createdAt: new Date(),
        });
        console.log(`  ✅ Imported: ${slug} (${body.split(/\s+/).length}w → HTML)`);
        imported++;
      }
    } catch (err) {
      console.log(`  ❌ Failed: ${file} — ${(err as Error).message}`);
      failed++;
    }
  }

  console.log(`\nDone! Imported: ${imported}, Updated: ${updated}, Failed: ${failed}`);
}

main().catch(console.error);
