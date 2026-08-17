import { cn } from "@/lib/utils";

interface ZeroToVpnMarkProps {
  className?: string;
  inverse?: boolean;
}

export function ZeroToVpnMark({ className, inverse = false }: ZeroToVpnMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <path
        fill={inverse ? "#F7F7F2" : "#071226"}
        d="M20 2.4 34.8 8.8v10.4c0 8.7-5.7 15.1-14.8 18.4C10.9 34.3 5.2 27.9 5.2 19.2V8.8L20 2.4Z"
      />
      <path
        d="M11.1 11.1h18.1L10.9 28.8h18.2"
        fill="none"
        stroke="#B8E34A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5.2"
      />
    </svg>
  );
}

interface ZeroToVpnLogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  inverse?: boolean;
}

export function ZeroToVpnLogo({
  className,
  markClassName,
  wordmarkClassName,
  inverse = false,
}: ZeroToVpnLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="rounded-[0.55rem] ring-1 ring-slate-900/10 dark:ring-white/20">
        <ZeroToVpnMark className={cn("h-8 w-8", markClassName)} inverse={inverse} />
      </span>
      <span
        className={cn(
          "inline-flex items-center text-[1.18rem] font-black leading-none tracking-[-0.045em] text-[#071226] dark:text-white",
          wordmarkClassName,
        )}
      >
        <span>Zero</span>
        <span className="mx-0.5 rounded-[0.28rem] bg-[#b8e34a] px-1.5 py-1 text-[0.82em] tracking-[-0.035em] text-[#071226]">
          To
        </span>
        <span>VPN</span>
      </span>
    </span>
  );
}
