import {
  CheckCircle2,
  CircleAlert,
  LockKeyhole,
  Smartphone,
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

export const iphoneVpnEditorialTitle =
  "Best VPNs for iPhone in 2026: iOS App, Privacy and Setup Checks";
export const iphoneVpnEditorialDescription =
  "Compare iPhone VPN options by iOS app support, network handoffs, privacy boundaries, setup checks and current plan terms - not fixed App Store or battery claims.";

const brief = {
  primaryKeyword: "best vpn for iphone",
  intent: "commercial",
  cluster: "mobile-and-device-privacy",
  lastReviewedAt: "2026-08-13",
  evidence: [
    "docs/research/dataforseo-iphone-vpn-cluster-2026-08-13.md",
    "/methodology",
    "/best/vpn-mobile",
  ],
  affiliateContext: "vpn-selection",
  schemaType: "CollectionPage",
} satisfies EditorialContentBrief;

const faq = [
  {
    question: "Does an iPhone VPN protect every app?",
    answer:
      "A full iOS VPN profile can cover device traffic, but app behaviour, local-network rules, DNS handling and permissions still matter. Test the apps and networks you actually use instead of treating an App Store listing as proof of coverage.",
  },
  {
    question: "Will a VPN drain my iPhone battery?",
    answer:
      "Battery impact depends on the iPhone model, iOS version, protocol, signal and workload. Compare the same device with and without the VPN under recorded conditions; avoid universal percentages.",
  },
  {
    question: "Should I use a VPN on public Wi-Fi with an iPhone?",
    answer:
      "It can reduce exposure to the local network, but it does not make a coffee-shop, hotel or airport network trustworthy. Keep iOS updated, use HTTPS and confirm auto-connect and reconnect behaviour.",
  },
  {
    question: "Can an iPhone VPN hide my location?",
    answer:
      "It can change the apparent IP location for services that use IP data. Apps can still use GPS, account details, Wi-Fi positioning or other signals, so a VPN is not a complete location cloak.",
  },
  {
    question: "How do I set up a VPN on an iPhone?",
    answer:
      "Install the provider app from a verified source, sign in, approve the VPN configuration, select a protocol or server and test connection, DNS and reconnect behaviour. Remove old profiles you no longer trust.",
  },
  {
    question: "What should I check before subscribing to an iPhone VPN?",
    answer:
      "Confirm iOS support, app permissions, auto-connect, kill-switch behaviour, device limits, renewal terms, refund window and privacy documentation. Then test the route on your home, mobile and public networks.",
  },
];

const providers = [
  {
    slug: "nordvpn",
    label: "Everyday iOS shortlist",
    note: "Check the current iOS app, auto-connect and device terms against your routine.",
  },
  {
    slug: "expressvpn",
    label: "App simplicity comparison",
    note: "Compare setup steps, permissions and reconnect behaviour with your iPhone workflow.",
  },
  {
    slug: "surfshark",
    label: "Device-count comparison",
    note: "Review current simultaneous-device terms when one plan must cover several devices.",
  },
] as const;

const money = (value: number | undefined) =>
  typeof value === "number" ? `$${value.toFixed(2)}` : "-";

export function IphoneVpnEditorialPage({ vpns }: { vpns: VpnData[] }) {
  const options = providers
    .map((provider) => ({
      provider,
      vpn: vpns.find((vpn) => vpn.slug === provider.slug),
    }))
    .filter((row): row is typeof row & { vpn: VpnData } => Boolean(row.vpn));
  return (
    <>
      <ArticleJsonLd
        title={iphoneVpnEditorialTitle}
        description={iphoneVpnEditorialDescription}
        url="https://www.zerotovpn.com/best/vpn-iphone"
        datePublished="2026-01-01"
        dateModified="2026-08-13"
      />
      <BreadcrumbSchema
        items={[
          { name: "Best VPNs", href: "/best/best-vpn" },
          { name: "iPhone VPNs", href: "/best/vpn-iphone" },
        ]}
      />
      <FAQSchema title="iPhone VPN FAQ" faqs={faq} />
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
                iOS privacy and device decision guide
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {iphoneVpnEditorialTitle}
              </h1>
              <p className="mt-5 text-xl text-muted-foreground">
                {iphoneVpnEditorialDescription}
              </p>
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6">
                <CircleAlert
                  className="mt-0.5 size-5 shrink-0 text-amber-700"
                  aria-hidden="true"
                />
                <p>
                  <strong>Evidence boundary:</strong> App Store ratings, battery
                  use, speed and privacy outcomes vary by iPhone model, iOS
                  version, protocol, network and app permissions. Verify the
                  route you need before subscribing.
                </p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Reviewed 13 August 2026. DataForSEO guided iPhone, iOS privacy
                and setup questions; it does not prove provider performance.
              </p>
            </header>

            <section id="quick-picks" className="scroll-mt-24">
              <h2 className="text-3xl font-bold">
                iPhone VPN options to verify
              </h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                These providers are commercial starting points, not fixed
                winners. Use current first-party iOS documentation and your own
                device checks as the source of truth.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {options.map(({ provider, vpn }) => (
                  <article
                    key={provider.slug}
                    className="rounded-xl border bg-card p-5 shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Smartphone
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
                      Check {vpn.name} iPhone route
                    </AffiliateButton>
                  </article>
                ))}
              </div>
            </section>

            <section id="comparison" className="mt-16 scroll-mt-24">
              <h2 className="text-3xl font-bold">Compare the iOS route</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                An iPhone VPN is a set of app, profile and network behaviours.
                Compare the failure boundaries, not a universal rating.
              </p>
              <div className="mt-6 overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <caption className="sr-only">
                    iPhone VPN evidence checklist
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
                        iOS support
                      </th>
                      <td className="p-4">
                        Current app, iOS versions, permissions and profile
                        behaviour
                      </td>
                      <td className="p-4">
                        An app listing does not prove every iOS release or
                        feature path
                      </td>
                    </tr>
                    <tr className="border-t">
                      <th scope="row" className="p-4 font-semibold">
                        Network handoffs
                      </th>
                      <td className="p-4">
                        Auto-connect and reconnect on Wi-Fi, mobile data and
                        sleep
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
                        DNS, IP location, GPS permissions and app exclusions
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
                Six checks before you rely on an iPhone VPN
              </h2>
              <ol className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  "Record the iPhone model, iOS version, app version, network and date.",
                  "Install only from the provider's verified App Store source and inspect permissions.",
                  "Test Wi-Fi to mobile-data handoffs, auto-connect and reconnect after sleep.",
                  "Check browser traffic, a sensitive app and local-network access separately.",
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
                    Test home Wi-Fi, cellular data and a public network
                    separately.
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
                  <Smartphone
                    className="size-6 text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-semibold">iOS permissions</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Review VPN profiles, location access and app-level
                    exclusions.
                  </p>
                </div>
              </div>
            </section>

            <section id="faq" className="mt-16 scroll-mt-24">
              <h2 className="text-3xl font-bold">iPhone VPN FAQ</h2>
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
                Verify current iOS support and terms on the provider page before
                subscribing.
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
                    href="/best/vpn-android"
                    className="text-primary underline"
                  >
                    Android VPN comparison
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
                    href="/guides/vpn-protocols-explained"
                    className="text-primary underline"
                  >
                    VPN protocols explained
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
