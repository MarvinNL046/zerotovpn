"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Shield, Menu, X, Star, Zap, Globe, Tag, ChevronDown, Trophy, Gamepad2,
  Gift, Smartphone, Laptop, Monitor, Apple, Wrench, ShieldAlert, BarChart3,
  FlaskConical, BookOpen, ArrowLeftRight, Newspaper, FileText,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

// Mega menu component
function MegaMenu({
  trigger,
  children,
  isOpen,
  onToggle,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (isOpen) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={onToggle} className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
        {trigger}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border rounded-xl shadow-xl p-5 z-50 min-w-[480px]">
          {children}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">
            Zero<span className="text-primary">To</span>VPN
          </span>
        </Link>

        {/* Desktop Navigation — consolidated to 5 items */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Reviews */}
          <Link
            href="/reviews"
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:text-primary hover:bg-muted",
              pathname.startsWith("/reviews") ? "text-primary bg-muted" : "text-muted-foreground"
            )}
          >
            {t("reviews")}
          </Link>

          {/* Best VPNs — Mega Menu */}
          <MegaMenu
            trigger={<><Star className="h-3.5 w-3.5" /> {t("best")}</>}
            isOpen={openMenu === "best"}
            onToggle={() => toggleMenu("best")}
          >
            <div className="grid grid-cols-3 gap-6">
              {/* Column 1: By Use Case */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">By Use Case</p>
                <div className="space-y-1">
                  {[
                    { href: "/best/best-vpn", label: t("bestVpn"), icon: Trophy },
                    { href: "/best/free-vpn", label: t("freeVpn"), icon: Gift },
                    { href: "/best/vpn-gaming", label: t("vpnGaming"), icon: Gamepad2 },
                    { href: "/best/vpn-streaming", label: "Streaming", icon: Monitor },
                    { href: "/best/vpn-torrenting", label: "Torrenting", icon: Zap },
                    { href: "/best/vpn-privacy", label: "Privacy", icon: ShieldAlert },
                  ].map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: By Country */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">By Country</p>
                <div className="space-y-1">
                  {[
                    { href: "/best/vpn-china", label: t("vpnChina") },
                    { href: "/best/vpn-russia", label: t("vpnRussia") },
                    { href: "/best/vpn-uae", label: t("vpnUae") },
                    { href: "/best/vpn-iran", label: t("vpnIran") },
                    { href: "/best/vpn-thailand", label: t("vpnThailand") },
                  ].map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/countries" onClick={() => setOpenMenu(null)}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-primary font-medium rounded-md hover:bg-muted transition-colors">
                    All 59+ Countries →
                  </Link>
                </div>
              </div>

              {/* Column 3: By Device */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">By Device</p>
                <div className="space-y-1">
                  {[
                    { href: "/best/vpn-windows", label: t("vpnWindows"), icon: Monitor },
                    { href: "/best/vpn-macos", label: t("vpnMacos"), icon: Apple },
                    { href: "/best/vpn-laptops", label: t("vpnLaptops"), icon: Laptop },
                    { href: "/best/vpn-linux", label: t("vpnLinux"), icon: Monitor },
                    { href: "/best/vpn-chromebook", label: t("vpnChromebook"), icon: Laptop },
                    { href: "/best/vpn-mobile", label: t("vpnMobile"), icon: Smartphone },
                  ].map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </MegaMenu>

          {/* Resources — Mega Menu */}
          <MegaMenu
            trigger={<><BookOpen className="h-3.5 w-3.5" /> Resources</>}
            isOpen={openMenu === "resources"}
            onToggle={() => toggleMenu("resources")}
          >
            <div className="grid grid-cols-3 gap-6">
              {/* Column 1: Learn */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Learn</p>
                <div className="space-y-1">
                  {[
                    { href: "/guides", label: t("guides"), icon: BookOpen },
                    { href: "/guides/what-is-vpn", label: "What is a VPN?", icon: ShieldAlert },
                    { href: "/blog", label: "Blog", icon: Newspaper },
                    { href: "/vpn-index", label: t("vpnIndex"), icon: BarChart3 },
                  ].map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Tools */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t("tools")}</p>
                <div className="space-y-1">
                  {[
                    { href: "/tools/what-is-my-ip", label: t("ipChecker"), icon: Globe },
                    { href: "/tools/dns-leak-test", label: t("dnsLeakTest"), icon: ShieldAlert },
                    { href: "/speed-test", label: t("speedTest"), icon: Zap },
                  ].map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Compare */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Compare</p>
                <div className="space-y-1">
                  {[
                    { href: "/compare", label: t("compare"), icon: ArrowLeftRight },
                    { href: "/methodology", label: t("methodology"), icon: FlaskConical },
                    { href: "/reports/vpn-transparency-performance-index-2026", label: "Transparency Report", icon: FileText },
                  ].map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </MegaMenu>

          {/* Blog */}
          <Link
            href="/blog"
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:text-primary hover:bg-muted",
              pathname.startsWith("/blog") ? "text-primary bg-muted" : "text-muted-foreground"
            )}
          >
            Blog
          </Link>

          {/* Deals — regular link */}
          <Link
            href="/deals"
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:text-primary hover:bg-muted",
              pathname === "/deals" ? "text-primary bg-muted" : "text-muted-foreground"
            )}
          >
            {t("deals")}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t bg-background max-h-[80vh] overflow-y-auto">
          <div className="container py-4 space-y-4">
            {/* Main links */}
            <Link href="/reviews" onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-2 hover:text-primary">
              {t("reviews")}
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-2 hover:text-primary">
              Blog
            </Link>

            {/* Best VPNs */}
            <div>
              <p className="text-sm font-semibold text-primary flex items-center gap-2 mb-2">
                <Star className="h-4 w-4" /> {t("best")}
              </p>
              <div className="grid grid-cols-2 gap-1 pl-2">
                {[
                  { href: "/best/best-vpn", label: t("bestVpn") },
                  { href: "/best/free-vpn", label: t("freeVpn") },
                  { href: "/best/vpn-gaming", label: t("vpnGaming") },
                  { href: "/best/vpn-streaming", label: "Streaming" },
                  { href: "/best/vpn-china", label: t("vpnChina") },
                  { href: "/best/vpn-russia", label: t("vpnRussia") },
                  { href: "/countries", label: "All Countries →" },
                ].map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-primary py-1.5">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Devices */}
            <div>
              <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2 mb-2">
                <Laptop className="h-4 w-4" /> Devices
              </p>
              <div className="grid grid-cols-2 gap-1 pl-2">
                {[
                  { href: "/best/vpn-windows", label: t("vpnWindows") },
                  { href: "/best/vpn-macos", label: t("vpnMacos") },
                  { href: "/best/vpn-laptops", label: t("vpnLaptops") },
                  { href: "/best/vpn-linux", label: t("vpnLinux") },
                ].map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-primary py-1.5">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tools & Resources */}
            <div>
              <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2 mb-2">
                <Wrench className="h-4 w-4" /> Resources
              </p>
              <div className="grid grid-cols-2 gap-1 pl-2">
                {[
                  { href: "/guides", label: t("guides") },
                  { href: "/compare", label: t("compare") },
                  { href: "/speed-test", label: t("speedTest") },
                  { href: "/tools/what-is-my-ip", label: t("ipChecker") },
                  { href: "/vpn-index", label: t("vpnIndex") },
                  { href: "/methodology", label: t("methodology") },
                ].map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-primary py-1.5">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link href="/deals" onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground">
              <Tag className="h-4 w-4 inline mr-2" />
              {t("deals")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
