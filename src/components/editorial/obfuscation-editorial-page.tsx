import {
  ArrowRight,
  ExternalLink,
  EyeOff,
  FileCheck2,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { IranEditorialQuickPicks } from "@/components/editorial/iran-editorial-quick-picks";
import { Link } from "@/i18n/navigation";
import type { VpnData } from "@/lib/vpn-data-layer";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";

const pageUrl = "https://www.zerotovpn.com/guides/vpn-obfuscation-explained";
const faq = [
  {
    question: "What is VPN obfuscation?",
    answer:
      "Obfuscation is a compatibility technique that changes how VPN traffic appears to a network filter. It does not remove encryption, make you anonymous or guarantee that a connection will work on a particular ISP, device or date.",
  },
  {
    question: "Is an obfuscated VPN safe?",
    answer:
      "It can be useful when a network disrupts ordinary VPN traffic, but safety still depends on the provider, protocol, app version, kill-switch behaviour and your lawful use. Treat obfuscation as one feature to verify, not as a complete privacy strategy.",
  },
  {
    question: "Which VPN has obfuscation?",
    answer:
      "Provider support changes by plan, platform and protocol. NordVPN documents obfuscated servers that require OpenVPN TCP or UDP; Proton documents Stealth and alternative routing. Check the live support page and app path before relying on a feature.",
  },
  {
    question: "Can my employer tell that I use an obfuscated VPN?",
    answer:
      "Obfuscation may change the traffic signal, but it is not invisibility. A network administrator can still use endpoint, timing, account, device or policy signals. Follow the network owner’s rules and do not treat a VPN as permission to bypass workplace controls.",
  },
  {
    question: "Does obfuscation work in China, Russia or Iran?",
    answer:
      "Results are network-, device-, protocol- and date-specific. The dedicated country pages document current evidence and preparation questions, but none can promise permanent access. Prepare official apps and a fallback route before travel or a block.",
  },
];

const nav = [
  { href: "#quick-picks", label: "Shortlist" },
  { href: "#what-is", label: "What it does" },
  { href: "#compare", label: "Compare" },
  { href: "#test-plan", label: "Test plan" },
  { href: "#faq", label: "FAQ" },
  { href: "#sources", label: "Sources" },
] as const;

export function ObfuscationEditorialPage({ vpns }: { vpns: VpnData[] }) {
  return (
    <>
      <ArticleJsonLd
        title="VPN Obfuscation Explained: Stealth, OpenVPN and What to Verify"
        description="An evidence-led guide to VPN obfuscation, stealth features, protocol trade-offs and bounded network testing."
        url={pageUrl}
        datePublished="2026-01-01"
        dateModified="2026-08-11"
      />
      <BreadcrumbSchema
        items={[
          { name: "Guides", href: "/guides" },
          {
            name: "VPN obfuscation explained",
            href: "/guides/vpn-obfuscation-explained",
          },
        ]}
      />
      <FAQSchema title="VPN obfuscation FAQ" faqs={faq} />
      <BestVpnEditorialTemplate
        brief={editorialContentBriefs.obfuscation}
        navigation={nav}
      >
        <article>
          <section className="border-b bg-gradient-to-br from-violet-500/10 via-background to-background py-14 lg:py-20">
            <div className="container max-w-5xl">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  Updated August 11, 2026 · network-compatibility guide
                </p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                  VPN obfuscation explained: what stealth modes do—and what they
                  cannot promise
                </h1>
                <p className="mt-6 text-xl leading-8 text-muted-foreground">
                  Obfuscation can change how VPN traffic is presented to a
                  filter. It cannot make you invisible or prove that a provider
                  works everywhere. This guide explains the trade-offs, the
                  evidence to save and a bounded way to test.
                </p>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  Independent editorial research. Affiliate links may earn us a
                  commission;{" "}
                  <Link href="/affiliate-disclosure" className="underline">
                    read our disclosure
                  </Link>
                  . Always check current provider documentation and local rules.
                </p>
              </div>
            </div>
          </section>

          <IranEditorialQuickPicks
            vpns={vpns}
            heading="Providers worth evaluating for stealth features"
            eyebrow="Obfuscation shortlist"
            description="These contextual affiliate links point to providers worth checking. Confirm the current platform, protocol and obfuscation path before subscribing; the cards are not proof of connectivity on your network."
          />

          <section
            id="what-is"
            className="container max-w-5xl scroll-mt-24 py-12 lg:py-16"
          >
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  Start with the boundary
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  Obfuscation is not a magic cloak
                </h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  A network can block or disrupt VPN traffic by looking at
                  protocol patterns, ports, endpoints and other signals. A
                  stealth mode tries to make that traffic less distinctive, but
                  the exact implementation varies by provider and platform.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border bg-card p-5">
                  <EyeOff className="size-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-semibold">Changes the signal</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    It may alter how traffic looks to a filter; it does not
                    erase endpoint or account signals.
                  </p>
                </div>
                <div className="rounded-xl border bg-card p-5">
                  <ShieldCheck
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-semibold">Needs a real protocol</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Check whether the feature requires OpenVPN TCP/UDP,
                    WireGuard or a provider-specific mode.
                  </p>
                </div>
                <div className="rounded-xl border bg-card p-5">
                  <TriangleAlert
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-semibold">No guarantee</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    A documented feature is evidence of support—not proof of
                    access, legality or permanence.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="compare"
            className="scroll-mt-24 border-y bg-muted/30 py-12 lg:py-16"
          >
            <div className="container max-w-5xl">
              <h2 className="text-3xl font-bold">
                What to compare before you choose
              </h2>
              <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
                Use the provider’s current support page and your own test notes.
                Avoid rankings based only on a feature name.
              </p>
              <div className="mt-6 overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <caption className="sr-only">
                    VPN obfuscation decision table
                  </caption>
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="p-4 font-semibold">Question</th>
                      <th className="p-4 font-semibold">Evidence to save</th>
                      <th className="p-4 font-semibold">Why it matters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-semibold">
                        Which platform supports it?
                      </td>
                      <td className="p-4">
                        Provider page, app version and screenshots of the
                        setting
                      </td>
                      <td className="p-4">
                        Desktop, mobile and router paths can differ.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">
                        Which protocol is required?
                      </td>
                      <td className="p-4">
                        OpenVPN TCP/UDP, WireGuard or proprietary mode
                      </td>
                      <td className="p-4">
                        A protocol choice changes speed, battery and
                        blockability trade-offs.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">
                        What happens when it fails?
                      </td>
                      <td className="p-4">
                        Kill-switch state, fallback behaviour and reconnect
                        notes
                      </td>
                      <td className="p-4">
                        A silent fallback can cross your privacy boundary.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">
                        What is the lawful context?
                      </td>
                      <td className="p-4">
                        Dated government, regulator or employer guidance
                      </td>
                      <td className="p-4">
                        Technical possibility is not legal authorisation.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section
            id="test-plan"
            className="container max-w-5xl scroll-mt-24 py-12 lg:py-16"
          >
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  Bounded test
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  Record a result you can actually reproduce
                </h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Do not infer permanent access from one page load. Keep the
                  test lawful and limited to the services you need.
                </p>
              </div>
              <ol className="space-y-3">
                {[
                  "Install the official app and save the recovery/update path before the network becomes restrictive.",
                  "Record device, OS, app version, network/ISP, server region, protocol, obfuscation setting and date/time.",
                  "Test one service at a time: browsing, messaging, calls, work tools or streaming can fail differently.",
                  "Repeat after sleep, reconnect and Wi-Fi/cellular hand-off; record failures and fallback behaviour.",
                  "Recheck the provider’s current documentation and local guidance before relying on the result.",
                ].map((step, index) => (
                  <li
                    key={step}
                    className="grid grid-cols-[2.25rem_1fr] gap-4 border p-4"
                  >
                    <span className="font-mono font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-7">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              <FileCheck2 className="mr-2 inline size-4" aria-hidden="true" />A
              test note is evidence about your setup at that time, not a
              provider guarantee. Link it to the relevant{" "}
              <Link
                href="/guides/vpn-protocols-explained"
                className="underline"
              >
                protocol decision
              </Link>
              .
            </div>
          </section>

          <section
            id="faq"
            className="container max-w-5xl scroll-mt-24 py-12 lg:py-16"
          >
            <h2 className="text-3xl font-bold">VPN obfuscation FAQ</h2>
            <div className="mt-6 divide-y rounded-xl border">
              {faq.map((item) => (
                <details key={item.question} className="group p-5">
                  <summary className="cursor-pointer pr-8 font-semibold">
                    {item.question}
                    <ArrowRight
                      className="float-right size-4 transition-transform group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section
            id="sources"
            className="container max-w-5xl scroll-mt-24 border-t py-12 lg:py-16"
          >
            <h2 className="text-3xl font-bold">Sources and cluster links</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              <li>
                <a
                  className="underline"
                  href="https://support.nordvpn.com/hc/en-us/articles/19615332252561-Enable-or-disable-Obfuscated-servers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NordVPN support: obfuscated servers
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://protonvpn.com/support/how-to-change-vpn-protocols"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proton VPN support: changing protocols
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.wireguard.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WireGuard project documentation
                </a>
              </li>
              <li>
                DataForSEO US/English dossier fetched August 11, 2026: PAA
                questions on obfuscation, safety, detection and provider
                support. Search metrics prioritise questions; they do not prove
                performance.
              </li>
            </ul>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Continue with the{" "}
              <Link
                href="/blog/best-vpn-for-iran-2026-bypass-internet-censorship"
                className="underline"
              >
                Iran
              </Link>
              ,{" "}
              <Link href="/countries/russia" className="underline">
                Russia
              </Link>
              ,{" "}
              <Link href="/countries/china" className="underline">
                China
              </Link>{" "}
              and{" "}
              <Link
                href="/blog/best-vpn-for-telegram-2026"
                className="underline"
              >
                Telegram
              </Link>{" "}
              pages.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/best/best-vpn"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                Compare providers{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href="https://protonvpn.com/support/how-to-change-vpn-protocols"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                Read provider docs{" "}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </section>
          <p className="container max-w-5xl mt-6 text-sm leading-6 text-muted-foreground">
            Continue with the{" "}
            <Link
              href="/guides/vpn-for-restricted-networks"
              className="underline"
            >
              restricted-network preparation guide
            </Link>{" "}
            when a filter is the main constraint.
          </p>
        </article>
      </BestVpnEditorialTemplate>
    </>
  );
}
