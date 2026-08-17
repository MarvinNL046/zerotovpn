import { Activity, CheckCircle2, Gamepad2, Shield, Wifi } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { getVpnById } from "@/lib/vpn-data";
import { getVpnAffiliateUrl, type VpnLinkSlug } from "@/lib/vpn-links";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

export const gamingVpnEditorialTitle =
  "Best VPNs for Gaming in 2026: Ping, Stability and DDoS Boundaries";
export const gamingVpnEditorialDescription =
  "Compare gaming VPNs by route, protocol, console setup and threat model—then measure ping and stability on your own network.";

export const gamingVpnEditorialFaq = [
  {
    question: "Can a VPN reduce gaming ping?",
    answer:
      "Sometimes, but it can also increase latency. The result depends on your ISP, game server, VPN exit and congestion. Measure the same game route with and without the tunnel before deciding.",
  },
  {
    question: "Does a VPN protect against DDoS attacks?",
    answer:
      "A VPN can hide your home IP from some peers when traffic is routed through the provider, but it is not a universal DDoS shield. Use platform, router and account security controls as well.",
  },
  {
    question: "Is a VPN good for PlayStation or Xbox?",
    answer:
      "Coverage depends on the provider's router instructions, supported firmware or a shared connection from another device. Check the exact console route; a desktop app does not automatically cover a console.",
  },
  {
    question: "Which VPN protocol is best for gaming?",
    answer:
      "WireGuard-based protocols and provider alternatives can offer useful performance, but there is no universal winner. Compare reconnect behaviour, device support and the route to your game server.",
  },
  {
    question: "Can a VPN unblock region-locked games?",
    answer:
      "Changing the apparent network location does not override a game's licence, account, store or anti-fraud rules. Check the publisher terms and never use a VPN to evade a restriction.",
  },
];

const providers = [
  {
    id: "nordvpn",
    label: "General gaming route",
    note: "Check the current protocol, server selection and router/console instructions against your own game route.",
  },
  {
    id: "expressvpn",
    label: "Console setup check",
    note: "Compare app, router and shared-connection paths; console support is a setup question, not a desktop-app promise.",
  },
  {
    id: "surfshark",
    label: "Household value check",
    note: "Verify device wording, router coverage and renewal terms when several players share one connection.",
  },
] as const satisfies ReadonlyArray<{
  id: VpnLinkSlug;
  label: string;
  note: string;
}>;

export function GamingVpnEditorialPage() {
  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.gamingVpn}
      navigation={[
        { href: "#quick-picks", label: "Options" },
        { href: "#comparison", label: "Compare" },
        { href: "#test", label: "Ping test" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="flex flex-col">
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Best VPNs", href: "/best/best-vpn" },
              { name: "Gaming VPNs", href: "/best/vpn-gaming" },
            ]}
          />
        </div>
        <article className="container max-w-5xl py-8 lg:py-12">
          <header className="mb-10 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Gaming privacy and route guide
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {gamingVpnEditorialTitle}
            </h1>
            <p className="mt-5 text-xl text-muted-foreground">
              {gamingVpnEditorialDescription}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Reviewed 13 August 2026 · DataForSEO informed gaming, console,
              latency and DDoS question coverage; it does not prove provider
              performance.
            </p>
          </header>

          <section id="quick-picks" className="scroll-mt-24">
            <h2 className="text-3xl font-bold">Gaming VPN options to verify</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              These are commercial starting points. Confirm the current price,
              refund terms, protocol and route to the game server before
              subscribing.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {providers.map((provider) => {
                const vpn = getVpnById(provider.id);
                if (!vpn) return null;
                const affiliateUrl = getVpnAffiliateUrl(provider.id);
                return (
                  <article
                    key={provider.id}
                    className="rounded-xl border bg-card p-5 shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Gamepad2
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      <span>{provider.label}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{vpn.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {provider.note}
                    </p>
                    <div className="mt-4 rounded-lg bg-muted/60 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Price status
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        Check the current total, renewal price and refund terms.
                      </p>
                      <p className="mt-2 text-xs font-semibold text-primary">
                        {affiliateUrl
                          ? "Commission link"
                          : "Official provider link"}
                      </p>
                    </div>
                    <AffiliateButton
                      vpnId={vpn.id}
                      vpnName={vpn.name}
                      affiliateUrl={affiliateUrl}
                      className="mt-4 w-full"
                    >
                      Check current {vpn.name} plans
                    </AffiliateButton>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="comparison" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Compare the route, not a fixed ping promise
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              A VPN can change the path, but it cannot guarantee a lower ping.
              Record the route and device coverage for the game you actually
              play.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[740px] text-left text-sm">
                <caption className="sr-only">
                  Gaming VPN route and evidence checklist
                </caption>
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="p-4">
                      Question
                    </th>
                    <th scope="col" className="p-4">
                      What to compare
                    </th>
                    <th scope="col" className="p-4">
                      Boundary
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Latency
                    </th>
                    <td className="p-4">
                      Same game server, time of day and protocol
                    </td>
                    <td className="p-4">
                      One test does not predict every route
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Stability
                    </th>
                    <td className="p-4">
                      Reconnects, packet loss and session continuity
                    </td>
                    <td className="p-4">
                      Local Wi-Fi and ISP faults remain possible
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      Console coverage
                    </th>
                    <td className="p-4">
                      Router, shared connection or supported app path
                    </td>
                    <td className="p-4">
                      A laptop app does not automatically cover a console
                    </td>
                  </tr>
                  <tr className="border-t">
                    <th scope="row" className="p-4 font-semibold">
                      DDoS risk
                    </th>
                    <td className="p-4">
                      IP exposure, platform controls and account security
                    </td>
                    <td className="p-4">
                      A VPN is not a universal DDoS guarantee
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="test" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Five-minute gaming VPN test</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "Record your baseline ping and packet loss to the game's normal server.",
                "Repeat at the same time with the VPN disconnected and connected.",
                "Test two nearby exits and one protocol; keep the game server constant.",
                "Check reconnect behaviour, voice chat and any platform sign-in effects.",
                "Keep the VPN only if the route fits your threat model and the measured trade-off is acceptable.",
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
                <Activity className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">Measure</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Keep the game, server and time constant.
                </p>
              </div>
              <div className="rounded-xl border p-5">
                <Wifi className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">Check stability</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Look beyond a single ping number for loss and reconnects.
                </p>
              </div>
              <div className="rounded-xl border p-5">
                <Shield className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">Secure accounts</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Use MFA and platform controls alongside any VPN.
                </p>
              </div>
            </div>
          </section>

          <section id="faq" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Gaming VPN FAQ</h2>
            <div className="mt-5 space-y-5">
              {gamingVpnEditorialFaq.map((item) => (
                <div key={item.question} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            <FAQSchema title="Gaming VPN FAQ" faqs={gamingVpnEditorialFaq} />
          </section>
          <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
            <h2 className="text-2xl font-bold">Sources and related checks</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The US/English DataForSEO dossier was refreshed 13 August 2026 for
              gaming intent and PAA coverage. Provider features and prices must
              be checked at source.
            </p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
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
                  href="/best/vpn-port-forwarding"
                  className="text-primary underline"
                >
                  Port-forwarding guide
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/vpn-speed-guide"
                  className="text-primary underline"
                >
                  VPN speed guide
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-primary underline">
                  ZeroToVPN methodology
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </BestVpnEditorialTemplate>
  );
}
