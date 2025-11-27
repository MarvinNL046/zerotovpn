import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Enable static exports for Netlify
  // output: "export", // Uncomment for static export

  // Image optimization
  images: {
    unoptimized: true, // For Netlify static hosting
  },
};

export default withNextIntl(nextConfig);
