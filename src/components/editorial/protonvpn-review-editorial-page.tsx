import {
  CheckCircle2,
  FileCheck,
  Gauge,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  AffiliateButton,
  AffiliateTextLink,
} from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import {
  OfficialProviderCta,
  ProviderReviewEvidence,
  type ProviderReviewEvidenceItem,
} from "@/components/editorial/provider-review-trust";
import { getVpnById } from "@/lib/vpn-data";
import { getVpnAffiliateUrl, getVpnWebsiteUrl } from "@/lib/vpn-links";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const protonvpnReviewTitle =
  "Proton VPN Review 2026: Privacy Evidence, Free Plan and Performance";
export const protonvpnReviewDescription =
  "An evidence-led Proton VPN review covering the free plan, privacy evidence, current plan terms and a repeatable performance test plan.";

const faqs = [
  {
    question: "Is Proton VPN worth it in 2026?",
    answer:
      "It can be a good fit when a privacy-first service, a genuine free tier or Proton's wider ecosystem matters to you. Check the current plan terms, device limit and streaming rules before subscribing; that fit is not a universal recommendation.",
  },
  {
    question: "Is Proton VPN really free?",
    answer:
      "Proton offers a no-payment free plan. Its server selection, speed, device limit and streaming access differ from paid plans and can change, so use Proton's current free-plan documentation as the source of record.",
  },
  {
    question: "Does Proton VPN keep logs?",
    answer:
      "Proton publishes a no-logs policy and independent audit material. That evidence is scoped to the policy, systems and audit period described in each report; it is not a guarantee about every future change or threat model.",
  },
  {
    question: "Is Proton VPN good for streaming?",
    answer:
      "Streaming access depends on the plan, service, region, account and server. Paid-plan access can change when platforms block VPN endpoints, while the free plan is not marketed as a reliable streaming solution.",
  },
  {
    question: "How fast is Proton VPN?",
    answer:
      "Results depend on your baseline connection, protocol, route and congestion. Compare the same destination with and without the tunnel, repeat the test and record the date and app version instead of relying on one headline speed.",
  },
];

const evidenceItems: readonly ProviderReviewEvidenceItem[] = [
  {
    question: "No-logs assurance",
    evidence:
      "Proton publishes a no-logs policy and audit reports for its VPN service.",
    limit:
      "Each audit has a defined scope and period; read the report rather than treating an audit badge as a permanent guarantee.",
  },
  {
    question: "Free plan",
    evidence:
      "Proton documents a no-payment free plan with a separate feature and server policy.",
    limit:
      "Plan limits, speed and streaming access differ from paid tiers and can change.",
  },
  {
    question: "Secure Core",
    evidence:
      "Proton describes Secure Core as a multi-hop route through selected privacy-hardened locations.",
    limit:
      "Extra hops can affect speed and do not remove endpoint, account or device risks.",
  },
  {
    question: "Refund window",
    evidence:
      "Proton publishes a 30-day money-back policy for eligible subscriptions.",
    limit:
      "A refund window is not a free trial; purchase channel and renewal terms matter.",
  },
];

export function ProtonVpnReviewEditorialPage() {
  const vpn = getVpnById("protonvpn");
  if (!vpn) return null;
  const affiliateUrl = getVpnAffiliateUrl("protonvpn");
  const websiteUrl = getVpnWebsiteUrl("protonvpn");
  const price = vpn.priceTwoYear ?? vpn.priceYearly;

  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.protonvpnReview}
      disclosureText={
        affiliateUrl
          ? "Independent editorial guidance · affiliate links may earn us a commission"
          : "No paid provider link on this review"
      }
      disclosureHref={
        affiliateUrl ? "/affiliate-disclosure" : "/editorial-policy"
      }
      disclosureLabel={affiliateUrl ? "disclosure" : "editorial policy"}
      navigation={[
        { href: "#quick-picks", label: "Verdict" },
        { href: "#evidence", label: "Evidence" },
        { href: "#performance", label: "Testing" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[
            { name: "Reviews", href: "/reviews" },
            { name: "Proton VPN Review", href: "/reviews/protonvpn" },
          ]}
        />
      </div>
      <article className="container max-w-5xl py-8 lg:py-12">
        <header className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            Independent provider review
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {protonvpnReviewTitle}
          </h1>
          <p className="mt-5 text-xl text-muted-foreground">
            {protonvpnReviewDescription}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Reviewed 13 August 2026 · We separate provider statements, dated
            evidence and repeatable tests. DataForSEO informed the questions; it
            does not prove provider performance.
          </p>
          {affiliateUrl ? (
            <AffiliateDisclosure variant="card" className="mt-5 max-w-3xl" />
          ) : null}
        </header>

        <section id="quick-picks" className="scroll-mt-24">
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-3 md:items-center">
              <div className="max-w-3xl md:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Bottom line
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  A privacy-led option with a useful free starting point
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Proton VPN stands out for its privacy positioning, open-source
                  apps and free plan. The trade-offs are plan-dependent
                  features, route-dependent performance and a device limit that
                  may not suit every household.
                </p>
              </div>
              <div className="w-full text-center">
                <div className="text-3xl font-bold text-primary">
                  {affiliateUrl ? (
                    <AffiliateTextLink
                      vpnId={vpn.id}
                      vpnName={vpn.name}
                      affiliateUrl={affiliateUrl}
                      dataPriceLink
                    >
                      ${price.toFixed(2)}
                    </AffiliateTextLink>
                  ) : (
                    <span>${price.toFixed(2)}</span>
                  )}
                  <span className="text-sm font-normal text-muted-foreground">
                    /mo equivalent
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Catalog snapshot checked{" "}
                  {vpn.priceLastVerified ?? "date not recorded"}
                </p>
                {affiliateUrl ? (
                  <AffiliateButton
                    vpnId={vpn.id}
                    vpnName={vpn.name}
                    affiliateUrl={affiliateUrl}
                    className="mt-4 h-auto min-h-11 w-full whitespace-normal px-4 py-3"
                  >
                    Check current Proton VPN plans
                  </AffiliateButton>
                ) : (
                  <OfficialProviderCta
                    href={websiteUrl}
                    providerName="Proton VPN"
                    label="Check current Proton VPN plans"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="evidence" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">
            What the evidence says—and where it stops
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            The claim, source, date and limitation should be visible together.
            Re-check provider documentation before making a purchase.
          </p>
          <ProviderReviewEvidence
            caption="Proton VPN evidence and limitation checklist"
            evidenceLabel="Evidence to check"
            items={evidenceItems}
          />
        </section>

        <section id="performance" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">
            How to test Proton VPN performance yourself
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
              <Gauge className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Baseline</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Record latency, download, upload and packet loss without the
                tunnel.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Repeat</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use the same device, destination and protocol with nearby and
                long-distance exits.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <FileCheck className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Record limits</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep the date, route, plan and app version with every result.
              </p>
            </div>
          </div>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Choose the destination that matters to you, not a convenient speed-test server.",
              "Run at least three repeated measurements on and off the VPN.",
              "Check reconnects, DNS/WebRTC leaks and the kill switch separately.",
              "Test streaming or gaming access only on services and accounts you are allowed to use.",
              "Keep the service only if the measured trade-off fits your threat model and budget.",
            ].map((item, index) => (
              <li key={item} className="flex gap-3 rounded-lg border p-4">
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-green-600"
                  aria-hidden="true"
                />
                <span>
                  <strong>{index + 1}.</strong> {item}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section id="faq" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">Proton VPN FAQ</h2>
          <div className="mt-5 space-y-5">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-xl border p-5">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="mt-2 text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
          <FAQSchema title="Proton VPN FAQ" faqs={faqs} />
        </section>

        <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
          <h2 className="text-2xl font-bold">Sources and related decisions</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Primary Proton policies and audit material are the source of record.
            Our DataForSEO dossier is used for query and PAA coverage, not as
            proof of product performance.
          </p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <li>
              <a
                href="https://protonvpn.com/support/no-logs-vpn"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Proton VPN no-logs policy
              </a>
            </li>
            <li>
              <a
                href="https://protonvpn.com/support/proton-vpn-plans"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Free plan documentation
              </a>
            </li>
            <li>
              <a
                href="https://protonvpn.com/support/secure-core-vpn"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Secure Core explanation
              </a>
            </li>
            <li>
              <a
                href="https://protonvpn.com/support/cancel-vpn-subscription"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Money-back policy
              </a>
            </li>
            <li>
              <Link href="/reviews/nordvpn" className="text-primary underline">
                NordVPN review
              </Link>
            </li>
            <li>
              <Link href="/compare" className="text-primary underline">
                VPN comparison
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
