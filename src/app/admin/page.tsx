import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  MousePointer,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";
import { getDashboardStats, getAdminReviews } from "@/app/actions";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch real stats from database
  const stats = await getDashboardStats();

  // Get recent reviews
  const { reviews: recentReviewsData } = await getAdminReviews({ page: 1, limit: 5 });

  const statsCards = [
    {
      title: "Total Reviews",
      value: stats.reviews.total,
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Pending Moderation",
      value: stats.reviews.pending,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "This Week",
      value: stats.reviews.thisWeek,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Newsletter Subscribers",
      value: stats.subscribers.total,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the ZeroToVPN admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
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
          {recentReviewsData.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No reviews yet. Reviews will appear here once users submit them.
            </p>
          ) : (
            <div className="space-y-4">
              {recentReviewsData.map((review) => (
                <div
                  key={review.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.author_name}</span>
                      <span className="text-muted-foreground">reviewed</span>
                      <span className="font-medium capitalize">{review.vpn_slug}</span>
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
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardContent className="pt-6">
            <Link href="/admin/vpns" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-semibold">VPN Providers</h3>
                <p className="text-sm text-muted-foreground">
                  Manage VPN data
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardContent className="pt-6">
            <Link href="/admin/reviews" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Moderate Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  {stats.reviews.pending} reviews waiting
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardContent className="pt-6">
            <Link href="/admin/clicks" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <MousePointer className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Click Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  {stats.clicks.total} total clicks
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary cursor-pointer transition-colors">
          <CardContent className="pt-6">
            <Link href="/admin/settings" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Subscribers</h3>
                <p className="text-sm text-muted-foreground">
                  {stats.subscribers.total} total subscribers
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
