import { Link } from "@/i18n/navigation";
import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-orange-400" />
              <span className="font-bold text-xl">
                Zero<span className="text-orange-400">To</span>VPN
              </span>
            </Link>
            <p className="text-sm text-slate-400">{t("aboutText")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("links")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/reviews"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("reviews")}
                </Link>
              </li>
              <li>
                <Link
                  href="/vpn-index"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("vpnIndex")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/best-vpn"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("bestVpns")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/free-vpn"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("freeVpn")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-gaming"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("gamingVpn")}
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("compare")}
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("countries")}
                </Link>
              </li>
              <li>
                <Link
                  href="/speed-test"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("speedTest")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/what-is-my-ip"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("ipChecker")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/dns-leak-test"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("dnsLeakTest")}
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/what-is-vpn"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("whatIsVpn")}
                </Link>
              </li>
              <li>
                <Link
                  href="/reports/vpn-transparency-performance-index-2026"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("transparencyReport")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Devices */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("devices")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/best/vpn-laptops"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("vpnLaptops")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-windows"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("vpnWindows")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-macos"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("vpnMacos")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-chromebook"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("vpnChromebook")}
                </Link>
              </li>
              <li>
                <Link
                  href="/best/vpn-linux"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("vpnLinux")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("disclosure")}
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("methodology")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-orange-400"
                >
                  {t("contactPage")}
                </Link>
              </li>
              <li className="text-slate-400">hello@zerotovpn.com</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700/50 mt-8 pt-8 space-y-4">
          <p className="text-xs text-slate-500 text-center">
            {t("disclaimer")}
          </p>
          <p className="text-sm text-slate-500 text-center">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
