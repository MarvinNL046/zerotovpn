"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  MousePointer,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { mockUserReviews } from "@/lib/user-reviews";

export default function AdminDashboard() {
  // Calculate stats from mock data (replace with API calls in production)
  const totalReviews = mockUserReviews.length;
  const pendingReviews = mockUserReviews.filter((r) => !r.approved).length;
  const approvedReviews = mockUserReviews.filter((r) => r.approved).length;
  const averageRating =
    mockUserReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews || 0;

  const stats = [
    {
      title: "Total Reviews",
      value: totalReviews,
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Pending Moderation",
      value: pendingReviews,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "Approved Reviews",
      value: approvedReviews,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(1),
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  // Recent reviews for quick access
  const recentReviews = [...mockUserReviews]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the ZeroToVPN admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div
                key={review.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.authorName}</span>
                    <span className="text-muted-foreground">reviewed</span>
                    <span className="font-medium capitalize">{review.vpnSlug}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {review.title}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      review.approved
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                    }`}
                  >
                    {review.approved ? "Approved" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardContent className="pt-6">
            <a href="/admin/reviews" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Moderate Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  {pendingReviews} reviews waiting
                </p>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardContent className="pt-6">
            <a href="/admin/clicks" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <MousePointer className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Click Analytics</h3>
                <p className="text-sm text-muted-foreground">View affiliate performance</p>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardContent className="pt-6">
            <a href="/admin/settings" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Settings</h3>
                <p className="text-sm text-muted-foreground">Configure dashboard</p>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
