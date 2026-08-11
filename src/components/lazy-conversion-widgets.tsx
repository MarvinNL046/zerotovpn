"use client";

import dynamic from "next/dynamic";

const ExitIntentPopup = dynamic(
  () => import("@/components/conversion/exit-intent-popup").then((m) => m.ExitIntentPopup),
  { ssr: false }
);
const StickyCTABar = dynamic(
  () => import("@/components/conversion/sticky-cta-bar").then((m) => m.StickyCTABar),
  { ssr: false }
);
export function LazyConversionWidgets() {
  return (
    <>
      {/* Newsletter-only consent prompt: no provider, coupon, discount or affiliate CTA. */}
      <ExitIntentPopup />
      <StickyCTABar />
    </>
  );
}
