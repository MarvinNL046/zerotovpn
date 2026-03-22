import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getShortMonthYear, generateAlternates } from "@/lib/seo-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  Tag,
  CheckCircle,
  Shield,
  Info,
  KeyRound,
  CalendarCheck,
  Star,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const shortMonthYear = getShortMonthYear();

  const titles: Record<string, string> = {
    en: `VPN Deals & Coupons (${shortMonthYear}): Save Up to 87% | ZeroToVPN`,
    nl: `VPN Deals & Kortingscodes (${shortMonthYear}): Bespaar tot 87% | ZeroToVPN`,
    de: `VPN-Angebote & Gutscheine (${shortMonthYear}): Sparen Sie bis zu 87% | ZeroToVPN`,
    es: `Ofertas y Cupones VPN (${shortMonthYear}): Ahorra hasta 87% | ZeroToVPN`,
    fr: `Offres VPN & Coupons (${shortMonthYear}): Économisez jusqu'à 87% | ZeroToVPN`,
    zh: `VPN优惠与折扣码 (${shortMonthYear})：节省高达87% | ZeroToVPN`,
    ja: `VPNセール＆クーポン (${shortMonthYear})：最大87％オフ | ZeroToVPN`,
    ko: `VPN 할인 및 쿠폰 (${shortMonthYear}): 최대 87% 절약 | ZeroToVPN`,
    th: `ดีล VPN และคูปอง (${shortMonthYear}): ประหยัดสูงสุด 87% | ZeroToVPN`,
  };

  const descriptions: Record<string, string> = {
    en: `Exclusive VPN deals & coupons for ${shortMonthYear}. Save up to 87% on top-rated VPNs. All discounts tested & verified. 30-day money-back guarantee.`,
    nl: "Exclusieve VPN-deals en kortingscodes voor 2026. Bespaar tot 87% op premium VPN-diensten. Tijdelijke aanbiedingen met geld-terug-garantie.",
    de: "Exklusive VPN-Angebote und Gutscheine für 2026. Sparen Sie bis zu 87% bei Premium-VPN-Diensten. Zeitlich begrenzte Angebote mit Geld-zurück-Garantie.",
    es: "Ofertas y cupones VPN exclusivos para 2026. Ahorra hasta 87% en servicios VPN premium. Ofertas limitadas con garantía de devolución.",
    fr: "Offres VPN exclusives et coupons pour 2026. Économisez jusqu'à 87% sur les services VPN premium. Offres limitées avec garantie satisfait ou remboursé.",
    zh: "2026年独家VPN优惠和折扣码。高级VPN服务节省高达87%。限时优惠，支持退款保证。",
    ja: "2026年限定VPNセールとクーポン。プレミアムVPNサービスが最大87％オフ。返金保証付きの期間限定オファー。",
    ko: "2026년 독점 VPN 할인 및 쿠폰. 프리미엄 VPN 서비스에서 최대 87% 절약. 환불 보장이 있는 기간 한정 혜택.",
    th: "ดีล VPN และคูปองพิเศษสำหรับปี 2026 ประหยัดสูงสุด 87% สำหรับบริการ VPN พรีเมียม ข้อเสนอจำกัดเวลาพร้อมการรับประกันคืนเงิน",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: (titles[locale] || titles.en).replace(" | ZeroToVPN", ""),
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
    },
    alternates: generateAlternates("/deals", locale),
  };
}

// Structured Data
function DealsSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "VPN Deals & Coupons 2026",
    description: "Exclusive VPN deals and coupons with savings up to 87%",
    numberOfItems: deals.length,
    itemListElement: deals.map((deal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: `${deal.name} VPN Deal`,
        price: deal.dealPrice,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: deal.name,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const deals = [
  {
    name: "Surfshark",
    badgeKey: "bestDeal" as const,
    badgeColor: "bg-green-500",
    originalPrice: 12.95,
    dealPrice: 1.99,
    discount: 87,
    months: 27,
    total: 53.73,
    features: ["Unlimited devices", "Ad blocker", "24/7 support"],
    coupon: "SHARKGIFT",
    affiliateUrl: "https://go.zerotovpn.com/surfshark",
    moneyBack: 30,
    rating: 9.2,
    devices: "Unlimited",
  },
  {
    name: "NordVPN",
    badgeKey: "mostPopular" as const,
    badgeColor: "bg-blue-500",
    originalPrice: 12.99,
    dealPrice: 2.99,
    discount: 74,
    months: 27,
    total: 80.73,
    features: ["10 devices", "Threat Protection", "Dark Web Monitor"],
    coupon: null,
    affiliateUrl: "https://go.zerotovpn.com/nordvpn",
    moneyBack: 30,
    rating: 9.7,
    devices: "10",
  },
  {
    name: "ExpressVPN",
    badgeKey: "premiumChoice" as const,
    badgeColor: "bg-purple-500",
    originalPrice: 12.95,
    dealPrice: 2.44,
    discount: 77,
    months: 28,
    total: 88,
    features: ["12 devices", "Password manager", "Router app"],
    coupon: null,
    affiliateUrl: "https://go.zerotovpn.com/expressvpn",
    moneyBack: 30,
    rating: 9.5,
    devices: "12",
  },
  {
    name: "CyberGhost",
    badgeKey: "bestValue" as const,
    badgeColor: "bg-orange-500",
    originalPrice: 12.99,
    dealPrice: 2.03,
    discount: 83,
    months: 28,
    total: 56.94,
    features: ["7 devices", "Dedicated streaming servers", "45-day guarantee"],
    coupon: null,
    affiliateUrl: "https://go.zerotovpn.com/cyberghost",
    moneyBack: 45,
    rating: 9.0,
    devices: "7",
  },
  {
    name: "NordPass",
    badgeKey: "passwordManager" as const,
    badgeColor: "bg-emerald-500",
    originalPrice: 4.99,
    dealPrice: 1.49,
    discount: 70,
    months: 24,
    total: 35.76,
    features: [
      "Unlimited passwords",
      "Autofill",
      "Data breach scanner",
      "Cross-platform sync",
    ],
    coupon: null,
    affiliateUrl: "https://go.zerotovpn.com/nordpass",
    moneyBack: 30,
    rating: 8.8,
    devices: "Unlimited",
  },
];

// Only the VPN deals for the comparison table (exclude NordPass)
const vpnDeals = deals.filter((d) => d.badgeKey !== "passwordManager");

export default async function DealsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const shortMonthYear = getShortMonthYear();

  const content: Record<
    string,
    {
      hero: {
        title: string;
        subtitle: string;
        updated: string;
      };
      deals: {
        perMonth: string;
        wasPrice: string;
        totalCost: string;
        savePercent: string;
        extraMonths: string;
        months: string;
        getDeal: string;
        copyCoupon: string;
        copied: string;
      };
      badges: {
        bestDeal: string;
        mostPopular: string;
        premiumChoice: string;
        bestValue: string;
        passwordManager: string;
      };
      features: {
        title: string;
      };
      comparison: {
        title: string;
        vpn: string;
        price: string;
        savings: string;
        devices: string;
        moneyBack: string;
        rating: string;
        days: string;
      };
      tips: {
        title: string;
        items: Array<{ title: string; description: string }>;
      };
      guarantee: {
        title: string;
        description: string;
      };
      faq: {
        title: string;
        items: Array<{ question: string; answer: string }>;
      };
      bundle: {
        title: string;
        subtitle: string;
        vpnPlusPass: string;
        combinedPrice: string;
        getVpn: string;
        getPass: string;
        bestCombo: string;
      };
    }
  > = {
    en: {
      hero: {
        title: "Compare VPN Deals",
        subtitle:
          "Side-by-side comparison of verified VPN discounts. All prices checked and updated regularly.",
        updated: `Updated ${shortMonthYear}`,
      },
      deals: {
        perMonth: "/month",
        wasPrice: "Was",
        totalCost: "Total cost",
        savePercent: "SAVE",
        extraMonths: "months free",
        months: "months",
        getDeal: "Get This Deal",
        copyCoupon: "Coupon Code",
        copied: "Copied!",
      },
      badges: {
        bestDeal: "Best Deal",
        mostPopular: "Most Popular",
        premiumChoice: "Premium Choice",
        bestValue: "Best Value",
        passwordManager: "Password Manager",
      },
      features: {
        title: "Key Features",
      },
      comparison: {
        title: "Quick Comparison",
        vpn: "VPN",
        price: "Price",
        savings: "Savings",
        devices: "Devices",
        moneyBack: "Money-back",
        rating: "Rating",
        days: "days",
      },
      tips: {
        title: "Smart Deal Shopping Tips",
        items: [
          {
            title: "Check Renewal Prices",
            description:
              "Always check what you'll pay after the promotional period ends. Many VPNs increase prices significantly after year 1.",
          },
          {
            title: "Extra Months Trick",
            description:
              'The \'free months\' are already calculated into the monthly price. A 27-month deal is really just a 2-year subscription with better pricing.',
          },
          {
            title: "Money-Back Guarantee",
            description:
              "All deals include 30-45 day money-back guarantees. Test the service risk-free before committing long-term.",
          },
          {
            title: "Annual vs Multi-Year",
            description:
              "Multi-year plans offer the best per-month pricing, but only if you're certain you'll use the VPN for that duration.",
          },
        ],
      },
      guarantee: {
        title: "Risk-Free with Money-Back Guarantees",
        description:
          "Every deal on this page includes a money-back guarantee (30-45 days depending on the provider). Try the service risk-free and get a full refund if you're not satisfied.",
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "Do these deals expire?",
            answer:
              "Yes, VPN deals change frequently. We update this page regularly with the latest offers. The deals shown are current as of today.",
          },
          {
            question: "Are coupon codes required?",
            answer:
              "Most deals are automatically applied through our affiliate links. When a coupon code is required, we display it prominently on the deal card.",
          },
          {
            question: "What happens after the promotional period?",
            answer:
              "After your initial subscription period ends, you'll be charged the standard renewal price unless you cancel. Always check the renewal terms before purchasing.",
          },
          {
            question: "Can I get a refund if I don't like the VPN?",
            answer:
              "Yes! All VPNs listed here offer money-back guarantees ranging from 30-45 days. Contact their support to request a refund within the guarantee period.",
          },
        ],
      },
      bundle: {
        title: "Bundle Deals",
        subtitle:
          "Combine services and save even more on your online security",
        vpnPlusPass: "VPN + Password Manager",
        combinedPrice: "Combined from",
        getVpn: "Get NordVPN",
        getPass: "Get NordPass",
        bestCombo: "Best Security Combo",
      },
    },
    nl: {
      hero: {
        title: "Vergelijk VPN Deals",
        subtitle:
          "Zij-aan-zij vergelijking van geverifieerde VPN-kortingen. Alle prijzen regelmatig gecontroleerd en bijgewerkt.",
        updated: `Bijgewerkt ${shortMonthYear}`,
      },
      deals: {
        perMonth: "/maand",
        wasPrice: "Was",
        totalCost: "Totale kosten",
        savePercent: "BESPAAR",
        extraMonths: "maanden gratis",
        months: "maanden",
        getDeal: "Pak Deze Deal",
        copyCoupon: "Kortingscode",
        copied: "Gekopieerd!",
      },
      badges: {
        bestDeal: "Beste Deal",
        mostPopular: "Meest Populair",
        premiumChoice: "Premium Keuze",
        bestValue: "Beste Waarde",
        passwordManager: "Wachtwoordbeheerder",
      },
      features: {
        title: "Belangrijkste functies",
      },
      comparison: {
        title: "Snelle Vergelijking",
        vpn: "VPN",
        price: "Prijs",
        savings: "Besparing",
        devices: "Apparaten",
        moneyBack: "Geld-terug",
        rating: "Score",
        days: "dagen",
      },
      tips: {
        title: "Slimme Deal Shopping Tips",
        items: [
          {
            title: "Controleer Verlengingsprijzen",
            description:
              "Controleer altijd wat u betaalt nadat de promotieperiode afloopt. Veel VPN's verhogen de prijzen aanzienlijk na jaar 1.",
          },
          {
            title: "Extra Maanden Truc",
            description:
              "De 'gratis maanden' zijn al verwerkt in de maandprijs. Een 27-maanden deal is eigenlijk gewoon een 2-jarig abonnement met betere prijzen.",
          },
          {
            title: "Geld-Terug-Garantie",
            description:
              "Alle deals bevatten 30-45 dagen geld-terug-garantie. Test de dienst risicovrij voordat u zich langdurig committeert.",
          },
          {
            title: "Jaarlijks vs Meerjarig",
            description:
              "Meerjarige plannen bieden de beste prijs per maand, maar alleen als u zeker weet dat u de VPN voor die duur zult gebruiken.",
          },
        ],
      },
      guarantee: {
        title: "Risicovrij met Geld-Terug-Garanties",
        description:
          "Elke deal op deze pagina bevat een geld-terug-garantie (30-45 dagen afhankelijk van de aanbieder). Probeer de dienst risicovrij en krijg een volledige terugbetaling als u niet tevreden bent.",
      },
      faq: {
        title: "Veelgestelde Vragen",
        items: [
          {
            question: "Verlopen deze deals?",
            answer:
              "Ja, VPN-deals veranderen regelmatig. We werken deze pagina regelmatig bij met de nieuwste aanbiedingen. De getoonde deals zijn actueel vanaf vandaag.",
          },
          {
            question: "Zijn kortingscodes vereist?",
            answer:
              "De meeste deals worden automatisch toegepast via onze affiliate links. Wanneer een kortingscode vereist is, tonen we deze prominent op de dealkaart.",
          },
          {
            question: "Wat gebeurt er na de promotieperiode?",
            answer:
              "Nadat uw initiële abonnementsperiode afloopt, wordt u de standaard verlengingsprijs in rekening gebracht tenzij u annuleert. Controleer altijd de verlengingsvoorwaarden voordat u koopt.",
          },
          {
            question:
              "Kan ik mijn geld terugkrijgen als ik de VPN niet leuk vind?",
            answer:
              "Ja! Alle VPN's die hier vermeld staan, bieden geld-terug-garanties van 30-45 dagen. Neem contact op met hun ondersteuning om een terugbetaling aan te vragen binnen de garantieperiode.",
          },
        ],
      },
      bundle: {
        title: "Bundel Aanbiedingen",
        subtitle:
          "Combineer diensten en bespaar nog meer op je online beveiliging",
        vpnPlusPass: "VPN + Wachtwoordbeheerder",
        combinedPrice: "Gecombineerd vanaf",
        getVpn: "NordVPN Pakken",
        getPass: "NordPass Pakken",
        bestCombo: "Beste Beveiligingscombo",
      },
    },
    de: {
      hero: {
        title: "VPN-Angebote Vergleichen",
        subtitle:
          "Gegenüberstellung verifizierter VPN-Rabatte. Alle Preise regelmäßig geprüft und aktualisiert.",
        updated: `Aktualisiert ${shortMonthYear}`,
      },
      deals: {
        perMonth: "/Monat",
        wasPrice: "War",
        totalCost: "Gesamtkosten",
        savePercent: "SPAREN",
        extraMonths: "Monate gratis",
        months: "Monate",
        getDeal: "Dieses Angebot holen",
        copyCoupon: "Gutscheincode",
        copied: "Kopiert!",
      },
      badges: {
        bestDeal: "Bestes Angebot",
        mostPopular: "Am Beliebtesten",
        premiumChoice: "Premium-Wahl",
        bestValue: "Bester Wert",
        passwordManager: "Passwort-Manager",
      },
      features: {
        title: "Hauptfunktionen",
      },
      comparison: {
        title: "Schnellvergleich",
        vpn: "VPN",
        price: "Preis",
        savings: "Ersparnis",
        devices: "Geräte",
        moneyBack: "Geld-zurück",
        rating: "Bewertung",
        days: "Tage",
      },
      tips: {
        title: "Intelligente Deal-Shopping-Tipps",
        items: [
          {
            title: "Verlängerungspreise prüfen",
            description:
              "Überprüfen Sie immer, was Sie nach Ablauf der Aktionsperiode zahlen. Viele VPNs erhöhen die Preise nach dem ersten Jahr erheblich.",
          },
          {
            title: "Extra-Monate-Trick",
            description:
              "Die 'kostenlosen Monate' sind bereits im Monatspreis eingerechnet. Ein 27-Monats-Deal ist eigentlich nur ein 2-Jahres-Abonnement mit besserer Preisgestaltung.",
          },
          {
            title: "Geld-zurück-Garantie",
            description:
              "Alle Angebote beinhalten 30-45 Tage Geld-zurück-Garantie. Testen Sie den Service risikofrei, bevor Sie sich langfristig verpflichten.",
          },
          {
            title: "Jährlich vs. Mehrjährig",
            description:
              "Mehrjährige Pläne bieten die besten monatlichen Preise, aber nur, wenn Sie sicher sind, dass Sie das VPN für diese Dauer nutzen werden.",
          },
        ],
      },
      guarantee: {
        title: "Risikofrei mit Geld-zurück-Garantien",
        description:
          "Jedes Angebot auf dieser Seite enthält eine Geld-zurück-Garantie (30-45 Tage je nach Anbieter). Testen Sie den Service risikofrei und erhalten Sie eine vollständige Rückerstattung, wenn Sie nicht zufrieden sind.",
      },
      faq: {
        title: "Häufig gestellte Fragen",
        items: [
          {
            question: "Laufen diese Angebote ab?",
            answer:
              "Ja, VPN-Angebote ändern sich häufig. Wir aktualisieren diese Seite regelmäßig mit den neuesten Angeboten. Die angezeigten Deals sind ab heute aktuell.",
          },
          {
            question: "Sind Gutscheincodes erforderlich?",
            answer:
              "Die meisten Angebote werden automatisch über unsere Affiliate-Links angewendet. Wenn ein Gutscheincode erforderlich ist, zeigen wir ihn prominent auf der Deal-Karte an.",
          },
          {
            question: "Was passiert nach der Aktionsperiode?",
            answer:
              "Nach Ablauf Ihrer anfänglichen Abonnementperiode wird Ihnen der Standardverlängerungspreis berechnet, es sei denn, Sie kündigen. Überprüfen Sie immer die Verlängerungsbedingungen vor dem Kauf.",
          },
          {
            question:
              "Kann ich eine Rückerstattung erhalten, wenn mir das VPN nicht gefällt?",
            answer:
              "Ja! Alle hier aufgeführten VPNs bieten Geld-zurück-Garantien von 30-45 Tagen. Kontaktieren Sie deren Support, um eine Rückerstattung innerhalb der Garantiezeit anzufordern.",
          },
        ],
      },
      bundle: {
        title: "Bundle-Angebote",
        subtitle:
          "Kombinieren Sie Dienste und sparen Sie noch mehr bei Ihrer Online-Sicherheit",
        vpnPlusPass: "VPN + Passwort-Manager",
        combinedPrice: "Kombiniert ab",
        getVpn: "NordVPN Holen",
        getPass: "NordPass Holen",
        bestCombo: "Beste Sicherheitskombi",
      },
    },
    es: {
      hero: {
        title: "Comparar Ofertas VPN",
        subtitle:
          "Comparación de descuentos VPN verificados. Todos los precios revisados y actualizados regularmente.",
        updated: `Actualizado ${shortMonthYear}`,
      },
      deals: {
        perMonth: "/mes",
        wasPrice: "Era",
        totalCost: "Costo total",
        savePercent: "AHORRA",
        extraMonths: "meses gratis",
        months: "meses",
        getDeal: "Obtener Esta Oferta",
        copyCoupon: "Código de Cupón",
        copied: "Copiado!",
      },
      badges: {
        bestDeal: "Mejor Oferta",
        mostPopular: "Más Popular",
        premiumChoice: "Elección Premium",
        bestValue: "Mejor Valor",
        passwordManager: "Gestor de Contraseñas",
      },
      features: {
        title: "Características clave",
      },
      comparison: {
        title: "Comparación Rápida",
        vpn: "VPN",
        price: "Precio",
        savings: "Ahorro",
        devices: "Dispositivos",
        moneyBack: "Devolución",
        rating: "Puntuación",
        days: "días",
      },
      tips: {
        title: "Consejos Inteligentes para Comprar Ofertas",
        items: [
          {
            title: "Verificar Precios de Renovación",
            description:
              "Siempre verifica lo que pagarás después de que termine el período promocional. Muchas VPN aumentan los precios significativamente después del año 1.",
          },
          {
            title: "Truco de Meses Extra",
            description:
              "Los 'meses gratis' ya están calculados en el precio mensual. Una oferta de 27 meses es realmente solo una suscripción de 2 años con mejor precio.",
          },
          {
            title: "Garantía de Devolución de Dinero",
            description:
              "Todas las ofertas incluyen garantías de devolución de dinero de 30-45 días. Prueba el servicio sin riesgo antes de comprometerte a largo plazo.",
          },
          {
            title: "Anual vs Multi-año",
            description:
              "Los planes multi-año ofrecen el mejor precio por mes, pero solo si estás seguro de que usarás la VPN durante ese tiempo.",
          },
        ],
      },
      guarantee: {
        title: "Sin Riesgo con Garantías de Devolución de Dinero",
        description:
          "Cada oferta en esta página incluye una garantía de devolución de dinero (30-45 días según el proveedor). Prueba el servicio sin riesgo y obtén un reembolso completo si no estás satisfecho.",
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          {
            question: "¿Estas ofertas expiran?",
            answer:
              "Sí, las ofertas de VPN cambian con frecuencia. Actualizamos esta página regularmente con las últimas ofertas. Las ofertas mostradas son actuales a partir de hoy.",
          },
          {
            question: "¿Se requieren códigos de cupón?",
            answer:
              "La mayoría de las ofertas se aplican automáticamente a través de nuestros enlaces de afiliados. Cuando se requiere un código de cupón, lo mostramos de manera prominente en la tarjeta de la oferta.",
          },
          {
            question: "¿Qué sucede después del período promocional?",
            answer:
              "Después de que termine tu período de suscripción inicial, se te cobrará el precio de renovación estándar a menos que canceles. Siempre verifica los términos de renovación antes de comprar.",
          },
          {
            question: "¿Puedo obtener un reembolso si no me gusta la VPN?",
            answer:
              "¡Sí! Todas las VPN listadas aquí ofrecen garantías de devolución de dinero que van desde 30-45 días. Contacta a su soporte para solicitar un reembolso dentro del período de garantía.",
          },
        ],
      },
      bundle: {
        title: "Ofertas de Paquete",
        subtitle:
          "Combina servicios y ahorra aún más en tu seguridad en línea",
        vpnPlusPass: "VPN + Gestor de Contraseñas",
        combinedPrice: "Combinado desde",
        getVpn: "Obtener NordVPN",
        getPass: "Obtener NordPass",
        bestCombo: "Mejor Combo de Seguridad",
      },
    },
    fr: {
      hero: {
        title: "Comparer les Offres VPN",
        subtitle:
          "Comparaison de remises VPN vérifiées. Tous les prix vérifiés et mis à jour régulièrement.",
        updated: `Mis à jour ${shortMonthYear}`,
      },
      deals: {
        perMonth: "/mois",
        wasPrice: "Était",
        totalCost: "Coût total",
        savePercent: "ÉCONOMISEZ",
        extraMonths: "mois gratuits",
        months: "mois",
        getDeal: "Obtenir Cette Offre",
        copyCoupon: "Code Promo",
        copied: "Copié!",
      },
      badges: {
        bestDeal: "Meilleure Offre",
        mostPopular: "Plus Populaire",
        premiumChoice: "Choix Premium",
        bestValue: "Meilleur Rapport",
        passwordManager: "Gestionnaire de Mots de Passe",
      },
      features: {
        title: "Fonctionnalités clés",
      },
      comparison: {
        title: "Comparaison Rapide",
        vpn: "VPN",
        price: "Prix",
        savings: "Économie",
        devices: "Appareils",
        moneyBack: "Remboursement",
        rating: "Note",
        days: "jours",
      },
      tips: {
        title: "Conseils d'Achat Intelligents",
        items: [
          {
            title: "Vérifier les Prix de Renouvellement",
            description:
              "Vérifiez toujours ce que vous paierez après la fin de la période promotionnelle. De nombreux VPN augmentent considérablement les prix après la 1ère année.",
          },
          {
            title: "Astuce des Mois Supplémentaires",
            description:
              "Les 'mois gratuits' sont déjà calculés dans le prix mensuel. Une offre de 27 mois est en réalité juste un abonnement de 2 ans avec un meilleur prix.",
          },
          {
            title: "Garantie Satisfait ou Remboursé",
            description:
              "Toutes les offres incluent des garanties satisfait ou remboursé de 30-45 jours. Testez le service sans risque avant de vous engager à long terme.",
          },
          {
            title: "Annuel vs Multi-années",
            description:
              "Les plans multi-années offrent le meilleur prix mensuel, mais seulement si vous êtes certain d'utiliser le VPN pendant cette durée.",
          },
        ],
      },
      guarantee: {
        title: "Sans Risque avec Garanties Satisfait ou Remboursé",
        description:
          "Chaque offre sur cette page inclut une garantie satisfait ou remboursé (30-45 jours selon le fournisseur). Essayez le service sans risque et obtenez un remboursement complet si vous n'êtes pas satisfait.",
      },
      faq: {
        title: "Questions Fréquemment Posées",
        items: [
          {
            question: "Ces offres expirent-elles?",
            answer:
              "Oui, les offres VPN changent fréquemment. Nous mettons à jour cette page régulièrement avec les dernières offres. Les offres affichées sont actuelles à partir d'aujourd'hui.",
          },
          {
            question: "Les codes promo sont-ils obligatoires?",
            answer:
              "La plupart des offres sont automatiquement appliquées via nos liens d'affiliation. Lorsqu'un code promo est requis, nous l'affichons de manière bien visible sur la carte de l'offre.",
          },
          {
            question:
              "Que se passe-t-il après la période promotionnelle?",
            answer:
              "Après la fin de votre période d'abonnement initiale, vous serez facturé au prix de renouvellement standard sauf si vous annulez. Vérifiez toujours les conditions de renouvellement avant d'acheter.",
          },
          {
            question:
              "Puis-je obtenir un remboursement si je n'aime pas le VPN?",
            answer:
              "Oui! Tous les VPN listés ici offrent des garanties satisfait ou remboursé allant de 30 à 45 jours. Contactez leur support pour demander un remboursement pendant la période de garantie.",
          },
        ],
      },
      bundle: {
        title: "Offres Groupées",
        subtitle:
          "Combinez les services et économisez encore plus sur votre sécurité en ligne",
        vpnPlusPass: "VPN + Gestionnaire de Mots de Passe",
        combinedPrice: "Combiné à partir de",
        getVpn: "Obtenir NordVPN",
        getPass: "Obtenir NordPass",
        bestCombo: "Meilleur Combo Sécurité",
      },
    },
    zh: {
      hero: {
        title: "比较VPN优惠",
        subtitle:
          "经过验证的VPN折扣并排比较。所有价格定期检查和更新。",
        updated: `更新于 ${shortMonthYear}`,
      },
      deals: {
        perMonth: "/月",
        wasPrice: "原价",
        totalCost: "总费用",
        savePercent: "节省",
        extraMonths: "个月免费",
        months: "个月",
        getDeal: "获取此优惠",
        copyCoupon: "优惠码",
        copied: "已复制！",
      },
      badges: {
        bestDeal: "最佳优惠",
        mostPopular: "最受欢迎",
        premiumChoice: "高级选择",
        bestValue: "最佳价值",
        passwordManager: "密码管理器",
      },
      features: {
        title: "主要功能",
      },
      comparison: {
        title: "快速比较",
        vpn: "VPN",
        price: "价格",
        savings: "节省",
        devices: "设备",
        moneyBack: "退款",
        rating: "评分",
        days: "天",
      },
      tips: {
        title: "智能购物技巧",
        items: [
          {
            title: "检查续订价格",
            description:
              "始终检查促销期结束后您将支付的价格。许多VPN在第一年后会大幅提高价格。",
          },
          {
            title: "额外月份技巧",
            description:
              "免费月份已经计算在月价格中。27个月的优惠实际上只是一个价格更优惠的2年订阅。",
          },
          {
            title: "退款保证",
            description:
              "所有优惠都包含30-45天退款保证。在长期承诺之前无风险测试服务。",
          },
          {
            title: "年度vs多年",
            description:
              "多年计划提供最佳的月度价格，但前提是您确定在该期间内会使用VPN。",
          },
        ],
      },
      guarantee: {
        title: "退款保证无风险",
        description:
          "此页面上的每笔交易都包含退款保证（根据提供商30-45天）。无风险试用服务，如果您不满意可获得全额退款。",
      },
      faq: {
        title: "常见问题",
        items: [
          {
            question: "这些优惠会过期吗？",
            answer:
              "是的，VPN优惠经常变化。我们定期更新此页面以提供最新优惠。所示优惠截至今天是最新的。",
          },
          {
            question: "需要优惠码吗？",
            answer:
              "大多数优惠通过我们的附属链接自动应用。当需要优惠码时，我们会在优惠卡上显著显示它。",
          },
          {
            question: "促销期结束后会怎样？",
            answer:
              "初始订阅期结束后，除非您取消，否则将按标准续订价格收费。购买前始终检查续订条款。",
          },
          {
            question: "如果我不喜欢VPN可以退款吗？",
            answer:
              "可以！此处列出的所有VPN都提供30-45天的退款保证。在保证期内联系他们的支持请求退款。",
          },
        ],
      },
      bundle: {
        title: "捆绑优惠",
        subtitle: "组合服务，在线安全更省钱",
        vpnPlusPass: "VPN + 密码管理器",
        combinedPrice: "组合价格低至",
        getVpn: "获取NordVPN",
        getPass: "获取NordPass",
        bestCombo: "最佳安全组合",
      },
    },
    ja: {
      hero: {
        title: "VPNセールを比較",
        subtitle:
          "検証済みVPN割引の並列比較。すべての価格を定期的にチェック・更新しています。",
        updated: `更新日 ${shortMonthYear}`,
      },
      deals: {
        perMonth: "/月",
        wasPrice: "通常価格",
        totalCost: "総費用",
        savePercent: "割引",
        extraMonths: "ヶ月無料",
        months: "ヶ月",
        getDeal: "このセールを入手",
        copyCoupon: "クーポンコード",
        copied: "コピーしました！",
      },
      badges: {
        bestDeal: "ベストディール",
        mostPopular: "最も人気",
        premiumChoice: "プレミアム選択",
        bestValue: "最高の価値",
        passwordManager: "パスワードマネージャー",
      },
      features: {
        title: "主な機能",
      },
      comparison: {
        title: "クイック比較",
        vpn: "VPN",
        price: "価格",
        savings: "節約",
        devices: "デバイス",
        moneyBack: "返金保証",
        rating: "評価",
        days: "日間",
      },
      tips: {
        title: "スマートなお買い物のヒント",
        items: [
          {
            title: "更新価格を確認",
            description:
              "プロモーション期間終了後に支払う金額を必ず確認してください。多くのVPNは1年目以降に価格を大幅に引き上げます。",
          },
          {
            title: "追加月のトリック",
            description:
              "「無料月」は月額料金にすでに計算されています。27ヶ月のディールは、実際にはより良い価格設定の2年間サブスクリプションです。",
          },
          {
            title: "返金保証",
            description:
              "すべてのディールには30-45日間の返金保証が含まれています。長期的にコミットする前にサービスをリスクなしでテストしてください。",
          },
          {
            title: "年間vs複数年",
            description:
              "複数年プランは月額料金が最もお得ですが、その期間VPNを使用することが確実な場合のみです。",
          },
        ],
      },
      guarantee: {
        title: "返金保証でリスクフリー",
        description:
          "このページのすべてのディールには返金保証（プロバイダーによって30-45日）が含まれています。サービスをリスクなく試して、満足できない場合は全額返金を受けることができます。",
      },
      faq: {
        title: "よくある質問",
        items: [
          {
            question: "これらのディールは期限切れになりますか？",
            answer:
              "はい、VPNディールは頻繁に変わります。このページを定期的に最新のオファーで更新しています。表示されているディールは本日現在のものです。",
          },
          {
            question: "クーポンコードは必要ですか？",
            answer:
              "ほとんどのディールはアフィリエイトリンクを通じて自動的に適用されます。クーポンコードが必要な場合は、ディールカードに目立つように表示されます。",
          },
          {
            question: "プロモーション期間後はどうなりますか？",
            answer:
              "初回購読期間が終了すると、キャンセルしない限り標準更新価格が請求されます。購入前に必ず更新条件を確認してください。",
          },
          {
            question:
              "VPNが気に入らない場合、返金を受けられますか？",
            answer:
              "はい！ここにリストされているすべてのVPNは30-45日間の返金保証を提供しています。保証期間内にサポートに連絡して返金をリクエストしてください。",
          },
        ],
      },
      bundle: {
        title: "バンドルセール",
        subtitle:
          "サービスを組み合わせてオンラインセキュリティをさらにお得に",
        vpnPlusPass: "VPN + パスワードマネージャー",
        combinedPrice: "セット価格",
        getVpn: "NordVPNを入手",
        getPass: "NordPassを入手",
        bestCombo: "最高のセキュリティコンボ",
      },
    },
    ko: {
      hero: {
        title: "VPN 할인 비교",
        subtitle:
          "검증된 VPN 할인의 나란히 비교. 모든 가격은 정기적으로 확인 및 업데이트됩니다.",
        updated: `업데이트됨 ${shortMonthYear}`,
      },
      deals: {
        perMonth: "/월",
        wasPrice: "정상가",
        totalCost: "총 비용",
        savePercent: "절약",
        extraMonths: "개월 무료",
        months: "개월",
        getDeal: "이 할인 받기",
        copyCoupon: "쿠폰 코드",
        copied: "복사됨!",
      },
      badges: {
        bestDeal: "최고 할인",
        mostPopular: "가장 인기",
        premiumChoice: "프리미엄 선택",
        bestValue: "최고 가치",
        passwordManager: "비밀번호 관리자",
      },
      features: {
        title: "주요 기능",
      },
      comparison: {
        title: "빠른 비교",
        vpn: "VPN",
        price: "가격",
        savings: "절약",
        devices: "기기",
        moneyBack: "환불 보장",
        rating: "평점",
        days: "일",
      },
      tips: {
        title: "스마트 쇼핑 팁",
        items: [
          {
            title: "갱신 가격 확인",
            description:
              "프로모션 기간 종료 후 지불할 금액을 항상 확인하세요. 많은 VPN이 1년 후 가격을 크게 인상합니다.",
          },
          {
            title: "추가 개월 트릭",
            description:
              "'무료 개월'은 이미 월 가격에 계산되어 있습니다. 27개월 할인은 실제로 더 나은 가격의 2년 구독일 뿐입니다.",
          },
          {
            title: "환불 보장",
            description:
              "모든 할인에는 30-45일 환불 보장이 포함됩니다. 장기 약정 전에 서비스를 위험 없이 테스트하세요.",
          },
          {
            title: "연간 vs 다년",
            description:
              "다년 플랜은 월별 가격이 가장 좋지만 해당 기간 동안 VPN을 사용할 것이 확실한 경우에만 해당됩니다.",
          },
        ],
      },
      guarantee: {
        title: "환불 보장으로 위험 없음",
        description:
          "이 페이지의 모든 거래에는 환불 보장(공급자에 따라 30-45일)이 포함됩니다. 서비스를 위험 없이 시도하고 만족하지 않으면 전액 환불받으세요.",
      },
      faq: {
        title: "자주 묻는 질문",
        items: [
          {
            question: "이 할인들은 만료되나요?",
            answer:
              "예, VPN 할인은 자주 변경됩니다. 최신 혜택으로 이 페이지를 정기적으로 업데이트합니다. 표시된 할인은 오늘 기준으로 최신입니다.",
          },
          {
            question: "쿠폰 코드가 필요한가요?",
            answer:
              "대부분의 할인은 제휴 링크를 통해 자동으로 적용됩니다. 쿠폰 코드가 필요한 경우 할인 카드에 눈에 띄게 표시됩니다.",
          },
          {
            question: "프로모션 기간 후에는 어떻게 되나요?",
            answer:
              "초기 구독 기간이 종료되면 취소하지 않는 한 표준 갱신 가격이 청구됩니다. 구매 전에 항상 갱신 조건을 확인하세요.",
          },
          {
            question: "VPN이 마음에 들지 않으면 환불받을 수 있나요?",
            answer:
              "예! 여기에 나열된 모든 VPN은 30-45일의 환불 보장을 제공합니다. 보장 기간 내에 지원팀에 연락하여 환불을 요청하세요.",
          },
        ],
      },
      bundle: {
        title: "번들 할인",
        subtitle:
          "서비스를 결합하여 온라인 보안에서 더 많이 절약하세요",
        vpnPlusPass: "VPN + 비밀번호 관리자",
        combinedPrice: "결합 가격",
        getVpn: "NordVPN 받기",
        getPass: "NordPass 받기",
        bestCombo: "최고의 보안 조합",
      },
    },
    th: {
      hero: {
        title: "เปรียบเทียบดีล VPN",
        subtitle:
          "เปรียบเทียบส่วนลด VPN ที่ตรวจสอบแล้ว ราคาทั้งหมดตรวจสอบและอัปเดตเป็นประจำ",
        updated: `อัปเดต ${shortMonthYear}`,
      },
      deals: {
        perMonth: "/เดือน",
        wasPrice: "ราคาเดิม",
        totalCost: "ค่าใช้จ่ายทั้งหมด",
        savePercent: "ประหยัด",
        extraMonths: "เดือนฟรี",
        months: "เดือน",
        getDeal: "รับดีลนี้",
        copyCoupon: "รหัสคูปอง",
        copied: "คัดลอกแล้ว!",
      },
      badges: {
        bestDeal: "ดีลที่ดีที่สุด",
        mostPopular: "ยอดนิยมสูงสุด",
        premiumChoice: "ตัวเลือกพรีเมียม",
        bestValue: "คุ้มค่าที่สุด",
        passwordManager: "ตัวจัดการรหัสผ่าน",
      },
      features: {
        title: "ฟีเจอร์หลัก",
      },
      comparison: {
        title: "เปรียบเทียบด่วน",
        vpn: "VPN",
        price: "ราคา",
        savings: "ประหยัด",
        devices: "อุปกรณ์",
        moneyBack: "คืนเงิน",
        rating: "คะแนน",
        days: "วัน",
      },
      tips: {
        title: "เคล็ดลับการช็อปปิ้งอย่างชาญฉลาด",
        items: [
          {
            title: "ตรวจสอบราคาต่ออายุ",
            description:
              "ตรวจสอบเสมอว่าคุณจะจ่ายเท่าไหร่หลังจากช่วงโปรโมชั่นสิ้นสุด VPN หลายรายเพิ่มราคาอย่างมากหลังจากปีแรก",
          },
          {
            title: "เคล็ดลับเดือนเพิ่มเติม",
            description:
              "'เดือนฟรี' ถูกคำนวณไว้ในราคารายเดือนแล้ว ดีล 27 เดือนจริงๆ แล้วเป็นเพียงการสมัครสมาชิก 2 ปีที่มีราคาดีกว่า",
          },
          {
            title: "การรับประกันคืนเงิน",
            description:
              "ทุกดีลมีการรับประกันคืนเงิน 30-45 วัน ทดลองใช้บริการโดยไม่มีความเสี่ยงก่อนที่จะผูกพันระยะยาว",
          },
          {
            title: "รายปี vs หลายปี",
            description:
              "แผนหลายปีให้ราคารายเดือนที่ดีที่สุด แต่ต้องแน่ใจว่าคุณจะใช้ VPN ตลอดระยะเวลานั้น",
          },
        ],
      },
      guarantee: {
        title: "ไร้ความเสี่ยงด้วยการรับประกันคืนเงิน",
        description:
          "ทุกดีลในหน้านี้มีการรับประกันคืนเงิน (30-45 วันขึ้นอยู่กับผู้ให้บริการ) ลองใช้บริการโดยไม่มีความเสี่ยงและรับเงินคืนเต็มจำนวนหากคุณไม่พอใจ",
      },
      faq: {
        title: "คำถามที่พบบ่อย",
        items: [
          {
            question: "ดีลเหล่านี้หมดอายุหรือไม่?",
            answer:
              "ใช่ ดีล VPN เปลี่ยนแปลงบ่อย เราอัปเดตหน้านี้เป็นประจำด้วยข้อเสนอล่าสุด ดีลที่แสดงเป็นข้อมูลล่าสุดณวันนี้",
          },
          {
            question: "ต้องใช้รหัสคูปองหรือไม่?",
            answer:
              "ดีลส่วนใหญ่จะถูกนำไปใช้โดยอัตโนมัติผ่านลิงก์พันธมิตรของเรา เมื่อต้องใช้รหัสคูปอง เราจะแสดงอย่างเด่นชัดบนการ์ดดีล",
          },
          {
            question: "จะเกิดอะไรขึ้นหลังจากช่วงโปรโมชั่น?",
            answer:
              "หลังจากช่วงสมัครสมาชิกเริ่มต้นสิ้นสุด คุณจะถูกเรียกเก็บเงินตามราคาต่ออายุมาตรฐานเว้นแต่คุณจะยกเลิก ตรวจสอบข้อกำหนดการต่ออายุก่อนซื้อเสมอ",
          },
          {
            question:
              "ฉันสามารถขอคืนเงินได้หากไม่ชอบ VPN หรือไม่?",
            answer:
              "ได้! VPN ทั้งหมดที่ระบุไว้ที่นี่มีการรับประกันคืนเงิน 30-45 วัน ติดต่อฝ่ายสนับสนุนเพื่อขอคืนเงินภายในช่วงระยะเวลารับประกัน",
          },
        ],
      },
      bundle: {
        title: "ดีลชุดรวม",
        subtitle:
          "รวมบริการและประหยัดมากขึ้นสำหรับความปลอดภัยออนไลน์ของคุณ",
        vpnPlusPass: "VPN + ตัวจัดการรหัสผ่าน",
        combinedPrice: "ราคารวมเริ่มต้น",
        getVpn: "รับ NordVPN",
        getPass: "รับ NordPass",
        bestCombo: "คอมโบความปลอดภัยที่ดีที่สุด",
      },
    },
  };

  const t = content[locale] || content.en;

  return (
    <main className="min-h-screen">
      <DealsSchema />

      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema items={[{ name: "Deals", href: "/deals" }]} />
      </div>

      {/* Hero Section — clean, no countdown */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Tag className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t.hero.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
              <CalendarCheck className="h-4 w-4" />
              {t.hero.updated}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">{t.comparison.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      {t.comparison.vpn}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      {t.comparison.price}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      {t.comparison.savings}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      {t.comparison.devices}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      {t.comparison.moneyBack}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      {t.comparison.rating}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vpnDeals.map((deal, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{deal.name}</span>
                          <Badge
                            className={`${deal.badgeColor} text-white border-0 text-xs`}
                          >
                            {t.badges[deal.badgeKey]}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-primary">
                          ${deal.dealPrice}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {t.deals.perMonth}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="destructive" className="font-semibold">
                          {deal.discount}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{deal.devices}</td>
                      <td className="py-3 px-4 text-sm">
                        {deal.moneyBack} {t.comparison.days}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">
                            {deal.rating}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Cards — 2-column grid */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {deals.map((deal, index) => (
              <DealCard key={index} deal={deal} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Section — simplified */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="bg-emerald-500 text-white border-0 mb-3 text-sm px-3 py-1">
                {t.bundle.bestCombo}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {t.bundle.title}
              </h2>
              <p className="text-muted-foreground">{t.bundle.subtitle}</p>
            </div>

            <Card className="border border-emerald-500/30">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  {/* NordVPN Side */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">NordVPN</h3>
                        <p className="text-xs text-muted-foreground">VPN</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary">
                        $2.99
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t.deals.perMonth}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mb-5">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span>10 devices</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span>Threat Protection</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span>Dark Web Monitor</span>
                      </li>
                    </ul>
                    <AffiliateButton
                      vpnId="nordvpn"
                      vpnName="NordVPN"
                      affiliateUrl="https://go.zerotovpn.com/nordvpn"
                      className="w-full"
                      size="lg"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {t.bundle.getVpn}
                    </AffiliateButton>
                  </div>

                  {/* NordPass Side */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <KeyRound className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">NordPass</h3>
                        <p className="text-xs text-muted-foreground">
                          {t.badges.passwordManager}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary">
                        $1.49
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t.deals.perMonth}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mb-5">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span>Unlimited passwords</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span>Autofill</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span>Data breach scanner</span>
                      </li>
                    </ul>
                    <AffiliateButton
                      vpnId="nordpass"
                      vpnName="NordPass"
                      affiliateUrl="https://go.zerotovpn.com/nordpass"
                      className="w-full"
                      variant="outline"
                      size="lg"
                    >
                      <KeyRound className="h-4 w-4 mr-2" />
                      {t.bundle.getPass}
                    </AffiliateButton>
                  </div>
                </div>

                {/* Combined Price Footer */}
                <div className="border-t bg-muted/50 p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.bundle.vpnPlusPass}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {t.bundle.combinedPrice}
                    </span>
                    <span className="text-xl font-bold text-primary">
                      $4.48
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t.deals.perMonth}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Info className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{t.tips.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {t.tips.items.map((tip, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-start gap-2 text-base">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{tip.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-green-500/20 bg-green-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Shield className="h-6 w-6 text-green-500" />
                  {t.guarantee.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.guarantee.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t.faq.title}
            </h2>
            <div className="space-y-4">
              {t.faq.items.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Deal Card Component
type DealCardTranslations = {
  deals: {
    perMonth: string;
    wasPrice: string;
    totalCost: string;
    savePercent: string;
    extraMonths: string;
    months: string;
    getDeal: string;
    copyCoupon: string;
    copied: string;
  };
  badges: {
    bestDeal: string;
    mostPopular: string;
    premiumChoice: string;
    bestValue: string;
    passwordManager: string;
  };
  features: {
    title: string;
  };
};

function DealCard({
  deal,
  t,
}: {
  deal: (typeof deals)[0];
  t: DealCardTranslations;
}) {
  return (
    <Card className="relative overflow-hidden hover:border-primary/40 transition-colors">
      {/* Badge */}
      <div className="absolute top-4 right-4">
        <Badge className={`${deal.badgeColor} text-white border-0 text-xs`}>
          {t.badges[deal.badgeKey]}
        </Badge>
      </div>

      <CardContent className="pt-6">
        {/* VPN Name & Price */}
        <h3 className="text-xl font-bold mb-4">{deal.name}</h3>

        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-primary">
              ${deal.dealPrice}
            </span>
            <span className="text-muted-foreground">{t.deals.perMonth}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="line-through">
              {t.deals.wasPrice} ${deal.originalPrice}
            </span>
            <Badge variant="destructive" className="text-xs">
              {t.deals.savePercent} {deal.discount}%
            </Badge>
          </div>
        </div>

        {/* Total cost line */}
        <p className="text-sm text-muted-foreground mb-4">
          {t.deals.totalCost}: ${deal.total} / {deal.months} {t.deals.months}
        </p>

        {/* Features — 3 bullets */}
        <ul className="space-y-1.5 mb-5">
          {deal.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Coupon Code */}
        {deal.coupon && (
          <div className="mb-4 border rounded-md p-3 text-center bg-muted/50">
            <p className="text-xs text-muted-foreground mb-0.5">
              {t.deals.copyCoupon}
            </p>
            <p className="font-bold font-mono text-sm">{deal.coupon}</p>
          </div>
        )}

        {/* CTA Button */}
        <AffiliateButton
          vpnId={deal.name.toLowerCase().replace(/\s+/g, "-")}
          vpnName={deal.name}
          affiliateUrl={deal.affiliateUrl}
          className="w-full"
          size="lg"
        >
          {t.deals.getDeal}
        </AffiliateButton>
      </CardContent>
    </Card>
  );
}
