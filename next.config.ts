import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
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
