import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { shouldNoindexPath } from "./lib/indexability";
import {
  getIndexableLocalesForPath,
  INDEXABILITY_LOCALES,
} from "./lib/indexability";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const shouldNoindex = shouldNoindexPath(request.nextUrl.pathname);
  const admittedLocales = getIndexableLocalesForPath(request.nextUrl.pathname);
  const hasLimitedManagedLocales =
    admittedLocales !== undefined &&
    admittedLocales.length !== INDEXABILITY_LOCALES.length;

  if (shouldNoindex) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  // These routes are fully localized only in English and Dutch. next-intl's
  // automatic Link header would otherwise advertise unsupported locales.
  if (shouldNoindex || hasLimitedManagedLocales) {
    response.headers.delete("Link");
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - Static files (images, etc.)
  // - Admin routes (separate from i18n)
  // - Handler routes (Stack Auth)
  matcher: [
    "/((?!api|admin|handler|_next|_vercel|opengraph-image|twitter-image|.*\\..*).*)",
  ],
};
