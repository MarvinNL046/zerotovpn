import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingStars } from "@/components/vpn/rating-stars";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { UserReviewsList } from "@/components/reviews/user-reviews-list";
import { ReviewForm } from "@/components/reviews/review-form";
import { getVpnBySlug, getAllVpns } from "@/lib/vpn-data-layer";
import { getRelatedContent, reviewLink } from "@/lib/content-links";
import { RelatedContent } from "@/components/seo/related-content";
import { getReviewsByVpnSlug, getAverageUserRating } from "@/lib/user-reviews";
import { Link } from "@/i18n/navigation";
import {
  Shield,
  Zap,
  Check,
  X,
  ArrowLeft,
  Tv,
  MessageSquare,
} from "lucide-react";
import {
  VpnReviewSchema,
  VpnProductSchema,
  BreadcrumbSchema,
  FaqSchema,
} from "@/components/structured-data";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { getShortMonthYear, getLocalizedMonthYear, OG_LOCALE_MAP } from "@/lib/seo-utils";
import { LastUpdated } from "@/components/last-updated";
import InlineAd from "@/components/ads/InlineAd";
import { AuthorBio } from "@/components/author-bio";
import { vpnProviders } from "@/lib/vpn-data";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";
import { formatAuditStatus, formatLoggingPolicy, getTransparencySnapshotForVpn } from "@/lib/vpn-transparency-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Generate a "Best For" label dynamically from VPN attributes
function generateBestFor(vpn: {
  editorChoice: boolean;
  streamingScore: number;
  speedScore: number;
  torrentSupport: boolean;
  netflixSupport: boolean;
  securityScore: number;
  noLogs: boolean;
  priceMonthly: number;
}): string {
  if (vpn.editorChoice) return "All-around use";
  if (vpn.streamingScore >= 90 && vpn.netflixSupport) return "Streaming & Netflix";
  if (vpn.speedScore >= 90) return "Speed & gaming";
  if (vpn.torrentSupport && vpn.noLogs) return "Torrenting & privacy";
  if (vpn.securityScore >= 90) return "Security & privacy";
  if (vpn.priceMonthly <= 3) return "Budget users";
  return "Everyday privacy";
}

// Generate a short verdict sentence dynamically from VPN attributes
function generateVerdictText(vpn: {
  name: string;
  overallRating: number;
  speedScore: number;
  streamingScore: number;
  netflixSupport: boolean;
  noLogs: boolean;
  editorChoice: boolean;
  torrentSupport: boolean;
}): string {
  if (vpn.editorChoice) {
    return `${vpn.name} is our top-rated VPN, excelling across speed, security, and streaming. It is one of the best all-around choices for any user.`;
  }
  if (vpn.overallRating >= 4.5) {
    const streaming = vpn.netflixSupport ? " and reliably unblocks Netflix" : "";
    return `${vpn.name} is an excellent VPN with a ${vpn.speedScore}% speed score${streaming}. A top choice for users who want premium performance without compromise.`;
  }
  if (vpn.streamingScore >= 85 && vpn.netflixSupport) {
    return `${vpn.name} is a strong pick for streaming fans, unblocking Netflix and other platforms with ease. Its ${vpn.speedScore}% speed score ensures smooth HD playback.`;
  }
  if (vpn.torrentSupport && vpn.noLogs) {
    return `${vpn.name} is well-suited for privacy-focused users and torrenters. Its strict no-logs policy and dedicated P2P servers make it a reliable privacy tool.`;
  }
  return `${vpn.name} is a solid VPN with a ${vpn.speedScore}% speed score and ${vpn.streamingScore}% streaming score, making it a reliable choice for everyday online privacy.`;
}

// FAQ translations per locale
const faqTemplates: Record<string, {
  netflix: { q: string; yesA: string; noA: string };
  cost: { q: string; a: string };
  safe: { q: string; a: string };
  trial: { q: string; a: string };
  speed: { q: string; a: string; fastest: string; aboveAvg: string; avg: string; fastestDetail: string; aboveAvgDetail: string; avgDetail: string };
  servers: { q: string; a: string };
}> = {
  en: {
    netflix: {
      q: "Does {name} work with Netflix?",
      yesA: "Yes, {name} reliably works with Netflix. With a streaming score of {streamingScore}%, it can unblock Netflix libraries from multiple countries including the US, UK, and more.",
      noA: "{name} has limited Netflix support. Its streaming score is {streamingScore}%, so results may vary depending on the server location you choose.",
    },
    cost: {
      q: "How much does {name} cost in 2026?",
      a: "{name} offers flexible pricing plans. The monthly plan costs ${priceMonthly}/month, the 1-year plan costs ${priceYearly}/month, and the best value {bestPlan}. All plans come with a {moneyBackDays}-day money-back guarantee.",
    },
    safe: {
      q: "Is {name} safe to use?",
      a: "Yes, {name} is safe. It uses {encryption} encryption{killSwitchText}, and {noLogsText}.",
    },
    trial: {
      q: "Does {name} have a free trial?",
      a: "{name} does not offer a free trial, but it comes with a {moneyBackDays}-day money-back guarantee. This gives you plenty of time to test the service risk-free and get a full refund if you are not satisfied.",
    },
    speed: {
      q: "How fast is {name}?",
      a: "{name} scores {speedScore}% in our speed tests, which places it {speedRank}. In practice this means {speedDetail}.",
      fastest: "among the fastest VPNs available",
      aboveAvg: "above average in speed",
      avg: "at average speed levels",
      fastestDetail: "minimal impact on your connection for streaming, gaming, and large downloads",
      aboveAvgDetail: "a smooth experience for most everyday tasks including HD streaming",
      avgDetail: "adequate performance for browsing and standard-definition streaming",
    },
    servers: {
      q: "How many servers does {name} have?",
      a: "{name} operates a network of {servers} servers across {countries} countries. This large network helps you find a fast nearby server and access geo-restricted content from many regions around the world.",
    },
  },
  nl: {
    netflix: {
      q: "Werkt {name} met Netflix?",
      yesA: "Ja, {name} werkt betrouwbaar met Netflix. Met een streamingscore van {streamingScore}% kan het Netflix-bibliotheken uit meerdere landen deblokkeren, waaronder de VS, het VK en meer.",
      noA: "{name} heeft beperkte Netflix-ondersteuning. De streamingscore is {streamingScore}%, dus de resultaten kunnen variëren afhankelijk van de serverlocatie die je kiest.",
    },
    cost: {
      q: "Hoeveel kost {name} in 2026?",
      a: "{name} biedt flexibele abonnementen. Het maandelijks abonnement kost ${priceMonthly}/maand, het jaarabonnement kost ${priceYearly}/maand en het voordeligste {bestPlan}. Alle abonnementen hebben een {moneyBackDays} dagen geld-terug-garantie.",
    },
    safe: {
      q: "Is {name} veilig om te gebruiken?",
      a: "Ja, {name} is veilig. Het gebruikt {encryption}-encryptie{killSwitchText} en {noLogsText}.",
    },
    trial: {
      q: "Heeft {name} een gratis proefperiode?",
      a: "{name} biedt geen gratis proefperiode, maar wel een {moneyBackDays} dagen geld-terug-garantie. Zo heb je voldoende tijd om de dienst risicovrij te testen en volledige restitutie te krijgen als je niet tevreden bent.",
    },
    speed: {
      q: "Hoe snel is {name}?",
      a: "{name} scoort {speedScore}% in onze snelheidstests, wat het {speedRank} plaatst. In de praktijk betekent dit {speedDetail}.",
      fastest: "bij de snelste VPN's op de markt",
      aboveAvg: "bovengemiddeld qua snelheid",
      avg: "op een gemiddeld snelheidsniveau",
      fastestDetail: "minimale impact op je verbinding voor streaming, gaming en grote downloads",
      aboveAvgDetail: "een soepele ervaring voor de meeste dagelijkse taken, inclusief HD-streaming",
      avgDetail: "voldoende prestaties voor surfen en streaming in standaardkwaliteit",
    },
    servers: {
      q: "Hoeveel servers heeft {name}?",
      a: "{name} beschikt over een netwerk van {servers} servers in {countries} landen. Dit uitgebreide netwerk helpt je een snelle server in de buurt te vinden en geo-geblokkeerde content uit vele regio's te openen.",
    },
  },
  de: {
    netflix: {
      q: "Funktioniert {name} mit Netflix?",
      yesA: "Ja, {name} funktioniert zuverlässig mit Netflix. Mit einem Streaming-Score von {streamingScore}% kann es Netflix-Bibliotheken aus mehreren Ländern entsperren, darunter die USA, Großbritannien und weitere.",
      noA: "{name} bietet eingeschränkte Netflix-Unterstützung. Der Streaming-Score liegt bei {streamingScore}%, sodass die Ergebnisse je nach gewähltem Serverstandort variieren können.",
    },
    cost: {
      q: "Was kostet {name} im Jahr 2026?",
      a: "{name} bietet flexible Tarife. Das Monatsabo kostet ${priceMonthly}/Monat, das Jahresabo ${priceYearly}/Monat und das günstigste {bestPlan}. Alle Tarife beinhalten eine {moneyBackDays}-Tage-Geld-zurück-Garantie.",
    },
    safe: {
      q: "Ist {name} sicher?",
      a: "Ja, {name} ist sicher. Es verwendet {encryption}-Verschlüsselung{killSwitchText} und {noLogsText}.",
    },
    trial: {
      q: "Hat {name} eine kostenlose Testversion?",
      a: "{name} bietet keine kostenlose Testversion, dafür aber eine {moneyBackDays}-Tage-Geld-zurück-Garantie. So haben Sie genug Zeit, den Dienst risikofrei zu testen und bei Unzufriedenheit eine volle Rückerstattung zu erhalten.",
    },
    speed: {
      q: "Wie schnell ist {name}?",
      a: "{name} erreicht {speedScore}% in unseren Geschwindigkeitstests und liegt damit {speedRank}. In der Praxis bedeutet das {speedDetail}.",
      fastest: "unter den schnellsten verfügbaren VPNs",
      aboveAvg: "über dem Durchschnitt",
      avg: "auf durchschnittlichem Niveau",
      fastestDetail: "minimale Auswirkungen auf Ihre Verbindung beim Streaming, Gaming und bei großen Downloads",
      aboveAvgDetail: "ein reibungsloses Erlebnis für die meisten alltäglichen Aufgaben einschließlich HD-Streaming",
      avgDetail: "ausreichende Leistung zum Surfen und Streaming in Standardqualität",
    },
    servers: {
      q: "Wie viele Server hat {name}?",
      a: "{name} betreibt ein Netzwerk von {servers} Servern in {countries} Ländern. Dieses große Netzwerk hilft Ihnen, einen schnellen Server in der Nähe zu finden und geo-beschränkte Inhalte aus vielen Regionen zu erreichen.",
    },
  },
  es: {
    netflix: {
      q: "¿Funciona {name} con Netflix?",
      yesA: "Sí, {name} funciona de manera fiable con Netflix. Con una puntuación de streaming del {streamingScore}%, puede desbloquear catálogos de Netflix de múltiples países, incluyendo EE.UU., Reino Unido y más.",
      noA: "{name} tiene soporte limitado para Netflix. Su puntuación de streaming es del {streamingScore}%, por lo que los resultados pueden variar según la ubicación del servidor que elijas.",
    },
    cost: {
      q: "¿Cuánto cuesta {name} en 2026?",
      a: "{name} ofrece planes flexibles. El plan mensual cuesta ${priceMonthly}/mes, el anual ${priceYearly}/mes y la mejor oferta {bestPlan}. Todos los planes incluyen una garantía de devolución de {moneyBackDays} días.",
    },
    safe: {
      q: "¿Es seguro usar {name}?",
      a: "Sí, {name} es seguro. Utiliza cifrado {encryption}{killSwitchText} y {noLogsText}.",
    },
    trial: {
      q: "¿Tiene {name} prueba gratuita?",
      a: "{name} no ofrece prueba gratuita, pero incluye una garantía de devolución de {moneyBackDays} días. Esto te da tiempo suficiente para probar el servicio sin riesgo y obtener un reembolso completo si no quedas satisfecho.",
    },
    speed: {
      q: "¿Qué tan rápido es {name}?",
      a: "{name} obtiene un {speedScore}% en nuestras pruebas de velocidad, lo que lo sitúa {speedRank}. En la práctica esto significa {speedDetail}.",
      fastest: "entre los VPN más rápidos disponibles",
      aboveAvg: "por encima del promedio en velocidad",
      avg: "en niveles de velocidad promedio",
      fastestDetail: "un impacto mínimo en tu conexión para streaming, gaming y descargas grandes",
      aboveAvgDetail: "una experiencia fluida para la mayoría de las tareas diarias, incluyendo streaming en HD",
      avgDetail: "un rendimiento adecuado para navegación y streaming en calidad estándar",
    },
    servers: {
      q: "¿Cuántos servidores tiene {name}?",
      a: "{name} opera una red de {servers} servidores en {countries} países. Esta amplia red te ayuda a encontrar un servidor rápido cercano y acceder a contenido con restricciones geográficas de muchas regiones.",
    },
  },
  fr: {
    netflix: {
      q: "Est-ce que {name} fonctionne avec Netflix ?",
      yesA: "Oui, {name} fonctionne de manière fiable avec Netflix. Avec un score de streaming de {streamingScore}%, il peut débloquer les catalogues Netflix de plusieurs pays, dont les États-Unis, le Royaume-Uni et d'autres.",
      noA: "{name} a un support Netflix limité. Son score de streaming est de {streamingScore}%, les résultats peuvent donc varier selon l'emplacement du serveur choisi.",
    },
    cost: {
      q: "Combien coûte {name} en 2026 ?",
      a: "{name} propose des forfaits flexibles. L'abonnement mensuel coûte {priceMonthly}$/mois, l'annuel {priceYearly}$/mois et la meilleure offre {bestPlan}. Tous les forfaits incluent une garantie de remboursement de {moneyBackDays} jours.",
    },
    safe: {
      q: "Est-ce que {name} est sûr ?",
      a: "Oui, {name} est sûr. Il utilise le chiffrement {encryption}{killSwitchText} et {noLogsText}.",
    },
    trial: {
      q: "Est-ce que {name} a un essai gratuit ?",
      a: "{name} ne propose pas d'essai gratuit, mais offre une garantie de remboursement de {moneyBackDays} jours. Cela vous donne suffisamment de temps pour tester le service sans risque et obtenir un remboursement complet si vous n'êtes pas satisfait.",
    },
    speed: {
      q: "Quelle est la vitesse de {name} ?",
      a: "{name} obtient {speedScore}% dans nos tests de vitesse, ce qui le place {speedRank}. En pratique, cela signifie {speedDetail}.",
      fastest: "parmi les VPN les plus rapides disponibles",
      aboveAvg: "au-dessus de la moyenne en vitesse",
      avg: "à des niveaux de vitesse moyens",
      fastestDetail: "un impact minimal sur votre connexion pour le streaming, le gaming et les gros téléchargements",
      aboveAvgDetail: "une expérience fluide pour la plupart des tâches quotidiennes, y compris le streaming HD",
      avgDetail: "des performances suffisantes pour la navigation et le streaming en qualité standard",
    },
    servers: {
      q: "Combien de serveurs possède {name} ?",
      a: "{name} exploite un réseau de {servers} serveurs dans {countries} pays. Ce vaste réseau vous aide à trouver un serveur rapide à proximité et à accéder à du contenu géo-restreint du monde entier.",
    },
  },
  zh: {
    netflix: {
      q: "{name}能用Netflix吗？",
      yesA: "是的，{name}能稳定使用Netflix。凭借{streamingScore}%的流媒体评分，它可以解锁包括美国、英国在内的多个国家的Netflix内容库。",
      noA: "{name}对Netflix的支持有限。其流媒体评分为{streamingScore}%，因此效果可能因所选服务器位置而异。",
    },
    cost: {
      q: "{name}在2026年多少钱？",
      a: "{name}提供灵活的订阅方案。月付方案每月${priceMonthly}，年付方案每月${priceYearly}，最超值的{bestPlan}。所有方案均享有{moneyBackDays}天退款保证。",
    },
    safe: {
      q: "{name}安全吗？",
      a: "是的，{name}非常安全。它使用{encryption}加密{killSwitchText}，并且{noLogsText}。",
    },
    trial: {
      q: "{name}有免费试用吗？",
      a: "{name}不提供免费试用，但提供{moneyBackDays}天退款保证。这给了你充足的时间来无风险地测试服务，不满意可获得全额退款。",
    },
    speed: {
      q: "{name}速度怎么样？",
      a: "{name}在我们的速度测试中得分{speedScore}%，{speedRank}。实际使用中，这意味着{speedDetail}。",
      fastest: "位列最快VPN之列",
      aboveAvg: "速度高于平均水平",
      avg: "速度处于平均水平",
      fastestDetail: "对你的连接影响极小，流媒体、游戏和大文件下载都很流畅",
      aboveAvgDetail: "日常使用体验流畅，包括高清流媒体播放",
      avgDetail: "能满足基本的网页浏览和标清流媒体播放需求",
    },
    servers: {
      q: "{name}有多少台服务器？",
      a: "{name}在{countries}个国家运营着{servers}台服务器。这个庞大的网络帮助你找到附近的快速服务器，并访问全球各地区的地理限制内容。",
    },
  },
  ja: {
    netflix: {
      q: "{name}はNetflixで使えますか？",
      yesA: "はい、{name}はNetflixで安定して動作します。ストリーミングスコア{streamingScore}%で、アメリカ、イギリスなど複数の国のNetflixライブラリのブロックを解除できます。",
      noA: "{name}のNetflix対応は限定的です。ストリーミングスコアは{streamingScore}%で、選択するサーバーの場所によって結果が異なる場合があります。",
    },
    cost: {
      q: "{name}の2026年の料金は？",
      a: "{name}は柔軟な料金プランを提供しています。月額プランは${priceMonthly}/月、年間プランは${priceYearly}/月、最もお得な{bestPlan}。すべてのプランに{moneyBackDays}日間の返金保証が付いています。",
    },
    safe: {
      q: "{name}は安全ですか？",
      a: "はい、{name}は安全です。{encryption}暗号化を使用し{killSwitchText}、{noLogsText}。",
    },
    trial: {
      q: "{name}に無料トライアルはありますか？",
      a: "{name}には無料トライアルはありませんが、{moneyBackDays}日間の返金保証があります。リスクなくサービスをテストでき、満足できない場合は全額返金を受けられます。",
    },
    speed: {
      q: "{name}の速度は？",
      a: "{name}は速度テストで{speedScore}%を獲得し、{speedRank}に位置しています。実際の使用では{speedDetail}。",
      fastest: "最速クラスのVPNの中",
      aboveAvg: "平均以上の速度",
      avg: "平均的な速度レベル",
      fastestDetail: "ストリーミング、ゲーム、大容量ダウンロードへの影響が最小限",
      aboveAvgDetail: "HD ストリーミングを含むほとんどの日常タスクがスムーズ",
      avgDetail: "ブラウジングや標準画質ストリーミングに十分なパフォーマンス",
    },
    servers: {
      q: "{name}のサーバー数は？",
      a: "{name}は{countries}カ国に{servers}台のサーバーを運用しています。この大規模なネットワークにより、近くの高速サーバーを見つけ、世界中の地域制限コンテンツにアクセスできます。",
    },
  },
  ko: {
    netflix: {
      q: "{name}은 Netflix에서 작동하나요?",
      yesA: "네, {name}은 Netflix에서 안정적으로 작동합니다. 스트리밍 점수 {streamingScore}%로 미국, 영국 등 여러 국가의 Netflix 라이브러리를 차단 해제할 수 있습니다.",
      noA: "{name}의 Netflix 지원은 제한적입니다. 스트리밍 점수는 {streamingScore}%이며, 선택한 서버 위치에 따라 결과가 달라질 수 있습니다.",
    },
    cost: {
      q: "2026년 {name} 가격은?",
      a: "{name}은 유연한 요금제를 제공합니다. 월간 요금제는 월 ${priceMonthly}, 연간 요금제는 월 ${priceYearly}, 최고 가성비 {bestPlan}. 모든 요금제에 {moneyBackDays}일 환불 보장이 포함됩니다.",
    },
    safe: {
      q: "{name}은 안전한가요?",
      a: "네, {name}은 안전합니다. {encryption} 암호화를 사용하며{killSwitchText}, {noLogsText}.",
    },
    trial: {
      q: "{name}에 무료 체험이 있나요?",
      a: "{name}은 무료 체험을 제공하지 않지만, {moneyBackDays}일 환불 보장을 제공합니다. 위험 부담 없이 서비스를 테스트할 충분한 시간이 있으며, 불만족 시 전액 환불받을 수 있습니다.",
    },
    speed: {
      q: "{name}의 속도는?",
      a: "{name}은 속도 테스트에서 {speedScore}%를 기록하며 {speedRank}에 위치합니다. 실제 사용 시 {speedDetail}.",
      fastest: "가장 빠른 VPN 중 하나",
      aboveAvg: "평균 이상의 속도",
      avg: "평균 수준의 속도",
      fastestDetail: "스트리밍, 게임, 대용량 다운로드에 미치는 영향이 최소한",
      aboveAvgDetail: "HD 스트리밍을 포함한 대부분의 일상 작업에서 원활한 경험",
      avgDetail: "웹 서핑과 표준 화질 스트리밍에 적합한 성능",
    },
    servers: {
      q: "{name}의 서버 수는?",
      a: "{name}은 {countries}개국에 {servers}대의 서버를 운영합니다. 이 방대한 네트워크로 가까운 빠른 서버를 찾고 전 세계 지역 제한 콘텐츠에 접근할 수 있습니다.",
    },
  },
  th: {
    netflix: {
      q: "{name} ใช้กับ Netflix ได้ไหม?",
      yesA: "ได้ {name} ใช้งานกับ Netflix ได้อย่างเสถียร ด้วยคะแนนสตรีมมิ่ง {streamingScore}% สามารถปลดบล็อกคลัง Netflix จากหลายประเทศ รวมถึงสหรัฐฯ สหราชอาณาจักร และอื่นๆ",
      noA: "{name} รองรับ Netflix ได้จำกัด คะแนนสตรีมมิ่งอยู่ที่ {streamingScore}% ผลลัพธ์อาจแตกต่างกันขึ้นอยู่กับตำแหน่งเซิร์ฟเวอร์ที่คุณเลือก",
    },
    cost: {
      q: "{name} ราคาเท่าไหร่ในปี 2026?",
      a: "{name} มีแผนราคาที่ยืดหยุ่น แผนรายเดือน ${priceMonthly}/เดือน แผนรายปี ${priceYearly}/เดือน และแผนที่คุ้มค่าที่สุด {bestPlan} ทุกแผนมีการรับประกันคืนเงินภายใน {moneyBackDays} วัน",
    },
    safe: {
      q: "{name} ปลอดภัยไหม?",
      a: "ใช่ {name} ปลอดภัย ใช้การเข้ารหัส {encryption}{killSwitchText} และ{noLogsText}",
    },
    trial: {
      q: "{name} มีทดลองใช้ฟรีไหม?",
      a: "{name} ไม่มีทดลองใช้ฟรี แต่มีการรับประกันคืนเงินภายใน {moneyBackDays} วัน ทำให้คุณมีเวลาเพียงพอในการทดสอบบริการโดยไม่มีความเสี่ยง หากไม่พอใจสามารถขอเงินคืนได้เต็มจำนวน",
    },
    speed: {
      q: "{name} เร็วแค่ไหน?",
      a: "{name} ได้คะแนน {speedScore}% ในการทดสอบความเร็วของเรา ซึ่งอยู่ใน{speedRank} ในทางปฏิบัติหมายถึง{speedDetail}",
      fastest: "กลุ่ม VPN ที่เร็วที่สุด",
      aboveAvg: "ระดับเหนือค่าเฉลี่ย",
      avg: "ระดับความเร็วปานกลาง",
      fastestDetail: "ผลกระทบต่อการเชื่อมต่อน้อยมากสำหรับสตรีมมิ่ง เกม และดาวน์โหลดไฟล์ขนาดใหญ่",
      aboveAvgDetail: "ประสบการณ์ใช้งานราบรื่นสำหรับงานประจำวันรวมถึงสตรีมมิ่ง HD",
      avgDetail: "ประสิทธิภาพเพียงพอสำหรับการท่องเว็บและสตรีมมิ่งคุณภาพมาตรฐาน",
    },
    servers: {
      q: "{name} มีเซิร์ฟเวอร์กี่ตัว?",
      a: "{name} ดำเนินการเครือข่าย {servers} เซิร์ฟเวอร์ใน {countries} ประเทศ เครือข่ายขนาดใหญ่นี้ช่วยให้คุณพบเซิร์ฟเวอร์ที่เร็วใกล้ตัวและเข้าถึงเนื้อหาที่จำกัดตามภูมิภาคจากทั่วโลก",
    },
  },
};

// Generate FAQ items dynamically from VPN data with locale support
function generateFaqs(vpn: {
  name: string;
  netflixSupport: boolean;
  streamingScore: number;
  priceMonthly: number;
  priceYearly: number;
  priceTwoYear?: number | null;
  encryption: string;
  killSwitch: boolean;
  noLogs: boolean;
  moneyBackDays: number;
  speedScore: number;
  servers: number;
  countries: number;
}, locale: string = "en"): { question: string; answer: string }[] {
  const t = faqTemplates[locale] || faqTemplates.en;

  const fillTemplate = (tpl: string) =>
    tpl
      .replace(/\{name\}/g, vpn.name)
      .replace(/\{streamingScore\}/g, String(vpn.streamingScore))
      .replace(/\{priceMonthly\}/g, String(vpn.priceMonthly))
      .replace(/\{priceYearly\}/g, String(vpn.priceYearly))
      .replace(/\{encryption\}/g, vpn.encryption)
      .replace(/\{moneyBackDays\}/g, String(vpn.moneyBackDays))
      .replace(/\{speedScore\}/g, String(vpn.speedScore))
      .replace(/\{servers\}/g, vpn.servers.toLocaleString(locale === "en" ? "en-US" : locale))
      .replace(/\{countries\}/g, String(vpn.countries))
      .replace(/\{bestPlan\}/g, vpn.priceTwoYear ? `2-year plan costs $${vpn.priceTwoYear}/month` : `1-year plan at $${vpn.priceYearly}/month`)
      .replace(/\{killSwitchText\}/g, vpn.killSwitch ? (locale === "en" ? ", includes a kill switch that cuts your internet if the VPN drops" : locale === "nl" ? ", bevat een kill switch die je internet verbreekt als de VPN uitvalt" : locale === "de" ? ", enthält einen Kill Switch, der Ihre Internetverbindung trennt, wenn das VPN ausfällt" : locale === "es" ? ", incluye un kill switch que corta tu internet si la VPN se cae" : locale === "fr" ? ", inclut un kill switch qui coupe votre internet si le VPN se déconnecte" : locale === "zh" ? "，包含断网保护开关" : locale === "ja" ? "、VPN接続が切れた際にインターネットを遮断するキルスイッチを搭載" : locale === "ko" ? ", VPN 연결이 끊길 때 인터넷을 차단하는 킬 스위치 포함" : ", มี kill switch ที่ตัดอินเทอร์เน็ตหาก VPN หลุด") : "")
      .replace(/\{noLogsText\}/g, vpn.noLogs ? (locale === "en" ? "has a strict no-logs policy that has been independently audited" : locale === "nl" ? "heeft een strikt no-logs-beleid dat onafhankelijk is gecontroleerd" : locale === "de" ? "hat eine strenge No-Logs-Richtlinie, die unabhängig geprüft wurde" : locale === "es" ? "tiene una estricta política de no registros verificada de forma independiente" : locale === "fr" ? "a une politique stricte de non-journalisation vérifiée de manière indépendante" : locale === "zh" ? "拥有经过独立审计的严格无日志政策" : locale === "ja" ? "独立監査済みの厳格なノーログポリシーを持っています" : locale === "ko" ? "독립적으로 감사된 엄격한 노로그 정책을 보유" : "มีนโยบายไม่เก็บบันทึกที่ผ่านการตรวจสอบอิสระ") : (locale === "en" ? "maintains a no-logs policy for your privacy" : locale === "nl" ? "hanteert een no-logs-beleid voor je privacy" : locale === "de" ? "pflegt eine No-Logs-Richtlinie für Ihre Privatsphäre" : locale === "es" ? "mantiene una política de no registros para tu privacidad" : locale === "fr" ? "maintient une politique de non-journalisation pour votre vie privée" : locale === "zh" ? "保持无日志政策以保护您的隐私" : locale === "ja" ? "プライバシーのためにノーログポリシーを維持" : locale === "ko" ? "개인정보 보호를 위한 노로그 정책 유지" : "รักษานโยบายไม่เก็บบันทึกเพื่อความเป็นส่วนตัวของคุณ"))
      .replace(/\{speedRank\}/g, vpn.speedScore >= 90 ? t.speed.fastest : vpn.speedScore >= 75 ? t.speed.aboveAvg : t.speed.avg)
      .replace(/\{speedDetail\}/g, vpn.speedScore >= 90 ? t.speed.fastestDetail : vpn.speedScore >= 75 ? t.speed.aboveAvgDetail : t.speed.avgDetail);

  return [
    {
      question: fillTemplate(t.netflix.q),
      answer: fillTemplate(vpn.netflixSupport ? t.netflix.yesA : t.netflix.noA),
    },
    {
      question: fillTemplate(t.cost.q),
      answer: fillTemplate(t.cost.a),
    },
    {
      question: fillTemplate(t.safe.q),
      answer: fillTemplate(t.safe.a),
    },
    {
      question: fillTemplate(t.trial.q),
      answer: fillTemplate(t.trial.a),
    },
    {
      question: fillTemplate(t.speed.q),
      answer: fillTemplate(t.speed.a),
    },
    {
      question: fillTemplate(t.servers.q),
      answer: fillTemplate(t.servers.a),
    },
  ];
}

const baseUrl = "https://www.zerotovpn.com";
export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const vpn = await getVpnBySlug(slug);

  if (!vpn) {
    return { title: "VPN Not Found" };
  }

  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${prefix}/reviews/${vpn.slug}`;

  // Generate alternates for all languages
  const languages: Record<string, string> = { "x-default": `${baseUrl}/reviews/${vpn.slug}` };
  routing.locales.forEach((l) => {
    const p = l === "en" ? "" : `/${l}`;
    languages[l] = `${baseUrl}${p}/reviews/${vpn.slug}`;
  });

  const shortMonthYear = getShortMonthYear();
  const isNordVpn = vpn.slug === "nordvpn";

  // Generate locale-specific descriptions
  const descriptions: Record<string, string> = {
    en: isNordVpn
      ? `NordVPN Review 2026: We tested NordVPN for 30+ days. Speeds, security, streaming & honest verdict. Is it still the best VPN? From $2.99/mo · ${vpn.moneyBackDays}-day guarantee.`
      : `We tested ${vpn.name} for 30+ days. See speeds, security, streaming results & our honest verdict. Updated ${shortMonthYear}. ${vpn.moneyBackDays}-day money-back guarantee.`,
    nl: `Volledige ${vpn.name} review ${shortMonthYear}. ${vpn.shortDescription} Snelheid: ${vpn.speedScore}%, Beveiliging: ${vpn.securityScore}%. Vanaf $${vpn.priceTwoYear || vpn.priceYearly}/maand.`,
    de: `Vollständiger ${vpn.name} Test ${shortMonthYear}. ${vpn.shortDescription} Geschwindigkeit: ${vpn.speedScore}%, Sicherheit: ${vpn.securityScore}%. Ab $${vpn.priceTwoYear || vpn.priceYearly}/Monat.`,
    es: `Reseña completa de ${vpn.name} ${shortMonthYear}. ${vpn.shortDescription} Velocidad: ${vpn.speedScore}%, Seguridad: ${vpn.securityScore}%. Desde $${vpn.priceTwoYear || vpn.priceYearly}/mes.`,
    fr: `Avis complet sur ${vpn.name} ${shortMonthYear}. ${vpn.shortDescription} Vitesse: ${vpn.speedScore}%, Sécurité: ${vpn.securityScore}%. À partir de $${vpn.priceTwoYear || vpn.priceYearly}/mois.`,
    zh: `${vpn.name} ${shortMonthYear}完整评测。${vpn.shortDescription} 速度：${vpn.speedScore}%，安全性：${vpn.securityScore}%。每月$${vpn.priceTwoYear || vpn.priceYearly}起。`,
    ja: `${vpn.name} ${shortMonthYear}完全レビュー。${vpn.shortDescription} 速度：${vpn.speedScore}%、セキュリティ：${vpn.securityScore}%。月額$${vpn.priceTwoYear || vpn.priceYearly}から。`,
    ko: `${vpn.name} ${shortMonthYear} 완전 리뷰. ${vpn.shortDescription} 속도: ${vpn.speedScore}%, 보안: ${vpn.securityScore}%. 월 $${vpn.priceTwoYear || vpn.priceYearly}부터.`,
    th: `รีวิว ${vpn.name} ${shortMonthYear} ฉบับสมบูรณ์ ${vpn.shortDescription} ความเร็ว: ${vpn.speedScore}%, ความปลอดภัย: ${vpn.securityScore}% เริ่มต้น $${vpn.priceTwoYear || vpn.priceYearly}/เดือน`,
  };

  const titles: Record<string, string> = {
    en: isNordVpn
      ? `NordVPN Review 2026: Is It Still the Best VPN? (Tested) | ZeroToVPN`
      : `${vpn.name} Review (${shortMonthYear}) - Tested & Rated | ZeroToVPN`,
    nl: `${vpn.name} Review (${getLocalizedMonthYear("nl")}) - Eerlijke Test & Beoordeling | ZeroToVPN`,
    de: `${vpn.name} Test (${getLocalizedMonthYear("de")}) - Ehrlicher Test & Bewertung | ZeroToVPN`,
    es: `${vpn.name} Reseña (${getLocalizedMonthYear("es")}) - Prueba Honesta y Calificación | ZeroToVPN`,
    fr: `${vpn.name} Avis (${getLocalizedMonthYear("fr")}) - Test Honnête et Note | ZeroToVPN`,
    zh: `${vpn.name} 评测 (${getLocalizedMonthYear("zh")}) - 诚实测试与评分 | ZeroToVPN`,
    ja: `${vpn.name} レビュー (${getLocalizedMonthYear("ja")}) - 正直なテストと評価 | ZeroToVPN`,
    ko: `${vpn.name} 리뷰 (${getLocalizedMonthYear("ko")}) - 정직한 테스트 및 평가 | ZeroToVPN`,
    th: `รีวิว ${vpn.name} (${getLocalizedMonthYear("th")}) - ทดสอบและให้คะแนนอย่างตรงไปตรงมา | ZeroToVPN`,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: (titles[locale] || titles.en).replace(" | ZeroToVPN", ""),
    description: descriptions[locale] || descriptions.en,
    keywords: isNordVpn && locale === "en"
      ? [
          "nordvpn review",
          "nordvpn review 2026",
          "nordvpn 2026",
          "best vpn 2026",
          "nordvpn speed test",
          "nordvpn price",
          "nordvpn netflix",
          "is nordvpn worth it",
          "nordvpn vs expressvpn",
        ]
      : [
          vpn.name,
          `${vpn.name} review`,
          `${vpn.name} test`,
          `${vpn.name} 2026`,
          "VPN review",
          "VPN test",
          "best VPN",
          `${vpn.name} price`,
          `${vpn.name} speed`,
          vpn.netflixSupport ? `${vpn.name} Netflix` : "",
          vpn.torrentSupport ? `${vpn.name} torrenting` : "",
        ].filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl,
      siteName: "ZeroToVPN",
      locale: OG_LOCALE_MAP[locale] || "en_US",
      type: "article",
      images: vpn.ogImage ? [
        {
          url: vpn.ogImage,
          width: 1200,
          height: 630,
          alt: `${vpn.name} Review`,
        },
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: vpn.ogImage ? [vpn.ogImage] : undefined,
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { locale: _locale, slug } = await params;
  setRequestLocale(_locale);
  const t = await getTranslations("vpnReview");

  const vpn = await getVpnBySlug(slug);

  if (!vpn) {
    notFound();
  }

  const prefix = _locale === "en" ? "" : `/${_locale}`;
  const breadcrumbs = [
    { name: "Home", url: `${baseUrl}${prefix}` },
    { name: "Reviews", url: `${baseUrl}${prefix}/reviews` },
    { name: `${vpn.name} Review`, url: `${baseUrl}${prefix}/reviews/${vpn.slug}` },
  ];

  const faqs = generateFaqs(vpn, _locale);
  const transparency = await getTransparencySnapshotForVpn(vpn);

  // Build review links from other VPNs for cross-linking
  const allVpns = await getAllVpns();
  const reviewLinks = allVpns
    .filter((v) => v.slug !== vpn.slug)
    .slice(0, 10)
    .map((v) => reviewLink(v.slug, v.name, Number(v.overallRating)));

  const relatedLinks = getRelatedContent({
    currentHref: `/reviews/${vpn.slug}`,
    vpnSlugs: [vpn.slug],
    tags: [
      "review",
      ...(vpn.netflixSupport ? ["streaming", "netflix"] : []),
      ...(vpn.torrentSupport ? ["torrenting"] : []),
      ...(vpn.freeTier ? ["free", "budget"] : []),
      ...(vpn.speedScore >= 80 ? ["speed", "gaming"] : []),
      ...(vpn.securityScore >= 85 ? ["security", "privacy"] : []),
    ],
    currentType: "review",
    limit: 6,
    extraLinks: reviewLinks,
  });

  return (
    <>
      <VpnReviewSchema vpn={vpn} />
      <VpnProductSchema vpn={vpn} />
      <BreadcrumbSchema items={breadcrumbs} />
      <FaqSchema faqs={faqs} />

      {/* Hero Section — dark gradient */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Screenshot strip */}
        {vpn.screenshot && (
          <div className="relative h-48 md:h-64 w-full overflow-hidden">
            <Image
              src={vpn.screenshot}
              alt={`${vpn.name} website screenshot`}
              fill
              className="object-cover object-top opacity-40"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
          </div>
        )}

        <div className="container py-8 pb-12">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/reviews"
              className="text-sm text-slate-400 hover:text-orange-500 inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToReviews")}
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: title + meta */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {vpn.editorChoice && (
                  <span className="bg-yellow-500 text-yellow-950 text-xs font-bold px-2.5 py-1 rounded-full">
                    {t("editorChoice")}
                  </span>
                )}
                {vpn.freeTier && (
                  <span className="bg-slate-700 text-slate-200 text-xs font-medium px-2.5 py-1 rounded-full">
                    {t("freeTierAvailable")}
                  </span>
                )}
                <span className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">
                  Last tested: {transparency.lastTested}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {t("reviewTitle", { name: vpn.name })}
              </h1>
              <LastUpdated locale={_locale} className="mb-4 text-slate-400" />

              <div className="flex items-center gap-3 mb-4">
                <RatingStars rating={vpn.overallRating} size="lg" />
                <span className="bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                  {vpn.overallRating}/5
                </span>
                <span className="text-slate-400 text-sm">{t("basedOnTesting")}</span>
              </div>

              <p className="text-lg text-slate-300 mb-6">{vpn.shortDescription}</p>

              {/* Key Takeaways */}
              <div className="border-l-4 border-orange-500 bg-slate-800/50 p-4 rounded-r-lg mb-6">
                <div className="text-sm font-semibold text-orange-400 uppercase tracking-wide mb-2">
                  Quick Verdict
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {generateVerdictText(vpn)}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <AffiliateButton
                  vpnId={vpn.id}
                  vpnName={vpn.name}
                  affiliateUrl={vpn.affiliateUrl}
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg shadow-orange-500/25"
                >
                  {t("getVpnPrice", { name: vpn.name, price: String(vpn.priceTwoYear || vpn.priceYearly) })}
                </AffiliateButton>
              </div>
            </div>

            {/* Quick Stats Card — dark styled */}
            <div className="lg:w-80 bg-slate-800/70 border border-slate-700 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">{t("quickStats.title")}</h2>
              <div className="flex justify-between">
                <span className="text-slate-400">{t("quickStats.servers")}</span>
                <span className="font-semibold text-white">{vpn.servers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t("quickStats.countries")}</span>
                <span className="font-semibold text-white">{vpn.countries}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t("quickStats.devices")}</span>
                <span className="font-semibold text-white">
                  {vpn.maxDevices >= 999 ? t("quickStats.unlimited") : vpn.maxDevices}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t("quickStats.moneyBack")}</span>
                <span className="font-semibold text-white">{t("quickStats.days", { count: vpn.moneyBackDays })}</span>
              </div>
              <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
                <span className="text-slate-400">{t("quickStats.startingAt")}</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-orange-400">
                    ${vpn.priceTwoYear || vpn.priceYearly}
                  </span>
                  <span className="text-slate-400 text-sm">{t("quickStats.perMonth")}</span>
                </div>
              </div>
              <div className="border-t border-slate-700 pt-4 space-y-2 text-xs text-slate-400">
                <div className="flex justify-between gap-3">
                  <span>Ownership</span>
                  <span className="text-right text-slate-200">{transparency.owner}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Jurisdiction</span>
                  <span className="text-right text-slate-200">{transparency.jurisdiction}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Logging</span>
                  <span className="text-right text-slate-200">{formatLoggingPolicy(transparency.loggingPolicy)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Audit</span>
                  <span className="text-right text-slate-200">{formatAuditStatus(transparency.auditStatus)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Kill switch</span>
                  <span className="text-right text-slate-200">{transparency.killSwitchReliability}% reliable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-8">
      <div className="container">

        {/* Quick Stats summary bar */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 md:p-6 my-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Best For</div>
            <div className="font-semibold">{generateBestFor(vpn)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Price</div>
            <div className="font-semibold">From ${vpn.priceTwoYear ?? vpn.priceYearly}/mo</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Servers</div>
            <div className="font-semibold">{vpn.servers.toLocaleString()}+ in {vpn.countries} countries</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Money-Back</div>
            <div className="font-semibold">{vpn.moneyBackDays}-day guarantee</div>
          </div>
        </div>

        {/* NordVPN Top Pick Sidebar Card - shown on non-NordVPN review pages */}
        {vpn.slug !== "nordvpn" && (
          <div className="rounded-xl border border-orange-200 dark:border-orange-900/40 bg-orange-50 dark:bg-orange-950/20 p-4 mt-6 mb-8">
            <div className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-1">See Our #1 Pick</div>
            <div className="text-lg font-bold mb-2">NordVPN</div>
            <div className="text-sm text-muted-foreground mb-3">
              Rated 4.8/5 · From $2.99/mo · 7,400+ servers
            </div>
            <div className="flex gap-2 flex-wrap">
              <a
                href={getVpnAffiliateUrl("nordvpn")}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-1.5 font-medium shadow-sm shadow-orange-500/25 transition"
              >
                Get NordVPN →
              </a>
              <Link
                href={`/reviews/nordvpn`}
                className="text-sm border border-slate-300 dark:border-slate-600 px-4 py-1.5 rounded-full font-medium hover:bg-muted transition"
              >
                Read Review
              </Link>
            </div>
          </div>
        )}

        {/* Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">{t("scores.speed")}</span>
                </div>
                <span className="text-2xl font-bold">{vpn.speedScore}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${vpn.speedScore}%` }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">{t("scores.security")}</span>
                </div>
                <span className="text-2xl font-bold">{vpn.securityScore}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${vpn.securityScore}%` }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tv className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">{t("scores.streaming")}</span>
                </div>
                <span className="text-2xl font-bold">{vpn.streamingScore}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${vpn.streamingScore}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-l-4 border-l-green-500 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                {t("prosAndCons.pros")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {vpn.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <X className="h-5 w-5 text-red-500" />
                {t("prosAndCons.cons")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {vpn.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
            <TabsTrigger value="pricing">{t("tabs.pricing")}</TabsTrigger>
            <TabsTrigger value="security">{t("tabs.security")}</TabsTrigger>
            <TabsTrigger value="streaming">{t("tabs.streaming")}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <Card className="border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
              <CardContent className="pt-6 prose prose-gray max-w-none">
                <h3>Is {vpn.name} Worth It?</h3>
                <p>
                  {t("overview.description", {
                    name: vpn.name,
                    servers: vpn.servers.toLocaleString(),
                    countries: vpn.countries,
                    devices: vpn.maxDevices >= 999 ? t("quickStats.unlimited").toLowerCase() : String(vpn.maxDevices)
                  })}
                </p>
                <h4>{t("overview.keyFeatures")}</h4>
                <ul>
                  <li>
                    <strong>{t("overview.serverNetwork")}</strong>{" "}
                    {t("overview.serversInCountries", { servers: vpn.servers.toLocaleString(), countries: vpn.countries })}
                  </li>
                  <li>
                    <strong>{t("overview.protocols")}</strong> {vpn.protocols.join(", ")}
                  </li>
                  <li>
                    <strong>{t("overview.encryption")}</strong> {vpn.encryption}
                  </li>
                  <li>
                    <strong>{t("overview.killSwitch")}</strong>{" "}
                    {vpn.killSwitch ? t("overview.yes") : t("overview.no")}
                  </li>
                  <li>
                    <strong>{t("overview.noLogsPolicy")}</strong>{" "}
                    {vpn.noLogs ? t("overview.yesAudited") : t("overview.limited")}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pricing" className="mt-6">
            <Card className="border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
                  How Much Does {vpn.name} Cost?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      {t("pricing.monthly")}
                    </div>
                    <div className="text-3xl font-bold">${vpn.priceMonthly}</div>
                    <div className="text-sm text-muted-foreground">{t("quickStats.perMonth")}</div>
                  </div>
                  <div className="border-2 border-orange-500 rounded-xl p-4 text-center bg-orange-50 dark:bg-orange-950/20">
                    <div className="text-sm text-muted-foreground mb-2">
                      {t("pricing.yearly")}
                    </div>
                    <div className="text-3xl font-bold text-orange-500">
                      ${vpn.priceYearly}
                    </div>
                    <div className="text-sm text-muted-foreground">{t("quickStats.perMonth")}</div>
                    <Badge className="mt-2 bg-orange-500 text-white">{t("pricing.mostPopular")}</Badge>
                  </div>
                  {vpn.priceTwoYear && (
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        {t("pricing.twoYears")}
                      </div>
                      <div className="text-3xl font-bold">${vpn.priceTwoYear}</div>
                      <div className="text-sm text-muted-foreground">{t("quickStats.perMonth")}</div>
                      <Badge variant="secondary" className="mt-2">
                        {t("pricing.bestValue")}
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  {t("pricing.moneyBackGuarantee", { days: vpn.moneyBackDays })}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <Card className="border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
                  Is {vpn.name} Safe?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {vpn.noLogs ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span>{t("securityFeatures.noLogsPolicy")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {vpn.killSwitch ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span>{t("securityFeatures.killSwitch")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{t("securityFeatures.encryption", { type: vpn.encryption })}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t("securityFeatures.supportedProtocols")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {vpn.protocols.map((protocol) => (
                        <Badge key={protocol} variant="outline">
                          {protocol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="streaming" className="mt-6">
            <Card className="border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
                  Does {vpn.name} Work with Netflix?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>{t("streamingSection.netflix")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>{t("streamingSection.disneyPlus")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>{t("streamingSection.amazonPrime")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {vpn.netflixSupport ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>{t("streamingSection.bbcIplayer")}</span>
                  </div>
                </div>
                {vpn.torrentSupport && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="font-semibold">{t("streamingSection.p2pSupported")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t("streamingSection.torrentDescription", { name: vpn.name })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Verdict */}
        <Card className="mb-12 border border-orange-200 dark:border-orange-900/40 rounded-xl hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{t("verdict.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              {t("verdict.description", {
                name: vpn.name,
                rating: vpn.overallRating,
                servers: vpn.servers.toLocaleString(),
                countries: vpn.countries
              })}
              {vpn.editorChoice && t("verdict.editorChoiceNote")}
            </p>
            <AffiliateButton
              vpnId={vpn.id}
              vpnName={vpn.name}
              affiliateUrl={vpn.affiliateUrl}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg shadow-orange-500/25"
            >
              {t("verdict.getVpnNow", { name: vpn.name, price: String(vpn.priceTwoYear || vpn.priceYearly) })}
            </AffiliateButton>
          </CardContent>
        </Card>

        {/* Ad placement */}
        <InlineAd />

        {/* FAQ Section */}
        <FaqSection faqs={faqs} vpnName={vpn.name} />

        {/* Compare with Other VPNs Section */}
        <CompareWithOtherVpns vpn={vpn} />

        {/* User Reviews Section */}
        <UserReviewsSection vpn={vpn} locale={_locale} title={t("userReviews.title")} />

        {/* Author Bio */}
        <AuthorBio />

        {/* Related Content */}
        <RelatedContent
          links={relatedLinks}
          locale={_locale}
          className="mt-12"
        />
      </div>
      </div>
    </>
  );
}

// Compare with Other VPNs Section Component
function CompareWithOtherVpns({
  vpn,
}: {
  vpn: { slug: string; name: string };
}) {
  // Pick the top 5 VPNs by sortOrder for comparisons, excluding the current VPN
  const topVpns = vpnProviders
    .filter((v) => v.slug !== vpn.slug)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 5);

  // For NordVPN's review page, compare with top competitors (no NordVPN)
  // For other pages, always put NordVPN first, then add 2-3 more
  let comparisonVpns: typeof topVpns;
  if (vpn.slug === "nordvpn") {
    comparisonVpns = topVpns.slice(0, 4);
  } else {
    const nordvpn = vpnProviders.find((v) => v.slug === "nordvpn");
    const others = topVpns.filter((v) => v.slug !== "nordvpn").slice(0, 3);
    comparisonVpns = nordvpn ? [nordvpn, ...others] : others.slice(0, 4);
  }

  return (
    <section className="mt-12 mb-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Compare {vpn.name} with Other VPNs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {comparisonVpns.map((otherVpn) => {
          const slug1 = vpn.slug;
          const slug2 = otherVpn.slug;
          return (
            <Link
              key={otherVpn.slug}
              href={`/compare/${slug1}-vs-${slug2}`}
              className="group flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-card px-4 py-3 text-sm font-medium hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 hover:border-orange-300 dark:hover:border-orange-700"
            >
              <span className="group-hover:text-orange-500 transition-colors">
                {vpn.name} vs {otherVpn.name}
              </span>
              <span className="text-muted-foreground group-hover:text-orange-500 transition-colors">→</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// FAQ Section Component (visible accordion-style Q&A)
function FaqSection({
  faqs,
  vpnName,
}: {
  faqs: { question: string; answer: string }[];
  vpnName: string;
}) {
  return (
    <section id="faq" className="mb-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Frequently Asked Questions about {vpnName}
      </h2>
      <div className="divide-y divide-border rounded-xl border border-slate-200 dark:border-slate-700">
        {faqs.map((faq, index) => (
          <details key={index} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-base font-medium hover:bg-muted/50 list-none">
              {faq.question}
              <span className="ml-4 shrink-0 text-orange-500 transition-transform duration-200 group-open:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-4 pt-2 text-muted-foreground">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// User Reviews Section Component
function UserReviewsSection({ vpn, locale, title }: { vpn: { slug: string; name: string }; locale: string; title: string }) {
  const userReviews = getReviewsByVpnSlug(vpn.slug, locale);
  const { average, count } = getAverageUserRating(vpn.slug);

  return (
    <section id="user-reviews" className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>

      {/* Review Form */}
      <ReviewForm vpnSlug={vpn.slug} vpnName={vpn.name} locale={locale} />

      {/* Reviews List */}
      <UserReviewsList
        reviews={userReviews}
        locale={locale}
        averageRating={average}
        totalReviews={count}
      />
    </section>
  );
}
