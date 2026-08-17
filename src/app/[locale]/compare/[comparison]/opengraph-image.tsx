import { ImageResponse } from "next/og";

export const alt = "ZeroToVPN evidence-led VPN comparison";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: string; comparison: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { locale, comparison } = await params;
  const isNordSurf =
    comparison === "nordvpn-vs-surfshark" ||
    comparison === "surfshark-vs-nordvpn";
  const title = isNordSurf
    ? "NordVPN vs Surfshark"
    : comparison
        .split("-vs-")
        .map((part) => part.replaceAll("-", " "))
        .join(" vs ");
  const subtitle =
    locale === "nl"
      ? "Vergelijk op bewijs, voorwaarden en jouw gebruik"
      : "Compare evidence, plan terms and your use case";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#071226",
          color: "#ffffff",
          padding: "62px 70px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
              background: "#b8e34a",
              color: "#071226",
              fontSize: 29,
              fontWeight: 900,
            }}
          >
            Z
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800 }}>
            ZeroToVPN
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              padding: "10px 18px",
              border: "2px solid #2f4669",
              borderRadius: 999,
              color: "#b8e34a",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            EVIDENCE-LED
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 110, height: 8, borderRadius: 8, background: "#4868f8" }} />
            <div style={{ width: 110, height: 8, borderRadius: 8, background: "#20c5bc" }} />
          </div>
          <div style={{ display: "flex", maxWidth: 1040, fontSize: 72, lineHeight: 1.02, fontWeight: 900 }}>
            {title}
          </div>
          <div style={{ display: "flex", maxWidth: 950, color: "#d6e0ee", fontSize: 30, lineHeight: 1.3 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#aab8cc", fontSize: 20 }}>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 99, background: "#b8e34a" }} />
          No fabricated winner · sources and limits shown
        </div>
      </div>
    ),
    size
  );
}
