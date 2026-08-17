import { ImageResponse } from "next/og";

export const alt = "About ZeroToVPN — people, evidence and limits";
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
          "radial-gradient(circle at 82% 18%, rgba(184,227,74,.22), transparent 330px), #071226",
        color: "white",
        padding: "64px 72px",
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

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 950 }}>
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
          {isDutch ? "Over ZeroToVPN" : "About ZeroToVPN"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 66,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: "-.035em",
          }}
        >
          {isDutch
            ? "Mensen, bewijs en eerlijke grenzen"
            : "People, evidence and honest limits"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "#c8d4e4",
            fontSize: 28,
          }}
        >
          {isDutch
            ? "Wie de site bouwt · Waar claims vandaan komen · Wat we niet claimen"
            : "Who builds the site · Where claims come from · What we do not claim"}
        </div>
      </div>
    </div>,
    size,
  );
}
