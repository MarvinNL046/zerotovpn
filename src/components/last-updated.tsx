import { Calendar } from "lucide-react";
import { getLocalizedMonthYear } from "@/lib/seo-utils";

interface LastUpdatedProps {
  locale: string;
  className?: string;
}

export function LastUpdated({ locale, className = "" }: LastUpdatedProps) {
  const monthYear = getLocalizedMonthYear(locale);
  return (
    <p className={`text-sm text-muted-foreground flex items-center gap-1.5 mt-2 ${className}`}>
      <Calendar className="h-3.5 w-3.5" />
      Last updated: {monthYear}
    </p>
  );
}
