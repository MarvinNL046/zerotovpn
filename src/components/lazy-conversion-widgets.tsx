"use client";

import dynamic from "next/dynamic";

const StickyCTABar = dynamic(
  () => import("@/components/conversion/sticky-cta-bar").then((m) => m.StickyCTABar),
  { ssr: false }
);
export function LazyConversionWidgets() {
  return (
    <>
      {/* Nord's affiliate rules prohibit pop-up/under advertising; keep conversion contextual. */}
      <StickyCTABar />
    </>
  );
}
