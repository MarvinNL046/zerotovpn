import { CheckCircle2, CircleAlert, WalletCards } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnById } from "@/lib/vpn-data";
import { getVpnAffiliateUrl, type VpnLinkSlug } from "@/lib/vpn-links";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const cheapVpnEditorialTitle = "Best Cheap VPNs in 2026: Compare Value, Terms and Trade-offs";
export const cheapVpnEditorialDescription = "Compare affordable VPN plans by upfront commitment, refund window, device limits and privacy evidence—not a misleading headline price.";

export const cheapVpnEditorialFaq = [
  { question: "What is the best affordable VPN service?", answer: "There is no universal cheapest winner. Start with the plan total, renewal terms, refund window and device limit, then compare those terms with the privacy and app features you actually need." },
  { question: "Which VPN is safe and cheap?", answer: "A low price is not evidence of safety. Check the provider's current privacy policy, independent audits or other verifiable disclosures, app publisher and support terms before subscribing." },
  { question: "Are free VPNs illegal?", answer: "Using a VPN is legal in many places, but laws differ and a VPN does not make unlawful activity lawful. Free plans also have different limits and funding models, so read the provider terms and local rules." },
  { question: "Why do long-term VPN plans look so cheap?", answer: "The monthly equivalent usually reflects a longer commitment paid upfront. Compare the total checkout cost and renewal price; a low equivalent is not the same as a low first payment or permanent price." },
  { question: "Is a cheap VPN good enough for streaming?", answer: "Streaming access changes by service, country, account and server. Treat it as a use-case test, not a permanent feature promise, and keep a refund window in mind." },
];

const providerRows = [
  { id: "surfshark", label: "Best multi-device value", note: "Useful when one subscription must cover several devices; verify the current simultaneous-connection wording." },
  { id: "cyberghost", label: "Long-term plan to inspect", note: "Compare the advertised term with renewal pricing and the provider's current refund policy." },
  { id: "nordvpn", label: "Broader paid comparison", note: "A higher headline price can still be better value if the app, support and privacy evidence fit your use case." },
] as const satisfies ReadonlyArray<{ id: VpnLinkSlug; label: string; note: string }>;

export function CheapVpnEditorialPage() {
  return (
    <BestVpnEditorialTemplate brief={editorialContentBriefs.cheapVpn} navigation={[{ href: "#quick-picks", label: "Options" }, { href: "#comparison", label: "Compare terms" }, { href: "#value-checks", label: "Value checks" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Sources" }]}> 
      <div className="flex flex-col">
        <div className="container pt-6"><BreadcrumbSchema items={[{ name: "Best VPNs", href: "/best/best-vpn" }, { name: "Cheap VPNs", href: "/best/vpn-cheap" }]} /></div>
        <main className="container max-w-5xl py-8 lg:py-12">
          <header className="mb-10 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Affordable VPN decision guide</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{cheapVpnEditorialTitle}</h1>
            <p className="mt-5 text-xl text-muted-foreground">{cheapVpnEditorialDescription}</p>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6"><CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" /><p><strong>Evidence boundary:</strong> prices, promotions, renewal terms and streaming access change by country and date. The catalog amounts below are snapshots; open the provider link and verify checkout before subscribing.</p></div>
            <p className="mt-4 text-sm text-muted-foreground">Reviewed 13 August 2026 · DataForSEO surfaced commercial questions about affordability, safety and free plans; it does not prove provider performance.</p>
          </header>

          <section id="quick-picks" className="scroll-mt-24"><h2 className="text-3xl font-bold">Affordable VPN options to verify</h2><p className="mt-3 max-w-3xl text-muted-foreground">These are comparison starting points, not unconditional endorsements. Prices shown are catalog equivalents for a longer plan where recorded.</p><div className="mt-6 grid gap-5 md:grid-cols-3">{providerRows.map((row) => { const vpn = getVpnById(row.id); if (!vpn) return null; const price = vpn.priceTwoYear ?? vpn.priceYearly; const affiliateUrl = getVpnAffiliateUrl(row.id); return <article key={row.id} className="rounded-xl border bg-card p-5 shadow-sm"><div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"><WalletCards className="size-4 text-primary" aria-hidden="true" /><span>{row.label}</span></div><h3 className="text-xl font-semibold">{vpn.name}</h3><p className="mt-2 text-sm text-muted-foreground">{row.note}</p><div className="mt-4 text-2xl font-bold text-primary"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={affiliateUrl} dataPriceLink>${price.toFixed(2)}</AffiliateTextLink><span className="ml-1 text-sm font-normal text-muted-foreground">/mo equivalent</span></div><p className="mt-1 text-xs text-muted-foreground">Catalog checked {vpn.priceLastVerified ?? "date not recorded"}; verify total and renewal.</p><AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={affiliateUrl} className="mt-4 w-full">Check {vpn.name} terms</AffiliateButton></article>; })}</div></section>

          <section id="comparison" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">Compare the commitment, not just the monthly equivalent</h2><p className="mt-3 max-w-3xl text-muted-foreground">A credible cheap-VPN comparison makes the hidden trade-offs visible. Use the provider checkout and policy pages as the source of truth.</p><div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[720px] text-left text-sm"><caption className="sr-only">Cheap VPN value comparison checklist</caption><thead className="bg-muted/60"><tr><th scope="col" className="p-4">Check</th><th scope="col" className="p-4">Why it matters</th><th scope="col" className="p-4">What to verify</th></tr></thead><tbody>{[["Total upfront cost", "The monthly equivalent can hide a multi-year payment", "Checkout total, currency and billing interval"], ["Renewal terms", "The introductory equivalent may not continue", "Renewal amount, date and cancellation path"], ["Refund window", "A short test period changes the risk of a long commitment", "Current money-back terms and exclusions"], ["Device and app limits", "Cheap is poor value if it does not cover your household", "Simultaneous connections and supported platforms"], ["Privacy evidence", "Price does not establish trust", "Policy, audits, ownership and app publisher"]].map(([check, why, verify]) => <tr key={check} className="border-t"><th scope="row" className="p-4 font-semibold">{check}</th><td className="p-4">{why}</td><td className="p-4">{verify}</td></tr>)}</tbody></table></div></section>

          <section id="value-checks" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">Cheap versus free: the decision boundary</h2><div className="mt-5 grid gap-4 md:grid-cols-2"><div className="rounded-xl border p-5"><h3 className="font-semibold">Paid low-cost plan</h3><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{["Usually more server and app choices", "Long-term equivalent can require upfront payment", "Refund and renewal terms still need checking"].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" aria-hidden="true" />{item}</li>)}</ul></div><div className="rounded-xl border p-5"><h3 className="font-semibold">Free tier</h3><ul className="mt-3 space-y-2 text-sm text-muted-foreground"><li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" aria-hidden="true" />May impose data, speed, location or device limits</li><li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" aria-hidden="true" />Funding and privacy terms differ by provider</li><li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-green-600" aria-hidden="true" />Compare with our <Link href="/best/free-vpn" className="text-primary underline">free VPN evidence guide</Link> before installing</li></ul></div></div><p className="mt-5 text-muted-foreground">For a broader baseline, see the <Link href="/best/best-vpn" className="text-primary underline">best VPN comparison</Link> and the <Link href="/best/vpn-free-trial" className="text-primary underline">free-trial guide</Link>.</p></section>

          <section id="faq" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">Cheap VPN FAQ</h2><div className="mt-5 space-y-5">{cheapVpnEditorialFaq.map((item) => <div key={item.question} className="rounded-xl border p-5"><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-muted-foreground">{item.answer}</p></div>)}</div><FAQSchema title="Cheap VPN FAQ" faqs={cheapVpnEditorialFaq} /></section>
          <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8"><h2 className="text-2xl font-bold">Sources and related checks</h2><p className="mt-2 text-sm text-muted-foreground">The US/English DataForSEO dossier was refreshed 13 August 2026 for intent and question coverage. Provider prices and policies must be checked at source.</p><ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2"><li><Link href="/methodology" className="text-primary underline">ZeroToVPN methodology</Link></li><li><Link href="/best/free-vpn" className="text-primary underline">Free VPN evidence guide</Link></li><li><Link href="/best/vpn-free-trial" className="text-primary underline">VPN free-trial guide</Link></li><li><Link href="/best/best-vpn" className="text-primary underline">Best VPN comparison</Link></li></ul></section>
        </main>
      </div>
    </BestVpnEditorialTemplate>
  );
}
