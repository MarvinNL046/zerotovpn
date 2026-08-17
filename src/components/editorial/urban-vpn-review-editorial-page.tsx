import { AlertTriangle, FileCheck, Link2, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnById } from "@/lib/vpn-data";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const urbanVpnReviewTitle =
  "Urban VPN Review 2026: Free Plan, Privacy Risks and Safer Alternatives";
export const urbanVpnReviewDescription =
  "An evidence-led Urban VPN review that separates the free-plan claims, privacy-policy questions, browser-extension reporting and safer VPN alternatives.";

const faqs = [
  {
    question: "Is Urban VPN safe to use in 2026?",
    answer:
      "We would not treat Urban VPN as a safe default without first checking the current privacy policy, app permissions, network model and kill-switch behavior on your device. A free price is not evidence that a VPN protects your data.",
  },
  {
    question: "Is Urban VPN really free?",
    answer:
      "Urban VPN has offered a free tier, but the current feature, server and data-use terms should be checked on its own site before installation. Read what the service receives in exchange for the free plan.",
  },
  {
    question: "Does Urban VPN collect or sell data?",
    answer:
      "The answer depends on the current privacy policy, app and region. Read the policy's definitions of IP address, browsing activity, device identifiers, sharing and retention; do not infer a no-logs guarantee from the word VPN.",
  },
  {
    question: "What happened with Urban VPN browser extensions?",
    answer:
      "Koi Security reported in December 2025 that a browser extension associated with Urban VPN collected AI-chat conversations. That report is a dated incident to investigate, not proof that every current Urban VPN app behaves identically; check the current extension availability and permissions.",
  },
  {
    question: "What is a safer free VPN alternative?",
    answer:
      "Compare a provider's current free-plan limits, privacy policy, protocol, kill switch and audit evidence. Proton VPN's free plan is a useful comparison point; its current limits and availability should still be verified before use.",
  },
];

export function UrbanVpnReviewEditorialPage() {
  const urban = getVpnById("urbanvpn");
  const proton = getVpnById("protonvpn");
  const nord = getVpnById("nordvpn");
  if (!urban || !proton || !nord) return null;
  const protonAffiliateUrl = getVpnAffiliateUrl("protonvpn");
  const nordAffiliateUrl = getVpnAffiliateUrl("nordvpn");

  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.urbanVpnReview}
      navigation={[
        { href: "#quick-picks", label: "Verdict" },
        { href: "#evidence", label: "Evidence" },
        { href: "#alternatives", label: "Alternatives" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[
            { name: "Reviews", href: "/reviews" },
            { name: "Urban VPN Review", href: "/reviews/urban-vpn" },
          ]}
        />
      </div>
      <article className="container max-w-5xl py-8 lg:py-12">
        <header className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            Independent provider review
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {urbanVpnReviewTitle}
          </h1>
          <p className="mt-5 text-xl text-muted-foreground">
            {urbanVpnReviewDescription}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Reviewed 13 August 2026 · We distinguish first-party terms, dated
            security reporting and questions that still require a device-level
            check. DataForSEO informed the questions; it does not prove safety
            or performance.
          </p>
          <AffiliateDisclosure variant="card" className="mt-5 max-w-3xl" />
        </header>

        <section id="quick-picks" className="scroll-mt-24">
          <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-50/70 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle
                className="mt-1 size-7 shrink-0 text-amber-700"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
                  Bottom line
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  Free does not answer the privacy question
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Urban VPN&apos;s free offer deserves a careful policy and
                  permissions check before installation. The key decision is
                  what network access and data collection you accept, not only
                  the subscription price. We do not use Urban VPN&apos;s free
                  label as evidence of safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="evidence" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">Urban VPN evidence checklist</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            These are the questions that should be answered from the current
            app, policy and incident reports. Where evidence is incomplete,
            treat that uncertainty as a decision factor.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[860px] text-left text-sm">
              <caption className="sr-only">
                Urban VPN evidence and limitation checklist
              </caption>
              <thead className="bg-muted/60">
                <tr>
                  <th scope="col" className="p-4">
                    Question
                  </th>
                  <th scope="col" className="p-4">
                    Evidence to inspect
                  </th>
                  <th scope="col" className="p-4">
                    Decision limit
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <th scope="row" className="p-4 font-semibold">
                    What is the network model?
                  </th>
                  <td className="p-4">
                    The current product description and app permissions should
                    say whether traffic uses dedicated infrastructure, peer
                    nodes or both.
                  </td>
                  <td className="p-4">
                    A peer or residential exit can associate other users&apos;
                    activity with your connection; verify the model before use.
                  </td>
                </tr>
                <tr className="border-t">
                  <th scope="row" className="p-4 font-semibold">
                    What data is collected?
                  </th>
                  <td className="p-4">
                    Read the current privacy policy definitions for IP address,
                    browsing activity, identifiers, sharing, retention and
                    deletion.
                  </td>
                  <td className="p-4">
                    A marketing claim such as “private” does not override the
                    legal policy or regional disclosures.
                  </td>
                </tr>
                <tr className="border-t">
                  <th scope="row" className="p-4 font-semibold">
                    What happened to extensions?
                  </th>
                  <td className="p-4">
                    Koi Security&apos;s December 2025 report describes a
                    browser-extension data-collection incident associated with
                    Urban VPN.
                  </td>
                  <td className="p-4">
                    A dated report needs current extension availability, version
                    and permission checks; do not generalize it to every app.
                  </td>
                </tr>
                <tr className="border-t">
                  <th scope="row" className="p-4 font-semibold">
                    Can the tunnel fail safely?
                  </th>
                  <td className="p-4">
                    Test the kill switch, DNS/WebRTC leaks and reconnect
                    behavior on the exact OS and plan you would use.
                  </td>
                  <td className="p-4">
                    If a feature is absent or unverified, do not use the service
                    for sensitive sessions or accounts.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="alternatives" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">Safer comparison points</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            If you are evaluating Urban VPN because it is free, compare the
            evidence and limits below before signing in or installing an
            extension.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border bg-card p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  className="size-6 text-primary"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold">{proton.name}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                A free-plan comparison point with published privacy
                documentation and a conventional VPN app model. Check its
                current free locations, device limit and streaming boundaries.
              </p>
              <AffiliateButton
                vpnId={proton.id}
                vpnName={proton.name}
                affiliateUrl={protonAffiliateUrl}
                className="mt-5 w-full"
              >
                Check {proton.name} plans
              </AffiliateButton>
            </article>
            <article className="rounded-xl border bg-card p-5">
              <div className="flex items-center gap-3">
                <FileCheck className="size-6 text-primary" aria-hidden="true" />
                <h3 className="text-xl font-semibold">{nord.name}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                A paid comparison point when you need broader app coverage and
                documented plan terms. Read the evidence-led review before
                deciding whether the trade-off fits.
              </p>
              <AffiliateButton
                vpnId={nord.id}
                vpnName={nord.name}
                affiliateUrl={nordAffiliateUrl}
                className="mt-5 w-full"
              >
                Check {nord.name} plans
              </AffiliateButton>
            </article>
          </div>
        </section>

        <section id="faq" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">Urban VPN FAQ</h2>
          <div className="mt-5 space-y-5">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-xl border p-5">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="mt-2 text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
          <FAQSchema title="Urban VPN FAQ" faqs={faqs} />
        </section>

        <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
          <h2 className="text-2xl font-bold">Sources and related decisions</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Read the current provider terms alongside dated incident reporting.
            The DataForSEO dossier informs query and PAA coverage; it does not
            establish a security verdict.
          </p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <li>
              <a
                href="https://www.urban-vpn.com/privacy/"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Urban VPN privacy policy
              </a>
            </li>
            <li>
              <a
                href="https://www.urban-vpn.com/pricing/"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Urban VPN plan page
              </a>
            </li>
            <li>
              <a
                href="https://www.koi.ai/blog/urban-vpn-browser-extension-ai-conversations-data-collection"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Koi Security incident report
              </a>
            </li>
            <li>
              <Link
                href="/reviews/protonvpn"
                className="text-primary underline"
              >
                Proton VPN review
              </Link>
            </li>
            <li>
              <Link href="/reviews/nordvpn" className="text-primary underline">
                NordVPN review
              </Link>
            </li>
            <li>
              <Link href="/best/free-vpn" className="text-primary underline">
                Free VPN comparison
              </Link>
            </li>
            <li>
              <Link href="/methodology" className="text-primary underline">
                ZeroToVPN methodology
              </Link>
            </li>
            <li>
              <Link
                href="/affiliate-disclosure"
                className="text-primary underline"
              >
                Affiliate disclosure
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </BestVpnEditorialTemplate>
  );
}
