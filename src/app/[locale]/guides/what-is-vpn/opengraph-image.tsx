import { ImageResponse } from "next/og";
import { getWhatIsVpnGuideCopy } from "@/data/what-is-vpn-guide";

export const alt = "What is a VPN? A simple, provider-neutral explanation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getWhatIsVpnGuideCopy(locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#071226",
        color: "white",
        padding: 66,
      }}
    >
      <div
        style={{
          width: "57%",
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
            marginTop: 34,
            fontSize: 72,
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
            marginTop: 28,
            color: "#cbd7e6",
            fontSize: 23,
            lineHeight: 1.45,
          }}
        >
          {copy.hero.directAnswer}
        </div>
      </div>

      <div
        style={{
          width: "43%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 38,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            border: "2px solid #7fa62c",
            borderRadius: 999,
            color: "#b8e34a",
            padding: "10px 18px",
            fontSize: 18,
            fontWeight: 750,
          }}
        >
          {copy.visual.tunnel}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 28,
          }}
        >
          {copy.visual.nodes.map((node, index) => (
            <div
              key={node}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 88,
                  height: 104,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #3a5472",
                  borderRadius: 16,
                  background: index === 2 ? "#243718" : "#0d1d38",
                  color: index === 2 ? "#b8e34a" : "#e3ebf5",
                  fontSize: 15,
                  fontWeight: 750,
                  textAlign: "center",
                  padding: 8,
                }}
              >
                <div style={{ display: "flex", fontSize: 28, marginBottom: 8 }}>
                  {index === 0
                    ? "▣"
                    : index === 1
                      ? "⌁"
                      : index === 2
                        ? "▥"
                        : "◎"}
                </div>
                {node}
              </div>
              {index < copy.visual.nodes.length - 1 ? (
                <div
                  style={{
                    display: "flex",
                    color: "#b8e34a",
                    fontSize: 25,
                    padding: "0 5px",
                  }}
                >
                  →
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>,
    size,
  );
}
