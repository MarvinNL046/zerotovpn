import {
  CheckCircle2,
  CircleAlert,
  MonitorCog,
  ShieldCheck,
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

export const windowsVpnEditorialTitle =
  "Best VPNs for Windows in 2026: App Support, Controls and Trade-offs";
export const windowsVpnEditorialDescription =
  "Compare Windows VPNs by current OS support, split tunneling, kill-switch behaviour, auto-connect, privacy evidence and plan terms—not fixed speed scores.";

export const windowsVpnEditorialFaq = [
  {
    question: "Which VPN is best for Windows?",
    answer:
      "There is no universal winner. Compare the Windows version and architecture you use, app controls, split tunneling, kill-switch behaviour, privacy evidence, device limits and the provider's current terms.",
  },
  {
    question: "Does Windows have a built-in VPN?",
    answer:
      "Windows can create VPN connections through its network settings, but it does not include a VPN subscription or provider server access. You still need a provider or your own endpoint and the correct protocol and credentials.",
  },
  {
    question: "Can I use split tunneling on Windows?",
    answer:
      "Some Windows apps support per-app or IP-based split tunneling, while others do not or limit it by plan and version. Verify the current provider documentation and test the exact apps you want to exclude or include.",
  },
  {
    question: "Do Windows VPN apps have a kill switch?",
    answer:
      "Many native clients expose a kill switch, but the name and scope vary. Test a dropped connection and check whether local-network, LAN or app exceptions change the result; do not treat a marketing label as proof of behaviour.",
  },
  {
    question: "Will a VPN slow down my Windows PC?",
    answer:
      "A VPN adds encryption and changes the network route. The effect depends on protocol, server distance, Wi-Fi, CPU, congestion and the app. Measure your own baseline and VPN connection rather than relying on a universal percentage.",
  },
  {
    question: "Can I install a VPN on Windows 7 or 8?",
    answer:
      "Support is provider- and version-specific. Current app documentation may focus on Windows 10/11, while older systems may need a legacy client or manual configuration with fewer features. Check the official support page before installing.",
  },
];

const providerRows = [
  {
    id: "nordvpn",
    label: "Full Windows app path",
    note: "A starting point when you want a dedicated desktop client and familiar controls; verify current Windows support and feature scope.",
  },
  {
    id: "expressvpn",
    label: "Documented Windows controls",
    note: "Worth inspecting when split tunneling, startup and kill-switch documentation matter; confirm the current Windows version and plan tier.",
  },
  {
    id: "surfshark",
    label: "Multi-device Windows option",
    note: "A comparison path for households using Windows alongside other devices; verify the current app, simultaneous-device policy and terms.",
  },
] as const satisfies ReadonlyArray<{
  id: VpnLinkSlug;
  label: string;
  note: string;
}>;

const checks = [
  [
    "Windows version and architecture",
    "Match the provider's current app requirements to Windows 10/11, ARM64 or any legacy system you still operate.",
  ],
  [
    "Kill switch scope",
    "Find the setting, note LAN/app exceptions and test what happens when the VPN connection drops.",
  ],
  [
    "Split tunneling",
    "Confirm whether routing is per-app, per-IP or unavailable, then test the apps and services you actually use.",
  ],
  [
    "Startup and recovery",
    "Check auto-connect, sleep/wake behaviour, network changes and what happens after an update or reboot.",
  ],
  [
    "Manual fallback",
    "Keep provider credentials and OpenVPN/WireGuard profiles available if the native app cannot connect.",
  ],
  [
    "Plan and privacy terms",
    "Compare upfront total, renewal, devices, refund policy, ownership and published audit scope.",
  ],
] as const;

export function WindowsVpnEditorialPage() {
  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.windowsVpn}
      navigation={[
        { href: "#quick-picks", label: "Options" },
        { href: "#comparison", label: "Compare" },
        { href: "#setup", label: "Windows checks" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="flex flex-col">
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Best VPNs", href: "/best/best-vpn" },
              { name: "Windows VPNs", href: "/best/vpn-windows" },
            ]}
          />
        </div>
        <article className="container max-w-5xl py-8 lg:py-12">
          <header className="mb-10 max-w-4xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
              <MonitorCog className="size-4" aria-hidden="true" />
              Windows VPN decision guide
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {windowsVpnEditorialTitle}
            </h1>
            <p className="mt-5 text-xl text-muted-foreground">
              {windowsVpnEditorialDescription}
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6">
              <CircleAlert
                className="mt-0.5 size-5 shrink-0 text-amber-700"
                aria-hidden="true"
              />
              <p>
                <strong>Evidence boundary:</strong> Windows versions, app
                features, prices and protocols change. These providers are
                comparison paths, not a universal speed ranking or guarantee of
                every desktop workflow.
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Reviewed 13 August 2026 · DataForSEO was used for intent and
              question coverage; current provider details must be checked at
              source.
            </p>
          </header>

          <section id="quick-picks" className="scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Windows VPN options to verify
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Choose the provider whose current Windows app and support path
              match your version, apps and threat model. Open the provider link
              to verify current terms.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {providerRows.map((row) => {
                const vpn = getVpnById(row.id);
                if (!vpn) return null;
                const price = vpn.priceTwoYear ?? vpn.priceYearly;
                const affiliateUrl = getVpnAffiliateUrl(row.id);
                return (
                  <article
                    key={row.id}
                    className="rounded-xl border bg-card p-5 shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      <span>{row.label}</span>
                    </div>
                    <h3 className="text-xl font-semibold">
                      <Link
                        href={`/reviews/${vpn.slug}`}
                        className="hover:text-primary"
                      >
                        {vpn.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {row.note}
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
                      total and renewal.
                    </p>
                    <AffiliateButton
                      vpnId={vpn.id}
                      vpnName={vpn.name}
                      affiliateUrl={affiliateUrl}
                      className="mt-4 w-full"
                    >
                      Check {vpn.name} for Windows
                    </AffiliateButton>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="comparison" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">What to compare on Windows</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              A Windows VPN comparison should describe the controls you can test
              on your own PC, not recycle an unexplained desktop speed score.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[760px] text-left text-sm">
                <caption className="sr-only">
                  Windows VPN comparison checklist
                </caption>
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="p-4">
                      Check
                    </th>
                    <th scope="col" className="p-4">
                      Why it matters
                    </th>
                    <th scope="col" className="p-4">
                      What to verify
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "OS support",
                      "A current app may not support every Windows edition",
                      "Windows version, ARM64/legacy path, installer and update policy",
                    ],
                    [
                      "Split tunneling",
                      "Some apps need the VPN while others need direct access",
                      "Per-app/IP rules, DNS behaviour and exceptions",
                    ],
                    [
                      "Kill switch",
                      "A disconnect can expose traffic or interrupt work",
                      "Scope, LAN exceptions and behaviour during sleep/reconnect",
                    ],
                    [
                      "Startup and updates",
                      "Desktop apps run through reboots and network changes",
                      "Auto-connect, service startup, notifications and recovery",
                    ],
                    [
                      "Trust and terms",
                      "Desktop integration does not establish privacy or value",
                      "Policy, audits, ownership, total cost, renewal and refund window",
                    ],
                  ].map(([check, why, verify]) => (
                    <tr key={check} className="border-t">
                      <th scope="row" className="p-4 font-semibold">
                        {check}
                      </th>
                      <td className="p-4">{why}</td>
                      <td className="p-4">{verify}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="setup" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Six Windows checks before you subscribe
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {checks.map(([title, text]) => (
                <div key={title} className="rounded-xl border p-5">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <CheckCircle2
                      className="size-4 text-green-600"
                      aria-hidden="true"
                    />
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Official setup references:{" "}
              <a
                href="https://support.nordvpn.com/hc/en-us/articles/19472023025169-How-to-install-and-use-the-NordVPN-app-on-Windows"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                NordVPN Windows support
              </a>
              ,{" "}
              <a
                href="https://www.expressvpn.com/support/vpn-setup/app-for-windows/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                ExpressVPN Windows support
              </a>{" "}
              and{" "}
              <a
                href="https://support.surfshark.com/hc/en-us/articles/360009416914-How-to-set-up-Surfshark-VPN-on-Windows"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Surfshark Windows support
              </a>
              .
            </p>
          </section>

          <section id="faq" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Windows VPN FAQ</h2>
            <div className="mt-5 space-y-5">
              {windowsVpnEditorialFaq.map((item) => (
                <div key={item.question} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            <FAQSchema title="Windows VPN FAQ" faqs={windowsVpnEditorialFaq} />
          </section>
          <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
            <h2 className="text-2xl font-bold">Sources and related routes</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The dated US/English DataForSEO dossier informs intent and
              question coverage only. Provider claims belong to current
              first-party documentation.
            </p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <li>
                <Link href="/best/vpn-linux" className="text-primary underline">
                  Linux VPN comparison
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
                  Privacy VPN evidence guide
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/vpn-protocols-explained"
                  className="text-primary underline"
                >
                  VPN protocol guide
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
