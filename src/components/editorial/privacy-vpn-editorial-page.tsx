import {
  CheckCircle2,
  CircleAlert,
  Eye,
  FileCheck,
  Globe2,
  LockKeyhole,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  AffiliateButton,
  AffiliateTextLink,
} from "@/components/vpn/affiliate-button";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnById } from "@/lib/vpn-data";
import { getVpnAffiliateUrl, type VpnLinkSlug } from "@/lib/vpn-links";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const privacyVpnEditorialTitle =
  "Best VPNs for Privacy in 2026: Compare No-Logs Evidence and Threat Models";
export const privacyVpnEditorialDescription =
  "Compare privacy-focused VPNs by logging evidence, jurisdiction, app transparency, payment choices and failure boundaries—not promises of anonymity.";

export const privacyVpnEditorialFaq = [
  {
    question: "What is the most secure VPN for privacy?",
    answer:
      "There is no universal most-secure provider. Compare the threat model, current privacy policy, independent evidence, app transparency, jurisdiction and operational features that matter for your use case.",
  },
  {
    question: "Which VPN is truly private or anonymous?",
    answer:
      "No VPN makes you completely anonymous. A VPN changes the network path, while accounts, browser fingerprinting, device permissions and malware can still identify activity. Use layered controls that match your risk.",
  },
  {
    question: "Do VPN providers keep logs?",
    answer:
      "Policies and technical practices differ, and a policy alone is not proof of implementation. Look for dated audits, transparency reporting, court history and clear definitions of connection, activity and diagnostic data.",
  },
  {
    question: "Can the FBI or another investigator see through a VPN?",
    answer:
      "A VPN is not a shield from lawful investigation or account-level identification. An investigator may use provider-held data, platform accounts, endpoint evidence or other legal process; do not treat a VPN as an invisibility tool.",
  },
  {
    question: "Is using a VPN really private?",
    answer:
      "It can reduce what a local network or ISP sees about the connection path, but it moves trust to the VPN provider and does not remove tracking inside logged-in services or apps.",
  },
];

const providers = [
  {
    id: "mullvad",
    label: "Minimise account data",
    note: "Inspect account creation, payment choices and the provider's current audit and retention evidence.",
  },
  {
    id: "protonvpn",
    label: "Open-source evidence",
    note: "Compare app transparency, privacy policy scope, jurisdiction and the current plan limits.",
  },
  {
    id: "nordvpn",
    label: "Audited commercial option",
    note: "Review the dated audit scope, policy definitions and plan terms instead of treating an audit badge as a guarantee.",
  },
] as const satisfies ReadonlyArray<{
  id: VpnLinkSlug;
  label: string;
  note: string;
}>;

export function PrivacyVpnEditorialPage() {
  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.privacyVpn}
      navigation={[
        { href: "#quick-picks", label: "Options" },
        { href: "#comparison", label: "Compare evidence" },
        { href: "#threat-model", label: "Threat model" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="flex flex-col">
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Best VPNs", href: "/best/best-vpn" },
              { name: "Privacy VPNs", href: "/best/vpn-privacy" },
            ]}
          />
        </div>
        <article className="container max-w-5xl py-8 lg:py-12">
          <header className="mb-10 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Privacy evidence decision guide
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {privacyVpnEditorialTitle}
            </h1>
            <p className="mt-5 text-xl text-muted-foreground">
              {privacyVpnEditorialDescription}
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6">
              <CircleAlert
                className="mt-0.5 size-5 shrink-0 text-amber-700"
                aria-hidden="true"
              />
              <p>
                <strong>Privacy boundary:</strong> a VPN can reduce network-path
                visibility, but it cannot promise anonymity, erase account data
                or override lawful process. Evaluate evidence against your own
                threat model.
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Reviewed 13 August 2026 · DataForSEO surfaced questions about
              no-logs, anonymity, investigations and privacy legality; it does
              not prove provider behaviour.
            </p>
          </header>

          <section id="quick-picks" className="scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Privacy-focused providers to verify
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              These are commercial starting points, not a ranking of absolute
              anonymity. Open each provider&apos;s current policy and evidence
              before subscribing.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {providers.map((provider) => {
                const vpn = getVpnById(provider.id);
                if (!vpn) return null;
                const price = vpn.priceTwoYear ?? vpn.priceYearly;
                const affiliateUrl = getVpnAffiliateUrl(provider.id);
                return (
                  <article
                    key={provider.id}
                    className="rounded-xl border bg-card p-5 shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="size-4 text-primary" aria-hidden="true" />
                      <span>{provider.label}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{vpn.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {provider.note}
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
                      plan and renewal terms.
                    </p>
                    <AffiliateButton
                      vpnId={vpn.id}
                      vpnName={vpn.name}
                      affiliateUrl={affiliateUrl}
                      className="mt-4 w-full"
                    >
                      Check {vpn.name} privacy terms
                    </AffiliateButton>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="comparison" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Compare evidence types, not privacy slogans
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              A no-logs label, jurisdiction and open-source app answer different
              questions. Record the scope and date of each evidence item.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[760px] text-left text-sm">
                <caption className="sr-only">
                  VPN privacy evidence comparison checklist
                </caption>
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="p-4">
                      Evidence
                    </th>
                    <th scope="col" className="p-4">
                      What it can tell you
                    </th>
                    <th scope="col" className="p-4">
                      What it cannot prove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Privacy policy
                    </th>
                    <td className="p-4">
                      Definitions, purposes and retention language
                    </td>
                    <td className="p-4">
                      That implementation always matches the text
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Independent audit
                    </th>
                    <td className="p-4">
                      What a named assessor examined at a point in time
                    </td>
                    <td className="p-4">
                      Future behaviour or systems outside the audit scope
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Jurisdiction and ownership
                    </th>
                    <td className="p-4">
                      Which legal entity and process may apply
                    </td>
                    <td className="p-4">
                      Immunity from lawful requests or data collection
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Open-source apps
                    </th>
                    <td className="p-4">
                      More code visibility for review and reproducibility
                    </td>
                    <td className="p-4">
                      Server-side operations or every released binary
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Payment and signup
                    </th>
                    <td className="p-4">
                      How much account or billing information is shared
                    </td>
                    <td className="p-4">
                      Anonymity after logging into other services
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="threat-model" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Match the VPN to the threat model
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border p-5">
                <Globe2 className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">Public Wi-Fi</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prioritise secure protocols, reconnect behaviour and testing
                  on the networks you use.
                </p>
              </div>
              <div className="rounded-xl border p-5">
                <FileCheck className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">Provider trust</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Read policy definitions, audit scope, ownership and
                  transparency history together.
                </p>
              </div>
              <div className="rounded-xl border p-5">
                <LockKeyhole
                  className="size-6 text-primary"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-semibold">Higher-risk privacy</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Layer account separation, browser hygiene and other controls;
                  a VPN alone is not anonymity.
                </p>
              </div>
            </div>
            <ol className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                "Define what you are protecting and from whom.",
                "List the data your apps and accounts still expose.",
                "Check the provider evidence date and scope.",
                "Test DNS, reconnect and kill-switch behaviour on your devices.",
                "Revisit the policy after major provider or app changes.",
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
              <li className="flex gap-3 rounded-lg border p-4">
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-green-600"
                  aria-hidden="true"
                />
                <span>
                  <strong>6.</strong>{" "}
                  <Link href="/methodology" className="text-primary underline">
                    Use our methodology
                  </Link>{" "}
                  for a repeatable comparison record.
                </span>
              </li>
            </ol>
          </section>

          <section id="faq" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Privacy VPN FAQ</h2>
            <div className="mt-5 space-y-5">
              {privacyVpnEditorialFaq.map((item) => (
                <div key={item.question} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            <FAQSchema title="Privacy VPN FAQ" faqs={privacyVpnEditorialFaq} />
          </section>
          <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
            <h2 className="text-2xl font-bold">Sources and related checks</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The US/English DataForSEO dossier was refreshed 13 August 2026 for
              privacy intent and PAA coverage. Provider policies, audits and
              legal context must be checked at source.
            </p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <li>
                <Link href="/methodology" className="text-primary underline">
                  ZeroToVPN methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/vpn-privacy-guide"
                  className="text-primary underline"
                >
                  VPN privacy guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/can-vpn-hide-from-isp"
                  className="text-primary underline"
                >
                  VPN and ISP visibility
                </Link>
              </li>
              <li>
                <Link href="/best/best-vpn" className="text-primary underline">
                  Best VPN comparison
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </BestVpnEditorialTemplate>
  );
}
