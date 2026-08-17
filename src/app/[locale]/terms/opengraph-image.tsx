import { ImageResponse } from "next/og";
import { getTermsPageCopy } from "@/data/terms-page";

export const alt = "ZeroToVPN website terms in plain language";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getTermsPageCopy(locale);

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
          width: "67%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
            marginTop: 36,
            fontSize: 75,
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
            lineHeight: 1.45,
          }}
        >
          {copy.hero.summary}
        </div>
      </div>
      <div
        style={{
          width: "33%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 270,
            height: 330,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid #395472",
            borderRadius: 28,
            background: "#0d1d38",
            padding: 34,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b8e34a",
              fontSize: 94,
              fontWeight: 900,
            }}
          >
            ✓
          </div>
          {["01", "02", "03"].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                borderTop: "1px solid #314a67",
                paddingTop: 12,
                color: "#d8e2ef",
                fontSize: 19,
                fontWeight: 760,
              }}
            >
              <span style={{ display: "flex", color: "#b8e34a" }}>{item}</span>
              <span style={{ display: "flex" }}>
                {copy.locale === "nl" ? "Duidelijke regel" : "Clear rule"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    size,
  );
}
