"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  XCircle,
  Search,
  Star,
  User,
  Calendar,
  MapPin,
  Eye,
  Trash2,
  Filter,
  AlertCircle,
} from "lucide-react";
import { mockUserReviews, type UserReview } from "@/lib/user-reviews";

export default function ReviewModerationPage() {
  const [reviews, setReviews] = useState<UserReview[]>(mockUserReviews);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterVpn, setFilterVpn] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState<UserReview | null>(null);

  // Get unique VPN slugs
  const vpnSlugs = [...new Set(mockUserReviews.map((r) => r.vpnSlug))];

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "pending" && !review.approved) ||
      (filterStatus === "approved" && review.approved);
    const matchesVpn = filterVpn === "all" || review.vpnSlug === filterVpn;
    const matchesSearch =
      !searchQuery ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesVpn && matchesSearch;
  });

  const handleApprove = (reviewId: string) => {
    setReviews(
      reviews.map((r) =>
        r.id === reviewId ? { ...r, approved: true } : r
      )
    );
    // In production: call API to update database
  };

  const handleReject = (reviewId: string) => {
    setReviews(reviews.filter((r) => r.id !== reviewId));
    // In production: call API to delete from database
  };

  const handleFeature = (reviewId: string) => {
    setReviews(
      reviews.map((r) =>
        r.id === reviewId ? { ...r, featured: !r.featured } : r
      )
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const pendingCount = reviews.filter((r) => !r.approved).length;

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
        {pendingCount > 0 && (
          <Badge variant="destructive" className="w-fit">
            <AlertCircle className="h-4 w-4 mr-1" />
            {pendingCount} pending
          </Badge>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterVpn} onValueChange={setFilterVpn}>
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

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No reviews found</p>
            </CardContent>
          </Card>
        ) : (
          filteredReviews.map((review) => (
            <Card
              key={review.id}
              className={`${
                !review.approved ? "border-yellow-500" : ""
              } ${review.featured ? "border-primary" : ""}`}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Review Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{review.authorName}</span>
                      </div>
                      {review.authorCountry && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {review.authorCountry}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(review.createdAt)}
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {review.vpnSlug}
                      </Badge>
                      {review.featured && (
                        <Badge className="bg-yellow-500">Featured</Badge>
                      )}
                    </div>

                    {/* Rating & Title */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground">
                          {review.rating}/5
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg">{review.title}</h3>
                    </div>

                    {/* Content */}
                    <p className="text-muted-foreground">{review.content}</p>

                    {/* Pros & Cons */}
                    {(review.userPros.length > 0 || review.userCons.length > 0) && (
                      <div className="flex flex-wrap gap-2">
                        {review.userPros.map((pro, i) => (
                          <Badge
                            key={`pro-${i}`}
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            + {pro}
                          </Badge>
                        ))}
                        {review.userCons.map((con, i) => (
                          <Badge
                            key={`con-${i}`}
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            - {con}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Email: {review.authorEmail}</span>
                      {review.usageType && (
                        <span className="capitalize">Use: {review.usageType}</span>
                      )}
                      {review.usagePeriod && (
                        <span>Duration: {review.usagePeriod}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    {!review.approved ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(review.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(review.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant={review.featured ? "default" : "outline"}
                          onClick={() => handleFeature(review.id)}
                        >
                          <Star
                            className={`h-4 w-4 mr-1 ${
                              review.featured ? "fill-current" : ""
                            }`}
                          />
                          {review.featured ? "Featured" : "Feature"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedReview(review)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleReject(review.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedReview(null)}
        >
          <Card
            className="w-full max-w-2xl max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <CardTitle>Review Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Author:</span>
                  <p className="font-medium">{selectedReview.authorName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium">{selectedReview.authorEmail}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">VPN:</span>
                  <p className="font-medium capitalize">{selectedReview.vpnSlug}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Rating:</span>
                  <p className="font-medium">{selectedReview.rating}/5</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium">{formatDate(selectedReview.createdAt)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Locale:</span>
                  <p className="font-medium">{selectedReview.locale}</p>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Title:</span>
                <p className="font-medium">{selectedReview.title}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Content:</span>
                <p className="whitespace-pre-wrap">{selectedReview.content}</p>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => setSelectedReview(null)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
