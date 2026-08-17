import { ImageResponse } from "next/og";

export const alt =
  "ZeroToVPN public IP checker with an example masked address and clear measurement limits";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#071226",
        color: "white",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        padding: "62px 70px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "58%",
        }}
      >
        <div
          style={{
            color: "#b8e34a",
            display: "flex",
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
            fontSize: 67,
            fontWeight: 850,
            letterSpacing: -3,
            lineHeight: 1.02,
            marginTop: 22,
          }}
        >
          What is my IP?
        </div>
        <div
          style={{
            color: "#c6d3e5",
            display: "flex",
            fontSize: 26,
            lineHeight: 1.35,
            marginTop: 24,
          }}
        >
          See the public route this site receives—without a fake VPN verdict.
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-end",
          width: "42%",
        }}
      >
        <div
          style={{
            background: "#0e1d34",
            border: "2px solid #2d4261",
            borderRadius: 30,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            padding: 28,
            width: 410,
          }}
        >
          <div
            style={{
              color: "#9eb0c7",
              display: "flex",
              fontSize: 16,
              fontWeight: 700,
              justifyContent: "space-between",
            }}
          >
            <span>Public route</span>
            <span style={{ color: "#b8e34a" }}>Observed</span>
          </div>
          <div
            style={{
              background: "#142946",
              borderRadius: 18,
              color: "white",
              display: "flex",
              flexDirection: "column",
              padding: 24,
            }}
          >
            <span style={{ color: "#a9b8cb", fontSize: 17 }}>
              Example address · masked
            </span>
            <strong
              style={{
                display: "flex",
                fontFamily: "monospace",
                fontSize: 39,
                marginTop: 14,
              }}
            >
              198.51.100.•••
            </strong>
          </div>
          <div
            style={{
              background: "#102642",
              borderRadius: 14,
              color: "#b8c6d8",
              display: "flex",
              fontSize: 17,
              lineHeight: 1.4,
              padding: 18,
            }}
          >
            VPN detection: not performed
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
