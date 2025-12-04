import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp } from "lucide-react";

interface PopularComparison {
  vpn1: string;
  vpn2: string;
  slug1: string;
  slug2: string;
  badge?: string;
}

const popularComparisons: PopularComparison[] = [
  {
    vpn1: "NordVPN",
    vpn2: "Surfshark",
    slug1: "nordvpn",
    slug2: "surfshark",
    badge: "Most Popular",
  },
  {
    vpn1: "ExpressVPN",
    vpn2: "NordVPN",
    slug1: "expressvpn",
    slug2: "nordvpn",
    badge: "Premium Showdown",
  },
  {
    vpn1: "CyberGhost",
    vpn2: "NordVPN",
    slug1: "cyberghost",
    slug2: "nordvpn",
  },
  {
    vpn1: "ProtonVPN",
    vpn2: "Mullvad",
    slug1: "protonvpn",
    slug2: "mullvad",
    badge: "Privacy Focus",
  },
  {
    vpn1: "Surfshark",
    vpn2: "ExpressVPN",
    slug1: "surfshark",
    slug2: "expressvpn",
  },
  {
    vpn1: "NordVPN",
    vpn2: "ProtonVPN",
    slug1: "nordvpn",
    slug2: "protonvpn",
  },
];

export function PopularComparisons() {
  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <Badge variant="secondary">Popular Comparisons</Badge>
            </div>
            <h2 className="text-3xl font-bold mb-2">Compare Top VPNs</h2>
            <p className="text-muted-foreground">
              See how the most popular VPN services stack up against each other
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularComparisons.map((comparison) => (
              <Link
                key={`${comparison.slug1}-${comparison.slug2}`}
                href={`/compare/${comparison.slug1}-vs-${comparison.slug2}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-6">
                    {comparison.badge && (
                      <Badge className="mb-3 text-xs">{comparison.badge}</Badge>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1">
                          {comparison.vpn1}
                        </div>
                        <div className="text-xs text-muted-foreground">vs</div>
                        <div className="font-bold text-lg mt-1">
                          {comparison.vpn2}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
