"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Smartphone,
  Tablet,
  Laptop,
  Globe,
  Shield,
  Zap,
  Lock,
  Server,
  Monitor,
  Tv,
  Gamepad2,
  MapPin,
  Map,
  DollarSign,
  Star,
  Play,
  Download,
  FileText,
  Settings,
  HelpCircle,
  Trophy,
  Gift,
  Tag,
  Wifi,
  Check,
  Clock,
  Users,
  type LucideIcon,
} from "lucide-react";

// Icon mapping for string-based icon selection
const iconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  globe: Globe,
  shield: Shield,
  zap: Zap,
  lock: Lock,
  server: Server,
  monitor: Monitor,
  tv: Tv,
  gamepad: Gamepad2,
  location: MapPin,
  map: Map,
  price: DollarSign,
  star: Star,
  play: Play,
  download: Download,
  document: FileText,
  settings: Settings,
  help: HelpCircle,
  trophy: Trophy,
  gift: Gift,
  tag: Tag,
  wifi: Wifi,
  check: Check,
  clock: Clock,
  users: Users,
};

export interface RelatedPage {
  title: string;
  description: string;
  href: string;
  icon?: keyof typeof iconMap;
}

export interface RelatedPagesProps {
  title?: string;
  pages: RelatedPage[];
  className?: string;
}

export function RelatedPages({
  title = "Related Pages",
  pages,
  className = "",
}: RelatedPagesProps) {
  return (
    <section className={className}>
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => {
          const IconComponent = page.icon ? iconMap[page.icon] : Globe;

          return (
            <Link
              key={index}
              href={page.href}
              className="group block transition-transform hover:scale-[1.02]"
            >
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {page.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {page.description}
                  </p>

                  <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    <span>Read more</span>
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
