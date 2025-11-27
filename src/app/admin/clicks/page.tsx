"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MousePointer,
  TrendingUp,
  Globe,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { getAllVpns } from "@/lib/vpn-data";

// Mock click data (in production this would come from the database)
const mockClicks = [
  { vpnSlug: "nordvpn", country: "US", date: "2024-11-27", count: 145 },
  { vpnSlug: "nordvpn", country: "GB", date: "2024-11-27", count: 87 },
  { vpnSlug: "surfshark", country: "US", date: "2024-11-27", count: 92 },
  { vpnSlug: "expressvpn", country: "US", date: "2024-11-27", count: 68 },
  { vpnSlug: "nordvpn", country: "DE", date: "2024-11-27", count: 54 },
  { vpnSlug: "cyberghost", country: "US", date: "2024-11-27", count: 41 },
  { vpnSlug: "protonvpn", country: "CH", date: "2024-11-27", count: 38 },
  { vpnSlug: "surfshark", country: "NL", date: "2024-11-27", count: 35 },
  { vpnSlug: "nordvpn", country: "NL", date: "2024-11-26", count: 132 },
  { vpnSlug: "surfshark", country: "GB", date: "2024-11-26", count: 78 },
  { vpnSlug: "expressvpn", country: "AU", date: "2024-11-26", count: 45 },
  { vpnSlug: "private-internet-access", country: "CA", date: "2024-11-26", count: 32 },
];

export default function ClickAnalyticsPage() {
  const [dateRange, setDateRange] = useState("7days");
  const [vpnFilter, setVpnFilter] = useState("all");

  const vpns = getAllVpns();

  // Calculate stats
  const filteredClicks = mockClicks.filter(
    (click) => vpnFilter === "all" || click.vpnSlug === vpnFilter
  );

  const totalClicks = filteredClicks.reduce((acc, c) => acc + c.count, 0);

  // Group by VPN
  const clicksByVpn = filteredClicks.reduce((acc, click) => {
    acc[click.vpnSlug] = (acc[click.vpnSlug] || 0) + click.count;
    return acc;
  }, {} as Record<string, number>);

  // Group by country
  const clicksByCountry = filteredClicks.reduce((acc, click) => {
    acc[click.country] = (acc[click.country] || 0) + click.count;
    return acc;
  }, {} as Record<string, number>);

  // Sort by clicks
  const sortedVpns = Object.entries(clicksByVpn).sort((a, b) => b[1] - a[1]);
  const sortedCountries = Object.entries(clicksByCountry).sort((a, b) => b[1] - a[1]);

  // Get VPN name from slug
  const getVpnName = (slug: string) => {
    const vpn = vpns.find((v) => v.slug === slug);
    return vpn?.name || slug;
  };

  // Country flag emoji
  const getCountryFlag = (code: string) => {
    const flags: Record<string, string> = {
      US: "🇺🇸",
      GB: "🇬🇧",
      DE: "🇩🇪",
      NL: "🇳🇱",
      FR: "🇫🇷",
      AU: "🇦🇺",
      CA: "🇨🇦",
      CH: "🇨🇭",
    };
    return flags[code] || "🌍";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Click Analytics</h1>
          <p className="text-muted-foreground">
            Track affiliate link performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={vpnFilter} onValueChange={setVpnFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All VPNs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All VPNs</SelectItem>
              {vpns.map((vpn) => (
                <SelectItem key={vpn.slug} value={vpn.slug}>
                  {vpn.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-3xl font-bold mt-1">{totalClicks.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <MousePointer className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active VPNs</p>
                <p className="text-3xl font-bold mt-1">{Object.keys(clicksByVpn).length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Countries</p>
                <p className="text-3xl font-bold mt-1">{Object.keys(clicksByCountry).length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Globe className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Per Day</p>
                <p className="text-3xl font-bold mt-1">
                  {Math.round(totalClicks / 7).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks by VPN */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Clicks by VPN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedVpns.map(([slug, clicks]) => {
                const percentage = (clicks / totalClicks) * 100;
                return (
                  <div key={slug}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{getVpnName(slug)}</span>
                      <span className="text-sm text-muted-foreground">
                        {clicks.toLocaleString()} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Clicks by Country */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Clicks by Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedCountries.map(([country, clicks]) => {
                const percentage = (clicks / totalClicks) * 100;
                return (
                  <div key={country}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">
                        {getCountryFlag(country)} {country}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {clicks.toLocaleString()} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Clicks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Click Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">VPN</th>
                  <th className="text-left py-3 px-4 font-medium">Country</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-right py-3 px-4 font-medium">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {mockClicks.slice(0, 10).map((click, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="capitalize">
                        {click.vpnSlug}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {getCountryFlag(click.country)} {click.country}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {click.date}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {click.count.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Info Notice */}
      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This is demo data. Connect a database to track real affiliate clicks.
            The API route at <code className="bg-muted px-1 rounded">/api/click</code> is ready to record clicks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
