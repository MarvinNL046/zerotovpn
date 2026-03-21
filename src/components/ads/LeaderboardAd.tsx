"use client";

import { useEffect, useRef } from "react";

export default function LeaderboardAd() {
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
    <div className="w-full flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9667530069853985"
        data-ad-slot="auto"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}
