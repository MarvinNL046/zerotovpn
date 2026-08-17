import { ImageResponse } from "next/og";
import { getEditorialPolicyPageCopy } from "@/data/editorial-policy-page";

export const alt = "ZeroToVPN editorial evidence standards";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const toneColors = {
  provider: "#d68a3a",
  outside: "#4e96ff",
  observed: "#3bc38b",
  unknown: "#a7b1bf",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getEditorialPolicyPageCopy(locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "stretch",
        background: "#071226",
        color: "white",
        padding: 66,
      }}
    >
      <div
        style={{
          width: "61%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#b8e34a",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          ZeroToVPN · {copy.hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 72,
            fontWeight: 850,
            letterSpacing: -3,
            lineHeight: 0.98,
          }}
        >
          {copy.hero.title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            color: "#c9d5e5",
            fontSize: 24,
            lineHeight: 1.45,
          }}
        >
          {copy.hero.rule}
        </div>
      </div>

      <div
        style={{
          width: "39%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 13,
          border: "2px solid #36516f",
          borderRadius: 32,
          background: "#0d1d38",
          padding: 28,
        }}
      >
        {copy.evidence.items.map((item) => (
          <div
            key={item.tone}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              borderBottom: "1px solid #304866",
              padding: "13px 0",
              color: "#e5edf7",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: 13,
                height: 13,
                display: "flex",
                borderRadius: 999,
                background: toneColors[item.tone],
              }}
            />
            {item.title}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
