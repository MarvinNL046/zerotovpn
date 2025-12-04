import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - Static files (images, etc.)
  // - Admin routes (separate from i18n)
  // - Handler routes (Stack Auth)
  matcher: ["/((?!api|admin|handler|_next|_vercel|.*\\..*).*)"],
};
