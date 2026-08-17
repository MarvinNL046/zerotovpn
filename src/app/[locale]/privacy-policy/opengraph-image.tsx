import { ImageResponse } from "next/og";
import { PrivacyCookiePolicyOg } from "@/components/legal/privacy-cookie-policy-og";
import { getPrivacyPolicyCopy } from "@/data/privacy-cookie-policy";

export const alt = "ZeroToVPN privacy policy and current data-flow map";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return new ImageResponse(
    <PrivacyCookiePolicyOg copy={getPrivacyPolicyCopy(locale)} />,
    size,
  );
}
