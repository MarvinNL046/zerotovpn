import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { getAllVpns, type VpnProvider } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Clock,
  ArrowRight,
  Info,
  Scale,
  Smartphone,
  Lock,
  Phone,
  Building,
  DollarSign,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for UAE & Dubai 2025: Legal Guide & Top Picks | ZeroToVPN",
    nl: "Beste VPN voor VAE & Dubai 2025: Juridische Gids & Top Keuzes | ZeroToVPN",
    de: "Beste VPN für VAE & Dubai 2025: Rechtlicher Leitfaden | ZeroToVPN",
    es: "Mejor VPN para EAU y Dubái 2025: Guía Legal y Mejores Opciones | ZeroToVPN",
    fr: "Meilleur VPN pour EAU et Dubaï 2025: Guide Juridique | ZeroToVPN",
    zh: "阿联酋和迪拜最佳VPN 2025：法律指南及推荐 | ZeroToVPN",
    ja: "UAE・ドバイに最適なVPN 2025：法的ガイドとおすすめ | ZeroToVPN",
    ko: "UAE 및 두바이 최고의 VPN 2025: 법적 가이드 및 추천 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับ UAE และดูไบ 2025: คู่มือกฎหมายและแนะนำ | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Using a VPN in Dubai & UAE? Know the laws first. VPNs are legal for legitimate use but fines up to AED 2M for misuse. Find safe, working VPNs.",
    nl: "VPN gebruiken in Dubai & VAE? Ken eerst de wetten. VPNs zijn legaal voor legitiem gebruik maar boetes tot AED 2M voor misbruik.",
    de: "VPN in Dubai & VAE nutzen? Kennen Sie zuerst die Gesetze. VPNs sind für legitime Nutzung legal, aber Strafen bis zu AED 2M.",
    es: "¿Usar VPN en Dubái y EAU? Conoce las leyes primero. Los VPN son legales para uso legítimo pero multas hasta AED 2M.",
    fr: "Utiliser un VPN à Dubaï et aux EAU? Connaissez d'abord les lois. Les VPN sont légaux pour un usage légitime.",
    zh: "在迪拜和阿联酋使用VPN？先了解法律。VPN合法用于正当用途，但滥用可罚款高达200万迪拉姆。找到安全可用的VPN。",
    ja: "ドバイ・UAEでVPNを使用？まず法律を知ろう。VPNは正当な用途では合法ですが、不正使用には最大200万ディルハムの罰金。",
    ko: "두바이와 UAE에서 VPN 사용? 먼저 법을 알아야 합니다. VPN은 합법적 용도로는 합법이지만 오용 시 최대 200만 디르함 벌금.",
    th: "ใช้ VPN ในดูไบและ UAE? รู้กฎหมายก่อน VPN ถูกกฎหมายสำหรับการใช้งานที่ถูกต้อง แต่ใช้ผิดอาจโดนปรับสูงถึง 200 ล้านดิรแฮม",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "article",
    },
  };
}

export default async function UAEVpnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allVpns = await getAllVpns();
  const uaeVpns = allVpns.filter((vpn) =>
    ["nordvpn", "surfshark", "expressvpn"].includes(vpn.slug)
  );

  const content = {
    en: {
      badge: "Updated November 2025",
      title: "Best VPN for UAE & Dubai",
      subtitle: "Navigate UAE's VPN regulations safely and access restricted content",
      legalNotice: "Important Legal Information",
      legalNoticeText:
        "VPNs are NOT banned in the UAE. They are legal for legitimate business and personal use. However, using a VPN to commit crimes or access illegal content can result in fines of AED 500,000 to AED 2,000,000 (approximately $136,000 to $545,000).",
      legalStatus: "VPN Legal Status in UAE",
      legalPoints: [
        {
          icon: "check",
          title: "Legal for Business",
          desc: "Banks, corporations, and remote workers legally use VPNs daily",
        },
        {
          icon: "check",
          title: "Legal for Privacy",
          desc: "Using VPN for personal security and privacy is permitted",
        },
        {
          icon: "warning",
          title: "Illegal for Crime",
          desc: "Using VPN to commit crimes or hide criminal activity is illegal",
        },
        {
          icon: "x",
          title: "VoIP Restrictions",
          desc: "Using VPN to bypass VoIP blocks (WhatsApp calls) is technically illegal",
        },
      ],
      fines: "Potential Penalties",
      finesList: [
        { amount: "AED 500,000", desc: "Minimum fine for VPN misuse" },
        { amount: "AED 2,000,000", desc: "Maximum fine for serious violations" },
        { amount: "Imprisonment", desc: "Possible for criminal activities" },
      ],
      whatWorks: "Recommended VPNs for UAE (2025)",
      whatWorksText:
        "These VPNs offer obfuscated servers that work in the UAE's restrictive environment. Choose providers based outside the UAE with strong no-logs policies.",
      keyFeatures: "Essential Features for UAE",
      features: [
        {
          title: "Obfuscated Servers",
          desc: "Essential for bypassing UAE's internet restrictions",
        },
        {
          title: "No-Logs Policy",
          desc: "Choose providers that don't store your activity data",
        },
        {
          title: "Based Outside UAE",
          desc: "Panama, Netherlands, BVI - beyond UAE jurisdiction",
        },
        {
          title: "Strong Encryption",
          desc: "AES-256 encryption to protect your data",
        },
      ],
      blockedServices: "Commonly Restricted in UAE",
      blocked: [
        "VoIP calls (WhatsApp, FaceTime, Skype voice/video)",
        "Some dating apps and websites",
        "Gambling websites",
        "Adult content",
        "Some news and political content",
        "Certain streaming content",
      ],
      tips: "Tips for VPN Use in UAE",
      tipsList: [
        "Install your VPN before arriving in the UAE",
        "Use for legitimate purposes only (business, privacy, streaming)",
        "Avoid using VPN for VoIP calls if concerned about legal gray area",
        "Don't use free VPNs - they lack proper security features",
        "Keep your VPN updated for best compatibility",
        "Use obfuscated/stealth mode when connecting",
      ],
      faqTitle: "UAE VPN FAQ",
      faqs: [
        {
          q: "Are VPNs legal in Dubai?",
          a: "Yes, VPNs are legal in Dubai and the UAE for legitimate purposes. Businesses, remote workers, and individuals can use VPNs for privacy and security. The law targets illegal activities performed while using a VPN, not the VPN itself.",
        },
        {
          q: "Can I use WhatsApp calls with a VPN in UAE?",
          a: "Technically, bypassing VoIP restrictions is against UAE regulations. However, many expats and tourists use VPNs for this purpose. The risk is relatively low for personal use, but it's a legal gray area you should be aware of.",
        },
        {
          q: "Will I get in trouble for using a VPN as a tourist?",
          a: "Using a VPN as a tourist for normal activities (checking email, streaming, privacy) is very unlikely to cause problems. The UAE primarily targets illegal activities, not regular VPN usage for privacy.",
        },
        {
          q: "Which VPNs work best in UAE?",
          a: "NordVPN, ExpressVPN, and Surfshark consistently work well in the UAE due to their obfuscation technology. Install before arrival as some VPN websites may be blocked.",
        },
      ],
      getVpn: "Get VPN",
      worksInUAE: "Works in UAE",
      obfuscation: "Obfuscation",
      lastUpdated: "Last updated: November 2025",
      sources: "Sources",
    },
    nl: {
      badge: "Bijgewerkt november 2025",
      title: "Beste VPN voor VAE & Dubai",
      subtitle: "Navigeer veilig door de VAE VPN-regelgeving",
      legalNotice: "Belangrijke Juridische Informatie",
      legalNoticeText:
        "VPNs zijn NIET verboden in de VAE. Ze zijn legaal voor legitiem zakelijk en persoonlijk gebruik. Echter, het gebruik van een VPN om misdaden te plegen kan leiden tot boetes van AED 500.000 tot AED 2.000.000.",
      legalStatus: "VPN Juridische Status in VAE",
      legalPoints: [
        {
          icon: "check",
          title: "Legaal voor Bedrijven",
          desc: "Banken, bedrijven en remote workers gebruiken dagelijks legaal VPNs",
        },
        {
          icon: "check",
          title: "Legaal voor Privacy",
          desc: "VPN gebruiken voor persoonlijke veiligheid is toegestaan",
        },
        {
          icon: "warning",
          title: "Illegaal voor Misdaad",
          desc: "VPN gebruiken om misdaden te plegen is illegaal",
        },
        {
          icon: "x",
          title: "VoIP Beperkingen",
          desc: "VPN gebruiken om VoIP-blokkades te omzeilen is technisch illegaal",
        },
      ],
      fines: "Mogelijke Boetes",
      finesList: [
        { amount: "AED 500.000", desc: "Minimale boete voor VPN-misbruik" },
        { amount: "AED 2.000.000", desc: "Maximale boete voor ernstige overtredingen" },
        { amount: "Gevangenisstraf", desc: "Mogelijk voor criminele activiteiten" },
      ],
      whatWorks: "Aanbevolen VPNs voor VAE (2025)",
      whatWorksText:
        "Deze VPNs bieden obfuscated servers die werken in de VAE. Kies providers buiten de VAE met sterke no-logs policies.",
      keyFeatures: "Essentiële Functies voor VAE",
      features: [
        {
          title: "Obfuscated Servers",
          desc: "Essentieel voor het omzeilen van VAE internetbeperkingen",
        },
        {
          title: "No-Logs Policy",
          desc: "Kies providers die je activiteit niet opslaan",
        },
        {
          title: "Buiten VAE Gevestigd",
          desc: "Panama, Nederland, BVI - buiten VAE jurisdictie",
        },
        {
          title: "Sterke Encryptie",
          desc: "AES-256 encryptie om je data te beschermen",
        },
      ],
      blockedServices: "Veelvoorkomende Beperkingen in VAE",
      blocked: [
        "VoIP-gesprekken (WhatsApp, FaceTime, Skype)",
        "Sommige dating apps en websites",
        "Gokwebsites",
        "Volwassen content",
        "Sommige nieuws- en politieke content",
        "Bepaalde streaming content",
      ],
      tips: "Tips voor VPN Gebruik in VAE",
      tipsList: [
        "Installeer je VPN voordat je naar de VAE gaat",
        "Gebruik alleen voor legitieme doeleinden",
        "Vermijd VPN voor VoIP-gesprekken als je bezorgd bent",
        "Gebruik geen gratis VPNs - ze missen goede beveiliging",
        "Houd je VPN up-to-date",
        "Gebruik obfuscated/stealth modus bij verbinden",
      ],
      faqTitle: "VAE VPN FAQ",
      faqs: [
        {
          q: "Zijn VPNs legaal in Dubai?",
          a: "Ja, VPNs zijn legaal in Dubai en de VAE voor legitieme doeleinden. Bedrijven en individuen kunnen VPNs gebruiken voor privacy en veiligheid.",
        },
        {
          q: "Kan ik WhatsApp-gesprekken voeren met een VPN in de VAE?",
          a: "Technisch gezien is het omzeilen van VoIP-beperkingen tegen de VAE-regelgeving. Veel expats gebruiken VPNs hiervoor, maar het is een juridisch grijs gebied.",
        },
        {
          q: "Krijg ik problemen als toerist met een VPN?",
          a: "VPN gebruiken als toerist voor normale activiteiten zal waarschijnlijk geen problemen veroorzaken. De VAE richt zich vooral op illegale activiteiten.",
        },
        {
          q: "Welke VPNs werken het beste in de VAE?",
          a: "NordVPN, ExpressVPN en Surfshark werken consistent goed in de VAE dankzij hun obfuscatie-technologie.",
        },
      ],
      getVpn: "Download VPN",
      worksInUAE: "Werkt in VAE",
      obfuscation: "Obfuscatie",
      lastUpdated: "Laatst bijgewerkt: november 2025",
      sources: "Bronnen",
    },
    de: {
      badge: "Aktualisiert November 2025",
      title: "Beste VPN für VAE & Dubai",
      subtitle: "Sicher durch die VAE VPN-Vorschriften navigieren und auf eingeschränkte Inhalte zugreifen",
      legalNotice: "Wichtige rechtliche Informationen",
      legalNoticeText:
        "VPNs sind in den VAE NICHT verboten. Sie sind legal für legitime geschäftliche und private Nutzung. Die Verwendung eines VPN für Straftaten kann jedoch zu Geldstrafen von AED 500.000 bis AED 2.000.000 führen.",
      legalStatus: "VPN Rechtsstatus in den VAE",
      legalPoints: [
        {
          icon: "check",
          title: "Legal für Unternehmen",
          desc: "Banken, Unternehmen und Remote-Worker nutzen täglich legal VPNs",
        },
        {
          icon: "check",
          title: "Legal für Privatsphäre",
          desc: "VPN für persönliche Sicherheit und Privatsphäre ist erlaubt",
        },
        {
          icon: "warning",
          title: "Illegal für Straftaten",
          desc: "VPN für Straftaten zu verwenden ist illegal",
        },
        {
          icon: "x",
          title: "VoIP-Beschränkungen",
          desc: "VPN zum Umgehen von VoIP-Sperren ist technisch illegal",
        },
      ],
      fines: "Mögliche Strafen",
      finesList: [
        { amount: "AED 500.000", desc: "Mindeststrafe für VPN-Missbrauch" },
        { amount: "AED 2.000.000", desc: "Höchststrafe für schwere Verstöße" },
        { amount: "Gefängnis", desc: "Möglich bei kriminellen Aktivitäten" },
      ],
      whatWorks: "Empfohlene VPNs für VAE (2025)",
      whatWorksText:
        "Diese VPNs bieten verschleierte Server, die in der restriktiven Umgebung der VAE funktionieren. Wählen Sie Anbieter außerhalb der VAE mit strengen No-Logs-Richtlinien.",
      keyFeatures: "Wesentliche Funktionen für VAE",
      features: [
        {
          title: "Verschleierte Server",
          desc: "Unerlässlich zum Umgehen der VAE-Internetbeschränkungen",
        },
        {
          title: "No-Logs-Richtlinie",
          desc: "Wählen Sie Anbieter, die Ihre Aktivitätsdaten nicht speichern",
        },
        {
          title: "Außerhalb VAE ansässig",
          desc: "Panama, Niederlande, BVI - außerhalb der VAE-Gerichtsbarkeit",
        },
        {
          title: "Starke Verschlüsselung",
          desc: "AES-256-Verschlüsselung zum Schutz Ihrer Daten",
        },
      ],
      blockedServices: "Häufig eingeschränkt in den VAE",
      blocked: [
        "VoIP-Anrufe (WhatsApp, FaceTime, Skype)",
        "Einige Dating-Apps und Websites",
        "Glücksspiel-Websites",
        "Erwachseneninhalte",
        "Einige Nachrichten- und politische Inhalte",
        "Bestimmte Streaming-Inhalte",
      ],
      tips: "Tipps für VPN-Nutzung in den VAE",
      tipsList: [
        "Installieren Sie Ihr VPN vor der Ankunft in den VAE",
        "Nur für legitime Zwecke verwenden (Geschäft, Privatsphäre, Streaming)",
        "Vermeiden Sie VPN für VoIP-Anrufe bei rechtlichen Bedenken",
        "Verwenden Sie keine kostenlosen VPNs - sie fehlen an Sicherheitsfunktionen",
        "Halten Sie Ihr VPN für beste Kompatibilität aktuell",
        "Verwenden Sie verschleierten/Stealth-Modus beim Verbinden",
      ],
      faqTitle: "VAE VPN FAQ",
      faqs: [
        {
          q: "Sind VPNs in Dubai legal?",
          a: "Ja, VPNs sind in Dubai und den VAE für legitime Zwecke legal. Unternehmen, Remote-Worker und Einzelpersonen können VPNs für Privatsphäre und Sicherheit verwenden.",
        },
        {
          q: "Kann ich WhatsApp-Anrufe mit VPN in den VAE tätigen?",
          a: "Technisch gesehen ist das Umgehen von VoIP-Beschränkungen gegen die VAE-Vorschriften. Viele Expats nutzen VPNs dafür, aber es ist eine rechtliche Grauzone.",
        },
        {
          q: "Bekomme ich als Tourist Probleme mit einem VPN?",
          a: "Die Verwendung eines VPN als Tourist für normale Aktivitäten wird wahrscheinlich keine Probleme verursachen. Die VAE zielen hauptsächlich auf illegale Aktivitäten ab.",
        },
        {
          q: "Welche VPNs funktionieren am besten in den VAE?",
          a: "NordVPN, ExpressVPN und Surfshark funktionieren konsistent gut in den VAE aufgrund ihrer Verschleierungstechnologie.",
        },
      ],
      getVpn: "VPN holen",
      worksInUAE: "Funktioniert in VAE",
      obfuscation: "Verschleierung",
      lastUpdated: "Zuletzt aktualisiert: November 2025",
      sources: "Quellen",
    },
    es: {
      badge: "Actualizado noviembre 2025",
      title: "Mejor VPN para EAU y Dubái",
      subtitle: "Navega de forma segura por las regulaciones VPN de EAU y accede a contenido restringido",
      legalNotice: "Información Legal Importante",
      legalNoticeText:
        "Los VPN NO están prohibidos en los EAU. Son legales para uso comercial y personal legítimo. Sin embargo, usar un VPN para cometer delitos puede resultar en multas de AED 500.000 a AED 2.000.000.",
      legalStatus: "Estado Legal del VPN en EAU",
      legalPoints: [
        {
          icon: "check",
          title: "Legal para Empresas",
          desc: "Bancos, corporaciones y trabajadores remotos usan VPN legalmente a diario",
        },
        {
          icon: "check",
          title: "Legal para Privacidad",
          desc: "Usar VPN para seguridad y privacidad personal está permitido",
        },
        {
          icon: "warning",
          title: "Ilegal para Delitos",
          desc: "Usar VPN para cometer delitos o esconder actividad criminal es ilegal",
        },
        {
          icon: "x",
          title: "Restricciones VoIP",
          desc: "Usar VPN para evitar bloqueos VoIP es técnicamente ilegal",
        },
      ],
      fines: "Penalizaciones Potenciales",
      finesList: [
        { amount: "AED 500.000", desc: "Multa mínima por mal uso de VPN" },
        { amount: "AED 2.000.000", desc: "Multa máxima por violaciones graves" },
        { amount: "Prisión", desc: "Posible para actividades criminales" },
      ],
      whatWorks: "VPNs Recomendados para EAU (2025)",
      whatWorksText:
        "Estos VPN ofrecen servidores ofuscados que funcionan en el entorno restrictivo de los EAU. Elige proveedores fuera de los EAU con políticas estrictas de no registros.",
      keyFeatures: "Características Esenciales para EAU",
      features: [
        {
          title: "Servidores Ofuscados",
          desc: "Esenciales para eludir las restricciones de internet de los EAU",
        },
        {
          title: "Política Sin Registros",
          desc: "Elige proveedores que no almacenen tus datos de actividad",
        },
        {
          title: "Con Sede Fuera de EAU",
          desc: "Panamá, Países Bajos, BVI - fuera de la jurisdicción de EAU",
        },
        {
          title: "Cifrado Fuerte",
          desc: "Cifrado AES-256 para proteger tus datos",
        },
      ],
      blockedServices: "Comúnmente Restringido en EAU",
      blocked: [
        "Llamadas VoIP (WhatsApp, FaceTime, Skype)",
        "Algunas apps y sitios de citas",
        "Sitios de apuestas",
        "Contenido para adultos",
        "Algunos contenidos de noticias y políticos",
        "Cierto contenido de streaming",
      ],
      tips: "Consejos para Usar VPN en EAU",
      tipsList: [
        "Instala tu VPN antes de llegar a los EAU",
        "Úsalo solo para propósitos legítimos (negocios, privacidad, streaming)",
        "Evita usar VPN para llamadas VoIP si te preocupa el área legal gris",
        "No uses VPN gratuitos - carecen de características de seguridad adecuadas",
        "Mantén tu VPN actualizado para mejor compatibilidad",
        "Usa modo ofuscado/sigilo al conectar",
      ],
      faqTitle: "FAQ VPN EAU",
      faqs: [
        {
          q: "¿Son legales los VPN en Dubái?",
          a: "Sí, los VPN son legales en Dubái y los EAU para propósitos legítimos. Empresas, trabajadores remotos e individuos pueden usar VPN para privacidad y seguridad.",
        },
        {
          q: "¿Puedo usar llamadas de WhatsApp con VPN en EAU?",
          a: "Técnicamente, eludir las restricciones VoIP va contra las regulaciones de EAU. Sin embargo, muchos expatriados usan VPN para esto. Es un área legal gris.",
        },
        {
          q: "¿Tendré problemas usando VPN como turista?",
          a: "Usar VPN como turista para actividades normales es muy poco probable que cause problemas. Los EAU se centran principalmente en actividades ilegales.",
        },
        {
          q: "¿Qué VPNs funcionan mejor en EAU?",
          a: "NordVPN, ExpressVPN y Surfshark funcionan consistentemente bien en los EAU debido a su tecnología de ofuscación.",
        },
      ],
      getVpn: "Obtener VPN",
      worksInUAE: "Funciona en EAU",
      obfuscation: "Ofuscación",
      lastUpdated: "Última actualización: noviembre 2025",
      sources: "Fuentes",
    },
    fr: {
      badge: "Mis à jour novembre 2025",
      title: "Meilleur VPN pour EAU et Dubaï",
      subtitle: "Naviguez en toute sécurité dans les réglementations VPN des EAU et accédez au contenu restreint",
      legalNotice: "Information Juridique Importante",
      legalNoticeText:
        "Les VPN ne sont PAS interdits aux EAU. Ils sont légaux pour une utilisation commerciale et personnelle légitime. Cependant, utiliser un VPN pour commettre des crimes peut entraîner des amendes de 500 000 à 2 000 000 AED.",
      legalStatus: "Statut Légal du VPN aux EAU",
      legalPoints: [
        {
          icon: "check",
          title: "Légal pour les Entreprises",
          desc: "Les banques, entreprises et télétravailleurs utilisent légalement des VPN quotidiennement",
        },
        {
          icon: "check",
          title: "Légal pour la Vie Privée",
          desc: "Utiliser un VPN pour la sécurité et la vie privée personnelle est autorisé",
        },
        {
          icon: "warning",
          title: "Illégal pour les Crimes",
          desc: "Utiliser un VPN pour commettre des crimes est illégal",
        },
        {
          icon: "x",
          title: "Restrictions VoIP",
          desc: "Utiliser un VPN pour contourner les blocages VoIP est techniquement illégal",
        },
      ],
      fines: "Pénalités Potentielles",
      finesList: [
        { amount: "AED 500 000", desc: "Amende minimale pour utilisation abusive de VPN" },
        { amount: "AED 2 000 000", desc: "Amende maximale pour violations graves" },
        { amount: "Prison", desc: "Possible pour activités criminelles" },
      ],
      whatWorks: "VPN Recommandés pour les EAU (2025)",
      whatWorksText:
        "Ces VPN offrent des serveurs obscurcis qui fonctionnent dans l'environnement restrictif des EAU. Choisissez des fournisseurs basés hors des EAU avec des politiques strictes de non-journalisation.",
      keyFeatures: "Fonctionnalités Essentielles pour les EAU",
      features: [
        {
          title: "Serveurs Obscurcis",
          desc: "Essentiels pour contourner les restrictions Internet des EAU",
        },
        {
          title: "Politique Sans Logs",
          desc: "Choisissez des fournisseurs qui ne stockent pas vos données d'activité",
        },
        {
          title: "Basé Hors des EAU",
          desc: "Panama, Pays-Bas, BVI - hors de la juridiction des EAU",
        },
        {
          title: "Chiffrement Fort",
          desc: "Chiffrement AES-256 pour protéger vos données",
        },
      ],
      blockedServices: "Couramment Restreint aux EAU",
      blocked: [
        "Appels VoIP (WhatsApp, FaceTime, Skype)",
        "Certaines applications et sites de rencontres",
        "Sites de jeux d'argent",
        "Contenu pour adultes",
        "Certains contenus d'actualités et politiques",
        "Certains contenus de streaming",
      ],
      tips: "Conseils pour l'Utilisation de VPN aux EAU",
      tipsList: [
        "Installez votre VPN avant d'arriver aux EAU",
        "Utilisez uniquement à des fins légitimes (affaires, vie privée, streaming)",
        "Évitez d'utiliser un VPN pour les appels VoIP si vous êtes préoccupé par la zone grise légale",
        "N'utilisez pas de VPN gratuits - ils manquent de fonctionnalités de sécurité appropriées",
        "Gardez votre VPN à jour pour une meilleure compatibilité",
        "Utilisez le mode obscurci/furtif lors de la connexion",
      ],
      faqTitle: "FAQ VPN EAU",
      faqs: [
        {
          q: "Les VPN sont-ils légaux à Dubaï?",
          a: "Oui, les VPN sont légaux à Dubaï et aux EAU à des fins légitimes. Les entreprises, télétravailleurs et particuliers peuvent utiliser des VPN pour la vie privée et la sécurité.",
        },
        {
          q: "Puis-je utiliser les appels WhatsApp avec un VPN aux EAU?",
          a: "Techniquement, contourner les restrictions VoIP va à l'encontre des réglementations des EAU. Cependant, de nombreux expatriés utilisent des VPN à cette fin. C'est une zone grise légale.",
        },
        {
          q: "Aurai-je des problèmes en utilisant un VPN en tant que touriste?",
          a: "Utiliser un VPN en tant que touriste pour des activités normales est très peu susceptible de causer des problèmes. Les EAU ciblent principalement les activités illégales.",
        },
        {
          q: "Quels VPN fonctionnent le mieux aux EAU?",
          a: "NordVPN, ExpressVPN et Surfshark fonctionnent régulièrement bien aux EAU grâce à leur technologie d'obscurcissement.",
        },
      ],
      getVpn: "Obtenir VPN",
      worksInUAE: "Fonctionne aux EAU",
      obfuscation: "Obscurcissement",
      lastUpdated: "Dernière mise à jour : novembre 2025",
      sources: "Sources",
    },
    zh: {
      badge: "2025年11月更新",
      title: "阿联酋和迪拜最佳VPN",
      subtitle: "安全地遵守阿联酋VPN法规并访问受限内容",
      legalNotice: "重要法律信息",
      legalNoticeText:
        "VPN在阿联酋并未被禁止。它们在合法的商业和个人用途中是合法的。但是，使用VPN进行犯罪活动可能会导致50万至200万迪拉姆的罚款。",
      legalStatus: "阿联酋VPN法律地位",
      legalPoints: [
        {
          icon: "check",
          title: "商业用途合法",
          desc: "银行、企业和远程工作者每天都合法使用VPN",
        },
        {
          icon: "check",
          title: "隐私用途合法",
          desc: "使用VPN保护个人安全和隐私是允许的",
        },
        {
          icon: "warning",
          title: "犯罪用途非法",
          desc: "使用VPN进行犯罪或隐藏犯罪活动是非法的",
        },
        {
          icon: "x",
          title: "VoIP限制",
          desc: "使用VPN绕过VoIP限制在技术上是非法的",
        },
      ],
      fines: "可能的处罚",
      finesList: [
        { amount: "50万迪拉姆", desc: "VPN滥用最低罚款" },
        { amount: "200万迪拉姆", desc: "严重违规最高罚款" },
        { amount: "监禁", desc: "犯罪活动可能面临" },
      ],
      whatWorks: "推荐的阿联酋VPN（2025）",
      whatWorksText:
        "这些VPN提供混淆服务器，可在阿联酋的限制性环境中使用。选择位于阿联酋境外且有严格无日志政策的供应商。",
      keyFeatures: "阿联酋必备功能",
      features: [
        {
          title: "混淆服务器",
          desc: "绕过阿联酋互联网限制的必备功能",
        },
        {
          title: "无日志政策",
          desc: "选择不存储您活动数据的供应商",
        },
        {
          title: "总部位于阿联酋境外",
          desc: "巴拿马、荷兰、英属维尔京群岛 - 不受阿联酋管辖",
        },
        {
          title: "强加密",
          desc: "AES-256加密保护您的数据",
        },
      ],
      blockedServices: "阿联酋常见限制",
      blocked: [
        "VoIP通话（WhatsApp、FaceTime、Skype语音/视频）",
        "部分约会应用和网站",
        "赌博网站",
        "成人内容",
        "部分新闻和政治内容",
        "某些流媒体内容",
      ],
      tips: "阿联酋VPN使用技巧",
      tipsList: [
        "在抵达阿联酋之前安装VPN",
        "仅用于合法目的（商业、隐私、流媒体）",
        "如果担心法律灰色地带，避免使用VPN进行VoIP通话",
        "不要使用免费VPN - 它们缺乏适当的安全功能",
        "保持VPN更新以获得最佳兼容性",
        "连接时使用混淆/隐身模式",
      ],
      faqTitle: "阿联酋VPN常见问题",
      faqs: [
        {
          q: "VPN在迪拜合法吗？",
          a: "是的，VPN在迪拜和阿联酋用于合法目的是合法的。企业、远程工作者和个人可以使用VPN保护隐私和安全。",
        },
        {
          q: "我可以在阿联酋使用VPN进行WhatsApp通话吗？",
          a: "从技术上讲，绕过VoIP限制违反了阿联酋的法规。然而，许多外籍人士为此使用VPN。这是一个法律灰色地带。",
        },
        {
          q: "作为游客使用VPN会遇到麻烦吗？",
          a: "作为游客使用VPN进行正常活动不太可能引起问题。阿联酋主要针对非法活动。",
        },
        {
          q: "哪些VPN在阿联酋效果最好？",
          a: "由于混淆技术，NordVPN、ExpressVPN和Surfshark在阿联酋一直表现良好。",
        },
      ],
      getVpn: "获取VPN",
      worksInUAE: "在阿联酋可用",
      obfuscation: "混淆",
      lastUpdated: "最后更新：2025年11月",
      sources: "资料来源",
    },
    ja: {
      badge: "2025年11月更新",
      title: "UAEとドバイに最適なVPN",
      subtitle: "UAEのVPN規制を安全にナビゲートし、制限されたコンテンツにアクセス",
      legalNotice: "重要な法的情報",
      legalNoticeText:
        "VPNはUAEで禁止されていません。合法的なビジネスおよび個人使用には合法です。ただし、VPNを犯罪行為に使用すると、50万～200万ディルハムの罰金が科せられる可能性があります。",
      legalStatus: "UAEにおけるVPNの法的地位",
      legalPoints: [
        {
          icon: "check",
          title: "ビジネス利用は合法",
          desc: "銀行、企業、リモートワーカーは毎日合法的にVPNを使用しています",
        },
        {
          icon: "check",
          title: "プライバシー保護は合法",
          desc: "個人のセキュリティとプライバシーのためのVPN使用は許可されています",
        },
        {
          icon: "warning",
          title: "犯罪行為は違法",
          desc: "VPNを使用して犯罪を犯したり犯罪活動を隠したりすることは違法です",
        },
        {
          icon: "x",
          title: "VoIP制限",
          desc: "VPNを使用してVoIPブロックを回避することは技術的に違法です",
        },
      ],
      fines: "潜在的な罰則",
      finesList: [
        { amount: "50万ディルハム", desc: "VPN誤用の最低罰金" },
        { amount: "200万ディルハム", desc: "重大な違反の最高罰金" },
        { amount: "懲役", desc: "犯罪活動の可能性あり" },
      ],
      whatWorks: "UAEに推奨されるVPN（2025年）",
      whatWorksText:
        "これらのVPNは、UAEの制限的な環境で動作する難読化サーバーを提供しています。厳格なノーログポリシーを持つUAE外のプロバイダーを選択してください。",
      keyFeatures: "UAEに必須の機能",
      features: [
        {
          title: "難読化サーバー",
          desc: "UAEのインターネット制限を回避するために不可欠",
        },
        {
          title: "ノーログポリシー",
          desc: "アクティビティデータを保存しないプロバイダーを選択",
        },
        {
          title: "UAE外に拠点",
          desc: "パナマ、オランダ、BVI - UAE管轄外",
        },
        {
          title: "強力な暗号化",
          desc: "データを保護するAES-256暗号化",
        },
      ],
      blockedServices: "UAEでよく制限されるもの",
      blocked: [
        "VoIP通話（WhatsApp、FaceTime、Skype音声/ビデオ）",
        "一部の出会い系アプリとウェブサイト",
        "ギャンブルサイト",
        "アダルトコンテンツ",
        "一部のニュースと政治コンテンツ",
        "特定のストリーミングコンテンツ",
      ],
      tips: "UAEでのVPN使用のヒント",
      tipsList: [
        "UAEに到着する前にVPNをインストールする",
        "合法的な目的（ビジネス、プライバシー、ストリーミング）のみに使用する",
        "法的グレーゾーンが心配な場合、VoIP通話にVPNを使用しない",
        "無料VPNを使用しない - 適切なセキュリティ機能がありません",
        "最高の互換性のためにVPNを最新の状態に保つ",
        "接続時に難読化/ステルスモードを使用する",
      ],
      faqTitle: "UAE VPN FAQ",
      faqs: [
        {
          q: "ドバイでVPNは合法ですか？",
          a: "はい、ドバイとUAEでは合法的な目的でVPNは合法です。企業、リモートワーカー、個人はプライバシーとセキュリティのためにVPNを使用できます。",
        },
        {
          q: "UAEでVPNを使ってWhatsApp通話できますか？",
          a: "技術的には、VoIP制限を回避することはUAEの規制に反します。ただし、多くの駐在員がこの目的でVPNを使用しています。これは法的グレーゾーンです。",
        },
        {
          q: "観光客としてVPNを使用して問題になりますか？",
          a: "観光客として通常の活動にVPNを使用しても問題が発生する可能性は非常に低いです。UAEは主に違法活動を対象としています。",
        },
        {
          q: "UAEで最も効果的なVPNは？",
          a: "NordVPN、ExpressVPN、Surfsharkは難読化技術によりUAEで一貫して良好に機能します。",
        },
      ],
      getVpn: "VPNを入手",
      worksInUAE: "UAEで動作",
      obfuscation: "難読化",
      lastUpdated: "最終更新：2025年11月",
      sources: "情報源",
    },
    ko: {
      badge: "2025년 11월 업데이트",
      title: "UAE 및 두바이 최고의 VPN",
      subtitle: "UAE의 VPN 규정을 안전하게 탐색하고 제한된 콘텐츠에 액세스",
      legalNotice: "중요한 법적 정보",
      legalNoticeText:
        "VPN은 UAE에서 금지되지 않습니다. 합법적인 비즈니스 및 개인 용도로는 합법입니다. 그러나 VPN을 범죄에 사용하면 50만~200만 디르함의 벌금이 부과될 수 있습니다.",
      legalStatus: "UAE VPN 법적 지위",
      legalPoints: [
        {
          icon: "check",
          title: "비즈니스 용도 합법",
          desc: "은행, 기업, 원격 근무자가 매일 합법적으로 VPN을 사용합니다",
        },
        {
          icon: "check",
          title: "개인정보 보호 합법",
          desc: "개인 보안 및 개인정보 보호를 위한 VPN 사용이 허용됩니다",
        },
        {
          icon: "warning",
          title: "범죄 행위 불법",
          desc: "VPN을 사용하여 범죄를 저지르거나 범죄 활동을 숨기는 것은 불법입니다",
        },
        {
          icon: "x",
          title: "VoIP 제한",
          desc: "VPN을 사용하여 VoIP 차단을 우회하는 것은 기술적으로 불법입니다",
        },
      ],
      fines: "잠재적 처벌",
      finesList: [
        { amount: "50만 디르함", desc: "VPN 오용 최소 벌금" },
        { amount: "200만 디르함", desc: "심각한 위반 최대 벌금" },
        { amount: "징역형", desc: "범죄 활동 가능성" },
      ],
      whatWorks: "UAE 추천 VPN (2025)",
      whatWorksText:
        "이러한 VPN은 UAE의 제한적인 환경에서 작동하는 난독화 서버를 제공합니다. 엄격한 무로그 정책을 가진 UAE 외부의 제공업체를 선택하세요.",
      keyFeatures: "UAE 필수 기능",
      features: [
        {
          title: "난독화 서버",
          desc: "UAE의 인터넷 제한을 우회하는 데 필수적",
        },
        {
          title: "무로그 정책",
          desc: "활동 데이터를 저장하지 않는 제공업체 선택",
        },
        {
          title: "UAE 외부 기반",
          desc: "파나마, 네덜란드, BVI - UAE 관할권 밖",
        },
        {
          title: "강력한 암호화",
          desc: "데이터 보호를 위한 AES-256 암호화",
        },
      ],
      blockedServices: "UAE에서 일반적으로 제한됨",
      blocked: [
        "VoIP 통화 (WhatsApp, FaceTime, Skype 음성/영상)",
        "일부 데이팅 앱 및 웹사이트",
        "도박 웹사이트",
        "성인 콘텐츠",
        "일부 뉴스 및 정치 콘텐츠",
        "특정 스트리밍 콘텐츠",
      ],
      tips: "UAE에서 VPN 사용 팁",
      tipsList: [
        "UAE에 도착하기 전에 VPN 설치",
        "합법적인 목적으로만 사용 (비즈니스, 개인정보 보호, 스트리밍)",
        "법적 회색 지대가 우려되면 VoIP 통화에 VPN 사용 피하기",
        "무료 VPN 사용 금지 - 적절한 보안 기능 부족",
        "최상의 호환성을 위해 VPN을 최신 상태로 유지",
        "연결 시 난독화/스텔스 모드 사용",
      ],
      faqTitle: "UAE VPN FAQ",
      faqs: [
        {
          q: "두바이에서 VPN이 합법인가요?",
          a: "예, 두바이와 UAE에서 합법적인 목적으로 VPN은 합법입니다. 기업, 원격 근무자, 개인이 개인정보 보호 및 보안을 위해 VPN을 사용할 수 있습니다.",
        },
        {
          q: "UAE에서 VPN으로 WhatsApp 통화를 할 수 있나요?",
          a: "기술적으로 VoIP 제한을 우회하는 것은 UAE 규정에 위배됩니다. 그러나 많은 외국인들이 이 목적으로 VPN을 사용합니다. 법적 회색 지대입니다.",
        },
        {
          q: "관광객으로서 VPN을 사용하면 문제가 되나요?",
          a: "관광객으로서 일반적인 활동에 VPN을 사용하는 것은 문제가 될 가능성이 매우 낮습니다. UAE는 주로 불법 활동을 대상으로 합니다.",
        },
        {
          q: "UAE에서 가장 잘 작동하는 VPN은?",
          a: "NordVPN, ExpressVPN, Surfshark는 난독화 기술 덕분에 UAE에서 일관되게 잘 작동합니다.",
        },
      ],
      getVpn: "VPN 받기",
      worksInUAE: "UAE에서 작동",
      obfuscation: "난독화",
      lastUpdated: "마지막 업데이트: 2025년 11월",
      sources: "출처",
    },
    th: {
      badge: "อัปเดตเมื่อพฤศจิกายน 2025",
      title: "VPN ที่ดีที่สุดสำหรับ UAE และดูไบ",
      subtitle: "นำทางกฎระเบียบ VPN ของ UAE อย่างปลอดภัยและเข้าถึงเนื้อหาที่ถูกจำกัด",
      legalNotice: "ข้อมูลทางกฎหมายที่สำคัญ",
      legalNoticeText:
        "VPN ไม่ได้ถูกห้ามใน UAE พวกเขาถูกกฎหมายสำหรับการใช้งานทางธุรกิจและส่วนบุคคลที่ถูกต้อง อย่างไรก็ตาม การใช้ VPN เพื่อก่ออาชญากรรมอาจส่งผลให้ถูกปรับ 500,000 ถึง 2,000,000 ดิรแฮม",
      legalStatus: "สถานะทางกฎหมายของ VPN ใน UAE",
      legalPoints: [
        {
          icon: "check",
          title: "ถูกกฎหมายสำหรับธุรกิจ",
          desc: "ธนาคาร บริษัท และพนักงานทำงานระยะไกลใช้ VPN อย่างถูกกฎหมายทุกวัน",
        },
        {
          icon: "check",
          title: "ถูกกฎหมายสำหรับความเป็นส่วนตัว",
          desc: "การใช้ VPN เพื่อความปลอดภัยและความเป็นส่วนตัวส่วนบุคคลได้รับอนุญาต",
        },
        {
          icon: "warning",
          title: "ผิดกฎหมายสำหรับอาชญากรรม",
          desc: "การใช้ VPN เพื่อก่ออาชญากรรมหรือซ่อนกิจกรรมทางอาชญากรรมเป็นสิ่งผิดกฎหมาย",
        },
        {
          icon: "x",
          title: "ข้อจำกัด VoIP",
          desc: "การใช้ VPN เพื่อหลีกเลี่ยงการบล็อก VoIP เป็นสิ่งผิดกฎหมายในทางเทคนิค",
        },
      ],
      fines: "บทลงโทษที่อาจเกิดขึ้น",
      finesList: [
        { amount: "500,000 ดิรแฮม", desc: "ค่าปรับขั้นต่ำสำหรับการใช้ VPN ในทางที่ผิด" },
        { amount: "2,000,000 ดิรแฮม", desc: "ค่าปรับสูงสุดสำหรับการละเมิดร้ายแรง" },
        { amount: "จำคุก", desc: "เป็นไปได้สำหรับกิจกรรมทางอาชญากรรม" },
      ],
      whatWorks: "VPN ที่แนะนำสำหรับ UAE (2025)",
      whatWorksText:
        "VPN เหล่านี้นำเสนอเซิร์ฟเวอร์ที่ซ่อนตัวที่ทำงานในสภาพแวดล้อมที่จำกัดของ UAE เลือกผู้ให้บริการที่อยู่นอก UAE ที่มีนโยบายไม่เก็บบันทึกที่เข้มงวด",
      keyFeatures: "คุณสมบัติที่จำเป็นสำหรับ UAE",
      features: [
        {
          title: "เซิร์ฟเวอร์ที่ซ่อนตัว",
          desc: "จำเป็นสำหรับการหลีกเลี่ยงข้อจำกัดอินเทอร์เน็ตของ UAE",
        },
        {
          title: "นโยบายไม่เก็บบันทึก",
          desc: "เลือกผู้ให้บริการที่ไม่เก็บข้อมูลกิจกรรมของคุณ",
        },
        {
          title: "ตั้งอยู่นอก UAE",
          desc: "ปานามา เนเธอร์แลนด์ BVI - นอกเขตอำนาจศาลของ UAE",
        },
        {
          title: "การเข้ารหัสที่แข็งแกร่ง",
          desc: "การเข้ารหัส AES-256 เพื่อปกป้องข้อมูลของคุณ",
        },
      ],
      blockedServices: "ถูกจำกัดโดยทั่วไปใน UAE",
      blocked: [
        "การโทร VoIP (WhatsApp, FaceTime, Skype เสียง/วิดีโอ)",
        "แอพและเว็บไซต์หาคู่บางส่วน",
        "เว็บไซต์การพนัน",
        "เนื้อหาผู้ใหญ่",
        "เนื้อหาข่าวและการเมืองบางส่วน",
        "เนื้อหาสตรีมมิ่งบางส่วน",
      ],
      tips: "เคล็ดลับสำหรับการใช้ VPN ใน UAE",
      tipsList: [
        "ติดตั้ง VPN ของคุณก่อนมาถึง UAE",
        "ใช้เฉพาะเพื่อวัตถุประสงค์ที่ถูกต้อง (ธุรกิจ ความเป็นส่วนตัว สตรีมมิ่ง)",
        "หลีกเลี่ยงการใช้ VPN สำหรับการโทร VoIP หากกังวลเกี่ยวกับพื้นที่สีเทาทางกฎหมาย",
        "อย่าใช้ VPN ฟรี - ขาดคุณสมบัติความปลอดภัยที่เหมาะสม",
        "อัปเดต VPN ของคุณให้ทันสมัยเพื่อความเข้ากันได้ที่ดีที่สุด",
        "ใช้โหมดซ่อนตัว/ลับๆ เมื่อเชื่อมต่อ",
      ],
      faqTitle: "คำถามที่พบบ่อย VPN UAE",
      faqs: [
        {
          q: "VPN ถูกกฎหมายในดูไบหรือไม่?",
          a: "ใช่ VPN ถูกกฎหมายในดูไบและ UAE สำหรับวัตถุประสงค์ที่ถูกต้อง ธุรกิจ พนักงานทำงานระยะไกล และบุคคลสามารถใช้ VPN เพื่อความเป็นส่วนตัวและความปลอดภัย",
        },
        {
          q: "ฉันสามารถใช้การโทร WhatsApp ด้วย VPN ใน UAE ได้หรือไม่?",
          a: "ในทางเทคนิค การหลีกเลี่ยงข้อจำกัด VoIP เป็นการขัดต่อกฎระเบียบของ UAE อย่างไรก็ตาม ชาวต่างชาติจำนวนมากใช้ VPN เพื่อจุดประสงค์นี้ มันเป็นพื้นที่สีเทาทางกฎหมาย",
        },
        {
          q: "ฉันจะมีปัญหาในการใช้ VPN ในฐานะนักท่องเที่ยวหรือไม่?",
          a: "การใช้ VPN ในฐานะนักท่องเที่ยวสำหรับกิจกรรมปกติไม่น่าจะก่อให้เกิดปัญหา UAE มุ่งเป้าหมายไปที่กิจกรรมที่ผิดกฎหมายเป็นหลัก",
        },
        {
          q: "VPN ใดทำงานได้ดีที่สุดใน UAE?",
          a: "NordVPN, ExpressVPN และ Surfshark ทำงานได้ดีอย่างสม่ำเสมอใน UAE เนื่องจากเทคโนโลยีการซ่อนตัว",
        },
      ],
      getVpn: "รับ VPN",
      worksInUAE: "ใช้งานได้ใน UAE",
      obfuscation: "การซ่อนตัว",
      lastUpdated: "อัปเดตล่าสุด: พฤศจิกายน 2025",
      sources: "แหล่งที่มา",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl">🇦🇪</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-8">
        <div className="container">
          <Card className="border-blue-500 bg-blue-500/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Scale className="h-8 w-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {t.legalNotice}
                  </h2>
                  <p className="text-muted-foreground">{t.legalNoticeText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Legal Status Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">{t.legalStatus}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.legalPoints.map((point, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-muted">
                      {point.icon === "check" && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {point.icon === "warning" && (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      {point.icon === "x" && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <h3 className="font-semibold">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fines Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">{t.fines}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {t.finesList.map((fine, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <DollarSign className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-500">{fine.amount}</div>
                  <p className="text-sm text-muted-foreground mt-1">{fine.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VPNs That Work */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whatWorks}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.whatWorksText}
            </p>
          </div>

          <div className="space-y-6">
            {uaeVpns.map((vpn, index) => (
              <Card key={vpn.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold">{vpn.name}</h3>
                        <RatingStars rating={vpn.overallRating} size="sm" />
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{t.worksInUAE}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">{t.obfuscation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-purple-500" />
                        <span className="text-sm">{vpn.countries} countries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-orange-500" />
                        <span className="text-sm">{vpn.maxDevices} devices</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                      <div className="text-center lg:text-right">
                        <div className="text-3xl font-bold text-primary">
                          ${vpn.priceTwoYear || vpn.priceYearly}
                          <span className="text-sm font-normal text-muted-foreground">
                            /mo
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <AffiliateButton
                          vpnId={vpn.id}
                          vpnName={vpn.name}
                          affiliateUrl={vpn.affiliateUrl}
                          className="flex-1"
                        >
                          {t.getVpn}
                        </AffiliateButton>
                        <Button variant="outline" asChild>
                          <Link href={`/reviews/${vpn.slug}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t.keyFeatures}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {index === 0 && <Lock className="h-6 w-6 text-primary" />}
                      {index === 1 && <Shield className="h-6 w-6 text-primary" />}
                      {index === 2 && <Building className="h-6 w-6 text-primary" />}
                      {index === 3 && <Lock className="h-6 w-6 text-primary" />}
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blocked Services */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t.blockedServices}
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {t.blocked.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t.tips}</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {t.tipsList.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-8 border-t">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold mb-4">{t.sources}</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <a
                  href="https://www.khaleejtimes.com/uae/legal/is-vpn-banned-in-uae-rules-fines-what-you-need-to-know"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Khaleej Times - Is VPN banned in UAE?
                </a>
              </li>
              <li>
                <a
                  href="https://blog.jobxdubai.com/2024/09/08/vpn-in-uae-legal-guidelines-regulations-for-safe-usage-in-2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  JobXDubai - VPN in UAE Legal Guidelines 2024
                </a>
              </li>
              <li>
                <a
                  href="https://www.lexology.com/library/detail.aspx?g=4a58f6f3-1806-4c29-889e-1958a5be10ba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Lexology - Understanding VPN Use in the UAE
                </a>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">{t.lastUpdated}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
