import { ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProviderReviewEvidenceItem {
  question: string;
  evidence: string;
  limit: string;
}

interface OfficialProviderCtaProps {
  href: string;
  providerName: string;
  label: string;
}

/** Keeps the non-commercial status visible beside the outbound provider CTA. */
export function OfficialProviderCta({
  href,
  providerName,
  label,
}: OfficialProviderCtaProps) {
  return (
    <div className="mt-4 w-full">
      <aside
        className="rounded-lg border border-border bg-background/80 p-3 text-left"
        aria-label="Official provider link notice"
      >
        <div className="flex items-start gap-2.5">
          <ShieldCheck
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs font-semibold text-foreground">
              No paid provider link on this review
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              This button opens {providerName}&apos;s official website. It is
              not a sponsored or affiliate link.
            </p>
          </div>
        </div>
      </aside>
      <Button
        asChild
        className="mt-3 h-auto min-h-11 w-full whitespace-normal px-4 py-3 text-center"
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}

interface ProviderReviewEvidenceProps {
  caption: string;
  evidenceLabel: string;
  items: readonly ProviderReviewEvidenceItem[];
}

/**
 * A readable evidence matrix at desktop widths and complete stacked cards on
 * narrow screens. Mobile readers never have to discover a clipped third
 * column by horizontal scrolling.
 */
export function ProviderReviewEvidence({
  caption,
  evidenceLabel,
  items,
}: ProviderReviewEvidenceProps) {
  return (
    <>
      <div className="mt-6 grid gap-4 md:hidden" aria-label={caption}>
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl border bg-card p-4"
          >
            <h3 className="font-semibold text-foreground">{item.question}</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {evidenceLabel}
                </dt>
                <dd className="mt-1 leading-relaxed text-muted-foreground">
                  {item.evidence}
                </dd>
              </div>
              <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Limit to keep in mind
                </dt>
                <dd className="mt-1 leading-relaxed text-muted-foreground">
                  {item.limit}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-xl border md:block">
        <table className="w-full table-fixed text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-muted/60">
            <tr>
              <th scope="col" className="w-1/5 p-4">
                Question
              </th>
              <th scope="col" className="w-2/5 p-4">
                {evidenceLabel}
              </th>
              <th scope="col" className="w-2/5 p-4">
                Limit to keep in mind
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.question} className="border-t align-top">
                <th scope="row" className="p-4 font-semibold">
                  {item.question}
                </th>
                <td className="p-4 leading-relaxed text-muted-foreground">
                  {item.evidence}
                </td>
                <td className="p-4 leading-relaxed text-muted-foreground">
                  {item.limit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
