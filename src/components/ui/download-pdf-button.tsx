"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadPdfButtonProps {
  label?: string;
  className?: string;
}

export function DownloadPdfButton({ label = "Download PDF", className = "" }: DownloadPdfButtonProps) {
  return (
    <Button
      onClick={() => window.print()}
      variant="outline"
      className={`print:hidden ${className}`}
      size="lg"
    >
      <Download className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
