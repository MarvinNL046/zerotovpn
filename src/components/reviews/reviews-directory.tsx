"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  FileCheck2,
  Search,
  X,
} from "lucide-react";
import type {
  ReviewDirectoryEntry,
  ReviewTopic,
  ReviewsDirectoryCopy,
  ReviewsDirectoryLocale,
} from "@/data/reviews-directory";
import styles from "./reviews-directory.module.css";

type DirectoryCopy = ReviewsDirectoryCopy["directory"];

function reviewHref(
  entry: ReviewDirectoryEntry,
  locale: ReviewsDirectoryLocale,
) {
  const useDutch = locale === "nl" && entry.languages.includes("nl");
  return `${useDutch ? "/nl" : ""}/reviews/${entry.slug}`;
}

export function ReviewsDirectory({
  locale,
  directory,
  entries,
}: {
  locale: ReviewsDirectoryLocale;
  directory: DirectoryCopy;
  entries: ReviewDirectoryEntry[];
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<ReviewTopic>("all");
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);

  const visibleEntries = useMemo(
    () =>
      entries.filter((entry) => {
        if (topic !== "all" && !entry.topics.includes(topic)) return false;
        if (!normalizedQuery) return true;
        return [
          entry.name,
          entry.eyebrow,
          entry.summary,
          entry.evidence,
          entry.limitation,
          ...entry.searchTerms,
        ]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(normalizedQuery);
      }),
    [entries, locale, normalizedQuery, topic],
  );

  const clear = () => {
    setQuery("");
    setTopic("all");
  };

  return (
    <section
      className={styles.directory}
      id="review-library"
      aria-labelledby="review-library-title"
    >
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>{directory.eyebrow}</p>
        <h2 id="review-library-title">{directory.title}</h2>
        <p>{directory.intro}</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchField}>
          <label className={styles.srOnly} htmlFor="review-directory-search">
            {directory.searchLabel}
          </label>
          <Search aria-hidden="true" />
          <input
            id="review-directory-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={directory.searchPlaceholder}
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={directory.clear}
            >
              <X aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div
          className={styles.filters}
          role="group"
          aria-label={directory.searchLabel}
        >
          {directory.filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={topic === filter.id}
              onClick={() => setTopic(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.resultCount} role="status" aria-live="polite">
        {visibleEntries.length}{" "}
        {visibleEntries.length === 1
          ? directory.resultSingular
          : directory.resultPlural}
      </p>

      {visibleEntries.length ? (
        <div className={styles.reviewGrid}>
          {visibleEntries.map((entry) => (
            <article className={styles.reviewCard} key={entry.slug}>
              <header className={styles.cardHeader}>
                <span className={styles.logoFrame}>
                  <Image
                    src={entry.logo}
                    alt={`${entry.name} logo`}
                    width={entry.logoWidth}
                    height={entry.logoHeight}
                    className={styles.logo}
                  />
                </span>
                <div className={styles.cardIdentity}>
                  <p>{entry.eyebrow}</p>
                  <h3>{entry.name}</h3>
                </div>
                <span className={styles.languageBadge}>
                  {entry.languageNote}
                </span>
              </header>

              <p className={styles.summary}>{entry.summary}</p>

              <dl className={styles.evidenceList}>
                <div>
                  <dt>
                    <FileCheck2 aria-hidden="true" />
                    {directory.evidenceLabel}
                  </dt>
                  <dd>{entry.evidence}</dd>
                </div>
                <div className={styles.limitation}>
                  <dt>
                    <AlertTriangle aria-hidden="true" />
                    {directory.limitationLabel}
                  </dt>
                  <dd>{entry.limitation}</dd>
                </div>
              </dl>

              <footer className={styles.cardFooter}>
                <time dateTime={entry.reviewedAt}>
                  <CalendarDays aria-hidden="true" />
                  {entry.reviewedAtLabel}
                </time>
                <Link href={reviewHref(entry, locale)}>
                  {entry.action}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Search aria-hidden="true" />
          <h3>{directory.noResultsTitle}</h3>
          <p>{directory.noResultsBody}</p>
          <button type="button" onClick={clear}>
            {directory.clear}
          </button>
        </div>
      )}
    </section>
  );
}
