"use client";

import { useState, useEffect } from "react";
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
  TrendingDown,
  TrendingUp,
  Globe,
  Calendar,
  ExternalLink,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { getAllVpns } from "@/lib/vpn-data";
import type { AnalyticsData } from "@/lib/shortio";

export default function ClickAnalyticsPage() {
  const [dateRange, setDateRange] = useState("7");
  const [vpnFilter, setVpnFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const vpns = getAllVpns();

  // Fetch analytics data
  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/admin/analytics?days=${dateRange}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch analytics");
        }

        const data: AnalyticsData = await response.json();
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [dateRange]);

  // Filter link stats by VPN
  const filteredStats = analytics?.linkStats.filter((stat) => {
    if (vpnFilter === "all") return true;
    return stat.path.toLowerCase() === vpnFilter.toLowerCase();
  }) || [];

  // Get VPN name from path
  const getVpnName = (path: string) => {
    const slug = path.replace(/^\//, "");
    const vpn = vpns.find((v) => v.slug === slug);
    return vpn?.name || path.replace(/^\//, "").replace(/-/g, " ");
  };


  // Calculate filtered total clicks
  const filteredTotalClicks = filteredStats.reduce((acc, stat) => acc + stat.clicks, 0);

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Click Analytics</h1>
          <p className="text-muted-foreground">
            Track affiliate link performance with Short.io
          </p>
        </div>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <div>
                <p className="font-medium">Failed to load analytics</p>
                <p className="text-sm">{String(error)}</p>
                <p className="text-sm mt-2 text-muted-foreground">
                  Check that SHORTIO_API_KEY is configured in .env
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (loading || !analytics) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Click Analytics</h1>
          <p className="text-muted-foreground">
            Track affiliate link performance with Short.io
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Click Analytics</h1>
          <p className="text-muted-foreground">
            Track affiliate link performance with Short.io
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Today</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">All time</SelectItem>
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
                <p className="text-3xl font-bold mt-1">
                  {analytics.totalClicks.toLocaleString()}
                </p>
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
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-3xl font-bold mt-1">
                  {analytics.clicksToday.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold mt-1">
                  {analytics.clicksThisWeek.toLocaleString()}
                </p>
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
                <p className="text-sm text-muted-foreground">Trend</p>
                <p className="text-3xl font-bold mt-1 flex items-center gap-1">
                  {analytics.trendPercentage > 0 ? (
                    <>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-green-500">
                        +{analytics.trendPercentage.toFixed(1)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <span className="text-red-500">
                        {analytics.trendPercentage.toFixed(1)}%
                      </span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing VPNs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Top Performing VPNs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topLinks.map((link, index) => {
              const percentage = analytics.totalClicks > 0
                ? (link.clicks / analytics.totalClicks) * 100
                : 0;
              return (
                <div key={link.path}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span className="font-medium">{link.vpnName}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {link.clicks.toLocaleString()} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
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

      {/* All Links Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            All Affiliate Links
            {vpnFilter !== "all" && (
              <Badge variant="secondary" className="ml-2">
                Filtered: {getVpnName(vpnFilter)}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">VPN</th>
                  <th className="text-left py-3 px-4 font-medium">Short URL</th>
                  <th className="text-right py-3 px-4 font-medium">Total Clicks</th>
                  <th className="text-left py-3 px-4 font-medium">Last Click</th>
                </tr>
              </thead>
              <tbody>
                {filteredStats.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No data available
                    </td>
                  </tr>
                ) : (
                  filteredStats.map((stat) => (
                    <tr key={stat.path} className="border-b last:border-0">
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="capitalize">
                          {getVpnName(stat.path)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={`https://go.zerotovpn.com${stat.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          go.zerotovpn.com{stat.path}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {stat.clicks.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {stat.lastClickDate
                          ? new Date(stat.lastClickDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Never"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filteredStats.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Showing {filteredStats.length} link{filteredStats.length !== 1 ? "s" : ""}
                </span>
                <span className="font-medium">
                  Total: {filteredTotalClicks.toLocaleString()} clicks
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Notice */}
      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            <strong>Live Data:</strong> Analytics are powered by Short.io API. Data refreshes every 5 minutes.
            All links use the format <code className="bg-muted px-1 rounded">https://go.zerotovpn.com/[vpn-slug]</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
