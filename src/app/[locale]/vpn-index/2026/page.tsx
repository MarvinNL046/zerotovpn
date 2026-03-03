import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const DESTINATION = "/reports/vpn-transparency-performance-index-2026";

export default async function LegacyRedirectPage({ params }: Props) {
  const { locale } = await params;
  const localizedDestination = locale === "en" ? DESTINATION : `/${locale}${DESTINATION}`;
  permanentRedirect(localizedDestination);
}
