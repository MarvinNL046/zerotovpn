"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  endDate: Date;
  variant?: "compact" | "full";
  label?: string;
  className?: string;
  onExpire?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeRemaining(endDate: Date): TimeRemaining {
  const now = new Date().getTime();
  const end = endDate.getTime();
  const difference = end - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    isExpired: false,
  };
}

export function CountdownTimer({
  endDate,
  variant = "full",
  label,
  className,
  onExpire,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = React.useState<TimeRemaining>(
    calculateTimeRemaining(endDate)
  );
  const [hasExpired, setHasExpired] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeRemaining(endDate);
      setTimeRemaining(newTime);

      if (newTime.isExpired && !hasExpired) {
        setHasExpired(true);
        onExpire?.();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, hasExpired, onExpire]);

  if (timeRemaining.isExpired) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground",
          variant === "compact" && "px-3 py-1.5 text-sm",
          className
        )}
      >
        <span className="font-semibold">Deal Expired</span>
      </div>
    );
  }

  const timeUnits = [
    { value: timeRemaining.days, label: "Days", shortLabel: "D" },
    { value: timeRemaining.hours, label: "Hours", shortLabel: "H" },
    { value: timeRemaining.minutes, label: "Minutes", shortLabel: "M" },
    { value: timeRemaining.seconds, label: "Seconds", shortLabel: "S" },
  ];

  if (variant === "compact") {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        {label && (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
        <div className="inline-flex items-center gap-1">
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <div className="inline-flex items-baseline gap-0.5 font-mono">
                <span className="text-lg font-bold tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {unit.shortLabel}
                </span>
              </div>
              {index < timeUnits.length - 1 && (
                <span className="text-muted-foreground">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <div className="text-center">
          <span className="text-lg font-semibold">{label}</span>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Card with flip animation */}
            <div className="relative w-full aspect-square max-w-[100px] sm:max-w-[120px]">
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center rounded-xl border-2 bg-card shadow-lg transition-all duration-300",
                  "animate-in fade-in-0 zoom-in-95"
                )}
              >
                <span
                  className={cn(
                    "font-mono font-bold tabular-nums",
                    "text-3xl sm:text-4xl md:text-5xl"
                  )}
                >
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              {/* Subtle highlight effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            </div>
            {/* Label */}
            <span className="mt-2 text-sm sm:text-base font-medium text-muted-foreground">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
