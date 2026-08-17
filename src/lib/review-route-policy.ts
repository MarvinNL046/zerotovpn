import { INDEXABLE_REVIEW_LOCALES } from "@/lib/indexability";

export { INDEXABLE_REVIEW_LOCALES } from "@/lib/indexability";

export function getIndexableReviewLocales(
  slug: string,
): readonly string[] | undefined {
  return INDEXABLE_REVIEW_LOCALES[
    slug as keyof typeof INDEXABLE_REVIEW_LOCALES
  ];
}

export function isIndexableReviewRoute(slug: string, locale: string): boolean {
  return getIndexableReviewLocales(slug)?.includes(locale) ?? false;
}
