import { Link } from "@/i18n/navigation";
import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { NewsletterFooter } from "@/components/newsletter/newsletter-footer";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">
                Zero<span className="text-primary">To</span>VPN
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">{t("aboutText")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("links")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/reviews"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("reviews")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/best-vpn"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("bestVpns")}
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("deals")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/free-vpn"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("freeVpn")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-gaming"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("gamingVpn")}
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("compare")}
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("countries")}
                </Link>
              </li>
              <li>
                <Link
                  href="/speed-test"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("speedTest")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/what-is-vpn"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("whatIsVpn")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Devices */}
          <div>
            <h4 className="font-semibold mb-4">{t("devices")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/best/vpn-laptops"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("vpnLaptops")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-windows"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("vpnWindows")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-macos"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("vpnMacos")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-chromebook"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("vpnChromebook")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-linux"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("vpnLinux")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("disclosure")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t("contactPage")}
                </Link>
              </li>
              <li className="text-muted-foreground">hello@zerotovpn.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterFooter />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 space-y-4">
          <p className="text-xs text-muted-foreground text-center">
            {t("disclaimer")}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
