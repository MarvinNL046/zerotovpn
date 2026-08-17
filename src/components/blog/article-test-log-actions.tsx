"use client";

import { useState } from "react";
import { Check, Clipboard, Download } from "lucide-react";

type ArticleTestLogActionsProps = {
  checklist: string[];
  copyLabel: string;
  downloadLabel: string;
  copiedLabel: string;
  headers: string[];
};

function escapeCsvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export function ArticleTestLogActions({
  checklist,
  copyLabel,
  downloadLabel,
  copiedLabel,
  headers,
}: ArticleTestLogActionsProps) {
  const [copied, setCopied] = useState(false);

  async function copyChecklist() {
    await navigator.clipboard.writeText(
      checklist.map((item, index) => `${index + 1}. ${item}`).join("\n"),
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  function downloadCsv() {
    const csv = `${headers.map(escapeCsvCell).join(",")}\r\n`;
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "zerotovpn-connection-test-log.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={copyChecklist}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#b8e34a] px-5 py-3 text-sm font-bold text-[#071226] transition-colors hover:bg-[#a9d63d] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1268f3]"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Clipboard aria-hidden="true" className="size-4" />
        )}
        {copied ? copiedLabel : copyLabel}
      </button>
      <button
        type="button"
        onClick={downloadCsv}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[#071226] transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1268f3] dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <Download aria-hidden="true" className="size-4" />
        {downloadLabel}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  );
}
