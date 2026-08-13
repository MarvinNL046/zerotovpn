import { CheckCircle2, FileCheck, Gauge, Link2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnById } from "@/lib/vpn-data";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const nordvpnReviewTitle = "NordVPN Review 2026: Privacy Evidence, Price and Performance";
export const nordvpnReviewDescription = "An evidence-led NordVPN review covering no-logs assurance scope, current plan terms, performance testing and streaming boundaries.";

const faqs = [
  { question: "Is NordVPN worth it in 2026?", answer: "It can be a reasonable commercial option if its current plan terms, device coverage and privacy evidence match your needs. We do not treat a high score or an affiliate relationship as proof that it is the best choice for every threat model." },
  { question: "Does NordVPN keep logs?", answer: "NordVPN says its systems and supporting operations were assessed against its no-logs statement in a Deloitte Lithuania assurance engagement conducted from November 10 to December 12, 2025. That is a dated, point-in-time assessment with a defined scope, not a guarantee about every future system or activity." },
  { question: "Does NordVPN have a 30-day free trial?", answer: "A 30-day money-back guarantee is not the same as a free trial. NordVPN's support policy says new subscriptions purchased directly from NordVPN can be refunded within 30 days, subject to the policy and purchase channel." },
  { question: "How fast is NordVPN?", answer: "Speed depends on your baseline connection, protocol, exit location, congestion and destination. Use the same route and time of day with and without the VPN; a single headline Mbps figure cannot predict your result." },
  { question: "Does NordVPN work with Netflix?", answer: "Streaming access can change by catalogue, server and platform. Treat any review result as a dated observation, check the service terms and do not interpret a VPN as a licence to bypass restrictions." },
];

export function NordVpnReviewEditorialPage() {
  const vpn = getVpnById("nordvpn");
  if (!vpn) return null;
  const affiliateUrl = getVpnAffiliateUrl("nordvpn");
  const price = vpn.priceTwoYear ?? vpn.priceYearly;

  return (
    <BestVpnEditorialTemplate brief={editorialContentBriefs.nordvpnReview} navigation={[{ href: "#quick-picks", label: "Verdict" }, { href: "#evidence", label: "Evidence" }, { href: "#performance", label: "Testing" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Sources" }]}> 
      <div className="container pt-6"><BreadcrumbSchema items={[{ name: "Reviews", href: "/reviews" }, { name: "NordVPN Review", href: "/reviews/nordvpn" }]} /></div>
      <main className="container max-w-5xl py-8 lg:py-12">
        <header className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Independent provider review</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{nordvpnReviewTitle}</h1>
          <p className="mt-5 text-xl text-muted-foreground">{nordvpnReviewDescription}</p>
          <p className="mt-4 text-sm text-muted-foreground">Reviewed 13 August 2026 · We separate provider statements, dated evidence and repeatable tests. DataForSEO informed the questions; it does not prove provider performance.</p>
          <AffiliateDisclosure variant="card" className="mt-5 max-w-3xl" />
        </header>

        <section id="quick-picks" className="scroll-mt-24">
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-wide text-primary">Bottom line</p><h2 className="mt-2 text-3xl font-bold">A strong option when the evidence and terms fit your use case</h2><p className="mt-3 text-muted-foreground">NordVPN has a documented sixth no-logs assurance engagement and broad app coverage. The trade-offs are plan renewal terms, provider trust and route-dependent performance. Compare those items before subscribing.</p></div>
              <div className="shrink-0 text-center"><div className="text-3xl font-bold text-primary"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={affiliateUrl} dataPriceLink>${price.toFixed(2)}</AffiliateTextLink><span className="text-sm font-normal text-muted-foreground">/mo equivalent</span></div><p className="mt-1 text-xs text-muted-foreground">Catalog snapshot checked {vpn.priceLastVerified ?? "date not recorded"}</p><AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={affiliateUrl} className="mt-4">Check current NordVPN plans</AffiliateButton></div>
            </div>
          </div>
        </section>

        <section id="evidence" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">What the evidence says—and where it stops</h2><p className="mt-3 max-w-3xl text-muted-foreground">A review is useful only when the claim, source, date and limitation are visible together.</p><div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[820px] text-left text-sm"><caption className="sr-only">NordVPN evidence and limitation checklist</caption><thead className="bg-muted/60"><tr><th scope="col" className="p-4">Question</th><th scope="col" className="p-4">Dated evidence</th><th scope="col" className="p-4">Limit to keep in mind</th></tr></thead><tbody>
          <tr className="border-t"><th scope="row" className="p-4 font-semibold">No-logs assurance</th><td className="p-4">NordVPN reports a Deloitte Lithuania engagement covering systems and operations, conducted 10 Nov–12 Dec 2025.</td><td className="p-4">Point-in-time and scoped; the full report requires a Nord Account.</td></tr>
          <tr className="border-t"><th scope="row" className="p-4 font-semibold">Refund window</th><td className="p-4">NordVPN support documents a 30-day money-back policy for eligible new direct subscriptions.</td><td className="p-4">A refund window is not a free trial; purchase channel and renewal terms matter.</td></tr>
          <tr className="border-t"><th scope="row" className="p-4 font-semibold">Device coverage</th><td className="p-4">NordVPN describes 10 simultaneous connections, with a router exception.</td><td className="p-4">Check the exact app, router and household setup before buying.</td></tr>
          <tr className="border-t"><th scope="row" className="p-4 font-semibold">Server network</th><td className="p-4">The official server list is the current source for locations, server types and protocol availability.</td><td className="p-4">Counts and availability change; do not copy a static server number as a permanent fact.</td></tr>
        </tbody></table></div></section>

        <section id="performance" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">How to test NordVPN performance yourself</h2><div className="mt-5 grid gap-4 md:grid-cols-3"><div className="rounded-xl border p-5"><Gauge className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">Baseline</h3><p className="mt-2 text-sm text-muted-foreground">Record latency, download, upload and packet loss without the tunnel.</p></div><div className="rounded-xl border p-5"><ShieldCheck className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">Repeat</h3><p className="mt-2 text-sm text-muted-foreground">Use the same device, destination, protocol and time with two nearby exits.</p></div><div className="rounded-xl border p-5"><FileCheck className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">Record limits</h3><p className="mt-2 text-sm text-muted-foreground">Keep the date, route, plan and app version with every result.</p></div></div><ol className="mt-6 grid gap-3 md:grid-cols-2">{["Choose the destination that matters to you, not a convenient speed-test server.", "Run at least three repeated measurements on and off the VPN.", "Check reconnects, DNS/WebRTC leaks and the kill switch separately.", "Test streaming or gaming access only on services and accounts you are allowed to use.", "Keep the service only if the measured trade-off fits your threat model and budget."].map((item, index) => <li key={item} className="flex gap-3 rounded-lg border p-4"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" /><span><strong>{index + 1}.</strong> {item}</span></li>)}</ol></section>

        <section id="faq" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">NordVPN FAQ</h2><div className="mt-5 space-y-5">{faqs.map((item) => <div key={item.question} className="rounded-xl border p-5"><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-muted-foreground">{item.answer}</p></div>)}</div><FAQSchema title="NordVPN FAQ" faqs={faqs} /></section>

        <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8"><h2 className="text-2xl font-bold">Sources and related decisions</h2><p className="mt-2 text-sm text-muted-foreground">Primary provider policies and the dated assurance announcement are the source of record. Our DataForSEO dossier is used for query and PAA coverage, not as proof of product performance.</p><ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2"><li><a href="https://nordvpn.com/blog/nordvpn-no-logs-assurance-engagement-2025/" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />Sixth no-logs assurance announcement</a></li><li><a href="https://support.nordvpn.com/hc/en-us/articles/19476991311121-What-is-your-money-back-policy" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />Money-back policy</a></li><li><a href="https://nordvpn.com/features/vpn-for-multiple-devices/" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />Simultaneous-device guidance</a></li><li><a href="https://nordvpn.com/servers/" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />Current server list</a></li><li><Link href="/best/best-vpn" className="text-primary underline">Best VPN comparison</Link></li><li><Link href="/best/vpn-privacy" className="text-primary underline">Privacy evidence comparison</Link></li><li><Link href="/methodology" className="text-primary underline">ZeroToVPN methodology</Link></li><li><Link href="/affiliate-disclosure" className="text-primary underline">Affiliate disclosure</Link></li></ul></section>
      </main>
    </BestVpnEditorialTemplate>
  );
}
