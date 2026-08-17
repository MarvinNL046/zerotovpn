import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, CheckCircle2, ClipboardList } from "lucide-react";
import { Link } from "@/i18n/navigation";
import styles from "./blog-article-shell.module.css";

type BlogArticleShellProps = {
  locale: "en" | "nl";
  breadcrumb: { journal: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    answer: string;
    imageAlt: string;
    imageCaption: string;
    primaryAction: string;
    secondaryAction: string;
    byline: string;
    reviewed: string;
    published: string;
    updated: string;
    readTime: string;
    trust: string[];
  };
  heroImage: string;
  nav: Array<{ href: string; label: string }>;
  structuredData: unknown[];
  children: ReactNode;
};

function safeJson(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

export function BlogArticleShell({
  locale,
  breadcrumb,
  hero,
  heroImage,
  nav,
  structuredData,
  children,
}: BlogArticleShellProps) {
  return (
    <article className={styles.page}>
      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(item) }}
        />
      ))}

      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">{locale === "nl" ? "Start" : "Home"}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog">{breadcrumb.journal}</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            {breadcrumb.current}
          </span>
        </nav>

        <section id="quick-answer" className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
            <p className={styles.heroAnswer}>{hero.answer}</p>

            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#diagnose">
                {hero.primaryAction}
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
              <a className={styles.secondaryAction} href="#evidence">
                <ClipboardList aria-hidden="true" className="size-4" />
                {hero.secondaryAction}
              </a>
            </div>

            <div className={styles.heroMeta}>
              <Link href="/authors/marvin-smit">{hero.byline}</Link>
              <span>{hero.published}</span>
              <time dateTime="2026-08-16">{hero.updated}</time>
              <span>{hero.readTime}</span>
              <span>{hero.reviewed}</span>
            </div>

            <ul
              className={styles.trustList}
              aria-label={
                locale === "nl" ? "Redactionele beloften" : "Editorial promises"
              }
            >
              {hero.trust.map((item) => (
                <li key={item}>
                  <CheckCircle2
                    aria-hidden="true"
                    className="size-3.5 text-[#b8e34a]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <figure className={styles.heroFigure}>
            <div className={styles.heroImageFrame}>
              <Image
                src={heroImage}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className={styles.heroImage}
              />
            </div>
            <figcaption className={styles.heroCaption}>
              {hero.imageCaption}
            </figcaption>
          </figure>
        </section>
      </div>

      <nav
        className={styles.jumpNav}
        aria-label={locale === "nl" ? "Op deze pagina" : "On this page"}
      >
        <div className={`${styles.container} ${styles.jumpNavInner}`}>
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className={`${styles.container} ${styles.articleBody}`}>
        {children}
      </div>
    </article>
  );
}
