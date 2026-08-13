import { FileCheck, Link2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnById } from "@/lib/vpn-data";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const airvpnReviewTitle = "AirVPN Review 2026: Port Forwarding, Privacy Evidence and Usability";
export const airvpnReviewDescription = "An evidence-led AirVPN review covering port forwarding, open-source apps, no-logs assurance, streaming limits, platform support and the tests still worth running yourself.";

const faqs = [
  { question: "Is AirVPN safe to use in 2026?", answer: "AirVPN publishes strong protocol and Network Lock documentation, and its Eddie client is open source. That is useful evidence, but the provider's no-logs claims still need to be separated from independent audit evidence. Check the current privacy notice and test the exact app and device you plan to use." },
  { question: "Does AirVPN support port forwarding?", answer: "Port forwarding is a core AirVPN feature and a major reason advanced users consider it. Confirm the current port limits, supported protocols and account conditions in AirVPN's own client area before relying on it for a self-hosted service or torrent client." },
  { question: "Does AirVPN work with Netflix and other streaming services?", answer: "Streaming availability is not a stable AirVPN promise. IP blocks and catalog access change by service and server, so do not buy AirVPN for streaming without testing the specific platform and region during the refund window." },
  { question: "Does AirVPN have an iPhone app?", answer: "AirVPN's platform and configuration options should be checked on the official support pages because app availability and setup can change. iOS users should confirm whether the current workflow is a native app or a manual WireGuard/OpenVPN profile before subscribing." },
  { question: "Who is AirVPN best for?", answer: "AirVPN is most relevant to technically confident users who value control, open-source tooling and port forwarding. Users who prioritise polished apps, broad streaming access or independently verified logging claims should compare other providers first." },
];

export function AirVpnReviewEditorialPage() {
  const airvpn = getVpnById("airvpn");
  const proton = getVpnById("protonvpn");
  const nord = getVpnById("nordvpn");
  if (!airvpn || !proton || !nord) return null;
  const protonAffiliateUrl = getVpnAffiliateUrl("protonvpn");
  const nordAffiliateUrl = getVpnAffiliateUrl("nordvpn");

  return (
    <BestVpnEditorialTemplate brief={editorialContentBriefs.airvpnReview} navigation={[{ href: "#quick-picks", label: "Verdict" }, { href: "#evidence", label: "Evidence" }, { href: "#performance", label: "Testing" }, { href: "#alternatives", label: "Alternatives" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Sources" }]}> 
      <div className="container pt-6"><BreadcrumbSchema items={[{ name: "Reviews", href: "/reviews" }, { name: "AirVPN Review", href: "/reviews/airvpn" }]} /></div>
      <main className="container max-w-5xl py-8 lg:py-12">
        <header className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Independent provider review</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{airvpnReviewTitle}</h1>
          <p className="mt-5 text-xl text-muted-foreground">{airvpnReviewDescription}</p>
          <p className="mt-4 text-sm text-muted-foreground">Reviewed 13 August 2026 · We separate provider documentation, third-party reporting and checks that still require a reproducible device test. DataForSEO informed the questions; it does not prove safety, speed or value.</p>
          <AffiliateDisclosure variant="card" className="mt-5 max-w-3xl" />
        </header>

        <section id="quick-picks" className="scroll-mt-24"><div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8"><div className="flex items-start gap-4"><ShieldCheck className="mt-1 size-7 shrink-0 text-primary" aria-hidden="true" /><div><p className="text-sm font-semibold uppercase tracking-wide text-primary">Bottom line</p><h2 className="mt-2 text-3xl font-bold">A specialist VPN with a clear trade-off</h2><p className="mt-3 text-muted-foreground">AirVPN is worth investigating when port forwarding, open-source tooling and granular configuration matter more than a polished mainstream experience. Treat streaming reliability, mobile setup, support coverage and no-logs assurance as separate questions rather than assuming one privacy claim answers them all.</p></div></div></div></section>

        <section id="evidence" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">AirVPN evidence checklist</h2><p className="mt-3 max-w-3xl text-muted-foreground">The table below keeps the review useful without turning a provider description into a guarantee. Re-check the linked first-party terms when you make a purchase decision.</p><div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[860px] text-left text-sm"><caption className="sr-only">AirVPN evidence and decision limits</caption><thead className="bg-muted/60"><tr><th scope="col" className="p-4">Question</th><th scope="col" className="p-4">Evidence to inspect</th><th scope="col" className="p-4">Decision limit</th></tr></thead><tbody>
          <tr className="border-t"><th scope="row" className="p-4 font-semibold">What does the privacy notice cover?</th><td className="p-4">Read the current notice for IP addresses, connection metadata, retention, legal requests and account information.</td><td className="p-4">A stated policy is not the same as independent verification; record the date and scope of any audit.</td></tr>
          <tr className="border-t"><th scope="row" className="p-4 font-semibold">Does Network Lock fail safely?</th><td className="p-4">Test reconnects, DNS/WebRTC behavior and traffic blocking on the exact OS and protocol you use.</td><td className="p-4">If the kill switch or leak protection is unavailable on your platform, do not assume desktop behavior transfers.</td></tr>
          <tr className="border-t"><th scope="row" className="p-4 font-semibold">Is port forwarding still available?</th><td className="p-4">Check AirVPN&apos;s port-forwarding FAQ and current account limits before configuring an inbound service.</td><td className="p-4">Port availability can depend on plan, account status, protocol and server conditions.</td></tr>
          <tr className="border-t"><th scope="row" className="p-4 font-semibold">How usable are the apps?</th><td className="p-4">Confirm supported platforms, manual setup steps, update cadence and support documentation.</td><td className="p-4">A feature-rich client can still be a poor fit if your household needs simple mobile setup.</td></tr>
        </tbody></table></div></section>

        <section id="performance" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">How to test AirVPN before relying on it</h2><p className="mt-3 max-w-3xl text-muted-foreground">We do not present old fixed speed numbers as current lab results. Use a repeatable baseline and record the date, server, protocol and time of day.</p><ol className="mt-6 grid gap-4 md:grid-cols-2"><li className="rounded-xl border p-5"><strong>1. Connection quality</strong><p className="mt-2 text-sm text-muted-foreground">Compare WireGuard and OpenVPN on a nearby and long-distance server using the same baseline connection.</p></li><li className="rounded-xl border p-5"><strong>2. Leak protection</strong><p className="mt-2 text-sm text-muted-foreground">Check DNS, IPv6 and WebRTC exposure before and after toggling Network Lock.</p></li><li className="rounded-xl border p-5"><strong>3. Port forwarding</strong><p className="mt-2 text-sm text-muted-foreground">Reserve a port in the current client area and verify inbound reachability from an independent network.</p></li><li className="rounded-xl border p-5"><strong>4. Streaming boundaries</strong><p className="mt-2 text-sm text-muted-foreground">Test only the services and regions you actually need; a result on one server is not a guarantee for the next.</p></li></ol></section>

        <section id="alternatives" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">Alternatives to compare</h2><p className="mt-3 max-w-3xl text-muted-foreground">These are comparison points for different priorities, not a claim that one provider is best for every reader.</p><div className="mt-6 grid gap-5 md:grid-cols-2"><article className="rounded-xl border bg-card p-5"><div className="flex items-center gap-3"><FileCheck className="size-6 text-primary" aria-hidden="true" /><h3 className="text-xl font-semibold">{proton.name}</h3></div><p className="mt-3 text-sm text-muted-foreground">A useful comparison when you want open-source apps, a free tier and published privacy documentation alongside broader everyday usability.</p><AffiliateButton vpnId={proton.id} vpnName={proton.name} affiliateUrl={protonAffiliateUrl} className="mt-5 w-full">Check {proton.name} plans</AffiliateButton></article><article className="rounded-xl border bg-card p-5"><div className="flex items-center gap-3"><ShieldCheck className="size-6 text-primary" aria-hidden="true" /><h3 className="text-xl font-semibold">{nord.name}</h3></div><p className="mt-3 text-sm text-muted-foreground">A comparison point for broader platform coverage, simpler apps and streaming-oriented use cases. Read the evidence before deciding.</p><AffiliateButton vpnId={nord.id} vpnName={nord.name} affiliateUrl={nordAffiliateUrl} className="mt-5 w-full">Check {nord.name} plans</AffiliateButton></article></div></section>

        <section id="faq" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">AirVPN FAQ</h2><div className="mt-5 space-y-5">{faqs.map((item) => <div key={item.question} className="rounded-xl border p-5"><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-muted-foreground">{item.answer}</p></div>)}</div><FAQSchema title="AirVPN FAQ" faqs={faqs} /></section>

        <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8"><h2 className="text-2xl font-bold">Sources and related decisions</h2><p className="mt-2 text-sm text-muted-foreground">Provider pages define current terms; independent reporting and our methodology provide context. The DataForSEO dossier informs query and PAA coverage, not the verdict.</p><ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2"><li><a href="https://airvpn.org" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />AirVPN official website</a></li><li><a href="https://airvpn.org/privacy/" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />AirVPN privacy notice</a></li><li><a href="https://airvpn.org/faq/port_forwarding/" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />AirVPN port-forwarding FAQ</a></li><li><Link href="/reviews/protonvpn" className="text-primary underline">Proton VPN review</Link></li><li><Link href="/reviews/nordvpn" className="text-primary underline">NordVPN review</Link></li><li><Link href="/methodology" className="text-primary underline">ZeroToVPN methodology</Link></li><li><Link href="/affiliate-disclosure" className="text-primary underline">Affiliate disclosure</Link></li></ul></section>
      </main>
    </BestVpnEditorialTemplate>
  );
}
