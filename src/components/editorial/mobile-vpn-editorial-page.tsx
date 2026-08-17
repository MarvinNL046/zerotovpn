import { Battery, CheckCircle, Lock, Smartphone, Wifi } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  AffiliateButton,
  AffiliateTextLink,
} from "@/components/vpn/affiliate-button";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getVpnById } from "@/lib/vpn-data";
import { getVpnAffiliateUrl, type VpnLinkSlug } from "@/lib/vpn-links";

export const mobileVpnEditorialTitle =
  "Best Mobile VPNs in 2026: iPhone, Android, Battery and Setup Limits";
export const mobileVpnEditorialDescription =
  "Compare mobile VPN options for iPhone and Android by network privacy, app permissions, battery trade-offs and current plan terms—not unsupported speed scores.";

export const mobileVpnEditorialFaq = [
  {
    question: "Which mobile VPN is the best?",
    answer:
      "There is no universal winner. Compare the mobile app, plan limit, privacy documentation, support and your own connection stability, then verify the current provider terms before subscribing.",
  },
  {
    question: "Should you put a VPN on your iPhone?",
    answer:
      "A VPN can reduce local-network and ISP visibility of the connection, especially on public Wi-Fi. It does not stop apps from receiving GPS or account data that you allow them to collect.",
  },
  {
    question: "Should I have a VPN on my Android phone?",
    answer:
      "It can be useful on public or shared networks and when you want the VPN provider to handle the encrypted tunnel. Review the provider's privacy policy and test whether the app works with your banking, streaming and messaging apps.",
  },
  {
    question: "Does using a VPN affect mobile data?",
    answer:
      "A VPN can add protocol overhead and may change the network route, so data use and battery impact vary by phone, protocol and signal. Measure your own baseline instead of trusting a fixed percentage.",
  },
  {
    question: "Does a VPN drain your battery?",
    answer:
      "It may use additional power because the tunnel stays active, but the effect depends on the device, protocol, signal and how often traffic is sent. Use the phone's battery report during a short side-by-side test.",
  },
  {
    question: "Does a VPN hide your location on iPhone or Android?",
    answer:
      "A VPN changes the public IP address seen by network services; it does not disable GPS or automatically remove location permissions. Review each app's location setting separately.",
  },
];

const providers = [
  {
    id: "surfshark",
    label: "Surfshark",
    angle: "Useful when several household devices need one mobile subscription",
    verify: "Check the current simultaneous-connection and household wording",
  },
  {
    id: "nordvpn",
    label: "NordVPN",
    angle:
      "Useful when you want a documented mobile app and a numeric device limit",
    verify: "Check the current device count, protocol and router rules",
  },
  {
    id: "expressvpn",
    label: "ExpressVPN",
    angle: "Useful when app simplicity and support are higher priorities",
    verify: "Check the current plan tier and simultaneous-connection limit",
  },
] as const satisfies ReadonlyArray<{
  id: VpnLinkSlug;
  label: string;
  angle: string;
  verify: string;
}>;

const brief = {
  primaryKeyword: "best mobile vpn",
  intent: "commercial",
  cluster: "mobile-and-device-privacy",
  lastReviewedAt: "2026-08-13",
  evidence: [
    "docs/research/dataforseo-mobile-vpn-cluster-2026-08-13.md",
    "/methodology",
    "/blog/vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy",
  ],
  affiliateContext: "vpn-selection",
  schemaType: "CollectionPage",
} as const;

function ProviderCard({ provider }: { provider: (typeof providers)[number] }) {
  const vpn = getVpnById(provider.id);
  if (!vpn) return null;
  const price = vpn.priceTwoYear ?? vpn.priceYearly;
  const affiliateUrl = getVpnAffiliateUrl(provider.id);
  return (
    <article
      className="rounded-xl border bg-card p-5 shadow-sm"
      data-provider={provider.id}
    >
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Smartphone className="size-4 text-primary" aria-hidden="true" />
        <span>Mobile option</span>
      </div>
      <h3 className="text-xl font-semibold">{provider.label}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{provider.angle}.</p>
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
        Catalog price checked {vpn.priceLastVerified ?? "date not recorded"};
        verify checkout terms.
      </p>
      <p className="mt-4 rounded-lg bg-muted/50 p-3 text-sm">
        <strong>Verify:</strong> {provider.verify}.
      </p>
      <AffiliateButton
        vpnId={vpn.id}
        vpnName={vpn.name}
        affiliateUrl={affiliateUrl}
        className="mt-4 w-full"
      >
        Check {provider.label} mobile option
      </AffiliateButton>
    </article>
  );
}

export function MobileVpnEditorialPage() {
  return (
    <BestVpnEditorialTemplate
      brief={brief}
      navigation={[
        { href: "#comparison", label: "Comparison" },
        { href: "#setup", label: "Setup" },
        { href: "#battery", label: "Battery" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="flex flex-col">
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Best VPNs", href: "/best/best-vpn" },
              { name: "Mobile VPNs", href: "/best/vpn-mobile" },
            ]}
          />
        </div>
        <article className="container max-w-5xl py-8 lg:py-12">
          <header className="mb-10 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Mobile privacy decision guide
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {mobileVpnEditorialTitle}
            </h1>
            <p className="mt-5 text-xl text-muted-foreground">
              {mobileVpnEditorialDescription}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Reviewed 13 August 2026 · Current provider terms and app behaviour
              can change.
            </p>
          </header>

          <section id="comparison" className="scroll-mt-24">
            <h2 className="text-3xl font-bold">
              What to compare in a mobile VPN
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              A mobile VPN is an encrypted network tunnel, not a sensor privacy
              switch. Choose the network protection you need, then check
              permissions and app compatibility separately.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Mobile VPN comparison: what to verify before choosing
                </caption>
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="p-4">
                      Decision
                    </th>
                    <th scope="col" className="p-4">
                      What matters
                    </th>
                    <th scope="col" className="p-4">
                      Evidence boundary
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Network privacy
                    </th>
                    <td className="p-4">
                      Encryption on public Wi-Fi and a clear provider policy
                    </td>
                    <td className="p-4">
                      A VPN does not make every app request private
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Device support
                    </th>
                    <td className="p-4">
                      iOS/Android version, background behaviour and simultaneous
                      connections
                    </td>
                    <td className="p-4">
                      Check the current app store and support page
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Battery and data
                    </th>
                    <td className="p-4">
                      Protocol, signal strength, always-on mode and traffic
                      volume
                    </td>
                    <td className="p-4">
                      Measure your device; avoid fixed battery or speed promises
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Location privacy
                    </th>
                    <td className="p-4">
                      OS location permissions and each app&apos;s collection
                      settings
                    </td>
                    <td className="p-4">
                      A VPN changes IP visibility, not GPS access
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section
            className="mt-12 grid gap-5 md:grid-cols-3"
            aria-label="Mobile provider options"
          >
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </section>

          <section id="setup" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Mobile setup checklist</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "Install the provider app from the official iOS App Store or Google Play listing and confirm the publisher.",
                "Read the provider's privacy and support pages before signing in; record the plan and device limit.",
                "Connect on home Wi-Fi, mobile data and a public network, then test banking, messaging and streaming apps.",
                "Turn on auto-connect or a kill switch only after checking how the setting affects local apps and emergency access.",
                "Review OS location, background activity and Health/Fitness permissions separately from the VPN settings.",
                "Keep the app and phone updated, and recheck the plan when the provider changes its app or pricing page.",
              ].map((item, index) => (
                <li key={item} className="flex gap-3 rounded-lg border p-4">
                  <CheckCircle
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

          <section id="battery" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Battery, mobile data and compatibility
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border p-5">
                <Battery className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">Battery</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  An always-on tunnel can add work for the phone. Compare a
                  normal day and a VPN day in the device battery report instead
                  of trusting a universal percentage.
                </p>
              </div>
              <div className="rounded-xl border p-5">
                <Wifi className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">Mobile data</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  VPN overhead and a different route may change data use or
                  performance. Test with the signal and plan you actually use.
                </p>
              </div>
              <div className="rounded-xl border p-5">
                <Lock className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">App boundaries</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A VPN cannot block GPS, account telemetry or permissions
                  granted to a fitness, banking or social app. See our{" "}
                  <Link
                    href="/blog/vpn-fitness-tracking-apps-strava-apple-health-garmin-privacy"
                    className="text-primary underline"
                  >
                    fitness privacy guide
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section id="faq" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Mobile VPN FAQ</h2>
            <div className="mt-5 space-y-5">
              {mobileVpnEditorialFaq.map((item) => (
                <div key={item.question} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            <FAQSchema title="Mobile VPN FAQ" faqs={mobileVpnEditorialFaq} />
          </section>

          <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
            <h2 className="text-2xl font-bold">Sources and related checks</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              DataForSEO US/English signals were refreshed 13 August 2026 for
              question coverage. Provider policies and app behaviour should be
              checked at source.
            </p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <li>
                <a
                  href="https://support.google.com/android/answer/9089766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Android VPN help
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/en-us/102281"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Apple VPN configuration guidance
                </a>
              </li>
              <li>
                <Link href="/methodology" className="text-primary underline">
                  ZeroToVPN methodology
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
            </ul>
          </section>
        </article>
      </div>
    </BestVpnEditorialTemplate>
  );
}
