import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// De oude contentpipeline plakte bij een slug-botsing een datum achter de slug
// en publiceerde hetzelfde artikel opnieuw: 69 slugs bleken 28 onderwerpen.
// Die duplicaten zijn verwijderd; deze tabel stuurt de oude URL's met een 301
// naar de behouden post. Gegenereerd, niet met de hand bijwerken.
const blogRedirects: Array<{
  source: string;
  destination: string;
  permanent: boolean;
}> = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "src/lib/blog-redirects.generated.json"),
    "utf8",
  ),
);

const nextConfig: NextConfig = {
  async redirects() {
    return blogRedirects;
  },
  images: {
    remotePatterns: [
      {
        // Uitgelichte afbeeldingen van blogposts staan in Vercel Blob.
        // Zonder deze regel weigert next/image het externe domein.
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  // Blogcontent leeft als JSON-bestanden in src/data (Neon is uitgefaseerd).
  // blog-service leest ze met fs; neem ze op in de serverless bundle zodat
  // ook niet-voorgerenderde slugs (dynamicParams) op Vercel blijven werken.
  outputFileTracingIncludes: {
    "/**": ["./src/data/posts/**/*"],
  },
};

export default withNextIntl(nextConfig);
