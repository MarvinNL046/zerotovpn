import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  Globe,
  Clock,
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "VPN by Country 2025: Find VPNs That Work in Your Location | ZeroToVPN",
    nl: "VPN per Land 2025: Vind VPNs Die Werken in Jouw Locatie | ZeroToVPN",
    de: "VPN nach Land 2025: Finden Sie VPNs für Ihren Standort | ZeroToVPN",
    es: "VPN por País 2025: Encuentra VPNs que Funcionan en tu Ubicación | ZeroToVPN",
    fr: "VPN par Pays 2025: Trouvez des VPN qui Fonctionnent dans Votre Pays | ZeroToVPN",
    zh: "2025年按国家/地区选择VPN：找到适合您所在位置的VPN | ZeroToVPN",
    ja: "国別VPN 2025：あなたの地域で使えるVPNを見つける | ZeroToVPN",
    ko: "국가별 VPN 2025: 당신의 위치에서 작동하는 VPN 찾기 | ZeroToVPN",
    th: "VPN ตามประเทศ 2025: ค้นหา VPN ที่ใช้งานได้ในพื้นที่ของคุณ | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Find the best VPN for your country. Expert guides for China, Russia, UAE, Turkey, Netherlands and more. Research-backed recommendations.",
    nl: "Vind de beste VPN voor jouw land. Expert gidsen voor China, Rusland, VAE, Turkije, Nederland en meer.",
    de: "Finden Sie das beste VPN für Ihr Land. Expertenleitfäden für China, Russland, VAE, Türkei, Niederlande und mehr.",
    es: "Encuentra el mejor VPN para tu país. Guías expertas para China, Rusia, EAU, Turquía, Países Bajos y más.",
    fr: "Trouvez le meilleur VPN pour votre pays. Guides experts pour la Chine, la Russie, les EAU, la Turquie, les Pays-Bas et plus.",
    zh: "为您的国家/地区找到最佳VPN。专家指南涵盖中国、俄罗斯、阿联酋、土耳其、荷兰等。基于研究的推荐。",
    ja: "あなたの国に最適なVPNを見つけましょう。中国、ロシア、UAE、トルコ、オランダなどの専門家ガイド。研究に基づく推奨。",
    ko: "귀하의 국가에 가장 적합한 VPN을 찾으세요. 중국, 러시아, UAE, 터키, 네덜란드 등에 대한 전문가 가이드. 연구 기반 권장 사항.",
    th: "ค้นหา VPN ที่ดีที่สุดสำหรับประเทศของคุณ คู่มือผู้เชี่ยวชาญสำหรับจีน รัสเซีย สหรัฐอาหรับเอมิเรตส์ ตุรกี เนเธอร์แลนด์ และอื่นๆ คำแนะนำที่ได้รับการสนับสนุนจากการวิจัย",
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

// Country data with actual research-backed info
const countries = [
  {
    slug: "china",
    flag: "🇨🇳",
    name: { en: "China", nl: "China", de: "China", es: "China", fr: "Chine", zh: "中国", ja: "中国", ko: "중국", th: "จีน" },
    status: "restricted",
    statusText: {
      en: "Heavily restricted",
      nl: "Zwaar beperkt",
      de: "Stark eingeschränkt",
      es: "Muy restringido",
      fr: "Très restreint",
      zh: "严格限制",
      ja: "厳しく制限",
      ko: "엄격히 제한됨",
      th: "ถูกจำกัดอย่างหนัก"
    },
    description: {
      en: "The Great Firewall blocks most VPNs. Obfuscation technology required.",
      nl: "De Grote Firewall blokkeert de meeste VPNs. Obfuscatie-technologie vereist.",
      de: "Die Große Firewall blockiert die meisten VPNs. Verschleierungstechnologie erforderlich.",
      es: "El Gran Cortafuegos bloquea la mayoría de VPNs. Tecnología de ofuscación requerida.",
      fr: "Le Grand Pare-feu bloque la plupart des VPN. Technologie d'obfuscation requise.",
      zh: "防火长城阻止大多数VPN。需要混淆技术。",
      ja: "グレートファイアウォールはほとんどのVPNをブロックします。難読化技術が必要です。",
      ko: "방화장성이 대부분의 VPN을 차단합니다. 난독화 기술이 필요합니다.",
      th: "กำแพงไฟวอลล์เดอะเกรท (Great Firewall) บลอก VPN ส่วนใหญ่ ต้องใช้เทคโนโลยีการปิดบัง"
    },
  },
  {
    slug: "russia",
    flag: "🇷🇺",
    name: { en: "Russia", nl: "Rusland", de: "Russland", es: "Rusia", fr: "Russie", zh: "俄罗斯", ja: "ロシア", ko: "러시아", th: "รัสเซีย" },
    status: "restricted",
    statusText: {
      en: "Increasingly restricted",
      nl: "Toenemend beperkt",
      de: "Zunehmend eingeschränkt",
      es: "Cada vez más restringido",
      fr: "De plus en plus restreint",
      zh: "日益受限",
      ja: "ますます制限される",
      ko: "점점 더 제한됨",
      th: "ถูกจำกัดมากขึ้น"
    },
    description: {
      en: "197+ VPNs blocked in 2024. 41% of Russians still use VPNs. Advanced obfuscation needed.",
      nl: "197+ VPNs geblokkeerd in 2024. 41% van de Russen gebruikt nog steeds VPNs.",
      de: "197+ VPNs 2024 gesperrt. 41% der Russen nutzen noch VPNs.",
      es: "197+ VPNs bloqueados en 2024. 41% de los rusos aún usan VPNs.",
      fr: "197+ VPN bloqués en 2024. 41% des Russes utilisent encore des VPN.",
      zh: "2024年封锁了197+个VPN。41%的俄罗斯人仍在使用VPN。需要高级混淆。",
      ja: "2024年に197以上のVPNがブロックされました。ロシア人の41%がまだVPNを使用しています。高度な難読化が必要です。",
      ko: "2024년에 197개 이상의 VPN이 차단되었습니다. 러시아인의 41%가 여전히 VPN을 사용합니다. 고급 난독화가 필요합니다.",
      th: "มี VPN กว่า 197 รายการถูกบลอกในปี 2024 ชาวรัสเซีย 41% ยังคงใช้ VPN ต้องใช้การปิดบังขั้นสูง"
    },
  },
  {
    slug: "uae",
    flag: "🇦🇪",
    name: { en: "UAE & Dubai", nl: "VAE & Dubai", de: "VAE & Dubai", es: "EAU y Dubái", fr: "EAU et Dubaï", zh: "阿联酋与迪拜", ja: "UAE・ドバイ", ko: "UAE & 두바이", th: "สหรัฐอาหรับเอมิเรตส์และดูไบ" },
    status: "legal-restricted",
    statusText: {
      en: "Legal but regulated",
      nl: "Legaal maar gereguleerd",
      de: "Legal aber reguliert",
      es: "Legal pero regulado",
      fr: "Légal mais réglementé",
      zh: "合法但受监管",
      ja: "合法だが規制あり",
      ko: "합법이지만 규제됨",
      th: "ถูกกฎหมายแต่มีการควบคุม"
    },
    description: {
      en: "VPNs legal for legitimate use. Fines up to AED 2M for misuse. VoIP restrictions apply.",
      nl: "VPNs legaal voor legitiem gebruik. Boetes tot AED 2M voor misbruik.",
      de: "VPNs legal für legitime Nutzung. Strafen bis AED 2M bei Missbrauch.",
      es: "VPNs legales para uso legítimo. Multas hasta AED 2M por mal uso.",
      fr: "VPN légaux pour usage légitime. Amendes jusqu'à 2M AED pour mauvais usage.",
      zh: "VPN用于合法用途是合法的。滥用可罚款高达200万迪拉姆。适用VoIP限制。",
      ja: "正当な使用目的でのVPNは合法です。不正使用には最大200万ディルハムの罰金。VoIP制限が適用されます。",
      ko: "합법적 사용을 위한 VPN은 합법입니다. 오용 시 최대 200만 디르함의 벌금. VoIP 제한이 적용됩니다.",
      th: "VPN ถูกกฎหมายสำหรับการใช้งานที่ถูกต้อง ค่าปรับสูงสุด 2 ล้านดิรแฮมสำหรับการใช้งานผิด มีข้อจำกัด VoIP"
    },
  },
  {
    slug: "turkey",
    flag: "🇹🇷",
    name: { en: "Turkey", nl: "Turkije", de: "Türkei", es: "Turquía", fr: "Turquie", zh: "土耳其", ja: "トルコ", ko: "터키", th: "ตุรกี" },
    status: "legal-blocked",
    statusText: {
      en: "Legal, many VPNs blocked",
      nl: "Legaal, veel VPNs geblokkeerd",
      de: "Legal, viele VPNs gesperrt",
      es: "Legal, muchas VPNs bloqueadas",
      fr: "Légal, nombreux VPN bloqués",
      zh: "合法，但许多VPN被封锁",
      ja: "合法だが多くのVPNがブロック",
      ko: "합법, 많은 VPN이 차단됨",
      th: "ถูกกฎหมาย แต่ VPN หลายรายการถูกบลอก"
    },
    description: {
      en: "VPN use legal but 27+ services blocked. Social media often restricted during events.",
      nl: "VPN-gebruik legaal maar 27+ diensten geblokkeerd. Sociale media vaak beperkt.",
      de: "VPN-Nutzung legal, aber 27+ Dienste gesperrt. Soziale Medien oft eingeschränkt.",
      es: "Uso de VPN legal pero 27+ servicios bloqueados. Redes sociales a menudo restringidas.",
      fr: "Utilisation de VPN légale mais 27+ services bloqués. Réseaux sociaux souvent restreints.",
      zh: "VPN使用合法，但27+服务被封锁。社交媒体在事件期间经常受限。",
      ja: "VPNの使用は合法ですが、27以上のサービスがブロックされています。イベント中はソーシャルメディアが制限されることがよくあります。",
      ko: "VPN 사용은 합법이지만 27개 이상의 서비스가 차단됩니다. 이벤트 중 소셜 미디어가 종종 제한됩니다.",
      th: "การใช้ VPN ถูกกฎหมายแต่มีบริการกว่า 27 รายการถูกบลอก โซเชียลมีเดียมักถูกจำกัดในช่วงเหตุการณ์ต่างๆ"
    },
  },
  {
    slug: "netherlands",
    flag: "🇳🇱",
    name: { en: "Netherlands", nl: "Nederland", de: "Niederlande", es: "Países Bajos", fr: "Pays-Bas", zh: "荷兰", ja: "オランダ", ko: "네덜란드", th: "เนเธอร์แลนด์" },
    status: "legal",
    statusText: {
      en: "Fully legal",
      nl: "Volledig legaal",
      de: "Vollständig legal",
      es: "Totalmente legal",
      fr: "Entièrement légal",
      zh: "完全合法",
      ja: "完全に合法",
      ko: "완전히 합법",
      th: "ถูกกฎหมายอย่างสมบูรณ์"
    },
    description: {
      en: "High internet freedom. 14 Eyes member. VPN recommended for privacy and streaming Dutch TV abroad.",
      nl: "Hoge internetvrijheid. 14 Eyes lid. VPN aanbevolen voor privacy en Nederlandse TV in het buitenland.",
      de: "Hohe Internetfreiheit. 14 Eyes Mitglied. VPN empfohlen für Datenschutz.",
      es: "Alta libertad de internet. Miembro de 14 Eyes. VPN recomendado para privacidad.",
      fr: "Grande liberté d'internet. Membre des 14 Eyes. VPN recommandé pour la confidentialité.",
      zh: "高度互联网自由。14眼联盟成员。建议使用VPN保护隐私并在国外观看荷兰电视。",
      ja: "高いインターネットの自由。14アイズのメンバー。プライバシーと海外でのオランダのテレビ視聴のためにVPNを推奨。",
      ko: "높은 인터넷 자유. 14 아이즈 회원국. 개인정보 보호 및 해외에서 네덜란드 TV 시청을 위해 VPN 권장.",
      th: "อิสระทางอินเทอร์เน็ตสูง สมาชิก 14 Eyes แนะนำ VPN สำหรับความเป็นส่วนตัวและการสตรีมทีวีดัตช์ในต่างประเทศ"
    },
  },
];

const content = {
  en: {
    badge: "Updated November 2025",
    title: "VPN Guides by Country",
    subtitle: "Find VPNs that work in your location with our research-backed country guides",
    intro: "Internet freedom varies dramatically by country. Some nations heavily restrict VPN access, while others embrace online privacy. Our guides help you find VPNs that actually work.",
    countriesTitle: "Select Your Country",
    restrictedLabel: "Restricted",
    legalLabel: "Legal",
    regulatedLabel: "Regulated",
    viewGuide: "View Guide",
    moreCountries: "More Country Guides Coming Soon",
    moreCountriesText: "We're researching VPN situations in more countries including Iran, India, Pakistan, Vietnam, and Saudi Arabia.",
  },
  nl: {
    badge: "Bijgewerkt november 2025",
    title: "VPN Gidsen per Land",
    subtitle: "Vind VPNs die werken in jouw locatie met onze onderzoeksgebaseerde landgidsen",
    intro: "Internetvrijheid varieert enorm per land. Sommige landen beperken VPN-toegang zwaar, anderen omarmen online privacy. Onze gidsen helpen je VPNs te vinden die echt werken.",
    countriesTitle: "Selecteer Je Land",
    restrictedLabel: "Beperkt",
    legalLabel: "Legaal",
    regulatedLabel: "Gereguleerd",
    viewGuide: "Bekijk Gids",
    moreCountries: "Meer Landgidsen Binnenkort",
    moreCountriesText: "We onderzoeken VPN-situaties in meer landen waaronder Iran, India, Pakistan, Vietnam en Saoedi-Arabië.",
  },
  de: {
    badge: "Aktualisiert November 2025",
    title: "VPN-Länderführer",
    subtitle: "Finden Sie VPNs, die an Ihrem Standort funktionieren, mit unseren forschungsbasierten Länderführern",
    intro: "Internetfreiheit variiert dramatisch von Land zu Land. Einige Nationen schränken den VPN-Zugang stark ein, während andere Online-Privatsphäre begrüßen. Unsere Leitfäden helfen Ihnen, VPNs zu finden, die tatsächlich funktionieren.",
    countriesTitle: "Wählen Sie Ihr Land",
    restrictedLabel: "Eingeschränkt",
    legalLabel: "Legal",
    regulatedLabel: "Reguliert",
    viewGuide: "Leitfaden anzeigen",
    moreCountries: "Weitere Länderführer folgen bald",
    moreCountriesText: "Wir erforschen VPN-Situationen in weiteren Ländern einschließlich Iran, Indien, Pakistan, Vietnam und Saudi-Arabien.",
  },
  es: {
    badge: "Actualizado noviembre 2025",
    title: "Guías de VPN por País",
    subtitle: "Encuentra VPNs que funcionen en tu ubicación con nuestras guías de países basadas en investigación",
    intro: "La libertad de internet varía dramáticamente según el país. Algunas naciones restringen fuertemente el acceso a VPN, mientras que otras adoptan la privacidad en línea. Nuestras guías te ayudan a encontrar VPNs que realmente funcionan.",
    countriesTitle: "Selecciona tu País",
    restrictedLabel: "Restringido",
    legalLabel: "Legal",
    regulatedLabel: "Regulado",
    viewGuide: "Ver Guía",
    moreCountries: "Más Guías de Países Próximamente",
    moreCountriesText: "Estamos investigando situaciones de VPN en más países incluyendo Irán, India, Pakistán, Vietnam y Arabia Saudita.",
  },
  fr: {
    badge: "Mis à jour novembre 2025",
    title: "Guides VPN par Pays",
    subtitle: "Trouvez des VPN qui fonctionnent dans votre pays avec nos guides basés sur la recherche",
    intro: "La liberté d'internet varie considérablement selon les pays. Certaines nations restreignent fortement l'accès aux VPN, tandis que d'autres adoptent la confidentialité en ligne. Nos guides vous aident à trouver des VPN qui fonctionnent réellement.",
    countriesTitle: "Sélectionnez votre Pays",
    restrictedLabel: "Restreint",
    legalLabel: "Légal",
    regulatedLabel: "Réglementé",
    viewGuide: "Voir le Guide",
    moreCountries: "Plus de Guides de Pays Bientôt",
    moreCountriesText: "Nous recherchons les situations VPN dans d'autres pays, notamment l'Iran, l'Inde, le Pakistan, le Vietnam et l'Arabie Saoudite.",
  },
  zh: {
    badge: "2025年11月更新",
    title: "按国家/地区划分的VPN指南",
    subtitle: "通过我们基于研究的国家/地区指南，找到适合您所在位置的VPN",
    intro: "互联网自由因国家/地区而异。一些国家严格限制VPN访问，而另一些国家则拥抱在线隐私。我们的指南帮助您找到真正有效的VPN。",
    countriesTitle: "选择您的国家/地区",
    restrictedLabel: "受限",
    legalLabel: "合法",
    regulatedLabel: "受监管",
    viewGuide: "查看指南",
    moreCountries: "更多国家/地区指南即将推出",
    moreCountriesText: "我们正在研究更多国家/地区的VPN情况，包括伊朗、印度、巴基斯坦、越南和沙特阿拉伯。",
  },
  ja: {
    badge: "2025年11月更新",
    title: "国別VPNガイド",
    subtitle: "研究に基づいた国別ガイドで、あなたの地域で使えるVPNを見つけましょう",
    intro: "インターネットの自由は国によって大きく異なります。VPNアクセスを厳しく制限する国もあれば、オンラインプライバシーを受け入れる国もあります。私たちのガイドは、実際に機能するVPNを見つけるのに役立ちます。",
    countriesTitle: "国を選択",
    restrictedLabel: "制限あり",
    legalLabel: "合法",
    regulatedLabel: "規制あり",
    viewGuide: "ガイドを見る",
    moreCountries: "さらに多くの国別ガイドが近日公開",
    moreCountriesText: "イラン、インド、パキスタン、ベトナム、サウジアラビアなど、さらに多くの国のVPN状況を調査中です。",
  },
  ko: {
    badge: "2025년 11월 업데이트",
    title: "국가별 VPN 가이드",
    subtitle: "연구 기반 국가 가이드로 귀하의 위치에서 작동하는 VPN을 찾으세요",
    intro: "인터넷 자유는 국가마다 크게 다릅니다. 일부 국가는 VPN 접속을 엄격히 제한하는 반면, 다른 국가는 온라인 프라이버시를 수용합니다. 우리의 가이드는 실제로 작동하는 VPN을 찾는 데 도움이 됩니다.",
    countriesTitle: "국가 선택",
    restrictedLabel: "제한됨",
    legalLabel: "합법",
    regulatedLabel: "규제됨",
    viewGuide: "가이드 보기",
    moreCountries: "더 많은 국가 가이드 곧 공개",
    moreCountriesText: "이란, 인도, 파키스탄, 베트남, 사우디아라비아를 포함한 더 많은 국가의 VPN 상황을 조사하고 있습니다.",
  },
  th: {
    badge: "อัปเดตพฤศจิกายน 2025",
    title: "คู่มือ VPN ตามประเทศ",
    subtitle: "ค้นหา VPN ที่ใช้งานได้ในพื้นที่ของคุณด้วยคู่มือประเทศที่ได้รับการสนับสนุนจากการวิจัยของเรา",
    intro: "อิสรภาพทางอินเทอร์เน็ตแตกต่างกันอย่างมากในแต่ละประเทศ บางประเทศจำกัดการเข้าถึง VPN อย่างหนัก ในขณะที่ประเทศอื่นๆ รับเอาความเป็นส่วนตัวออนไลน์ คู่มือของเราช่วยคุณค้นหา VPN ที่ใช้งานได้จริง",
    countriesTitle: "เลือกประเทศของคุณ",
    restrictedLabel: "ถูกจำกัด",
    legalLabel: "ถูกกฎหมาย",
    regulatedLabel: "มีการควบคุม",
    viewGuide: "ดูคู่มือ",
    moreCountries: "คู่มือประเทศเพิ่มเติมเร็วๆ นี้",
    moreCountriesText: "เรากำลังศึกษาสถานการณ์ VPN ในประเทศเพิ่มเติม รวมถึงอิหร่าน อินเดีย ปากีสถาน เวียดนาม และซาอุดีอาระเบีย",
  },
};

export default async function CountriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = content[locale as keyof typeof content] || content.en;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "restricted":
        return (
          <Badge className="bg-red-500 text-white">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {t.restrictedLabel}
          </Badge>
        );
      case "legal-restricted":
      case "legal-blocked":
        return (
          <Badge className="bg-yellow-500 text-yellow-950">
            <Shield className="h-3 w-3 mr-1" />
            {t.regulatedLabel}
          </Badge>
        );
      case "legal":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            {t.legalLabel}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="h-12 w-12 text-primary" />
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

      {/* Intro */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground">{t.intro}</p>
          </div>
        </div>
      </section>

      {/* Country Grid */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t.countriesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="group"
              >
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <span className="text-5xl">{country.flag}</span>
                        {getStatusBadge(country.status)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {country.name[locale as keyof typeof country.name] || country.name.en}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {country.statusText[locale as keyof typeof country.statusText] || country.statusText.en}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {country.description[locale as keyof typeof country.description] || country.description.en}
                      </p>
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        {t.viewGuide}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">{t.moreCountries}</h2>
            <p className="text-muted-foreground">{t.moreCountriesText}</p>
            <div className="flex justify-center gap-4 mt-6">
              <span className="text-3xl opacity-50">🇮🇷</span>
              <span className="text-3xl opacity-50">🇮🇳</span>
              <span className="text-3xl opacity-50">🇵🇰</span>
              <span className="text-3xl opacity-50">🇻🇳</span>
              <span className="text-3xl opacity-50">🇸🇦</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
