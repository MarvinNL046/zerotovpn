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

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Mexico 2026: Privacy, Streaming & Security | ZeroToVPN",
    nl: "Beste VPN voor Mexico 2026: Privacy, Streaming & Beveiliging | ZeroToVPN",
    de: "Beste VPN für Mexiko 2026: Privatsphäre, Streaming & Sicherheit | ZeroToVPN",
    es: "Mejor VPN para México 2026: Privacidad, Streaming y Seguridad | ZeroToVPN",
    fr: "Meilleur VPN pour le Mexique 2026: Confidentialité, Streaming & Sécurité | ZeroToVPN",
    zh: "2026年墨西哥最佳VPN：隐私、流媒体和安全 | ZeroToVPN",
    ja: "メキシコに最適なVPN 2026：プライバシー、ストリーミング、セキュリティ | ZeroToVPN",
    ko: "2026년 멕시코 최고의 VPN: 개인정보 보호, 스트리밍 및 보안 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับเม็กซิโก 2026: ความเป็นส่วนตัว สตรีมมิ่ง และความปลอดภัย | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Mexico has growing surveillance and cybersecurity concerns. Find VPNs that protect your privacy and access US streaming content from Mexico.",
    nl: "Mexico heeft groeiende surveillance en cyberveiligheidszorgen.",
    de: "Mexiko hat wachsende Überwachung und Cybersicherheitsbedenken.",
    es: "México tiene creciente vigilancia y preocupaciones de ciberseguridad.",
    fr: "Le Mexique a une surveillance croissante et des problèmes de cybersécurité.",
    zh: "墨西哥监控和网络安全问题日益增长。",
    ja: "メキシコは監視とサイバーセキュリティの懸念が拡大しています。",
    ko: "멕시코는 감시와 사이버 보안 우려가 증가하고 있습니다.",
    th: "เม็กซิโกมีการเฝ้าระวังที่เพิ่มขึ้นและความกังวลด้านความปลอดภัยทางไซเบอร์",
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
    alternates: generateAlternates("/countries/mexico", locale),
  };
}

export default async function MexicoVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();
  const countryVpns = allVpns.filter((vpn) =>
    ["nordvpn", "expressvpn", "surfshark"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated March 2026",
      title: "Best VPN for Mexico",
      subtitle: "Protect your privacy and access US streaming content from Mexico",
      legalStatus: "VPN Legal Status in Mexico",
      legalStatusText: "VPN use is fully legal in Mexico. Concerns about government surveillance (including documented Pegasus spyware use against journalists and activists) make VPNs important for privacy. Internet freedom has been declining.",
      blockedVpns: "Privacy Concerns in Mexico",
      blockedList: ["Government Pegasus spyware use documented","Journalist and activist surveillance","High cybercrime rates","ISP throttling on some networks","Growing data retention requirements","Limited net neutrality enforcement"],
      internetFreedom: "Mexico Internet Freedom Score",
      freedomStats: [
        { value: "77.7%", label: "Internet users (2024)" },
        { value: "Pegasus", label: "Spyware documented" },
        { value: "60/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Mexico (2026)",
      whatWorksText: "All VPNs work freely in Mexico. Choose VPNs with strong encryption due to surveillance concerns and US servers for streaming.",
      keyFeatures: "Essential Features for Mexico",
      features: [
        { title: "Strong Encryption", desc: "Military-grade encryption to protect against government surveillance and Pegasus" },
        { title: "US Server Access", desc: "Connect to US servers for larger Netflix and streaming libraries" },
        { title: "Anti-Malware Protection", desc: "Built-in malware blocking to protect against Mexico's high cybercrime rates" },
        { title: "Kill Switch", desc: "Automatic connection kill to prevent data leaks if VPN drops" },
      ],
      blockedServices: "Why You Need a VPN in Mexico",
      blocked: ["Protection from Pegasus-type surveillance","Access US streaming libraries (larger catalog)","Secure public WiFi at cafes and airports","Bypass ISP throttling","Protect against cybercrime","Anonymous browsing from ISP tracking"],
      tips: "Tips for VPN Use in Mexico",
      tipsList: ["Choose VPNs with strong encryption due to surveillance concerns","Use US servers for the best streaming content library","Enable the kill switch at all times for maximum protection","Consider VPNs with built-in malware and ad blocking","WireGuard protocol offers the best balance of speed and security","Use auto-connect feature for always-on protection"],
      faqTitle: "Mexico VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Mexico?", a: "Yes, VPNs are completely legal in Mexico with no restrictions on usage." },
        { q: "Why is a VPN important in Mexico?", a: "Mexico has documented cases of government use of Pegasus spyware against journalists, high cybercrime rates, and growing surveillance. A VPN encrypts your traffic and protects your digital privacy." },
        { q: "Can I access US Netflix from Mexico with a VPN?", a: "Yes, connecting to a US VPN server lets you access Netflix US, which has a larger content library than Netflix Mexico." },
        { q: "Does a VPN protect against Pegasus spyware?", a: "A VPN encrypts your internet traffic but cannot fully protect against sophisticated spyware like Pegasus. However, it adds an important layer of privacy protection." },
      ],
      getVpn: "Get VPN",
      worksInCountry: "Works in Mexico",
      obfuscation: "Strong Security",
      lastUpdated: "Last updated: March 2026",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt maart 2026",
      title: "Best VPN for Mexico",
      subtitle: "Protect your privacy and access US streaming content from Mexico",
      legalStatus: "VPN Legal Status in Mexico",
      legalStatusText: "VPN use is fully legal in Mexico. Concerns about government surveillance (including documented Pegasus spyware use against journalists and activists) make VPNs important for privacy. Internet freedom has been declining.",
      blockedVpns: "Privacy Concerns in Mexico",
      blockedList: ["Government Pegasus spyware use documented","Journalist and activist surveillance","High cybercrime rates","ISP throttling on some networks","Growing data retention requirements","Limited net neutrality enforcement"],
      internetFreedom: "Mexico Internet Freedom Score",
      freedomStats: [
        { value: "77.7%", label: "Internet users (2024)" },
        { value: "Pegasus", label: "Spyware documented" },
        { value: "60/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Mexico (2026)",
      whatWorksText: "All VPNs work freely in Mexico. Choose VPNs with strong encryption due to surveillance concerns and US servers for streaming.",
      keyFeatures: "Essential Features for Mexico",
      features: [
        { title: "Strong Encryption", desc: "Military-grade encryption to protect against government surveillance and Pegasus" },
        { title: "US Server Access", desc: "Connect to US servers for larger Netflix and streaming libraries" },
        { title: "Anti-Malware Protection", desc: "Built-in malware blocking to protect against Mexico's high cybercrime rates" },
        { title: "Kill Switch", desc: "Automatic connection kill to prevent data leaks if VPN drops" },
      ],
      blockedServices: "Why You Need a VPN in Mexico",
      blocked: ["Protection from Pegasus-type surveillance","Access US streaming libraries (larger catalog)","Secure public WiFi at cafes and airports","Bypass ISP throttling","Protect against cybercrime","Anonymous browsing from ISP tracking"],
      tips: "Tips for VPN Use in Mexico",
      tipsList: ["Choose VPNs with strong encryption due to surveillance concerns","Use US servers for the best streaming content library","Enable the kill switch at all times for maximum protection","Consider VPNs with built-in malware and ad blocking","WireGuard protocol offers the best balance of speed and security","Use auto-connect feature for always-on protection"],
      faqTitle: "Mexico VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Mexico?", a: "Yes, VPNs are completely legal in Mexico with no restrictions on usage." },
        { q: "Why is a VPN important in Mexico?", a: "Mexico has documented cases of government use of Pegasus spyware against journalists, high cybercrime rates, and growing surveillance. A VPN encrypts your traffic and protects your digital privacy." },
        { q: "Can I access US Netflix from Mexico with a VPN?", a: "Yes, connecting to a US VPN server lets you access Netflix US, which has a larger content library than Netflix Mexico." },
        { q: "Does a VPN protect against Pegasus spyware?", a: "A VPN encrypts your internet traffic but cannot fully protect against sophisticated spyware like Pegasus. However, it adds an important layer of privacy protection." },
      ],
      getVpn: "Download VPN",
      worksInCountry: "Werkt in Mexico",
      obfuscation: "Strong Security",
      lastUpdated: "Laatst bijgewerkt: maart 2026",
      sources: "Bronnen",
    },
    de: {
      badge: "Aktualisiert März 2026",
      title: "Best VPN for Mexico",
      subtitle: "Protect your privacy and access US streaming content from Mexico",
      legalStatus: "VPN Legal Status in Mexico",
      legalStatusText: "VPN use is fully legal in Mexico. Concerns about government surveillance (including documented Pegasus spyware use against journalists and activists) make VPNs important for privacy. Internet freedom has been declining.",
      blockedVpns: "Privacy Concerns in Mexico",
      blockedList: ["Government Pegasus spyware use documented","Journalist and activist surveillance","High cybercrime rates","ISP throttling on some networks","Growing data retention requirements","Limited net neutrality enforcement"],
      internetFreedom: "Mexico Internet Freedom Score",
      freedomStats: [
        { value: "77.7%", label: "Internet users (2024)" },
        { value: "Pegasus", label: "Spyware documented" },
        { value: "60/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Mexico (2026)",
      whatWorksText: "All VPNs work freely in Mexico. Choose VPNs with strong encryption due to surveillance concerns and US servers for streaming.",
      keyFeatures: "Essential Features for Mexico",
      features: [
        { title: "Strong Encryption", desc: "Military-grade encryption to protect against government surveillance and Pegasus" },
        { title: "US Server Access", desc: "Connect to US servers for larger Netflix and streaming libraries" },
        { title: "Anti-Malware Protection", desc: "Built-in malware blocking to protect against Mexico's high cybercrime rates" },
        { title: "Kill Switch", desc: "Automatic connection kill to prevent data leaks if VPN drops" },
      ],
      blockedServices: "Why You Need a VPN in Mexico",
      blocked: ["Protection from Pegasus-type surveillance","Access US streaming libraries (larger catalog)","Secure public WiFi at cafes and airports","Bypass ISP throttling","Protect against cybercrime","Anonymous browsing from ISP tracking"],
      tips: "Tips for VPN Use in Mexico",
      tipsList: ["Choose VPNs with strong encryption due to surveillance concerns","Use US servers for the best streaming content library","Enable the kill switch at all times for maximum protection","Consider VPNs with built-in malware and ad blocking","WireGuard protocol offers the best balance of speed and security","Use auto-connect feature for always-on protection"],
      faqTitle: "Mexico VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Mexico?", a: "Yes, VPNs are completely legal in Mexico with no restrictions on usage." },
        { q: "Why is a VPN important in Mexico?", a: "Mexico has documented cases of government use of Pegasus spyware against journalists, high cybercrime rates, and growing surveillance. A VPN encrypts your traffic and protects your digital privacy." },
        { q: "Can I access US Netflix from Mexico with a VPN?", a: "Yes, connecting to a US VPN server lets you access Netflix US, which has a larger content library than Netflix Mexico." },
        { q: "Does a VPN protect against Pegasus spyware?", a: "A VPN encrypts your internet traffic but cannot fully protect against sophisticated spyware like Pegasus. However, it adds an important layer of privacy protection." },
      ],
      getVpn: "VPN erhalten",
      worksInCountry: "Funktioniert in Mexico",
      obfuscation: "Strong Security",
      lastUpdated: "Zuletzt aktualisiert: März 2026",
      sources: "Quellen",
    },
    es: {
      badge: "Actualizado marzo 2026",
      title: "Best VPN for Mexico",
      subtitle: "Protect your privacy and access US streaming content from Mexico",
      legalStatus: "VPN Legal Status in Mexico",
      legalStatusText: "VPN use is fully legal in Mexico. Concerns about government surveillance (including documented Pegasus spyware use against journalists and activists) make VPNs important for privacy. Internet freedom has been declining.",
      blockedVpns: "Privacy Concerns in Mexico",
      blockedList: ["Government Pegasus spyware use documented","Journalist and activist surveillance","High cybercrime rates","ISP throttling on some networks","Growing data retention requirements","Limited net neutrality enforcement"],
      internetFreedom: "Mexico Internet Freedom Score",
      freedomStats: [
        { value: "77.7%", label: "Internet users (2024)" },
        { value: "Pegasus", label: "Spyware documented" },
        { value: "60/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Mexico (2026)",
      whatWorksText: "All VPNs work freely in Mexico. Choose VPNs with strong encryption due to surveillance concerns and US servers for streaming.",
      keyFeatures: "Essential Features for Mexico",
      features: [
        { title: "Strong Encryption", desc: "Military-grade encryption to protect against government surveillance and Pegasus" },
        { title: "US Server Access", desc: "Connect to US servers for larger Netflix and streaming libraries" },
        { title: "Anti-Malware Protection", desc: "Built-in malware blocking to protect against Mexico's high cybercrime rates" },
        { title: "Kill Switch", desc: "Automatic connection kill to prevent data leaks if VPN drops" },
      ],
      blockedServices: "Why You Need a VPN in Mexico",
      blocked: ["Protection from Pegasus-type surveillance","Access US streaming libraries (larger catalog)","Secure public WiFi at cafes and airports","Bypass ISP throttling","Protect against cybercrime","Anonymous browsing from ISP tracking"],
      tips: "Tips for VPN Use in Mexico",
      tipsList: ["Choose VPNs with strong encryption due to surveillance concerns","Use US servers for the best streaming content library","Enable the kill switch at all times for maximum protection","Consider VPNs with built-in malware and ad blocking","WireGuard protocol offers the best balance of speed and security","Use auto-connect feature for always-on protection"],
      faqTitle: "Mexico VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Mexico?", a: "Yes, VPNs are completely legal in Mexico with no restrictions on usage." },
        { q: "Why is a VPN important in Mexico?", a: "Mexico has documented cases of government use of Pegasus spyware against journalists, high cybercrime rates, and growing surveillance. A VPN encrypts your traffic and protects your digital privacy." },
        { q: "Can I access US Netflix from Mexico with a VPN?", a: "Yes, connecting to a US VPN server lets you access Netflix US, which has a larger content library than Netflix Mexico." },
        { q: "Does a VPN protect against Pegasus spyware?", a: "A VPN encrypts your internet traffic but cannot fully protect against sophisticated spyware like Pegasus. However, it adds an important layer of privacy protection." },
      ],
      getVpn: "Obtener VPN",
      worksInCountry: "Funciona en Mexico",
      obfuscation: "Strong Security",
      lastUpdated: "Última actualización: marzo 2026",
      sources: "Fuentes",
    },
    fr: {
      badge: "Mis à jour mars 2026",
      title: "Best VPN for Mexico",
      subtitle: "Protect your privacy and access US streaming content from Mexico",
      legalStatus: "VPN Legal Status in Mexico",
      legalStatusText: "VPN use is fully legal in Mexico. Concerns about government surveillance (including documented Pegasus spyware use against journalists and activists) make VPNs important for privacy. Internet freedom has been declining.",
      blockedVpns: "Privacy Concerns in Mexico",
      blockedList: ["Government Pegasus spyware use documented","Journalist and activist surveillance","High cybercrime rates","ISP throttling on some networks","Growing data retention requirements","Limited net neutrality enforcement"],
      internetFreedom: "Mexico Internet Freedom Score",
      freedomStats: [
        { value: "77.7%", label: "Internet users (2024)" },
        { value: "Pegasus", label: "Spyware documented" },
        { value: "60/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Mexico (2026)",
      whatWorksText: "All VPNs work freely in Mexico. Choose VPNs with strong encryption due to surveillance concerns and US servers for streaming.",
      keyFeatures: "Essential Features for Mexico",
      features: [
        { title: "Strong Encryption", desc: "Military-grade encryption to protect against government surveillance and Pegasus" },
        { title: "US Server Access", desc: "Connect to US servers for larger Netflix and streaming libraries" },
        { title: "Anti-Malware Protection", desc: "Built-in malware blocking to protect against Mexico's high cybercrime rates" },
        { title: "Kill Switch", desc: "Automatic connection kill to prevent data leaks if VPN drops" },
      ],
      blockedServices: "Why You Need a VPN in Mexico",
      blocked: ["Protection from Pegasus-type surveillance","Access US streaming libraries (larger catalog)","Secure public WiFi at cafes and airports","Bypass ISP throttling","Protect against cybercrime","Anonymous browsing from ISP tracking"],
      tips: "Tips for VPN Use in Mexico",
      tipsList: ["Choose VPNs with strong encryption due to surveillance concerns","Use US servers for the best streaming content library","Enable the kill switch at all times for maximum protection","Consider VPNs with built-in malware and ad blocking","WireGuard protocol offers the best balance of speed and security","Use auto-connect feature for always-on protection"],
      faqTitle: "Mexico VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Mexico?", a: "Yes, VPNs are completely legal in Mexico with no restrictions on usage." },
        { q: "Why is a VPN important in Mexico?", a: "Mexico has documented cases of government use of Pegasus spyware against journalists, high cybercrime rates, and growing surveillance. A VPN encrypts your traffic and protects your digital privacy." },
        { q: "Can I access US Netflix from Mexico with a VPN?", a: "Yes, connecting to a US VPN server lets you access Netflix US, which has a larger content library than Netflix Mexico." },
        { q: "Does a VPN protect against Pegasus spyware?", a: "A VPN encrypts your internet traffic but cannot fully protect against sophisticated spyware like Pegasus. However, it adds an important layer of privacy protection." },
      ],
      getVpn: "Obtenir VPN",
      worksInCountry: "Fonctionne en Mexico",
      obfuscation: "Strong Security",
      lastUpdated: "Dernière mise à jour : mars 2026",
      sources: "Sources",
    },
    zh: {
      badge: "更新于2026年3月",
      title: "Best VPN for Mexico",
      subtitle: "Protect your privacy and access US streaming content from Mexico",
      legalStatus: "VPN Legal Status in Mexico",
      legalStatusText: "VPN use is fully legal in Mexico. Concerns about government surveillance (including documented Pegasus spyware use against journalists and activists) make VPNs important for privacy. Internet freedom has been declining.",
      blockedVpns: "Privacy Concerns in Mexico",
      blockedList: ["Government Pegasus spyware use documented","Journalist and activist surveillance","High cybercrime rates","ISP throttling on some networks","Growing data retention requirements","Limited net neutrality enforcement"],
      internetFreedom: "Mexico Internet Freedom Score",
      freedomStats: [
        { value: "77.7%", label: "Internet users (2024)" },
        { value: "Pegasus", label: "Spyware documented" },
        { value: "60/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Mexico (2026)",
      whatWorksText: "All VPNs work freely in Mexico. Choose VPNs with strong encryption due to surveillance concerns and US servers for streaming.",
      keyFeatures: "Essential Features for Mexico",
      features: [
        { title: "Strong Encryption", desc: "Military-grade encryption to protect against government surveillance and Pegasus" },
        { title: "US Server Access", desc: "Connect to US servers for larger Netflix and streaming libraries" },
        { title: "Anti-Malware Protection", desc: "Built-in malware blocking to protect against Mexico's high cybercrime rates" },
        { title: "Kill Switch", desc: "Automatic connection kill to prevent data leaks if VPN drops" },
      ],
      blockedServices: "Why You Need a VPN in Mexico",
      blocked: ["Protection from Pegasus-type surveillance","Access US streaming libraries (larger catalog)","Secure public WiFi at cafes and airports","Bypass ISP throttling","Protect against cybercrime","Anonymous browsing from ISP tracking"],
      tips: "Tips for VPN Use in Mexico",
      tipsList: ["Choose VPNs with strong encryption due to surveillance concerns","Use US servers for the best streaming content library","Enable the kill switch at all times for maximum protection","Consider VPNs with built-in malware and ad blocking","WireGuard protocol offers the best balance of speed and security","Use auto-connect feature for always-on protection"],
      faqTitle: "Mexico VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Mexico?", a: "Yes, VPNs are completely legal in Mexico with no restrictions on usage." },
        { q: "Why is a VPN important in Mexico?", a: "Mexico has documented cases of government use of Pegasus spyware against journalists, high cybercrime rates, and growing surveillance. A VPN encrypts your traffic and protects your digital privacy." },
        { q: "Can I access US Netflix from Mexico with a VPN?", a: "Yes, connecting to a US VPN server lets you access Netflix US, which has a larger content library than Netflix Mexico." },
        { q: "Does a VPN protect against Pegasus spyware?", a: "A VPN encrypts your internet traffic but cannot fully protect against sophisticated spyware like Pegasus. However, it adds an important layer of privacy protection." },
      ],
      getVpn: "获取VPN",
      worksInCountry: "在Mexico可用",
      obfuscation: "Strong Security",
      lastUpdated: "最后更新：2026年3月",
      sources: "来源",
    },
    ja: {
      badge: "2026年3月更新",
      title: "Best VPN for Mexico",
      subtitle: "Protect your privacy and access US streaming content from Mexico",
      legalStatus: "VPN Legal Status in Mexico",
      legalStatusText: "VPN use is fully legal in Mexico. Concerns about government surveillance (including documented Pegasus spyware use against journalists and activists) make VPNs important for privacy. Internet freedom has been declining.",
      blockedVpns: "Privacy Concerns in Mexico",
      blockedList: ["Government Pegasus spyware use documented","Journalist and activist surveillance","High cybercrime rates","ISP throttling on some networks","Growing data retention requirements","Limited net neutrality enforcement"],
      internetFreedom: "Mexico Internet Freedom Score",
      freedomStats: [
        { value: "77.7%", label: "Internet users (2024)" },
        { value: "Pegasus", label: "Spyware documented" },
        { value: "60/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Mexico (2026)",
      whatWorksText: "All VPNs work freely in Mexico. Choose VPNs with strong encryption due to surveillance concerns and US servers for streaming.",
      keyFeatures: "Essential Features for Mexico",
      features: [
        { title: "Strong Encryption", desc: "Military-grade encryption to protect against government surveillance and Pegasus" },
        { title: "US Server Access", desc: "Connect to US servers for larger Netflix and streaming libraries" },
        { title: "Anti-Malware Protection", desc: "Built-in malware blocking to protect against Mexico's high cybercrime rates" },
        { title: "Kill Switch", desc: "Automatic connection kill to prevent data leaks if VPN drops" },
      ],
      blockedServices: "Why You Need a VPN in Mexico",
      blocked: ["Protection from Pegasus-type surveillance","Access US streaming libraries (larger catalog)","Secure public WiFi at cafes and airports","Bypass ISP throttling","Protect against cybercrime","Anonymous browsing from ISP tracking"],
      tips: "Tips for VPN Use in Mexico",
      tipsList: ["Choose VPNs with strong encryption due to surveillance concerns","Use US servers for the best streaming content library","Enable the kill switch at all times for maximum protection","Consider VPNs with built-in malware and ad blocking","WireGuard protocol offers the best balance of speed and security","Use auto-connect feature for always-on protection"],
      faqTitle: "Mexico VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Mexico?", a: "Yes, VPNs are completely legal in Mexico with no restrictions on usage." },
        { q: "Why is a VPN important in Mexico?", a: "Mexico has documented cases of government use of Pegasus spyware against journalists, high cybercrime rates, and growing surveillance. A VPN encrypts your traffic and protects your digital privacy." },
        { q: "Can I access US Netflix from Mexico with a VPN?", a: "Yes, connecting to a US VPN server lets you access Netflix US, which has a larger content library than Netflix Mexico." },
        { q: "Does a VPN protect against Pegasus spyware?", a: "A VPN encrypts your internet traffic but cannot fully protect against sophisticated spyware like Pegasus. However, it adds an important layer of privacy protection." },
      ],
      getVpn: "VPNを取得",
      worksInCountry: "Mexicoで機能",
      obfuscation: "Strong Security",
      lastUpdated: "最終更新：2026年3月",
      sources: "情報源",
    },
    ko: {
      badge: "2026년 3월 업데이트",
      title: "Best VPN for Mexico",
      subtitle: "Protect your privacy and access US streaming content from Mexico",
      legalStatus: "VPN Legal Status in Mexico",
      legalStatusText: "VPN use is fully legal in Mexico. Concerns about government surveillance (including documented Pegasus spyware use against journalists and activists) make VPNs important for privacy. Internet freedom has been declining.",
      blockedVpns: "Privacy Concerns in Mexico",
      blockedList: ["Government Pegasus spyware use documented","Journalist and activist surveillance","High cybercrime rates","ISP throttling on some networks","Growing data retention requirements","Limited net neutrality enforcement"],
      internetFreedom: "Mexico Internet Freedom Score",
      freedomStats: [
        { value: "77.7%", label: "Internet users (2024)" },
        { value: "Pegasus", label: "Spyware documented" },
        { value: "60/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Mexico (2026)",
      whatWorksText: "All VPNs work freely in Mexico. Choose VPNs with strong encryption due to surveillance concerns and US servers for streaming.",
      keyFeatures: "Essential Features for Mexico",
      features: [
        { title: "Strong Encryption", desc: "Military-grade encryption to protect against government surveillance and Pegasus" },
        { title: "US Server Access", desc: "Connect to US servers for larger Netflix and streaming libraries" },
        { title: "Anti-Malware Protection", desc: "Built-in malware blocking to protect against Mexico's high cybercrime rates" },
        { title: "Kill Switch", desc: "Automatic connection kill to prevent data leaks if VPN drops" },
      ],
      blockedServices: "Why You Need a VPN in Mexico",
      blocked: ["Protection from Pegasus-type surveillance","Access US streaming libraries (larger catalog)","Secure public WiFi at cafes and airports","Bypass ISP throttling","Protect against cybercrime","Anonymous browsing from ISP tracking"],
      tips: "Tips for VPN Use in Mexico",
      tipsList: ["Choose VPNs with strong encryption due to surveillance concerns","Use US servers for the best streaming content library","Enable the kill switch at all times for maximum protection","Consider VPNs with built-in malware and ad blocking","WireGuard protocol offers the best balance of speed and security","Use auto-connect feature for always-on protection"],
      faqTitle: "Mexico VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Mexico?", a: "Yes, VPNs are completely legal in Mexico with no restrictions on usage." },
        { q: "Why is a VPN important in Mexico?", a: "Mexico has documented cases of government use of Pegasus spyware against journalists, high cybercrime rates, and growing surveillance. A VPN encrypts your traffic and protects your digital privacy." },
        { q: "Can I access US Netflix from Mexico with a VPN?", a: "Yes, connecting to a US VPN server lets you access Netflix US, which has a larger content library than Netflix Mexico." },
        { q: "Does a VPN protect against Pegasus spyware?", a: "A VPN encrypts your internet traffic but cannot fully protect against sophisticated spyware like Pegasus. However, it adds an important layer of privacy protection." },
      ],
      getVpn: "VPN 받기",
      worksInCountry: "Mexico에서 작동",
      obfuscation: "Strong Security",
      lastUpdated: "마지막 업데이트: 2026년 3월",
      sources: "출처",
    },
    th: {
      badge: "อัปเดตมีนาคม 2026",
      title: "Best VPN for Mexico",
      subtitle: "Protect your privacy and access US streaming content from Mexico",
      legalStatus: "VPN Legal Status in Mexico",
      legalStatusText: "VPN use is fully legal in Mexico. Concerns about government surveillance (including documented Pegasus spyware use against journalists and activists) make VPNs important for privacy. Internet freedom has been declining.",
      blockedVpns: "Privacy Concerns in Mexico",
      blockedList: ["Government Pegasus spyware use documented","Journalist and activist surveillance","High cybercrime rates","ISP throttling on some networks","Growing data retention requirements","Limited net neutrality enforcement"],
      internetFreedom: "Mexico Internet Freedom Score",
      freedomStats: [
        { value: "77.7%", label: "Internet users (2024)" },
        { value: "Pegasus", label: "Spyware documented" },
        { value: "60/100", label: "Freedom score (Partly Free)" },
      ],
      whatWorks: "Best VPNs for Mexico (2026)",
      whatWorksText: "All VPNs work freely in Mexico. Choose VPNs with strong encryption due to surveillance concerns and US servers for streaming.",
      keyFeatures: "Essential Features for Mexico",
      features: [
        { title: "Strong Encryption", desc: "Military-grade encryption to protect against government surveillance and Pegasus" },
        { title: "US Server Access", desc: "Connect to US servers for larger Netflix and streaming libraries" },
        { title: "Anti-Malware Protection", desc: "Built-in malware blocking to protect against Mexico's high cybercrime rates" },
        { title: "Kill Switch", desc: "Automatic connection kill to prevent data leaks if VPN drops" },
      ],
      blockedServices: "Why You Need a VPN in Mexico",
      blocked: ["Protection from Pegasus-type surveillance","Access US streaming libraries (larger catalog)","Secure public WiFi at cafes and airports","Bypass ISP throttling","Protect against cybercrime","Anonymous browsing from ISP tracking"],
      tips: "Tips for VPN Use in Mexico",
      tipsList: ["Choose VPNs with strong encryption due to surveillance concerns","Use US servers for the best streaming content library","Enable the kill switch at all times for maximum protection","Consider VPNs with built-in malware and ad blocking","WireGuard protocol offers the best balance of speed and security","Use auto-connect feature for always-on protection"],
      faqTitle: "Mexico VPN FAQ",
      faqs: [
        { q: "Are VPNs legal in Mexico?", a: "Yes, VPNs are completely legal in Mexico with no restrictions on usage." },
        { q: "Why is a VPN important in Mexico?", a: "Mexico has documented cases of government use of Pegasus spyware against journalists, high cybercrime rates, and growing surveillance. A VPN encrypts your traffic and protects your digital privacy." },
        { q: "Can I access US Netflix from Mexico with a VPN?", a: "Yes, connecting to a US VPN server lets you access Netflix US, which has a larger content library than Netflix Mexico." },
        { q: "Does a VPN protect against Pegasus spyware?", a: "A VPN encrypts your internet traffic but cannot fully protect against sophisticated spyware like Pegasus. However, it adds an important layer of privacy protection." },
      ],
      getVpn: "รับ VPN",
      worksInCountry: "ใช้งานได้ในMexico",
      obfuscation: "Strong Security",
      lastUpdated: "อัปเดตล่าสุด: มีนาคม 2026",
      sources: "แหล่งที่มา",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col">
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl">{"🇲🇽"}</span>
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
                    Surveillance concerns
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
                <a href="https://freedomhouse.org/country/mexico/freedom-net/2024" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Freedom House - Mexico: Freedom on the Net 2024
                </a>
              </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">{t.lastUpdated}</p>
        </div></div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container">
          <RelatedPages title="Related Guides" pages={[
              { title: "VPN Guide: Brazil", description: "Privacy and messaging in Brazil", href: "/countries/brazil", icon: "globe" },
              { title: "VPN Guide: United States", description: "ISP tracking and privacy in the US", href: "/countries/united-states", icon: "globe" },
            { title: "All Country Guides", description: "VPN guides for all countries", href: "/countries", icon: "map" }
          ]} />
        </div>
      </section>
    </div>
  );
}
