import { CheckCircle2, Link2, Scale, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";
import { getVpnById } from "@/lib/vpn-data";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const protonAirvpnComparisonTitle = "Proton VPN vs AirVPN (August 2026): Privacy, Price and Port Forwarding";
export const protonAirvpnComparisonDescription = "Compare Proton VPN and AirVPN by privacy evidence, current plan terms, apps and port forwarding. Use the trade-offs—not a universal winner claim—to choose what to verify.";

const faqs = [
  {
    question: "Is Proton VPN better than AirVPN?",
    answer: "Neither is universally better. Proton VPN is the broader everyday comparison path when polished apps, a free tier and independently published privacy evidence matter. AirVPN is the specialist path when open-source tooling, granular control and port forwarding matter more. Confirm the current terms and your device workflow before subscribing.",
  },
  {
    question: "Which is cheaper, Proton VPN or AirVPN?",
    answer: "The answer depends on the plan length, currency, introductory offer and renewal terms. Compare the current checkout totals rather than relying on a monthly equivalent. This page records catalog snapshots and does not treat a temporary promotion as a permanent price.",
  },
  {
    question: "Does AirVPN have port forwarding that Proton VPN does not?",
    answer: "AirVPN documents port forwarding as a core feature. Proton VPN also documents paid-plan port forwarding with its own limits. Read each provider's current support page and verify the exact account, server and protocol conditions before relying on an inbound service.",
  },
  {
    question: "Which provider is better for streaming?",
    answer: "Streaming access changes by service, region, account and server. Neither provider should be treated as a permanent streaming guarantee. Test the platform you are allowed to use during the applicable refund window and follow its terms.",
  },
  {
    question: "Which one is better for privacy?",
    answer: "Both publish privacy and technical documentation, but the evidence has different scope. Proton VPN publishes policy and audit material; AirVPN publishes policy, open-source client code and technical documentation. Compare the date, scope and independence of each source instead of converting them into a single score.",
  },
];

type Criterion = {
  label: string;
  proton: string;
  airvpn: string;
  limit: string;
};

const criteria: Criterion[] = [
  {
    label: "Best fit",
    proton: "Broader everyday use, polished apps and a free starting point",
    airvpn: "Technically confident users who want control and port forwarding",
    limit: "Fit depends on device, threat model and workflow.",
  },
  {
    label: "Privacy evidence",
    proton: "Published no-logs policy and audit material",
    airvpn: "Published privacy policy, open-source Eddie client and technical documentation",
    limit: "A policy, source-code review or audit has a defined scope; none is a permanent guarantee.",
  },
  {
    label: "Port forwarding",
    proton: "Available on eligible paid plans; check current limits",
    airvpn: "Documented as a core feature; check current account limits",
    limit: "Confirm server, protocol and account conditions before relying on inbound connections.",
  },
  {
    label: "Apps and setup",
    proton: "Native apps and a comparatively guided workflow",
    airvpn: "Eddie and configuration options expose more technical control",
    limit: "App availability and usability can change; test your actual device.",
  },
  {
    label: "Streaming",
    proton: "Plan- and server-dependent; no permanent guarantee",
    airvpn: "Unreliable for streaming; test the specific service if it matters",
    limit: "Platforms can block VPN traffic and change their rules.",
  },
];

export function ProtonAirvpnComparisonEditorialPage() {
  const proton = getVpnById("protonvpn");
  const airvpn = getVpnById("airvpn");
  if (!proton || !airvpn) return null;

  const protonAffiliateUrl = getVpnAffiliateUrl("protonvpn");
  const protonPrice = proton.priceTwoYear ?? proton.priceYearly;

  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.protonAirvpnComparison}
      navigation={[
        { href: "#decision", label: "Decision" },
        { href: "#comparison", label: "Criteria" },
        { href: "#method", label: "How to verify" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[
            { name: "Compare VPNs", href: "/compare" },
            { name: "Proton VPN vs AirVPN", href: "/compare/protonvpn-vs-airvpn" },
          ]}
        />
      </div>

      <main className="container max-w-6xl py-8 lg:py-12">
        <header className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Evidence-led comparison</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{protonAirvpnComparisonTitle}</h1>
          <p className="mt-5 text-xl text-muted-foreground">{protonAirvpnComparisonDescription}</p>
          <p className="mt-4 text-sm text-muted-foreground">Reviewed 13 August 2026 · Catalog values are snapshots; provider terms, prices and availability can change.</p>
          <AffiliateDisclosure variant="card" className="mt-5 max-w-3xl" />
        </header>

        <section id="decision" className="scroll-mt-24">
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Scale className="mt-1 size-7 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Decision snapshot</p>
                <h2 className="mt-2 text-3xl font-bold">Choose the trade-off that matches your workflow</h2>
                <p className="mt-3 text-muted-foreground">Proton VPN is the broader everyday option when app polish, a free starting point and published audit material matter. AirVPN is the specialist option when open-source tooling, granular control and port forwarding matter. These are decision boundaries, not performance guarantees.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border bg-card p-6">
              <h3 className="text-2xl font-semibold">Choose Proton VPN when</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" />You want a more guided app experience across common devices.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" />A no-payment starting point and published audit material are useful to your decision.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" />You can verify whether the current paid plan meets your device and streaming needs.</li>
              </ul>
              <div className="mt-6 text-2xl font-bold text-primary">
                <AffiliateTextLink vpnId={proton.id} vpnName={proton.name} affiliateUrl={protonAffiliateUrl} dataPriceLink>
                  ${protonPrice.toFixed(2)}
                </AffiliateTextLink>
                <span className="ml-1 text-sm font-normal text-muted-foreground">/mo equivalent</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Catalog snapshot checked {proton.priceLastVerified ?? "date not recorded"}; verify checkout and renewal.</p>
              <AffiliateButton vpnId={proton.id} vpnName={proton.name} affiliateUrl={protonAffiliateUrl} className="mt-4 w-full">Check current Proton VPN plans</AffiliateButton>
            </article>

            <article className="rounded-xl border bg-card p-6">
              <h3 className="text-2xl font-semibold">Choose AirVPN when</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" />Port forwarding and detailed connection control are requirements.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" />You are comfortable checking technical documentation and configuring the client.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" />Streaming and a polished mobile workflow are not your primary reason to subscribe.</li>
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">AirVPN is not an approved ZeroToVPN affiliate destination. We link to its first-party evidence for research and do not add a commercial AirVPN CTA.</p>
              <Link href="/reviews/airvpn" className="mt-4 inline-flex text-sm font-semibold text-primary underline">Read the AirVPN evidence review</Link>
            </article>
          </div>
        </section>

        <section id="comparison" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">Proton VPN vs AirVPN criteria</h2>
          <p className="mt-3 max-w-4xl text-muted-foreground">The table keeps the claim, evidence boundary and decision limit together. It intentionally excludes fixed scores, lab percentages and universal winner labels.</p>
          <div className="mt-6 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[980px] text-left text-sm">
              <caption className="sr-only">Proton VPN and AirVPN comparison by decision criteria</caption>
              <thead className="bg-muted/60"><tr><th scope="col" className="sticky left-0 bg-muted/60 p-4">Criterion</th><th scope="col" className="p-4">Proton VPN</th><th scope="col" className="p-4">AirVPN</th><th scope="col" className="p-4">Limit</th></tr></thead>
              <tbody>{criteria.map((criterion) => <tr key={criterion.label} className="border-t"><th scope="row" className="sticky left-0 bg-background p-4 font-semibold">{criterion.label}</th><td className="p-4">{criterion.proton}</td><td className="p-4">{criterion.airvpn}</td><td className="p-4 text-muted-foreground">{criterion.limit}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section id="method" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">How to verify the choice</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5"><ShieldCheck className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">Read the scope</h3><p className="mt-2 text-sm text-muted-foreground">Open each provider policy, audit or technical page and note its date and defined scope.</p></div>
            <div className="rounded-xl border p-5"><Scale className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">Test your device</h3><p className="mt-2 text-sm text-muted-foreground">Compare reconnects, DNS/WebRTC exposure, protocol support and the workflow you actually need.</p></div>
            <div className="rounded-xl border p-5"><CheckCircle2 className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">Verify checkout</h3><p className="mt-2 text-sm text-muted-foreground">Confirm price, renewal, refund eligibility, device limits and port-forwarding conditions before subscribing.</p></div>
          </div>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">{[
            "Write down the network, device and privacy problem you want to solve.",
            "Record the plan, renewal and refund terms from the current provider source.",
            "Run the same baseline and tunnel tests on the exact device and destination.",
            "Recheck app, streaming and port-forwarding conditions before relying on them.",
          ].map((item, index) => <li key={item} className="flex gap-3 rounded-lg border p-4"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" /><span><strong>{index + 1}.</strong> {item}</span></li>)}</ol>
        </section>

        <section id="faq" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">Proton VPN vs AirVPN FAQ</h2>
          <div className="mt-5 space-y-5">{faqs.map((item) => <div key={item.question} className="rounded-xl border p-5"><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-muted-foreground">{item.answer}</p></div>)}</div>
          <FAQSchema title="Proton VPN vs AirVPN FAQ" faqs={faqs} />
        </section>

        <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
          <h2 className="text-2xl font-bold">Sources and related decisions</h2>
          <p className="mt-2 text-sm text-muted-foreground">DataForSEO informed query and PAA coverage. Provider pages and the ZeroToVPN methodology are the source of record for current terms; search data is not evidence of safety, speed or conversion value.</p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <li><a href="https://protonvpn.com/support/no-logs-vpn" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />Proton VPN no-logs policy</a></li>
            <li><a href="https://protonvpn.com/support/proton-vpn-free-plan" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />Proton VPN free-plan documentation</a></li>
            <li><a href="https://protonvpn.com/support/port-forwarding" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />Proton VPN port-forwarding support</a></li>
            <li><a href="https://airvpn.org/privacy/" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />AirVPN privacy notice</a></li>
            <li><a href="https://airvpn.org/faq/port_forwarding/" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary underline"><Link2 className="size-4" aria-hidden="true" />AirVPN port-forwarding FAQ</a></li>
            <li><Link href="/reviews/protonvpn" className="text-primary underline">Proton VPN review</Link></li>
            <li><Link href="/reviews/airvpn" className="text-primary underline">AirVPN review</Link></li>
            <li><Link href="/best/vpn-privacy" className="text-primary underline">Privacy VPN guide</Link></li>
            <li><Link href="/best/vpn-port-forwarding" className="text-primary underline">Port-forwarding VPN guide</Link></li>
            <li><Link href="/methodology" className="text-primary underline">ZeroToVPN methodology</Link></li>
            <li><Link href="/affiliate-disclosure" className="text-primary underline">Affiliate disclosure</Link></li>
          </ul>
        </section>
      </main>
    </BestVpnEditorialTemplate>
  );
}
