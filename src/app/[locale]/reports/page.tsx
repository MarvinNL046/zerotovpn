import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { generateAlternates } from "@/lib/seo-utils";
import { FileSpreadsheet } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://www.zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(baseUrl),
    title: "VPN Research Reports | ZeroToVPN",
    description: "Independent, data-driven VPN research reports from ZeroToVPN.",
    alternates: generateAlternates("/reports", locale),
  };
}

const copy: Record<string, { badge: string; title: string; subtitle: string; cardBody: string; open: string; reports: string }> = {
  en: {
    badge: "Research library",
    title: "VPN Research Reports",
    subtitle: "Public report assets that support rankings and review conclusions.",
    cardBody: "Core asset with measurable metrics across speed, latency, logging, ownership, jurisdiction, streaming unlock, torrent policy, and kill switch reliability.",
    open: "Open report",
    reports: "Reports",
  },
  nl: {
    badge: "Onderzoeksbibliotheek",
    title: "VPN Onderzoeksrapporten",
    subtitle: "Publieke rapporten die rankings en reviewconclusies onderbouwen.",
    cardBody: "Kernasset met meetbare metrics voor snelheid, latency, logging, ownership, jurisdictie, streaming unlock, torrentbeleid en kill switch betrouwbaarheid.",
    open: "Open rapport",
    reports: "Rapporten",
  },
  de: { badge: "Research-Bibliothek", title: "VPN Research Reports", subtitle: "Offentliche Reports zur Absicherung von Rankings.", cardBody: "Kern-Asset mit messbaren Metriken fur Speed, Latenz, Logging, Ownership, Jurisdiktion, Streaming, Torrent und Kill Switch.", open: "Report offnen", reports: "Reports" },
  es: { badge: "Biblioteca de investigacion", title: "Informes de investigacion VPN", subtitle: "Activos publicos que respaldan rankings y reviews.", cardBody: "Activo central con metricas medibles de velocidad, latencia, logs, propiedad, jurisdiccion, streaming, torrent y kill switch.", open: "Abrir informe", reports: "Informes" },
  fr: { badge: "Bibliotheque recherche", title: "Rapports de recherche VPN", subtitle: "Rapports publics qui soutiennent nos classements.", cardBody: "Actif principal avec metriques mesurables: vitesse, latence, logs, ownership, juridiction, streaming, torrent et kill switch.", open: "Ouvrir le rapport", reports: "Rapports" },
  zh: { badge: "研究库", title: "VPN 研究报告", subtitle: "用于支撑排名与评测结论的公开报告。", cardBody: "核心报告包含速度、延迟、日志、所有权、司法辖区、流媒体、种子与 Kill Switch 等可量化指标。", open: "打开报告", reports: "报告" },
  ja: { badge: "リサーチライブラリ", title: "VPN リサーチレポート", subtitle: "ランキング根拠となる公開レポート。", cardBody: "速度・遅延・ログ・所有者・法域・配信・Torrent・Kill Switch を計測した中核レポート。", open: "レポートを開く", reports: "レポート" },
  ko: { badge: "리서치 라이브러리", title: "VPN 리서치 리포트", subtitle: "랭킹과 리뷰 결론을 뒷받침하는 공개 리포트입니다.", cardBody: "속도, 지연, 로그, 소유권, 관할권, 스트리밍, 토렌트, 킬스위치 지표를 포함한 핵심 리포트입니다.", open: "리포트 열기", reports: "리포트" },
  th: { badge: "คลังงานวิจัย", title: "รายงานวิจัย VPN", subtitle: "รายงานสาธารณะที่ใช้สนับสนุนอันดับและข้อสรุปรีวิว", cardBody: "รายงานหลักที่มีเมตริกวัดผลได้: ความเร็ว, latency, logs, ownership, jurisdiction, streaming, torrent และ kill switch", open: "เปิดรายงาน", reports: "รายงาน" },
};

export default async function ReportsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = copy[locale] ?? copy.en;

  return (
    <div className="py-12">
      <div className="container max-w-5xl">
        <BreadcrumbSchema items={[{ name: c.reports, href: "/reports" }]} className="mb-8" />
        <Badge variant="blue" className="mb-4">{c.badge}</Badge>
        <h1 className="text-4xl font-bold mb-3">{c.title}</h1>
        <p className="text-muted-foreground mb-8">{c.subtitle}</p>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              VPN Transparency &amp; Performance Index 2026
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{c.cardBody}</p>
            <p>
              <Link href="/reports/vpn-transparency-performance-index-2026" className="text-primary hover:underline">
                {c.open}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
