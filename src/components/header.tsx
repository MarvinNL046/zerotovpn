"use client";

import { ZeroToVpnLogo } from "@/components/brand/zerotovpn-logo";
import { Button } from "@/components/ui/button";
import {
  getBestVpnNavigationGroups,
  type SiteNavigationItemId,
} from "@/data/site-navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowLeftRight,
  BookOpen,
  ChevronDown,
  FileText,
  FlaskConical,
  Gamepad2,
  Globe,
  Laptop,
  Menu,
  ShieldAlert,
  Smartphone,
  Star,
  Trophy,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./header.module.css";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

function MegaMenu({
  trigger,
  children,
  isOpen,
  active = false,
  onToggle,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  active?: boolean;
  onToggle: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const instanceId = useId();
  const triggerId = `megamenu-trigger-${instanceId}`;
  const panelId = `megamenu-panel-${instanceId}`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onToggle();
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        id={triggerId}
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          "inline-flex min-h-12 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all",
          active || isOpen
            ? "bg-[#b8e34a] text-[#071226] shadow-sm hover:bg-[#a9d63d]"
            : "text-slate-600 hover:bg-white hover:text-[#071226] dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white",
        )}
      >
        {trigger}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen ? (
        <div
          id={panelId}
          role="group"
          aria-labelledby={triggerId}
          className={cn(
            "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/15 dark:border-slate-700 dark:bg-slate-900",
            styles.megaMenuPanel,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isNl = locale === "nl";
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const bestNavigationGroups = getBestVpnNavigationGroups(locale);

  const bestNavigationIcons: Record<SiteNavigationItemId, typeof Trophy> = {
    "best-vpn": Trophy,
    reviews: Star,
    compare: ArrowLeftRight,
    "vpn-picker": Wrench,
    gaming: Gamepad2,
    privacy: ShieldAlert,
    macos: Laptop,
    android: Smartphone,
    countries: Globe,
    china: Globe,
    iran: Globe,
    netherlands: Globe,
  };

  const copy = isNl
    ? {
        choose: "Kiezen",
        countryGuides: "Landengidsen",
        startSimple: "Begin bij de basis",
        learn: "Uitleg",
        evidence: "Bewijs en beleid",
        reports: "Rapporten",
        bestOverview: "Beste VPN's vergelijken",
        vpnPicker: "VPN-keuzehulp",
        countriesOverview: "Alle landengidsen",
        netherlands: "VPN in Nederland",
        whatIsVpn: "Wat is een VPN?",
        privacyGuide: "VPN en privacy",
        speedGuide: "VPN en snelheid",
        guidesOverview: "Alle gidsen",
        toolsOverview: "Alle tools",
        ipChecker: "Bekijk je IP-adres",
        speedTest: "Internetsnelheid testen",
        reportsOverview: "Onderzoeksrapporten",
        editorialPolicy: "Redactioneel beleid",
        about: "Over ZeroToVPN",
      }
    : {
        choose: "Choose",
        countryGuides: "Country guides",
        startSimple: "Start with the basics",
        learn: "Learn",
        evidence: "Evidence and policy",
        reports: "Reports",
        bestOverview: "Compare the best VPNs",
        vpnPicker: "VPN picker",
        countriesOverview: "All country guides",
        netherlands: "VPN in the Netherlands",
        whatIsVpn: "What is a VPN?",
        privacyGuide: "VPN and privacy",
        speedGuide: "VPN and speed",
        guidesOverview: "All guides",
        toolsOverview: "All tools",
        ipChecker: "Check your IP address",
        speedTest: "Test your internet speed",
        reportsOverview: "Research reports",
        editorialPolicy: "Editorial policy",
        about: "About ZeroToVPN",
      };

  const bestMenuActive =
    pathname.startsWith("/best") ||
    pathname.startsWith("/countries") ||
    pathname.startsWith("/compare") ||
    pathname.startsWith("/quiz");
  const resourcesMenuActive = [
    "/guides",
    "/tools",
    "/speed-test",
    "/methodology",
    "/editorial-policy",
    "/about",
  ].some((route) => pathname.startsWith(route));

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/95">
      <div
        className={cn(
          "container grid h-16 items-center gap-3 lg:gap-5",
          styles.headerGrid,
        )}
      >
        <Link
          href="/"
          aria-label="ZeroToVPN"
          className="flex min-h-12 items-center justify-self-start"
          style={{ justifySelf: "start" }}
        >
          <ZeroToVpnLogo wordmarkClassName={styles.responsiveWordmark} />
        </Link>

        <nav
          aria-label={t("mainNavigation")}
          className="hidden items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-100 p-0.5 shadow-sm lg:flex dark:border-slate-700/80 dark:bg-slate-800"
        >
          <Link
            href="/reviews"
            className={cn(
              "inline-flex min-h-12 items-center rounded-xl px-4 py-2 text-sm font-semibold transition-all",
              pathname.startsWith("/reviews")
                ? "bg-[#b8e34a] text-[#071226] shadow-sm hover:bg-[#a9d63d]"
                : "text-slate-600 hover:bg-white hover:text-[#071226] dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white",
            )}
          >
            {t("reviews")}
          </Link>

          <MegaMenu
            trigger={
              <>
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                {t("best")}
              </>
            }
            isOpen={openMenu === "best"}
            active={bestMenuActive}
            onToggle={() => toggleMenu("best")}
          >
            <div className="grid grid-cols-3 gap-6">
              {bestNavigationGroups.map((group) => (
                <div key={group.id}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const ItemIcon = bestNavigationIcons[item.id];

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          locale={item.targetLocale}
                          onClick={() => setOpenMenu(null)}
                          className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#071226] dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                          <ItemIcon
                            className="h-4 w-4 shrink-0 text-[#1268f3] dark:text-cyan-300"
                            aria-hidden="true"
                          />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </MegaMenu>

          <MegaMenu
            trigger={
              <>
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {t("resources")}
              </>
            }
            isOpen={openMenu === "resources"}
            active={resourcesMenuActive}
            onToggle={() => toggleMenu("resources")}
          >
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {copy.learn}
                </p>
                <div className="space-y-1">
                  {[
                    {
                      href: "/guides",
                      label: copy.guidesOverview,
                      icon: BookOpen,
                    },
                    {
                      href: "/guides/what-is-vpn",
                      label: copy.whatIsVpn,
                      icon: ShieldAlert,
                    },
                    {
                      href: "/guides/vpn-privacy-guide",
                      label: copy.privacyGuide,
                      icon: ShieldAlert,
                    },
                    {
                      href: "/guides/vpn-speed-guide",
                      label: copy.speedGuide,
                      icon: Zap,
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 rounded-lg text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#071226] dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <item.icon
                        className="h-4 w-4 shrink-0 text-[#1268f3] dark:text-cyan-300"
                        aria-hidden="true"
                      />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("tools")}
                </p>
                <div className="space-y-1">
                  {[
                    {
                      href: "/tools",
                      label: copy.toolsOverview,
                      icon: Wrench,
                    },
                    {
                      href: "/tools/what-is-my-ip",
                      label: copy.ipChecker,
                      icon: Globe,
                    },
                    {
                      href: "/speed-test",
                      label: copy.speedTest,
                      icon: Zap,
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 rounded-lg text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#071226] dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <item.icon
                        className="h-4 w-4 shrink-0 text-[#1268f3] dark:text-cyan-300"
                        aria-hidden="true"
                      />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {copy.evidence}
                </p>
                <div className="space-y-1">
                  {[
                    {
                      href: "/methodology",
                      label: t("methodology"),
                      icon: FlaskConical,
                    },
                    {
                      href: "/reports",
                      label: copy.reportsOverview,
                      icon: FileText,
                    },
                    {
                      href: "/editorial-policy",
                      label: copy.editorialPolicy,
                      icon: FileText,
                    },
                    { href: "/about", label: copy.about, icon: Star },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 rounded-lg text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#071226] dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <item.icon
                        className="h-4 w-4 shrink-0 text-[#1268f3] dark:text-cyan-300"
                        aria-hidden="true"
                      />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </MegaMenu>

          <Link
            href="/reports"
            className={cn(
              "inline-flex min-h-12 items-center rounded-xl px-4 py-2 text-sm font-semibold transition-all",
              pathname.startsWith("/reports")
                ? "bg-[#b8e34a] text-[#071226] shadow-sm hover:bg-[#a9d63d]"
                : "text-slate-600 hover:bg-white hover:text-[#071226] dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white",
            )}
          >
            {copy.reports}
          </Link>
        </nav>

        <div
          className="flex items-center justify-self-end gap-2 lg:border-l lg:border-slate-200 lg:pl-4 dark:lg:border-slate-700"
          style={{ justifySelf: "end" }}
        >
          <ThemeToggle />
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="min-h-12 min-w-12 lg:hidden"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label={t("mobileNavigation")}
          className="max-h-[80vh] overflow-y-auto border-t border-slate-200 bg-white/95 shadow-xl backdrop-blur-xl lg:hidden dark:border-slate-700 dark:bg-slate-900/95"
        >
          <div className="container space-y-5 py-5">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/reviews"
                onClick={closeMobileMenu}
                className={cn(
                  "flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold",
                  pathname.startsWith("/reviews")
                    ? "bg-[#b8e34a] text-[#071226]"
                    : "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
                )}
              >
                {t("reviews")}
              </Link>
              <Link
                href="/reports"
                onClick={closeMobileMenu}
                className={cn(
                  "flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold",
                  pathname.startsWith("/reports")
                    ? "bg-[#b8e34a] text-[#071226]"
                    : "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
                )}
              >
                {copy.reports}
              </Link>
            </div>

            {bestNavigationGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/70"
              >
                <p className="mb-2 flex items-center gap-2 px-2 text-sm font-semibold text-[#1268f3] dark:text-cyan-300">
                  {group.id === "needs" ? (
                    <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                  ) : group.id === "countries" ? (
                    <Globe className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Star className="h-4 w-4" aria-hidden="true" />
                  )}
                  {group.label}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {group.items
                    .filter(
                      (item) => group.id !== "choose" || item.id !== "reviews",
                    )
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        locale={item.targetLocale}
                        onClick={closeMobileMenu}
                        className="flex min-h-12 items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-[#071226] dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <p className="mb-2 flex items-center gap-2 px-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                {copy.learn}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { href: "/guides", label: copy.guidesOverview },
                  { href: "/guides/what-is-vpn", label: copy.whatIsVpn },
                  {
                    href: "/guides/vpn-privacy-guide",
                    label: copy.privacyGuide,
                  },
                  {
                    href: "/guides/vpn-speed-guide",
                    label: copy.speedGuide,
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex min-h-12 items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-[#071226] dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <p className="mb-2 flex items-center gap-2 px-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <Wrench className="h-4 w-4" aria-hidden="true" />
                {t("resources")}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { href: "/tools", label: copy.toolsOverview },
                  { href: "/tools/what-is-my-ip", label: copy.ipChecker },
                  { href: "/speed-test", label: copy.speedTest },
                  { href: "/methodology", label: t("methodology") },
                  { href: "/editorial-policy", label: copy.editorialPolicy },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex min-h-12 items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-[#071226] dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
