import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl", "de", "es", "fr", "zh", "ja", "ko", "th"],
  defaultLocale: "en",
  localePrefix: "as-needed", // Don't show /en prefix for default locale
});

export type Locale = (typeof routing.locales)[number];
