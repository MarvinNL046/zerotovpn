import { Eye, GitCompareArrows, ShieldCheck } from "lucide-react";
import { EditorialQuickPickCard } from "@/components/editorial/best-vpn-editorial-template";
import type { VpnData } from "@/lib/vpn-data-layer";

interface IranEditorialQuickPicksProps {
  vpns: VpnData[];
  heading?: string;
  description?: string;
  eyebrow?: string;
}

const shortlist = [
  {
    slug: "nordvpn",
    label: "Evaluate first",
    description:
      "Compare its documented obfuscated-server setup, supported apps and current terms.",
    tone: "gold" as const,
    icon: <ShieldCheck className="mr-1 h-3.5 w-3.5" aria-hidden="true" />,
  },
  {
    slug: "surfshark",
    label: "Alternative",
    description:
      "Compare its current restricted-network documentation, supported apps and terms.",
    tone: "green" as const,
    icon: <GitCompareArrows className="mr-1 h-3.5 w-3.5" aria-hidden="true" />,
  },
  {
    slug: "protonvpn",
    label: "Stealth option",
    description:
      "Compare its documented Stealth protocol, supported apps and current terms.",
    tone: "blue" as const,
    icon: <Eye className="mr-1 h-3.5 w-3.5" aria-hidden="true" />,
  },
];

/** Contextual commercial shortlist; deliberately avoids claiming current Iran connectivity. */
export function IranEditorialQuickPicks({
  vpns,
  heading = "Start with documented options",
  description = "These cards link to provider websites. Commission links and official provider links are labelled separately; neither is proof that a service currently connects from Iran. Verify the live documentation and your own network before relying on one.",
  eyebrow = "Shortlist to evaluate",
}: IranEditorialQuickPicksProps) {
  const picks = shortlist
    .map((item) => ({
      ...item,
      vpn: vpns.find((vpn) => vpn.slug === item.slug),
    }))
    .filter((item): item is typeof item & { vpn: VpnData } =>
      Boolean(item.vpn),
    );

  if (!picks.length) return null;

  return (
    <section
      id="quick-picks"
      aria-labelledby="shortlist-heading"
      className="container max-w-4xl pb-4"
    >
      <div className="rounded-2xl border bg-muted/30 p-5 sm:p-6">
        <div className="mb-5 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {eyebrow}
          </p>
          <h2 id="shortlist-heading" className="mt-2 text-2xl font-bold">
            {heading}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {picks.map((pick) => {
            const isCommissionLink = Boolean(pick.vpn.affiliateUrl);

            return (
              <div key={pick.vpn.slug} className="flex flex-col gap-2">
                <EditorialQuickPickCard
                  vpn={{
                    ...pick.vpn,
                    shortDescription: pick.description,
                  }}
                  label={pick.label}
                  tone={pick.tone}
                  icon={pick.icon}
                />
                <p
                  className="text-center text-xs font-semibold text-muted-foreground"
                  data-provider-link-status={
                    isCommissionLink ? "commission" : "official"
                  }
                >
                  {isCommissionLink
                    ? "Commission link"
                    : "Official provider link"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
