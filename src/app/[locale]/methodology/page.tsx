import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Link } from "@/i18n/navigation";
import { generateAlternates } from "@/lib/seo-utils";
import { FlaskConical, Clock, Gauge, Scale, Repeat2, Database, CheckCircle2 } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

type LocaleCopy = {
  badge: string;
  title: string;
  subtitle: string;
  stats: Array<{ title: string; body: string; icon: "gauge" | "repeat" | "scale" | "clock" }>;
  sections: Array<{ title: string; paragraphs: string[] }>;
  checklistTitle: string;
  checklist: string[];
  revisionTitle: string;
  revisions: string[];
  contactTitle: string;
  contactBody: string;
  indexLabel: string;
  reportLabel: string;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(baseUrl),
    title: "VPN Testing Methodology | ZeroToVPN",
    description:
      "How ZeroToVPN tests VPNs: locations, baseline, timing, scoring weights, re-test cadence, and affiliate safeguards. Built for measurable and repeatable rankings.",
    alternates: generateAlternates("/methodology", locale),
    openGraph: {
      title: "VPN Testing Methodology | ZeroToVPN",
      description: "Our full VPN testing protocol: transparent, measurable, and reproducible.",
      type: "article",
    },
  };
}

const copy: Record<string, LocaleCopy> = {
  en: {
    badge: "Research Framework 2026",
    title: "ZeroToVPN Methodology",
    subtitle:
      "This page explains exactly how we test, score, and re-test VPN services. Every ranking must be measurable, explainable, repeatable, and data-driven.",
    stats: [
      {
        title: "Core Inputs",
        body: "Speed, latency, logging policy, ownership, jurisdiction, streaming unlocks, torrent policy, kill switch reliability.",
        icon: "gauge",
      },
      {
        title: "Re-test Cadence",
        body: "Monthly full runs, plus event-based re-tests after major app or policy changes.",
        icon: "repeat",
      },
      {
        title: "Editorial Independence",
        body: "Affiliate teams do not edit scores. Research is locked before commercial links are applied.",
        icon: "scale",
      },
      {
        title: "Last Revision",
        body: "Methodology reviewed on March 3, 2026.",
        icon: "clock",
      },
    ],
    sections: [
      {
        title: "1. Objective and scope",
        paragraphs: [
          "We test VPNs for real user outcomes: stable streaming, low-latency gaming, safer travel connectivity, and predictable privacy controls.",
          "Performance is only one dimension. We combine technical results with transparency signals such as ownership, logging clarity, and legal risk context.",
        ],
      },
      {
        title: "2. Baseline and environment",
        paragraphs: [
          "Each run starts with a no-VPN baseline in Europe, North America, and Asia. Baseline variance outside tolerance triggers a retest.",
          "Published values are medians from repeated runs at different times, not single best-case snapshots.",
        ],
      },
      {
        title: "3. Metrics we publish",
        paragraphs: [
          "Core metrics: download speed by region, latency, logging policy, ownership, jurisdiction, streaming unlock results, torrent allowance, and kill switch reliability.",
          "Each review includes a visible Last tested date so readers can judge data freshness instantly.",
        ],
      },
      {
        title: "4. Scoring model",
        paragraphs: [
          "Transparency score uses fixed weights: speed 24%, latency 10%, logging 14%, ownership 8%, jurisdiction risk 9%, audit status 10%, streaming 11%, torrent policy 7%, kill switch reliability 7%.",
          "Commercial terms are excluded from scoring. Commission rates never influence ranking position.",
        ],
      },
      {
        title: "5. Re-test and freshness policy",
        paragraphs: [
          "Every provider is re-tested monthly and again after major updates or policy changes. Older entries are prioritized for refresh.",
          "Historical snapshots are kept so trend movement can be measured, not just current rank.",
        ],
      },
      {
        title: "6. How to use the index",
        paragraphs: [
          "Use the VPN Index filters (budget, privacy-first, streaming, gaming) to narrow candidates by use case.",
          "Then validate trade-offs in provider reviews and cross-check against the full transparency report.",
        ],
      },
    ],
    checklistTitle: "Reproducibility checklist",
    checklist: [
      "Baseline run recorded before VPN tests",
      "Three-region speed measurements (EU/US/Asia)",
      "Latency measured on identical targets",
      "Kill switch failover test executed",
      "Streaming unlock test repeated on fresh sessions",
      "Policy and ownership evidence archived",
      "Last tested timestamp stored with score",
      "Affiliate labeling checked before publish",
    ],
    revisionTitle: "Revision log",
    revisions: [
      "March 3, 2026: transparency-weighted scoring and index filters published.",
      "February 2026: kill switch reliability test standardized.",
      "January 2026: review templates updated with Last tested visibility.",
    ],
    contactTitle: "Contact research",
    contactBody:
      "If you find a data issue or methodology gap, email research@zerotovpn.com. Significant corrections are logged publicly.",
    indexLabel: "VPN Index",
    reportLabel: "Transparency Report 2026",
  },
  nl: {
    badge: "Onderzoeksframework 2026",
    title: "ZeroToVPN Methodologie",
    subtitle:
      "Deze pagina legt exact uit hoe we VPN-diensten testen, scoren en hertesten. Elke ranking moet meetbaar, uitlegbaar, herhaalbaar en data-gedreven zijn.",
    stats: [
      {
        title: "Kerninputs",
        body: "Snelheid, latency, loggingbeleid, ownership, jurisdictie, streaming unlocks, torrentbeleid, kill switch betrouwbaarheid.",
        icon: "gauge",
      },
      {
        title: "Hertest-frequentie",
        body: "Maandelijkse volledige testruns, plus extra hertests na grote app- of beleidswijzigingen.",
        icon: "repeat",
      },
      {
        title: "Redactionele onafhankelijkheid",
        body: "Affiliate-teams wijzigen geen scores. Onderzoek wordt vastgezet vóór commerciële links worden toegevoegd.",
        icon: "scale",
      },
      {
        title: "Laatste revisie",
        body: "Methodologie herzien op 3 maart 2026.",
        icon: "clock",
      },
    ],
    sections: [
      {
        title: "1. Doel en scope",
        paragraphs: [
          "We testen VPN's op echte gebruikersresultaten: stabiele streaming, lage latency voor gaming, veilige reisconnectiviteit en consistente privacycontrole.",
          "Prestaties zijn niet genoeg; we combineren testdata met transparantiesignalen zoals ownership, loggingduidelijkheid en juridisch risicoprofiel.",
        ],
      },
      {
        title: "2. Baseline en testomgeving",
        paragraphs: [
          "Elke run start met een no-VPN baseline in Europa, Noord-Amerika en Azië. Te hoge variantie triggert een nieuwe run.",
          "Gepubliceerde waarden zijn medianen van herhaalde metingen op meerdere tijdstippen.",
        ],
      },
      {
        title: "3. Gepubliceerde metrics",
        paragraphs: [
          "Kernmetrics: downloadsnelheid per regio, latency, loggingbeleid, ownership, jurisdictie, streaming unlock-resultaten, torrenttoegang en kill switch betrouwbaarheid.",
          "Elke review toont zichtbaar een Last tested datum voor directe context op data-actualiteit.",
        ],
      },
      {
        title: "4. Scoringsmodel",
        paragraphs: [
          "De transparency score gebruikt vaste gewichten: snelheid 24%, latency 10%, logging 14%, ownership 8%, jurisdictierisico 9%, auditstatus 10%, streaming 11%, torrentbeleid 7%, kill switch betrouwbaarheid 7%.",
          "Commerciële voorwaarden zitten niet in de formule. Commissies beïnvloeden geen ranking.",
        ],
      },
      {
        title: "5. Hertest- en versheidsbeleid",
        paragraphs: [
          "Elke provider wordt maandelijks hertest en extra na grote updates of beleidswijzigingen.",
          "Historische snapshots blijven beschikbaar om trendbewegingen zichtbaar te maken, niet alleen momentopnames.",
        ],
      },
      {
        title: "6. Hoe je de index gebruikt",
        paragraphs: [
          "Gebruik VPN Index filters (budget, privacy-first, streaming, gaming) om snel te selecteren op use case.",
          "Valideer daarna trade-offs in reviews en cross-check in het volledige transparantierapport.",
        ],
      },
    ],
    checklistTitle: "Checklist voor reproduceerbaarheid",
    checklist: [
      "Baseline vastgelegd vóór VPN-tests",
      "Drie-regio snelheidsmeting (EU/US/Asia)",
      "Latency gemeten op identieke targets",
      "Kill switch failover test uitgevoerd",
      "Streaming unlock test herhaald met schone sessies",
      "Policy- en ownership-bewijs gearchiveerd",
      "Last tested timestamp gekoppeld aan score",
      "Affiliate-labeling gecontroleerd vóór publicatie",
    ],
    revisionTitle: "Revisielog",
    revisions: [
      "3 maart 2026: transparency-gewichten en indexfilters gepubliceerd.",
      "Februari 2026: kill switch betrouwbaarheidstest gestandaardiseerd.",
      "Januari 2026: reviewtemplates bijgewerkt met Last tested zichtbaarheid.",
    ],
    contactTitle: "Contact onderzoek",
    contactBody:
      "Zie je een datafout of gat in de methodologie? Mail research@zerotovpn.com. Grote correcties loggen we publiek.",
    indexLabel: "VPN Index",
    reportLabel: "Transparency Report 2026",
  },
  de: {
    badge: "Forschungsrahmen 2026",
    title: "ZeroToVPN Methodik",
    subtitle:
      "Diese Seite zeigt genau, wie wir VPN-Dienste testen, bewerten und erneut testen. Jede Rangliste muss messbar, erklarbar, reproduzierbar und datengetrieben sein.",
    stats: [
      { title: "Kernmetriken", body: "Geschwindigkeit, Latenz, Logging-Politik, Ownership, Jurisdiktion, Streaming, Torrent, Kill Switch.", icon: "gauge" },
      { title: "Retest-Zyklus", body: "Monatliche Volltests plus Event-Retests nach App- oder Policy-Anderungen.", icon: "repeat" },
      { title: "Unabhangigkeit", body: "Affiliate-Teams bearbeiten keine Scores. Forschung wird vor Monetarisierung gesperrt.", icon: "scale" },
      { title: "Letzte Revision", body: "Methodik gepruft am 3. Marz 2026.", icon: "clock" },
    ],
    sections: [
      { title: "1. Ziel und Umfang", paragraphs: ["Wir testen auf reale Nutzerergebnisse statt Marketing-Claims.", "Performance wird mit Transparenz- und Rechtskontext kombiniert."] },
      { title: "2. Baseline und Umgebung", paragraphs: ["Jeder Lauf startet mit No-VPN-Baseline in EU/US/Asien.", "Veroffentlichte Werte sind Medianwerte aus Wiederholungen."] },
      { title: "3. Veroffentlichte Metriken", paragraphs: ["Geschwindigkeit, Latenz, Logging, Ownership, Jurisdiktion, Streaming, Torrent, Kill Switch.", "Jede Review zeigt ein sichtbares Last-tested-Datum."] },
      { title: "4. Scoring-Modell", paragraphs: ["Gewichte: Speed 24, Latenz 10, Logging 14, Ownership 8, Jurisdiktion 9, Audit 10, Streaming 11, Torrent 7, Kill Switch 7.", "Provisionen sind kein Ranking-Faktor."] },
      { title: "5. Datenfrische", paragraphs: ["Monatliche Retests plus Trigger bei wichtigen Anderungen.", "Historische Snapshots zeigen Trends, nicht nur Momentwerte."] },
      { title: "6. Nutzung des Index", paragraphs: ["Filter nach Budget, Privacy, Streaming und Gaming nutzen.", "Danach Trade-offs in Reviews und Report prufen."] },
    ],
    checklistTitle: "Reproduzierbarkeits-Checkliste",
    checklist: ["Baseline vor VPN-Tests", "Drei Regionen gemessen", "Latenz auf identischen Zielen", "Kill-Switch-Failover getestet", "Streaming-Retest mit frischer Session", "Policy-/Ownership-Belege archiviert", "Last-tested gespeichert", "Affiliate-Label vor Publish gepruft"],
    revisionTitle: "Revisionsprotokoll",
    revisions: ["3. Marz 2026: Transparenzgewichtung veroffentlicht.", "Februar 2026: Kill-Switch-Test standardisiert.", "Januar 2026: Review-Template mit Last tested aktualisiert."],
    contactTitle: "Research kontaktieren",
    contactBody: "Datenfehler oder Methodenlucke? research@zerotovpn.com.",
    indexLabel: "VPN Index",
    reportLabel: "Transparenzbericht 2026",
  },
  es: {
    badge: "Marco de investigacion 2026",
    title: "Metodologia ZeroToVPN",
    subtitle: "Explicamos como probamos, puntuamos y repetimos pruebas VPN con criterios medibles y reproducibles.",
    stats: [
      { title: "Metricas base", body: "Velocidad, latencia, politicas de logs, propiedad, jurisdiccion, streaming, torrent y kill switch.", icon: "gauge" },
      { title: "Frecuencia", body: "Retest mensual y retest por cambios importantes.", icon: "repeat" },
      { title: "Independencia", body: "Afiliacion no modifica rankings ni scores.", icon: "scale" },
      { title: "Ultima revision", body: "Revisado el 3 de marzo de 2026.", icon: "clock" },
    ],
    sections: [
      { title: "1. Objetivo", paragraphs: ["Medimos resultados reales de uso, no solo marketing.", "Combinamos rendimiento con transparencia legal y de privacidad."] },
      { title: "2. Baseline", paragraphs: ["Partimos de baseline sin VPN en Europa, EEUU y Asia.", "Publicamos medianas de pruebas repetidas."] },
      { title: "3. Metricas publicadas", paragraphs: ["Velocidad regional, latencia, logs, propiedad, jurisdiccion, streaming, torrent y kill switch.", "Cada review incluye fecha visible de ultima prueba."] },
      { title: "4. Modelo de score", paragraphs: ["Pesos fijos: speed 24, latencia 10, logs 14, propiedad 8, jurisdiccion 9, auditoria 10, streaming 11, torrent 7, kill switch 7.", "Las comisiones no forman parte de la formula."] },
      { title: "5. Actualizacion", paragraphs: ["Retest mensual y adicional tras cambios criticos.", "Guardamos historico para medir tendencias."] },
      { title: "6. Uso del indice", paragraphs: ["Filtra por presupuesto, privacidad, streaming o gaming.", "Valida trade-offs en reviews y reporte completo."] },
    ],
    checklistTitle: "Checklist de reproducibilidad",
    checklist: ["Baseline previo", "Tres regiones", "Latencia en mismos objetivos", "Prueba de failover kill switch", "Retest streaming", "Evidencia archivada", "Fecha de test guardada", "Etiquetado de afiliacion verificado"],
    revisionTitle: "Registro de cambios",
    revisions: ["3 marzo 2026: pesos de transparencia publicados.", "Febrero 2026: kill switch estandarizado.", "Enero 2026: plantilla de review actualizada."],
    contactTitle: "Contacto research",
    contactBody: "Si detectas un error de datos, escribe a research@zerotovpn.com.",
    indexLabel: "Indice VPN",
    reportLabel: "Reporte de transparencia 2026",
  },
  fr: {
    badge: "Cadre de recherche 2026",
    title: "Methodologie ZeroToVPN",
    subtitle: "Nous expliquons comment nous testons, notons et re-testons les VPN avec une approche mesurable et reproductible.",
    stats: [
      { title: "Signaux principaux", body: "Vitesse, latence, logs, propriete, juridiction, streaming, torrent, kill switch.", icon: "gauge" },
      { title: "Frequence", body: "Retest mensuel + retest apres changements majeurs.", icon: "repeat" },
      { title: "Independance", body: "Les relations d'affiliation n'influencent pas les scores.", icon: "scale" },
      { title: "Derniere revision", body: "Revision effectuee le 3 mars 2026.", icon: "clock" },
    ],
    sections: [
      { title: "1. Objectif", paragraphs: ["Nous mesurons des resultats d'usage reel.", "La performance est combinee a la transparence juridique et privacy."] },
      { title: "2. Baseline", paragraphs: ["Baseline sans VPN en Europe, Amerique du Nord et Asie.", "Les valeurs publiees sont des medianes multi-runs."] },
      { title: "3. Metriques publiees", paragraphs: ["Vitesse regionale, latence, logs, propriete, juridiction, streaming, torrent, kill switch.", "Chaque review affiche une date Last tested."] },
      { title: "4. Modele de score", paragraphs: ["Poids fixes: speed 24, latence 10, logs 14, propriete 8, juridiction 9, audit 10, streaming 11, torrent 7, kill switch 7.", "Les commissions n'entrent pas dans le calcul."] },
      { title: "5. Fraicheur des donnees", paragraphs: ["Retest mensuel et apres changements importants.", "Snapshots historiques conserves pour suivre les tendances."] },
      { title: "6. Utiliser l'index", paragraphs: ["Filtrez par budget, privacy-first, streaming ou gaming.", "Verifiez les compromis dans les reviews et le rapport complet."] },
    ],
    checklistTitle: "Checklist de reproductibilite",
    checklist: ["Baseline enregistre", "3 regions mesurees", "Latence sur memes cibles", "Failover kill switch teste", "Retest streaming", "Preuves archivees", "Date de test stockee", "Labels affiliation verifies"],
    revisionTitle: "Journal des revisions",
    revisions: ["3 mars 2026: publication des poids de transparence.", "Fevrier 2026: standardisation du test kill switch.", "Janvier 2026: template review mis a jour."],
    contactTitle: "Contact recherche",
    contactBody: "Erreur de donnees ou lacune methodologique: research@zerotovpn.com.",
    indexLabel: "Index VPN",
    reportLabel: "Rapport de transparence 2026",
  },
  zh: {
    badge: "2026 研究框架",
    title: "ZeroToVPN 测试方法",
    subtitle: "本页说明我们如何测试、评分与复测 VPN，确保结论可量化、可解释、可复现。",
    stats: [
      { title: "核心指标", body: "速度、延迟、日志策略、所有权、司法辖区、流媒体解锁、种子支持、Kill Switch 可靠性。", icon: "gauge" },
      { title: "复测节奏", body: "每月完整复测；重大更新后触发额外复测。", icon: "repeat" },
      { title: "编辑独立", body: "联盟合作不影响评分与排序。", icon: "scale" },
      { title: "最近修订", body: "方法于 2026-03-03 更新。", icon: "clock" },
    ],
    sections: [
      { title: "1. 目标与范围", paragraphs: ["我们关注真实用户体验，而非宣传参数。", "性能数据会结合透明度与法律风险信号。"] },
      { title: "2. 基线与环境", paragraphs: ["每次测试先做无 VPN 基线（欧/美/亚）。", "公开值为多次测试中位数。"] },
      { title: "3. 公开指标", paragraphs: ["区域速度、延迟、日志、所有权、司法辖区、流媒体、种子、Kill Switch。", "每篇评测都展示 Last tested 时间。"] },
      { title: "4. 评分模型", paragraphs: ["固定权重：速度24、延迟10、日志14、所有权8、司法风险9、审计10、流媒体11、种子7、Kill Switch 7。", "佣金不进入评分公式。"] },
      { title: "5. 数据新鲜度", paragraphs: ["按月复测，遇重大变化立即加测。", "保留历史快照用于趋势比较。"] },
      { title: "6. 如何使用指数", paragraphs: ["按预算、隐私、流媒体、游戏筛选。", "再到评测页与完整报告核对取舍。"] },
    ],
    checklistTitle: "可复现清单",
    checklist: ["先记录基线", "三地区测速", "同目标延迟", "Kill Switch 失效切换测试", "流媒体复测", "证据归档", "记录测试日期", "上线前检查联盟标识"],
    revisionTitle: "修订记录",
    revisions: ["2026-03-03：发布透明度权重与筛选逻辑。", "2026-02：统一 Kill Switch 可靠性测试。", "2026-01：评测模板加入 Last tested。"],
    contactTitle: "研究联系",
    contactBody: "如发现数据问题，请发邮件至 research@zerotovpn.com。",
    indexLabel: "VPN 指数",
    reportLabel: "2026 透明度报告",
  },
  ja: {
    badge: "2026 リサーチフレーム",
    title: "ZeroToVPN テスト方法",
    subtitle: "このページでは VPN の検証・採点・再テスト手順を公開し、測定可能で再現可能なランキングを維持します。",
    stats: [
      { title: "主要指標", body: "速度、遅延、ログ方針、所有者、法域、配信解除、Torrent 可否、Kill Switch 信頼性。", icon: "gauge" },
      { title: "再テスト頻度", body: "毎月フル再テスト。重要変更時は臨時再テスト。", icon: "repeat" },
      { title: "編集独立性", body: "アフィリエイト条件はスコアに影響しません。", icon: "scale" },
      { title: "最終更新", body: "2026年3月3日に改訂。", icon: "clock" },
    ],
    sections: [
      { title: "1. 目的と範囲", paragraphs: ["実利用で重要な結果を重視します。", "性能に加えて透明性と法的リスクを評価します。"] },
      { title: "2. ベースライン", paragraphs: ["EU/US/Asia の無VPN基準を毎回取得。", "公開値は複数回測定の中央値です。"] },
      { title: "3. 公開メトリクス", paragraphs: ["地域別速度、遅延、ログ、所有者、法域、配信、Torrent、Kill Switch。", "各レビューに Last tested を表示します。"] },
      { title: "4. スコア式", paragraphs: ["重み: 速度24、遅延10、ログ14、所有者8、法域9、監査10、配信11、Torrent7、Kill Switch7。", "手数料はスコア計算に含めません。"] },
      { title: "5. 更新ポリシー", paragraphs: ["月次再テスト + 重要変更時の追加検証。", "履歴スナップショットで推移を追跡します。"] },
      { title: "6. インデックス活用", paragraphs: ["予算・プライバシー・配信・ゲームで絞り込み。", "最終判断はレビュー本文とレポートで確認。"] },
    ],
    checklistTitle: "再現性チェックリスト",
    checklist: ["事前ベースライン", "3地域速度", "同一ターゲット遅延", "Kill Switch フェイルオーバー", "配信再テスト", "証跡保存", "最終テスト日保存", "公開前アフィリエイト表示確認"],
    revisionTitle: "改訂ログ",
    revisions: ["2026-03-03: 透明性重みを公開。", "2026-02: Kill Switch テストを標準化。", "2026-01: テンプレートに Last tested を追加。"],
    contactTitle: "研究チーム連絡",
    contactBody: "データ不整合は research@zerotovpn.com へ連絡してください。",
    indexLabel: "VPN インデックス",
    reportLabel: "透明性レポート 2026",
  },
  ko: {
    badge: "2026 리서치 프레임워크",
    title: "ZeroToVPN 방법론",
    subtitle: "이 페이지는 VPN 테스트, 점수 산정, 재테스트 절차를 공개합니다. 목표는 측정 가능성과 재현성입니다.",
    stats: [
      { title: "핵심 입력", body: "속도, 지연, 로그 정책, 소유 구조, 관할권, 스트리밍 해제, 토렌트 허용, 킬스위치 신뢰도.", icon: "gauge" },
      { title: "재테스트 주기", body: "월간 전체 재테스트 + 주요 변경 시 추가 재테스트.", icon: "repeat" },
      { title: "편집 독립성", body: "제휴 조건은 점수와 순위에 반영되지 않습니다.", icon: "scale" },
      { title: "최근 개정", body: "2026년 3월 3일 개정.", icon: "clock" },
    ],
    sections: [
      { title: "1. 목적과 범위", paragraphs: ["마케팅 문구가 아니라 실제 사용 성능을 평가합니다.", "성능 수치와 함께 투명성/법적 리스크를 함께 반영합니다."] },
      { title: "2. 베이스라인", paragraphs: ["EU/US/Asia 무VPN 기준을 먼저 측정합니다.", "공개 수치는 반복 측정의 중앙값입니다."] },
      { title: "3. 공개 지표", paragraphs: ["지역별 속도, 지연, 로그, 소유권, 관할권, 스트리밍, 토렌트, 킬스위치.", "모든 리뷰에 Last tested 날짜를 표시합니다."] },
      { title: "4. 점수 모델", paragraphs: ["가중치: 속도24, 지연10, 로그14, 소유권8, 관할권9, 감사10, 스트리밍11, 토렌트7, 킬스위치7.", "수수료는 점수 계산에 포함되지 않습니다."] },
      { title: "5. 데이터 신선도", paragraphs: ["월간 재테스트 + 주요 변경 이벤트 재테스트를 수행합니다.", "히스토리 스냅샷을 보관해 추세를 비교합니다."] },
      { title: "6. 인덱스 활용", paragraphs: ["예산/프라이버시/스트리밍/게이밍 필터를 먼저 사용하세요.", "최종 판단은 리뷰 본문과 리포트에서 확인하세요."] },
    ],
    checklistTitle: "재현성 체크리스트",
    checklist: ["베이스라인 기록", "3개 지역 속도", "동일 타깃 지연", "킬스위치 페일오버", "스트리밍 재검증", "근거 보관", "테스트 날짜 기록", "게시 전 제휴 라벨 확인"],
    revisionTitle: "개정 로그",
    revisions: ["2026-03-03: 투명성 가중치 공개.", "2026-02: 킬스위치 테스트 표준화.", "2026-01: 리뷰 템플릿에 Last tested 추가."],
    contactTitle: "리서치 문의",
    contactBody: "데이터 이슈는 research@zerotovpn.com 으로 보내주세요.",
    indexLabel: "VPN 인덱스",
    reportLabel: "투명성 리포트 2026",
  },
  th: {
    badge: "กรอบงานวิจัย 2026",
    title: "วิธีการทดสอบ ZeroToVPN",
    subtitle: "หน้านี้อธิบายวิธีทดสอบ ให้คะแนน และทดสอบซ้ำ VPN แบบวัดผลได้ อธิบายได้ และทำซ้ำได้",
    stats: [
      { title: "ตัวชี้วัดหลัก", body: "ความเร็ว, latency, นโยบาย log, ownership, jurisdiction, streaming unlock, torrent, kill switch", icon: "gauge" },
      { title: "รอบการทดสอบซ้ำ", body: "ทดสอบเต็มทุกเดือน และทดสอบเพิ่มเมื่อมีการเปลี่ยนแปลงใหญ่", icon: "repeat" },
      { title: "อิสระด้านบรรณาธิการ", body: "เงื่อนไข affiliate ไม่มีผลต่อคะแนนหรืออันดับ", icon: "scale" },
      { title: "แก้ไขล่าสุด", body: "อัปเดตเมื่อ 3 มีนาคม 2026", icon: "clock" },
    ],
    sections: [
      { title: "1. เป้าหมายและขอบเขต", paragraphs: ["เราโฟกัสผลลัพธ์การใช้งานจริงของผู้ใช้", "คะแนนรวมประสิทธิภาพกับความโปร่งใสและความเสี่ยงทางกฎหมาย"] },
      { title: "2. Baseline", paragraphs: ["เริ่มทุกครั้งด้วย no-VPN baseline ใน EU/US/Asia", "ค่าที่เผยแพร่เป็นค่ามัธยฐานจากการทดสอบซ้ำ"] },
      { title: "3. เมตริกที่เผยแพร่", paragraphs: ["ความเร็วรายภูมิภาค, latency, logs, ownership, jurisdiction, streaming, torrent, kill switch", "ทุกรีวิวมีวันที่ Last tested ชัดเจน"] },
      { title: "4. โมเดลคะแนน", paragraphs: ["น้ำหนัก: speed 24, latency 10, logs 14, ownership 8, jurisdiction 9, audit 10, streaming 11, torrent 7, kill switch 7", "ค่าคอมมิชชันไม่ถูกใช้ในสูตรคะแนน"] },
      { title: "5. ความสดใหม่ของข้อมูล", paragraphs: ["ทดสอบซ้ำรายเดือนและเมื่อมีการเปลี่ยนแปลงสำคัญ", "เก็บ snapshot ย้อนหลังเพื่อดูแนวโน้ม"] },
      { title: "6. วิธีใช้ดัชนี", paragraphs: ["ใช้ฟิลเตอร์ budget/privacy/streaming/gaming ก่อน", "ตรวจสอบ trade-off ในรีวิวและรายงานฉบับเต็ม"] },
    ],
    checklistTitle: "เช็กลิสต์การทำซ้ำ",
    checklist: ["บันทึก baseline ก่อน", "วัด 3 ภูมิภาค", "วัด latency บนเป้าหมายเดียวกัน", "ทดสอบ failover kill switch", "รีเทสต์ streaming", "เก็บหลักฐาน", "บันทึกวันที่ทดสอบ", "ตรวจ label affiliate ก่อนเผยแพร่"],
    revisionTitle: "บันทึกการแก้ไข",
    revisions: ["3 มีนาคม 2026: เผยแพร่น้ำหนักความโปร่งใส", "กุมภาพันธ์ 2026: มาตรฐานการทดสอบ kill switch", "มกราคม 2026: เพิ่ม Last tested ในเทมเพลตรีวิว"],
    contactTitle: "ติดต่อทีมวิจัย",
    contactBody: "หากพบปัญหาข้อมูล ส่งอีเมลที่ research@zerotovpn.com",
    indexLabel: "VPN Index",
    reportLabel: "Transparency Report 2026",
  },
};

function getIcon(icon: LocaleCopy["stats"][number]["icon"]) {
  if (icon === "gauge") return <Gauge className="h-4 w-4 text-primary" />;
  if (icon === "repeat") return <Repeat2 className="h-4 w-4 text-primary" />;
  if (icon === "scale") return <Scale className="h-4 w-4 text-primary" />;
  return <Clock className="h-4 w-4 text-primary" />;
}

export default async function MethodologyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = copy[locale] ?? copy.en;

  return (
    <article className="flex flex-col">
      <section className="py-14 lg:py-20 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-5xl">
          <BreadcrumbSchema items={[{ name: "Methodology", href: "/methodology" }]} className="mb-8" />
          <Badge variant="blue" className="mb-4">
            <FlaskConical className="h-3.5 w-3.5 mr-1" />
            {c.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{c.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{c.subtitle}</p>
        </div>
      </section>

      <section className="py-10 border-b bg-muted/30">
        <div className="container max-w-5xl grid gap-4 md:grid-cols-4">
          {c.stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  {getIcon(stat.icon)}
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{stat.body}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container max-w-5xl space-y-10">
          {c.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div className="space-y-4 text-muted-foreground">
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-bold mb-4">{c.checklistTitle}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {c.checklist.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border rounded-xl p-6 bg-muted/30">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              {c.revisionTitle}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.revisions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section className="border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-3">{c.contactTitle}</h2>
            <p className="text-muted-foreground">{c.contactBody}</p>
            <p className="text-sm text-muted-foreground mt-3">
              <Link href="/vpn-index" className="text-primary hover:underline">{c.indexLabel}</Link>
              {" · "}
              <Link href="/reports/vpn-transparency-performance-index-2026" className="text-primary hover:underline">
                {c.reportLabel}
              </Link>
            </p>
          </section>
        </div>
      </section>
    </article>
  );
}
