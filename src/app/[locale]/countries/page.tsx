import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { generateAlternates } from "@/lib/seo-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { RelatedPages } from "@/components/seo/related-pages";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getAllDynamicCountries } from "@/lib/country-data";
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

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "VPN by Country 2026: Find VPNs That Work in Your Location | ZeroToVPN",
    nl: "VPN per Land 2026: Vind VPNs Die Werken in Jouw Locatie | ZeroToVPN",
    de: "VPN nach Land 2026: Finden Sie VPNs für Ihren Standort | ZeroToVPN",
    es: "VPN por País 2026: Encuentra VPNs que Funcionan en tu Ubicación | ZeroToVPN",
    fr: "VPN par Pays 2026: Trouvez des VPN qui Fonctionnent dans Votre Pays | ZeroToVPN",
    zh: "2026年按国家/地区选择VPN：找到适合您所在位置的VPN | ZeroToVPN",
    ja: "国別VPN 2026：あなたの地域で使えるVPNを見つける | ZeroToVPN",
    ko: "국가별 VPN 2026: 당신의 위치에서 작동하는 VPN 찾기 | ZeroToVPN",
    th: "VPN ตามประเทศ 2026: ค้นหา VPN ที่ใช้งานได้ในพื้นที่ของคุณ | ZeroToVPN",
  };

  const descriptions: Record<string, string> = {
    en: "Find the best VPN for your country. Expert guides for 50+ countries including USA, UK, Germany, Japan, Australia, Brazil, and more. Research-backed recommendations.",
    nl: "Vind de beste VPN voor jouw land. Expert gidsen voor 50+ landen waaronder VS, VK, Duitsland, Japan, Australië, Brazilië en meer.",
    de: "Finden Sie das beste VPN für Ihr Land. Expertenleitfäden für 50+ Länder einschließlich USA, UK, Deutschland, Japan, Australien, Brasilien und mehr.",
    es: "Encuentra el mejor VPN para tu país. Guías expertas para 50+ países incluyendo EE.UU., Reino Unido, Alemania, Japón, Australia, Brasil y más.",
    fr: "Trouvez le meilleur VPN pour votre pays. Guides experts pour 50+ pays dont les USA, le Royaume-Uni, l'Allemagne, le Japon, l'Australie, le Brésil et plus.",
    zh: "为您的国家/地区找到最佳VPN。50+国家的专家指南，包括美国、英国、德国、日本、澳大利亚、巴西等。基于研究的推荐。",
    ja: "あなたの国に最適なVPNを見つけましょう。アメリカ、イギリス、ドイツ、日本、オーストラリア、ブラジルなど50ヶ国以上の専門家ガイド。研究に基づく推奨。",
    ko: "귀하의 국가에 가장 적합한 VPN을 찾으세요. 미국, 영국, 독일, 일본, 호주, 브라질 등 50개 이상의 국가에 대한 전문가 가이드. 연구 기반 권장 사항.",
    th: "ค้นหา VPN ที่ดีที่สุดสำหรับประเทศของคุณ คู่มือผู้เชี่ยวชาญสำหรับ 50+ ประเทศ รวมถึงสหรัฐอเมริกา สหราชอาณาจักร เยอรมนี ญี่ปุ่น ออสเตรเลีย บราซิล และอื่นๆ คำแนะนำที่ได้รับการสนับสนุนจากการวิจัย",
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
    alternates: generateAlternates("/countries", locale),
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
    slug: "iran",
    flag: "🇮🇷",
    name: { en: "Iran", nl: "Iran", de: "Iran", es: "Irán", fr: "Iran", zh: "伊朗", ja: "イラン", ko: "이란", th: "อิหร่าน" },
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
      en: "One of strictest censorship systems. DPI blocks most VPNs. Obfuscation technology essential.",
      nl: "Een van de strengste censuursystemen. DPI blokkeert de meeste VPNs. Obfuscatie-technologie essentieel.",
      de: "Eines der strengsten Zensursysteme. DPI blockiert die meisten VPNs. Verschleierungstechnologie unerlässlich.",
      es: "Uno de los sistemas de censura más estrictos. DPI bloquea la mayoría de VPNs. Tecnología de ofuscación esencial.",
      fr: "L'un des systèmes de censure les plus stricts. Le DPI bloque la plupart des VPN. Technologie d'obfuscation essentielle.",
      zh: "最严格的审查系统之一。DPI阻止大多数VPN。混淆技术至关重要。",
      ja: "最も厳しい検閲システムの1つ。DPIがほとんどのVPNをブロック。難読化技術が不可欠。",
      ko: "가장 엄격한 검열 시스템 중 하나. DPI가 대부분의 VPN을 차단. 난독화 기술 필수.",
      th: "หนึ่งในระบบเซ็นเซอร์ที่เข้มงวดที่สุด DPI บล็อก VPN ส่วนใหญ่ เทคโนโลยีการปิดบังจำเป็นอย่างยิ่ง"
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
  {
    slug: "india",
    flag: "🇮🇳",
    name: { en: "India", nl: "India", de: "Indien", es: "India", fr: "Inde", zh: "印度", ja: "インド", ko: "인도", th: "อินเดีย" },
    status: "legal-restricted",
    statusText: {
      en: "Legal but monitored",
      nl: "Legaal maar gemonitord",
      de: "Legal aber überwacht",
      es: "Legal pero monitoreado",
      fr: "Légal mais surveillé",
      zh: "合法但受监控",
      ja: "合法だが監視あり",
      ko: "합법이지만 모니터링됨",
      th: "ถูกกฎหมายแต่มีการเฝ้าระวัง"
    },
    description: {
      en: "VPNs legal but CERT-In data retention rules drove providers to remove Indian servers. Internet shutdowns common.",
      nl: "VPNs legaal maar CERT-In dataretentieregels dwongen providers Indiase servers te verwijderen. Internetafsluitingen komen vaak voor.",
      de: "VPNs legal, aber CERT-In-Datenspeicherungsregeln zwangen Anbieter, indische Server zu entfernen. Internet-Abschaltungen häufig.",
      es: "VPNs legales pero las reglas de retención de datos de CERT-In obligaron a los proveedores a eliminar servidores indios.",
      fr: "VPN légaux mais les règles de rétention de données du CERT-In ont poussé les fournisseurs à retirer leurs serveurs indiens.",
      zh: "VPN合法，但CERT-In数据保留规则迫使提供商移除印度服务器。互联网关闭事件频繁。",
      ja: "VPNは合法ですが、CERT-Inのデータ保持規則によりプロバイダーがインドのサーバーを撤去。インターネット遮断が頻繁。",
      ko: "VPN은 합법이지만 CERT-In 데이터 보존 규정으로 인해 제공업체가 인도 서버를 제거했습니다. 인터넷 차단이 빈번합니다.",
      th: "VPN ถูกกฎหมายแต่กฎการเก็บรักษาข้อมูลของ CERT-In ทำให้ผู้ให้บริการถอนเซิร์ฟเวอร์อินเดียออก การปิดอินเทอร์เน็ตเกิดขึ้นบ่อย"
    },
  },
  {
    slug: "pakistan",
    flag: "🇵🇰",
    name: { en: "Pakistan", nl: "Pakistan", de: "Pakistan", es: "Pakistán", fr: "Pakistan", zh: "巴基斯坦", ja: "パキスタン", ko: "파키스탄", th: "ปากีสถาน" },
    status: "legal-blocked",
    statusText: {
      en: "Legal, many sites blocked",
      nl: "Legaal, veel sites geblokkeerd",
      de: "Legal, viele Seiten gesperrt",
      es: "Legal, muchos sitios bloqueados",
      fr: "Légal, nombreux sites bloqués",
      zh: "合法，但许多网站被封锁",
      ja: "合法だが多くのサイトがブロック",
      ko: "합법, 많은 사이트 차단됨",
      th: "ถูกกฎหมาย แต่หลายเว็บถูกบลอก"
    },
    description: {
      en: "PTA blocks social media during unrest. VPN use legal but ISP-level throttling common. YouTube was blocked for years.",
      nl: "PTA blokkeert sociale media tijdens onrust. VPN-gebruik legaal maar ISP-throttling komt vaak voor.",
      de: "PTA blockiert soziale Medien bei Unruhen. VPN-Nutzung legal, aber ISP-Drosselung häufig.",
      es: "La PTA bloquea redes sociales durante disturbios. Uso de VPN legal pero la limitación por ISP es común.",
      fr: "La PTA bloque les réseaux sociaux lors de troubles. Utilisation de VPN légale mais limitation par les FAI fréquente.",
      zh: "PTA在动荡期间封锁社交媒体。VPN使用合法，但ISP级别的限速很常见。YouTube曾被封锁多年。",
      ja: "PTAは騒乱時にソーシャルメディアをブロックします。VPNの使用は合法ですが、ISPレベルのスロットリングが一般的です。",
      ko: "PTA는 소요 시 소셜 미디어를 차단합니다. VPN 사용은 합법이지만 ISP 수준의 스로틀링이 일반적입니다.",
      th: "PTA บลอกโซเชียลมีเดียในช่วงความไม่สงบ การใช้ VPN ถูกกฎหมายแต่ ISP มักจำกัดความเร็ว YouTube เคยถูกบลอกหลายปี"
    },
  },
  {
    slug: "egypt",
    flag: "🇪🇬",
    name: { en: "Egypt", nl: "Egypte", de: "Ägypten", es: "Egipto", fr: "Égypte", zh: "埃及", ja: "エジプト", ko: "이집트", th: "อียิปต์" },
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
      en: "500+ websites blocked. VoIP services restricted by telecoms. VPN use legal but some protocols blocked.",
      nl: "500+ websites geblokkeerd. VoIP-diensten beperkt door telecoms. VPN-gebruik legaal maar sommige protocollen geblokkeerd.",
      de: "500+ Websites blockiert. VoIP-Dienste von Telekommunikationsunternehmen eingeschränkt. VPN-Nutzung legal, aber einige Protokolle blockiert.",
      es: "500+ sitios web bloqueados. Servicios VoIP restringidos por telecoms. Uso de VPN legal pero algunos protocolos bloqueados.",
      fr: "500+ sites web bloqués. Services VoIP restreints par les télécoms. Utilisation de VPN légale mais certains protocoles bloqués.",
      zh: "500+网站被封锁。电信运营商限制VoIP服务。VPN使用合法，但某些协议被封锁。",
      ja: "500以上のウェブサイトがブロック。通信会社によりVoIPサービスが制限。VPNの使用は合法だが一部のプロトコルがブロック。",
      ko: "500개 이상의 웹사이트가 차단됩니다. 통신사에 의해 VoIP 서비스가 제한됩니다. VPN 사용은 합법이지만 일부 프로토콜이 차단됩니다.",
      th: "เว็บไซต์กว่า 500 แห่งถูกบลอก บริการ VoIP ถูกจำกัดโดยบริษัทโทรคมนาคม การใช้ VPN ถูกกฎหมายแต่บางโปรโตคอลถูกบลอก"
    },
  },
  {
    slug: "indonesia",
    flag: "🇮🇩",
    name: { en: "Indonesia", nl: "Indonesië", de: "Indonesien", es: "Indonesia", fr: "Indonésie", zh: "印度尼西亚", ja: "インドネシア", ko: "인도네시아", th: "อินโดนีเซีย" },
    status: "legal-blocked",
    statusText: {
      en: "Legal, content blocked",
      nl: "Legaal, content geblokkeerd",
      de: "Legal, Inhalte gesperrt",
      es: "Legal, contenido bloqueado",
      fr: "Légal, contenu bloqué",
      zh: "合法，但内容被封锁",
      ja: "合法だがコンテンツがブロック",
      ko: "합법, 콘텐츠 차단됨",
      th: "ถูกกฎหมาย เนื้อหาถูกบลอก"
    },
    description: {
      en: "Reddit, Vimeo blocked since 2014. Trust Positive system filters content. VPN use fully legal and widely used.",
      nl: "Reddit, Vimeo geblokkeerd sinds 2014. Trust Positive systeem filtert content. VPN-gebruik volledig legaal en wijdverbreid.",
      de: "Reddit, Vimeo seit 2014 blockiert. Trust Positive System filtert Inhalte. VPN-Nutzung vollständig legal und weit verbreitet.",
      es: "Reddit, Vimeo bloqueados desde 2014. Sistema Trust Positive filtra contenido. Uso de VPN totalmente legal y ampliamente utilizado.",
      fr: "Reddit, Vimeo bloqués depuis 2014. Le système Trust Positive filtre le contenu. Utilisation de VPN totalement légale et largement répandue.",
      zh: "Reddit、Vimeo自2014年起被封锁。Trust Positive系统过滤内容。VPN使用完全合法且广泛使用。",
      ja: "Reddit、Vimeoは2014年以降ブロックされています。Trust Positiveシステムがコンテンツをフィルタリング。VPNの使用は完全に合法で広く使用されています。",
      ko: "Reddit, Vimeo가 2014년부터 차단되었습니다. Trust Positive 시스템이 콘텐츠를 필터링합니다. VPN 사용은 완전히 합법이며 널리 사용됩니다.",
      th: "Reddit, Vimeo ถูกบลอกตั้งแต่ปี 2014 ระบบ Trust Positive กรองเนื้อหา การใช้ VPN ถูกกฎหมายอย่างสมบูรณ์และใช้กันอย่างแพร่หลาย"
    },
  },
  {
    slug: "saudi-arabia",
    flag: "🇸🇦",
    name: { en: "Saudi Arabia", nl: "Saoedi-Arabië", de: "Saudi-Arabien", es: "Arabia Saudita", fr: "Arabie Saoudite", zh: "沙特阿拉伯", ja: "サウジアラビア", ko: "사우디아라비아", th: "ซาอุดีอาระเบีย" },
    status: "legal-restricted",
    statusText: {
      en: "Legal but filtered",
      nl: "Legaal maar gefilterd",
      de: "Legal aber gefiltert",
      es: "Legal pero filtrado",
      fr: "Légal mais filtré",
      zh: "合法但受过滤",
      ja: "合法だがフィルタリングあり",
      ko: "합법이지만 필터링됨",
      th: "ถูกกฎหมายแต่มีการกรอง"
    },
    description: {
      en: "CITC filters 400,000+ websites. VoIP restrictions apply. VPN use legal for legitimate purposes but penalties for misuse.",
      nl: "CITC filtert 400.000+ websites. VoIP-beperkingen van toepassing. VPN-gebruik legaal voor legitieme doeleinden.",
      de: "CITC filtert 400.000+ Websites. VoIP-Einschränkungen gelten. VPN-Nutzung legal für legitime Zwecke.",
      es: "CITC filtra 400.000+ sitios web. Se aplican restricciones de VoIP. Uso de VPN legal para fines legítimos.",
      fr: "La CITC filtre plus de 400 000 sites web. Les restrictions VoIP s'appliquent. Utilisation de VPN légale pour des fins légitimes.",
      zh: "CITC过滤40万+网站。VoIP限制适用。VPN用于合法目的是合法的，但滥用会受到处罚。",
      ja: "CITCが40万以上のウェブサイトをフィルタリング。VoIP制限が適用。正当な目的でのVPN使用は合法ですが、不正使用には罰則があります。",
      ko: "CITC가 40만 개 이상의 웹사이트를 필터링합니다. VoIP 제한이 적용됩니다. 합법적 목적의 VPN 사용은 합법이지만 오용 시 처벌됩니다.",
      th: "CITC กรองเว็บไซต์กว่า 400,000 แห่ง มีข้อจำกัด VoIP การใช้ VPN ถูกกฎหมายสำหรับวัตถุประสงค์ที่ถูกต้องแต่มีบทลงโทษสำหรับการใช้งานผิด"
    },
  },
  {
    slug: "vietnam",
    flag: "🇻🇳",
    name: { en: "Vietnam", nl: "Vietnam", de: "Vietnam", es: "Vietnam", fr: "Vietnam", zh: "越南", ja: "ベトナム", ko: "베트남", th: "เวียดนาม" },
    status: "restricted",
    statusText: {
      en: "Restricted",
      nl: "Beperkt",
      de: "Eingeschränkt",
      es: "Restringido",
      fr: "Restreint",
      zh: "受限",
      ja: "制限あり",
      ko: "제한됨",
      th: "ถูกจำกัด"
    },
    description: {
      en: "2018 Cybersecurity Law requires data localization. Facebook periodically blocked. Journalists targeted. VPN use in a gray area.",
      nl: "Cybersecuritywet van 2018 vereist datalokalisatie. Facebook periodiek geblokkeerd. Journalisten als doelwit.",
      de: "Cybersicherheitsgesetz 2018 erfordert Datenlokalisierung. Facebook zeitweise blockiert. Journalisten ins Visier genommen.",
      es: "La Ley de Ciberseguridad de 2018 requiere localización de datos. Facebook bloqueado periódicamente. Periodistas perseguidos.",
      fr: "La loi sur la cybersécurité de 2018 exige la localisation des données. Facebook périodiquement bloqué. Journalistes ciblés.",
      zh: "2018年网络安全法要求数据本地化。Facebook间歇性被封锁。记者成为目标。VPN使用处于灰色地带。",
      ja: "2018年サイバーセキュリティ法がデータの現地化を要求。Facebookが定期的にブロック。ジャーナリストが標的に。VPN使用はグレーゾーン。",
      ko: "2018년 사이버보안법으로 데이터 현지화가 요구됩니다. Facebook이 주기적으로 차단됩니다. 기자들이 표적이 됩니다. VPN 사용은 회색 지대입니다.",
      th: "กฎหมายความปลอดภัยทางไซเบอร์ปี 2018 ต้องการการจัดเก็บข้อมูลในประเทศ Facebook ถูกบลอกเป็นระยะ นักข่าวถูกกำหนดเป้าหมาย การใช้ VPN อยู่ในพื้นที่สีเทา"
    },
  },
];

const content = {
  en: {
    badge: "Updated February 2026",
    title: "VPN Guides by Country",
    subtitle: "Find VPNs that work in your location with our research-backed country guides",
    intro: "Internet freedom varies dramatically by country. Some nations heavily restrict VPN access, while others embrace online privacy. Our guides help you find VPNs that actually work.",
    countriesTitle: "Select Your Country",
    restrictedLabel: "Restricted",
    legalLabel: "Legal",
    regulatedLabel: "Regulated",
    viewGuide: "View Guide",
    moreCountries: "More Country Guides",
  },
  nl: {
    badge: "Bijgewerkt februari 2026",
    title: "VPN Gidsen per Land",
    subtitle: "Vind VPNs die werken in jouw locatie met onze onderzoeksgebaseerde landgidsen",
    intro: "Internetvrijheid varieert enorm per land. Sommige landen beperken VPN-toegang zwaar, anderen omarmen online privacy. Onze gidsen helpen je VPNs te vinden die echt werken.",
    countriesTitle: "Selecteer Je Land",
    restrictedLabel: "Beperkt",
    legalLabel: "Legaal",
    regulatedLabel: "Gereguleerd",
    viewGuide: "Bekijk Gids",
    moreCountries: "Meer Landgidsen",
  },
  de: {
    badge: "Aktualisiert Februar 2026",
    title: "VPN-Länderführer",
    subtitle: "Finden Sie VPNs, die an Ihrem Standort funktionieren, mit unseren forschungsbasierten Länderführern",
    intro: "Internetfreiheit variiert dramatisch von Land zu Land. Einige Nationen schränken den VPN-Zugang stark ein, während andere Online-Privatsphäre begrüßen. Unsere Leitfäden helfen Ihnen, VPNs zu finden, die tatsächlich funktionieren.",
    countriesTitle: "Wählen Sie Ihr Land",
    restrictedLabel: "Eingeschränkt",
    legalLabel: "Legal",
    regulatedLabel: "Reguliert",
    viewGuide: "Leitfaden anzeigen",
    moreCountries: "Weitere Länderführer",
  },
  es: {
    badge: "Actualizado febrero 2026",
    title: "Guías de VPN por País",
    subtitle: "Encuentra VPNs que funcionen en tu ubicación con nuestras guías de países basadas en investigación",
    intro: "La libertad de internet varía dramáticamente según el país. Algunas naciones restringen fuertemente el acceso a VPN, mientras que otras adoptan la privacidad en línea. Nuestras guías te ayudan a encontrar VPNs que realmente funcionan.",
    countriesTitle: "Selecciona tu País",
    restrictedLabel: "Restringido",
    legalLabel: "Legal",
    regulatedLabel: "Regulado",
    viewGuide: "Ver Guía",
    moreCountries: "Más Guías de Países",
  },
  fr: {
    badge: "Mis à jour février 2026",
    title: "Guides VPN par Pays",
    subtitle: "Trouvez des VPN qui fonctionnent dans votre pays avec nos guides basés sur la recherche",
    intro: "La liberté d'internet varie considérablement selon les pays. Certaines nations restreignent fortement l'accès aux VPN, tandis que d'autres adoptent la confidentialité en ligne. Nos guides vous aident à trouver des VPN qui fonctionnent réellement.",
    countriesTitle: "Sélectionnez votre Pays",
    restrictedLabel: "Restreint",
    legalLabel: "Légal",
    regulatedLabel: "Réglementé",
    viewGuide: "Voir le Guide",
    moreCountries: "Plus de Guides de Pays",
  },
  zh: {
    badge: "2026年2月更新",
    title: "按国家/地区划分的VPN指南",
    subtitle: "通过我们基于研究的国家/地区指南，找到适合您所在位置的VPN",
    intro: "互联网自由因国家/地区而异。一些国家严格限制VPN访问，而另一些国家则拥抱在线隐私。我们的指南帮助您找到真正有效的VPN。",
    countriesTitle: "选择您的国家/地区",
    restrictedLabel: "受限",
    legalLabel: "合法",
    regulatedLabel: "受监管",
    viewGuide: "查看指南",
    moreCountries: "更多国家/地区指南",
  },
  ja: {
    badge: "2026年2月更新",
    title: "国別VPNガイド",
    subtitle: "研究に基づいた国別ガイドで、あなたの地域で使えるVPNを見つけましょう",
    intro: "インターネットの自由は国によって大きく異なります。VPNアクセスを厳しく制限する国もあれば、オンラインプライバシーを受け入れる国もあります。私たちのガイドは、実際に機能するVPNを見つけるのに役立ちます。",
    countriesTitle: "国を選択",
    restrictedLabel: "制限あり",
    legalLabel: "合法",
    regulatedLabel: "規制あり",
    viewGuide: "ガイドを見る",
    moreCountries: "その他の国別ガイド",
  },
  ko: {
    badge: "2026년 2월 업데이트",
    title: "국가별 VPN 가이드",
    subtitle: "연구 기반 국가 가이드로 귀하의 위치에서 작동하는 VPN을 찾으세요",
    intro: "인터넷 자유는 국가마다 크게 다릅니다. 일부 국가는 VPN 접속을 엄격히 제한하는 반면, 다른 국가는 온라인 프라이버시를 수용합니다. 우리의 가이드는 실제로 작동하는 VPN을 찾는 데 도움이 됩니다.",
    countriesTitle: "국가 선택",
    restrictedLabel: "제한됨",
    legalLabel: "합법",
    regulatedLabel: "규제됨",
    viewGuide: "가이드 보기",
    moreCountries: "더 많은 국가 가이드",
  },
  th: {
    badge: "อัปเดตกุมภาพันธ์ 2026",
    title: "คู่มือ VPN ตามประเทศ",
    subtitle: "ค้นหา VPN ที่ใช้งานได้ในพื้นที่ของคุณด้วยคู่มือประเทศที่ได้รับการสนับสนุนจากการวิจัยของเรา",
    intro: "อิสรภาพทางอินเทอร์เน็ตแตกต่างกันอย่างมากในแต่ละประเทศ บางประเทศจำกัดการเข้าถึง VPN อย่างหนัก ในขณะที่ประเทศอื่นๆ รับเอาความเป็นส่วนตัวออนไลน์ คู่มือของเราช่วยคุณค้นหา VPN ที่ใช้งานได้จริง",
    countriesTitle: "เลือกประเทศของคุณ",
    restrictedLabel: "ถูกจำกัด",
    legalLabel: "ถูกกฎหมาย",
    regulatedLabel: "มีการควบคุม",
    viewGuide: "ดูคู่มือ",
    moreCountries: "คู่มือประเทศเพิ่มเติม",
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
      {/* Breadcrumbs */}
      <div className="container pt-6">
        <BreadcrumbSchema items={[{ name: "Countries", href: "/countries" }]} />
      </div>

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

      {/* More Countries (Dynamic) */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">{t.moreCountries}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getAllDynamicCountries().map((dc) => (
              <Link
                key={dc.slug}
                href={`/countries/${dc.slug}`}
                className="group"
              >
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{dc.flag}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                          {dc.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {dc.statusLabel}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12">
        <div className="container">
          <RelatedPages
            title="Related Guides"
            pages={[
              { title: "Best VPN for China", description: "Top VPNs that bypass the Great Firewall", href: "/best/vpn-china", icon: "trophy" },
              { title: "What is a VPN?", description: "Learn how VPNs protect your privacy", href: "/guides/what-is-vpn", icon: "shield" },
              { title: "VPN Comparison", description: "Compare all VPN providers side-by-side", href: "/compare", icon: "check" },
              { title: "All VPN Reviews", description: "In-depth reviews of top VPN services", href: "/reviews", icon: "star" }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
