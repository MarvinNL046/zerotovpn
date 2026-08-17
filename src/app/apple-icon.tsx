import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f7f2",
          borderRadius: 36,
        }}
      >
        <svg
          width="156"
          height="156"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path fill="#071226" d="M20 2.4 34.8 8.8v10.4c0 8.7-5.7 15.1-14.8 18.4C10.9 34.3 5.2 27.9 5.2 19.2V8.8L20 2.4Z" />
          <path d="M11.1 11.1h18.1L10.9 28.8h18.2" fill="none" stroke="#B8E34A" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
