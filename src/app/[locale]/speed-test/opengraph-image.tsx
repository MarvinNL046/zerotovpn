import { ImageResponse } from "next/og";

export const alt =
  "ZeroToVPN internet speed test with blank download, upload and response-time readings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const metrics = ["Download", "Upload", "Response time", "Variation"];
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#071226",
        color: "white",
        padding: "62px 70px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "58%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#b8e34a",
            fontSize: 23,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          ZeroToVPN · Network lab
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 68,
            fontWeight: 850,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          Internet speed test
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "#c6d3e5",
            fontSize: 26,
            lineHeight: 1.35,
          }}
        >
          Measure one browser route. Compare VPN off and VPN on without a fake
          universal score.
        </div>
      </div>
      <div
        style={{
          width: "42%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            width: 410,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            border: "2px solid #2d4261",
            borderRadius: 30,
            background: "#0e1d34",
            padding: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#9eb0c7",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            <span>Browser benchmark</span>
            <span style={{ color: "#b8e34a" }}>Ready</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {metrics.map((metric) => (
              <div
                key={metric}
                style={{
                  width: 169,
                  height: 116,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 18,
                  background: "#142946",
                  padding: 18,
                }}
              >
                <span style={{ color: "#a9b8cb", fontSize: 16 }}>{metric}</span>
                <strong
                  style={{
                    display: "flex",
                    marginTop: 9,
                    color: "white",
                    fontSize: 37,
                  }}
                >
                  —
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
