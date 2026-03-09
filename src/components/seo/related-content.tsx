import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import type { ContentLink, ContentType } from "@/lib/content-links";
import {
  ArrowRight,
  Trophy,
  Gift,
  Gamepad2,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Lock,
  Star,
  Play,
  FileText,
  Settings,
  HelpCircle,
  Laptop,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Icon mapping
// ---------------------------------------------------------------------------

const iconMap: Record<string, LucideIcon> = {
  trophy: Trophy,
  gift: Gift,
  gamepad: Gamepad2,
  smartphone: Smartphone,
  globe: Globe,
  shield: Shield,
  zap: Zap,
  lock: Lock,
  star: Star,
  play: Play,
  document: FileText,
  settings: Settings,
  help: HelpCircle,
  laptop: Laptop,
};

// ---------------------------------------------------------------------------
// Badge config per content type
// ---------------------------------------------------------------------------

interface BadgeConfig {
  variant: "default" | "secondary" | "outline";
  label: string;
  labelNl: string;
}

const badgeConfigMap: Record<ContentType, BadgeConfig> = {
  review: { variant: "default", label: "Review", labelNl: "Review" },
  "best-of": {
    variant: "secondary",
    label: "Best Pick",
    labelNl: "Beste Keuze",
  },
  comparison: { variant: "outline", label: "Compare", labelNl: "Vergelijk" },
  blog: { variant: "secondary", label: "Blog", labelNl: "Blog" },
  guide: { variant: "outline", label: "Guide", labelNl: "Gids" },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface RelatedContentProps {
  links: ContentLink[];
  locale: string;
  title?: string;
  className?: string;
}

export function RelatedContent({
  links,
  locale,
  title,
  className = "",
}: RelatedContentProps) {
  if (links.length === 0) return null;

  const isNl = locale === "nl";
  const heading = title ?? (isNl ? "Gerelateerde Content" : "Related Content");
  const readMore = isNl ? "Lees meer" : "Read more";

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold mb-6 text-foreground">{heading}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => {
          const IconComponent = link.icon ? iconMap[link.icon] ?? Globe : Globe;
          const badge = badgeConfigMap[link.type];
          const linkTitle = isNl ? link.titleNl : link.title;
          const linkDescription = isNl ? link.descriptionNl : link.description;
          const badgeLabel = isNl ? badge.labelNl : badge.label;

          return (
            <Link
              key={index}
              href={link.href}
              className="group block transition-transform hover:scale-[1.02]"
            >
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {linkTitle}
                      </CardTitle>
                    </div>
                    <Badge variant={badge.variant}>{badgeLabel}</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {linkDescription}
                  </p>

                  <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    <span>{readMore}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
