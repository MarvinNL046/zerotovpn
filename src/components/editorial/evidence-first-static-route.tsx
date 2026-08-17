import {
  EvidenceFirstRoutePage,
  type EvidenceFirstRouteKind,
} from "@/components/editorial/evidence-first-route-page";
import { getEvidenceFirstStaticRouteCopy } from "@/data/evidence-first-static-routes";

type EvidenceFirstStaticRouteProps = {
  locale: string;
  path: string;
  kind: EvidenceFirstRouteKind;
  sectionHref: string;
};

export function EvidenceFirstStaticRoute({
  locale,
  path,
  kind,
  sectionHref,
}: EvidenceFirstStaticRouteProps) {
  const copy = getEvidenceFirstStaticRouteCopy(path, locale);

  return (
    <EvidenceFirstRoutePage
      locale={locale}
      kind={kind}
      title={copy.title}
      description={copy.description}
      subject={copy.subject}
      sectionHref={sectionHref}
      sectionLabel={copy.sectionLabel}
    />
  );
}
