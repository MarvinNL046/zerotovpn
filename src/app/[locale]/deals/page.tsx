import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import {
  Tag,
  TrendingDown,
  Clock,
  CheckCircle,
  Gift,
  Sparkles,
  Shield,
  AlertCircle,
  Copy,
  Check,
  Zap,
  DollarSign,
  Calendar,
  Award,
  Info,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "VPN Deals & Coupons 2025: Save Up to 87% | ZeroToVPN",
    nl: "VPN Deals & Kortingscodes 2025: Bespaar tot 87% | ZeroToVPN",
    de: "VPN-Angebote & Gutscheine 2025: Sparen Sie bis zu 87% | ZeroToVPN",
    es: "Ofertas y Cupones VPN 2025: Ahorra hasta 87% | ZeroToVPN",
    fr: "Offres VPN & Coupons 2025: Économisez jusqu'à 87% | ZeroToVPN",
    zh: "VPN优惠与折扣码2025：节省高达87% | ZeroToVPN",
    ja: "VPNセール＆クーポン2025：最大87％オフ | ZeroToVPN",
    ko: "VPN 할인 및 쿠폰 2025: 최대 87% 절약 | ZeroToVPN",
    th: "ดีล VPN และคูปอง 2025: ประหยัดสูงสุด 87% | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Exclusive VPN deals and coupons for 2025. Save up to 87% on premium VPN services. Limited-time offers with money-back guarantees.",
    nl: "Exclusieve VPN-deals en kortingscodes voor 2025. Bespaar tot 87% op premium VPN-diensten. Tijdelijke aanbiedingen met geld-terug-garantie.",
    de: "Exklusive VPN-Angebote und Gutscheine für 2025. Sparen Sie bis zu 87% bei Premium-VPN-Diensten. Zeitlich begrenzte Angebote mit Geld-zurück-Garantie.",
    es: "Ofertas y cupones VPN exclusivos para 2025. Ahorra hasta 87% en servicios VPN premium. Ofertas limitadas con garantía de devolución.",
    fr: "Offres VPN exclusives et coupons pour 2025. Économisez jusqu'à 87% sur les services VPN premium. Offres limitées avec garantie satisfait ou remboursé.",
    zh: "2025年独家VPN优惠和折扣码。高级VPN服务节省高达87%。限时优惠，支持退款保证。",
    ja: "2025年限定VPNセールとクーポン。プレミアムVPNサービスが最大87％オフ。返金保証付きの期間限定オファー。",
    ko: "2025년 독점 VPN 할인 및 쿠폰. 프리미엄 VPN 서비스에서 최대 87% 절약. 환불 보장이 있는 기간 한정 혜택.",
    th: "ดีล VPN และคูปองพิเศษสำหรับปี 2025 ประหยัดสูงสุด 87% สำหรับบริการ VPN พรีเมียม ข้อเสนอจำกัดเวลาพร้อมการรับประกันคืนเงิน",
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
    },
  };
}

// Structured Data
function DealsSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SpecialAnnouncement",
    name: "VPN Deals & Coupons 2025",
    description: "Exclusive VPN deals and coupons with savings up to 87%",
    datePosted: "2025-11-29",
    expires: "2025-12-31",
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
    badge: "Best Deal",
    badgeColor: "bg-green-500",
    originalPrice: 12.95,
    dealPrice: 1.99,
    discount: 87,
    months: 27, // 2 years + 3 months
    total: 53.73,
    features: ["Unlimited devices", "Ad blocker", "24/7 support"],
    coupon: "SHARKGIFT",
    affiliateUrl: "https://go.zerotovpn.com/surfshark",
  },
  {
    name: "NordVPN",
    badge: "Most Popular",
    badgeColor: "bg-blue-500",
    originalPrice: 12.99,
    dealPrice: 2.99,
    discount: 74,
    months: 27,
    total: 80.73,
    features: ["10 devices", "Threat Protection", "Dark Web Monitor"],
    coupon: null,
    affiliateUrl: "https://go.zerotovpn.com/nordvpn",
  },
  {
    name: "ExpressVPN",
    badge: "Premium Choice",
    badgeColor: "bg-purple-500",
    originalPrice: 12.95,
    dealPrice: 2.44,
    discount: 77,
    months: 28, // 2 years + 4 months
    total: 88,
    features: ["12 devices", "Password manager", "Router app"],
    coupon: null,
    affiliateUrl: "https://go.zerotovpn.com/expressvpn",
  },
  {
    name: "CyberGhost",
    badge: "Best Value",
    badgeColor: "bg-orange-500",
    originalPrice: 12.99,
    dealPrice: 2.03,
    discount: 83,
    months: 28,
    total: 56.94,
    features: ["7 devices", "Dedicated streaming servers", "45-day guarantee"],
    coupon: null,
    affiliateUrl: "https://go.zerotovpn.com/cyberghost",
  },
];

export default async function DealsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content: Record<
    string,
    {
      hero: {
        title: string;
        subtitle: string;
        urgency: string;
      };
      deals: {
        perMonth: string;
        wasPrice: string;
        totalCost: string;
        savePercent: string;
        extraMonths: string;
        getDeal: string;
        copyCoupon: string;
        copied: string;
        expiresLabel: string;
        expiresSoon: string;
      };
      features: {
        title: string;
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
    }
  > = {
    en: {
      hero: {
        title: "VPN Deals & Coupons 2025",
        subtitle:
          "Exclusive discounts on premium VPN services. Save up to 87% with our verified deals and coupon codes.",
        urgency: "Limited-time offers - Don't miss out!",
      },
      deals: {
        perMonth: "/month",
        wasPrice: "Was",
        totalCost: "Total cost",
        savePercent: "SAVE",
        extraMonths: "months free",
        getDeal: "Get This Deal",
        copyCoupon: "Copy Coupon Code",
        copied: "Copied!",
        expiresLabel: "Deal expires",
        expiresSoon: "Soon",
      },
      features: {
        title: "Included Features",
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
              "The 'free months' are already calculated into the monthly price. A 27-month deal is really just a 2-year subscription with better pricing.",
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
    },
    nl: {
      hero: {
        title: "VPN Deals & Kortingscodes 2025",
        subtitle:
          "Exclusieve kortingen op premium VPN-diensten. Bespaar tot 87% met onze geverifieerde deals en kortingscodes.",
        urgency: "Tijdelijke aanbiedingen - Mis het niet!",
      },
      deals: {
        perMonth: "/maand",
        wasPrice: "Was",
        totalCost: "Totale kosten",
        savePercent: "BESPAAR",
        extraMonths: "maanden gratis",
        getDeal: "Pak Deze Deal",
        copyCoupon: "Kopieer Kortingscode",
        copied: "Gekopieerd!",
        expiresLabel: "Deal verloopt",
        expiresSoon: "Binnenkort",
      },
      features: {
        title: "Inbegrepen Functies",
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
            question: "Kan ik mijn geld terugkrijgen als ik de VPN niet leuk vind?",
            answer:
              "Ja! Alle VPN's die hier vermeld staan, bieden geld-terug-garanties van 30-45 dagen. Neem contact op met hun ondersteuning om een terugbetaling aan te vragen binnen de garantieperiode.",
          },
        ],
      },
    },
    de: {
      hero: {
        title: "VPN-Angebote & Gutscheine 2025",
        subtitle:
          "Exklusive Rabatte auf Premium-VPN-Dienste. Sparen Sie bis zu 87% mit unseren verifizierten Angeboten und Gutscheincodes.",
        urgency: "Zeitlich begrenzte Angebote - Verpassen Sie es nicht!",
      },
      deals: {
        perMonth: "/Monat",
        wasPrice: "War",
        totalCost: "Gesamtkosten",
        savePercent: "SPAREN",
        extraMonths: "Monate gratis",
        getDeal: "Dieses Angebot holen",
        copyCoupon: "Gutscheincode kopieren",
        copied: "Kopiert!",
        expiresLabel: "Angebot läuft ab",
        expiresSoon: "Bald",
      },
      features: {
        title: "Enthaltene Funktionen",
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
            question: "Kann ich eine Rückerstattung erhalten, wenn mir das VPN nicht gefällt?",
            answer:
              "Ja! Alle hier aufgeführten VPNs bieten Geld-zurück-Garantien von 30-45 Tagen. Kontaktieren Sie deren Support, um eine Rückerstattung innerhalb der Garantiezeit anzufordern.",
          },
        ],
      },
    },
    es: {
      hero: {
        title: "Ofertas y Cupones VPN 2025",
        subtitle:
          "Descuentos exclusivos en servicios VPN premium. Ahorra hasta 87% con nuestras ofertas verificadas y códigos de cupón.",
        urgency: "¡Ofertas por tiempo limitado - No te lo pierdas!",
      },
      deals: {
        perMonth: "/mes",
        wasPrice: "Era",
        totalCost: "Costo total",
        savePercent: "AHORRA",
        extraMonths: "meses gratis",
        getDeal: "Obtener Esta Oferta",
        copyCoupon: "Copiar Código de Cupón",
        copied: "¡Copiado!",
        expiresLabel: "La oferta expira",
        expiresSoon: "Pronto",
      },
      features: {
        title: "Características Incluidas",
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
    },
    fr: {
      hero: {
        title: "Offres VPN & Coupons 2025",
        subtitle:
          "Remises exclusives sur les services VPN premium. Économisez jusqu'à 87% avec nos offres vérifiées et codes promo.",
        urgency: "Offres à durée limitée - Ne manquez pas ça!",
      },
      deals: {
        perMonth: "/mois",
        wasPrice: "Était",
        totalCost: "Coût total",
        savePercent: "ÉCONOMISEZ",
        extraMonths: "mois gratuits",
        getDeal: "Obtenir Cette Offre",
        copyCoupon: "Copier le Code Promo",
        copied: "Copié!",
        expiresLabel: "L'offre expire",
        expiresSoon: "Bientôt",
      },
      features: {
        title: "Fonctionnalités Incluses",
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
            question: "Que se passe-t-il après la période promotionnelle?",
            answer:
              "Après la fin de votre période d'abonnement initiale, vous serez facturé au prix de renouvellement standard sauf si vous annulez. Vérifiez toujours les conditions de renouvellement avant d'acheter.",
          },
          {
            question: "Puis-je obtenir un remboursement si je n'aime pas le VPN?",
            answer:
              "Oui! Tous les VPN listés ici offrent des garanties satisfait ou remboursé allant de 30 à 45 jours. Contactez leur support pour demander un remboursement pendant la période de garantie.",
          },
        ],
      },
    },
    zh: {
      hero: {
        title: "VPN优惠与折扣码2025",
        subtitle: "高级VPN服务独家折扣。使用我们验证过的优惠和折扣码节省高达87%。",
        urgency: "限时优惠 - 不要错过！",
      },
      deals: {
        perMonth: "/月",
        wasPrice: "原价",
        totalCost: "总费用",
        savePercent: "节省",
        extraMonths: "个月免费",
        getDeal: "获取此优惠",
        copyCoupon: "复制优惠码",
        copied: "已复制！",
        expiresLabel: "优惠到期",
        expiresSoon: "即将到期",
      },
      features: {
        title: "包含功能",
      },
      tips: {
        title: "智能购物技巧",
        items: [
          {
            title: "检查续订价格",
            description: "始终检查促销期结束后您将支付的价格。许多VPN在第一年后会大幅提高价格。",
          },
          {
            title: "额外月份技巧",
            description: "免费月份已经计算在月价格中。27个月的优惠实际上只是一个价格更优惠的2年订阅。",
          },
          {
            title: "退款保证",
            description: "所有优惠都包含30-45天退款保证。在长期承诺之前无风险测试服务。",
          },
          {
            title: "年度vs多年",
            description: "多年计划提供最佳的月度价格，但前提是您确定在该期间内会使用VPN。",
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
            answer: "是的，VPN优惠经常变化。我们定期更新此页面以提供最新优惠。所示优惠截至今天是最新的。",
          },
          {
            question: "需要优惠码吗？",
            answer: "大多数优惠通过我们的附属链接自动应用。当需要优惠码时，我们会在优惠卡上显著显示它。",
          },
          {
            question: "促销期结束后会怎样？",
            answer: "初始订阅期结束后，除非您取消，否则将按标准续订价格收费。购买前始终检查续订条款。",
          },
          {
            question: "如果我不喜欢VPN可以退款吗？",
            answer: "可以！此处列出的所有VPN都提供30-45天的退款保证。在保证期内联系他们的支持请求退款。",
          },
        ],
      },
    },
    ja: {
      hero: {
        title: "VPNセール＆クーポン2025",
        subtitle: "プレミアムVPNサービスの独占割引。検証済みのセールとクーポンコードで最大87％節約。",
        urgency: "期間限定オファー - お見逃しなく！",
      },
      deals: {
        perMonth: "/月",
        wasPrice: "通常価格",
        totalCost: "総費用",
        savePercent: "割引",
        extraMonths: "ヶ月無料",
        getDeal: "このセールを入手",
        copyCoupon: "クーポンコードをコピー",
        copied: "コピーしました！",
        expiresLabel: "セール終了",
        expiresSoon: "まもなく",
      },
      features: {
        title: "含まれる機能",
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
            question: "VPNが気に入らない場合、返金を受けられますか？",
            answer:
              "はい！ここにリストされているすべてのVPNは30-45日間の返金保証を提供しています。保証期間内にサポートに連絡して返金をリクエストしてください。",
          },
        ],
      },
    },
    ko: {
      hero: {
        title: "VPN 할인 및 쿠폰 2025",
        subtitle: "프리미엄 VPN 서비스 독점 할인. 검증된 할인 및 쿠폰 코드로 최대 87% 절약하세요.",
        urgency: "기간 한정 혜택 - 놓치지 마세요!",
      },
      deals: {
        perMonth: "/월",
        wasPrice: "정상가",
        totalCost: "총 비용",
        savePercent: "절약",
        extraMonths: "개월 무료",
        getDeal: "이 할인 받기",
        copyCoupon: "쿠폰 코드 복사",
        copied: "복사됨!",
        expiresLabel: "할인 종료",
        expiresSoon: "곧",
      },
      features: {
        title: "포함된 기능",
      },
      tips: {
        title: "스마트 쇼핑 팁",
        items: [
          {
            title: "갱신 가격 확인",
            description: "프로모션 기간 종료 후 지불할 금액을 항상 확인하세요. 많은 VPN이 1년 후 가격을 크게 인상합니다.",
          },
          {
            title: "추가 개월 트릭",
            description: "'무료 개월'은 이미 월 가격에 계산되어 있습니다. 27개월 할인은 실제로 더 나은 가격의 2년 구독일 뿐입니다.",
          },
          {
            title: "환불 보장",
            description: "모든 할인에는 30-45일 환불 보장이 포함됩니다. 장기 약정 전에 서비스를 위험 없이 테스트하세요.",
          },
          {
            title: "연간 vs 다년",
            description: "다년 플랜은 월별 가격이 가장 좋지만 해당 기간 동안 VPN을 사용할 것이 확실한 경우에만 해당됩니다.",
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
            answer: "예, VPN 할인은 자주 변경됩니다. 최신 혜택으로 이 페이지를 정기적으로 업데이트합니다. 표시된 할인은 오늘 기준으로 최신입니다.",
          },
          {
            question: "쿠폰 코드가 필요한가요?",
            answer: "대부분의 할인은 제휴 링크를 통해 자동으로 적용됩니다. 쿠폰 코드가 필요한 경우 할인 카드에 눈에 띄게 표시됩니다.",
          },
          {
            question: "프로모션 기간 후에는 어떻게 되나요?",
            answer: "초기 구독 기간이 종료되면 취소하지 않는 한 표준 갱신 가격이 청구됩니다. 구매 전에 항상 갱신 조건을 확인하세요.",
          },
          {
            question: "VPN이 마음에 들지 않으면 환불받을 수 있나요?",
            answer: "예! 여기에 나열된 모든 VPN은 30-45일의 환불 보장을 제공합니다. 보장 기간 내에 지원팀에 연락하여 환불을 요청하세요.",
          },
        ],
      },
    },
    th: {
      hero: {
        title: "ดีล VPN และคูปอง 2025",
        subtitle: "ส่วนลดพิเศษสำหรับบริการ VPN พรีเมียม ประหยัดสูงสุด 87% ด้วยดีลและรหัสคูปองที่ตรวจสอบแล้วของเรา",
        urgency: "ข้อเสนอจำกัดเวลา - อย่าพลาด!",
      },
      deals: {
        perMonth: "/เดือน",
        wasPrice: "ราคาเดิม",
        totalCost: "ค่าใช้จ่ายทั้งหมด",
        savePercent: "ประหยัด",
        extraMonths: "เดือนฟรี",
        getDeal: "รับดีลนี้",
        copyCoupon: "คัดลอกรหัสคูปอง",
        copied: "คัดลอกแล้ว!",
        expiresLabel: "ดีลหมดอายุ",
        expiresSoon: "เร็วๆ นี้",
      },
      features: {
        title: "ฟีเจอร์ที่รวมอยู่",
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
            answer: "ใช่ ดีล VPN เปลี่ยนแปลงบ่อย เราอัปเดตหน้านี้เป็นประจำด้วยข้อเสนอล่าสุด ดีลที่แสดงเป็นข้อมูลล่าสุดณวันนี้",
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
            question: "ฉันสามารถขอคืนเงินได้หากไม่ชอบ VPN หรือไม่?",
            answer:
              "ได้! VPN ทั้งหมดที่ระบุไว้ที่นี่มีการรับประกันคืนเงิน 30-45 วัน ติดต่อฝ่ายสนับสนุนเพื่อขอคืนเงินภายในช่วงระยะเวลารับประกัน",
          },
        ],
      },
    },
  };

  const t = content[locale] || content.en;

  return (
    <main className="min-h-screen">
      <DealsSchema />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Tag className="h-8 w-8 text-primary" />
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {t.hero.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-6 py-3 rounded-full font-semibold">
              <Clock className="h-5 w-5" />
              {t.hero.urgency}
            </div>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {deals.map((deal, index) => (
              <DealCard key={index} deal={deal} locale={locale} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Info className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">{t.tips.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {t.tips.items.map((tip, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span>{tip.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="h-8 w-8 text-green-500" />
                  {t.guarantee.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  {t.guarantee.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t.faq.title}
            </h2>
            <div className="space-y-6">
              {t.faq.items.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{item.question}</CardTitle>
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
function DealCard({
  deal,
  locale,
  t,
}: {
  deal: (typeof deals)[0];
  locale: string;
  t: any;
}) {
  // Note: Coupon copy functionality would require client component
  // For now, coupon is displayed but not interactive

  return (
    <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
      {/* Badge */}
      <div className="absolute top-4 right-4">
        <Badge className={`${deal.badgeColor} text-white border-0`}>
          {deal.badge}
        </Badge>
      </div>

      <CardContent className="pt-6">
        {/* VPN Name */}
        <h3 className="text-2xl font-bold mb-6">{deal.name}</h3>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-5xl font-bold text-primary">
              ${deal.dealPrice}
            </span>
            <span className="text-lg text-muted-foreground">
              {t.deals.perMonth}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="line-through">
              {t.deals.wasPrice} ${deal.originalPrice}
            </span>
            <Badge variant="destructive" className="font-semibold">
              {t.deals.savePercent} {deal.discount}%
            </Badge>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {t.deals.totalCost}
              </p>
              <p className="text-2xl font-bold">${deal.total}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">
                {deal.months} {locale === "en" ? "months" : "meses"}
              </p>
              <div className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                <Gift className="h-3 w-3" />
                {deal.months - 24} {t.deals.extraMonths}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <p className="font-semibold mb-3 text-sm">{t.features.title}</p>
          <ul className="space-y-2">
            {deal.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coupon Code */}
        {deal.coupon && (
          <div className="mb-6">
            <div className="border rounded-lg p-4 text-center bg-muted">
              <p className="text-sm text-muted-foreground mb-1">{t.deals.copyCoupon}</p>
              <p className="text-lg font-bold font-mono">{deal.coupon}</p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <AffiliateButton
          vpnId={deal.name.toLowerCase().replace(/\s+/g, '-')}
          vpnName={deal.name}
          affiliateUrl={deal.affiliateUrl}
          className="w-full text-lg py-6"
          size="lg"
        >
          <Zap className="h-5 w-5 mr-2" />
          {t.deals.getDeal}
        </AffiliateButton>

        {/* Expires Soon */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            {t.deals.expiresLabel}: {t.deals.expiresSoon}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
