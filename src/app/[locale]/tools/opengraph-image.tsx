import { ImageResponse } from "next/og";

export const alt =
  "ZeroToVPN privacy tools dashboard with a masked example IP, DNS route and browser speed bars";
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
      <div style={{ display: "flex", flexDirection: "column", width: "57%" }}>
        <div
          style={{
            color: "#b8e34a",
            display: "flex",
            fontSize: 22,
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
            fontSize: 66,
            fontWeight: 850,
            letterSpacing: -3,
            lineHeight: 1.02,
            marginTop: 22,
          }}
        >
          Privacy tools with clear limits
        </div>
        <div
          style={{
            color: "#c6d3e5",
            display: "flex",
            fontSize: 25,
            lineHeight: 1.35,
            marginTop: 24,
          }}
        >
          Public IP · DNS route guide · Speed test · VPN finder
        </div>
      </div>
      <div
        style={{
          background: "#0e1d34",
          border: "2px solid #2d4261",
          borderRadius: 30,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginLeft: 50,
          padding: 24,
          width: "43%",
        }}
      >
        {[
          ["Public IP", "198.51.100.•••", "Example"],
          ["DNS resolver", "Not measured", "Guide"],
          ["Speed", "— Mbps", "On request"],
        ].map(([label, value, state]) => (
          <div
            key={label}
            style={{
              alignItems: "center",
              background: "#142946",
              borderRadius: 16,
              display: "flex",
              justifyContent: "space-between",
              padding: "18px 20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#9fb0c6", display: "flex", fontSize: 15 }}>
                {label}
              </span>
              <strong style={{ display: "flex", fontSize: 23, marginTop: 6 }}>
                {value}
              </strong>
            </div>
            <span
              style={{
                color: "#b8e34a",
                display: "flex",
                fontSize: 14,
                fontWeight: 750,
              }}
            >
              {state}
            </span>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
