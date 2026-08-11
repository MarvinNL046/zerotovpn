import { Eye, GitCompareArrows, ShieldCheck } from "lucide-react";
import { EditorialQuickPickCard } from "@/components/editorial/best-vpn-editorial-template";
import type { VpnData } from "@/lib/vpn-data-layer";

interface IranEditorialQuickPicksProps {
  vpns: VpnData[];
}

const shortlist = [
  { slug: "nordvpn", label: "Evaluate first", tone: "gold" as const, icon: <ShieldCheck className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> },
  { slug: "surfshark", label: "Alternative", tone: "green" as const, icon: <GitCompareArrows className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> },
  { slug: "protonvpn", label: "Stealth option", tone: "blue" as const, icon: <Eye className="mr-1 h-3.5 w-3.5" aria-hidden="true" /> },
];

/** Contextual commercial shortlist; deliberately avoids claiming current Iran connectivity. */
export function IranEditorialQuickPicks({ vpns }: IranEditorialQuickPicksProps) {
  const picks = shortlist
    .map((item) => ({ ...item, vpn: vpns.find((vpn) => vpn.slug === item.slug) }))
    .filter((item): item is typeof item & { vpn: VpnData } => Boolean(item.vpn));

  if (!picks.length) return null;

  return (
    <section id="quick-picks" aria-labelledby="iran-shortlist" className="container max-w-4xl pb-4">
      <div className="rounded-2xl border bg-muted/30 p-5 sm:p-6">
        <div className="mb-5 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Shortlist to evaluate</p>
          <h2 id="iran-shortlist" className="mt-2 text-2xl font-bold">Start with documented options</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            These cards are contextual affiliate links to providers worth checking. They are not proof that any service currently connects from Iran; verify the live documentation and your own network before relying on one.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {picks.map((pick) => (
            <EditorialQuickPickCard key={pick.vpn.slug} vpn={pick.vpn} label={pick.label} tone={pick.tone} icon={pick.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
