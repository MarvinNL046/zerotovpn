import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Link } from "@/i18n/navigation";
import { generateAlternates } from "@/lib/seo-utils";
import { formatAuditStatus, formatLoggingPolicy, getVpnIndexRows } from "@/lib/vpn-transparency-data";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { FileSpreadsheet, TrendingUp, ShieldCheck, Gauge, RefreshCw } from "lucide-react";
import { DownloadPdfButton } from "@/components/ui/download-pdf-button";

type Props = {
  params: Promise<{ locale: string }>;
};

type LocaleCopy = {
  badge: string;
  title: string;
  intro: string;
  providers: string;
  regions: string;
  metrics: string;
  latestRetest: string;
  matrixTitle: string;
  matrixSubtitle: string;
  note: string;
  reports: string;
  coreAsset: string;
  downloadPdf: string;
  headers: {
    rank: string;
    vpn: string;
    score: string;
    speed: string;
    latency: string;
    logging: string;
    owner: string;
    jurisdiction: string;
    audited: string;
    streaming: string;
    torrent: string;
    killSwitch: string;
    lastTested: string;
  };
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(baseUrl),
    title: "VPN Transparency & Performance Index 2026 | ZeroToVPN",
    description:
      "Independent report across 3 regions with measurable metrics: speed, latency, logging policy, ownership, jurisdiction, streaming unlock, torrent support, and kill switch reliability.",
    alternates: generateAlternates("/reports/vpn-transparency-performance-index-2026", locale),
    openGraph: {
      title: "VPN Transparency & Performance Index 2026",
      description: "We tested VPN providers across three regions and published the full transparency matrix.",
      type: "article",
    },
  };
}

const copy: Record<string, LocaleCopy> = {
  en: {
    badge: "Core research asset",
    title: "VPN Transparency & Performance Index 2026",
    intro:
      "This report is the evidence layer behind ZeroToVPN rankings. It combines measurable performance and transparency signals in one reproducible matrix.",
    providers: "Providers Covered",
    regions: "Regions per Test",
    metrics: "Core Metrics",
    latestRetest: "Latest Retest",
    matrixTitle: "Transparency Matrix",
    matrixSubtitle:
      "Sorted by transparency score with measurable fields: speed, latency, logging, ownership, jurisdiction, streaming unlock, torrent support, and kill switch reliability.",
    note: "Note: scoring rules and re-test cadence are documented on /methodology.",
    reports: "Reports",
    coreAsset: "Core research asset",
    downloadPdf: "Download PDF Report",
    headers: {
      rank: "Rank",
      vpn: "VPN",
      score: "Score",
      speed: "Speed EU/US/Asia",
      latency: "Latency",
      logging: "Logging",
      owner: "Owner",
      jurisdiction: "Jurisdiction",
      audited: "Audited",
      streaming: "Streaming",
      torrent: "Torrent",
      killSwitch: "Kill switch",
      lastTested: "Last tested",
    },
  },
  nl: {
    badge: "Kern onderzoeksasset",
    title: "VPN Transparency & Performance Index 2026",
    intro:
      "Dit rapport is de evidence-laag achter de ZeroToVPN rankings. Het combineert meetbare performance en transparantiesignalen in een reproduceerbare matrix.",
    providers: "Geteste providers",
    regions: "Regio's per test",
    metrics: "Kernmetrics",
    latestRetest: "Laatste hertest",
    matrixTitle: "Transparency Matrix",
    matrixSubtitle:
      "Gesorteerd op transparency score met meetbare velden: snelheid, latency, logging, ownership, jurisdictie, streaming unlock, torrent support en kill switch betrouwbaarheid.",
    note: "Let op: scorelogica en hertestfrequentie staan op /methodology.",
    reports: "Rapporten",
    coreAsset: "Kern onderzoeksasset",
    downloadPdf: "Download PDF Rapport",
    headers: {
      rank: "Rang",
      vpn: "VPN",
      score: "Score",
      speed: "Snelheid EU/US/Asia",
      latency: "Latency",
      logging: "Logging",
      owner: "Owner",
      jurisdiction: "Jurisdictie",
      audited: "Audit",
      streaming: "Streaming",
      torrent: "Torrent",
      killSwitch: "Kill switch",
      lastTested: "Last tested",
    },
  },
  de: {
    badge: "Kern-Research-Asset",
    title: "VPN Transparenz- & Performance-Index 2026",
    intro: "Dieser Report ist die Datenbasis hinter den ZeroToVPN-Rankings mit messbaren und reproduzierbaren Kriterien.",
    providers: "Anbieter im Report",
    regions: "Regionen pro Test",
    metrics: "Kernmetriken",
    latestRetest: "Letzter Retest",
    matrixTitle: "Transparenzmatrix",
    matrixSubtitle: "Sortiert nach Transparenz-Score mit Speed, Latenz, Logging, Ownership, Jurisdiktion, Streaming, Torrent und Kill-Switch.",
    note: "Hinweis: Scoring-Regeln und Retest-Zyklus stehen auf /methodology.",
    reports: "Reports",
    coreAsset: "Kern-Research-Asset",
    downloadPdf: "PDF-Bericht herunterladen",
    headers: { rank: "Rang", vpn: "VPN", score: "Score", speed: "Speed EU/US/Asien", latency: "Latenz", logging: "Logging", owner: "Owner", jurisdiction: "Jurisdiktion", audited: "Audit", streaming: "Streaming", torrent: "Torrent", killSwitch: "Kill Switch", lastTested: "Zuletzt getestet" },
  },
  es: {
    badge: "Activo central de investigacion",
    title: "Indice de Transparencia y Rendimiento VPN 2026",
    intro: "Este informe es la capa de evidencia detras de los rankings ZeroToVPN con criterios medibles y reproducibles.",
    providers: "Proveedores analizados",
    regions: "Regiones por prueba",
    metrics: "Metricas clave",
    latestRetest: "Ultimo retest",
    matrixTitle: "Matriz de transparencia",
    matrixSubtitle: "Ordenado por score de transparencia con velocidad, latencia, logs, propiedad, jurisdiccion, streaming, torrent y kill switch.",
    note: "Nota: reglas de score y frecuencia de retest en /methodology.",
    reports: "Informes",
    coreAsset: "Activo central",
    downloadPdf: "Descargar informe PDF",
    headers: { rank: "Rango", vpn: "VPN", score: "Score", speed: "Velocidad EU/US/Asia", latency: "Latencia", logging: "Logs", owner: "Owner", jurisdiction: "Jurisdiccion", audited: "Auditoria", streaming: "Streaming", torrent: "Torrent", killSwitch: "Kill switch", lastTested: "Ultima prueba" },
  },
  fr: {
    badge: "Actif de recherche principal",
    title: "Indice Transparence & Performance VPN 2026",
    intro: "Ce rapport sert de base de preuve pour les classements ZeroToVPN avec des criteres mesurables et reproductibles.",
    providers: "Fournisseurs couverts",
    regions: "Regions par test",
    metrics: "Metriques principales",
    latestRetest: "Dernier retest",
    matrixTitle: "Matrice de transparence",
    matrixSubtitle: "Triee par score de transparence: vitesse, latence, logs, ownership, juridiction, streaming, torrent, kill switch.",
    note: "Note: regles de scoring et cadence de retest sur /methodology.",
    reports: "Rapports",
    coreAsset: "Actif principal",
    downloadPdf: "Telecharger le rapport PDF",
    headers: { rank: "Rang", vpn: "VPN", score: "Score", speed: "Vitesse EU/US/Asie", latency: "Latence", logging: "Logs", owner: "Owner", jurisdiction: "Juridiction", audited: "Audit", streaming: "Streaming", torrent: "Torrent", killSwitch: "Kill switch", lastTested: "Dernier test" },
  },
  zh: {
    badge: "核心研究资产",
    title: "VPN 透明度与性能指数 2026",
    intro: "该报告是 ZeroToVPN 排名背后的证据层，使用可量化、可复现的指标。",
    providers: "覆盖服务商",
    regions: "每次测试区域",
    metrics: "核心指标",
    latestRetest: "最近复测",
    matrixTitle: "透明度矩阵",
    matrixSubtitle: "按透明度得分排序，包含速度、延迟、日志、所有权、司法辖区、流媒体、种子与 Kill Switch。",
    note: "说明：评分规则与复测节奏见 /methodology。",
    reports: "报告",
    coreAsset: "核心研究资产",
    downloadPdf: "下载 PDF 报告",
    headers: { rank: "排名", vpn: "VPN", score: "分数", speed: "速度 EU/US/Asia", latency: "延迟", logging: "日志", owner: "所有者", jurisdiction: "司法辖区", audited: "审计", streaming: "流媒体", torrent: "种子", killSwitch: "Kill Switch", lastTested: "最后测试" },
  },
  ja: {
    badge: "中核リサーチ資産",
    title: "VPN 透明性 & パフォーマンス指数 2026",
    intro: "本レポートは ZeroToVPN ランキングの根拠データで、測定可能かつ再現可能な指標を公開します。",
    providers: "掲載プロバイダー",
    regions: "テスト地域数",
    metrics: "主要指標",
    latestRetest: "最新再テスト",
    matrixTitle: "透明性マトリクス",
    matrixSubtitle: "透明性スコア順。速度・遅延・ログ・所有者・法域・配信解除・Torrent・Kill Switch を掲載。",
    note: "注: スコア式と再テスト方針は /methodology に記載。",
    reports: "レポート",
    coreAsset: "中核資産",
    downloadPdf: "PDFレポートをダウンロード",
    headers: { rank: "順位", vpn: "VPN", score: "スコア", speed: "速度 EU/US/Asia", latency: "遅延", logging: "ログ", owner: "所有者", jurisdiction: "法域", audited: "監査", streaming: "配信", torrent: "Torrent", killSwitch: "Kill Switch", lastTested: "最終テスト" },
  },
  ko: {
    badge: "핵심 리서치 자산",
    title: "VPN 투명성 & 성능 지수 2026",
    intro: "이 리포트는 ZeroToVPN 랭킹의 근거 데이터로, 측정 가능하고 재현 가능한 지표를 공개합니다.",
    providers: "분석 대상",
    regions: "테스트 지역",
    metrics: "핵심 지표",
    latestRetest: "최근 재테스트",
    matrixTitle: "투명성 매트릭스",
    matrixSubtitle: "투명성 점수 순 정렬. 속도, 지연, 로그, 소유권, 관할권, 스트리밍, 토렌트, 킬스위치 포함.",
    note: "참고: 점수 규칙과 재테스트 주기는 /methodology 에서 확인.",
    reports: "리포트",
    coreAsset: "핵심 자산",
    downloadPdf: "PDF 보고서 다운로드",
    headers: { rank: "순위", vpn: "VPN", score: "점수", speed: "속도 EU/US/Asia", latency: "지연", logging: "로그", owner: "소유자", jurisdiction: "관할권", audited: "감사", streaming: "스트리밍", torrent: "토렌트", killSwitch: "킬스위치", lastTested: "마지막 테스트" },
  },
  th: {
    badge: "สินทรัพย์งานวิจัยหลัก",
    title: "ดัชนีความโปร่งใสและประสิทธิภาพ VPN 2026",
    intro: "รายงานนี้คือชั้นข้อมูลหลักของการจัดอันดับ ZeroToVPN โดยใช้เกณฑ์ที่วัดผลและทำซ้ำได้",
    providers: "จำนวนผู้ให้บริการ",
    regions: "จำนวนภูมิภาคต่อการทดสอบ",
    metrics: "เมตริกหลัก",
    latestRetest: "ทดสอบซ้ำล่าสุด",
    matrixTitle: "ตารางความโปร่งใส",
    matrixSubtitle: "เรียงตามคะแนนความโปร่งใส พร้อมความเร็ว, latency, logs, ownership, jurisdiction, streaming, torrent และ kill switch",
    note: "หมายเหตุ: สูตรคะแนนและรอบทดสอบซ้ำอยู่ที่ /methodology",
    reports: "รายงาน",
    coreAsset: "สินทรัพย์หลัก",
    downloadPdf: "ดาวน์โหลดรายงาน PDF",
    headers: { rank: "อันดับ", vpn: "VPN", score: "คะแนน", speed: "ความเร็ว EU/US/Asia", latency: "Latency", logging: "Logging", owner: "Owner", jurisdiction: "Jurisdiction", audited: "Audited", streaming: "Streaming", torrent: "Torrent", killSwitch: "Kill switch", lastTested: "Last tested" },
  },
};

function toPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export default async function TransparencyReportPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = copy[locale] ?? copy.en;
  const vpns = await getAllVpns();
  const rows = (await getVpnIndexRows(vpns)).slice(0, 12);

  return (
    <article className="flex flex-col">
      <section className="py-14 lg:py-20 bg-gradient-to-br from-primary/8 via-background to-background">
        <div className="container max-w-7xl">
          <BreadcrumbSchema
            items={[
              { name: c.reports, href: "/reports" },
              { name: c.title, href: "/reports/vpn-transparency-performance-index-2026" },
            ]}
            className="mb-8"
          />
          <Badge variant="blue" className="mb-4">
            <FileSpreadsheet className="h-3.5 w-3.5 mr-1" />
            {c.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{c.title}</h1>
          <p className="text-lg text-muted-foreground max-w-4xl">
            {c.intro}{" "}
            <Link href="/methodology" className="text-primary hover:underline">/methodology</Link>.
          </p>
          <DownloadPdfButton label={c.downloadPdf} className="mt-6" />
        </div>
      </section>

      <section className="py-10 border-b bg-muted/30">
        <div className="container max-w-7xl grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                {c.providers}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-primary">{rows.length}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Gauge className="h-4 w-4 text-primary" />
                {c.regions}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-primary">3</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                {c.metrics}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-primary">8</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-primary" />
                {c.latestRetest}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg font-semibold text-primary">March 2026</CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-7xl space-y-6">
          <h2 className="text-2xl font-bold">{c.matrixTitle}</h2>
          <p className="text-muted-foreground">{c.matrixSubtitle}</p>
          <div className="overflow-x-auto border rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3 font-semibold">{c.headers.rank}</th>
                  <th className="p-3 font-semibold">{c.headers.vpn}</th>
                  <th className="p-3 font-semibold">{c.headers.score}</th>
                  <th className="p-3 font-semibold">{c.headers.speed}</th>
                  <th className="p-3 font-semibold">{c.headers.latency}</th>
                  <th className="p-3 font-semibold">{c.headers.logging}</th>
                  <th className="p-3 font-semibold">{c.headers.owner}</th>
                  <th className="p-3 font-semibold">{c.headers.jurisdiction}</th>
                  <th className="p-3 font-semibold">{c.headers.audited}</th>
                  <th className="p-3 font-semibold">{c.headers.streaming}</th>
                  <th className="p-3 font-semibold">{c.headers.torrent}</th>
                  <th className="p-3 font-semibold">{c.headers.killSwitch}</th>
                  <th className="p-3 font-semibold">{c.headers.lastTested}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.slug} className="border-t">
                    <td className="p-3 font-semibold">#{index + 1}</td>
                    <td className="p-3">
                      <Link href={`/reviews/${row.slug}`} className="text-primary hover:underline">
                        {row.name}
                      </Link>
                    </td>
                    <td className="p-3 font-semibold">{row.transparencyScore}</td>
                    <td className="p-3">{row.downloadMbps.eu}/{row.downloadMbps.us}/{row.downloadMbps.asia} Mbps</td>
                    <td className="p-3">{row.averageLatencyMs} ms</td>
                    <td className="p-3">{formatLoggingPolicy(row.loggingPolicy)}</td>
                    <td className="p-3">{row.owner}</td>
                    <td className="p-3">{row.jurisdiction}</td>
                    <td className="p-3">{formatAuditStatus(row.auditStatus)}</td>
                    <td className="p-3">{row.streamingServicesUnlocked}/10</td>
                    <td className="p-3">{row.torrentAllowed ? "Yes" : "No"}</td>
                    <td className="p-3">{toPercent(row.killSwitchReliability)}</td>
                    <td className="p-3">{row.lastTested}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            {c.note} <Link href="/methodology" className="text-primary hover:underline">/methodology</Link>
          </p>
        </div>
      </section>
    </article>
  );
}
