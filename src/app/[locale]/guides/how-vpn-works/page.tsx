import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function LegacyHowVpnWorksRedirect({ params }: Props) {
  const { locale } = await params;
  permanentRedirect(
    locale === "nl" ? "/nl/guides/what-is-vpn" : "/guides/what-is-vpn",
  );
}
