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
const NewsletterPopup = dynamic(
  () => import("@/components/newsletter/newsletter-popup").then((m) => m.NewsletterPopup),
  { ssr: false }
);

export function LazyConversionWidgets() {
  return (
    <>
      <ExitIntentPopup />
      <StickyCTABar />
      <NewsletterPopup />
    </>
  );
}
