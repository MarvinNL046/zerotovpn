import { ArrowRight, CircleAlert, ShieldCheck, SlidersHorizontal, WifiOff } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ArticleJsonLd } from "@/components/structured-data";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { AuthorBox, FactCheckedBadge } from "@/components/blog/author-box";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { IranEditorialQuickPicks } from "@/components/editorial/iran-editorial-quick-picks";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";
import type { VpnData } from "@/lib/vpn-data-layer";

const updated = "August 11, 2026";
const faq = [
  { question: "Which VPN works in China?", answer: "No provider is guaranteed to work on every Chinese network or future date. Evaluate documented anti-censorship features, prepare before travel and record a bounded test on the device and ISP that matter." },
  { question: "Do I need a VPN when visiting China?", answer: "That depends on the services, employer or school systems and communication tools you need, plus current rules. Check current travel and legal guidance; this page is not legal advice." },
  { question: "Is it legal for a foreigner to use a VPN in China?", answer: "The legal and enforcement position is complex and can change. Do not rely on a broad internet claim; check current authoritative guidance for your status, purpose and location." },
  { question: "Should I install a VPN before travelling to China?", answer: "Preparing official apps, account recovery and a fallback method before a restrictive network is prudent. It does not guarantee future access, so keep a failure-safe plan." },
  { question: "Can China detect VPN traffic?", answer: "Networks can identify or disrupt circumvention traffic in different ways. Obfuscation or stealth may change the signal, but it does not make a user anonymous or guarantee access." },
];

const clusterLinks = [
  { href: "/countries/russia", title: "VPNs for Russia", description: "Compare the same dated evidence and failure boundaries." },
  { href: "/countries/iran", title: "Iran evidence checklist", description: "Separate provider features from country-specific tests." },
  { href: "/blog/best-vpn-for-telegram-2026", title: "VPNs for Telegram", description: "Check messaging-specific routing and MTProxy limits." },
];

export function ChinaVpnEditorialPage({ vpns }: { vpns: VpnData[] }) {
  return (
    <div className="flex flex-col">
      <div className="container pt-6"><BreadcrumbSchema items={[{ name: "Countries", href: "/countries" }, { name: "VPN for China", href: "/countries/china" }]} /></div>
      <BestVpnEditorialTemplate brief={editorialContentBriefs.china} navigation={[{ href: "#article-content", label: "Article" }, { href: "#quick-picks", label: "Shortlist" }, { href: "#decision-table", label: "Compare" }, { href: "#cluster-links", label: "Cluster" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Sources" }]}> 
        <main id="article-content" className="container max-w-4xl py-8 lg:py-12">
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Country research · updated {updated}</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">VPN for China in 2026: what to verify before you connect</h1>
            <p className="mt-5 text-xl text-muted-foreground">China&apos;s internet environment is highly restricted and can change by network and time. Prepare before travel, compare the evidence and treat every VPN result as a bounded test rather than a permanent promise.</p>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6"><CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" /><p><strong>Evidence boundary:</strong> Freedom House&apos;s <a className="underline" href="https://freedomhouse.org/country/china/freedom-net/2025" target="_blank" rel="noopener noreferrer">2025 China report</a> rates the environment Not Free. It documents restrictions; it does not prove that a provider works on your network or authorise a particular use.</p></div>
            <nav id="cluster-links" aria-label="Censorship research cluster" className="mt-6 grid gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:grid-cols-3 sm:p-5">{clusterLinks.map((link) => <Link key={link.href} href={link.href} className="rounded-lg bg-background/80 p-3 hover:bg-background"><span className="block text-sm font-semibold">{link.title}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{link.description}</span></Link>)}</nav>
            <FactCheckedBadge lastUpdated={updated} />
          </div>

          <IranEditorialQuickPicks vpns={vpns} heading="Start with documented options" eyebrow="China shortlist" description="These contextual affiliate links identify providers worth evaluating. They are not proof of current connectivity in China; verify live documentation, app access, local rules and refund terms first." />

          <section id="decision-table" className="scroll-mt-24 mt-10"><h2 className="text-3xl font-bold">What to verify before choosing</h2><p className="mt-3 leading-7 text-muted-foreground">DataForSEO research returned questions about current providers, legality, travel, detection and device support. Match each decision to dated evidence.</p><div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[680px] text-left text-sm"><caption className="sr-only">China VPN decision criteria</caption><thead className="bg-muted/60"><tr><th className="p-3 font-semibold">Question</th><th className="p-3 font-semibold">Evidence to save</th><th className="p-3 font-semibold">Why it matters</th></tr></thead><tbody className="divide-y"><tr><td className="p-3">Does the app expose a stealth or obfuscation mode?</td><td className="p-3">Provider documentation, platform and app version</td><td className="p-3">A feature may differ between desktop, mobile and current releases.</td></tr><tr><td className="p-3">Can you install and update it?</td><td className="p-3">Official distribution and recovery path before travel</td><td className="p-3">Access to an account is not enough if updates or support are blocked.</td></tr><tr><td className="p-3">Does the tunnel fail safely?</td><td className="p-3">Kill-switch state, fallback behaviour and reconnect notes</td><td className="p-3">A silent fallback can expose traffic outside your intended boundary.</td></tr><tr><td className="p-3">What is the current legal position?</td><td className="p-3">Dated travel, regulator or legal guidance</td><td className="p-3">A VPN comparison page cannot provide legal authorisation.</td></tr></tbody></table></div></section>

          <section className="mt-12"><h2 className="text-3xl font-bold">A bounded China test plan</h2><ol className="mt-5 space-y-4 leading-7"><li><strong>1. Define the lawful purpose.</strong> List the apps and services you need and the data that must not fall back to the ordinary connection.</li><li><strong>2. Prepare before travel.</strong> Install official apps, verify account recovery, save offline essentials and keep a fallback communication method.</li><li><strong>3. Test one variable at a time.</strong> Record device, OS, ISP or Wi-Fi, protocol, server region, date/time and connection result.</li><li><strong>4. Test each feature.</strong> Browsing, messaging, calls, media, work tools and streaming can have different failure modes.</li><li><strong>5. Repeat after reconnect.</strong> A single successful page load is not stable access; record what fails and when.</li></ol></section>

          <section className="mt-12"><h2 className="text-3xl font-bold">Provider notes without a guarantee</h2><div className="mt-5 grid gap-4 sm:grid-cols-3"><div className="rounded-xl border p-4"><ShieldCheck className="size-5 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">NordVPN</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Its support page says obfuscated servers require OpenVPN TCP or UDP. Verify platform availability and the current app path.</p></div><div className="rounded-xl border p-4"><SlidersHorizontal className="size-5 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">Proton VPN</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Proton documents Stealth and alternative routing. Treat those as feature evidence, not a China access guarantee.</p></div><div className="rounded-xl border p-4"><WifiOff className="size-5 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">Expect disruption</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">No provider can promise permanent access across every Chinese network, date or device.</p></div></div></section>

          <section id="faq" className="scroll-mt-24 mt-12"><h2 className="text-3xl font-bold">China VPN FAQ</h2><div className="mt-5 divide-y rounded-xl border">{faq.map((item) => <details key={item.question} className="group p-4"><summary className="cursor-pointer font-semibold">{item.question}<ArrowRight className="ml-2 inline size-4 transition-transform group-open:rotate-90" aria-hidden="true" /></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></section>

          <section id="sources" className="scroll-mt-24 mt-12"><h2 className="text-3xl font-bold">Sources and methodology</h2><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li><a className="underline" href="https://freedomhouse.org/country/china/freedom-net/2025" target="_blank" rel="noopener noreferrer">Freedom House - China: Freedom on the Net 2025</a></li><li><a className="underline" href="https://www.gov.uk/foreign-travel-advice/china/safety-and-security" target="_blank" rel="noopener noreferrer">UK government travel advice - China safety and security</a></li><li><a className="underline" href="https://support.nordvpn.com/hc/en-us/articles/19615332252561-Enable-or-disable-Obfuscated-servers" target="_blank" rel="noopener noreferrer">NordVPN support - obfuscated servers</a></li><li><a className="underline" href="https://protonvpn.com/support/how-to-change-vpn-protocols" target="_blank" rel="noopener noreferrer">Proton VPN support - changing protocols</a></li><li>ZeroToVPN DataForSEO dossier: US/English keyword overview, PAA samples and competitor domains, fetched August 11, 2026.</li></ul></section>
          <AuthorBox />
        <p className="mt-6 text-sm leading-6 text-muted-foreground">For the traffic-signal question, continue with our <Link href="/guides/vpn-obfuscation-explained" className="underline">VPN obfuscation guide</Link>.</p>
        </main>
      </BestVpnEditorialTemplate>
      <FAQSchema title="China VPN FAQ" faqs={faq} />
      <ArticleJsonLd title="VPN for China in 2026: what to verify before you connect" description="Evidence-led China VPN comparison with dated sources, bounded testing and preparation guidance." datePublished="2026-08-11T00:00:00.000Z" dateModified="2026-08-11T00:00:00.000Z" url="https://www.zerotovpn.com/countries/china" />
    </div>
  );
}
