import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LegacyHowWeTestRedirect({ params }: Props) {
  const { locale } = await params;
  permanentRedirect(locale === "nl" ? "/nl/methodology" : "/methodology");
}
