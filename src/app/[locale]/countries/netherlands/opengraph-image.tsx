import { ImageResponse } from "next/og";

export const alt = "Using a VPN in the Netherlands — rules, privacy and travel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const isDutch = locale === "nl";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 82% 18%, rgba(18,104,243,.28), transparent 340px), #071226",
        color: "white",
        padding: "62px 72px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              background: "#b8e34a",
              color: "#071226",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            Z
          </div>
          <div style={{ display: "flex", fontSize: 29, fontWeight: 800 }}>
            ZeroToVPN
          </div>
        </div>

        <div
          style={{
            width: 120,
            height: 64,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 12,
            boxShadow: "0 0 0 1px rgba(255,255,255,.24)",
          }}
        >
          <span style={{ display: "flex", flex: 1, background: "#ae1c28" }} />
          <span style={{ display: "flex", flex: 1, background: "#ffffff" }} />
          <span style={{ display: "flex", flex: 1, background: "#21468b" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div
          style={{
            display: "flex",
            color: "#b8e34a",
            fontSize: 23,
            fontWeight: 800,
            letterSpacing: ".11em",
            textTransform: "uppercase",
          }}
        >
          {isDutch ? "Landengids Nederland" : "Netherlands country guide"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 65,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-.035em",
          }}
        >
          {isDutch
            ? "VPN-regels, privacy en voorbereiding"
            : "VPN rules, privacy and travel setup"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "#c8d4e4",
            fontSize: 27,
          }}
        >
          {isDutch
            ? "Officiële bronnen · Geen ranglijst · Geen toegangsbelofte"
            : "Official sources · No ranking · No access promise"}
        </div>
      </div>
    </div>,
    size,
  );
}
