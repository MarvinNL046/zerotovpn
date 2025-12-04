"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, Zap, Shield, Globe, Clock, Server, Users } from "lucide-react";

type MetricVariant = "success" | "warning" | "info" | "neutral" | "primary";
type MetricIcon = "trending-up" | "trending-down" | "neutral" | "speed" | "security" | "global" | "time" | "servers" | "users";

interface MetricBadgeProps {
  value: string | number;
  label?: string;
  variant?: MetricVariant;
  icon?: MetricIcon;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const variantStyles: Record<MetricVariant, string> = {
  success: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  neutral: "bg-muted text-muted-foreground border-border",
  primary: "bg-primary/10 text-primary border-primary/20",
};

const sizeStyles: Record<"sm" | "md" | "lg", { container: string; icon: string; value: string; label: string }> = {
  sm: { container: "px-2 py-1 gap-1", icon: "h-3 w-3", value: "text-xs font-semibold", label: "text-[10px]" },
  md: { container: "px-3 py-1.5 gap-1.5", icon: "h-4 w-4", value: "text-sm font-bold", label: "text-xs" },
  lg: { container: "px-4 py-2 gap-2", icon: "h-5 w-5", value: "text-base font-bold", label: "text-sm" },
};

const iconMap: Record<MetricIcon, React.ElementType> = {
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "neutral": Minus,
  "speed": Zap,
  "security": Shield,
  "global": Globe,
  "time": Clock,
  "servers": Server,
  "users": Users,
};

export function MetricBadge({
  value,
  label,
  variant = "primary",
  icon,
  size = "md",
  animated = false,
  className,
}: MetricBadgeProps) {
  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border",
        styles,
        sizes.container,
        animated && "animate-float",
        className
      )}
    >
      {IconComponent && <IconComponent className={sizes.icon} />}
      <span className={sizes.value}>{value}</span>
      {label && (
        <span className={cn("opacity-80", sizes.label)}>{label}</span>
      )}
    </span>
  );
}

// Preset badges for common VPN metrics
export function SpeedBadge({ value, className }: { value: string; className?: string }) {
  return <MetricBadge value={value} icon="speed" variant="success" className={className} />;
}

export function ServersBadge({ value, className }: { value: string | number; className?: string }) {
  return <MetricBadge value={value} label="servers" icon="servers" variant="info" className={className} />;
}

export function CountriesBadge({ value, className }: { value: string | number; className?: string }) {
  return <MetricBadge value={value} label="countries" icon="global" variant="primary" className={className} />;
}

export function SecurityBadge({ label = "AES-256", className }: { label?: string; className?: string }) {
  return <MetricBadge value={label} icon="security" variant="success" className={className} />;
}

export function UsersBadge({ value, className }: { value: string | number; className?: string }) {
  return <MetricBadge value={value} label="users" icon="users" variant="info" className={className} />;
}

// Percentage improvement badge
export function ImprovementBadge({
  value,
  type = "faster",
  className
}: {
  value: string | number;
  type?: "faster" | "cheaper" | "better";
  className?: string;
}) {
  const labels = {
    faster: "faster",
    cheaper: "cheaper",
    better: "better",
  };
  return (
    <MetricBadge
      value={`${value}%`}
      label={labels[type]}
      icon="trending-up"
      variant="success"
      className={className}
    />
  );
}
