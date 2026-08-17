import { ZeroToVpnLogo } from "@/components/brand/zerotovpn-logo";
import { NewsletterFooter } from "@/components/newsletter/newsletter-footer";
import { getFooterExploreNavigation } from "@/data/site-navigation";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";

function FooterNavLink({
  href,
  children,
  locale,
}: {
  href: string;
  children: ReactNode;
  locale?: "en";
}) {
  return (
    <li>
      <Link
        prefetch={false}
        href={href}
        locale={locale}
        className="inline-flex min-h-12 items-center rounded-lg py-2 text-sm leading-snug text-slate-300 transition-colors hover:text-[#b8e34a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8e34a] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isNl = locale === "nl";
  const currentYear = new Date().getFullYear();
  const exploreNavigation = getFooterExploreNavigation(locale);

  const copy = isNl
    ? {
        explore: "Kiezen en vergelijken",
        learn: "Duidelijke uitleg",
        tools: "Gratis tools",
        trust: "Over ons werk",
        best: "Beste VPN's vergelijken",
        compare: "VPN's naast elkaar",
        countries: "Landengidsen",
        netherlands: "VPN in Nederland",
        quiz: "VPN-keuzehulp",
        guides: "Alle VPN-gidsen",
        whatIsVpn: "Wat is een VPN?",
        privacyGuide: "VPN en privacy",
        speedGuide: "VPN en snelheid",
        reports: "Onderzoeksrapporten",
        allTools: "Alle tools",
        ip: "Bekijk je IP-adres",
        speedTest: "Internetsnelheid testen",
        dnsBeta: "DNS-lektest (begeleide bèta)",
        methodology: "Zo beoordelen we",
        editorial: "Redactioneel beleid",
        about: "Over ZeroToVPN",
        contact: "Contact",
        privacy: "Privacybeleid",
        terms: "Voorwaarden",
        affiliate: "Uitleg over partnerlinks",
        cookies: "Cookiebeleid",
      }
    : {
        explore: "Choose and compare",
        learn: "Clear guides",
        tools: "Free tools",
        trust: "About our work",
        best: "Compare the best VPNs",
        compare: "Compare VPNs",
        countries: "Country guides",
        netherlands: "VPN in the Netherlands",
        quiz: "VPN picker",
        guides: "All VPN guides",
        whatIsVpn: "What is a VPN?",
        privacyGuide: "VPN and privacy",
        speedGuide: "VPN and speed",
        reports: "Research reports",
        allTools: "All tools",
        ip: "Check your IP address",
        speedTest: "Test your internet speed",
        dnsBeta: "DNS leak test (guided beta)",
        methodology: "How we review",
        editorial: "Editorial policy",
        about: "About ZeroToVPN",
        contact: "Contact",
        privacy: "Privacy policy",
        terms: "Terms",
        affiliate: "Affiliate disclosure",
        cookies: "Cookie policy",
      };

  return (
    <footer className="bg-[#071226] text-white">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="space-y-4">
            <Link
              prefetch={false}
              href="/"
              aria-label="ZeroToVPN"
              className="flex min-h-12 items-center"
            >
              <ZeroToVpnLogo inverse wordmarkClassName="text-white" />
            </Link>
            <p className="max-w-xs text-sm leading-6 text-slate-300">
              {t("aboutText")}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#b8e34a]">
              {copy.explore}
            </h2>
            <ul>
              {exploreNavigation.map((item) => (
                <FooterNavLink
                  key={item.id}
                  href={item.href}
                  locale={item.targetLocale}
                >
                  {item.label}
                </FooterNavLink>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#b8e34a]">
              {copy.learn}
            </h2>
            <ul>
              <FooterNavLink href="/guides">{copy.guides}</FooterNavLink>
              <FooterNavLink href="/guides/what-is-vpn">
                {copy.whatIsVpn}
              </FooterNavLink>
              <FooterNavLink href="/guides/vpn-privacy-guide">
                {copy.privacyGuide}
              </FooterNavLink>
              <FooterNavLink href="/guides/vpn-speed-guide">
                {copy.speedGuide}
              </FooterNavLink>
              <FooterNavLink href="/reports">{copy.reports}</FooterNavLink>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#b8e34a]">
              {copy.tools}
            </h2>
            <ul>
              <FooterNavLink href="/tools">{copy.allTools}</FooterNavLink>
              <FooterNavLink href="/tools/what-is-my-ip">
                {copy.ip}
              </FooterNavLink>
              <FooterNavLink href="/speed-test">{copy.speedTest}</FooterNavLink>
              <FooterNavLink href="/tools/dns-leak-test">
                {copy.dnsBeta}
              </FooterNavLink>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#b8e34a]">
              {copy.trust}
            </h2>
            <ul>
              <FooterNavLink href="/methodology">
                {copy.methodology}
              </FooterNavLink>
              <FooterNavLink href="/editorial-policy">
                {copy.editorial}
              </FooterNavLink>
              <FooterNavLink href="/about">{copy.about}</FooterNavLink>
              <FooterNavLink href="/contact">{copy.contact}</FooterNavLink>
              <FooterNavLink href="/privacy-policy">
                {copy.privacy}
              </FooterNavLink>
              <FooterNavLink href="/terms">{copy.terms}</FooterNavLink>
              <FooterNavLink href="/affiliate-disclosure">
                {copy.affiliate}
              </FooterNavLink>
              <FooterNavLink href="/cookie-policy">
                {copy.cookies}
              </FooterNavLink>
            </ul>
          </div>

          <div>
            <NewsletterFooter />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-700/60 pt-8">
          <p className="text-center text-sm leading-6 text-slate-300">
            {t("disclaimer")}
          </p>
          <p className="text-center text-sm text-slate-400">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
