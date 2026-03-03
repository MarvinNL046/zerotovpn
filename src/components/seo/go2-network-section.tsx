import { ExternalLink, MapPinned } from "lucide-react";
import { GO2_NETWORK_LINKS } from "@/lib/go2-network-links";
import { cn } from "@/lib/utils";

type Props = {
  locale: string;
  className?: string;
};

const COPY = {
  en: {
    title: "Travel network resources (dofollow)",
    description: "Related VPN travel pages across our Go2 ecosystem:",
  },
  nl: {
    title: "Travel netwerkbronnen (dofollow)",
    description: "Gerelateerde VPN travel-pagina's binnen ons Go2-ecosysteem:",
  },
  de: {
    title: "Travel-Netzwerkressourcen (dofollow)",
    description: "Relevante VPN-Reiseseiten in unserem Go2-Ökosystem:",
  },
  es: {
    title: "Recursos de red de viajes (dofollow)",
    description: "Páginas de VPN de viaje relacionadas dentro del ecosistema Go2:",
  },
  fr: {
    title: "Ressources du réseau voyage (dofollow)",
    description: "Pages VPN voyage liées dans l'écosystème Go2 :",
  },
  zh: {
    title: "旅行网络资源（dofollow）",
    description: "Go2 生态内相关的旅行 VPN 页面：",
  },
  ja: {
    title: "トラベルネットワークリソース（dofollow）",
    description: "Go2 エコシステム内の関連 VPN 旅行ページ:",
  },
  ko: {
    title: "여행 네트워크 리소스 (dofollow)",
    description: "Go2 생태계 내 관련 VPN 여행 페이지:",
  },
  th: {
    title: "แหล่งข้อมูลเครือข่ายท่องเที่ยว (dofollow)",
    description: "หน้าคู่มือ VPN ท่องเที่ยวที่เกี่ยวข้องในเครือข่าย Go2:",
  },
} as const;

export function Go2NetworkSection({ locale, className }: Props) {
  const copy = COPY[locale as keyof typeof COPY] || COPY.en;

  return (
    <section className={cn("py-10 border-y bg-muted/20", className)}>
      <div className="container max-w-5xl space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPinned className="h-5 w-5 text-primary" />
          {copy.title}
        </h2>
        <p className="text-muted-foreground">{copy.description}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {GO2_NETWORK_LINKS.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border bg-card p-4 hover:border-primary/40 transition-colors text-sm flex items-center justify-between gap-3"
            >
              <span>{item.site}</span>
              <ExternalLink className="h-4 w-4 text-primary" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
