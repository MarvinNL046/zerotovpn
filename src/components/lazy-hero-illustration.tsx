"use client";

import dynamic from "next/dynamic";

const HeroIllustration = dynamic(
  () => import("@/components/hero-illustration").then((m) => m.HeroIllustration),
  { ssr: false, loading: () => <div className="w-full h-[400px]" /> }
);

export function LazyHeroIllustration() {
  return <HeroIllustration />;
}
