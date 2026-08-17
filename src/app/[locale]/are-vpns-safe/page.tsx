import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function LegacyVpnSafetyRedirect({ params }: Props) {
  const { locale } = await params;
  permanentRedirect(
    locale === "nl"
      ? "/nl/guides/vpn-privacy-guide"
      : "/guides/vpn-privacy-guide",
  );
}
