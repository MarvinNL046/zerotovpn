import type { PolicyPageCopy } from "@/data/privacy-cookie-policy";

export function PrivacyCookiePolicyOg({ copy }: { copy: PolicyPageCopy }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#07162f",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "64px 70px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 430,
          height: 430,
          borderRadius: 999,
          right: -90,
          top: -145,
          background: "rgba(184, 227, 74, 0.13)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontWeight: 800,
          }}
        >
          <span
            style={{
              display: "flex",
              width: 48,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
              background: "#b8e34a",
              color: "#071226",
              fontSize: 26,
            }}
          >
            Z
          </span>
          ZeroToVPN
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: 18,
              color: "#b8e34a",
              fontSize: 19,
              fontWeight: 900,
              letterSpacing: 2.3,
              textTransform: "uppercase",
            }}
          >
            {copy.hero.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -2.4,
            }}
          >
            {copy.hero.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 920,
              color: "#bdcadb",
              fontSize: 23,
              lineHeight: 1.45,
            }}
          >
            {copy.hero.directAnswer}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#9eb0c7",
            fontSize: 18,
          }}
        >
          <span>zerotovpn.com</span>
          <span>{copy.hero.updated}</span>
        </div>
      </div>
    </div>
  );
}
