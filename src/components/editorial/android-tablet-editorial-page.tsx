import {
  CheckCircle2,
  CircleAlert,
  ShieldCheck,
  TabletSmartphone,
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

export const androidTabletEditorialTitle =
  "Best VPN for Android Tablets in 2026: App Support, Setup and Trade-offs";
export const androidTabletEditorialDescription =
  "A practical Android tablet VPN comparison: verify app support, permissions, split tunneling, battery trade-offs and plan terms instead of trusting fixed scores.";

export const androidTabletEditorialFaq = [
  {
    question: "Do Android tablets need a VPN?",
    answer:
      "Only if your threat model calls for one. A VPN can encrypt traffic between the tablet and the VPN server on networks you do not control, but it does not stop malicious apps, phishing, account takeover or every form of tracking.",
  },
  {
    question: "Is a phone VPN app compatible with an Android tablet?",
    answer:
      "Often, but not always. Check the provider's Play Store listing, Android version requirements, tablet layout and whether the subscription allows the devices you plan to use.",
  },
  {
    question: "Does a VPN drain an Android tablet battery?",
    answer:
      "A VPN adds background work and may affect battery life, but the result depends on the protocol, signal quality, screen use and app behaviour. Measure your own before-and-after usage rather than relying on a universal percentage.",
  },
  {
    question: "Can an Android tablet VPN use split tunneling?",
    answer:
      "Some Android apps offer per-app routing, while others do not or limit it by platform. Treat split tunneling as a feature to verify in the current app settings, not as a tablet-wide guarantee.",
  },
  {
    question: "Can I install a VPN on a Samsung or Lenovo tablet?",
    answer:
      "Usually, if the tablet can use Google Play or the provider's supported installation path. Confirm the exact model, Android release, account region and app publisher before installing an APK.",
  },
  {
    question: "Which VPN is best for an Android tablet?",
    answer:
      "There is no universal winner. Start with the tablet's app support, your required locations and features, the provider's privacy evidence, device limit, refund terms and the amount you are willing to pay.",
  },
];

const providerRows = [
  {
    id: "nordvpn",
    label: "Broad Android feature set",
    note: "A starting point when you want a polished Android app and a larger provider ecosystem; verify current Android features and plan terms.",
  },
  {
    id: "surfshark",
    label: "Multi-device household",
    note: "Worth checking when one subscription needs to cover phones, tablets and other devices; confirm the current device policy.",
  },
  {
    id: "expressvpn",
    label: "Simple tablet setup",
    note: "A comparison option for a straightforward app flow; verify the current Android version support and refund channel.",
  },
] as const satisfies ReadonlyArray<{
  id: VpnLinkSlug;
  label: string;
  note: string;
}>;

const checks = [
  [
    "App compatibility",
    "Confirm the Play Store listing, Android version and exact tablet model before subscribing.",
  ],
  [
    "Permissions",
    "Review what the app requests and install only from the provider's official publisher or store listing.",
  ],
  [
    "Split tunneling",
    "Check whether per-app routing exists on Android and whether it behaves as your use case needs.",
  ],
  [
    "Battery and data",
    "Run a short direct-versus-VPN comparison on the same Wi-Fi or mobile signal.",
  ],
  [
    "Kill switch",
    "Find the Android setting, test what happens when the tunnel drops and keep a recovery path.",
  ],
  [
    "Terms",
    "Compare upfront total, renewal, device limits and refund window; a monthly equivalent is not the checkout total.",
  ],
] as const;

export function AndroidTabletEditorialPage() {
  return (
    <BestVpnEditorialTemplate
      brief={editorialContentBriefs.androidTabletVpn}
      navigation={[
        { href: "#quick-picks", label: "Options" },
        { href: "#comparison", label: "Compare" },
        { href: "#setup", label: "Setup checks" },
        { href: "#faq", label: "FAQ" },
        { href: "#sources", label: "Sources" },
      ]}
    >
      <div className="flex flex-col">
        <div className="container pt-6">
          <BreadcrumbSchema
            items={[
              { name: "Best VPNs", href: "/best/best-vpn" },
              { name: "Android tablet VPNs", href: "/best/vpn-android-tablet" },
            ]}
          />
        </div>
        <article className="container max-w-5xl py-8 lg:py-12">
          <header className="mb-10 max-w-4xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
              <TabletSmartphone className="size-4" aria-hidden="true" />
              Android tablet decision guide
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {androidTabletEditorialTitle}
            </h1>
            <p className="mt-5 text-xl text-muted-foreground">
              {androidTabletEditorialDescription}
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6">
              <CircleAlert
                className="mt-0.5 size-5 shrink-0 text-amber-700"
                aria-hidden="true"
              />
              <p>
                <strong>Evidence boundary:</strong> tablet layouts, Android
                versions, prices and app features change. The options below are
                comparison starting points, not fixed scores or a claim that one
                provider improves every tablet.
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Reviewed 13 August 2026 · DataForSEO was used for question and
              intent coverage; current provider details must be verified at
              source.
            </p>
          </header>

          <section id="quick-picks" className="scroll-mt-24">
            <h2 className="text-3xl font-bold">
              Android tablet VPN options to verify
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              These providers are relevant comparison paths for an Android
              tablet. Open the provider link to verify the current app, pricing,
              device policy and refund terms.
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
                      Check {vpn.name} for Android
                    </AffiliateButton>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="comparison" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">What to compare on a tablet</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              A credible device comparison focuses on the experience you can
              verify on the tablet, not a recycled desktop rating.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[720px] text-left text-sm">
                <caption className="sr-only">
                  Android tablet VPN comparison checklist
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
                      "Tablet app support",
                      "A phone-first interface can be awkward on a large screen",
                      "Store listing, screenshots, Android version and model compatibility",
                    ],
                    [
                      "Network controls",
                      "The VPN changes routing for the apps you select",
                      "Kill switch, per-app routing and behaviour after reconnect",
                    ],
                    [
                      "Privacy evidence",
                      "A VPN is not a complete security product",
                      "Policy, audits, ownership, app publisher and update history",
                    ],
                    [
                      "Plan terms",
                      "Device limits and refund channels affect value",
                      "Upfront total, renewal, simultaneous devices and refund exclusions",
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
              Six setup checks before you subscribe
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
              Android&apos;s own{" "}
              <a
                href="https://support.google.com/android/answer/9089766"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                VPN help
              </a>{" "}
              explains the system-level connection and always-on settings; the
              provider app still determines its own controls.
            </p>
          </section>

          <section id="faq" className="mt-16 scroll-mt-24">
            <h2 className="text-3xl font-bold">Android tablet VPN FAQ</h2>
            <div className="mt-5 space-y-5">
              {androidTabletEditorialFaq.map((item) => (
                <div key={item.question} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            <FAQSchema
              title="Android tablet VPN FAQ"
              faqs={androidTabletEditorialFaq}
            />
          </section>
          <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8">
            <h2 className="text-2xl font-bold">Sources and related routes</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The dated US/English DataForSEO dossier is used for intent and
              question coverage only. Provider claims belong to current
              first-party pages.
            </p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
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
                  href="/best/vpn-mobile"
                  className="text-primary underline"
                >
                  Mobile VPN guide
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
                <Link href="/methodology" className="text-primary underline">
                  ZeroToVPN methodology
                </Link>
              </li>
              <li>
                <a
                  href="https://developer.android.com/develop/connectivity/vpn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Android VPN developer documentation
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </BestVpnEditorialTemplate>
  );
}
