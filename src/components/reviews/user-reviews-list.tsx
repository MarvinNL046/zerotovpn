"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/vpn/rating-stars";
import {
  ThumbsUp,
  ThumbsDown,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Shield,
  User,
  Calendar,
  MapPin,
} from "lucide-react";
import type { UserReview } from "@/lib/user-reviews";
import { usageTypeLabels, usagePeriodLabels } from "@/lib/user-reviews";

interface UserReviewsListProps {
  reviews: UserReview[];
  locale: string;
  averageRating: number;
  totalReviews: number;
}

export function UserReviewsList({
  reviews,
  locale,
  averageRating,
  totalReviews,
}: UserReviewsListProps) {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent");

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const sortedReviews = [...displayedReviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpfulCount - a.helpfulCount;
      case "rating":
        return b.rating - a.rating;
      case "recent":
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  const labels = {
    en: {
      userReviews: "User Reviews",
      basedOn: "Based on",
      reviews: "reviews",
      sortBy: "Sort by:",
      recent: "Most Recent",
      mostHelpful: "Most Helpful",
      highestRating: "Highest Rating",
      verified: "Verified Purchase",
      usedFor: "Used for",
      experience: "Experience",
      wasHelpful: "Was this helpful?",
      notHelpful: "Not Helpful",
      pros: "Pros",
      cons: "Cons",
      showAll: "Show All Reviews",
      showLess: "Show Less",
      noReviews: "No reviews yet. Be the first to review!",
    },
    nl: {
      userReviews: "Gebruikersreviews",
      basedOn: "Gebaseerd op",
      reviews: "reviews",
      sortBy: "Sorteer op:",
      recent: "Meest Recent",
      mostHelpful: "Meest Behulpzaam",
      highestRating: "Hoogste Beoordeling",
      verified: "Geverifieerde Aankoop",
      usedFor: "Gebruikt voor",
      experience: "Ervaring",
      wasHelpful: "Was dit behulpzaam?",
      notHelpful: "Niet Behulpzaam",
      pros: "Voordelen",
      cons: "Nadelen",
      showAll: "Toon Alle Reviews",
      showLess: "Toon Minder",
      noReviews: "Nog geen reviews. Wees de eerste!",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;
  const usageLabels = usageTypeLabels[locale] || usageTypeLabels.en;
  const periodLabels = usagePeriodLabels[locale] || usagePeriodLabels.en;

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">{t.noReviews}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardContent className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
                <div>
                  <RatingStars rating={averageRating} size="lg" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.basedOn} {totalReviews} {t.reviews}
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sort Options */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{t.sortBy}</span>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "recent" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("recent")}
          >
            {t.recent}
          </Button>
          <Button
            variant={sortBy === "helpful" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("helpful")}
          >
            {t.mostHelpful}
          </Button>
          <Button
            variant={sortBy === "rating" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("rating")}
          >
            {t.highestRating}
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            locale={locale}
            t={t}
            usageLabels={usageLabels}
            periodLabels={periodLabels}
          />
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll ? (
              <>
                {t.showLess} <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                {t.showAll} ({reviews.length}) <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

interface ReviewCardProps {
  review: UserReview;
  locale: string;
  t: Record<string, string>;
  usageLabels: Record<string, string>;
  periodLabels: Record<string, string>;
}

function ReviewCard({ review, locale, t, usageLabels, periodLabels }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const contentPreviewLength = 200;
  const shouldTruncate = review.content.length > contentPreviewLength;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className={review.featured ? "border-primary" : ""}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{review.authorName}</span>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    {t.verified}
                  </Badge>
                )}
                {review.featured && (
                  <Badge className="bg-yellow-500 text-yellow-950 text-xs">Featured</Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                {review.authorCountry && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {review.authorCountry}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <RatingStars rating={review.rating} size="md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        <h4 className="font-semibold text-lg">{review.title}</h4>

        {/* Usage badges */}
        {(review.usageType || review.usagePeriod) && (
          <div className="flex flex-wrap gap-2">
            {review.usageType && (
              <Badge variant="outline">
                {t.usedFor}: {usageLabels[review.usageType] || review.usageType}
              </Badge>
            )}
            {review.usagePeriod && (
              <Badge variant="outline">
                {t.experience}: {periodLabels[review.usagePeriod] || review.usagePeriod}
              </Badge>
            )}
          </div>
        )}

        {/* Content */}
        <p className="text-muted-foreground">
          {shouldTruncate && !expanded
            ? `${review.content.slice(0, contentPreviewLength)}...`
            : review.content}
        </p>

        {shouldTruncate && (
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read more"}
          </Button>
        )}

        {/* Pros & Cons */}
        {(review.userPros.length > 0 || review.userCons.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {review.userPros.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-green-600">{t.pros}</span>
                <ul className="space-y-1">
                  {review.userPros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {review.userCons.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-red-600">{t.cons}</span>
                <ul className="space-y-1">
                  {review.userCons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Helpfulness */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <span className="text-sm text-muted-foreground">Was this helpful?</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {review.helpfulCount}
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <ThumbsDown className="h-4 w-4 mr-1" />
              {review.unhelpfulCount}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
