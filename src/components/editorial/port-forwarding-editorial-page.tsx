import { AlertTriangle, CheckCircle, Link2, ShieldCheck, XCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnBySlug } from "@/lib/vpn-data";
import { getVpnAffiliateUrl, type VpnLinkSlug } from "@/lib/vpn-links";
import { PORT_FORWARDING, type PortForwardingStatus } from "@/lib/vpn-port-forwarding";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const portForwardingEditorialTitle = "Best VPNs With Port Forwarding: Current Provider Comparison";
export const portForwardingEditorialDescription = "Compare current VPN port-forwarding support, plan limits, platform boundaries and security trade-offs using provider documentation checked on 13 August 2026.";

const statusLabel: Record<PortForwardingStatus, string> = { ja: "Included", betaald: "Paid add-on", verwijderd: "Removed", nee: "Not offered" };
const statusIcon = (status: PortForwardingStatus) => status === "ja" ? CheckCircle : status === "verwijderd" ? AlertTriangle : status === "nee" ? XCircle : ShieldCheck;
const faqs = [
  { question: "Which VPNs currently support port forwarding?", answer: "The shortlist on this page records Proton VPN and Private Internet Access as included features, and PureVPN as a paid add-on, based on the linked provider documentation. Availability can depend on plan, location, app and protocol, so verify the current setup page before subscribing." },
  { question: "Does Proton VPN offer port forwarding?", answer: "Yes on paid plans and P2P servers. Proton's current support page says the active port is assigned by the server and can change after reconnecting; it is not a permanent number you choose." },
  { question: "Does NordVPN offer port forwarding?", answer: "NordVPN's current support page says it does not offer port forwarding. A regular VPN connection and an inbound forwarded port are different features." },
  { question: "Do I need port forwarding for torrenting?", answer: "No. Torrenting can work without an inbound port, but port forwarding can improve reachability to peers and is more relevant for thinly seeded files or services that need incoming connections." },
  { question: "Is VPN port forwarding a security risk?", answer: "Opening a port increases the attack surface of the application listening on it. Keep that application patched, expose only the port you need, and close the rule when the service is not required." },
  { question: "Does a static IP automatically include port forwarding?", answer: "No. A predictable address and an inbound forwarded port are separate provider features. Check that the provider documents both if your use case requires them." },
];

const pickCopy: Record<string, string> = {
  protonvpn: "Paid-plan support on P2P servers with a current Windows, macOS or Linux workflow. The active port is assigned and may change after reconnecting.",
  "private-internet-access": "A useful comparison point with one assigned port. Availability depends on current locations and client support, so check the provider's setup documentation.",
  purevpn: "Up to sixteen ports are advertised as a paid add-on. Confirm the extra price, eligible servers and current platform support before purchase.",
};

function affiliateFor(slug: string) {
  if (slug !== "protonvpn" && slug !== "private-internet-access") return "";
  return getVpnAffiliateUrl(slug as VpnLinkSlug);
}

export function PortForwardingEditorialPage() {
  const providers = PORT_FORWARDING.map((record) => ({ record, vpn: getVpnBySlug(record.slug) })).filter((item) => item.vpn);
  const picks = ["protonvpn", "private-internet-access", "purevpn"].map((slug) => ({ record: PORT_FORWARDING.find((item) => item.slug === slug), vpn: getVpnBySlug(slug) })).filter((item) => item.record && item.vpn);

  return (
    <BestVpnEditorialTemplate brief={editorialContentBriefs.portForwarding} navigation={[{ href: "#quick-picks", label: "Verdict" }, { href: "#evidence", label: "Evidence" }, { href: "#comparison", label: "Comparison" }, { href: "#alternatives", label: "Alternatives" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Sources" }]}> 
      <div className="container pt-6"><BreadcrumbSchema items={[{ name: "Best VPNs", href: "/best/best-vpn" }, { name: "Port forwarding", href: "/best/vpn-port-forwarding" }]} /></div>
      <main className="container max-w-5xl py-8 lg:py-12">
        <header className="mb-10 max-w-4xl"><p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Feature comparison checked at source</p><h1 className="text-4xl font-bold tracking-tight md:text-5xl">{portForwardingEditorialTitle}</h1><p className="mt-5 text-xl text-muted-foreground">{portForwardingEditorialDescription}</p><p className="mt-4 text-sm text-muted-foreground">Port forwarding is an inbound-network feature, not a synonym for a VPN protocol or a static IP. We separate documented support from plan-, server- and device-level limits.</p><AffiliateDisclosure variant="card" className="mt-5 max-w-3xl" /></header>

        <section id="quick-picks" className="scroll-mt-24"><div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8"><div className="flex items-start gap-4"><ShieldCheck className="mt-1 size-7 shrink-0 text-primary" aria-hidden="true" /><div><p className="text-sm font-semibold uppercase tracking-wide text-primary">Bottom line</p><h2 className="mt-2 text-3xl font-bold">Choose the feature you actually need</h2><p className="mt-3 text-muted-foreground">Proton VPN and Private Internet Access are the included-feature comparison points in this review; PureVPN documents a paid add-on. If you only need outbound privacy, a provider that does not forward ports may be the simpler and safer fit.</p></div></div></div></section>

        <section id="evidence" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">What port forwarding changes</h2><p className="mt-3 max-w-3xl text-muted-foreground">A VPN normally blocks unsolicited inbound traffic. Forwarding creates a controlled route to the application listening on one port. That can help with peer reachability, self-hosted services or game hosting, but it also makes the listening application the security boundary.</p><div className="mt-6 grid gap-4 md:grid-cols-3"><article className="rounded-xl border p-5"><h3 className="font-semibold">Useful for</h3><p className="mt-2 text-sm text-muted-foreground">P2P clients, self-hosted services and other workloads that need incoming connections.</p></article><article className="rounded-xl border p-5"><h3 className="font-semibold">Not required for</h3><p className="mt-2 text-sm text-muted-foreground">Ordinary browsing, streaming or most outbound VPN sessions.</p></article><article className="rounded-xl border p-5"><h3 className="font-semibold">Check first</h3><p className="mt-2 text-sm text-muted-foreground">Plan eligibility, server location, platform support, port allocation and refund terms.</p></article></div></section>

        <section id="comparison" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">Provider evidence matrix</h2><p className="mt-3 max-w-3xl text-muted-foreground">The status is a snapshot from provider documentation checked 13 August 2026. Open the source before making a purchase decision.</p><div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[900px] text-left text-sm"><caption className="sr-only">VPN port-forwarding provider evidence matrix</caption><thead className="bg-muted/60"><tr><th scope="col" className="p-4">Provider</th><th scope="col" className="p-4">Status</th><th scope="col" className="p-4">Documented limits</th><th scope="col" className="p-4">Source</th></tr></thead><tbody>{providers.map(({ record, vpn }) => { const Icon = statusIcon(record.status); return <tr key={record.slug} className="border-t"><th scope="row" className="p-4 font-semibold">{vpn!.name}</th><td className="p-4"><span className="inline-flex items-center gap-2"><Icon className="size-4" aria-hidden="true" />{statusLabel[record.status]}</span></td><td className="p-4">{record.details}{record.beperkingen ? ` ${record.beperkingen}` : ""}</td><td className="p-4"><a href={record.bron.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{record.bron.label}</a></td></tr>; })}</tbody></table></div></section>

        <section id="alternatives" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">Shortlist and current plan context</h2><p className="mt-3 max-w-3xl text-muted-foreground">These cards are comparison paths, not universal winners. Price links are tracked only where the provider has an approved centralized affiliate destination; PureVPN stays a first-party research link.</p><div className="mt-6 grid gap-5 md:grid-cols-3">{picks.map(({ vpn }) => { const affiliateUrl = affiliateFor(vpn!.slug); const price = vpn!.priceTwoYear || vpn!.priceYearly; return <article key={vpn!.slug} className="rounded-xl border bg-card p-5"><h3 className="text-xl font-semibold">{vpn!.name}</h3><p className="mt-3 text-sm text-muted-foreground">{pickCopy[vpn!.slug]}</p><p className="mt-4 text-sm font-semibold">From {affiliateUrl ? <AffiliateTextLink vpnId={vpn!.id} vpnName={vpn!.name} affiliateUrl={affiliateUrl} dataPriceLink className="text-primary underline">${price.toFixed(2)}/mo</AffiliateTextLink> : <span>${price.toFixed(2)}/mo</span>}</p>{affiliateUrl ? <AffiliateButton vpnId={vpn!.id} vpnName={vpn!.name} affiliateUrl={affiliateUrl} className="mt-5 w-full">Check {vpn!.name} plans</AffiliateButton> : <a href={vpn!.website} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold hover:bg-muted">Read {vpn!.name} terms</a>}</article>; })}</div></section>

        <section id="context" className="mt-16 scroll-mt-24"><div className="rounded-2xl border-2 border-amber-500/40 bg-amber-50/60 p-6 md:p-8"><div className="flex items-start gap-4"><AlertTriangle className="mt-1 size-6 shrink-0 text-amber-700" aria-hidden="true" /><div><h2 className="text-2xl font-bold">Why old lists mislead</h2><p className="mt-3 text-muted-foreground">Mullvad removed forwarded ports in 2023, and Proton&apos;s current implementation now assigns an active port rather than promising a permanent number. A page can be technically accurate about a provider and still be wrong for your plan, server or app version, so treat the source date and limits as part of the answer.</p></div></div></div></section>

        <section id="faq" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">Port forwarding FAQ</h2><div className="mt-5 space-y-5">{faqs.map((item) => <div key={item.question} className="rounded-xl border p-5"><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-muted-foreground">{item.answer}</p></div>)}</div><FAQSchema title="VPN port forwarding FAQ" faqs={faqs} /></section>

        <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8"><h2 className="text-2xl font-bold">Sources and next reads</h2><p className="mt-2 text-sm text-muted-foreground">Feature status comes from provider documentation linked in the matrix. DataForSEO informed the PAA and query coverage; it does not prove feature availability or conversion value.</p><ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2"><li><Link href="/best/vpn-torrenting" className="text-primary underline">Best VPNs for torrenting</Link></li><li><Link href="/best/vpn-gaming" className="text-primary underline">Best VPNs for gaming</Link></li><li><Link href="/guides/vpn-protocols-explained" className="text-primary underline">VPN protocols explained</Link></li><li><Link href="/methodology" className="text-primary underline">ZeroToVPN methodology</Link></li><li><Link href="/affiliate-disclosure" className="text-primary underline">Affiliate disclosure</Link></li><li><a href="https://protonvpn.com/support/port-forwarding" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />Proton VPN port-forwarding guide</a></li></ul></section>
        <p className="mt-6 text-sm"><Link href="/best/best-vpn" className="text-primary underline">See the main Best VPN comparison</Link></p>
      </main>
    </BestVpnEditorialTemplate>
  );
}
