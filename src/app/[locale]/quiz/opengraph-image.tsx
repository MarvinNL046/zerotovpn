import { ImageResponse } from "next/og";

export const alt =
  "ZeroToVPN VPN finder with five questions and an explained shortlist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#071226",
        color: "white",
        padding: "64px 72px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "62%",
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
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          ZeroToVPN · VPN Finder
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          Find a VPN that fits how you use the internet
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            color: "#c6d3e5",
            fontSize: 25,
          }}
        >
          Five questions · checked facts · no fake score
        </div>
      </div>

      <div
        style={{
          width: "38%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 340,
            height: 410,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            border: "2px solid #2d4261",
            borderRadius: 34,
            background: "#0e1d34",
            padding: 32,
            boxShadow: "0 28px 70px rgba(0,0,0,.35)",
          }}
        >
          {["Your needs", "Checked facts", "Clear shortlist"].map(
            (label, index) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  borderRadius: 22,
                  background: index === 2 ? "#b8e34a" : "#142946",
                  color: index === 2 ? "#071226" : "white",
                  padding: "0 22px",
                  fontSize: 24,
                  fontWeight: 750,
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                    background: index === 2 ? "#071226" : "#1268f3",
                    color: index === 2 ? "#b8e34a" : "white",
                  }}
                >
                  {index + 1}
                </span>
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    </div>,
    size,
  );
}
