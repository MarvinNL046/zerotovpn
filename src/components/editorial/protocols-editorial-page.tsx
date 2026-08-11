import { ArrowRight, CircleHelp, ExternalLink, ShieldCheck, Smartphone, Wifi } from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { IranEditorialQuickPicks } from "@/components/editorial/iran-editorial-quick-picks";
import { Link } from "@/i18n/navigation";
import type { VpnData } from "@/lib/vpn-data-layer";

const pageUrl = "https://www.zerotovpn.com/guides/vpn-protocols-explained";
const faq = [
  { question: "Which VPN protocol should I choose?", answer: "Start with WireGuard for ordinary browsing, streaming, gaming and most mobile use. Switch to OpenVPN when an app or network needs its compatibility, and compare the provider's documented stealth or obfuscation option on a restrictive network. Your device, network and date still matter." },
  { question: "Is WireGuard better than OpenVPN?", answer: "Neither wins every situation. WireGuard is lean and usually a strong default for speed and battery efficiency; OpenVPN has broader compatibility and more transport choices. Compare the trade-off you need rather than treating one protocol as universally best." },
  { question: "Which VPN protocol is hardest to block?", answer: "There is no protocol that is guaranteed to stay available. OpenVPN TCP can resemble ordinary HTTPS traffic in some setups, while providers may add separate obfuscation or stealth layers. Verify the current provider documentation and test lawfully on the network that matters." },
  { question: "Should I use OpenVPN TCP or UDP?", answer: "Use UDP when the network permits it and you want lower overhead. Try TCP when UDP is blocked or the connection is unstable, accepting that retransmission can make it slower. Record both results instead of assuming the default is best." },
  { question: "Is VPN obfuscation safe?", answer: "Obfuscation changes how traffic is presented; it does not replace encryption, a kill switch or a provider privacy review. Treat it as a network-compatibility feature, confirm the supported protocol and app version, and do not read it as legal permission or a promise of access." },
];

const nav = [
  { href: "#quick-picks", label: "Shortlist" },
  { href: "#decision", label: "Decision guide" },
  { href: "#comparison", label: "Comparison" },
  { href: "#obfuscation", label: "Obfuscation" },
  { href: "#test-plan", label: "Test plan" },
  { href: "#faq", label: "FAQ" },
  { href: "#sources", label: "Sources" },
] as const;

export function ProtocolsEditorialPage({ vpns }: { vpns: VpnData[] }) {
  return (
    <>
      <ArticleJsonLd title="VPN Protocols Explained: WireGuard vs OpenVPN (2026)" description="A practical, evidence-led guide to WireGuard, OpenVPN, TCP vs UDP and VPN obfuscation." url={pageUrl} datePublished="2026-01-01" dateModified="2026-08-11" />
      <BreadcrumbSchema items={[{ name: "Guides", href: "/guides" }, { name: "VPN protocols explained", href: "/guides/vpn-protocols-explained" }]} />
      <FAQSchema title="VPN protocols FAQ" faqs={faq} />
      <BestVpnEditorialTemplate navigation={nav}>
        <article>
          <section className="border-b bg-gradient-to-br from-blue-500/10 via-background to-background py-14 lg:py-20">
            <div className="container max-w-5xl">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Updated August 11, 2026 · technical guide</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">VPN protocols explained: WireGuard vs OpenVPN, TCP vs UDP and stealth</h1>
                <p className="mt-6 text-xl leading-8 text-muted-foreground">The useful answer is contextual: use WireGuard for a modern everyday default, OpenVPN for compatibility, and a documented obfuscation mode only when your network requires it. Here is what to compare and what to record.</p>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">Independent editorial research. Affiliate links may earn us a commission; <Link href="/affiliate-disclosure" className="underline">read our disclosure</Link>. Protocol features are not guarantees of access, privacy or legality.</p>
              </div>
            </div>
          </section>

          <section id="decision" className="container max-w-5xl scroll-mt-24 py-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">The short answer</p>
                <h2 className="mt-3 text-3xl font-bold">Choose the trade-off that matches your network</h2>
                <p className="mt-4 leading-7 text-muted-foreground">Search demand is concentrated around WireGuard vs OpenVPN and OpenVPN TCP vs UDP. The right comparison is not a universal ranking; it is a repeatable decision you can verify on your own device.</p>
                <Link href="/best/best-vpn" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">Compare providers and current offers <ArrowRight className="size-4" aria-hidden="true" /></Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Everyday speed", title: "WireGuard", body: "Lean modern cryptography and a strong default for browsing, streaming and gaming.", icon: Wifi },
                  { label: "Maximum compatibility", title: "OpenVPN", body: "A mature option with TCP and UDP transports when an app or network needs them.", icon: ShieldCheck },
                  { label: "Mobile hand-offs", title: "WireGuard or IKEv2", body: "Compare reconnect behaviour as Wi-Fi and cellular networks change.", icon: Smartphone },
                  { label: "Restrictive network", title: "Documented stealth", body: "Check the provider's current obfuscation path; do not treat it as an access promise.", icon: CircleHelp },
                ].map(({ label, title, body, icon: Icon }) => <div key={label} className="rounded-xl border bg-card p-5"><div className="flex items-center gap-2 text-primary"><Icon className="size-5" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-[0.14em]">{label}</span></div><h3 className="mt-3 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></div>)}
              </div>
            </div>
          </section>

          <IranEditorialQuickPicks vpns={vpns} heading="Providers worth evaluating by protocol support" eyebrow="Protocol shortlist" description="These are contextual affiliate links to providers worth checking. Confirm the current app, protocol and obfuscation documentation for your platform before subscribing; the cards are not proof of performance on your network." />

          <section id="comparison" className="container max-w-5xl scroll-mt-24 py-12 lg:py-16">
            <h2 className="text-3xl font-bold">WireGuard vs OpenVPN at a glance</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">This table describes the design trade-offs. It is not a lab speed test: distance, server load, device, ISP and provider implementation can change the result.</p>
            <div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[720px] text-left text-sm"><caption className="sr-only">WireGuard and OpenVPN decision table</caption><thead className="bg-muted/60"><tr><th className="p-4 font-semibold">Question</th><th className="p-4 font-semibold">WireGuard</th><th className="p-4 font-semibold">OpenVPN</th><th className="p-4 font-semibold">What to record</th></tr></thead><tbody className="divide-y"><tr><td className="p-4 font-semibold">Transport</td><td className="p-4">UDP-focused</td><td className="p-4">UDP or TCP</td><td className="p-4">Protocol and port shown in the app</td></tr><tr><td className="p-4 font-semibold">Typical trade-off</td><td className="p-4">Lean, often fast and efficient</td><td className="p-4">Broader compatibility, more overhead</td><td className="p-4">Latency, throughput and battery context</td></tr><tr><td className="p-4 font-semibold">Restrictive networks</td><td className="p-4">May need a provider stealth layer</td><td className="p-4">TCP/443 or obfuscation may be available</td><td className="p-4">Connection result and failure mode</td></tr><tr><td className="p-4 font-semibold">Privacy detail</td><td className="p-4">Fixed modern primitives; review provider handling</td><td className="p-4">Configurable and mature; review provider handling</td><td className="p-4">App version, logs policy and kill-switch state</td></tr></tbody></table></div>
          </section>

          <section id="obfuscation" className="scroll-mt-24 border-y bg-muted/30 py-12 lg:py-16"><div className="container max-w-5xl"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">When networks interfere</p><h2 className="mt-3 text-3xl font-bold">Obfuscation is a compatibility layer, not invisibility</h2><p className="mt-4 leading-7 text-muted-foreground">Providers use different names for traffic-shaping or stealth features. NordVPN documents obfuscated servers as requiring OpenVPN TCP or UDP; Proton documents Stealth and alternative routing. Those pages establish that a feature exists, not that it will work on every ISP or that using it is lawful where you are.</p><div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-xl border bg-card p-5"><h3 className="font-semibold">Check the path</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Install and update the official app before you need it. Save the recovery route.</p></div><div className="rounded-xl border bg-card p-5"><h3 className="font-semibold">Check the boundary</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Know what happens if the tunnel drops; disable unsafe fallback behaviour.</p></div><div className="rounded-xl border bg-card p-5"><h3 className="font-semibold">Check the law</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use dated government or regulator guidance for the country and purpose.</p></div></div><p className="mt-6 text-sm leading-6 text-muted-foreground">Continue with our <Link href="/blog/best-vpn-for-iran-2026-bypass-internet-censorship" className="underline">Iran</Link>, <Link href="/countries/russia" className="underline">Russia</Link>, <Link href="/countries/china" className="underline">China</Link> and <Link href="/blog/best-vpn-for-telegram-2026" className="underline">Telegram</Link> evidence-led pages.</p></div></div></section>

          <section id="test-plan" className="container max-w-5xl scroll-mt-24 py-12 lg:py-16"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Reproducible check</p><h2 className="mt-3 text-3xl font-bold">Run a bounded test before you rely on a protocol</h2><p className="mt-4 leading-7 text-muted-foreground">One successful connection is a data point, not a guarantee. Record enough context to reproduce the result and to see when it changes.</p></div><ol className="space-y-3">{["Define the lawful purpose and the traffic that must not fall back outside the tunnel.","Record device, OS, app version, network/ISP, server region, protocol and date/time.","Test browsing, messaging, calls, streaming or work tools separately; features can fail differently.","Repeat after sleep, Wi-Fi/cellular hand-off and reconnect. Keep failures in the record.","Compare the notes with current provider documentation before changing your setup."].map((item, index) => <li key={item} className="grid grid-cols-[2.25rem_1fr] gap-4 border p-4"><span className="font-mono font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><span className="leading-7">{item}</span></li>)}</ol></div></section>

          <section id="faq" className="container max-w-5xl scroll-mt-24 py-12 lg:py-16"><h2 className="text-3xl font-bold">VPN protocol FAQ</h2><div className="mt-6 divide-y rounded-xl border">{faq.map((item) => <details key={item.question} className="group p-5"><summary className="cursor-pointer pr-8 font-semibold">{item.question}<ArrowRight className="float-right size-4 transition-transform group-open:rotate-90" aria-hidden="true" /></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></section>

          <section id="sources" className="container max-w-5xl scroll-mt-24 border-t py-12 lg:py-16"><h2 className="text-3xl font-bold">Sources and methodology</h2><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li><a className="underline" href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer">WireGuard project documentation</a></li><li><a className="underline" href="https://openvpn.net/community-resources/" target="_blank" rel="noopener noreferrer">OpenVPN community resources</a></li><li><a className="underline" href="https://support.nordvpn.com/hc/en-us/articles/19615332252561-Enable-or-disable-Obfuscated-servers" target="_blank" rel="noopener noreferrer">NordVPN support: obfuscated servers</a></li><li><a className="underline" href="https://protonvpn.com/support/how-to-change-vpn-protocols" target="_blank" rel="noopener noreferrer">Proton VPN support: changing protocols</a></li><li>ZeroToVPN DataForSEO dossier fetched August 11, 2026: 5 keyword-overview rows, 50 suggestions, 5 SERP/PAA samples and 19 competitor domains. Metrics prioritise structure; they do not prove technical or legal outcomes.</li></ul><div className="mt-6 flex flex-wrap gap-3"><Link href="/compare" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted">Open comparison <ArrowRight className="size-4" aria-hidden="true" /></Link><a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted">Read primary docs <ExternalLink className="size-4" aria-hidden="true" /></a></div></section>
        </article>
      </BestVpnEditorialTemplate>
    </>
  );
}
