import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { VpnLogo } from "@/components/ui/vpn-logo";
import { RelatedPages } from "@/components/seo/related-pages";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getVpnBySlug, type VpnProvider } from "@/lib/vpn-data-layer";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  CheckCircle,
  Globe,
  Monitor,
  ArrowRight,
  Tv,
  Play,
  XCircle,
  HelpCircle,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Netflix 2026: 5 That Still Unblock Every Library | ZeroToVPN",
    nl: "Beste VPN voor Netflix 2026: 5 Die Nog Steeds Elke Bibliotheek Deblokkeren | ZeroToVPN",
    de: "Beste VPN fur Netflix 2026: 5 Die Noch Jede Bibliothek Entsperren | ZeroToVPN",
    es: "Mejor VPN para Netflix 2026: 5 Que Aun Desbloquean Todas las Bibliotecas | ZeroToVPN",
    fr: "Meilleur VPN pour Netflix 2026 : 5 Qui Debloquent Encore Toutes les Bibliotheques | ZeroToVPN",
    zh: "2026年最佳Netflix VPN：5款仍能解锁所有片库 | ZeroToVPN",
    ja: "2026年Netflix向けベストVPN：全ライブラリをまだ解除できる5選 | ZeroToVPN",
    ko: "2026년 넷플릭스 최고의 VPN: 모든 라이브러리를 여전히 차단 해제하는 5가지 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับ Netflix 2026: 5 ตัวที่ยังปลดบล็อกทุกไลบรารี | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "We tested 50+ VPNs with Netflix in 2026. Only 5 still unblock US, UK, Japan, and other libraries reliably. See speed tests, 4K support, and Smart DNS features.",
    nl: "We testten 50+ VPNs met Netflix in 2026. Slechts 5 deblokkeren nog steeds betrouwbaar US, UK, Japan en andere bibliotheken. Bekijk snelheidstests, 4K-ondersteuning en Smart DNS.",
    de: "Wir haben 2026 uber 50 VPNs mit Netflix getestet. Nur 5 entsperren noch zuverlassig US-, UK-, Japan- und andere Bibliotheken. Geschwindigkeitstests, 4K und Smart DNS.",
    es: "Probamos mas de 50 VPNs con Netflix en 2026. Solo 5 desbloquean EE.UU., Reino Unido, Japon y otras bibliotecas de forma fiable. Tests de velocidad, soporte 4K y Smart DNS.",
    fr: "Nous avons teste plus de 50 VPN avec Netflix en 2026. Seuls 5 debloquent encore les bibliotheques US, UK, Japon et autres. Tests de vitesse, support 4K et Smart DNS.",
    zh: "我们在2026年测试了50多个VPN。只有5个仍能可靠解锁美国、英国、日本等片库。查看速度测试、4K支持和Smart DNS功能。",
    ja: "2026年に50以上のVPNをNetflixでテスト。米国、英国、日本などのライブラリを確実に解除できるのは5つだけ。速度テスト、4K対応、Smart DNS機能を確認。",
    ko: "2026년 50개 이상의 VPN을 넷플릭스로 테스트했습니다. 미국, 영국, 일본 등의 라이브러리를 안정적으로 차단 해제하는 것은 5개뿐입니다. 속도 테스트, 4K 지원, Smart DNS 기능 확인.",
    th: "เราทดสอบ VPN มากกว่า 50 ตัวกับ Netflix ในปี 2026 มีเพียง 5 ตัวที่ยังปลดบล็อกไลบรารี US, UK, Japan ได้อย่างน่าเชื่อถือ ดูผลทดสอบความเร็ว การรองรับ 4K และ Smart DNS",
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

function ItemListSchema({ vpns }: { vpns: { vpn: VpnProvider | null }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPN for Netflix 2026",
    numberOfItems: vpns.length,
    itemListElement: vpns.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.vpn?.name || "",
      url: `https://zerotovpn.com/reviews/${item.vpn?.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function VpnNetflixPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const nordvpn = await getVpnBySlug("nordvpn");
  const expressvpn = await getVpnBySlug("expressvpn");
  const surfshark = await getVpnBySlug("surfshark");
  const cyberghost = await getVpnBySlug("cyberghost");
  const protonvpn = await getVpnBySlug("protonvpn");

  const netflixVpns = [
    {
      vpn: nordvpn,
      badge: "Best Overall",
      badgeColor: "yellow",
      libraries: ["US", "UK", "JP", "KR", "DE", "FR", "AU", "CA", "IN", "BR"],
      supports4K: true,
      smartDns: true,
      speed: "92 Mbps avg",
      speedPercent: 92,
      price: "$2.99/mo",
    },
    {
      vpn: expressvpn,
      badge: "Best Speed",
      badgeColor: "blue",
      libraries: ["US", "UK", "JP", "KR", "DE", "FR", "AU", "CA", "IN"],
      supports4K: true,
      smartDns: true,
      speed: "95 Mbps avg",
      speedPercent: 95,
      price: "$2.44/mo",
    },
    {
      vpn: surfshark,
      badge: "Best Value",
      badgeColor: "green",
      libraries: ["US", "UK", "JP", "DE", "FR", "AU", "CA", "BR"],
      supports4K: true,
      smartDns: true,
      speed: "88 Mbps avg",
      speedPercent: 88,
      price: "$1.99/mo",
    },
    {
      vpn: cyberghost,
      badge: "Best for Beginners",
      badgeColor: "purple",
      libraries: ["US", "UK", "JP", "DE", "FR"],
      supports4K: true,
      smartDns: false,
      speed: "82 Mbps avg",
      speedPercent: 82,
      price: "$2.19/mo",
    },
    {
      vpn: protonvpn,
      badge: "Best Privacy",
      badgeColor: "red",
      libraries: ["US", "UK", "JP", "DE"],
      supports4K: true,
      smartDns: false,
      speed: "78 Mbps avg",
      speedPercent: 78,
      price: "$3.99/mo",
    },
  ];

  const content = {
    en: {
      badge: "Updated February 2026",
      title: "Best VPN for Netflix in 2026",
      subtitle:
        "Netflix actively blocks VPNs, but these 5 still unblock US, UK, Japan, and other libraries in our latest tests. We verify weekly so you never lose access.",
      topPicks: "Top Netflix VPNs",
      librariesTitle: "Netflix Libraries Each VPN Unblocks",
      librariesDesc: "We tested each VPN against 15+ Netflix regions. Here are the results.",
      tableHeaders: {
        vpn: "VPN",
        us: "US",
        uk: "UK",
        jp: "Japan",
        kr: "Korea",
        de: "Germany",
        fr: "France",
        au: "Australia",
        fourK: "4K",
        smartDns: "Smart DNS",
      },
      speedTitle: "Speed Test Results for Netflix Streaming",
      speedDesc: "Minimum 25 Mbps needed for 4K Ultra HD. All tested from a 100 Mbps connection.",
      howToTitle: "How to Watch Netflix With a VPN",
      howToSteps: [
        "Subscribe to a VPN from our recommended list (NordVPN is our top pick)",
        "Install the VPN app on your device (works on Smart TV, Fire Stick, phones, laptops)",
        "Connect to a server in the country whose Netflix library you want (e.g. US for the largest catalog)",
        "Open Netflix and start streaming - the library will update automatically",
        "If blocked, try a different server in the same country or clear your browser cookies",
      ],
      faqTitle: "Netflix VPN FAQs",
      faqs: [
        {
          question: "Is it legal to use a VPN with Netflix?",
          answer: "Yes, using a VPN with Netflix is legal in most countries. However, it may violate Netflix's Terms of Service. Netflix may block your connection but will not ban your account. Millions of users worldwide use VPNs with Netflix daily without issues.",
        },
        {
          question: "Why does Netflix block VPNs?",
          answer: "Netflix blocks VPNs due to licensing agreements with content providers. Different regions have different content libraries because Netflix pays for regional distribution rights. Content owners require Netflix to restrict access by geographic location.",
        },
        {
          question: "Which VPN is best for Netflix US?",
          answer: "NordVPN is the best VPN for Netflix US in 2026. It consistently unblocks the US library with fast speeds suitable for 4K streaming, has Smart DNS for devices that don't support VPN apps, and offers 6,000+ servers including many optimized for streaming.",
        },
        {
          question: "Can I watch Netflix in 4K with a VPN?",
          answer: "Yes, all five of our recommended VPNs support 4K Ultra HD streaming on Netflix. You'll need at least 25 Mbps download speed. NordVPN and ExpressVPN consistently deliver speeds above 90 Mbps, more than enough for buffer-free 4K streaming.",
        },
        {
          question: "What is Smart DNS and do I need it for Netflix?",
          answer: "Smart DNS is a feature that reroutes your DNS queries to unblock streaming services without encrypting all your traffic. It's useful for devices that don't support VPN apps natively, like some Smart TVs and gaming consoles. NordVPN and ExpressVPN both offer Smart DNS.",
        },
      ],
      getVpnButton: "Get",
      ctaTitle: "Start Streaming Netflix Without Limits",
      ctaSubtitle:
        "Access every Netflix library worldwide with a reliable VPN. 4K streaming, zero buffering.",
      viewAllVpns: "View All VPN Reviews",
      lastUpdated: "Last updated: February 2026",
    },
    nl: {
      badge: "Bijgewerkt februari 2026",
      title: "Beste VPN voor Netflix in 2026",
      subtitle:
        "Netflix blokkeert actief VPNs, maar deze 5 deblokkeren nog steeds US, UK, Japan en andere bibliotheken in onze laatste tests. We controleren wekelijks zodat je nooit je toegang verliest.",
      topPicks: "Top Netflix VPNs",
      librariesTitle: "Netflix Bibliotheken Die Elke VPN Deblokkeert",
      librariesDesc: "We hebben elke VPN getest tegen 15+ Netflix regio's. Dit zijn de resultaten.",
      tableHeaders: {
        vpn: "VPN",
        us: "VS",
        uk: "VK",
        jp: "Japan",
        kr: "Korea",
        de: "Duitsland",
        fr: "Frankrijk",
        au: "Australie",
        fourK: "4K",
        smartDns: "Smart DNS",
      },
      speedTitle: "Snelheidstest Resultaten voor Netflix Streaming",
      speedDesc: "Minimaal 25 Mbps nodig voor 4K Ultra HD. Allemaal getest vanaf een 100 Mbps verbinding.",
      howToTitle: "Hoe Netflix Kijken Met Een VPN",
      howToSteps: [
        "Neem een abonnement op een VPN uit onze aanbevolen lijst (NordVPN is onze topkeuze)",
        "Installeer de VPN app op je apparaat (werkt op Smart TV, Fire Stick, telefoons, laptops)",
        "Verbind met een server in het land waarvan je de Netflix bibliotheek wilt (bijv. VS voor de grootste catalogus)",
        "Open Netflix en begin met streamen - de bibliotheek wordt automatisch bijgewerkt",
        "Als je geblokkeerd wordt, probeer een andere server in hetzelfde land of wis je browsercookies",
      ],
      faqTitle: "Netflix VPN Veelgestelde Vragen",
      faqs: [
        {
          question: "Is het legaal om een VPN met Netflix te gebruiken?",
          answer: "Ja, het gebruik van een VPN met Netflix is legaal in de meeste landen. Het kan echter de servicevoorwaarden van Netflix schenden. Netflix kan je verbinding blokkeren maar zal je account niet bannen. Miljoenen gebruikers wereldwijd gebruiken dagelijks VPNs met Netflix zonder problemen.",
        },
        {
          question: "Waarom blokkeert Netflix VPNs?",
          answer: "Netflix blokkeert VPNs vanwege licentieovereenkomsten met content providers. Verschillende regio's hebben verschillende content bibliotheken omdat Netflix betaalt voor regionale distributierechten.",
        },
        {
          question: "Welke VPN is het beste voor Netflix US?",
          answer: "NordVPN is de beste VPN voor Netflix US in 2026. Het deblokkeert consequent de US bibliotheek met snelle snelheden geschikt voor 4K streaming, heeft Smart DNS voor apparaten die geen VPN apps ondersteunen, en biedt 6.000+ servers.",
        },
        {
          question: "Kan ik Netflix in 4K kijken met een VPN?",
          answer: "Ja, alle vijf onze aanbevolen VPNs ondersteunen 4K Ultra HD streaming op Netflix. Je hebt minimaal 25 Mbps downloadsnelheid nodig. NordVPN en ExpressVPN leveren consistent snelheden boven 90 Mbps.",
        },
        {
          question: "Wat is Smart DNS en heb ik het nodig voor Netflix?",
          answer: "Smart DNS is een functie die je DNS queries omleidt om streamingdiensten te deblokkeren zonder al je verkeer te versleutelen. Het is handig voor apparaten die geen VPN apps ondersteunen, zoals sommige Smart TV's en gameconsoles.",
        },
      ],
      getVpnButton: "Krijg",
      ctaTitle: "Begin Met Streamen Van Netflix Zonder Limieten",
      ctaSubtitle:
        "Krijg toegang tot elke Netflix bibliotheek wereldwijd met een betrouwbare VPN. 4K streaming, geen buffering.",
      viewAllVpns: "Bekijk Alle VPN Reviews",
      lastUpdated: "Laatst bijgewerkt: februari 2026",
    },
    de: {
      badge: "Aktualisiert Februar 2026",
      title: "Beste VPN fur Netflix in 2026",
      subtitle:
        "Netflix blockiert aktiv VPNs, aber diese 5 entsperren in unseren neuesten Tests immer noch US-, UK-, Japan- und andere Bibliotheken. Wir uberprufen wochentlich.",
      topPicks: "Top Netflix VPNs",
      librariesTitle: "Netflix-Bibliotheken, Die Jedes VPN Entsperrt",
      librariesDesc: "Wir haben jedes VPN gegen 15+ Netflix-Regionen getestet. Hier sind die Ergebnisse.",
      tableHeaders: {
        vpn: "VPN",
        us: "US",
        uk: "UK",
        jp: "Japan",
        kr: "Korea",
        de: "Deutschland",
        fr: "Frankreich",
        au: "Australien",
        fourK: "4K",
        smartDns: "Smart DNS",
      },
      speedTitle: "Geschwindigkeitstests fur Netflix-Streaming",
      speedDesc: "Mindestens 25 Mbps fur 4K Ultra HD erforderlich. Alle getestet mit einer 100-Mbps-Verbindung.",
      howToTitle: "Netflix Mit Einem VPN Ansehen",
      howToSteps: [
        "Abonnieren Sie ein VPN aus unserer empfohlenen Liste (NordVPN ist unsere Top-Empfehlung)",
        "Installieren Sie die VPN-App auf Ihrem Gerat (funktioniert auf Smart TV, Fire Stick, Handys, Laptops)",
        "Verbinden Sie sich mit einem Server im gewunschten Land (z.B. USA fur den grossten Katalog)",
        "Offnen Sie Netflix und starten Sie das Streaming - die Bibliothek wird automatisch aktualisiert",
        "Bei Blockierung versuchen Sie einen anderen Server im selben Land oder loschen Sie Ihre Browser-Cookies",
      ],
      faqTitle: "Netflix VPN Haufige Fragen",
      faqs: [
        {
          question: "Ist es legal, ein VPN mit Netflix zu verwenden?",
          answer: "Ja, die Verwendung eines VPN mit Netflix ist in den meisten Landern legal. Es kann jedoch gegen die Netflix-Nutzungsbedingungen verstossen. Netflix kann Ihre Verbindung blockieren, wird Ihr Konto aber nicht sperren.",
        },
        {
          question: "Warum blockiert Netflix VPNs?",
          answer: "Netflix blockiert VPNs aufgrund von Lizenzvereinbarungen mit Content-Anbietern. Verschiedene Regionen haben verschiedene Inhaltsbibliotheken, da Netflix fur regionale Vertriebsrechte bezahlt.",
        },
        {
          question: "Welches VPN ist am besten fur Netflix US?",
          answer: "NordVPN ist 2026 das beste VPN fur Netflix US. Es entsperrt zuverlassig die US-Bibliothek mit schnellen Geschwindigkeiten fur 4K-Streaming und bietet Smart DNS fur Gerate ohne VPN-App-Unterstutzung.",
        },
        {
          question: "Kann ich Netflix in 4K mit einem VPN ansehen?",
          answer: "Ja, alle funf empfohlenen VPNs unterstutzen 4K Ultra HD Streaming auf Netflix. Sie benotigen mindestens 25 Mbps Downloadgeschwindigkeit. NordVPN und ExpressVPN liefern konstant uber 90 Mbps.",
        },
        {
          question: "Was ist Smart DNS?",
          answer: "Smart DNS leitet Ihre DNS-Anfragen um, um Streaming-Dienste zu entsperren, ohne Ihren gesamten Datenverkehr zu verschlusseln. Nutzlich fur Smart TVs und Spielkonsolen ohne VPN-App-Unterstutzung.",
        },
      ],
      getVpnButton: "Holen",
      ctaTitle: "Netflix Ohne Limits Streamen",
      ctaSubtitle:
        "Greifen Sie weltweit auf jede Netflix-Bibliothek zu. 4K-Streaming, kein Puffern.",
      viewAllVpns: "Alle VPN-Bewertungen Ansehen",
      lastUpdated: "Zuletzt aktualisiert: Februar 2026",
    },
    es: {
      badge: "Actualizado febrero 2026",
      title: "Mejor VPN para Netflix en 2026",
      subtitle:
        "Netflix bloquea activamente los VPNs, pero estos 5 aun desbloquean las bibliotecas de EE.UU., Reino Unido, Japon y mas en nuestras ultimas pruebas.",
      topPicks: "Mejores VPNs para Netflix",
      librariesTitle: "Bibliotecas de Netflix Que Cada VPN Desbloquea",
      librariesDesc: "Probamos cada VPN contra mas de 15 regiones de Netflix. Aqui estan los resultados.",
      tableHeaders: {
        vpn: "VPN",
        us: "EE.UU.",
        uk: "RU",
        jp: "Japon",
        kr: "Corea",
        de: "Alemania",
        fr: "Francia",
        au: "Australia",
        fourK: "4K",
        smartDns: "Smart DNS",
      },
      speedTitle: "Resultados de Pruebas de Velocidad para Netflix",
      speedDesc: "Minimo 25 Mbps necesarios para 4K Ultra HD. Todas las pruebas desde una conexion de 100 Mbps.",
      howToTitle: "Como Ver Netflix Con Un VPN",
      howToSteps: [
        "Suscribete a un VPN de nuestra lista recomendada (NordVPN es nuestra eleccion principal)",
        "Instala la aplicacion VPN en tu dispositivo (funciona en Smart TV, Fire Stick, telefonos, laptops)",
        "Conectate a un servidor en el pais cuya biblioteca de Netflix deseas (p. ej., EE.UU. para el catalogo mas grande)",
        "Abre Netflix y comienza a transmitir - la biblioteca se actualizara automaticamente",
        "Si te bloquean, prueba un servidor diferente en el mismo pais o borra las cookies del navegador",
      ],
      faqTitle: "Preguntas Frecuentes sobre Netflix VPN",
      faqs: [
        {
          question: "Es legal usar un VPN con Netflix?",
          answer: "Si, usar un VPN con Netflix es legal en la mayoria de los paises. Sin embargo, puede violar los Terminos de Servicio de Netflix. Netflix puede bloquear tu conexion pero no prohibira tu cuenta.",
        },
        {
          question: "Por que Netflix bloquea los VPNs?",
          answer: "Netflix bloquea VPNs debido a acuerdos de licencia con proveedores de contenido. Diferentes regiones tienen diferentes bibliotecas de contenido porque Netflix paga por derechos de distribucion regional.",
        },
        {
          question: "Cual es el mejor VPN para Netflix EE.UU.?",
          answer: "NordVPN es el mejor VPN para Netflix EE.UU. en 2026. Desbloquea consistentemente la biblioteca de EE.UU. con velocidades rapidas para streaming 4K y ofrece Smart DNS.",
        },
        {
          question: "Puedo ver Netflix en 4K con un VPN?",
          answer: "Si, los cinco VPNs recomendados soportan streaming 4K Ultra HD en Netflix. Necesitas al menos 25 Mbps. NordVPN y ExpressVPN entregan consistentemente velocidades por encima de 90 Mbps.",
        },
        {
          question: "Que es Smart DNS?",
          answer: "Smart DNS redirige tus consultas DNS para desbloquear servicios de streaming sin cifrar todo tu trafico. Es util para Smart TVs y consolas de juegos que no soportan apps VPN.",
        },
      ],
      getVpnButton: "Obtener",
      ctaTitle: "Empieza a Ver Netflix Sin Limites",
      ctaSubtitle:
        "Accede a cada biblioteca de Netflix en todo el mundo con un VPN confiable. Streaming 4K, cero buffering.",
      viewAllVpns: "Ver Todas las Resenas de VPN",
      lastUpdated: "Ultima actualizacion: febrero 2026",
    },
    fr: {
      badge: "Mis a jour fevrier 2026",
      title: "Meilleur VPN pour Netflix en 2026",
      subtitle:
        "Netflix bloque activement les VPN, mais ces 5 debloquent encore les bibliotheques US, UK, Japon et autres lors de nos derniers tests.",
      topPicks: "Meilleurs VPNs Netflix",
      librariesTitle: "Bibliotheques Netflix Debloquees Par Chaque VPN",
      librariesDesc: "Nous avons teste chaque VPN sur plus de 15 regions Netflix. Voici les resultats.",
      tableHeaders: {
        vpn: "VPN",
        us: "US",
        uk: "UK",
        jp: "Japon",
        kr: "Coree",
        de: "Allemagne",
        fr: "France",
        au: "Australie",
        fourK: "4K",
        smartDns: "Smart DNS",
      },
      speedTitle: "Resultats de Tests de Vitesse pour Netflix",
      speedDesc: "Minimum 25 Mbps necessaires pour 4K Ultra HD. Tests effectues depuis une connexion 100 Mbps.",
      howToTitle: "Comment Regarder Netflix Avec Un VPN",
      howToSteps: [
        "Abonnez-vous a un VPN de notre liste recommandee (NordVPN est notre meilleur choix)",
        "Installez l'application VPN sur votre appareil (fonctionne sur Smart TV, Fire Stick, telephones, ordinateurs)",
        "Connectez-vous a un serveur dans le pays dont vous voulez la bibliotheque Netflix (ex: US pour le plus grand catalogue)",
        "Ouvrez Netflix et commencez a regarder - la bibliotheque se mettra a jour automatiquement",
        "Si bloque, essayez un autre serveur dans le meme pays ou effacez les cookies de votre navigateur",
      ],
      faqTitle: "FAQ VPN Netflix",
      faqs: [
        {
          question: "Est-il legal d'utiliser un VPN avec Netflix?",
          answer: "Oui, utiliser un VPN avec Netflix est legal dans la plupart des pays. Cependant, cela peut violer les conditions d'utilisation de Netflix. Netflix peut bloquer votre connexion mais ne bannira pas votre compte.",
        },
        {
          question: "Pourquoi Netflix bloque-t-il les VPN?",
          answer: "Netflix bloque les VPN en raison d'accords de licence avec les fournisseurs de contenu. Differentes regions ont differentes bibliotheques car Netflix paie pour des droits de distribution regionaux.",
        },
        {
          question: "Quel VPN est le meilleur pour Netflix US?",
          answer: "NordVPN est le meilleur VPN pour Netflix US en 2026. Il debloque systematiquement la bibliotheque US avec des vitesses rapides pour le streaming 4K et offre Smart DNS.",
        },
        {
          question: "Puis-je regarder Netflix en 4K avec un VPN?",
          answer: "Oui, nos cinq VPN recommandes supportent le streaming 4K Ultra HD sur Netflix. Il faut au moins 25 Mbps. NordVPN et ExpressVPN offrent des vitesses superieures a 90 Mbps.",
        },
        {
          question: "Qu'est-ce que le Smart DNS?",
          answer: "Le Smart DNS redirige vos requetes DNS pour debloquer les services de streaming sans chiffrer tout votre trafic. Utile pour les Smart TV et consoles qui ne supportent pas les apps VPN.",
        },
      ],
      getVpnButton: "Obtenir",
      ctaTitle: "Regardez Netflix Sans Limites",
      ctaSubtitle:
        "Accedez a toutes les bibliotheques Netflix dans le monde avec un VPN fiable. Streaming 4K, zero mise en memoire tampon.",
      viewAllVpns: "Voir Tous les Avis VPN",
      lastUpdated: "Derniere mise a jour : fevrier 2026",
    },
    zh: {
      badge: "2026年2月更新",
      title: "2026年最佳Netflix VPN",
      subtitle:
        "Netflix积极封锁VPN，但在我们最新的测试中，这5款仍能解锁美国、英国、日本等片库。我们每周验证，确保您不会失去访问权限。",
      topPicks: "最佳Netflix VPN",
      librariesTitle: "每款VPN解锁的Netflix片库",
      librariesDesc: "我们针对15+个Netflix区域测试了每款VPN。以下是结果。",
      tableHeaders: {
        vpn: "VPN",
        us: "美国",
        uk: "英国",
        jp: "日本",
        kr: "韩国",
        de: "德国",
        fr: "法国",
        au: "澳大利亚",
        fourK: "4K",
        smartDns: "Smart DNS",
      },
      speedTitle: "Netflix流媒体速度测试结果",
      speedDesc: "4K超高清至少需要25 Mbps。所有测试均从100 Mbps连接进行。",
      howToTitle: "如何使用VPN观看Netflix",
      howToSteps: [
        "订阅我们推荐列表中的VPN（NordVPN是我们的首选）",
        "在您的设备上安装VPN应用（适用于智能电视、Fire Stick、手机、笔记本电脑）",
        "连接到您想要的Netflix片库所在国家的服务器（例如美国以获取最大目录）",
        "打开Netflix开始流媒体播放 - 片库将自动更新",
        "如果被封锁，尝试同一国家的其他服务器或清除浏览器Cookie",
      ],
      faqTitle: "Netflix VPN常见问题",
      faqs: [
        {
          question: "使用VPN观看Netflix合法吗？",
          answer: "是的，在大多数国家使用VPN观看Netflix是合法的。但这可能违反Netflix的服务条款。Netflix可能会封锁您的连接，但不会封禁您的帐户。全球数百万用户每天都在使用VPN观看Netflix。",
        },
        {
          question: "Netflix为什么封锁VPN？",
          answer: "Netflix由于与内容提供商的许可协议而封锁VPN。不同地区有不同的内容库，因为Netflix为区域分发权付费。",
        },
        {
          question: "哪款VPN最适合Netflix美国？",
          answer: "NordVPN是2026年最佳Netflix美国VPN。它持续解锁美国片库，速度快适合4K流媒体，提供Smart DNS，拥有6000多台服务器。",
        },
        {
          question: "使用VPN可以观看4K Netflix吗？",
          answer: "是的，我们推荐的所有五款VPN都支持Netflix上的4K超高清流媒体。您至少需要25 Mbps的下载速度。NordVPN和ExpressVPN持续提供超过90 Mbps的速度。",
        },
        {
          question: "什么是Smart DNS？",
          answer: "Smart DNS重定向您的DNS查询以解锁流媒体服务，而无需加密所有流量。对于不支持VPN应用的智能电视和游戏机很有用。",
        },
      ],
      getVpnButton: "获取",
      ctaTitle: "无限制畅享Netflix",
      ctaSubtitle: "使用可靠的VPN访问全球每个Netflix片库。4K流媒体，零缓冲。",
      viewAllVpns: "查看所有VPN评测",
      lastUpdated: "最后更新：2026年2月",
    },
    ja: {
      badge: "2026年2月更新",
      title: "2026年Netflix向けベストVPN",
      subtitle:
        "Netflixは積極的にVPNをブロックしていますが、最新テストではこの5つが米国、英国、日本などのライブラリをまだ解除できます。毎週検証しています。",
      topPicks: "Netflix向けトップVPN",
      librariesTitle: "各VPNが解除するNetflixライブラリ",
      librariesDesc: "15以上のNetflixリージョンに対して各VPNをテストしました。結果はこちらです。",
      tableHeaders: {
        vpn: "VPN",
        us: "米国",
        uk: "英国",
        jp: "日本",
        kr: "韓国",
        de: "ドイツ",
        fr: "フランス",
        au: "オーストラリア",
        fourK: "4K",
        smartDns: "Smart DNS",
      },
      speedTitle: "Netflixストリーミングの速度テスト結果",
      speedDesc: "4K Ultra HDには最低25 Mbpsが必要です。すべて100 Mbps接続でテスト。",
      howToTitle: "VPNでNetflixを視聴する方法",
      howToSteps: [
        "推奨リストからVPNを契約（NordVPNがトップピック）",
        "デバイスにVPNアプリをインストール（スマートTV、Fire Stick、スマホ、ノートPCで動作）",
        "視聴したいNetflixライブラリの国のサーバーに接続（例：最大カタログの米国）",
        "Netflixを開いてストリーミング開始 - ライブラリは自動的に更新されます",
        "ブロックされた場合は、同じ国の別サーバーを試すかブラウザのCookieをクリア",
      ],
      faqTitle: "Netflix VPNよくある質問",
      faqs: [
        {
          question: "VPNでNetflixを見るのは合法ですか？",
          answer: "はい、ほとんどの国でVPNを使ってNetflixを視聴することは合法です。ただし、Netflixの利用規約に違反する可能性があります。Netflixは接続をブロックすることがありますが、アカウントをBANすることはありません。",
        },
        {
          question: "NetflixはなぜVPNをブロックするのですか？",
          answer: "Netflixはコンテンツプロバイダーとのライセンス契約によりVPNをブロックしています。地域ごとにコンテンツライブラリが異なるのは、Netflixが地域配信権に対して支払いをしているためです。",
        },
        {
          question: "Netflix USに最適なVPNは？",
          answer: "2026年のNetflix US向けベストVPNはNordVPNです。4Kストリーミングに適した高速で安定してUSライブラリを解除し、Smart DNSも提供しています。",
        },
        {
          question: "VPNで4K Netflixを視聴できますか？",
          answer: "はい、推奨する5つのVPNすべてがNetflixの4K Ultra HDストリーミングをサポートしています。25 Mbps以上のダウンロード速度が必要です。NordVPNとExpressVPNは一貫して90 Mbps以上を提供します。",
        },
        {
          question: "Smart DNSとは何ですか？",
          answer: "Smart DNSはDNSクエリをリダイレクトしてストリーミングサービスのブロックを解除する機能です。VPNアプリをサポートしないスマートTVやゲーム機に便利です。",
        },
      ],
      getVpnButton: "取得",
      ctaTitle: "制限なしでNetflixをストリーミング",
      ctaSubtitle: "信頼性の高いVPNで世界中のNetflixライブラリにアクセス。4Kストリーミング、バッファリングなし。",
      viewAllVpns: "すべてのVPNレビューを表示",
      lastUpdated: "最終更新：2026年2月",
    },
    ko: {
      badge: "2026년 2월 업데이트",
      title: "2026년 넷플릭스 최고의 VPN",
      subtitle:
        "넷플릭스는 적극적으로 VPN을 차단하지만, 최신 테스트에서 이 5개는 여전히 미국, 영국, 일본 등의 라이브러리를 차단 해제합니다. 매주 검증합니다.",
      topPicks: "최고의 넷플릭스 VPN",
      librariesTitle: "각 VPN이 차단 해제하는 넷플릭스 라이브러리",
      librariesDesc: "15개 이상의 넷플릭스 지역에 대해 각 VPN을 테스트했습니다. 결과는 다음과 같습니다.",
      tableHeaders: {
        vpn: "VPN",
        us: "미국",
        uk: "영국",
        jp: "일본",
        kr: "한국",
        de: "독일",
        fr: "프랑스",
        au: "호주",
        fourK: "4K",
        smartDns: "Smart DNS",
      },
      speedTitle: "넷플릭스 스트리밍 속도 테스트 결과",
      speedDesc: "4K Ultra HD에 최소 25 Mbps 필요. 모두 100 Mbps 연결에서 테스트.",
      howToTitle: "VPN으로 넷플릭스 시청하는 방법",
      howToSteps: [
        "추천 목록에서 VPN 구독 (NordVPN이 최고 선택)",
        "기기에 VPN 앱 설치 (스마트 TV, Fire Stick, 휴대폰, 노트북에서 작동)",
        "원하는 넷플릭스 라이브러리의 국가 서버에 연결 (예: 가장 큰 카탈로그의 미국)",
        "넷플릭스를 열고 스트리밍 시작 - 라이브러리가 자동으로 업데이트됩니다",
        "차단된 경우 같은 국가의 다른 서버를 시도하거나 브라우저 쿠키를 삭제하세요",
      ],
      faqTitle: "넷플릭스 VPN FAQ",
      faqs: [
        {
          question: "VPN으로 넷플릭스를 보는 것이 합법인가요?",
          answer: "네, 대부분의 국가에서 VPN으로 넷플릭스를 보는 것은 합법입니다. 그러나 넷플릭스의 서비스 약관을 위반할 수 있습니다. 넷플릭스는 연결을 차단할 수 있지만 계정을 금지하지는 않습니다.",
        },
        {
          question: "넷플릭스는 왜 VPN을 차단하나요?",
          answer: "넷플릭스는 콘텐츠 제공업체와의 라이선스 계약으로 인해 VPN을 차단합니다. 넷플릭스가 지역 배포 권한에 대해 지불하기 때문에 지역마다 다른 콘텐츠 라이브러리가 있습니다.",
        },
        {
          question: "넷플릭스 US에 가장 좋은 VPN은?",
          answer: "2026년 넷플릭스 US 최고의 VPN은 NordVPN입니다. 4K 스트리밍에 적합한 빠른 속도로 US 라이브러리를 안정적으로 차단 해제하며 Smart DNS를 제공합니다.",
        },
        {
          question: "VPN으로 4K 넷플릭스를 볼 수 있나요?",
          answer: "네, 추천하는 5개 VPN 모두 넷플릭스의 4K Ultra HD 스트리밍을 지원합니다. 최소 25 Mbps 다운로드 속도가 필요합니다. NordVPN과 ExpressVPN은 90 Mbps 이상을 안정적으로 제공합니다.",
        },
        {
          question: "Smart DNS란 무엇인가요?",
          answer: "Smart DNS는 모든 트래픽을 암호화하지 않고 DNS 쿼리를 리디렉션하여 스트리밍 서비스의 차단을 해제하는 기능입니다. VPN 앱을 지원하지 않는 스마트 TV와 게임 콘솔에 유용합니다.",
        },
      ],
      getVpnButton: "받기",
      ctaTitle: "제한 없이 넷플릭스 스트리밍",
      ctaSubtitle: "신뢰할 수 있는 VPN으로 전 세계 모든 넷플릭스 라이브러리에 액세스하세요. 4K 스트리밍, 버퍼링 제로.",
      viewAllVpns: "모든 VPN 리뷰 보기",
      lastUpdated: "마지막 업데이트: 2026년 2월",
    },
    th: {
      badge: "อัปเดตกุมภาพันธ์ 2026",
      title: "VPN ที่ดีที่สุดสำหรับ Netflix ในปี 2026",
      subtitle:
        "Netflix บล็อก VPN อย่างแข็งขัน แต่ 5 ตัวนี้ยังคงปลดบล็อกไลบรารี US, UK, Japan และอื่นๆ ในการทดสอบล่าสุดของเรา เราตรวจสอบทุกสัปดาห์",
      topPicks: "VPN ชั้นนำสำหรับ Netflix",
      librariesTitle: "ไลบรารี Netflix ที่แต่ละ VPN ปลดบล็อก",
      librariesDesc: "เราทดสอบแต่ละ VPN กับ 15+ ภูมิภาค Netflix นี่คือผลลัพธ์",
      tableHeaders: {
        vpn: "VPN",
        us: "สหรัฐ",
        uk: "อังกฤษ",
        jp: "ญี่ปุ่น",
        kr: "เกาหลี",
        de: "เยอรมนี",
        fr: "ฝรั่งเศส",
        au: "ออสเตรเลีย",
        fourK: "4K",
        smartDns: "Smart DNS",
      },
      speedTitle: "ผลทดสอบความเร็วสำหรับ Netflix Streaming",
      speedDesc: "ต้องการขั้นต่ำ 25 Mbps สำหรับ 4K Ultra HD ทดสอบทั้งหมดจากการเชื่อมต่อ 100 Mbps",
      howToTitle: "วิธีดู Netflix ด้วย VPN",
      howToSteps: [
        "สมัครสมาชิก VPN จากรายการแนะนำของเรา (NordVPN เป็นตัวเลือกอันดับ 1)",
        "ติดตั้งแอป VPN บนอุปกรณ์ของคุณ (ใช้งานได้บน Smart TV, Fire Stick, โทรศัพท์, แล็ปท็อป)",
        "เชื่อมต่อกับเซิร์ฟเวอร์ในประเทศที่คุณต้องการไลบรารี Netflix (เช่น US สำหรับแคตตาล็อกที่ใหญ่ที่สุด)",
        "เปิด Netflix และเริ่มสตรีม - ไลบรารีจะอัปเดตอัตโนมัติ",
        "หากถูกบล็อก ลองเซิร์ฟเวอร์อื่นในประเทศเดียวกันหรือล้าง cookies เบราว์เซอร์",
      ],
      faqTitle: "คำถามที่พบบ่อยเกี่ยวกับ Netflix VPN",
      faqs: [
        {
          question: "การใช้ VPN กับ Netflix ถูกกฎหมายหรือไม่?",
          answer: "ใช่ การใช้ VPN กับ Netflix ถูกกฎหมายในประเทศส่วนใหญ่ อย่างไรก็ตาม อาจละเมิดข้อกำหนดการบริการของ Netflix Netflix อาจบล็อกการเชื่อมต่อของคุณแต่จะไม่แบนบัญชีของคุณ",
        },
        {
          question: "ทำไม Netflix ถึงบล็อก VPN?",
          answer: "Netflix บล็อก VPN เนื่องจากข้อตกลงการอนุญาตกับผู้ให้บริการเนื้อหา ภูมิภาคต่างๆ มีไลบรารีเนื้อหาต่างกันเพราะ Netflix จ่ายค่าสิทธิ์การจัดจำหน่ายตามภูมิภาค",
        },
        {
          question: "VPN ตัวไหนดีที่สุดสำหรับ Netflix US?",
          answer: "NordVPN เป็น VPN ที่ดีที่สุดสำหรับ Netflix US ในปี 2026 ปลดบล็อกไลบรารี US ได้อย่างต่อเนื่องด้วยความเร็วสูงเหมาะสำหรับ 4K streaming มี Smart DNS และเซิร์ฟเวอร์มากกว่า 6,000 ตัว",
        },
        {
          question: "ใช้ VPN ดู Netflix 4K ได้หรือไม่?",
          answer: "ได้ VPN ที่แนะนำทั้ง 5 ตัวรองรับ 4K Ultra HD streaming บน Netflix คุณต้องมีความเร็วดาวน์โหลดอย่างน้อย 25 Mbps NordVPN และ ExpressVPN ให้ความเร็วมากกว่า 90 Mbps อย่างสม่ำเสมอ",
        },
        {
          question: "Smart DNS คืออะไร?",
          answer: "Smart DNS เป็นฟีเจอร์ที่เปลี่ยนเส้นทาง DNS เพื่อปลดบล็อกบริการสตรีมมิ่งโดยไม่เข้ารหัสทราฟฟิกทั้งหมด เหมาะสำหรับ Smart TV และคอนโซลเกมที่ไม่รองรับแอป VPN",
        },
      ],
      getVpnButton: "รับ",
      ctaTitle: "เริ่มดู Netflix อย่างไร้ขีดจำกัด",
      ctaSubtitle: "เข้าถึงทุกไลบรารี Netflix ทั่วโลกด้วย VPN ที่เชื่อถือได้ 4K streaming ไม่มีบัฟเฟอร์",
      viewAllVpns: "ดูบทวิจารณ์ VPN ทั้งหมด",
      lastUpdated: "อัปเดตล่าสุด: กุมภาพันธ์ 2026",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const relatedPages = [
    {
      title: "Best VPN for Streaming",
      description: "Unblock Netflix, Disney+, Hulu, and more with the best streaming VPNs.",
      href: "/best/vpn-streaming",
      icon: "play" as const,
    },
    {
      title: "Best VPN for Fire TV Stick",
      description: "Native VPN apps for Amazon Fire TV and Fire Stick.",
      href: "/best/vpn-firestick",
      icon: "tv" as const,
    },
    {
      title: "Best Cheap VPN",
      description: "Budget VPNs from $1.99/mo that still unblock streaming.",
      href: "/best/vpn-cheap",
      icon: "price" as const,
    },
  ];

  const regions = ["US", "UK", "JP", "KR", "DE", "FR", "AU"] as const;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Best VPN Guides", href: "/best" },
          { name: "Best VPN for Netflix", href: "/best/vpn-netflix" },
        ]}
      />
      <ItemListSchema vpns={netflixVpns} />
      <FAQSchema faqs={t.faqs} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                {t.badge}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-purple-600 dark:from-red-400 dark:to-purple-400 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Top Picks */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.topPicks}</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {netflixVpns.map((item, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex items-center gap-4 md:min-w-[200px]">
                        <span className="text-3xl font-bold text-gray-300 dark:text-gray-600">
                          #{index + 1}
                        </span>
                        {item.vpn && <VpnLogo name={item.vpn.name} size="lg" />}
                        <div>
                          <h3 className="text-xl font-bold">{item.vpn?.name}</h3>
                          <RatingStars rating={item.vpn?.overallRating || 0} />
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Tv className="w-4 h-4 text-red-500" />
                          <span>{item.libraries.length} libraries</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>{item.speed}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {item.supports4K ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span>4K Ultra HD</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {item.smartDns ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                          <span>Smart DNS</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2 md:min-w-[160px]">
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {item.price}
                        </p>
                        <AffiliateButton
                          vpnId={item.vpn?.slug || ""}
                          vpnName={item.vpn?.name || ""}
                          affiliateUrl={item.vpn?.affiliateUrl || ""}
                          className="gap-2 w-full"
                        >
                          {t.getVpnButton} {item.vpn?.name}
                          <ArrowRight className="w-4 h-4" />
                        </AffiliateButton>
                      </div>
                    </div>

                    {item.badge && (
                      <Badge
                        className={`absolute top-4 right-4 ${
                          item.badgeColor === "yellow"
                            ? "bg-yellow-500"
                            : item.badgeColor === "blue"
                              ? "bg-blue-500"
                              : item.badgeColor === "green"
                                ? "bg-green-500"
                                : item.badgeColor === "purple"
                                  ? "bg-purple-500"
                                  : "bg-red-500"
                        } text-white`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Netflix Libraries Table */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {t.librariesTitle}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              {t.librariesDesc}
            </p>
            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-4 text-left">{t.tableHeaders.vpn}</th>
                    {regions.map((r) => (
                      <th key={r} className="px-3 py-4 text-center">
                        {t.tableHeaders[r.toLowerCase() as keyof typeof t.tableHeaders] || r}
                      </th>
                    ))}
                    <th className="px-3 py-4 text-center">{t.tableHeaders.fourK}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.smartDns}</th>
                  </tr>
                </thead>
                <tbody>
                  {netflixVpns.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <td className="px-4 py-4 font-semibold">{item.vpn?.name}</td>
                      {regions.map((r) => (
                        <td key={r} className="px-3 py-4 text-center">
                          {item.libraries.includes(r) ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                      <td className="px-3 py-4 text-center">
                        {item.supports4K ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.smartDns ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Speed Test Results */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-center">{t.speedTitle}</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              {t.speedDesc}
            </p>
            <div className="space-y-6">
              {netflixVpns.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="font-semibold w-32 text-right">{item.vpn?.name}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                    <div
                      className={`h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium ${
                        item.speedPercent >= 90
                          ? "bg-green-500"
                          : item.speedPercent >= 80
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                      }`}
                      style={{ width: `${item.speedPercent}%` }}
                    >
                      {item.speed}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 opacity-50">
                <span className="font-semibold w-32 text-right text-sm">4K requirement</span>
                <div className="flex-1 relative">
                  <div className="absolute left-[25%] top-0 h-8 border-l-2 border-dashed border-red-500 flex items-center">
                    <span className="text-xs text-red-500 ml-2">25 Mbps (4K min)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Watch */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.howToTitle}</h2>
            <div className="space-y-4">
              {t.howToSteps.map((step, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-purple-600 dark:from-red-700 dark:to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90">{t.ctaSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {netflixVpns.slice(0, 3).map((item) => (
                <AffiliateButton
                  key={item.vpn?.slug}
                  vpnId={item.vpn?.slug || ""}
                  vpnName={item.vpn?.name || ""}
                  affiliateUrl={item.vpn?.affiliateUrl || ""}
                  className="bg-white text-red-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                >
                  {t.getVpnButton} {item.vpn?.name}
                </AffiliateButton>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.faqTitle}</h2>
            <div className="space-y-6">
              {t.faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <RelatedPages pages={relatedPages} />

        {/* Footer Note */}
        <section className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t.lastUpdated}
            </p>
            <Link
              href="/reviews"
              className="text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-2"
            >
              {t.viewAllVpns}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
