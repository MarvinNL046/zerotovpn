"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface ReviewFiltersProps {
  vpnSlugs: string[];
  currentStatus: string;
  currentVpn: string;
}

export function ReviewFilters({ vpnSlugs, currentStatus, currentVpn }: ReviewFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/admin/reviews?${params.toString()}`);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={currentStatus}
            onValueChange={(value) => updateFilter("status", value)}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={currentVpn}
            onValueChange={(value) => updateFilter("vpn", value)}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="VPN" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All VPNs</SelectItem>
              {vpnSlugs.map((slug) => (
                <SelectItem key={slug} value={slug} className="capitalize">
                  {slug}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
