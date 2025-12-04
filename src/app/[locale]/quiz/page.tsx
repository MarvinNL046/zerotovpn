import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { QuizWizard } from "@/components/quiz/quiz-wizard";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const baseUrl = "https://zerotovpn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz.metadata" });

  const canonicalUrl =
    locale === "en" ? `${baseUrl}/quiz` : `${baseUrl}/${locale}/quiz`;

  // Generate alternates for all languages
  const languages: Record<string, string> = {
    "x-default": `${baseUrl}/quiz`,
  };
  routing.locales.forEach((l) => {
    languages[l] = l === "en" ? `${baseUrl}/quiz` : `${baseUrl}/${l}/quiz`;
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalUrl,
      siteName: "ZeroToVPN",
      locale: locale,
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-quiz.jpg`,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [`${baseUrl}/og-quiz.jpg`],
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
  };
}

export default async function QuizPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("quiz");

  const vpns = await getAllVpns();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-8 md:py-16">
        <div className="container">
          <QuizWizard vpns={vpns} locale={locale} />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">{t("info.title")}</h2>
            <p className="text-muted-foreground">{t("info.description")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
