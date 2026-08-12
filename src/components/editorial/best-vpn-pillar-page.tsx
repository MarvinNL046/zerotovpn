import { ArrowRight, Check, ExternalLink, ShieldCheck, Sparkles, Trophy, X } from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BestVpnEditorialTemplate, EditorialQuickPickCard } from "@/components/editorial/best-vpn-editorial-template";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";
import type { EditorialContentBrief } from "@/lib/editorial-content-brief";
import type { VpnData } from "@/lib/vpn-data-layer";

const pageUrl = "https://www.zerotovpn.com/best/best-vpn";
const faq = [
  { question: "Which VPN is actually the best?", answer: "There is no universal winner for every device, ISP, country or date. Start with the shortlist, then compare the provider's current plan, protocol support, privacy evidence and the feature you actually need. A local test is stronger evidence than a generic ranking." },
  { question: "How does ZeroToVPN choose the best VPN?", answer: "We compare the provider record, current pricing metadata, protocol support, privacy evidence, device limits and the use case the reader actually has. A provider claim is labelled as a claim; a local test is labelled with its device, network and date. Affiliate status does not determine the ranking." },
  { question: "Which VPN should most people evaluate first?", answer: "Start with the shortlist, then choose based on your priority: balanced everyday use, price and device count, streaming, privacy or a restrictive network. No single provider is guaranteed to be the best on every device, ISP, country or date." },
  { question: "Can the FBI track a VPN?", answer: "A VPN can reduce what your ISP sees, but it does not make you anonymous or immune to lawful investigation. A provider may hold account, payment or connection data, and websites can identify you through accounts, cookies or device signals. Read the provider's current logging and legal-request policies." },
  { question: "Do VPNs actually work for streaming?", answer: "They can work for some services and locations, but streaming platforms actively detect and block VPN endpoints. Test the exact service, region, device and date you care about; do not treat one successful stream as a permanent guarantee." },
  { question: "Why might someone avoid NordVPN?", answer: "A provider can be a strong candidate and still be the wrong fit if its current price, renewal terms, supported platform, jurisdiction or required feature does not match your setup. Compare those trade-offs with the alternatives and verify the live offer before subscribing." },
  { question: "Are the prices on this page guaranteed?", answer: "No. Prices are displayed with the last verification date when that metadata exists, and the provider landing page is the source of truth. Check the plan term, currency, renewal price and refund terms before subscribing." },
  { question: "Are free VPNs safe?", answer: "A free tier can have different limits, protocols, ownership and privacy terms from a paid plan. Compare the specific tier and its documentation; never assume free means private, fast or suitable for streaming." },
  { question: "What should I test before relying on a VPN?", answer: "Record your device, OS, app version, network, protocol, server region and date. Test the services you need, then repeat after sleep, reconnect and a Wi-Fi/cellular hand-off. One successful connection is not a permanent guarantee." },
];

const nav = [
  { href: "#quick-picks", label: "Top 3" },
  { href: "#rankings", label: "Rankings" },
  { href: "#comparison", label: "Compare" },
  { href: "#methodology", label: "How we test" },
  { href: "#faq", label: "FAQ" },
  { href: "#sources", label: "Sources" },
] as const;

const contentBrief = {
  primaryKeyword: "best vpn",
  intent: "commercial",
  cluster: "commercial-choice",
  lastReviewedAt: "2026-08-12",
  evidence: [
    "docs/research/dataforseo-commercial-cluster-2026-08-12.md",
    "/methodology",
    "/editorial-policy",
  ],
  affiliateContext: "vpn-selection",
  schemaType: "CollectionPage",
} satisfies EditorialContentBrief;

function money(value: number | undefined) {
  return typeof value === "number" ? `$${value.toFixed(2)}` : "—";
}

function priceVerifiedAt(vpn: VpnData) {
  return "priceLastVerified" in vpn && typeof vpn.priceLastVerified === "string" ? vpn.priceLastVerified : "not recorded";
}

export function BestVpnPillarPage({ vpns }: { vpns: VpnData[] }) {
  const picks = [
    { slug: "nordvpn", label: "Evaluate first", tone: "gold" as const, icon: <Trophy className="mr-1 size-3.5" aria-hidden="true" /> },
    { slug: "surfshark", label: "Value comparison", tone: "green" as const, icon: <Sparkles className="mr-1 size-3.5" aria-hidden="true" /> },
    { slug: "expressvpn", label: "Speed comparison", tone: "blue" as const, icon: <ShieldCheck className="mr-1 size-3.5" aria-hidden="true" /> },
  ].map((pick) => ({ ...pick, vpn: vpns.find((vpn) => vpn.slug === pick.slug) })).filter((pick): pick is typeof pick & { vpn: VpnData } => Boolean(pick.vpn));
  const ranked = vpns.filter((vpn) => vpn.featured).slice(0, 5);

  return (
    <>
      <ArticleJsonLd title="Best VPN in 2026: evidence-led shortlist and comparison" description="Compare leading VPN providers by use case, pricing metadata, protocol support and transparent test notes." url={pageUrl} datePublished="2026-01-01" dateModified="2026-08-12" />
      <BreadcrumbSchema items={[{ name: "Best VPNs", href: "/best/best-vpn" }]} />
      <FAQSchema title="Best VPN FAQ" faqs={faq} />
      <BestVpnEditorialTemplate navigation={nav} brief={contentBrief}>
        <article>
          <section className="border-b bg-gradient-to-br from-primary/10 via-background to-background py-14 lg:py-20"><div className="container max-w-6xl"><div className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Updated August 12, 2026 · independent comparison</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Best VPN in 2026: a transparent shortlist you can verify</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">Use the shortlist to choose a starting point, then verify the plan, protocol and test conditions that match your setup. We separate provider documentation, catalog data and real-world checks instead of promising one VPN works everywhere.</p><p className="mt-5 text-sm leading-6 text-muted-foreground">Affiliate links may earn us a commission. This does not determine the ranking; <Link href="/affiliate-disclosure" className="underline">read the disclosure</Link>. Prices and features can change.</p></div></div></section>

          <section id="quick-picks" className="container max-w-6xl scroll-mt-24 py-12 lg:py-16"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Top 3 overview</p><h2 className="mt-3 text-3xl font-bold">Start with the provider that fits your decision</h2><p className="mt-4 leading-7 text-muted-foreground">These cards mirror the comparison pattern readers expect: a clear use case, a visible price context and a direct route to the provider. The amount is a current catalog value, not a guaranteed offer.</p></div><div className="mt-8 grid gap-5 md:grid-cols-3">{picks.map((pick) => <EditorialQuickPickCard key={pick.slug} vpn={pick.vpn} label={pick.label} tone={pick.tone} icon={pick.icon} />)}</div></section>

          <section id="rankings" className="scroll-mt-24 border-y bg-muted/20 py-12 lg:py-16"><div className="container max-w-6xl"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Provider dossiers</p><h2 className="mt-3 text-3xl font-bold">What to verify before you subscribe</h2><p className="mt-4 leading-7 text-muted-foreground">The order is a starting point, not a promise. Read the limitations beside the strengths and open the full review for deeper testing notes.</p></div><div className="mt-8 space-y-6">{ranked.map((vpn, index) => <section key={vpn.slug} className="rounded-2xl border bg-card p-6 lg:p-8"><div className="grid gap-8 lg:grid-cols-[1fr_18rem]"><div><div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">#{index + 1}</span><h3 className="text-2xl font-bold"><Link href={`/reviews/${vpn.slug}`} className="hover:text-primary">{vpn.name}</Link></h3>{vpn.editorChoice ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">Editor&apos;s choice</span> : null}</div><p className="mt-3 leading-7 text-muted-foreground">{vpn.shortDescription}</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{vpn.pros.slice(0, 3).map((pro) => <p key={pro} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />{pro}</p>)}{vpn.cons.slice(0, 2).map((con) => <p key={con} className="flex gap-2 text-sm text-muted-foreground"><X className="mt-0.5 size-4 shrink-0 text-rose-600" aria-hidden="true" />{con}</p>)}</div><p className="mt-5 text-sm text-muted-foreground">Catalog snapshot: {vpn.servers.toLocaleString()} servers · {vpn.countries} countries · {vpn.maxDevices >= 999 ? "unlimited" : vpn.maxDevices} devices · {vpn.moneyBackDays}-day refund window. Verify current values on the provider site.</p></div><div className="border-t pt-5 lg:border-l lg:border-t-0 lg:pl-6"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">From</p><p className="mt-1 text-3xl font-bold text-primary"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{money(vpn.priceTwoYear ?? vpn.priceYearly)}</AffiliateTextLink><span className="text-sm font-normal text-muted-foreground">/mo</span></p><p className="mt-2 text-xs text-muted-foreground">Last verified: {priceVerifiedAt(vpn)}</p><AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="mt-5 w-full">Visit {vpn.name}</AffiliateButton><Link href={`/reviews/${vpn.slug}`} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold hover:bg-muted">Read full review <ArrowRight className="size-4" aria-hidden="true" /></Link></div></div></section>)}</div></div></section>

          <section id="comparison" className="container max-w-6xl scroll-mt-24 py-12 lg:py-16"><h2 className="text-3xl font-bold">Comparison table</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">These fields are useful for shortlisting. They are not a substitute for testing the provider on your device and network.</p><div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[820px] text-left text-sm"><caption className="sr-only">Best VPN comparison table</caption><thead className="bg-muted/60"><tr><th className="p-4 font-semibold">Provider</th><th className="p-4 font-semibold">Starting price</th><th className="p-4 font-semibold">Protocols</th><th className="p-4 font-semibold">Devices</th><th className="p-4 font-semibold">Refund</th><th className="p-4 font-semibold">Last price check</th></tr></thead><tbody className="divide-y">{ranked.map((vpn) => <tr key={vpn.slug}><th scope="row" className="p-4"><Link href={`/reviews/${vpn.slug}`} className="font-semibold text-primary hover:underline">{vpn.name}</Link></th><td className="p-4"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="font-semibold underline decoration-primary/40 underline-offset-2">{money(vpn.priceTwoYear ?? vpn.priceYearly)}/mo</AffiliateTextLink></td><td className="p-4">{vpn.protocols.slice(0, 3).join(", ")}</td><td className="p-4">{vpn.maxDevices >= 999 ? "Unlimited" : vpn.maxDevices}</td><td className="p-4">{vpn.moneyBackDays} days</td><td className="p-4">{priceVerifiedAt(vpn)}</td></tr>)}</tbody></table></div></section>

          <section id="methodology" className="scroll-mt-24 border-y bg-muted/30 py-12 lg:py-16"><div className="container max-w-6xl"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Editorial method</p><h2 className="mt-3 text-3xl font-bold">Evidence before certainty</h2><p className="mt-4 leading-7 text-muted-foreground">Our catalog is a starting point. A reproducible result must include the device, OS, app version, network, protocol, server region and date. Provider pages establish that a feature is documented; they do not prove that it works everywhere.</p></div><ol className="space-y-3">{["Define the use case: privacy, streaming, travel, censorship, price or device count.","Check the current provider plan, renewal terms, refund policy and supported platform.","Test the needed services and protocol on the network that matters; record failures as well as successes.","Recheck after reconnect and compare the notes with the dated review and official documentation."].map((step, index) => <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-4 border p-4"><span className="font-mono font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><span className="leading-7">{step}</span></li>)}</ol></div><p className="mt-8 text-sm leading-6 text-muted-foreground">Need a specific context? Use the <Link href="/guides/vpn-protocols-explained" className="underline">protocol guide</Link>, <Link href="/blog/best-vpn-for-iran-2026-bypass-internet-censorship" className="underline">Iran dossier</Link>, <Link href="/blog/best-vpn-for-telegram-2026" className="underline">Telegram dossier</Link>, <Link href="/countries/russia" className="underline">Russia page</Link> or <Link href="/countries/china" className="underline">China page</Link>.</p></div></section>

          <section id="faq" className="container max-w-6xl scroll-mt-24 py-12 lg:py-16"><h2 className="text-3xl font-bold">Best VPN FAQ</h2><div className="mt-6 divide-y rounded-xl border">{faq.map((item) => <details key={item.question} className="group p-5"><summary className="cursor-pointer pr-8 font-semibold">{item.question}<ArrowRight className="float-right size-4 transition-transform group-open:rotate-90" aria-hidden="true" /></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></section>

          <section id="sources" className="container max-w-6xl scroll-mt-24 border-t py-12 lg:py-16"><h2 className="text-3xl font-bold">Sources and freshness</h2><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Provider price and feature records are shown with a last-verified date where available; the provider landing page remains the source of truth.</li><li>ZeroToVPN editorial methodology: <Link href="/methodology" className="underline">how we test</Link> and <Link href="/editorial-policy" className="underline">editorial policy</Link>.</li><li>Search and cluster decisions are informed by the repository performance baseline and DataForSEO dossiers, not by affiliate payout.</li><li>Restrictive-network claims are bounded and linked to the dedicated Iran, Russia, China, Telegram and protocol pages above.</li><li>Choose a narrower decision path when it fits: <Link href="/best/vpn-privacy" className="underline">privacy</Link>, <Link href="/best/vpn-streaming" className="underline">streaming</Link>, <Link href="/best/vpn-cheap" className="underline">value</Link>, <Link href="/best/free-vpn" className="underline">free tiers</Link> or <Link href="/best/vpn-free-trial" className="underline">trials</Link>.</li></ul><div className="mt-6 flex flex-wrap gap-3"><Link href="/compare" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted">Open full comparison <ArrowRight className="size-4" aria-hidden="true" /></Link><a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted">Primary protocol docs <ExternalLink className="size-4" aria-hidden="true" /></a></div></section>
        </article>
      </BestVpnEditorialTemplate>
    </>
  );
}
