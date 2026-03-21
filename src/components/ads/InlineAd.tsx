"use client";

import { useEffect, useRef } from "react";

export default function InlineAd({ className = "" }: { className?: string }) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      pushed.current = true;
    } catch {}
  }, []);

  return (
    <div className={`my-8 ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9667530069853985"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
