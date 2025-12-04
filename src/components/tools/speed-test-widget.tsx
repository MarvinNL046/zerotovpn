"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Upload,
  Activity,
  Play,
  RotateCcw,
  Share2,
  History,
  Server,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  timestamp: number;
  server: string;
}

type TestPhase = "idle" | "init" | "ping" | "download" | "upload" | "complete";

export function SpeedTestWidget() {
  const [phase, setPhase] = useState<TestPhase>("idle");
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [history, setHistory] = useState<SpeedTestResult[]>([]);
  const serverLocation = "Cloudflare CDN";
  const abortControllerRef = useRef<AbortController | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const displaySpeedRef = useRef(0);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("speedTestHistory");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHistory(JSON.parse(saved));
      } catch {
        console.error("Failed to load history");
      }
    }
  }, []);

  // Animate speed needle smoothly - using ref to avoid closure issues
  const animateSpeed = useCallback((targetSpeed: number, duration: number = 500) => {
    // Cap speed to max 500 Mbps for display
    const cappedTarget = Math.min(targetSpeed, 500);
    const startSpeed = displaySpeedRef.current;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newSpeed = startSpeed + (cappedTarget - startSpeed) * easeOut;
      const roundedSpeed = Math.round(newSpeed * 10) / 10;

      displaySpeedRef.current = roundedSpeed;
      setCurrentSpeed(roundedSpeed);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Measure ping with multiple samples
  const measurePing = async (signal: AbortSignal): Promise<{ ping: number; jitter: number }> => {
    const samples: number[] = [];
    const testUrl = "https://www.cloudflare.com/cdn-cgi/trace";

    for (let i = 0; i < 10; i++) {
      if (signal.aborted) throw new Error("Aborted");

      const start = performance.now();
      try {
        await fetch(testUrl, {
          method: "HEAD",
          cache: "no-store",
          signal
        });
        const end = performance.now();
        samples.push(end - start);
      } catch (e) {
        if (signal.aborted) throw e;
      }

      // Small delay between pings
      await new Promise(r => setTimeout(r, 100));
    }

    if (samples.length === 0) return { ping: 0, jitter: 0 };

    const avgPing = samples.reduce((a, b) => a + b, 0) / samples.length;

    // Calculate jitter (variation in ping)
    const jitterCalc = samples.length > 1
      ? Math.sqrt(samples.reduce((sum, p) => sum + Math.pow(p - avgPing, 2), 0) / samples.length)
      : 0;

    return {
      ping: Math.round(avgPing),
      jitter: Math.round(jitterCalc * 10) / 10
    };
  };

  // Download speed test with progressive measurement
  const measureDownload = async (signal: AbortSignal): Promise<number> => {
    const testSizes = [
      { size: 1000000, url: "https://speed.cloudflare.com/__down?bytes=1000000" },   // 1MB warmup
      { size: 5000000, url: "https://speed.cloudflare.com/__down?bytes=5000000" },   // 5MB
      { size: 10000000, url: "https://speed.cloudflare.com/__down?bytes=10000000" }, // 10MB
      { size: 25000000, url: "https://speed.cloudflare.com/__down?bytes=25000000" }, // 25MB
    ];

    const speeds: number[] = [];

    for (const test of testSizes) {
      if (signal.aborted) throw new Error("Aborted");

      const startTime = performance.now();

      try {
        const response = await fetch(test.url, {
          cache: "no-store",
          signal
        });

        if (!response.body) continue;

        const reader = response.body.getReader();
        let receivedBytes = 0;
        let lastUpdate = startTime;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          receivedBytes += value.length;
          const now = performance.now();

          // Update speed display every 200ms with minimum elapsed time
          if (now - lastUpdate > 200) {
            const elapsed = (now - startTime) / 1000;
            // Only calculate speed if we have at least 0.1 seconds of data
            if (elapsed > 0.1) {
              const currentMbps = (receivedBytes * 8) / (elapsed * 1000000);
              // Sanity check: cap at reasonable maximum
              const cappedMbps = Math.min(currentMbps, 1000);
              animateSpeed(cappedMbps, 300);
            }
            lastUpdate = now;
          }
        }

        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000;
        const speedMbps = (receivedBytes * 8) / (duration * 1000000);

        speeds.push(speedMbps);

      } catch (e) {
        if (signal.aborted) throw e;
        console.error("Download test error:", e);
      }
    }

    // Calculate average speed (excluding warmup)
    const relevantSpeeds = speeds.slice(1);
    if (relevantSpeeds.length === 0) return 0;

    // Use weighted average favoring larger tests
    const avgSpeed = relevantSpeeds.reduce((a, b) => a + b, 0) / relevantSpeeds.length;
    return Math.round(avgSpeed * 10) / 10;
  };

  // Upload speed test
  const measureUpload = async (signal: AbortSignal): Promise<number> => {
    const testSizes = [
      256000,   // 256KB warmup
      512000,   // 512KB
      1000000,  // 1MB
      2000000,  // 2MB
    ];

    const speeds: number[] = [];

    for (const size of testSizes) {
      if (signal.aborted) throw new Error("Aborted");

      // Create random data in smaller chunks (max 65536 bytes per getRandomValues call)
      const data = new Uint8Array(size);
      const chunkSize = 65536;
      for (let offset = 0; offset < size; offset += chunkSize) {
        const chunk = new Uint8Array(Math.min(chunkSize, size - offset));
        crypto.getRandomValues(chunk);
        data.set(chunk, offset);
      }
      const blob = new Blob([data]);

      const startTime = performance.now();

      try {
        await fetch("https://speed.cloudflare.com/__up", {
          method: "POST",
          body: blob,
          signal,
        });

        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000;
        const speedMbps = (size * 8) / (duration * 1000000);

        speeds.push(speedMbps);
        animateSpeed(speedMbps, 200);

      } catch (e) {
        if (signal.aborted) throw e;
        console.error("Upload test error:", e);
      }
    }

    // Average excluding warmup
    const relevantSpeeds = speeds.slice(1);
    if (relevantSpeeds.length === 0) return 0;

    return Math.round((relevantSpeeds.reduce((a, b) => a + b, 0) / relevantSpeeds.length) * 10) / 10;
  };

  // Main test function
  const runTest = async () => {
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Reset state
    setPhase("init");
    displaySpeedRef.current = 0;
    setCurrentSpeed(0);
    setPing(0);
    setJitter(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);

    try {
      // Initialize
      await new Promise(r => setTimeout(r, 500));

      // Ping test
      setPhase("ping");
      const pingResult = await measurePing(signal);
      setPing(pingResult.ping);
      setJitter(pingResult.jitter);

      // Download test
      setPhase("download");
      const dlSpeed = await measureDownload(signal);
      setDownloadSpeed(dlSpeed);
      animateSpeed(dlSpeed, 300);

      // Brief pause - smoothly animate to 0 before upload
      await new Promise(r => setTimeout(r, 800));
      animateSpeed(0, 400);
      await new Promise(r => setTimeout(r, 500));

      // Upload test
      setPhase("upload");
      const ulSpeed = await measureUpload(signal);
      setUploadSpeed(ulSpeed);
      animateSpeed(ulSpeed, 300);

      // Complete
      setPhase("complete");

      // Save to history
      const result: SpeedTestResult = {
        downloadSpeed: dlSpeed,
        uploadSpeed: ulSpeed,
        ping: pingResult.ping,
        jitter: pingResult.jitter,
        timestamp: Date.now(),
        server: serverLocation,
      };

      const newHistory = [result, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("speedTestHistory", JSON.stringify(newHistory));

    } catch (e) {
      if (!signal.aborted) {
        console.error("Speed test failed:", e);
      }
      setPhase("idle");
    }
  };

  // Stop test
  const stopTest = () => {
    abortControllerRef.current?.abort();
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    displaySpeedRef.current = 0;
    setCurrentSpeed(0);
    setPhase("idle");
  };

  // Share results
  const shareResults = () => {
    const text = `🚀 My Internet Speed Test Results:
📥 Download: ${downloadSpeed} Mbps
📤 Upload: ${uploadSpeed} Mbps
📶 Ping: ${ping} ms
📊 Jitter: ${jitter} ms

Tested on ZeroToVPN.com`;

    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  // Calculate progress percentage (0-100) for arc
  const getProgressPercent = () => {
    const maxSpeed = 500;
    return Math.min((currentSpeed / maxSpeed) * 100, 100);
  };

  // Get speed color based on value
  const getSpeedColor = (speed: number) => {
    if (speed >= 100) return "text-green-500";
    if (speed >= 50) return "text-emerald-500";
    if (speed >= 25) return "text-yellow-500";
    if (speed >= 10) return "text-orange-500";
    return "text-red-500";
  };

  const isRunning = phase !== "idle" && phase !== "complete";

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 text-white border-slate-800">
      <CardContent className="p-8">
        {/* Server Info */}
        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-6">
          <Server className="h-4 w-4" />
          <span>{serverLocation}</span>
          <Wifi className="h-4 w-4 ml-2" />
        </div>

        {/* Speed Display - Clean Arc Design */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* SVG Progress Arc */}
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            {/* Background arc */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#1e293b"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset="133"
            />

            {/* Progress arc with gradient color */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="url(#speedGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset={400 - (getProgressPercent() / 100) * 267}
              className="transition-all duration-300 ease-out"
              style={{ filter: currentSpeed > 0 ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))' : 'none' }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="33%" stopColor="#f97316" />
                <stop offset="66%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center speed display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={cn("text-6xl font-bold tabular-nums", getSpeedColor(currentSpeed))}>
              {currentSpeed.toFixed(1)}
            </div>
            <div className="text-slate-400 text-lg font-medium">Mbps</div>
            {isRunning && (
              <div className="text-xs text-slate-500 mt-2 animate-pulse">
                {phase === "init" && "Connecting..."}
                {phase === "ping" && "Testing ping..."}
                {phase === "download" && "Downloading..."}
                {phase === "upload" && "Uploading..."}
              </div>
            )}
          </div>
        </div>

        {/* Phase indicator */}
        <div className="flex justify-center gap-8 mb-8">
          <div className={cn(
            "flex flex-col items-center transition-opacity",
            phase === "ping" ? "opacity-100" : "opacity-40"
          )}>
            <Activity className={cn(
              "h-5 w-5 mb-1",
              phase === "ping" && "animate-pulse text-cyan-400"
            )} />
            <span className="text-xs text-slate-400">PING</span>
            <span className={cn(
              "text-lg font-bold",
              ping > 0 ? "text-white" : "text-slate-600"
            )}>
              {ping > 0 ? `${ping}` : "—"}
            </span>
            <span className="text-xs text-slate-500">ms</span>
          </div>

          <div className={cn(
            "flex flex-col items-center transition-opacity",
            phase === "download" ? "opacity-100" : "opacity-40"
          )}>
            <Download className={cn(
              "h-5 w-5 mb-1",
              phase === "download" && "animate-bounce text-green-400"
            )} />
            <span className="text-xs text-slate-400">DOWNLOAD</span>
            <span className={cn(
              "text-lg font-bold",
              downloadSpeed > 0 ? "text-white" : "text-slate-600"
            )}>
              {downloadSpeed > 0 ? downloadSpeed.toFixed(1) : "—"}
            </span>
            <span className="text-xs text-slate-500">Mbps</span>
          </div>

          <div className={cn(
            "flex flex-col items-center transition-opacity",
            phase === "upload" ? "opacity-100" : "opacity-40"
          )}>
            <Upload className={cn(
              "h-5 w-5 mb-1",
              phase === "upload" && "animate-bounce text-purple-400"
            )} />
            <span className="text-xs text-slate-400">UPLOAD</span>
            <span className={cn(
              "text-lg font-bold",
              uploadSpeed > 0 ? "text-white" : "text-slate-600"
            )}>
              {uploadSpeed > 0 ? uploadSpeed.toFixed(1) : "—"}
            </span>
            <span className="text-xs text-slate-500">Mbps</span>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <Button
              onClick={runTest}
              size="lg"
              className={cn(
                "rounded-full w-32 h-32 text-xl font-bold shadow-lg transition-all",
                "bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
                "hover:scale-105 active:scale-95"
              )}
            >
              {phase === "complete" ? (
                <RotateCcw className="h-10 w-10" />
              ) : (
                <Play className="h-10 w-10 ml-1" />
              )}
            </Button>
          ) : (
            <Button
              onClick={stopTest}
              size="lg"
              variant="outline"
              className="rounded-full w-32 h-32 text-lg font-bold border-slate-600 hover:bg-slate-800"
            >
              <span className="animate-pulse">
                {phase === "init" && "Connecting..."}
                {phase === "ping" && "Testing Ping"}
                {phase === "download" && "Downloading"}
                {phase === "upload" && "Uploading"}
              </span>
            </Button>
          )}
        </div>

        {/* Share button */}
        {phase === "complete" && (
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={shareResults}
              className="text-slate-400 hover:text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        )}

        {/* Results summary */}
        {phase === "complete" && (
          <div className="mt-8 p-4 bg-slate-800/50 rounded-xl">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{downloadSpeed}</div>
                <div className="text-xs text-slate-400">Download Mbps</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{uploadSpeed}</div>
                <div className="text-xs text-slate-400">Upload Mbps</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">{ping}</div>
                <div className="text-xs text-slate-400">Ping ms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">{jitter}</div>
                <div className="text-xs text-slate-400">Jitter ms</div>
              </div>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && phase !== "idle" && (
          <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
              <History className="h-4 w-4" />
              Recent Tests
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {history.slice(0, 5).map((test) => (
                <div
                  key={test.timestamp}
                  className="flex items-center justify-between text-xs bg-slate-800/30 rounded-lg p-2"
                >
                  <span className="text-slate-500">
                    {new Date(test.timestamp).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="flex gap-4">
                    <span className="text-green-400">↓ {test.downloadSpeed}</span>
                    <span className="text-purple-400">↑ {test.uploadSpeed}</span>
                    <span className="text-cyan-400">{test.ping}ms</span>
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
