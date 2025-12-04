"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  stagger?: number;
  animate?: boolean;
  glow?: boolean;
  glowColor?: "primary" | "green" | "blue" | "purple";
}

const glowColors: Record<string, string> = {
  primary: "hover:shadow-primary/20",
  green: "hover:shadow-green-500/20",
  blue: "hover:shadow-blue-500/20",
  purple: "hover:shadow-purple-500/20",
};

export function AnimatedCard({
  children,
  hover = true,
  stagger,
  animate = true,
  glow = false,
  glowColor = "primary",
  className,
  ...props
}: AnimatedCardProps) {
  const staggerClass = stagger ? `stagger-${Math.min(stagger, 8)}` : "";

  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-xl border shadow-sm",
        hover && "card-hover",
        animate && "animate-fade-in-up",
        staggerClass,
        glow && glowColors[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Grid container with staggered children
interface AnimatedGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

const columnClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

const gapClasses: Record<string, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function AnimatedGrid({
  children,
  columns = 3,
  gap = "md",
  className,
  ...props
}: AnimatedGridProps) {
  // Clone children and add stagger classes
  const staggeredChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<{ stagger?: number }>, {
        stagger: index + 1,
      });
    }
    return child;
  });

  return (
    <div
      className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
      {...props}
    >
      {staggeredChildren}
    </div>
  );
}

// Feature card variant
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stagger?: number;
  badge?: React.ReactNode;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  stagger,
  badge,
  className,
}: FeatureCardProps) {
  return (
    <AnimatedCard stagger={stagger} className={cn("p-6", className)}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold">{title}</h3>
            {badge}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </AnimatedCard>
  );
}

// Stat card variant
interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: { value: number; positive: boolean };
  stagger?: number;
  className?: string;
}

export function StatCard({
  value,
  label,
  icon,
  trend,
  stagger,
  className,
}: StatCardProps) {
  return (
    <AnimatedCard stagger={stagger} className={cn("p-6 text-center", className)}>
      {icon && (
        <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
          {icon}
        </div>
      )}
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {trend && (
        <div
          className={cn(
            "mt-2 text-xs font-medium",
            trend.positive ? "text-green-600" : "text-red-600"
          )}
        >
          {trend.positive ? "+" : "-"}{trend.value}%
        </div>
      )}
    </AnimatedCard>
  );
}
