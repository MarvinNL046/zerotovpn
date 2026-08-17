"use client";

import { useEffect, useState } from "react";

export function ReviewReadingProgress({ label }: { label: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const article = document.getElementById("review-top");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const scrollable = Math.max(1, article.offsetHeight - window.innerHeight);
      const next = Math.min(
        100,
        Math.max(0, ((window.scrollY - articleTop) / scrollable) * 100),
      );
      setProgress(Math.round(next));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="h-1 w-full bg-slate-100 dark:bg-slate-800"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className="h-full bg-gradient-to-r from-[#1268f3] via-[#7ad9e8] to-[#b8e34a] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
