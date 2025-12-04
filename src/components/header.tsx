"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield, Menu, X, Star, Zap, Globe, Tag, ChevronDown, Trophy, Gamepad2, Gift, Smartphone, Tablet, Laptop, Monitor, Apple } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bestVpnItems = [
    { href: "/best/best-vpn", label: t("bestVpn"), icon: Trophy },
    { href: "/best/vpn-china", label: t("vpnChina"), icon: Globe },
    { href: "/best/vpn-russia", label: t("vpnRussia"), icon: Globe },
    { href: "/best/vpn-uae", label: t("vpnUae"), icon: Globe },
    { href: "/best/vpn-iran", label: t("vpnIran"), icon: Globe },
    { href: "/best/vpn-gaming", label: t("vpnGaming"), icon: Gamepad2 },
    { href: "/best/vpn-mobile", label: t("vpnMobile"), icon: Smartphone },
    { href: "/best/vpn-tablet", label: t("vpnTablet"), icon: Tablet },
    { href: "/best/free-vpn", label: t("freeVpn"), icon: Gift },
  ];

  const deviceItems = [
    { href: "/best/vpn-laptops", label: t("vpnLaptops"), icon: Laptop },
    { href: "/best/vpn-windows", label: t("vpnWindows"), icon: Monitor },
    { href: "/best/vpn-macos", label: t("vpnMacos"), icon: Apple },
    { href: "/best/vpn-chromebook", label: t("vpnChromebook"), icon: Laptop },
    { href: "/best/vpn-linux", label: t("vpnLinux"), icon: Monitor },
  ];

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Home & Reviews - regular links */}
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("home")}
          </Link>
          <Link
            href="/reviews"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/reviews" || pathname.startsWith("/reviews/")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {t("reviews")}
          </Link>

          {/* HIGHLIGHTED ITEMS GROUP - Best VPNs, Countries, Deals */}
          {/* Best VPNs - Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full transition-all",
                  "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                  "hover:from-primary/90 hover:to-primary/70 hover:shadow-md hover:scale-105",
                  "border border-primary/20"
                )}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
                {t("best")}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {bestVpnItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Countries - highlighted */}
          <Link
            href="/countries"
            className={cn(
              "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full transition-all",
              "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
              "hover:from-primary/90 hover:to-primary/70 hover:shadow-md hover:scale-105",
              "border border-primary/20"
            )}
          >
            <Globe className="h-3.5 w-3.5 fill-current" />
            {t("countries")}
          </Link>

          {/* Deals - highlighted */}
          <Link
            href="/deals"
            className={cn(
              "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full transition-all",
              "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
              "hover:from-primary/90 hover:to-primary/70 hover:shadow-md hover:scale-105",
              "border border-primary/20"
            )}
          >
            <Tag className="h-3.5 w-3.5 fill-current" />
            {t("deals")}
          </Link>

          {/* Devices - Dropdown (regular) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary inline-flex items-center gap-1",
                  pathname.startsWith("/best/vpn-laptop") ||
                  pathname.startsWith("/best/vpn-windows") ||
                  pathname.startsWith("/best/vpn-macos") ||
                  pathname.startsWith("/best/vpn-chromebook") ||
                  pathname.startsWith("/best/vpn-linux")
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {t("devices")}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {deviceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Compare & Guides - regular links */}
          <Link
            href="/compare"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/compare" ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("compare")}
          </Link>
          <Link
            href="/guides"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/guides" || pathname.startsWith("/guides/")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {t("guides")}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/speed-test"
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            title={t("speedTest")}
          >
            <Zap className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t p-4 bg-background">
          <div className="flex flex-col space-y-4">
            {/* Regular nav items */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("home")}
            </Link>
            <Link
              href="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/reviews" ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("reviews")}
            </Link>

            {/* Best VPNs section */}
            <div className="space-y-2">
              <span className="text-sm font-semibold text-primary flex items-center gap-2">
                <Star className="h-4 w-4" />
                {t("best")}
              </span>
              <div className="pl-6 space-y-2">
                {bestVpnItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Devices section */}
            <div className="space-y-2">
              <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                {t("devices")}
              </span>
              <div className="pl-6 space-y-2">
                {deviceItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Highlighted items */}
            <Link
              href="/countries"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground w-fit"
            >
              <Globe className="h-4 w-4 fill-current" />
              {t("countries")}
            </Link>
            <Link
              href="/deals"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground w-fit"
            >
              <Tag className="h-4 w-4 fill-current" />
              {t("deals")}
            </Link>

            {/* Regular items */}
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/compare" ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("compare")}
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/guides" ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t("guides")}
            </Link>

            {/* Speed Test */}
            <Link
              href="/speed-test"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground w-fit"
            >
              <Zap className="h-4 w-4" />
              {t("speedTest")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
