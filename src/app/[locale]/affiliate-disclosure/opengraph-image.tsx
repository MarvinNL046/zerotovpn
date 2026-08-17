import { ImageResponse } from "next/og";
import { getAffiliateDisclosurePageCopy } from "@/data/affiliate-disclosure-page";

export const alt = "ZeroToVPN affiliate disclosure: commission is not evidence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getAffiliateDisclosurePageCopy(locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#071226",
        color: "white",
        padding: 70,
      }}
    >
      <div
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#b8e34a",
            fontSize: 25,
            fontWeight: 800,
          }}
        >
          ZeroToVPN · {copy.hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 78,
            fontWeight: 850,
            letterSpacing: -3,
            lineHeight: 0.96,
          }}
        >
          {copy.hero.title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            color: "#cbd7e6",
            fontSize: 23,
          }}
        >
          {copy.hero.directAnswer}
        </div>
      </div>
      <div
        style={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 260,
            height: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #36516f",
            borderRadius: 999,
            background: "#0d1d38",
            color: "#b8e34a",
            fontSize: 118,
            fontWeight: 900,
          }}
        >
          €
        </div>
      </div>
    </div>,
    size,
  );
}
