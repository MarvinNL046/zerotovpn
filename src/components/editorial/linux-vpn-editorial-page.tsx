import { CheckCircle2, CircleAlert, Code2, TerminalSquare } from "lucide-react";
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

export const linuxVpnEditorialTitle =
  "Best VPNs for Linux in 2026: Native Apps, CLI and Distro Support";
export const linuxVpnEditorialDescription =
  "Compare Linux VPNs by supported distributions, GUI and CLI options, manual profiles, kill-switch boundaries and plan terms—not fixed speed ratings.";

export const linuxVpnEditorialFaq = [
  {
    question: "Which VPN has the best Linux support?",
    answer:
      "There is no universal winner. Compare the exact distro and version you run, whether you want a GUI or CLI, the provider's update path, manual configuration options and the privacy and plan evidence you can verify.",
  },
  {
    question: "Can I use a VPN on Linux without installing an app?",
    answer:
      "Yes. NetworkManager, OpenVPN and WireGuard can use provider configuration files. You may lose app-specific conveniences such as automatic server selection, provider kill-switch controls or split tunneling, so document your firewall and routing rules.",
  },
  {
    question: "Does Ubuntu have a built-in VPN?",
    answer:
      "Ubuntu can create VPN connections through NetworkManager, but it does not include a VPN subscription or provider server access. You still need a provider or your own endpoint and the correct credentials or configuration.",
  },
  {
    question: "Is WireGuard better than OpenVPN on Linux?",
    answer:
      "They make different trade-offs. WireGuard is a modern, small protocol with broad Linux support; OpenVPN is widely deployed and has extensive configuration options. Choose based on provider support, kernel/userspace compatibility, audit needs and the network you must use.",
  },
  {
    question: "Do Linux VPN apps include a kill switch?",
    answer:
      "Some native clients expose a kill switch, while manual profiles require you to build the boundary with firewall or routing rules. Test what happens when the tunnel drops; never assume a configuration file provides the same controls as a GUI app.",
  },
  {
    question: "Can I run a Linux VPN on a headless server?",
    answer:
      "Usually, through a CLI client, NetworkManager or OpenVPN/WireGuard profiles. A server use case needs extra care around SSH access, systemd startup ordering, DNS and recovery so you do not lock yourself out.",
  },
];

const providerRows = [
  {
    id: "nordvpn",
    label: "Native GUI plus CLI path",
    note: "A comparison starting point for Ubuntu, Debian, Fedora, Mint and Raspberry Pi OS users; verify the current distro list and app controls.",
  },
  {
    id: "expressvpn",
    label: "Documented Linux app",
    note: "Useful to inspect when distro/version documentation and GUI/CLI workflows matter; unsupported distributions may not receive fixes.",
  },
  {
    id: "surfshark",
    label: "GUI and manual routes",
    note: "Worth checking for a Linux desktop with GUI, Snap/Flatpak or manual setup; confirm architecture and system requirements.",
  },
] as const satisfies ReadonlyArray<{
  id: VpnLinkSlug;
  label: string;
  note: string;
}>;

const checks = [
  [
    "Exact distro and version",
    "Match the provider's current support list to your Ubuntu, Debian, Fedora, Arch, Mint, Raspberry Pi or other release.",
  ],
  [
    "GUI versus CLI",
    "Decide whether you need a desktop client, terminal commands, systemd automation or only a profile import.",
  ],
  [
    "Manual protocol files",
    "Confirm OpenVPN/WireGuard downloads, credential requirements and how updates or key rotation work.",
  ],
  [
    "Kill switch and DNS",
    "Find the provider setting or build your own firewall/routing boundary, then test a dropped tunnel.",
  ],
  [
    "Headless recovery",
    "Keep an out-of-band path for SSH, check startup ordering and avoid locking the management interface.",
  ],
  [
    "Plan and privacy terms",
    "Compare the upfront total, renewal, device limit, refund policy, ownership and published audits.",
  ],
] as const;

export function LinuxVpnEditorialPage() {
  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.linuxVpn}
      navigation={[
        { href: "#quick-picks", label: "Options" },
        { href: "#comparison", label: "Compare" },
        { href: "#setup", label: "Linux checks" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="flex flex-col">
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Best VPNs", href: "/best/best-vpn" },
              { name: "Linux VPNs", href: "/best/vpn-linux" },
            ]}
          />
        </div>
        <article className="container max-w-5xl py-8 lg:py-12">
          <header className="mb-10 max-w-4xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
              <TerminalSquare className="size-4" aria-hidden="true" />
              Linux VPN decision guide
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {linuxVpnEditorialTitle}
            </h1>
            <p className="mt-5 text-xl text-muted-foreground">
              {linuxVpnEditorialDescription}
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6">
              <CircleAlert
                className="mt-0.5 size-5 shrink-0 text-amber-700"
                aria-hidden="true"
              />
              <p>
                <strong>Evidence boundary:</strong> distro support, app
                features, prices and protocol availability change. The options
                below are comparison paths, not a universal speed ranking or
                guarantee of every Linux workflow.
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Reviewed 13 August 2026 · DataForSEO was used for intent and
              question coverage; current provider details must be checked at
              source.
            </p>
          </header>

          <section id="quick-picks" className="scroll-mt-24">
            <h2 className="text-3xl font-bold">Linux VPN options to verify</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Start with the provider whose documented app and manual setup
              match your distro. Open the provider link to verify the current
              download, plan and refund terms.
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
                      <Code2
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
                      Check {vpn.name} for Linux
                    </AffiliateButton>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="comparison" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">What to compare on Linux</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Linux support is more than a logo on a download page. Compare the
              maintenance and control surface you will actually use.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[760px] text-left text-sm">
                <caption className="sr-only">
                  Linux VPN comparison checklist
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
                      "Distro coverage",
                      "A package may support only selected releases",
                      "Current Ubuntu/Debian/Fedora/Arch/Mint versions and architecture",
                    ],
                    [
                      "GUI and CLI",
                      "Desktop and headless workflows need different controls",
                      "Install path, login flow, commands, systemd and startup behaviour",
                    ],
                    [
                      "Manual profiles",
                      "NetworkManager or a server may not use the native client",
                      "OpenVPN/WireGuard files, credentials, endpoint and update process",
                    ],
                    [
                      "Leak and failure handling",
                      "A dropped tunnel can expose traffic or cut SSH access",
                      "Kill switch, DNS, firewall rules and recovery procedure",
                    ],
                    [
                      "Trust and terms",
                      "Linux compatibility does not establish privacy or value",
                      "Policy, audits, ownership, upfront total, renewal and refund window",
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
              Six Linux checks before you subscribe
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
                href="https://nordvpn.com/download/linux/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                NordVPN Linux documentation
              </a>
              ,{" "}
              <a
                href="https://www.expressvpn.com/support/vpn-setup/app-for-linux/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                ExpressVPN Linux documentation
              </a>{" "}
              and{" "}
              <a
                href="https://support.surfshark.com/hc/en-us/articles/5067279648146-How-to-set-up-Surfshark-VPN-on-Linux"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Surfshark Linux support
              </a>
              .
            </p>
          </section>

          <section id="faq" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Linux VPN FAQ</h2>
            <div className="mt-5 space-y-5">
              {linuxVpnEditorialFaq.map((item) => (
                <div key={item.question} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            <FAQSchema title="Linux VPN FAQ" faqs={linuxVpnEditorialFaq} />
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
                <Link
                  href="/guides/vpn-protocols-explained"
                  className="text-primary underline"
                >
                  VPN protocol guide
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
                  href="/best/vpn-android"
                  className="text-primary underline"
                >
                  Android VPN comparison
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-primary underline">
                  ZeroToVPN methodology
                </Link>
              </li>
              <li>
                <a
                  href="https://www.wireguard.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  WireGuard official project
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </BestVpnEditorialTemplate>
  );
}
