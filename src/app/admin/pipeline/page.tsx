"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  Zap,
  Link2,
  Activity,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Play,
} from "lucide-react";

interface PipelineStatus {
  scraping: {
    recentJobs: Array<{
      id: string;
      type: string;
      status: string;
      source: string;
      createdAt: string;
      completedAt: string | null;
    }>;
    errorsLast24h: number;
  };
  content: {
    pendingQueueItems: number;
    recentPosts: Array<{
      id: string;
      slug: string;
      title: string;
      published: boolean;
      createdAt: string;
    }>;
    publishedTotal: number;
    postsThisWeek: number;
  };
  affiliateLinks: {
    total: number;
  };
  health: {
    status: string;
    timestamp: string;
  };
}

type ActionType = "scrape-vpn" | "scrape-news" | "generate" | "sync-links";

export default function PipelinePage() {
  const [status, setStatus] = useState<PipelineStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<ActionType | null>(null);
  const [actionResult, setActionResult] = useState<{
    type: ActionType;
    success: boolean;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const adminKey =
    typeof window !== "undefined"
      ? localStorage.getItem("pipeline-admin-key") || ""
      : "";

  const [key, setKey] = useState(adminKey);

  const saveKey = (newKey: string) => {
    setKey(newKey);
    localStorage.setItem("pipeline-admin-key", newKey);
  };

  const fetchStatus = async () => {
    if (!key) {
      setError("Enter your Pipeline API key first");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pipeline/status", {
        headers: { "x-admin-key": key },
      });
      if (!res.ok) throw new Error(`Status ${res.status}: ${res.statusText}`);
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch status");
    } finally {
      setLoading(false);
    }
  };

  const runAction = async (action: ActionType) => {
    if (!key) {
      setError("Enter your Pipeline API key first");
      return;
    }
    setActionLoading(action);
    setActionResult(null);
    try {
      let url: string;
      let body: string;

      switch (action) {
        case "scrape-vpn":
          url = "/api/pipeline/scrape";
          body = JSON.stringify({ type: "vpn-data" });
          break;
        case "scrape-news":
          url = "/api/pipeline/scrape";
          body = JSON.stringify({ type: "news" });
          break;
        case "generate":
          url = "/api/pipeline/generate";
          body = JSON.stringify({
            type: "blog-post",
            topic: "auto",
            model: "claude-haiku",
          });
          break;
        case "sync-links":
          url = "/api/pipeline/sync-links";
          body = "{}";
          break;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Failed with status ${res.status}`);
      }

      setActionResult({
        type: action,
        success: true,
        message: JSON.stringify(data, null, 2),
      });

      // Refresh status after action
      fetchStatus();
    } catch (err) {
      setActionResult({
        type: action,
        success: false,
        message: err instanceof Error ? err.message : "Action failed",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const statusBadge = (s: string) => {
    switch (s) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      case "running":
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Running
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
            <Clock className="h-3 w-3 mr-1" />
            {s}
          </Badge>
        );
    }
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Pipeline</h1>
          <p className="text-muted-foreground">
            Scraping, AI generation & affiliate link management
          </p>
        </div>
        <Button onClick={fetchStatus} disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh Status
        </Button>
      </div>

      {/* API Key Input */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium whitespace-nowrap">
              Pipeline Key:
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => saveKey(e.target.value)}
              placeholder="Enter PIPELINE_SECRET..."
              className="flex-1 px-3 py-2 border rounded-md bg-background text-sm"
            />
            <Button onClick={fetchStatus} size="sm">
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Scrape VPN Data</h3>
                <p className="text-xs text-muted-foreground">
                  All provider pricing
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full"
              onClick={() => runAction("scrape-vpn")}
              disabled={actionLoading === "scrape-vpn"}
            >
              {actionLoading === "scrape-vpn" ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-1" />
              )}
              Run Scrape
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                <Activity className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Scrape News</h3>
                <p className="text-xs text-muted-foreground">
                  VPN industry news
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full"
              onClick={() => runAction("scrape-news")}
              disabled={actionLoading === "scrape-news"}
            >
              {actionLoading === "scrape-news" ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-1" />
              )}
              Run Scrape
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Generate Post</h3>
                <p className="text-xs text-muted-foreground">
                  AI blog content
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full"
              onClick={() => runAction("generate")}
              disabled={actionLoading === "generate"}
            >
              {actionLoading === "generate" ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-1" />
              )}
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <Link2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Sync Links</h3>
                <p className="text-xs text-muted-foreground">
                  Short.io affiliate
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full"
              onClick={() => runAction("sync-links")}
              disabled={actionLoading === "sync-links"}
            >
              {actionLoading === "sync-links" ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-1" />
              )}
              Sync
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Result */}
      {actionResult && (
        <Card
          className={
            actionResult.success
              ? "border-green-200 dark:border-green-900"
              : "border-red-200 dark:border-red-900"
          }
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              {actionResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              {actionResult.type} —{" "}
              {actionResult.success ? "Success" : "Failed"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto max-h-48">
              {actionResult.message}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Status Dashboard */}
      {status && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Published Posts
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {status.content.publishedTotal}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Posts This Week
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {status.content.postsThisWeek}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Affiliate Links
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {status.affiliateLinks.total}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                    <Link2 className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Scrape Errors (24h)
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {status.scraping.errorsLast24h}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Scrape Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Scrape Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              {status.scraping.recentJobs.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">
                  No scrape jobs yet. Run your first scrape above.
                </p>
              ) : (
                <div className="space-y-3">
                  {status.scraping.recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {job.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {job.source}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(job.createdAt)}
                        </span>
                        {statusBadge(job.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Blog Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Generated Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {status.content.recentPosts.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">
                  No posts generated yet. Use the Generate button above.
                </p>
              ) : (
                <div className="space-y-3">
                  {status.content.recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          /blog/{post.slug}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </span>
                        {post.published ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            Published
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                            Draft
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty state when no status loaded */}
      {!status && !error && (
        <Card>
          <CardContent className="py-12 text-center">
            <Activity className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold mb-2">Pipeline Status</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Pipeline key and click &quot;Refresh Status&quot; to
              load the dashboard
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
