import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function LegacyNordVpnSafetyRedirect({ params }: Props) {
  const { locale } = await params;
  permanentRedirect(
    locale === "nl" ? "/nl/reviews/nordvpn" : "/reviews/nordvpn",
  );
}
