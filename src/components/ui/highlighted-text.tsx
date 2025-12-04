"use client";

import { cn } from "@/lib/utils";

type HighlightVariant = "primary" | "green" | "orange" | "purple" | "cursive" | "gold";

interface HighlightedTextProps {
  children: React.ReactNode;
  variant?: HighlightVariant;
  className?: string;
  underline?: boolean;
  glow?: boolean;
}

const variantStyles: Record<HighlightVariant, string> = {
  primary: "text-highlight",
  green: "text-highlight-green",
  orange: "text-highlight-orange",
  purple: "text-highlight-purple",
  cursive: "text-accent-cursive",
  gold: "text-gradient-gold",
};

export function HighlightedText({
  children,
  variant = "primary",
  className,
  underline = false,
  glow = false,
}: HighlightedTextProps) {
  const isGradient = variant === "gold";

  return (
    <span
      className={cn(
        !isGradient && "font-semibold",
        variantStyles[variant],
        underline && "underline decoration-2 underline-offset-4",
        glow && variant === "primary" && "glow-primary",
        glow && variant === "orange" && "glow-orange",
        glow && variant === "green" && "glow-green",
        className
      )}
    >
      {children}
    </span>
  );
}

// Utility component for parsing text with **highlighted** markers
interface ParsedHighlightedTextProps {
  text: string;
  variant?: HighlightVariant;
  className?: string;
}

export function ParsedHighlightedText({
  text,
  variant = "primary",
  className,
}: ParsedHighlightedTextProps) {
  // Split by **text** pattern
  const parts = text.split(/\*\*(.*?)\*\*/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Odd indices are the highlighted parts
        if (index % 2 === 1) {
          return (
            <HighlightedText key={index} variant={variant}>
              {part}
            </HighlightedText>
          );
        }
        return part;
      })}
    </span>
  );
}
