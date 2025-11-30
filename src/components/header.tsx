"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Star, Zap } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("home"), highlight: false, icon: null },
    { href: "/reviews", label: t("reviews"), highlight: false, icon: null },
    { href: "/best/best-vpn", label: t("best"), highlight: true, icon: Star },
    { href: "/deals", label: t("deals"), highlight: true, icon: Star },
    { href: "/compare", label: t("compare"), highlight: false, icon: null },
    { href: "/speed-test", label: t("speedTest"), highlight: true, icon: Zap },
    { href: "/guides", label: t("guides"), highlight: false, icon: null },
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
          {navItems.map((item) => {
            const Icon = item.icon;
            return item.highlight ? (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full transition-all",
                  "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                  "hover:from-primary/90 hover:to-primary/70 hover:shadow-md hover:scale-105",
                  "border border-primary/20"
                )}
              >
                {Icon && <Icon className="h-3.5 w-3.5 fill-current" />}
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
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
            {navItems.map((item) => {
              const Icon = item.icon;
              return item.highlight ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground w-fit"
                >
                  {Icon && <Icon className="h-4 w-4 fill-current" />}
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
