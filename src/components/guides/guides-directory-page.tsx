import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Download,
  Gauge,
  Globe2,
  Languages,
  LaptopMinimal,
  LockKeyhole,
  Network,
  Route,
  ShieldCheck,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";
import {
  getAvailableGuideEntries,
  getGuideEntry,
  getGuideRouteLocale,
  type GuideIcon,
  type GuideId,
  type GuidesDirectoryCopy,
  type GuidesLocale,
} from "@/data/guides-directory";
import styles from "./guides-directory.module.css";

const BASE_URL = "https://www.zerotovpn.com";

const iconMap: Record<GuideIcon, LucideIcon> = {
  book: BookOpenText,
  devices: LaptopMinimal,
  download: Download,
  globe: Globe2,
  lock: LockKeyhole,
  network: Network,
  phone: Smartphone,
  route: Route,
  shield: ShieldCheck,
  speed: Gauge,
  stream: Tv,
  wifi: Wifi,
};

function localizedPath(locale: GuidesLocale, path: string) {
  return `${locale === "nl" ? "/nl" : ""}${path}` || "/";
}

function guideHref(locale: GuidesLocale, guideId: GuideId) {
  const guide = getGuideEntry(guideId);
  const routeLocale = getGuideRouteLocale(locale, guideId);
  if (!routeLocale) throw new Error(`Guide is not admitted: ${guideId}`);
  return localizedPath(routeLocale, guide.path);
}

function isEnglishFallback(locale: GuidesLocale, guideId: GuideId) {
  return locale !== "en" && getGuideRouteLocale(locale, guideId) === "en";
}

function JsonLd({ copy }: { copy: GuidesDirectoryCopy }) {
  const entries = getAvailableGuideEntries(copy.locale);
  const pageUrl = `${BASE_URL}${localizedPath(copy.locale, "/guides")}`;
  const homeUrl = `${BASE_URL}${localizedPath(copy.locale, "")}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: copy.locale,
        mainEntity: { "@id": `${pageUrl}#guides` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#guides`,
        name: copy.library.title,
        itemListOrder: "https://schema.org/ItemListUnordered",
        numberOfItems: entries.length,
        itemListElement: entries.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: copy.guides[guide.id].title,
          url: `${BASE_URL}${guideHref(copy.locale, guide.id)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumb.home,
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumb.guides,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

function GuideLanguageBadge({
  copy,
  guideId,
}: {
  copy: GuidesDirectoryCopy;
  guideId: GuideId;
}) {
  if (!isEnglishFallback(copy.locale, guideId)) return null;
  return (
    <span className={styles.languageBadge}>
      <Languages aria-hidden="true" />
      {copy.library.englishNote}
    </span>
  );
}

export function GuidesDirectoryPage({ copy }: { copy: GuidesDirectoryCopy }) {
  const entries = getAvailableGuideEntries(copy.locale);

  return (
    <article className={styles.page}>
      <JsonLd copy={copy} />

      <div className={styles.container}>
        <nav
          className={styles.breadcrumb}
          aria-label={copy.locale === "nl" ? "Broodkruimelpad" : "Breadcrumb"}
        >
          <Link href={localizedPath(copy.locale, "")}>
            {copy.breadcrumb.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.breadcrumb.guides}</span>
        </nav>
      </div>

      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            <p className={styles.directAnswer}>{copy.hero.directAnswer}</p>
          </div>

          <aside className={styles.snapshot} aria-label={copy.hero.eyebrow}>
            <div className={styles.snapshotIcon}>
              <BookOpenText aria-hidden="true" />
            </div>
            <div className={styles.statGrid}>
              {copy.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </header>

      <nav className={styles.pathNav} aria-label={copy.jumpLabel}>
        <div className={styles.container}>
          <span>{copy.jumpLabel}</span>
          <div>
            {copy.jumps.map((jump) => (
              <a key={jump.id} href={`#${jump.id}`}>
                {jump.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className={`${styles.container} ${styles.startSection}`}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{copy.start.eyebrow}</p>
          <h2>{copy.start.title}</h2>
          <p>{copy.start.intro}</p>
        </div>

        <ol className={styles.startGrid}>
          {copy.start.steps.map((step) => {
            const entry = getGuideEntry(step.guideId);
            const guide = copy.guides[step.guideId];
            const Icon = iconMap[entry.icon];
            return (
              <li key={step.guideId}>
                <div className={styles.startTopline}>
                  <span>{step.number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{guide.title}</h3>
                <p>{step.reason}</p>
                <Link href={guideHref(copy.locale, step.guideId)}>
                  {copy.library.readAction}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={styles.pathsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{copy.paths.eyebrow}</p>
            <h2>{copy.paths.title}</h2>
            <p>{copy.paths.intro}</p>
          </div>

          <div className={styles.pathGrid}>
            {copy.paths.items.map((path) => (
              <article id={path.id} key={path.id} className={styles.pathCard}>
                <span className={styles.pathNumber}>{path.number}</span>
                <h3>{path.title}</h3>
                <p>{path.intro}</p>
                <ul>
                  {path.guideIds.map((guideId) => (
                    <li key={guideId}>
                      <Link href={guideHref(copy.locale, guideId)}>
                        <span>{copy.guides[guideId].title}</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                      <GuideLanguageBadge copy={copy} guideId={guideId} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.library}`}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{copy.library.eyebrow}</p>
          <h2>{copy.library.title}</h2>
          <p>{copy.library.intro}</p>
        </div>

        <div className={styles.guideGrid}>
          {entries.map((entry) => {
            const guide = copy.guides[entry.id];
            const Icon = iconMap[entry.icon];
            const englishFallback = isEnglishFallback(copy.locale, entry.id);
            return (
              <article className={styles.guideCard} key={entry.id}>
                <div className={styles.guideTopline}>
                  <span className={styles.guideIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <span className={styles.topic}>{guide.topic}</span>
                  <GuideLanguageBadge copy={copy} guideId={entry.id} />
                </div>
                <h3>{guide.title}</h3>
                <p>{guide.summary}</p>
                <div className={styles.takeaway}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>
                    <strong>{copy.library.learnLabel}:</strong> {guide.takeaway}
                  </span>
                </div>
                <Link href={guideHref(copy.locale, entry.id)}>
                  {englishFallback
                    ? copy.library.englishAction
                    : copy.library.readAction}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.methodSection}>
        <div className={`${styles.container} ${styles.methodGrid}`}>
          <div className={styles.methodIntro}>
            <p className={styles.eyebrow}>{copy.method.eyebrow}</p>
            <h2>{copy.method.title}</h2>
            <p>{copy.method.intro}</p>
            <Link href={localizedPath(copy.locale, "/methodology")}>
              {copy.method.action}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.methodPoints}>
            {copy.method.points.map((point, index) => (
              <article key={point.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.nextSection}`}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{copy.next.eyebrow}</p>
          <h2>{copy.next.title}</h2>
          <p>{copy.next.intro}</p>
        </div>
        <div className={styles.nextGrid}>
          {copy.next.links.map((item) => (
            <article key={item.href}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link href={localizedPath(copy.locale, item.href)}>
                {item.action}
                <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div>
            <p className={styles.eyebrow}>FAQ</p>
            <h2>{copy.faq.title}</h2>
          </div>
          <div className={styles.faqItems}>
            {copy.faq.items.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
