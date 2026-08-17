import { ImageResponse } from "next/og";
import { getReviewsDirectoryCopy } from "@/data/reviews-directory";

export const alt = "ZeroToVPN evidence-led VPN review library";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getReviewsDirectoryCopy(locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#071226",
        color: "white",
        padding: 64,
      }}
    >
      <div
        style={{
          width: "68%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingRight: 54,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#b8e34a",
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          ZeroToVPN · {copy.hero.eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              lineHeight: 1.02,
              fontWeight: 850,
            }}
          >
            {copy.hero.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              color: "#cbd7e6",
              fontSize: 27,
              lineHeight: 1.35,
            }}
          >
            {copy.hero.intro}
          </div>
        </div>
        <div style={{ display: "flex", color: "#8ba2bf", fontSize: 20 }}>
          zerotovpn.com{copy.locale === "nl" ? "/nl" : ""}/reviews
        </div>
      </div>

      <div
        style={{
          width: "32%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
          border: "1px solid #29415f",
          borderRadius: 28,
          background: "#0d1d38",
          padding: 28,
        }}
      >
        {copy.hero.ledger.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 18,
              borderBottom: "1px solid #29415f",
              paddingBottom: 14,
            }}
          >
            <span style={{ display: "flex", color: "#b9c7da", fontSize: 19 }}>
              {item.label}
            </span>
            <strong
              style={{
                display: "flex",
                color:
                  item.tone === "amber"
                    ? "#ffd17a"
                    : item.tone === "blue"
                      ? "#7eb2ff"
                      : "#b8e34a",
                fontSize: item.tone === "amber" ? 19 : 29,
              }}
            >
              {item.value}
            </strong>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
