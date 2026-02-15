"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Star,
  User,
  Calendar,
  Trash2,
  Loader2,
} from "lucide-react";
import { moderateReview, deleteReview, toggleFeatured } from "@/app/actions";
import { useRouter } from "next/navigation";

// Type matching the database structure (camelCase)
interface UserReview {
  id: string;
  vpnSlug: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  content: string;
  usageType: string | null;
  usagePeriod: string | null;
  userPros: string[] | null;
  userCons: string[] | null;
  approved: boolean;
  featured: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  createdAt: Date;
}

interface ReviewCardProps {
  review: UserReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const handleApprove = async () => {
    setIsLoading(true);
    const result = await moderateReview(review.id, true);
    if (result.success) {
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleReject = async () => {
    setIsLoading(true);
    const result = await moderateReview(review.id, false);
    if (result.success) {
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteReview(review.id);
    if (result.success) {
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleToggleFeatured = async () => {
    setIsLoading(true);
    const result = await toggleFeatured(review.id, !review.featured);
    if (result.success) {
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <Card
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
            {((review.userPros?.length ?? 0) > 0 || (review.userCons?.length ?? 0) > 0) && (
              <div className="flex flex-wrap gap-2">
                {review.userPros?.map((pro: string, i: number) => (
                  <Badge
                    key={`pro-${i}`}
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400"
                  >
                    + {pro}
                  </Badge>
                ))}
                {review.userCons?.map((con: string, i: number) => (
                  <Badge
                    key={`con-${i}`}
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400"
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
                  onClick={handleApprove}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  )}
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-1" />
                  )}
                  Reject
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant={review.featured ? "default" : "outline"}
                  onClick={handleToggleFeatured}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Star
                      className={`h-4 w-4 mr-1 ${
                        review.featured ? "fill-current" : ""
                      }`}
                    />
                  )}
                  {review.featured ? "Unfeature" : "Feature"}
                </Button>
                {!showDeleteConfirm ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex flex-col gap-1">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        "Confirm Delete"
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
