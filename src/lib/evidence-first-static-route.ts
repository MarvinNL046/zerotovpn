import { getEvidenceFirstStaticRouteCopy } from "@/data/evidence-first-static-routes";
import {
  createEvidenceFirstMetadata,
  createPublishedRouteMetadata,
} from "@/lib/evidence-first-route";

export function createStaticEvidenceFirstMetadata(
  path: string,
  locale: string,
) {
  const copy = getEvidenceFirstStaticRouteCopy(path, locale);
  return createEvidenceFirstMetadata({ locale, path, ...copy });
}

export function createStaticPublishedMetadata(path: string) {
  const copy = getEvidenceFirstStaticRouteCopy(path, "en");
  return createPublishedRouteMetadata({ path, ...copy });
}
