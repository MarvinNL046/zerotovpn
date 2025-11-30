"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wifi,
  Download,
  Upload,
  Gauge,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  History,
  Share2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: number;
}

type TestStatus = "idle" | "testing-ping" | "testing-download" | "testing-upload" | "completed";

export function SpeedTestWidget() {
  const t = useTranslations("speedTest");
  const [status, setStatus] = useState<TestStatus>("idle");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [history, setHistory] = useState<SpeedTestResult[]>([]);
  const [progress, setProgress] = useState(0);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("speedTestHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load speed test history", e);
      }
    }
  }, []);

  // Save to history
  const saveToHistory = (result: SpeedTestResult) => {
    const newHistory = [result, ...history].slice(0, 5); // Keep last 5 tests
    setHistory(newHistory);
    localStorage.setItem("speedTestHistory", JSON.stringify(newHistory));
  };

  // Test ping/latency
  const testPing = async (): Promise<number> => {
    const iterations = 3;
    const pings: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      try {
        await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
          method: "HEAD",
          cache: "no-cache",
        });
        const endTime = performance.now();
        pings.push(endTime - startTime);
      } catch (error) {
        console.error("Ping test failed", error);
        pings.push(0);
      }
      setProgress((i + 1) * 10);
    }

    return pings.reduce((a, b) => a + b, 0) / pings.length;
  };

  // Test download speed
  const testDownload = async (): Promise<number> => {
    // Use a 5MB file from Cloudflare's speed test
    const testUrl = "https://speed.cloudflare.com/__down?bytes=5000000";
    const startTime = performance.now();

    try {
      const response = await fetch(testUrl, { cache: "no-cache" });
      const data = await response.blob();
      const endTime = performance.now();

      const durationSeconds = (endTime - startTime) / 1000;
      const bitsLoaded = data.size * 8;
      const speedBps = bitsLoaded / durationSeconds;
      const speedMbps = speedBps / 1000000;

      setProgress(60);
      return speedMbps;
    } catch (error) {
      console.error("Download test failed", error);
      return 0;
    }
  };

  // Test upload speed
  const testUpload = async (): Promise<number> => {
    // Create a 1MB blob to upload
    const uploadSize = 1000000; // 1MB
    const data = new Blob([new ArrayBuffer(uploadSize)]);
    const formData = new FormData();
    formData.append("file", data);

    const startTime = performance.now();

    try {
      await fetch("https://speed.cloudflare.com/__up", {
        method: "POST",
        body: formData,
        cache: "no-cache",
      });
      const endTime = performance.now();

      const durationSeconds = (endTime - startTime) / 1000;
      const bitsLoaded = uploadSize * 8;
      const speedBps = bitsLoaded / durationSeconds;
      const speedMbps = speedBps / 1000000;

      setProgress(90);
      return speedMbps;
    } catch (error) {
      console.error("Upload test failed", error);
      return 0;
    }
  };

  // Run the full speed test
  const runSpeedTest = async () => {
    setStatus("testing-ping");
    setProgress(0);
    setCurrentResult(null);

    try {
      // Test ping
      const ping = await testPing();
      setProgress(30);

      // Test download
      setStatus("testing-download");
      const download = await testDownload();

      // Test upload
      setStatus("testing-upload");
      const upload = await testUpload();

      // Complete
      setProgress(100);
      const result: SpeedTestResult = {
        downloadSpeed: Math.round(download * 10) / 10,
        uploadSpeed: Math.round(upload * 10) / 10,
        ping: Math.round(ping),
        timestamp: Date.now(),
      };

      setCurrentResult(result);
      saveToHistory(result);
      setStatus("completed");
    } catch (error) {
      console.error("Speed test failed", error);
      setStatus("idle");
    }
  };

  // Determine speed quality
  const getSpeedQuality = (speed: number): { label: string; color: string } => {
    if (speed >= 50) return { label: t("fast"), color: "text-green-600 dark:text-green-500" };
    if (speed >= 25) return { label: t("medium"), color: "text-yellow-600 dark:text-yellow-500" };
    return { label: t("slow"), color: "text-red-600 dark:text-red-500" };
  };

  // Share results
  const shareResults = () => {
    if (!currentResult) return;

    const text = `My internet speed test results:\n📥 Download: ${currentResult.downloadSpeed} Mbps\n📤 Upload: ${currentResult.uploadSpeed} Mbps\n⚡ Ping: ${currentResult.ping} ms\n\nTested on ZeroToVPN.com`;

    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert("Results copied to clipboard!");
    }
  };

  const isTesting = status !== "idle" && status !== "completed";
  const showResults = currentResult && status === "completed";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-6 w-6" />
              {t("title")}
            </CardTitle>
            <CardDescription>{t("subtitle")}</CardDescription>
          </div>
          {showResults && (
            <Button
              variant="outline"
              size="icon"
              onClick={shareResults}
              title="Share results"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Speed Display */}
        <div className="relative">
          {/* Circular gauge background */}
          <div className="relative w-64 h-64 mx-auto">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200 dark:text-gray-700"
                strokeDasharray="251.2"
                strokeDashoffset="62.8"
              />
              {/* Progress arc */}
              {isTesting && (
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-primary transition-all duration-300"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (progress / 100) * 188.4}
                  strokeLinecap="round"
                />
              )}
              {/* Results arc */}
              {showResults && currentResult && (
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className={cn(
                    "transition-all duration-500",
                    getSpeedQuality(currentResult.downloadSpeed).color
                  )}
                  strokeDasharray="251.2"
                  strokeDashoffset={
                    251.2 - (Math.min(currentResult.downloadSpeed / 100, 1) * 188.4)
                  }
                  strokeLinecap="round"
                />
              )}
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {status === "idle" && (
                <div className="text-center">
                  <Gauge className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <div className="text-sm text-muted-foreground">{t("startTest")}</div>
                </div>
              )}

              {isTesting && (
                <div className="text-center">
                  <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin mb-2" />
                  <div className="text-lg font-bold">{progress}%</div>
                  <div className="text-sm text-muted-foreground">
                    {status === "testing-ping" && t("testing")}
                    {status === "testing-download" && t("testing")}
                    {status === "testing-upload" && t("testing")}
                  </div>
                </div>
              )}

              {showResults && currentResult && (
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    {currentResult.downloadSpeed}
                  </div>
                  <div className="text-lg text-muted-foreground">Mbps</div>
                  <Badge
                    variant="outline"
                    className={cn("mt-2", getSpeedQuality(currentResult.downloadSpeed).color)}
                  >
                    {getSpeedQuality(currentResult.downloadSpeed).label}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        {showResults && currentResult && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <Download className="h-4 w-4" />
                <span className="text-sm">{t("download")}</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {currentResult.downloadSpeed}
              </div>
              <div className="text-xs text-muted-foreground">Mbps</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <Upload className="h-4 w-4" />
                <span className="text-sm">{t("upload")}</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {currentResult.uploadSpeed}
              </div>
              <div className="text-xs text-muted-foreground">Mbps</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{t("ping")}</span>
              </div>
              <div className="text-2xl font-bold text-primary">{currentResult.ping}</div>
              <div className="text-xs text-muted-foreground">ms</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={runSpeedTest}
            disabled={isTesting}
            className="flex-1"
            size="lg"
          >
            {isTesting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("testing")}
              </>
            ) : showResults ? (
              <>
                <Zap className="h-4 w-4" />
                {t("testAgain")}
              </>
            ) : (
              <>
                <Gauge className="h-4 w-4" />
                {t("startTest")}
              </>
            )}
          </Button>
        </div>

        {/* VPN Suggestion */}
        {showResults && currentResult && currentResult.downloadSpeed < 25 && (
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                  {t("tip")}
                </div>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  Your connection seems slow. A premium VPN might help improve your internet
                  speed and security. Check our top-rated VPN providers!
                </p>
              </div>
            </div>
          </div>
        )}

        {showResults && currentResult && currentResult.downloadSpeed >= 50 && (
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-green-900 dark:text-green-200 mb-1">
                  Great speed!
                </div>
                <p className="text-sm text-green-800 dark:text-green-300">
                  Your connection is fast! A VPN can help you maintain this speed while adding
                  security and privacy to your browsing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Test History */}
        {history.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <History className="h-4 w-4" />
              {t("history")}
            </h4>
            <div className="space-y-2">
              {history.map((test, index) => (
                <div
                  key={test.timestamp}
                  className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Badge variant="outline" className="text-xs">
                      {new Date(test.timestamp).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Download className="h-3 w-3" />
                      <span className="font-medium">{test.downloadSpeed} Mbps</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Upload className="h-3 w-3" />
                      <span className="font-medium">{test.uploadSpeed} Mbps</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">{test.ping} ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
