import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { getAdminReviews } from "@/app/actions";
import { ReviewFilters } from "./review-filters";
import { ReviewCard } from "./review-card";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function ReviewModerationPage({
  searchParams,
}: {
  searchParams: { status?: string; vpn?: string };
}) {
  // Get filter values
  const filterStatus = searchParams.status || "all";
  const filterVpn = searchParams.vpn || "all";

  // Determine approved filter
  let approvedFilter: boolean | undefined = undefined;
  if (filterStatus === "pending") approvedFilter = false;
  if (filterStatus === "approved") approvedFilter = true;

  // Fetch reviews from database
  const { reviews, pagination } = await getAdminReviews({
    approved: approvedFilter,
    vpnSlug: filterVpn !== "all" ? filterVpn : undefined,
    page: 1,
    limit: 50,
  });

  // Get unique VPN slugs for filter
  const vpnSlugs = [...new Set(reviews.map((r: any) => r.vpn_slug))];

  // Count pending reviews
  const { reviews: pendingReviews } = await getAdminReviews({
    approved: false,
    page: 1,
    limit: 1,
  });
  const pendingCount = pagination.total;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Review Moderation</h1>
          <p className="text-muted-foreground">
            Manage and moderate user reviews
          </p>
        </div>
        {filterStatus !== "approved" && pendingCount > 0 && (
          <Badge variant="destructive" className="w-fit">
            <AlertCircle className="h-4 w-4 mr-1" />
            {pendingCount} pending
          </Badge>
        )}
      </div>

      {/* Filters */}
      <ReviewFilters
        vpnSlugs={vpnSlugs}
        currentStatus={filterStatus}
        currentVpn={filterVpn}
      />

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {filterStatus === "pending"
                  ? "No pending reviews. Great job!"
                  : "No reviews found with the current filters."}
              </p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review: any) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>

      {/* Pagination Info */}
      {pagination.totalPages > 1 && (
        <Card>
          <CardContent className="py-4 text-center text-sm text-muted-foreground">
            Showing {reviews.length} of {pagination.total} reviews
          </CardContent>
        </Card>
      )}
    </div>
  );
}
