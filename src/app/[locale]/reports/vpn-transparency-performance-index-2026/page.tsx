import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function LegacyTransparencyReportRedirect({
  params,
}: Props) {
  const { locale } = await params;
  permanentRedirect(locale === "nl" ? "/nl/reports" : "/reports");
}
