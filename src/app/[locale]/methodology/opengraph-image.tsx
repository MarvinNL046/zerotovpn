import { ImageResponse } from "next/og";
import { getMethodologyPageCopy } from "@/data/methodology-page";

export const alt = "ZeroToVPN evidence methodology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getMethodologyPageCopy(locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#071226",
        color: "white",
        padding: 70,
      }}
    >
      <div style={{ width: "68%", display: "flex", flexDirection: "column" }}>
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
            marginTop: 38,
            fontSize: 69,
            fontWeight: 850,
            letterSpacing: -3,
            lineHeight: 0.98,
          }}
        >
          {copy.hero.title}
        </div>
      </div>
      <div
        style={{
          width: "32%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          border: "2px solid #36516f",
          borderRadius: 32,
          background: "#0d1d38",
          padding: 28,
        }}
      >
        {copy.hero.cues.map((cue) => (
          <div
            key={cue}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderBottom: "1px solid #304866",
              padding: "14px 0",
              color: "#dce5f2",
              fontSize: 22,
            }}
          >
            <span style={{ display: "flex", color: "#b8e34a" }}>✓</span>
            {cue}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
