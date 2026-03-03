"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { VpnIndexRow } from "@/lib/vpn-transparency-data";

type FilterMode = "all" | "budget" | "privacy" | "streaming" | "gaming";

interface VpnIndexDashboardProps {
  rows: VpnIndexRow[];
}

function matchesFilter(row: VpnIndexRow, filter: FilterMode): boolean {
  if (filter === "all") return true;
  if (filter === "budget") return row.priceMonthly <= 3;
  if (filter === "privacy") return row.loggingPolicy === "strict-no-logs" && row.auditStatus !== "no-public-audit";
  if (filter === "streaming") return row.streamingServicesUnlocked >= 7;
  if (filter === "gaming") return row.averageLatencyMs <= 55 && row.downloadMbps.eu >= 85;
  return true;
}

function getRiskVariant(risk: VpnIndexRow["jurisdictionRisk"]): "green" | "orange" | "red" {
  if (risk === "low") return "green";
  if (risk === "medium") return "orange";
  return "red";
}

export function VpnIndexDashboard({ rows }: VpnIndexDashboardProps) {
  const [filter, setFilter] = useState<FilterMode>("all");

  const filteredRows = useMemo(
    () => rows.filter((row) => matchesFilter(row, filter)),
    [rows, filter]
  );

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Filter by use case</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "budget" ? "default" : "outline"} size="sm" onClick={() => setFilter("budget")}>
            Budget
          </Button>
          <Button variant={filter === "privacy" ? "default" : "outline"} size="sm" onClick={() => setFilter("privacy")}>
            Privacy-first
          </Button>
          <Button variant={filter === "streaming" ? "default" : "outline"} size="sm" onClick={() => setFilter("streaming")}>
            Streaming
          </Button>
          <Button variant={filter === "gaming" ? "default" : "outline"} size="sm" onClick={() => setFilter("gaming")}>
            Gaming
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRows.map((row, index) => (
          <Card key={row.slug} className="border-primary/15">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-xl">
                  #{index + 1} {row.name}
                </CardTitle>
                <Badge variant="blue">{row.transparencyScore}/100</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={getRiskVariant(row.jurisdictionRisk)}>
                  {row.jurisdiction}
                </Badge>
                <Badge variant="outline">{row.loggingPolicy === "strict-no-logs" ? "No-logs" : "Partial logs"}</Badge>
                <Badge variant="outline">Last tested: {row.lastTested}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Speed EU/US/Asia: {row.downloadMbps.eu} / {row.downloadMbps.us} / {row.downloadMbps.asia} Mbps</p>
              <p>Latency: {row.averageLatencyMs} ms</p>
              <p>Kill switch reliability: {row.killSwitchReliability}%</p>
              <p>Streaming unlock: {row.streamingServicesUnlocked}/10 services</p>
              <p>Price from: ${row.priceMonthly.toFixed(2)}/mo</p>
              <p className="pt-1">
                <Link href={`/reviews/${row.slug}`} className="text-primary hover:underline">
                  Open full review
                </Link>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
