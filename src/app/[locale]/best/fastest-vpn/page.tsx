import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function LegacyFastestVpnRedirect({ params }: Props) {
  const { locale } = await params;
  permanentRedirect(
    locale === "nl"
      ? "/nl/guides/vpn-speed-guide"
      : "/guides/vpn-speed-guide",
  );
}
