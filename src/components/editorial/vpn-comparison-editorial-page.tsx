import { CheckCircle2, CircleHelp, Scale, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  AffiliateButton,
  AffiliateTextLink,
} from "@/components/vpn/affiliate-button";
import { AffiliateDisclosure } from "@/components/vpn/affiliate-disclosure";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnAffiliateUrl, type VpnLinkSlug } from "@/lib/vpn-links";
import type { VpnData } from "@/lib/db/vpn-service";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const vpnComparisonEditorialTitle =
  "VPN Comparison 2026: Compare Price, Privacy and Device Limits";
export const vpnComparisonEditorialDescription =
  "Compare VPN providers by dated plan snapshots, refund terms, device limits, protocols and privacy evidence—not unsupported universal winner claims.";

const faqs = [
  {
    question: "Which VPN is actually the best?",
    answer:
      "There is no universal winner. Start with your use case, then compare current price and renewal terms, device coverage, privacy evidence and the route you can test on your own devices.",
  },
  {
    question: "What are the top three VPNs?",
    answer:
      "A useful shortlist depends on the decision. The comparison below shows commercial starting points, not an absolute ranking; open each provider's current terms and review before subscribing.",
  },
  {
    question: "Why should I avoid a VPN?",
    answer:
      "A VPN adds another trusted intermediary, can change routing and may affect local services. It is not necessary for every network or threat model, so compare the trade-offs before buying.",
  },
  {
    question: "Will Netflix ban me if I use a VPN?",
    answer:
      "Streaming platforms can restrict or change access when they detect VPN traffic. Results vary by catalogue and server; follow the platform terms and do not treat a VPN as a licence to bypass restrictions.",
  },
  {
    question: "Should I choose the cheapest VPN?",
    answer:
      "Price is only one input. Check the introductory period, renewal price, refund eligibility, device limit, privacy evidence and support before treating a plan as good value.",
  },
];

type ComparisonRow = { label: string; value: (vpn: VpnData) => string };
const rows: ComparisonRow[] = [
  {
    label: "Catalog price",
    value: (vpn) =>
      `$${(vpn.priceTwoYear ?? vpn.priceYearly).toFixed(2)}/mo equivalent`,
  },
  {
    label: "Price checked",
    value: (vpn) => vpn.priceLastVerified ?? "Not recorded",
  },
  {
    label: "Money-back window",
    value: (vpn) =>
      vpn.moneyBackDays ? `${vpn.moneyBackDays} days` : "Check terms",
  },
  {
    label: "Simultaneous connections",
    value: (vpn) =>
      vpn.maxDevices >= 999
        ? "Provider wording varies"
        : String(vpn.maxDevices),
  },
  {
    label: "Free tier",
    value: (vpn) =>
      vpn.freeTier ? "Available—check limits" : "Not listed in catalog",
  },
  {
    label: "Protocols in catalog",
    value: (vpn) => vpn.protocols.join(", ") || "Check provider",
  },
];

const trackedAffiliateUrl = (id: string) =>
  getVpnAffiliateUrl(id as VpnLinkSlug);

export function VpnComparisonEditorialPage({ vpns }: { vpns: VpnData[] }) {
  const shortlist = [...vpns]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 5);
  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.vpnComparison}
      navigation={[
        { href: "#shortlist", label: "Shortlist" },
        { href: "#comparison", label: "Compare" },
        { href: "#method", label: "Method" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="container pt-6">
        <BreadcrumbSchema
          items={[{ name: "Compare VPNs", href: "/compare" }]}
        />
      </div>
      <article className="container max-w-6xl py-8 lg:py-12">
        <header className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            Evidence-led comparison
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {vpnComparisonEditorialTitle}
          </h1>
          <p className="mt-5 text-xl text-muted-foreground">
            {vpnComparisonEditorialDescription}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Reviewed 13 August 2026 · Catalog values are snapshots; provider
            terms, prices and availability can change.
          </p>
          <AffiliateDisclosure variant="card" className="mt-5 max-w-3xl" />
        </header>

        <section id="shortlist" className="scroll-mt-24">
          <div className="flex items-center gap-3">
            <Scale className="size-7 text-primary" aria-hidden="true" />
            <div>
              <h2 className="text-3xl font-bold">Commercial starting points</h2>
              <p className="mt-2 text-muted-foreground">
                These providers are a shortlist for comparison, not a claim that
                one service is best for every reader.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shortlist.slice(0, 3).map((vpn) => {
              const price = vpn.priceTwoYear ?? vpn.priceYearly;
              const affiliateUrl = trackedAffiliateUrl(vpn.id);
              return (
                <article
                  key={vpn.id}
                  className="rounded-xl border bg-card p-5 shadow-sm"
                >
                  <h3 className="text-xl font-semibold">{vpn.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Review the current plan, privacy evidence and device wording
                    for your use case.
                  </p>
                  <div className="mt-4 text-2xl font-bold text-primary">
                    <AffiliateTextLink
                      vpnId={vpn.id}
                      vpnName={vpn.name}
                      affiliateUrl={affiliateUrl}
                      dataPriceLink
                    >
                      ${price.toFixed(2)}
                    </AffiliateTextLink>
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      /mo equivalent
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Catalog checked{" "}
                    {vpn.priceLastVerified ?? "date not recorded"}; verify
                    checkout and renewal.
                  </p>
                  <AffiliateButton
                    vpnId={vpn.id}
                    vpnName={vpn.name}
                    affiliateUrl={affiliateUrl}
                    className="mt-4 w-full"
                  >
                    Check {vpn.name}
                  </AffiliateButton>
                  <Link
                    href={`/reviews/${vpn.slug}`}
                    className="mt-3 block text-center text-sm text-primary underline"
                  >
                    Read the {vpn.name} review
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section id="comparison" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">Compare the decision criteria</h2>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            The table exposes the source field and its limitation. Scores and
            universal “fastest” labels are intentionally excluded unless they
            are backed by a dated, reproducible test record.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[900px] text-left text-sm">
              <caption className="sr-only">
                VPN provider comparison by price, terms and device criteria
              </caption>
              <thead className="bg-muted/60">
                <tr>
                  <th scope="col" className="sticky left-0 bg-muted/60 p-4">
                    Criterion
                  </th>
                  {shortlist.map((vpn) => (
                    <th scope="col" key={vpn.id} className="p-4 text-center">
                      {vpn.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t">
                    <th
                      scope="row"
                      className="sticky left-0 bg-background p-4 font-semibold"
                    >
                      {row.label}
                    </th>
                    {shortlist.map((vpn) => (
                      <td key={vpn.id} className="p-4 text-center">
                        {row.label === "Catalog price" ? (
                          <AffiliateTextLink
                            vpnId={vpn.id}
                            vpnName={vpn.name}
                            affiliateUrl={trackedAffiliateUrl(vpn.id)}
                            dataPriceLink
                            className="font-semibold text-primary underline"
                          >
                            {row.value(vpn)}
                          </AffiliateTextLink>
                        ) : (
                          row.value(vpn)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="method" className="mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold">How to use this comparison</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
              <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Check evidence</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Read policy, audit scope, jurisdiction and app documentation
                together.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <CircleHelp className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">Match the use case</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A mobile, gaming, travel or privacy decision can produce a
                different shortlist.
              </p>
            </div>
            <div className="rounded-xl border p-5">
              <CheckCircle2
                className="size-6 text-primary"
                aria-hidden="true"
              />
              <h3 className="mt-3 font-semibold">Verify at checkout</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Confirm introductory price, renewal, refund and device terms
                before subscribing.
              </p>
            </div>
          </div>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Define the network, device and privacy problem you want to solve.",
              "Record the current plan and renewal terms from the provider source.",
              "Test the route, reconnect behaviour and app compatibility on your device.",
              "Recheck the policy and price when the provider changes its offer.",
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
          <h2 className="text-3xl font-bold">VPN comparison FAQ</h2>
          <div className="mt-5 space-y-5">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-xl border p-5">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="mt-2 text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
          <FAQSchema title="VPN comparison FAQ" faqs={faqs} />
        </section>

        <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
          <h2 className="text-2xl font-bold">Sources and next comparisons</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            DataForSEO informed comparison and PAA question coverage. Catalog
            values come from the site data layer and must be checked at source
            before purchase.
          </p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <li>
              <Link href="/best/best-vpn" className="text-primary underline">
                Best VPN pillar
              </Link>
            </li>
            <li>
              <Link href="/best/vpn-cheap" className="text-primary underline">
                Cheap VPN value guide
              </Link>
            </li>
            <li>
              <Link href="/best/vpn-privacy" className="text-primary underline">
                Privacy evidence comparison
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
