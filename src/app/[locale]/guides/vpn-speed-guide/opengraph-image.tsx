import { ImageResponse } from "next/og";
import { getVpnSpeedGuideCopy } from "@/data/vpn-speed-guide";

export const alt = "How to test VPN speed fairly";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getVpnSpeedGuideCopy(locale);

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
          width: "56%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: 38,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#b8e34a",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          ZeroToVPN · {copy.hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 70,
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
            marginTop: 26,
            color: "#cbd7e6",
            fontSize: 22,
            lineHeight: 1.4,
          }}
        >
          {copy.hero.directAnswer}
        </div>
      </div>

      <div
        style={{
          width: "44%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: "2px solid #30435e",
          borderRadius: 28,
          background: "#0c1a31",
          padding: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {copy.visual.route.map((node, index) => (
            <div key={node} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 110,
                  minHeight: 86,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                  background: index === 2 ? "#243718" : "#142541",
                  color: index === 2 ? "#b8e34a" : "#edf3fa",
                  fontSize: 16,
                  fontWeight: 750,
                  lineHeight: 1.2,
                  textAlign: "center",
                  padding: 12,
                }}
              >
                {node}
              </div>
              {index < copy.visual.route.length - 1 ? (
                <div
                  style={{
                    display: "flex",
                    color: "#b8e34a",
                    fontSize: 24,
                    padding: "0 8px",
                  }}
                >
                  →
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 24,
            gap: 12,
          }}
        >
          {copy.visual.metricLabels.map((metric) => (
            <div
              key={metric}
              style={{
                width: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #3b4e69",
                borderRadius: 14,
                color: "#cbd7e6",
                fontSize: 15,
                padding: "13px 15px",
              }}
            >
              <span style={{ display: "flex" }}>{metric}</span>
              <strong
                style={{
                  display: "flex",
                  color: "#b8e34a",
                  fontSize: 24,
                }}
              >
                —
              </strong>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 22,
            borderRadius: 999,
            background: "#b8e34a",
            color: "#071226",
            fontSize: 16,
            fontWeight: 800,
            padding: "11px 18px",
          }}
        >
          {copy.visual.boundary}
        </div>
      </div>
    </div>,
    size,
  );
}
