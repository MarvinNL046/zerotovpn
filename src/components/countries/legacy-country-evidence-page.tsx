import { EvidenceFirstRoutePage } from "@/components/editorial/evidence-first-route-page";
import { getLegacyCountryEvidenceContent } from "@/lib/legacy-country-evidence";

type LegacyCountryEvidencePageProps = {
  locale: string;
  slug: string;
  fallbackName: string;
};

export function LegacyCountryEvidencePage({
  locale,
  slug,
  fallbackName,
}: LegacyCountryEvidencePageProps) {
  const content = getLegacyCountryEvidenceContent(locale, slug, fallbackName);

  return (
    <EvidenceFirstRoutePage
      locale={locale}
      kind="country"
      title={content.title}
      description={content.description}
      subject={content.subject}
      sectionHref="/countries"
      sectionLabel={content.sectionLabel}
      notes={content.notes}
    />
  );
}
