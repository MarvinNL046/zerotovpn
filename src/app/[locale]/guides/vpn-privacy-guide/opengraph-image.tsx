import { ImageResponse } from "next/og";
import { getVpnPrivacyGuideCopy } from "@/data/vpn-privacy-guide";

export const alt = "VPN privacy: check the data, not the badge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getVpnPrivacyGuideCopy(locale);

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
            fontSize: 68,
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
          justifyContent: "center",
          paddingLeft: 42,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#9fb0c7",
            fontSize: 18,
            fontWeight: 750,
          }}
        >
          {copy.visual.title}
        </div>
        {[copy.visual.before, copy.visual.provider, copy.visual.after].map(
          (label, index) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 18,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 14,
                  background: index === 1 ? "#b8e34a" : "#142743",
                  color: index === 1 ? "#071226" : "#b8e34a",
                  fontSize: 26,
                  fontWeight: 900,
                }}
              >
                {index === 0 ? "01" : index === 1 ? "02" : "03"}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    color: index === 1 ? "#b8e34a" : "#ffffff",
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    display: "flex",
                    width: 330,
                    marginTop: 4,
                    color: "#9fb0c7",
                    fontSize: 16,
                    lineHeight: 1.35,
                  }}
                >
                  {index === 0
                    ? copy.visual.labels[0]
                    : index === 1
                      ? copy.visual.trustMoved
                      : copy.visual.labels[3]}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>,
    size,
  );
}
