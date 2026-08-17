import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const DESTINATION = "/affiliate-disclosure";

export default async function LegacyRedirectPage({ params }: Props) {
  const { locale } = await params;
  const localizedDestination =
    locale === "nl" ? `/nl${DESTINATION}` : DESTINATION;
  permanentRedirect(localizedDestination);
}
