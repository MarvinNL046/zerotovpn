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
  Zap,
  CheckCircle,
  ArrowRight,
  Tv,
  XCircle,
  HelpCircle,
  Download,
  Play,
  Monitor,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Best VPN for Firestick 2026: 5 Native Apps Tested on Fire TV | ZeroToVPN",
    nl: "Beste VPN voor Firestick 2026: 5 Native Apps Getest op Fire TV | ZeroToVPN",
    de: "Beste VPN fur Firestick 2026: 5 Native Apps Getestet auf Fire TV | ZeroToVPN",
    es: "Mejor VPN para Firestick 2026: 5 Apps Nativas Probadas en Fire TV | ZeroToVPN",
    fr: "Meilleur VPN pour Firestick 2026 : 5 Apps Natives Testees sur Fire TV | ZeroToVPN",
    zh: "2026年最佳Firestick VPN：5款原生应用Fire TV实测 | ZeroToVPN",
    ja: "2026年Firestick向けベストVPN：Fire TVでテスト済みネイティブアプリ5選 | ZeroToVPN",
    ko: "2026년 Firestick 최고의 VPN: Fire TV에서 테스트한 5가지 네이티브 앱 | ZeroToVPN",
    th: "VPN ที่ดีที่สุดสำหรับ Firestick 2026: 5 แอปเนทีฟทดสอบบน Fire TV | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "We tested 30+ VPN apps directly on Amazon Fire TV Stick. These 5 have native apps with remote-friendly interfaces, fast streaming speeds, and reliable unblocking.",
    nl: "We testten 30+ VPN apps direct op Amazon Fire TV Stick. Deze 5 hebben native apps met afstandsbediening-vriendelijke interfaces en snelle streamingsnelheden.",
    de: "Wir haben uber 30 VPN-Apps direkt auf dem Amazon Fire TV Stick getestet. Diese 5 haben native Apps mit Fernbedienungs-freundlichen Oberflachen.",
    es: "Probamos mas de 30 apps VPN directamente en Amazon Fire TV Stick. Estos 5 tienen apps nativas con interfaces amigables para el control remoto.",
    fr: "Nous avons teste plus de 30 apps VPN directement sur l'Amazon Fire TV Stick. Ces 5 ont des apps natives avec des interfaces adaptees a la telecommande.",
    zh: "我们直接在Amazon Fire TV Stick上测试了30多个VPN应用。这5款有原生应用、遥控器友好界面和快速流媒体速度。",
    ja: "Amazon Fire TV Stickで30以上のVPNアプリを直接テスト。この5つはリモコン対応のネイティブアプリと高速ストリーミングを提供。",
    ko: "Amazon Fire TV Stick에서 30개 이상의 VPN 앱을 직접 테스트했습니다. 이 5개는 리모컨 친화적 인터페이스의 네이티브 앱을 제공합니다.",
    th: "เราทดสอบแอป VPN มากกว่า 30 ตัวบน Amazon Fire TV Stick โดยตรง 5 ตัวนี้มีแอปเนทีฟที่ใช้กับรีโมทได้ง่าย",
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
    name: "Best VPN for Firestick 2026",
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

export default async function VpnFirestickPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const nordvpn = await getVpnBySlug("nordvpn");
  const expressvpn = await getVpnBySlug("expressvpn");
  const surfshark = await getVpnBySlug("surfshark");
  const cyberghost = await getVpnBySlug("cyberghost");
  const ipvanish = await getVpnBySlug("ipvanish");

  const firestickVpns = [
    {
      vpn: nordvpn,
      badge: "Best Overall",
      badgeColor: "yellow",
      nativeApp: true,
      remoteOptimized: true,
      splitTunneling: true,
      speed: "92 Mbps",
      supports4K: true,
      appRating: "4.3",
      price: "$2.99/mo",
    },
    {
      vpn: expressvpn,
      badge: "Best Interface",
      badgeColor: "blue",
      nativeApp: true,
      remoteOptimized: true,
      splitTunneling: true,
      speed: "95 Mbps",
      supports4K: true,
      appRating: "4.4",
      price: "$2.44/mo",
    },
    {
      vpn: surfshark,
      badge: "Best Value",
      badgeColor: "green",
      nativeApp: true,
      remoteOptimized: true,
      splitTunneling: true,
      speed: "88 Mbps",
      supports4K: true,
      appRating: "4.1",
      price: "$1.99/mo",
    },
    {
      vpn: cyberghost,
      badge: "Best for Beginners",
      badgeColor: "purple",
      nativeApp: true,
      remoteOptimized: true,
      splitTunneling: false,
      speed: "82 Mbps",
      supports4K: true,
      appRating: "4.0",
      price: "$2.19/mo",
    },
    {
      vpn: ipvanish,
      badge: "Best for Sideloading",
      badgeColor: "red",
      nativeApp: true,
      remoteOptimized: true,
      splitTunneling: true,
      speed: "75 Mbps",
      supports4K: true,
      appRating: "4.2",
      price: "$2.49/mo",
    },
  ];

  const content = {
    en: {
      badge: "Updated February 2026",
      title: "Best VPN for Firestick in 2026",
      subtitle:
        "We installed and tested 30+ VPN apps directly on Amazon Fire TV Stick. These 5 have the best native apps with remote-friendly interfaces, fast speeds for 4K streaming, and reliable unblocking of Netflix, Disney+, and more.",
      topPicks: "Top Firestick VPNs",
      appTitle: "Fire TV App Comparison",
      appDesc: "All 5 VPNs have native Amazon Appstore apps. Here is how they compare.",
      tableHeaders: { vpn: "VPN", nativeApp: "Native App", remote: "Remote-Friendly", split: "Split Tunnel", speed: "Speed", fourK: "4K", rating: "App Rating" },
      installTitle: "How to Install a VPN on Fire Stick",
      installSteps: [
        "On your Fire Stick, go to the home screen and select the Search icon",
        "Type the name of your VPN (e.g., NordVPN) and select it from the results",
        "Click 'Get' or 'Download' to install the app from the Amazon Appstore",
        "Open the VPN app, log in with your credentials, and connect to a server",
        "Navigate back to your streaming app (Netflix, Disney+, etc.) and start watching",
      ],
      speedTitle: "Streaming Speed on Fire TV",
      speedDesc: "Speeds tested directly on Fire TV Stick 4K Max with a 100 Mbps connection. Minimum 25 Mbps needed for 4K streaming.",
      faqTitle: "Fire Stick VPN FAQs",
      faqs: [
        {
          question: "Do I need to sideload a VPN on Fire Stick?",
          answer: "No. All 5 VPNs we recommend have native apps available directly in the Amazon Appstore. Simply search for the VPN name on your Fire Stick and install it like any other app. Sideloading is only needed for VPNs that are not in the Amazon Appstore.",
        },
        {
          question: "Will a VPN slow down my Fire Stick streaming?",
          answer: "Modern VPN apps cause minimal slowdown on Fire Stick. In our tests, ExpressVPN retained 95% speed and NordVPN 92%. Both are fast enough for 4K Ultra HD streaming. The Fire Stick 4K Max handles VPN encryption easily.",
        },
        {
          question: "Can I use a free VPN on Fire Stick?",
          answer: "We do not recommend free VPNs for Fire Stick. Most lack native Fire TV apps, have slow speeds that cause buffering, and data caps that make streaming impossible (2GB = about 1 hour of HD video). Surfshark at $1.99/month with unlimited streaming is a much better option.",
        },
        {
          question: "What is split tunneling on Fire Stick?",
          answer: "Split tunneling lets you choose which apps use the VPN and which do not. For example, you can route Netflix through a US server while keeping local apps on your normal connection. NordVPN, ExpressVPN, Surfshark, and IPVanish offer this on Fire TV.",
        },
        {
          question: "Which Fire Stick models support VPN apps?",
          answer: "All current Amazon Fire TV Stick models support VPN apps from the Appstore, including Fire TV Stick Lite, Fire TV Stick, Fire TV Stick 4K, Fire TV Stick 4K Max, and Fire TV Cube. Older models from before 2017 may have limited app support.",
        },
      ],
      getVpnButton: "Get",
      ctaTitle: "Stream Anything on Your Fire Stick",
      ctaSubtitle: "Install a VPN in 2 minutes and unlock Netflix, Disney+, BBC iPlayer and thousands more shows on your Fire TV.",
      viewAllVpns: "View All VPN Reviews",
      lastUpdated: "Last updated: February 2026",
    },
    nl: {
      badge: "Bijgewerkt februari 2026", title: "Beste VPN voor Firestick in 2026",
      subtitle: "We installeerden en testten 30+ VPN apps direct op Amazon Fire TV Stick. Deze 5 hebben de beste native apps met afstandsbediening-vriendelijke interfaces.",
      topPicks: "Top Firestick VPNs", appTitle: "Fire TV App Vergelijking", appDesc: "Alle 5 VPNs hebben native Amazon Appstore apps.",
      tableHeaders: { vpn: "VPN", nativeApp: "Native App", remote: "Remote-Vriendelijk", split: "Split Tunnel", speed: "Snelheid", fourK: "4K", rating: "App Rating" },
      installTitle: "Hoe Een VPN Installeren Op Fire Stick",
      installSteps: [
        "Ga op je Fire Stick naar het startscherm en selecteer het zoekicoon",
        "Typ de naam van je VPN (bijv. NordVPN) en selecteer het uit de resultaten",
        "Klik op 'Downloaden' om de app te installeren vanuit de Amazon Appstore",
        "Open de VPN app, log in met je gegevens en verbind met een server",
        "Ga terug naar je streaming app (Netflix, Disney+, etc.) en begin met kijken",
      ],
      speedTitle: "Streamingsnelheid op Fire TV", speedDesc: "Snelheden getest op Fire TV Stick 4K Max met 100 Mbps verbinding.",
      faqTitle: "Fire Stick VPN Veelgestelde Vragen",
      faqs: [
        { question: "Moet ik een VPN sideloaden op Fire Stick?", answer: "Nee. Alle 5 aanbevolen VPNs hebben native apps in de Amazon Appstore." },
        { question: "Vertraagt een VPN mijn Fire Stick streaming?", answer: "Minimale vertraging. ExpressVPN behoudt 95% snelheid, NordVPN 92%." },
        { question: "Kan ik een gratis VPN gebruiken op Fire Stick?", answer: "Niet aanbevolen. Surfshark voor $1,99/maand is veel beter." },
        { question: "Wat is split tunneling op Fire Stick?", answer: "Hiermee kies je welke apps de VPN gebruiken. NordVPN, ExpressVPN, Surfshark en IPVanish bieden dit." },
        { question: "Welke Fire Stick modellen ondersteunen VPN apps?", answer: "Alle huidige modellen inclusief Lite, 4K, 4K Max en Fire TV Cube." },
      ],
      getVpnButton: "Krijg", ctaTitle: "Stream Alles Op Je Fire Stick", ctaSubtitle: "Installeer een VPN in 2 minuten en deblokkeer Netflix, Disney+ en meer.",
      viewAllVpns: "Bekijk Alle VPN Reviews", lastUpdated: "Laatst bijgewerkt: februari 2026",
    },
    de: {
      badge: "Aktualisiert Februar 2026", title: "Beste VPN fur Firestick in 2026",
      subtitle: "Wir haben uber 30 VPN-Apps direkt auf dem Amazon Fire TV Stick installiert und getestet.",
      topPicks: "Top Firestick VPNs", appTitle: "Fire TV App-Vergleich", appDesc: "Alle 5 VPNs haben native Amazon Appstore-Apps.",
      tableHeaders: { vpn: "VPN", nativeApp: "Native App", remote: "Fernbedienungs-freundlich", split: "Split Tunnel", speed: "Geschwindigkeit", fourK: "4K", rating: "App-Bewertung" },
      installTitle: "VPN Auf Fire Stick Installieren",
      installSteps: ["Gehen Sie auf dem Startbildschirm zum Suchsymbol", "Geben Sie den VPN-Namen ein und wahlen Sie ihn aus", "Klicken Sie auf 'Herunterladen'", "Offnen Sie die App und verbinden Sie sich", "Gehen Sie zuruck zu Ihrer Streaming-App"],
      speedTitle: "Streaming-Geschwindigkeit auf Fire TV", speedDesc: "Auf Fire TV Stick 4K Max mit 100-Mbps-Verbindung getestet.",
      faqTitle: "Haufige Fragen",
      faqs: [
        { question: "Muss ich ein VPN sideloaden?", answer: "Nein. Alle 5 VPNs haben native Apps im Amazon Appstore." },
        { question: "Wird ein VPN mein Streaming verlangsamen?", answer: "Minimale Verlangsamung. ExpressVPN behalt 95%, NordVPN 92%." },
        { question: "Kann ich ein kostenloses VPN verwenden?", answer: "Nicht empfohlen. Surfshark fur $1,99/Monat ist besser." },
        { question: "Was ist Split-Tunneling?", answer: "Wahlen Sie, welche Apps das VPN nutzen." },
        { question: "Welche Fire Stick Modelle werden unterstutzt?", answer: "Alle aktuellen Modelle." },
      ],
      getVpnButton: "Holen", ctaTitle: "Alles Auf Ihrem Fire Stick Streamen", ctaSubtitle: "Installieren Sie ein VPN in 2 Minuten.",
      viewAllVpns: "Alle Bewertungen", lastUpdated: "Zuletzt aktualisiert: Februar 2026",
    },
    es: {
      badge: "Actualizado febrero 2026", title: "Mejor VPN para Firestick en 2026",
      subtitle: "Instalamos y probamos mas de 30 apps VPN directamente en Amazon Fire TV Stick.",
      topPicks: "Mejores VPNs para Firestick", appTitle: "Comparacion de Apps Fire TV", appDesc: "Los 5 VPNs tienen apps nativas en Amazon Appstore.",
      tableHeaders: { vpn: "VPN", nativeApp: "App Nativa", remote: "Control Remoto", split: "Split Tunnel", speed: "Velocidad", fourK: "4K", rating: "Rating" },
      installTitle: "Como Instalar VPN en Fire Stick",
      installSteps: ["Ve a la pantalla de inicio y selecciona buscar", "Escribe el nombre del VPN y seleccionalo", "Haz clic en 'Obtener' para instalar", "Abre la app, inicia sesion y conectate", "Vuelve a tu app de streaming"],
      speedTitle: "Velocidad de Streaming en Fire TV", speedDesc: "Velocidades probadas en Fire TV Stick 4K Max con conexion de 100 Mbps.",
      faqTitle: "Preguntas Frecuentes",
      faqs: [
        { question: "Necesito hacer sideload?", answer: "No. Los 5 VPNs tienen apps nativas en Amazon Appstore." },
        { question: "Un VPN ralentizara mi streaming?", answer: "Retraso minimo. ExpressVPN mantiene 95%, NordVPN 92%." },
        { question: "Puedo usar un VPN gratis?", answer: "No recomendado. Surfshark a $1.99/mes es mejor." },
        { question: "Que es split tunneling?", answer: "Permite elegir que apps usan el VPN." },
        { question: "Que modelos son compatibles?", answer: "Todos los modelos actuales de Fire TV Stick." },
      ],
      getVpnButton: "Obtener", ctaTitle: "Transmite Todo en Tu Fire Stick", ctaSubtitle: "Instala un VPN en 2 minutos.",
      viewAllVpns: "Ver Todas las Resenas", lastUpdated: "Ultima actualizacion: febrero 2026",
    },
    fr: {
      badge: "Mis a jour fevrier 2026", title: "Meilleur VPN pour Firestick en 2026",
      subtitle: "Nous avons installe et teste plus de 30 apps VPN directement sur l'Amazon Fire TV Stick.",
      topPicks: "Meilleurs VPN Firestick", appTitle: "Comparaison des Apps Fire TV", appDesc: "Les 5 VPN ont des apps natives sur l'Amazon Appstore.",
      tableHeaders: { vpn: "VPN", nativeApp: "App Native", remote: "Telecommande", split: "Split Tunnel", speed: "Vitesse", fourK: "4K", rating: "Note" },
      installTitle: "Comment Installer Un VPN Sur Fire Stick",
      installSteps: ["Allez a l'ecran d'accueil et selectionnez rechercher", "Tapez le nom du VPN et selectionnez-le", "Cliquez sur 'Obtenir' pour installer", "Ouvrez l'app, connectez-vous et choisissez un serveur", "Retournez a votre app de streaming"],
      speedTitle: "Vitesse de Streaming sur Fire TV", speedDesc: "Vitesses testees sur Fire TV Stick 4K Max avec connexion 100 Mbps.",
      faqTitle: "FAQ",
      faqs: [
        { question: "Faut-il faire du sideloading?", answer: "Non. Les 5 VPN ont des apps natives sur l'Amazon Appstore." },
        { question: "Un VPN ralentira-t-il mon streaming?", answer: "Ralentissement minimal. ExpressVPN conserve 95%, NordVPN 92%." },
        { question: "Puis-je utiliser un VPN gratuit?", answer: "Non recommande. Surfshark a $1,99/mois est meilleur." },
        { question: "Qu'est-ce que le split tunneling?", answer: "Choisissez quelles apps utilisent le VPN." },
        { question: "Quels modeles sont compatibles?", answer: "Tous les modeles actuels de Fire TV Stick." },
      ],
      getVpnButton: "Obtenir", ctaTitle: "Streamez Tout Sur Votre Fire Stick", ctaSubtitle: "Installez un VPN en 2 minutes.",
      viewAllVpns: "Voir Tous les Avis", lastUpdated: "Derniere mise a jour : fevrier 2026",
    },
    zh: {
      badge: "2026年2月更新", title: "2026年最佳Firestick VPN", subtitle: "我们直接在Amazon Fire TV Stick上安装并测试了30多个VPN应用。",
      topPicks: "最佳Firestick VPN", appTitle: "Fire TV应用比较", appDesc: "所有5个VPN都有原生Amazon Appstore应用。",
      tableHeaders: { vpn: "VPN", nativeApp: "原生应用", remote: "遥控器友好", split: "拆分隧道", speed: "速度", fourK: "4K", rating: "评分" },
      installTitle: "如何在Fire Stick上安装VPN",
      installSteps: ["转到主屏幕并选择搜索图标", "输入VPN名称并选择", "点击'获取'安装应用", "打开应用，登录并连接", "返回流媒体应用开始观看"],
      speedTitle: "Fire TV上的流媒体速度", speedDesc: "在Fire TV Stick 4K Max上用100 Mbps连接测试。",
      faqTitle: "常见问题",
      faqs: [
        { question: "需要旁加载VPN吗？", answer: "不需要。所有5个VPN都有Amazon Appstore原生应用。" },
        { question: "VPN会降低速度吗？", answer: "极小的影响。ExpressVPN保持95%，NordVPN保持92%。" },
        { question: "可以用免费VPN吗？", answer: "不推荐。Surfshark $1.99/月是更好的选择。" },
        { question: "什么是拆分隧道？", answer: "选择哪些应用使用VPN。" },
        { question: "哪些型号兼容？", answer: "所有当前Fire TV Stick型号。" },
      ],
      getVpnButton: "获取", ctaTitle: "在Fire Stick上流媒体一切", ctaSubtitle: "2分钟安装VPN。",
      viewAllVpns: "查看所有VPN评测", lastUpdated: "最后更新：2026年2月",
    },
    ja: {
      badge: "2026年2月更新", title: "2026年Firestick向けベストVPN", subtitle: "Amazon Fire TV Stickで30以上のVPNアプリを直接インストールしてテスト。",
      topPicks: "トップFirestick VPN", appTitle: "Fire TVアプリ比較", appDesc: "5つすべてのVPNにAmazon Appstoreネイティブアプリあり。",
      tableHeaders: { vpn: "VPN", nativeApp: "ネイティブアプリ", remote: "リモコン対応", split: "スプリットトンネル", speed: "速度", fourK: "4K", rating: "評価" },
      installTitle: "Fire StickにVPNをインストールする方法",
      installSteps: ["ホーム画面で検索アイコンを選択", "VPN名を入力して選択", "「取得」をクリックしてインストール", "アプリを開いてログインし接続", "ストリーミングアプリに戻って視聴開始"],
      speedTitle: "Fire TVでのストリーミング速度", speedDesc: "Fire TV Stick 4K Maxで100 Mbps接続テスト。",
      faqTitle: "FAQ",
      faqs: [
        { question: "サイドロードが必要？", answer: "いいえ。5つすべてのVPNにAmazon Appstoreネイティブアプリがあります。" },
        { question: "VPNで速度低下する？", answer: "最小限。ExpressVPN 95%、NordVPN 92%維持。" },
        { question: "無料VPNは使える？", answer: "非推奨。Surfshark月額$1.99がはるかに良い。" },
        { question: "スプリットトンネリングとは？", answer: "どのアプリがVPNを使うか選択できます。" },
        { question: "対応モデルは？", answer: "すべての現行Fire TV Stickモデル。" },
      ],
      getVpnButton: "取得", ctaTitle: "Fire Stickですべてをストリーミング", ctaSubtitle: "2分でVPNをインストール。",
      viewAllVpns: "すべてのVPNレビュー", lastUpdated: "最終更新：2026年2月",
    },
    ko: {
      badge: "2026년 2월 업데이트", title: "2026년 Firestick 최고의 VPN", subtitle: "Amazon Fire TV Stick에서 30개 이상의 VPN 앱을 직접 설치하고 테스트했습니다.",
      topPicks: "최고의 Firestick VPN", appTitle: "Fire TV 앱 비교", appDesc: "5개 VPN 모두 Amazon Appstore 네이티브 앱 보유.",
      tableHeaders: { vpn: "VPN", nativeApp: "네이티브 앱", remote: "리모컨 친화적", split: "스플릿 터널", speed: "속도", fourK: "4K", rating: "앱 평점" },
      installTitle: "Fire Stick에 VPN 설치하는 방법",
      installSteps: ["홈 화면에서 검색 아이콘 선택", "VPN 이름을 입력하고 선택", "'받기'를 클릭하여 설치", "앱을 열고 로그인 후 연결", "스트리밍 앱으로 돌아가서 시청 시작"],
      speedTitle: "Fire TV에서의 스트리밍 속도", speedDesc: "Fire TV Stick 4K Max에서 100 Mbps 연결로 테스트.",
      faqTitle: "FAQ",
      faqs: [
        { question: "사이드로드가 필요한가요?", answer: "아니요. 5개 VPN 모두 Amazon Appstore 네이티브 앱이 있습니다." },
        { question: "VPN이 스트리밍을 느리게 하나요?", answer: "최소한의 영향. ExpressVPN 95%, NordVPN 92% 속도 유지." },
        { question: "무료 VPN을 사용할 수 있나요?", answer: "추천하지 않습니다. Surfshark 월 $1.99가 훨씬 낫습니다." },
        { question: "스플릿 터널링이란?", answer: "어떤 앱이 VPN을 사용할지 선택할 수 있습니다." },
        { question: "어떤 모델이 호환되나요?", answer: "모든 현재 Fire TV Stick 모델." },
      ],
      getVpnButton: "받기", ctaTitle: "Fire Stick에서 모든 것을 스트리밍", ctaSubtitle: "2분 안에 VPN을 설치하세요.",
      viewAllVpns: "모든 VPN 리뷰 보기", lastUpdated: "마지막 업데이트: 2026년 2월",
    },
    th: {
      badge: "อัปเดตกุมภาพันธ์ 2026", title: "VPN ที่ดีที่สุดสำหรับ Firestick ในปี 2026", subtitle: "เราติดตั้งและทดสอบแอป VPN มากกว่า 30 ตัวบน Amazon Fire TV Stick โดยตรง",
      topPicks: "VPN ชั้นนำสำหรับ Firestick", appTitle: "เปรียบเทียบแอป Fire TV", appDesc: "VPN ทั้ง 5 ตัวมีแอปเนทีฟบน Amazon Appstore",
      tableHeaders: { vpn: "VPN", nativeApp: "แอปเนทีฟ", remote: "รีโมทเฟรนด์ลี่", split: "Split Tunnel", speed: "ความเร็ว", fourK: "4K", rating: "คะแนนแอป" },
      installTitle: "วิธีติดตั้ง VPN บน Fire Stick",
      installSteps: ["ไปที่หน้าจอหลักและเลือกไอคอนค้นหา", "พิมพ์ชื่อ VPN และเลือก", "คลิก 'รับ' เพื่อติดตั้ง", "เปิดแอป เข้าสู่ระบบ และเชื่อมต่อ", "กลับไปที่แอปสตรีมมิ่งและเริ่มดู"],
      speedTitle: "ความเร็ว Streaming บน Fire TV", speedDesc: "ทดสอบบน Fire TV Stick 4K Max ด้วยการเชื่อมต่อ 100 Mbps",
      faqTitle: "คำถามที่พบบ่อย",
      faqs: [
        { question: "ต้อง sideload VPN ไหม?", answer: "ไม่ VPN ทั้ง 5 ตัวมีแอปเนทีฟบน Amazon Appstore" },
        { question: "VPN จะทำให้สตรีมมิ่งช้าลงไหม?", answer: "ช้าลงน้อยมาก ExpressVPN รักษาความเร็ว 95% NordVPN 92%" },
        { question: "ใช้ VPN ฟรีได้ไหม?", answer: "ไม่แนะนำ Surfshark ที่ $1.99/เดือน ดีกว่ามาก" },
        { question: "Split tunneling คืออะไร?", answer: "เลือกได้ว่าแอปไหนใช้ VPN" },
        { question: "รุ่นไหนรองรับ?", answer: "ทุกรุ่น Fire TV Stick ปัจจุบัน" },
      ],
      getVpnButton: "รับ", ctaTitle: "สตรีมทุกอย่างบน Fire Stick", ctaSubtitle: "ติดตั้ง VPN ใน 2 นาที",
      viewAllVpns: "ดูบทวิจารณ์ VPN ทั้งหมด", lastUpdated: "อัปเดตล่าสุด: กุมภาพันธ์ 2026",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const relatedPages = [
    { title: "Best VPN for Netflix", description: "VPNs tested specifically for Netflix libraries.", href: "/best/vpn-netflix", icon: "play" as const },
    { title: "Best VPN for Streaming", description: "VPNs for Netflix, Disney+, Hulu, and more.", href: "/best/vpn-streaming", icon: "tv" as const },
    { title: "Best Cheap VPN", description: "Budget VPNs from $1.99/mo.", href: "/best/vpn-cheap", icon: "price" as const },
  ];

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Best VPN Guides", href: "/best" }, { name: "Best VPN for Firestick", href: "/best/vpn-firestick" }]} />
      <ItemListSchema vpns={firestickVpns} />
      <FAQSchema faqs={t.faqs} />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">{t.badge}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-blue-600 dark:from-orange-400 dark:to-blue-400 bg-clip-text text-transparent">{t.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{t.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Top Picks */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.topPicks}</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {firestickVpns.map((item, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex items-center gap-4 md:min-w-[200px]">
                        <span className="text-3xl font-bold text-gray-300 dark:text-gray-600">#{index + 1}</span>
                        {item.vpn && <VpnLogo name={item.vpn.name} size="lg" />}
                        <div>
                          <h3 className="text-xl font-bold">{item.vpn?.name}</h3>
                          <RatingStars rating={item.vpn?.overallRating || 0} />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 text-sm"><Tv className="w-4 h-4 text-orange-500" /><span>Native App</span></div>
                        <div className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-yellow-500" /><span>{item.speed}</span></div>
                        <div className="flex items-center gap-2 text-sm"><Monitor className="w-4 h-4 text-blue-500" /><span>4K Streaming</span></div>
                        <div className="flex items-center gap-2 text-sm">
                          {item.splitTunneling ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                          <span>Split Tunnel</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm"><Play className="w-4 h-4 text-green-500" /><span>App: {item.appRating}/5</span></div>
                      </div>
                      <div className="flex flex-col items-center gap-2 md:min-w-[160px]">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{item.price}</p>
                        <AffiliateButton vpnId={item.vpn?.slug || ""} vpnName={item.vpn?.name || ""} affiliateUrl={item.vpn?.affiliateUrl || ""} className="gap-2 w-full">
                          {t.getVpnButton} {item.vpn?.name}<ArrowRight className="w-4 h-4" />
                        </AffiliateButton>
                      </div>
                    </div>
                    {item.badge && <Badge className={`absolute top-4 right-4 ${item.badgeColor === "yellow" ? "bg-yellow-500" : item.badgeColor === "blue" ? "bg-blue-500" : item.badgeColor === "green" ? "bg-green-500" : item.badgeColor === "purple" ? "bg-purple-500" : "bg-red-500"} text-white`}>{item.badge}</Badge>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* App Comparison Table */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">{t.appTitle}</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">{t.appDesc}</p>
            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-4 text-left">{t.tableHeaders.vpn}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.nativeApp}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.remote}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.split}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.speed}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.fourK}</th>
                    <th className="px-3 py-4 text-center">{t.tableHeaders.rating}</th>
                  </tr>
                </thead>
                <tbody>
                  {firestickVpns.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 font-semibold">{item.vpn?.name}</td>
                      <td className="px-3 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="px-3 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="px-3 py-4 text-center">{item.splitTunneling ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                      <td className="px-3 py-4 text-center text-sm font-medium">{item.speed}</td>
                      <td className="px-3 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="px-3 py-4 text-center text-sm font-medium">{item.appRating}/5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.installTitle}</h2>
            <div className="space-y-4">
              {t.installSteps.map((step, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-bold flex-shrink-0">{index + 1}</div>
                      <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Speed on Fire TV */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-center">{t.speedTitle}</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">{t.speedDesc}</p>
            <div className="space-y-6">
              {firestickVpns.map((item, index) => {
                const speedNum = parseInt(item.speed);
                return (
                  <div key={index} className="flex items-center gap-4">
                    <span className="font-semibold w-32 text-right">{item.vpn?.name}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                      <div className={`h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium ${speedNum >= 90 ? "bg-green-500" : speedNum >= 80 ? "bg-blue-500" : "bg-yellow-500"}`} style={{ width: `${speedNum}%` }}>{item.speed}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-blue-600 dark:from-orange-700 dark:to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90">{t.ctaSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {firestickVpns.slice(0, 3).map((item) => (
                <AffiliateButton key={item.vpn?.slug} vpnId={item.vpn?.slug || ""} vpnName={item.vpn?.name || ""} affiliateUrl={item.vpn?.affiliateUrl || ""} className="bg-white text-orange-600 hover:bg-gray-100">
                  {t.getVpnButton} {item.vpn?.name}
                </AffiliateButton>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.faqTitle}</h2>
            <div className="space-y-6">
              {t.faqs.map((faq, index) => (
                <Card key={index}><CardContent className="p-6"><div className="flex items-start gap-3"><HelpCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" /><div><h3 className="text-xl font-bold mb-3">{faq.question}</h3><p className="text-gray-600 dark:text-gray-300">{faq.answer}</p></div></div></CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        <RelatedPages pages={relatedPages} />

        <section className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t.lastUpdated}</p>
            <Link href="/reviews" className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-2">{t.viewAllVpns}<ArrowRight className="w-4 h-4" /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
