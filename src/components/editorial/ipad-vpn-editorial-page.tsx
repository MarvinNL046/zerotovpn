import {
  CheckCircle2,
  CircleAlert,
  LockKeyhole,
  Tablet,
  Wifi,
} from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import {
  AffiliateButton,
  AffiliateTextLink,
} from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";
import type { EditorialContentBrief } from "@/lib/editorial-content-brief";
import type { VpnData } from "@/lib/vpn-data-layer";

export const ipadVpnEditorialTitle =
  "Best VPNs for iPad in 2026: iPadOS App, Privacy and Setup Checks";
export const ipadVpnEditorialDescription =
  "Compare iPad VPN options by iPadOS app support, multitasking, network handoffs, privacy boundaries and current plan terms - not fixed ratings or battery claims.";
const brief = {
  primaryKeyword: "best vpn for ipad",
  intent: "commercial",
  cluster: "mobile-and-device-privacy",
  lastReviewedAt: "2026-08-13",
  evidence: [
    "docs/research/dataforseo-ipad-vpn-cluster-2026-08-13.md",
    "/methodology",
    "/best/vpn-mobile",
  ],
  affiliateContext: "vpn-selection",
  schemaType: "CollectionPage",
} satisfies EditorialContentBrief;
const faq = [
  {
    question: "Does an iPad VPN cover every app?",
    answer:
      "A full iPadOS VPN profile can cover device traffic, but app behaviour, exclusions, DNS handling and local-network rules still matter. Test the apps and networks you actually use.",
  },
  {
    question: "Will a VPN drain my iPad battery?",
    answer:
      "Impact depends on the iPad model, iPadOS version, protocol, signal and workload. Compare the same device under recorded conditions instead of trusting a universal percentage.",
  },
  {
    question: "Is a VPN useful on iPad public Wi-Fi?",
    answer:
      "It can reduce exposure to the local network, but it does not make a hotel, cafe or airport network trustworthy. Keep iPadOS updated and confirm auto-connect and reconnect behaviour.",
  },
  {
    question: "Can an iPad VPN hide my location?",
    answer:
      "It can change the apparent IP location for services that use IP data. Apps can still use GPS, account details, Wi-Fi positioning and other signals.",
  },
  {
    question: "How do I set up a VPN on iPad?",
    answer:
      "Install the provider app from a verified source, sign in, approve the VPN configuration, choose a protocol or server and test connection, DNS and reconnect behaviour.",
  },
  {
    question: "What should I check before subscribing?",
    answer:
      "Confirm iPadOS support, permissions, auto-connect, kill-switch behaviour, device limits, renewal terms, refund window and privacy documentation. Test home Wi-Fi, cellular tethering and public networks.",
  },
];
const providers = [
  {
    slug: "nordvpn",
    label: "Everyday iPad shortlist",
    note: "Check the current iPadOS app, auto-connect and device terms against your routine.",
  },
  {
    slug: "expressvpn",
    label: "App simplicity comparison",
    note: "Compare setup steps, permissions and reconnect behaviour with your multitasking workflow.",
  },
  {
    slug: "surfshark",
    label: "Device-count comparison",
    note: "Review current simultaneous-device terms when one plan must cover several devices.",
  },
] as const;
const money = (value: number | undefined) =>
  typeof value === "number" ? `$${value.toFixed(2)}` : "-";

export function IpadVpnEditorialPage({ vpns }: { vpns: VpnData[] }) {
  const options = providers
    .map((provider) => ({
      provider,
      vpn: vpns.find((vpn) => vpn.slug === provider.slug),
    }))
    .filter((row): row is typeof row & { vpn: VpnData } => Boolean(row.vpn));
  return (
    <>
      <ArticleJsonLd
        title={ipadVpnEditorialTitle}
        description={ipadVpnEditorialDescription}
        url="https://www.zerotovpn.com/best/vpn-ipad"
        datePublished="2026-01-01"
        dateModified="2026-08-13"
      />
      <BreadcrumbSchema
        items={[
          { name: "Best VPNs", href: "/best/best-vpn" },
          { name: "iPad VPNs", href: "/best/vpn-ipad" },
        ]}
      />
      <FAQSchema title="iPad VPN FAQ" faqs={faq} />
      <BestVpnEditorialTemplate
        navigation={[
          { href: "#quick-picks", label: "Options" },
          { href: "#comparison", label: "Compare" },
          { href: "#setup", label: "Setup" },
          { href: "#faq", label: "FAQ" },
          { href: "#sources", label: "Sources" },
        ]}
        brief={brief}
      >
        <div className="flex flex-col">
          <article className="container max-w-5xl py-8 lg:py-12">
            <header className="mb-10 max-w-4xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                iPadOS privacy and tablet decision guide
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {ipadVpnEditorialTitle}
              </h1>
              <p className="mt-5 text-xl text-muted-foreground">
                {ipadVpnEditorialDescription}
              </p>
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6">
                <CircleAlert
                  className="mt-0.5 size-5 shrink-0 text-amber-700"
                  aria-hidden="true"
                />
                <p>
                  <strong>Evidence boundary:</strong> App Store ratings, battery
                  use, speed and privacy outcomes vary by iPad model, iPadOS
                  version, protocol, network and permissions. Verify the route
                  you need before subscribing.
                </p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Reviewed 13 August 2026. DataForSEO guided iPad, iPadOS privacy
                and setup questions; it does not prove provider performance.
              </p>
            </header>
            <section id="quick-picks" className="scroll-mt-24">
              <h2 className="text-3xl font-bold">iPad VPN options to verify</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                These providers are commercial starting points, not fixed
                winners. Use current first-party iPadOS documentation and your
                own device checks as the source of truth.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {options.map(({ provider, vpn }) => (
                  <article
                    key={provider.slug}
                    className="rounded-xl border bg-card p-5 shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Tablet
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      <span>{provider.label}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{vpn.name}</h3>
                    <p className="mt-2 min-h-16 text-sm text-muted-foreground">
                      {provider.note}
                    </p>
                    <p className="mt-4 text-2xl font-bold text-primary">
                      <AffiliateTextLink
                        vpnId={vpn.id}
                        vpnName={vpn.name}
                        affiliateUrl={vpn.affiliateUrl}
                        dataPriceLink
                      >
                        {money(vpn.priceTwoYear ?? vpn.priceYearly)}
                      </AffiliateTextLink>
                      <span className="ml-1 text-sm font-normal text-muted-foreground">
                        /mo equivalent
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Catalog checked {vpn.priceLastVerified ?? "not recorded"};
                      verify checkout terms.
                    </p>
                    <AffiliateButton
                      vpnId={vpn.id}
                      vpnName={vpn.name}
                      affiliateUrl={vpn.affiliateUrl}
                      className="mt-4 w-full"
                    >
                      Check {vpn.name} iPad route
                    </AffiliateButton>
                  </article>
                ))}
              </div>
            </section>
            <section id="comparison" className="mt-16 scroll-mt-24">
              <h2 className="text-3xl font-bold">Compare the iPadOS route</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                An iPad VPN is a set of app, profile and network behaviours.
                Compare failure boundaries, not a universal rating.
              </p>
              <div className="mt-6 overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <caption className="sr-only">
                    iPad VPN evidence checklist
                  </caption>
                  <thead className="bg-muted/60">
                    <tr>
                      <th scope="col" className="p-4">
                        Question
                      </th>
                      <th scope="col" className="p-4">
                        What to verify
                      </th>
                      <th scope="col" className="p-4">
                        Boundary
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <th scope="row" className="p-4 font-semibold">
                        iPadOS support
                      </th>
                      <td className="p-4">
                        Current app, OS versions, permissions and profile
                        behaviour
                      </td>
                      <td className="p-4">
                        An app listing does not prove every iPadOS release or
                        feature path
                      </td>
                    </tr>
                    <tr className="border-t">
                      <th scope="row" className="p-4 font-semibold">
                        Multitasking
                      </th>
                      <td className="p-4">
                        Browser, video call, split-screen and reconnect
                        behaviour
                      </td>
                      <td className="p-4">
                        A VPN does not replace HTTPS, updates or account
                        security
                      </td>
                    </tr>
                    <tr className="border-t">
                      <th scope="row" className="p-4 font-semibold">
                        Privacy boundary
                      </th>
                      <td className="p-4">
                        DNS, IP location, GPS permissions and exclusions
                      </td>
                      <td className="p-4">
                        Apps can still use device, account and location signals
                      </td>
                    </tr>
                    <tr className="border-t">
                      <th scope="row" className="p-4 font-semibold">
                        Plan terms
                      </th>
                      <td className="p-4">
                        Device limits, renewal price and refund conditions
                      </td>
                      <td className="p-4">
                        Catalog prices change; verify checkout before purchase
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section id="setup" className="mt-16 scroll-mt-24">
              <h2 className="text-3xl font-bold">
                Six checks before you rely on an iPad VPN
              </h2>
              <ol className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  "Record the iPad model, iPadOS version, app version, network and date.",
                  "Install only from the provider's verified App Store source and inspect permissions.",
                  "Test Wi-Fi to mobile-data or tethered handoffs, auto-connect and reconnect after sleep.",
                  "Check browser traffic, a video call and local-network access separately.",
                  "Test DNS, kill-switch and location-permission behaviour before travelling.",
                  "Write down device limits, renewal price, refund path and cancellation steps.",
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
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border p-5">
                  <Wifi className="size-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-semibold">Network changes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Test home Wi-Fi, tethering and a public network separately.
                  </p>
                </div>
                <div className="rounded-xl border p-5">
                  <LockKeyhole
                    className="size-6 text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-semibold">Privacy boundary</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A VPN changes one network observer&apos;s view; it does not
                    make every app anonymous.
                  </p>
                </div>
                <div className="rounded-xl border p-5">
                  <Tablet className="size-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-semibold">iPadOS permissions</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Review VPN profiles, location access and app-level
                    exclusions.
                  </p>
                </div>
              </div>
            </section>
            <section id="faq" className="mt-16 scroll-mt-24">
              <h2 className="text-3xl font-bold">iPad VPN FAQ</h2>
              <div className="mt-5 space-y-5">
                {faq.map((item) => (
                  <div key={item.question} className="rounded-xl border p-5">
                    <h3 className="font-semibold">{item.question}</h3>
                    <p className="mt-2 text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
            <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
              <h2 className="text-2xl font-bold">Sources and related checks</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The US/English DataForSEO dossier was refreshed 13 August 2026.
                Verify current iPadOS support and terms on the provider page
                before subscribing.
              </p>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <li>
                  <Link
                    href="/best/vpn-mobile"
                    className="text-primary underline"
                  >
                    Mobile VPN comparison
                  </Link>
                </li>
                <li>
                  <Link
                    href="/best/vpn-iphone"
                    className="text-primary underline"
                  >
                    iPhone VPN comparison
                  </Link>
                </li>
                <li>
                  <Link
                    href="/best/vpn-privacy"
                    className="text-primary underline"
                  >
                    VPN privacy comparison
                  </Link>
                </li>
                <li>
                  <Link
                    href="/best/vpn-android-tablet"
                    className="text-primary underline"
                  >
                    Android tablet VPN comparison
                  </Link>
                </li>
                <li>
                  <Link href="/methodology" className="text-primary underline">
                    ZeroToVPN methodology
                  </Link>
                </li>
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                Need a deeper measurement? Use the{" "}
                <Link
                  href="/tools/dns-leak-test"
                  className="text-primary underline"
                >
                  DNS leak test
                </Link>{" "}
                and record the result with your device and network context.
              </p>
            </section>
          </article>
        </div>
      </BestVpnEditorialTemplate>
    </>
  );
}
