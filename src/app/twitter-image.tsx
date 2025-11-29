import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ZeroToVPN - Best VPN Reviews & Comparisons";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: 20 }}
          >
            <path
              d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
              fill="#3b82f6"
            />
            <path
              d="M12 6l-5 3v4c0 3.67 2.53 7.1 5.96 7.96.3.08.61.08.91 0C17.3 20.1 19.83 16.67 19.83 13V9l-5-3z"
              fill="#1d4ed8"
            />
          </svg>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: "linear-gradient(to right, #3b82f6, #60a5fa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ZeroToVPN
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 32,
              color: "#e2e8f0",
              marginBottom: 16,
            }}
          >
            Best VPN Reviews & Comparisons 2025
          </span>
          <span
            style={{
              fontSize: 20,
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            Expert reviews • Honest comparisons • Exclusive deals
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}
        >
          <span style={{ fontSize: 18, color: "#64748b" }}>
            zerotovpn.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
