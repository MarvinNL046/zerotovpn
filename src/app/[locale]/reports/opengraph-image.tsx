import { ImageResponse } from "next/og";
import { getReportsHubCopy } from "@/data/reports-hub";

export const alt = "ZeroToVPN VPN research reports and evidence notes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getReportsHubCopy(locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 55,
        background: "#07162f",
        color: "#ffffff",
        padding: 70,
      }}
    >
      <div style={{ width: "66%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            color: "#b8e34a",
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          ZeroToVPN · {copy.hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 65,
            fontWeight: 850,
            letterSpacing: -3,
            lineHeight: 0.98,
          }}
        >
          {copy.hero.title}
        </div>
      </div>
      <div
        style={{
          width: "34%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          border: "2px solid #3a5575",
          borderRadius: 30,
          background: "#0e2648",
          padding: 27,
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: 6,
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          {copy.hero.boardTitle}
        </div>
        {copy.hero.boardRows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              borderTop: "1px solid #39516e",
              padding: "14px 0 5px",
            }}
          >
            <span style={{ display: "flex", color: "#afbed0", fontSize: 16 }}>
              {row.label}
            </span>
            <strong
              style={{
                display: "flex",
                color:
                  row.tone === "amber"
                    ? "#ffd47c"
                    : row.tone === "blue"
                      ? "#78b9ff"
                      : "#b8e34a",
                fontSize: 25,
              }}
            >
              {row.value}
            </strong>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
