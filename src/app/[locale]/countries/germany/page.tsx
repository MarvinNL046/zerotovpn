import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import { RelatedPages } from "@/components/seo/related-pages";
import { generateAlternates } from "@/lib/seo-utils";
import {
  Shield,
  CheckCircle,
  XCircle,
  Globe,
  Clock,
  ArrowRight,
  Scale,
  Smartphone,
  Lock,
  Ban,
  TrendingUp,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Germany 2026: Privacy, Streaming & Torrenting | ZeroToVPN",
    nl: "Beste VPN voor Duitsland 2026: Privacy, Streaming & Torrenting | ZeroToVPN",
    de: "Beste VPN für Deutschland 2026: Privatsphäre, Streaming & Torrenting | ZeroToVPN",
    es: "Mejor VPN para Alemania 2026: Privacidad, Streaming y Torrenting | ZeroToVPN",
    fr: "Meilleur VPN pour l'Allemagne 2026: Confidentialité, Streaming & Torrenting | ZeroToVPN",
    zh: "2026年德国最佳VPN：隐私、流媒体和种子下载 | ZeroToVPN",
    ja: "ドイツに最適なVPN 2026：プライバシー、ストリーミング、トレント | ZeroToVPN",
    ko: "2026년 독일 최고의 VPN: 개인정보 보호, 스트리밍 및 토렌트 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับเยอรมนี 2026: ความเป็นส่วนตัว สตรีมมิ่ง และทอร์เรนต์ | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Germany has strict copyright enforcement with expensive Abmahnung letters. Find VPNs that protect you from copyright trolls and access international streaming.",
    nl: "Duitsland heeft strikte auteursrechthandhaving met dure Abmahnung-brieven.",
    de: "Deutschland hat strenge Urheberrechtsdurchsetzung mit teuren Abmahnungen.",
    es: "Alemania tiene estricta aplicación de derechos de autor con costosas cartas Abmahnung.",
    fr: "L'Allemagne a une stricte application du droit d'auteur avec des lettres Abmahnung coûteuses.",
    zh: "德国有严格的版权执法和昂贵的Abmahnung信函。",
    ja: "ドイツは高額なAbmahnung書簡による厳格な著作権執行があります。",
    ko: "독일은 비싼 Abmahnung 편지로 엄격한 저작권 집행을 합니다.",
    th: "เยอรมนีมีการบังคับใช้ลิขสิทธิ์ที่เข้มงวดพร้อมจดหมาย Abmahnung ที่มีค่าใช้จ่ายสูง",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: (titles[locale] || titles.en).replace(" | ZeroToVPN", ""),
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "article",
    },
    alternates: generateAlternates("/countries/germany", locale),
  };
}

export default async function GermanyVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();
  const countryVpns = allVpns.filter((vpn) =>
    ["nordvpn", "surfshark", "expressvpn"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated March 2026",
      title: "Best VPN for Germany",
      subtitle: "Avoid copyright Abmahnung letters and protect your digital privacy",
      legalStatus: "VPN Legal Status in Germany",
      legalStatusText: "VPN use is fully legal in Germany. Germany has strong privacy traditions (GDPR, BDSG) but also strict copyright enforcement. Torrenting copyrighted content frequently results in expensive Abmahnung warning letters demanding hundreds to thousands of euros.",
      blockedVpns: "Privacy & Copyright Issues in Germany",
      blockedList: ["Abmahnung copyright letters (often €500-1500+)","14 Eyes intelligence membership","Some GEMA-restricted content","Strict NetzDG social media regulations","Certain extremist websites blocked","ISP data retention requirements"],
      internetFreedom: "Germany Internet Freedom Score",
      freedomStats: [
        { value: "93.0%", label: "Internet users (2024)" },
        { value: "€500-1500+", label: "Avg Abmahnung cost" },
        { value: "77/100", label: "Freedom score (Free)" },
      ],
      whatWorks: "Best VPNs for Germany (2026)",
      whatWorksText: "All VPNs work freely in Germany. Choose VPNs with strict no-logs policies and P2P support to avoid expensive copyright Abmahnung letters.",
      keyFeatures: "Essential Features for Germany",
      features: [
        { title: "P2P Protection", desc: "Avoid expensive Abmahnung copyright letters with IP masking and no-logs policy" },
        { title: "Kill Switch", desc: "Critical for torrenting - prevents accidental IP leaks that could trigger Abmahnung" },
        { title: "German Server Locations", desc: "Multiple German servers for fast local content access and banking" },
        { title: "GDPR-Compliant Provider", desc: "Choose providers that respect European privacy regulations" },
      ],
      blockedServices: "Why You Need a VPN in Germany",
      blocked: ["Avoid Abmahnung copyright enforcement letters","Access US and UK streaming libraries (Netflix, Hulu, BBC)","Bypass GEMA content restrictions","Protect privacy from 14 Eyes surveillance","Secure public WiFi at cafes and airports","Safely torrent with P2P protection"],
      tips: "Tips for VPN Use in Germany",
      tipsList: ["Always use a kill switch to prevent accidental IP leaks while torrenting","Choose VPNs with multiple German server locations for local content","Use P2P-optimized servers to avoid Abmahnung copyright letters","NordVPN and Surfshark offer excellent German server coverage","WireGuard protocol offers the best speeds on German networks","Connect to US or UK servers for international streaming"],
      faqTitle: "Germany VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Germany?", a: "Yes, VPNs are completely legal in Germany. Many Germans use VPNs for privacy protection in line with the country's strong data protection traditions." },
        { q: "Can I avoid Abmahnung with a VPN?", a: "Yes, a VPN hides your IP address, making it much harder for copyright trolls to identify and send you Abmahnung letters. Choose a VPN with strict no-logs policy and a kill switch." },
        { q: "What is an Abmahnung?", a: "An Abmahnung is a legal warning letter sent by copyright holders or their lawyers demanding payment (typically €500-1500) for detected copyright infringement, usually from torrenting." },
        { q: "What are the best VPNs for streaming in Germany?", a: "NordVPN, ExpressVPN, and Surfshark reliably unblock US Netflix, BBC iPlayer, and other international streaming services from Germany." },
      ],
      getVpn: "Get VPN",
      worksInCountry: "Works in Germany",
      obfuscation: "P2P Protected",
      lastUpdated: "Last updated: March 2026",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt maart 2026",
      title: "Best VPN for Germany",
      subtitle: "Avoid copyright Abmahnung letters and protect your digital privacy",
      legalStatus: "VPN Legal Status in Germany",
      legalStatusText: "VPN use is fully legal in Germany. Germany has strong privacy traditions (GDPR, BDSG) but also strict copyright enforcement. Torrenting copyrighted content frequently results in expensive Abmahnung warning letters demanding hundreds to thousands of euros.",
      blockedVpns: "Privacy & Copyright Issues in Germany",
      blockedList: ["Abmahnung copyright letters (often €500-1500+)","14 Eyes intelligence membership","Some GEMA-restricted content","Strict NetzDG social media regulations","Certain extremist websites blocked","ISP data retention requirements"],
      internetFreedom: "Germany Internet Freedom Score",
      freedomStats: [
        { value: "93.0%", label: "Internet users (2024)" },
        { value: "€500-1500+", label: "Avg Abmahnung cost" },
        { value: "77/100", label: "Freedom score (Free)" },
      ],
      whatWorks: "Best VPNs for Germany (2026)",
      whatWorksText: "All VPNs work freely in Germany. Choose VPNs with strict no-logs policies and P2P support to avoid expensive copyright Abmahnung letters.",
      keyFeatures: "Essential Features for Germany",
      features: [
        { title: "P2P Protection", desc: "Avoid expensive Abmahnung copyright letters with IP masking and no-logs policy" },
        { title: "Kill Switch", desc: "Critical for torrenting - prevents accidental IP leaks that could trigger Abmahnung" },
        { title: "German Server Locations", desc: "Multiple German servers for fast local content access and banking" },
        { title: "GDPR-Compliant Provider", desc: "Choose providers that respect European privacy regulations" },
      ],
      blockedServices: "Why You Need a VPN in Germany",
      blocked: ["Avoid Abmahnung copyright enforcement letters","Access US and UK streaming libraries (Netflix, Hulu, BBC)","Bypass GEMA content restrictions","Protect privacy from 14 Eyes surveillance","Secure public WiFi at cafes and airports","Safely torrent with P2P protection"],
      tips: "Tips for VPN Use in Germany",
      tipsList: ["Always use a kill switch to prevent accidental IP leaks while torrenting","Choose VPNs with multiple German server locations for local content","Use P2P-optimized servers to avoid Abmahnung copyright letters","NordVPN and Surfshark offer excellent German server coverage","WireGuard protocol offers the best speeds on German networks","Connect to US or UK servers for international streaming"],
      faqTitle: "Germany VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Germany?", a: "Yes, VPNs are completely legal in Germany. Many Germans use VPNs for privacy protection in line with the country's strong data protection traditions." },
        { q: "Can I avoid Abmahnung with a VPN?", a: "Yes, a VPN hides your IP address, making it much harder for copyright trolls to identify and send you Abmahnung letters. Choose a VPN with strict no-logs policy and a kill switch." },
        { q: "What is an Abmahnung?", a: "An Abmahnung is a legal warning letter sent by copyright holders or their lawyers demanding payment (typically €500-1500) for detected copyright infringement, usually from torrenting." },
        { q: "What are the best VPNs for streaming in Germany?", a: "NordVPN, ExpressVPN, and Surfshark reliably unblock US Netflix, BBC iPlayer, and other international streaming services from Germany." },
      ],
      getVpn: "Download VPN",
      worksInCountry: "Werkt in Germany",
      obfuscation: "P2P Protected",
      lastUpdated: "Laatst bijgewerkt: maart 2026",
      sources: "Bronnen",
    },
    de: {
      badge: "Aktualisiert März 2026",
      title: "Best VPN for Germany",
      subtitle: "Avoid copyright Abmahnung letters and protect your digital privacy",
      legalStatus: "VPN Legal Status in Germany",
      legalStatusText: "VPN use is fully legal in Germany. Germany has strong privacy traditions (GDPR, BDSG) but also strict copyright enforcement. Torrenting copyrighted content frequently results in expensive Abmahnung warning letters demanding hundreds to thousands of euros.",
      blockedVpns: "Privacy & Copyright Issues in Germany",
      blockedList: ["Abmahnung copyright letters (often €500-1500+)","14 Eyes intelligence membership","Some GEMA-restricted content","Strict NetzDG social media regulations","Certain extremist websites blocked","ISP data retention requirements"],
      internetFreedom: "Germany Internet Freedom Score",
      freedomStats: [
        { value: "93.0%", label: "Internet users (2024)" },
        { value: "€500-1500+", label: "Avg Abmahnung cost" },
        { value: "77/100", label: "Freedom score (Free)" },
      ],
      whatWorks: "Best VPNs for Germany (2026)",
      whatWorksText: "All VPNs work freely in Germany. Choose VPNs with strict no-logs policies and P2P support to avoid expensive copyright Abmahnung letters.",
      keyFeatures: "Essential Features for Germany",
      features: [
        { title: "P2P Protection", desc: "Avoid expensive Abmahnung copyright letters with IP masking and no-logs policy" },
        { title: "Kill Switch", desc: "Critical for torrenting - prevents accidental IP leaks that could trigger Abmahnung" },
        { title: "German Server Locations", desc: "Multiple German servers for fast local content access and banking" },
        { title: "GDPR-Compliant Provider", desc: "Choose providers that respect European privacy regulations" },
      ],
      blockedServices: "Why You Need a VPN in Germany",
      blocked: ["Avoid Abmahnung copyright enforcement letters","Access US and UK streaming libraries (Netflix, Hulu, BBC)","Bypass GEMA content restrictions","Protect privacy from 14 Eyes surveillance","Secure public WiFi at cafes and airports","Safely torrent with P2P protection"],
      tips: "Tips for VPN Use in Germany",
      tipsList: ["Always use a kill switch to prevent accidental IP leaks while torrenting","Choose VPNs with multiple German server locations for local content","Use P2P-optimized servers to avoid Abmahnung copyright letters","NordVPN and Surfshark offer excellent German server coverage","WireGuard protocol offers the best speeds on German networks","Connect to US or UK servers for international streaming"],
      faqTitle: "Germany VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Germany?", a: "Yes, VPNs are completely legal in Germany. Many Germans use VPNs for privacy protection in line with the country's strong data protection traditions." },
        { q: "Can I avoid Abmahnung with a VPN?", a: "Yes, a VPN hides your IP address, making it much harder for copyright trolls to identify and send you Abmahnung letters. Choose a VPN with strict no-logs policy and a kill switch." },
        { q: "What is an Abmahnung?", a: "An Abmahnung is a legal warning letter sent by copyright holders or their lawyers demanding payment (typically €500-1500) for detected copyright infringement, usually from torrenting." },
        { q: "What are the best VPNs for streaming in Germany?", a: "NordVPN, ExpressVPN, and Surfshark reliably unblock US Netflix, BBC iPlayer, and other international streaming services from Germany." },
      ],
      getVpn: "VPN erhalten",
      worksInCountry: "Funktioniert in Germany",
      obfuscation: "P2P Protected",
      lastUpdated: "Zuletzt aktualisiert: März 2026",
      sources: "Quellen",
    },
    es: {
      badge: "Actualizado marzo 2026",
      title: "Best VPN for Germany",
      subtitle: "Avoid copyright Abmahnung letters and protect your digital privacy",
      legalStatus: "VPN Legal Status in Germany",
      legalStatusText: "VPN use is fully legal in Germany. Germany has strong privacy traditions (GDPR, BDSG) but also strict copyright enforcement. Torrenting copyrighted content frequently results in expensive Abmahnung warning letters demanding hundreds to thousands of euros.",
      blockedVpns: "Privacy & Copyright Issues in Germany",
      blockedList: ["Abmahnung copyright letters (often €500-1500+)","14 Eyes intelligence membership","Some GEMA-restricted content","Strict NetzDG social media regulations","Certain extremist websites blocked","ISP data retention requirements"],
      internetFreedom: "Germany Internet Freedom Score",
      freedomStats: [
        { value: "93.0%", label: "Internet users (2024)" },
        { value: "€500-1500+", label: "Avg Abmahnung cost" },
        { value: "77/100", label: "Freedom score (Free)" },
      ],
      whatWorks: "Best VPNs for Germany (2026)",
      whatWorksText: "All VPNs work freely in Germany. Choose VPNs with strict no-logs policies and P2P support to avoid expensive copyright Abmahnung letters.",
      keyFeatures: "Essential Features for Germany",
      features: [
        { title: "P2P Protection", desc: "Avoid expensive Abmahnung copyright letters with IP masking and no-logs policy" },
        { title: "Kill Switch", desc: "Critical for torrenting - prevents accidental IP leaks that could trigger Abmahnung" },
        { title: "German Server Locations", desc: "Multiple German servers for fast local content access and banking" },
        { title: "GDPR-Compliant Provider", desc: "Choose providers that respect European privacy regulations" },
      ],
      blockedServices: "Why You Need a VPN in Germany",
      blocked: ["Avoid Abmahnung copyright enforcement letters","Access US and UK streaming libraries (Netflix, Hulu, BBC)","Bypass GEMA content restrictions","Protect privacy from 14 Eyes surveillance","Secure public WiFi at cafes and airports","Safely torrent with P2P protection"],
      tips: "Tips for VPN Use in Germany",
      tipsList: ["Always use a kill switch to prevent accidental IP leaks while torrenting","Choose VPNs with multiple German server locations for local content","Use P2P-optimized servers to avoid Abmahnung copyright letters","NordVPN and Surfshark offer excellent German server coverage","WireGuard protocol offers the best speeds on German networks","Connect to US or UK servers for international streaming"],
      faqTitle: "Germany VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Germany?", a: "Yes, VPNs are completely legal in Germany. Many Germans use VPNs for privacy protection in line with the country's strong data protection traditions." },
        { q: "Can I avoid Abmahnung with a VPN?", a: "Yes, a VPN hides your IP address, making it much harder for copyright trolls to identify and send you Abmahnung letters. Choose a VPN with strict no-logs policy and a kill switch." },
        { q: "What is an Abmahnung?", a: "An Abmahnung is a legal warning letter sent by copyright holders or their lawyers demanding payment (typically €500-1500) for detected copyright infringement, usually from torrenting." },
        { q: "What are the best VPNs for streaming in Germany?", a: "NordVPN, ExpressVPN, and Surfshark reliably unblock US Netflix, BBC iPlayer, and other international streaming services from Germany." },
      ],
      getVpn: "Obtener VPN",
      worksInCountry: "Funciona en Germany",
      obfuscation: "P2P Protected",
      lastUpdated: "Última actualización: marzo 2026",
      sources: "Fuentes",
    },
    fr: {
      badge: "Mis à jour mars 2026",
      title: "Best VPN for Germany",
      subtitle: "Avoid copyright Abmahnung letters and protect your digital privacy",
      legalStatus: "VPN Legal Status in Germany",
      legalStatusText: "VPN use is fully legal in Germany. Germany has strong privacy traditions (GDPR, BDSG) but also strict copyright enforcement. Torrenting copyrighted content frequently results in expensive Abmahnung warning letters demanding hundreds to thousands of euros.",
      blockedVpns: "Privacy & Copyright Issues in Germany",
      blockedList: ["Abmahnung copyright letters (often €500-1500+)","14 Eyes intelligence membership","Some GEMA-restricted content","Strict NetzDG social media regulations","Certain extremist websites blocked","ISP data retention requirements"],
      internetFreedom: "Germany Internet Freedom Score",
      freedomStats: [
        { value: "93.0%", label: "Internet users (2024)" },
        { value: "€500-1500+", label: "Avg Abmahnung cost" },
        { value: "77/100", label: "Freedom score (Free)" },
      ],
      whatWorks: "Best VPNs for Germany (2026)",
      whatWorksText: "All VPNs work freely in Germany. Choose VPNs with strict no-logs policies and P2P support to avoid expensive copyright Abmahnung letters.",
      keyFeatures: "Essential Features for Germany",
      features: [
        { title: "P2P Protection", desc: "Avoid expensive Abmahnung copyright letters with IP masking and no-logs policy" },
        { title: "Kill Switch", desc: "Critical for torrenting - prevents accidental IP leaks that could trigger Abmahnung" },
        { title: "German Server Locations", desc: "Multiple German servers for fast local content access and banking" },
        { title: "GDPR-Compliant Provider", desc: "Choose providers that respect European privacy regulations" },
      ],
      blockedServices: "Why You Need a VPN in Germany",
      blocked: ["Avoid Abmahnung copyright enforcement letters","Access US and UK streaming libraries (Netflix, Hulu, BBC)","Bypass GEMA content restrictions","Protect privacy from 14 Eyes surveillance","Secure public WiFi at cafes and airports","Safely torrent with P2P protection"],
      tips: "Tips for VPN Use in Germany",
      tipsList: ["Always use a kill switch to prevent accidental IP leaks while torrenting","Choose VPNs with multiple German server locations for local content","Use P2P-optimized servers to avoid Abmahnung copyright letters","NordVPN and Surfshark offer excellent German server coverage","WireGuard protocol offers the best speeds on German networks","Connect to US or UK servers for international streaming"],
      faqTitle: "Germany VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Germany?", a: "Yes, VPNs are completely legal in Germany. Many Germans use VPNs for privacy protection in line with the country's strong data protection traditions." },
        { q: "Can I avoid Abmahnung with a VPN?", a: "Yes, a VPN hides your IP address, making it much harder for copyright trolls to identify and send you Abmahnung letters. Choose a VPN with strict no-logs policy and a kill switch." },
        { q: "What is an Abmahnung?", a: "An Abmahnung is a legal warning letter sent by copyright holders or their lawyers demanding payment (typically €500-1500) for detected copyright infringement, usually from torrenting." },
        { q: "What are the best VPNs for streaming in Germany?", a: "NordVPN, ExpressVPN, and Surfshark reliably unblock US Netflix, BBC iPlayer, and other international streaming services from Germany." },
      ],
      getVpn: "Obtenir VPN",
      worksInCountry: "Fonctionne en Germany",
      obfuscation: "P2P Protected",
      lastUpdated: "Dernière mise à jour : mars 2026",
      sources: "Sources",
    },
    zh: {
      badge: "更新于2026年3月",
      title: "Best VPN for Germany",
      subtitle: "Avoid copyright Abmahnung letters and protect your digital privacy",
      legalStatus: "VPN Legal Status in Germany",
      legalStatusText: "VPN use is fully legal in Germany. Germany has strong privacy traditions (GDPR, BDSG) but also strict copyright enforcement. Torrenting copyrighted content frequently results in expensive Abmahnung warning letters demanding hundreds to thousands of euros.",
      blockedVpns: "Privacy & Copyright Issues in Germany",
      blockedList: ["Abmahnung copyright letters (often €500-1500+)","14 Eyes intelligence membership","Some GEMA-restricted content","Strict NetzDG social media regulations","Certain extremist websites blocked","ISP data retention requirements"],
      internetFreedom: "Germany Internet Freedom Score",
      freedomStats: [
        { value: "93.0%", label: "Internet users (2024)" },
        { value: "€500-1500+", label: "Avg Abmahnung cost" },
        { value: "77/100", label: "Freedom score (Free)" },
      ],
      whatWorks: "Best VPNs for Germany (2026)",
      whatWorksText: "All VPNs work freely in Germany. Choose VPNs with strict no-logs policies and P2P support to avoid expensive copyright Abmahnung letters.",
      keyFeatures: "Essential Features for Germany",
      features: [
        { title: "P2P Protection", desc: "Avoid expensive Abmahnung copyright letters with IP masking and no-logs policy" },
        { title: "Kill Switch", desc: "Critical for torrenting - prevents accidental IP leaks that could trigger Abmahnung" },
        { title: "German Server Locations", desc: "Multiple German servers for fast local content access and banking" },
        { title: "GDPR-Compliant Provider", desc: "Choose providers that respect European privacy regulations" },
      ],
      blockedServices: "Why You Need a VPN in Germany",
      blocked: ["Avoid Abmahnung copyright enforcement letters","Access US and UK streaming libraries (Netflix, Hulu, BBC)","Bypass GEMA content restrictions","Protect privacy from 14 Eyes surveillance","Secure public WiFi at cafes and airports","Safely torrent with P2P protection"],
      tips: "Tips for VPN Use in Germany",
      tipsList: ["Always use a kill switch to prevent accidental IP leaks while torrenting","Choose VPNs with multiple German server locations for local content","Use P2P-optimized servers to avoid Abmahnung copyright letters","NordVPN and Surfshark offer excellent German server coverage","WireGuard protocol offers the best speeds on German networks","Connect to US or UK servers for international streaming"],
      faqTitle: "Germany VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Germany?", a: "Yes, VPNs are completely legal in Germany. Many Germans use VPNs for privacy protection in line with the country's strong data protection traditions." },
        { q: "Can I avoid Abmahnung with a VPN?", a: "Yes, a VPN hides your IP address, making it much harder for copyright trolls to identify and send you Abmahnung letters. Choose a VPN with strict no-logs policy and a kill switch." },
        { q: "What is an Abmahnung?", a: "An Abmahnung is a legal warning letter sent by copyright holders or their lawyers demanding payment (typically €500-1500) for detected copyright infringement, usually from torrenting." },
        { q: "What are the best VPNs for streaming in Germany?", a: "NordVPN, ExpressVPN, and Surfshark reliably unblock US Netflix, BBC iPlayer, and other international streaming services from Germany." },
      ],
      getVpn: "获取VPN",
      worksInCountry: "在Germany可用",
      obfuscation: "P2P Protected",
      lastUpdated: "最后更新：2026年3月",
      sources: "来源",
    },
    ja: {
      badge: "2026年3月更新",
      title: "Best VPN for Germany",
      subtitle: "Avoid copyright Abmahnung letters and protect your digital privacy",
      legalStatus: "VPN Legal Status in Germany",
      legalStatusText: "VPN use is fully legal in Germany. Germany has strong privacy traditions (GDPR, BDSG) but also strict copyright enforcement. Torrenting copyrighted content frequently results in expensive Abmahnung warning letters demanding hundreds to thousands of euros.",
      blockedVpns: "Privacy & Copyright Issues in Germany",
      blockedList: ["Abmahnung copyright letters (often €500-1500+)","14 Eyes intelligence membership","Some GEMA-restricted content","Strict NetzDG social media regulations","Certain extremist websites blocked","ISP data retention requirements"],
      internetFreedom: "Germany Internet Freedom Score",
      freedomStats: [
        { value: "93.0%", label: "Internet users (2024)" },
        { value: "€500-1500+", label: "Avg Abmahnung cost" },
        { value: "77/100", label: "Freedom score (Free)" },
      ],
      whatWorks: "Best VPNs for Germany (2026)",
      whatWorksText: "All VPNs work freely in Germany. Choose VPNs with strict no-logs policies and P2P support to avoid expensive copyright Abmahnung letters.",
      keyFeatures: "Essential Features for Germany",
      features: [
        { title: "P2P Protection", desc: "Avoid expensive Abmahnung copyright letters with IP masking and no-logs policy" },
        { title: "Kill Switch", desc: "Critical for torrenting - prevents accidental IP leaks that could trigger Abmahnung" },
        { title: "German Server Locations", desc: "Multiple German servers for fast local content access and banking" },
        { title: "GDPR-Compliant Provider", desc: "Choose providers that respect European privacy regulations" },
      ],
      blockedServices: "Why You Need a VPN in Germany",
      blocked: ["Avoid Abmahnung copyright enforcement letters","Access US and UK streaming libraries (Netflix, Hulu, BBC)","Bypass GEMA content restrictions","Protect privacy from 14 Eyes surveillance","Secure public WiFi at cafes and airports","Safely torrent with P2P protection"],
      tips: "Tips for VPN Use in Germany",
      tipsList: ["Always use a kill switch to prevent accidental IP leaks while torrenting","Choose VPNs with multiple German server locations for local content","Use P2P-optimized servers to avoid Abmahnung copyright letters","NordVPN and Surfshark offer excellent German server coverage","WireGuard protocol offers the best speeds on German networks","Connect to US or UK servers for international streaming"],
      faqTitle: "Germany VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Germany?", a: "Yes, VPNs are completely legal in Germany. Many Germans use VPNs for privacy protection in line with the country's strong data protection traditions." },
        { q: "Can I avoid Abmahnung with a VPN?", a: "Yes, a VPN hides your IP address, making it much harder for copyright trolls to identify and send you Abmahnung letters. Choose a VPN with strict no-logs policy and a kill switch." },
        { q: "What is an Abmahnung?", a: "An Abmahnung is a legal warning letter sent by copyright holders or their lawyers demanding payment (typically €500-1500) for detected copyright infringement, usually from torrenting." },
        { q: "What are the best VPNs for streaming in Germany?", a: "NordVPN, ExpressVPN, and Surfshark reliably unblock US Netflix, BBC iPlayer, and other international streaming services from Germany." },
      ],
      getVpn: "VPNを取得",
      worksInCountry: "Germanyで機能",
      obfuscation: "P2P Protected",
      lastUpdated: "最終更新：2026年3月",
      sources: "情報源",
    },
    ko: {
      badge: "2026년 3월 업데이트",
      title: "Best VPN for Germany",
      subtitle: "Avoid copyright Abmahnung letters and protect your digital privacy",
      legalStatus: "VPN Legal Status in Germany",
      legalStatusText: "VPN use is fully legal in Germany. Germany has strong privacy traditions (GDPR, BDSG) but also strict copyright enforcement. Torrenting copyrighted content frequently results in expensive Abmahnung warning letters demanding hundreds to thousands of euros.",
      blockedVpns: "Privacy & Copyright Issues in Germany",
      blockedList: ["Abmahnung copyright letters (often €500-1500+)","14 Eyes intelligence membership","Some GEMA-restricted content","Strict NetzDG social media regulations","Certain extremist websites blocked","ISP data retention requirements"],
      internetFreedom: "Germany Internet Freedom Score",
      freedomStats: [
        { value: "93.0%", label: "Internet users (2024)" },
        { value: "€500-1500+", label: "Avg Abmahnung cost" },
        { value: "77/100", label: "Freedom score (Free)" },
      ],
      whatWorks: "Best VPNs for Germany (2026)",
      whatWorksText: "All VPNs work freely in Germany. Choose VPNs with strict no-logs policies and P2P support to avoid expensive copyright Abmahnung letters.",
      keyFeatures: "Essential Features for Germany",
      features: [
        { title: "P2P Protection", desc: "Avoid expensive Abmahnung copyright letters with IP masking and no-logs policy" },
        { title: "Kill Switch", desc: "Critical for torrenting - prevents accidental IP leaks that could trigger Abmahnung" },
        { title: "German Server Locations", desc: "Multiple German servers for fast local content access and banking" },
        { title: "GDPR-Compliant Provider", desc: "Choose providers that respect European privacy regulations" },
      ],
      blockedServices: "Why You Need a VPN in Germany",
      blocked: ["Avoid Abmahnung copyright enforcement letters","Access US and UK streaming libraries (Netflix, Hulu, BBC)","Bypass GEMA content restrictions","Protect privacy from 14 Eyes surveillance","Secure public WiFi at cafes and airports","Safely torrent with P2P protection"],
      tips: "Tips for VPN Use in Germany",
      tipsList: ["Always use a kill switch to prevent accidental IP leaks while torrenting","Choose VPNs with multiple German server locations for local content","Use P2P-optimized servers to avoid Abmahnung copyright letters","NordVPN and Surfshark offer excellent German server coverage","WireGuard protocol offers the best speeds on German networks","Connect to US or UK servers for international streaming"],
      faqTitle: "Germany VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Germany?", a: "Yes, VPNs are completely legal in Germany. Many Germans use VPNs for privacy protection in line with the country's strong data protection traditions." },
        { q: "Can I avoid Abmahnung with a VPN?", a: "Yes, a VPN hides your IP address, making it much harder for copyright trolls to identify and send you Abmahnung letters. Choose a VPN with strict no-logs policy and a kill switch." },
        { q: "What is an Abmahnung?", a: "An Abmahnung is a legal warning letter sent by copyright holders or their lawyers demanding payment (typically €500-1500) for detected copyright infringement, usually from torrenting." },
        { q: "What are the best VPNs for streaming in Germany?", a: "NordVPN, ExpressVPN, and Surfshark reliably unblock US Netflix, BBC iPlayer, and other international streaming services from Germany." },
      ],
      getVpn: "VPN 받기",
      worksInCountry: "Germany에서 작동",
      obfuscation: "P2P Protected",
      lastUpdated: "마지막 업데이트: 2026년 3월",
      sources: "출처",
    },
    th: {
      badge: "อัปเดตมีนาคม 2026",
      title: "Best VPN for Germany",
      subtitle: "Avoid copyright Abmahnung letters and protect your digital privacy",
      legalStatus: "VPN Legal Status in Germany",
      legalStatusText: "VPN use is fully legal in Germany. Germany has strong privacy traditions (GDPR, BDSG) but also strict copyright enforcement. Torrenting copyrighted content frequently results in expensive Abmahnung warning letters demanding hundreds to thousands of euros.",
      blockedVpns: "Privacy & Copyright Issues in Germany",
      blockedList: ["Abmahnung copyright letters (often €500-1500+)","14 Eyes intelligence membership","Some GEMA-restricted content","Strict NetzDG social media regulations","Certain extremist websites blocked","ISP data retention requirements"],
      internetFreedom: "Germany Internet Freedom Score",
      freedomStats: [
        { value: "93.0%", label: "Internet users (2024)" },
        { value: "€500-1500+", label: "Avg Abmahnung cost" },
        { value: "77/100", label: "Freedom score (Free)" },
      ],
      whatWorks: "Best VPNs for Germany (2026)",
      whatWorksText: "All VPNs work freely in Germany. Choose VPNs with strict no-logs policies and P2P support to avoid expensive copyright Abmahnung letters.",
      keyFeatures: "Essential Features for Germany",
      features: [
        { title: "P2P Protection", desc: "Avoid expensive Abmahnung copyright letters with IP masking and no-logs policy" },
        { title: "Kill Switch", desc: "Critical for torrenting - prevents accidental IP leaks that could trigger Abmahnung" },
        { title: "German Server Locations", desc: "Multiple German servers for fast local content access and banking" },
        { title: "GDPR-Compliant Provider", desc: "Choose providers that respect European privacy regulations" },
      ],
      blockedServices: "Why You Need a VPN in Germany",
      blocked: ["Avoid Abmahnung copyright enforcement letters","Access US and UK streaming libraries (Netflix, Hulu, BBC)","Bypass GEMA content restrictions","Protect privacy from 14 Eyes surveillance","Secure public WiFi at cafes and airports","Safely torrent with P2P protection"],
      tips: "Tips for VPN Use in Germany",
      tipsList: ["Always use a kill switch to prevent accidental IP leaks while torrenting","Choose VPNs with multiple German server locations for local content","Use P2P-optimized servers to avoid Abmahnung copyright letters","NordVPN and Surfshark offer excellent German server coverage","WireGuard protocol offers the best speeds on German networks","Connect to US or UK servers for international streaming"],
      faqTitle: "Germany VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Germany?", a: "Yes, VPNs are completely legal in Germany. Many Germans use VPNs for privacy protection in line with the country's strong data protection traditions." },
        { q: "Can I avoid Abmahnung with a VPN?", a: "Yes, a VPN hides your IP address, making it much harder for copyright trolls to identify and send you Abmahnung letters. Choose a VPN with strict no-logs policy and a kill switch." },
        { q: "What is an Abmahnung?", a: "An Abmahnung is a legal warning letter sent by copyright holders or their lawyers demanding payment (typically €500-1500) for detected copyright infringement, usually from torrenting." },
        { q: "What are the best VPNs for streaming in Germany?", a: "NordVPN, ExpressVPN, and Surfshark reliably unblock US Netflix, BBC iPlayer, and other international streaming services from Germany." },
      ],
      getVpn: "รับ VPN",
      worksInCountry: "ใช้งานได้ในGermany",
      obfuscation: "P2P Protected",
      lastUpdated: "อัปเดตล่าสุด: มีนาคม 2026",
      sources: "แหล่งที่มา",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col">
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl">{"🇩🇪"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{t.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Scale className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4">{t.legalStatus}</h2>
                <p className="text-muted-foreground mb-4">{t.legalStatusText}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    VPN fully legal
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200">
                    <Ban className="h-3 w-3 mr-1" />
                    Copyright enforcement strict
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">{t.internetFreedom}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {t.freedomStats.map((stat, index) => (
              <Card key={index}><CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">{t.blockedVpns}</h2>
            <Card><CardContent className="pt-6">
              <div className="grid sm:grid-cols-2 gap-3">
                {t.blockedList.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whatWorks}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.whatWorksText}</p>
          </div>
          <div className="space-y-6">
            {countryVpns.map((vpn, index) => (
              <Card key={vpn.id} className="overflow-hidden"><CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-muted-foreground">#{index + 1}</div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold">{vpn.name}</h3>
                      <RatingStars rating={vpn.overallRating} size="sm" />
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /><span className="text-sm">{t.worksInCountry}</span></div>
                    <div className="flex items-center gap-2"><Lock className="h-5 w-5 text-blue-500" /><span className="text-sm">{t.obfuscation}</span></div>
                    <div className="flex items-center gap-2"><Globe className="h-5 w-5 text-purple-500" /><span className="text-sm">{vpn.countries} countries</span></div>
                    <div className="flex items-center gap-2"><Smartphone className="h-5 w-5 text-orange-500" /><span className="text-sm">{vpn.maxDevices} devices</span></div>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                    <div className="text-center lg:text-right">
                      <div className="text-3xl font-bold text-primary">
                        ${vpn.priceTwoYear || vpn.priceYearly}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="flex-1">{t.getVpn}</AffiliateButton>
                      <Button variant="outline" asChild><Link href={`/reviews/${vpn.slug}`}><ArrowRight className="h-4 w-4" /></Link></Button>
                    </div>
                  </div>
                </div>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t.keyFeatures}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, index) => (
              <Card key={index}><CardContent className="pt-6"><div className="space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {index === 0 && <Lock className="h-6 w-6 text-primary" />}
                  {index === 1 && <Shield className="h-6 w-6 text-primary" />}
                  {index === 2 && <TrendingUp className="h-6 w-6 text-primary" />}
                  {index === 3 && <Globe className="h-6 w-6 text-primary" />}
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container"><div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">{t.blockedServices}</h2>
          <Card><CardContent className="pt-6"><div className="grid sm:grid-cols-2 gap-3">
            {t.blocked.map((service, index) => (
              <div key={index} className="flex items-center gap-2"><XCircle className="h-4 w-4 text-red-500 flex-shrink-0" /><span className="text-sm">{service}</span></div>
            ))}
          </div></CardContent></Card>
        </div></div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container"><div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">{t.tips}</h2>
          <Card><CardContent className="pt-6"><div className="space-y-4">
            {t.tipsList.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">{index + 1}</span>
                </div>
                <p className="text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div></CardContent></Card>
        </div></div>
      </section>

      <section className="py-16">
        <div className="container"><div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faqs.map((faq, index) => (
              <Card key={index}><CardContent className="pt-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </CardContent></Card>
            ))}
          </div>
        </div></div>
      </section>

      <section className="py-8 border-t">
        <div className="container"><div className="max-w-3xl mx-auto">
          <h3 className="font-semibold mb-4">{t.sources}</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <a href="https://freedomhouse.org/country/germany/freedom-net/2024" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Freedom House - Germany: Freedom on the Net 2024
                </a>
              </li>
              <li>
                <a href="https://www.bfdi.bund.de" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  German Federal Commissioner for Data Protection
                </a>
              </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">{t.lastUpdated}</p>
        </div></div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container">
          <RelatedPages title="Related Guides" pages={[
              { title: "VPN Guide: France", description: "HADOPI and privacy in France", href: "/countries/france", icon: "globe" },
              { title: "VPN Guide: United Kingdom", description: "Snooper's Charter and ISP blocks", href: "/countries/united-kingdom", icon: "globe" },
              { title: "VPN Guide: Netherlands", description: "Privacy and streaming in the Netherlands", href: "/countries/netherlands", icon: "globe" },
            { title: "All Country Guides", description: "VPN guides for all countries", href: "/countries", icon: "map" }
          ]} />
        </div>
      </section>
    </div>
  );
}
