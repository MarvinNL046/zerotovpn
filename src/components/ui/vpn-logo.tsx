"use client";

import { cn } from "@/lib/utils";

interface VpnLogoProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

// Color palette for VPN brands (based on actual brand colors where possible)
const brandColors: Record<string, { bg: string; text: string }> = {
  nordvpn: { bg: "#4687FF", text: "#FFFFFF" },
  surfshark: { bg: "#1DBFAF", text: "#FFFFFF" },
  expressvpn: { bg: "#DA3940", text: "#FFFFFF" },
  cyberghost: { bg: "#FFCC00", text: "#1A1A2E" },
  protonvpn: { bg: "#6D4AFF", text: "#FFFFFF" },
  pia: { bg: "#4BB543", text: "#FFFFFF" },
  mullvad: { bg: "#294D73", text: "#FFFFFF" },
  ipvanish: { bg: "#68BC45", text: "#FFFFFF" },
  vyprvpn: { bg: "#1E3A5F", text: "#FFFFFF" },
  tunnelbear: { bg: "#F5A623", text: "#1A1A2E" },
  windscribe: { bg: "#0F2E4C", text: "#FFFFFF" },
  hotspotshield: { bg: "#6FB1FC", text: "#FFFFFF" },
  strongvpn: { bg: "#E74C3C", text: "#FFFFFF" },
  purevpn: { bg: "#7B2D8E", text: "#FFFFFF" },
  atlasvpn: { bg: "#1E88E5", text: "#FFFFFF" },
  privatevpn: { bg: "#2196F3", text: "#FFFFFF" },
  torguard: { bg: "#E53935", text: "#FFFFFF" },
  airvpn: { bg: "#2D9CDB", text: "#FFFFFF" },
  ivpn: { bg: "#5C6BC0", text: "#FFFFFF" },
  mozillavpn: { bg: "#FF7139", text: "#FFFFFF" },
};

// Get initials from VPN name
function getInitials(name: string): string {
  // Remove common suffixes
  const cleanName = name.replace(/vpn/i, "").trim();

  // Special cases
  if (name.toLowerCase().includes("pia")) return "PIA";
  if (name.toLowerCase().includes("hma")) return "HMA";

  // Get first letter or first letters of each word
  const words = cleanName.split(/\s+/);
  if (words.length > 1) {
    return words.map(w => w[0]).join("").toUpperCase().slice(0, 3);
  }

  return cleanName.slice(0, 2).toUpperCase();
}

// Get colors for a VPN
function getColors(name: string): { bg: string; text: string } {
  const slug = name.toLowerCase().replace(/\s+/g, "").replace("vpn", "");
  return brandColors[slug] || { bg: "#3B82F6", text: "#FFFFFF" };
}

const sizes = {
  sm: { width: 32, height: 32, fontSize: 10 },
  md: { width: 48, height: 48, fontSize: 14 },
  lg: { width: 64, height: 64, fontSize: 18 },
};

export function VpnLogo({ name, className, size = "md" }: VpnLogoProps) {
  const initials = getInitials(name);
  const colors = getColors(name);
  const { width, height, fontSize } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      aria-label={`${name} logo`}
    >
      {/* Shield shape */}
      <path
        d="M24 4L6 10V22C6 33.05 13.7 43.28 24 46C34.3 43.28 42 33.05 42 22V10L24 4Z"
        fill={colors.bg}
      />
      {/* Inner shield highlight */}
      <path
        d="M24 7L9 12V22C9 31.39 15.54 40.01 24 42.76C32.46 40.01 39 31.39 39 22V12L24 7Z"
        fill={colors.bg}
        opacity="0.9"
      />
      {/* Subtle gradient overlay */}
      <defs>
        <linearGradient id={`grad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d="M24 4L6 10V22C6 33.05 13.7 43.28 24 46C34.3 43.28 42 33.05 42 22V10L24 4Z"
        fill={`url(#grad-${name})`}
      />
      {/* Text */}
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={colors.text}
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
}
