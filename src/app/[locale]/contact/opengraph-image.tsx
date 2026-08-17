import { ImageResponse } from "next/og";
import { getContactPageCopy } from "@/data/contact-page";

export const alt = "Contact the ZeroToVPN editorial team";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getContactPageCopy(locale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#071226",
        color: "white",
        padding: 70,
      }}
    >
      <div style={{ width: "70%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            color: "#b8e34a",
            fontSize: 25,
            fontWeight: 800,
          }}
        >
          ZeroToVPN · {copy.hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 38,
            fontSize: 68,
            fontWeight: 850,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          {copy.hero.title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            color: "#cbd7e6",
            fontSize: 25,
            lineHeight: 1.4,
          }}
        >
          hello@zerotovpn.com
        </div>
      </div>
      <div
        style={{
          width: 290,
          height: 290,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #355272",
          borderRadius: 48,
          background: "#0d1d38",
          color: "#b8e34a",
          fontSize: 150,
          fontWeight: 700,
        }}
      >
        @
      </div>
    </div>,
    size,
  );
}
