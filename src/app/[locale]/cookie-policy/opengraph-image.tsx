import { ImageResponse } from "next/og";
import { PrivacyCookiePolicyOg } from "@/components/legal/privacy-cookie-policy-og";
import { getCookiePolicyCopy } from "@/data/privacy-cookie-policy";

export const alt = "ZeroToVPN cookie policy and browser-storage register";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return new ImageResponse(
    <PrivacyCookiePolicyOg copy={getCookiePolicyCopy(locale)} />,
    size,
  );
}
