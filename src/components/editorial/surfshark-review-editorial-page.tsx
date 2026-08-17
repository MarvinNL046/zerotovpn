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

export const surfsharkReviewTitle =
  "Surfshark Review 2026: Privacy Evidence, Unlimited Devices and Price";
export const surfsharkReviewDescription =
  "An evidence-led Surfshark review covering the no-logs assurance scope, unlimited connections, current plan terms and repeatable performance checks.";

const faqs = [
  {
    question: "Is Surfshark worth it in 2026?",
    answer:
      "It can be a useful fit when unlimited household connections and a lower long-term catalog price matter. Compare renewal terms, privacy evidence, app support and your own routes before subscribing; that fit is not a universal recommendation.",
  },
  {
    question: "Does Surfshark keep logs?",
    answer:
      "Surfshark publishes a no-logs policy and assurance material. Read the scope, systems and fieldwork dates in the current report; an assurance engagement is point-in-time evidence, not a guarantee about every future change.",
  },
  {
    question: "How many devices can use Surfshark?",
    answer:
      "Surfshark markets unlimited simultaneous connections. Confirm the current fair-use, account, router and platform terms because unlimited connections do not mean every device has the same app or feature support.",
  },
  {
    question: "Does Surfshark offer a free trial?",
    answer:
      "A 30-day money-back policy is not the same as a free trial. Check the current refund policy, purchase channel and renewal terms before treating a subscription as a test.",
  },
  {
    question: "How fast is Surfshark?",
    answer:
      "Speed depends on the baseline connection, protocol, route, server load and destination. Repeat the same measurements on and off the tunnel and record date, app version and plan instead of relying on one headline figure.",
  },
];

const evidenceItems: readonly ProviderReviewEvidenceItem[] = [
  {
    question: "No-logs assurance",
    evidence:
      "Surfshark publishes a no-logs policy and independent assurance material through its trust information.",
    limit:
      "Read the report's scope and fieldwork dates; it is not a permanent guarantee or proof of every app behavior.",
  },
  {
    question: "Unlimited connections",
    evidence:
      "Surfshark markets unlimited simultaneous connections for its VPN service.",
    limit:
      "Confirm the exact platform, router, account and fair-use terms for your household.",
  },
  {
    question: "Plan economics",
    evidence:
      "The catalog snapshot records an introductory equivalent price and a separate monthly price.",
    limit:
      "Renewal pricing, taxes, add-ons and billing cycle can change; compare total cost, not only the headline monthly figure.",
  },
  {
    question: "Streaming and CleanWeb",
    evidence:
      "Surfshark documents CleanWeb and streaming features as product capabilities.",
    limit:
      "Platform access and ad/tracker blocking vary by app, service, region and endpoint; test only within the service rules.",
  },
];

export function SurfsharkReviewEditorialPage() {
  const vpn = getVpnById("surfshark");
  if (!vpn) return null;
  const affiliateUrl = getVpnAffiliateUrl("surfshark");
  const websiteUrl = getVpnWebsiteUrl("surfshark");
  const price = vpn.priceTwoYear ?? vpn.priceYearly;

  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.surfsharkReview}
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
            { name: "Surfshark Review", href: "/reviews/surfshark" },
          ]}
        />
      </div>
      <article className="container max-w-5xl py-8 lg:py-12">
        <header className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            Independent provider review
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {surfsharkReviewTitle}
          </h1>
          <p className="mt-5 text-xl text-muted-foreground">
            {surfsharkReviewDescription}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Reviewed 13 August 2026 · We separate provider statements, dated
            assurance evidence and repeatable tests. DataForSEO informed the
            questions; it does not prove provider performance.
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
                  A practical household option when the terms fit
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Surfshark&apos;s main differentiator is unlimited simultaneous
                  connections, paired with a published privacy position and
                  broad consumer app coverage. The trade-offs are renewal
                  pricing, route-dependent performance and the limits of any
                  point-in-time assurance.
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
                    Check current Surfshark plans
                  </AffiliateButton>
                ) : (
                  <OfficialProviderCta
                    href={websiteUrl}
                    providerName="Surfshark"
                    label="Check current Surfshark plans"
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
            Keep the claim, source, date and limitation visible together.
            Re-check the provider&apos;s current terms before purchase.
          </p>
          <ProviderReviewEvidence
            caption="Surfshark evidence and limitation checklist"
            evidenceLabel="Dated evidence"
            items={evidenceItems}
          />
        </section>

        <section id="performance" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">
            How to test Surfshark performance yourself
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
          <h2 className="text-3xl font-bold">Surfshark FAQ</h2>
          <div className="mt-5 space-y-5">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-xl border p-5">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="mt-2 text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
          <FAQSchema title="Surfshark FAQ" faqs={faqs} />
        </section>

        <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
          <h2 className="text-2xl font-bold">Sources and related decisions</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Primary Surfshark policies and assurance material are the source of
            record. Our DataForSEO dossier is used for query and PAA coverage,
            not as proof of product performance.
          </p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <li>
              <a
                href="https://surfshark.com/features/no-logs"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Surfshark no-logs evidence
              </a>
            </li>
            <li>
              <a
                href="https://surfshark.com/features/multiple-devices"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Unlimited-device guidance
              </a>
            </li>
            <li>
              <a
                href="https://surfshark.com/features/clean-web"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                CleanWeb feature page
              </a>
            </li>
            <li>
              <a
                href="https://support.surfshark.com/hc/en-us/articles/360003103653-What-is-Surfshark-s-refund-policy"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary underline"
              >
                <Link2 className="size-4" aria-hidden="true" />
                Refund policy
              </a>
            </li>
            <li>
              <Link href="/reviews/nordvpn" className="text-primary underline">
                NordVPN review
              </Link>
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
              <Link href="/compare" className="text-primary underline">
                VPN comparison
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
