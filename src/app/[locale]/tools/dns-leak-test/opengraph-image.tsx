import { ImageResponse } from "next/og";

export const alt =
  "ZeroToVPN DNS leak guide showing a browser route and an unmeasured DNS resolver";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const nodes = [
    ["Browser", "route visible", "#24c6dc"],
    ["Public route", "route visible", "#24c6dc"],
    ["DNS resolver", "not measured", "#ffc45d"],
  ];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#071226",
        color: "white",
        padding: "60px 68px",
        fontFamily: "Arial, sans-serif",
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
            fontSize: 23,
            fontWeight: 800,
            letterSpacing: 3,
          }}
        >
          ZEROTOVPN · PRIVACY DIAGNOSTIC
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 69,
            fontWeight: 850,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          DNS leak test without false promises
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            color: "#c6d3e5",
            fontSize: 25,
            lineHeight: 1.35,
          }}
        >
          Compare resolver results before and after connecting your VPN.
        </div>
      </div>

      <div
        style={{
          width: "43%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            border: "2px solid #29486d",
            borderRadius: 32,
            background: "#0d1d35",
            padding: 30,
          }}
        >
          {nodes.map(([label, detail, color], index) => (
            <div
              key={label}
              style={{
                minHeight: 86,
                display: "flex",
                alignItems: "center",
                gap: 18,
                border: `2px ${index === 2 ? "dashed" : "solid"} ${color}`,
                borderRadius: 20,
                padding: "0 20px",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  display: "flex",
                  borderRadius: 99,
                  background: color,
                }}
              />
              <span style={{ display: "flex", flexDirection: "column" }}>
                <strong style={{ fontSize: 24 }}>{label}</strong>
                <span style={{ marginTop: 5, color: "#9eb0c8", fontSize: 18 }}>
                  {detail}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    size,
  );
}
