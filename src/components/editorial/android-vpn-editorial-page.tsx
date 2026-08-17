import {
  Battery,
  CheckCircle2,
  CircleAlert,
  Lock,
  Smartphone,
  Wifi,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnById } from "@/lib/vpn-data";
import { getVpnAffiliateUrl, type VpnLinkSlug } from "@/lib/vpn-links";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const androidVpnEditorialTitle =
  "Best VPNs for Android in 2026: Apps, Battery and Setup";
export const androidVpnEditorialDescription =
  "Compare Android VPN apps by network privacy, permissions, battery trade-offs and current plan terms—not unsupported speed scores.";

export const androidVpnEditorialFaq = [
  {
    question: "What is the best VPN app for Android?",
    answer:
      "There is no universal winner. Compare the provider's Android app, privacy policy, protocol options, support and plan limits, then test it on the networks and apps you actually use.",
  },
  {
    question: "Do Android phones have a built-in VPN?",
    answer:
      "Android includes VPN configuration support, but it does not provide a consumer VPN subscription or choose a provider for you. You still need a compatible service or a managed VPN profile.",
  },
  {
    question: "Should I have a VPN on my Android phone?",
    answer:
      "It can help reduce local-network and ISP visibility on public or shared networks. It does not prevent Android apps from using permissions, accounts or GPS data that you allow.",
  },
  {
    question: "Why is my VPN draining my Android battery?",
    answer:
      "An always-on encrypted tunnel can add work for the phone, especially with weak signal or frequent reconnects. Compare the battery report with and without the tunnel instead of trusting a fixed percentage.",
  },
  {
    question: "Should the VPN kill switch be on?",
    answer:
      "A kill switch can block traffic when the tunnel drops, which is useful for a privacy-sensitive task. Check how the Android app implements it and whether local-network access or emergency connectivity matters to you.",
  },
  {
    question: "What is the best free VPN for Android?",
    answer:
      "Some providers offer permanent free tiers, but limits and funding models differ. Read the current plan and privacy terms, install only from the official Play listing and avoid treating a free label as proof of safety or unlimited use.",
  },
];

const providers = [
  {
    id: "nordvpn",
    label: "NordVPN",
    angle:
      "A documented Android app with protocol and device-limit details to verify",
    verify: "Check the current Android app, device count and plan terms",
  },
  {
    id: "surfshark",
    label: "Surfshark",
    angle: "A mobile option when several devices need one subscription",
    verify: "Check simultaneous-connection wording and Android permissions",
  },
  {
    id: "expressvpn",
    label: "ExpressVPN",
    angle: "An app-first option when simple setup and support are priorities",
    verify: "Check the current Android version support and plan tier",
  },
] as const satisfies ReadonlyArray<{
  id: VpnLinkSlug;
  label: string;
  angle: string;
  verify: string;
}>;

function ProviderCard({ provider }: { provider: (typeof providers)[number] }) {
  const vpn = getVpnById(provider.id);
  if (!vpn) return null;
  const affiliateUrl = getVpnAffiliateUrl(provider.id);
  const isCommissionLink = Boolean(affiliateUrl);
  return (
    <article
      className="rounded-xl border bg-card p-5 shadow-sm"
      data-provider={provider.id}
    >
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Smartphone className="size-4 text-primary" aria-hidden="true" />
        <span>Android option</span>
      </div>
      <h3 className="text-xl font-semibold">{provider.label}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{provider.angle}.</p>
      <p className="mt-4 rounded-lg border bg-muted/40 p-3 text-sm leading-6">
        <strong>Price status:</strong> Check the current total, renewal price
        and refund terms before paying.
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
        Check current {provider.label} plans
      </AffiliateButton>
      <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {isCommissionLink ? "Commission link" : "Official provider link"}
      </p>
    </article>
  );
}

export function AndroidVpnEditorialPage() {
  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.androidVpn}
      navigation={[
        { href: "#quick-picks", label: "Options" },
        { href: "#comparison", label: "Compare" },
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
              { name: "Android VPNs", href: "/best/vpn-android" },
            ]}
          />
        </div>
        <article className="container max-w-5xl py-8 lg:py-12">
          <header className="mb-10 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Android privacy decision guide
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {androidVpnEditorialTitle}
            </h1>
            <p className="mt-5 text-xl text-muted-foreground">
              {androidVpnEditorialDescription}
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6">
              <CircleAlert
                className="mt-0.5 size-5 shrink-0 text-amber-700"
                aria-hidden="true"
              />
              <p>
                <strong>Evidence boundary:</strong> app features, battery impact
                and plan terms can change by Android version, country and
                provider release. Treat this page as a decision framework and
                recheck the linked source before subscribing.
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Reviewed 13 August 2026 · DataForSEO questions guide coverage;
              they do not prove provider performance.
            </p>
          </header>

          <section id="quick-picks" className="scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Android VPN options to verify
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              These are commercial starting points, not a promise that one app
              works on every phone. Open the provider page, confirm the Android
              app publisher and compare the current plan before installing.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </section>

          <section id="comparison" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Compare the Android use case, not a fixed score
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              The current US/English research surfaced questions about free
              plans, built-in Android support, safety, battery and kill
              switches. Use the matrix below to collect primary evidence instead
              of repeating a universal rating.
            </p>
            <div className="mt-6 hidden overflow-x-auto rounded-xl border md:block">
              <table className="w-full min-w-[720px] text-left text-sm">
                <caption className="sr-only">
                  Android VPN comparison: what to verify before choosing
                </caption>
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="p-4">
                      Decision
                    </th>
                    <th scope="col" className="p-4">
                      What to check
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
                      Protocol, auto-connect and provider privacy policy
                    </td>
                    <td className="p-4">
                      A VPN changes network-path visibility, not app permissions
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Android fit
                    </th>
                    <td className="p-4">
                      Supported Android version, Play publisher and background
                      behaviour
                    </td>
                    <td className="p-4">
                      Check the current Play listing and support documentation
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Battery and data
                    </th>
                    <td className="p-4">
                      Signal strength, protocol, always-on mode and traffic
                      volume
                    </td>
                    <td className="p-4">
                      Measure your phone; avoid fixed percentages
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Failure behaviour
                    </th>
                    <td className="p-4">
                      Kill switch, reconnect path and local-network access
                    </td>
                    <td className="p-4">
                      Test on Wi-Fi and mobile data before relying on it
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-4 md:hidden">
              {[
                [
                  "Network privacy",
                  "Protocol, auto-connect and provider privacy policy",
                  "A VPN changes network-path visibility, not app permissions",
                ],
                [
                  "Android fit",
                  "Supported Android version, Play publisher and background behaviour",
                  "Check the current Play listing and support documentation",
                ],
                [
                  "Battery and data",
                  "Signal strength, protocol, always-on mode and traffic volume",
                  "Measure your phone; avoid fixed percentages",
                ],
                [
                  "Failure behaviour",
                  "Kill switch, reconnect path and local-network access",
                  "Test on Wi-Fi and mobile data before relying on it",
                ],
              ].map(([decision, check, boundary]) => (
                <article
                  className="rounded-xl border bg-card p-4"
                  key={decision}
                >
                  <h3 className="font-semibold">{decision}</h3>
                  <dl className="mt-3 grid gap-3 text-sm">
                    <div>
                      <dt className="font-semibold">What to check</dt>
                      <dd className="mt-1 text-muted-foreground">{check}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Evidence boundary</dt>
                      <dd className="mt-1 text-muted-foreground">{boundary}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section id="setup" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Android setup checklist</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "Install only from the provider's official Google Play listing and confirm the publisher.",
                "Record the plan, device limit and privacy policy version before signing in.",
                "Test home Wi-Fi, mobile data and a public network; check banking, messaging and streaming apps.",
                "Turn on auto-connect or a kill switch only after checking how the app handles local-network access.",
                "Review Android location, background activity and notification permissions separately from VPN settings.",
                "Recheck the app and plan after major Android or provider updates.",
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

          <section id="battery" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Battery, data and permission boundaries
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border p-5">
                <Battery className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">Battery</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  An always-on tunnel can add work for the phone, especially
                  with weak signal or reconnects. Compare the Android battery
                  report with and without the VPN.
                </p>
              </div>
              <div className="rounded-xl border p-5">
                <Wifi className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">Mobile data</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Protocol overhead and routing can change data use or
                  performance. Test using the network and data plan you actually
                  depend on.
                </p>
              </div>
              <div className="rounded-xl border p-5">
                <Lock className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">App permissions</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A VPN does not disable GPS, account telemetry or permissions
                  granted to apps. For a broader privacy boundary, see our{" "}
                  <Link
                    href="/best/vpn-privacy"
                    className="text-primary underline"
                  >
                    VPN privacy comparison
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section id="faq" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Android VPN FAQ</h2>
            <div className="mt-5 space-y-5">
              {androidVpnEditorialFaq.map((item) => (
                <div key={item.question} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            <FAQSchema title="Android VPN FAQ" faqs={androidVpnEditorialFaq} />
          </section>

          <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
            <h2 className="text-2xl font-bold">Sources and related checks</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The DataForSEO US/English dossier was refreshed 13 August 2026 for
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
                  Google Android VPN help
                </a>
              </li>
              <li>
                <Link
                  href="/best/vpn-mobile"
                  className="text-primary underline"
                >
                  Mobile VPN comparison
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-primary underline">
                  ZeroToVPN methodology
                </Link>
              </li>
              <li>
                <Link href="/best/free-vpn" className="text-primary underline">
                  Free VPN evidence guide
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </BestVpnEditorialTemplate>
  );
}
