"use client";

import { cn } from "@/lib/utils";

type PulseVariant = "success" | "warning" | "info" | "live";

interface PulseIndicatorProps {
  variant?: PulseVariant;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const variantStyles: Record<PulseVariant, { dot: string; ring: string; label: string }> = {
  success: {
    dot: "bg-green-500",
    ring: "bg-green-400",
    label: "text-green-600 dark:text-green-400",
  },
  warning: {
    dot: "bg-yellow-500",
    ring: "bg-yellow-400",
    label: "text-yellow-600 dark:text-yellow-400",
  },
  info: {
    dot: "bg-blue-500",
    ring: "bg-blue-400",
    label: "text-blue-600 dark:text-blue-400",
  },
  live: {
    dot: "bg-red-500",
    ring: "bg-red-400",
    label: "text-red-600 dark:text-red-400",
  },
};

const sizeStyles: Record<"sm" | "md" | "lg", { dot: string; ring: string; text: string }> = {
  sm: { dot: "h-2 w-2", ring: "h-2 w-2", text: "text-xs" },
  md: { dot: "h-2.5 w-2.5", ring: "h-2.5 w-2.5", text: "text-sm" },
  lg: { dot: "h-3 w-3", ring: "h-3 w-3", text: "text-base" },
};

export function PulseIndicator({
  variant = "success",
  size = "md",
  label,
  className,
}: PulseIndicatorProps) {
  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex">
        {/* Pulsing ring */}
        <span
          className={cn(
            "absolute inline-flex rounded-full opacity-75 animate-pulse-ring",
            sizes.ring,
            styles.ring
          )}
        />
        {/* Solid dot */}
        <span
          className={cn(
            "relative inline-flex rounded-full",
            sizes.dot,
            styles.dot
          )}
        />
      </span>
      {label && (
        <span className={cn("font-medium", sizes.text, styles.label)}>
          {label}
        </span>
      )}
    </span>
  );
}

// Convenience component for "Live" indicator
export function LiveIndicator({ className }: { className?: string }) {
  return <PulseIndicator variant="live" label="LIVE" size="sm" className={className} />;
}

// Convenience component for "Online/Active" status
export function ActiveIndicator({ label = "Active", className }: { label?: string; className?: string }) {
  return <PulseIndicator variant="success" label={label} size="sm" className={className} />;
}

// Convenience component for "24/7" availability
export function AlwaysOnIndicator({ className }: { className?: string }) {
  return <PulseIndicator variant="success" label="24/7" size="sm" className={className} />;
}
