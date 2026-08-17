"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, MapPinned, Search, X } from "lucide-react";
import type {
  CountriesDirectoryCopy,
  CountriesDirectoryLocale,
  CountryDirectoryEntry,
  CountryRegion,
} from "@/data/countries-directory";
import styles from "./countries-directory.module.css";

type RegionFilter = "all" | CountryRegion;

function countryHref(entry: CountryDirectoryEntry) {
  return `${entry.routeLocale === "nl" ? "/nl" : ""}/countries/${entry.slug}`;
}

export function CountriesDirectory({
  locale,
  directory,
  entries,
}: {
  locale: CountriesDirectoryLocale;
  directory: CountriesDirectoryCopy["directory"];
  entries: CountryDirectoryEntry[];
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);

  const visibleEntries = useMemo(
    () =>
      entries.filter((entry) => {
        if (region !== "all" && entry.region !== region) return false;
        if (!normalizedQuery) return true;

        return [
          entry.name,
          entry.regionLabel,
          entry.focus,
          ...entry.searchTerms,
        ]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(normalizedQuery);
      }),
    [entries, locale, normalizedQuery, region],
  );

  const clear = () => {
    setQuery("");
    setRegion("all");
  };

  return (
    <section
      className={styles.directory}
      id="country-guides"
      aria-labelledby="country-guides-title"
    >
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>{directory.eyebrow}</p>
        <h2 id="country-guides-title">{directory.title}</h2>
        <p>{directory.intro}</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchField}>
          <label className={styles.srOnly} htmlFor="country-directory-search">
            {directory.searchLabel}
          </label>
          <Search aria-hidden="true" />
          <input
            id="country-directory-search"
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
              aria-pressed={region === filter.id}
              onClick={() => setRegion(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.resultLine}>
        <p role="status" aria-live="polite">
          {visibleEntries.length}{" "}
          {visibleEntries.length === 1
            ? directory.resultSingular
            : directory.resultPlural}
        </p>
        <span>{directory.orderNote}</span>
      </div>

      {visibleEntries.length ? (
        <div className={styles.countryGrid}>
          {visibleEntries.map((entry) => (
            <article className={styles.countryCard} key={entry.slug}>
              <header className={styles.cardHeader}>
                <span className={styles.flag} aria-hidden="true">
                  {entry.flag}
                </span>
                <div>
                  <p>{directory.routeLabel}</p>
                  <h3>{entry.name}</h3>
                </div>
                <span className={styles.regionBadge}>{entry.regionLabel}</span>
              </header>

              <p className={styles.focus}>{entry.focus}</p>

              <div className={styles.checkNote}>
                <AlertTriangle aria-hidden="true" />
                <strong>{directory.checkLabel}</strong>
              </div>

              <Link href={countryHref(entry)}>
                <MapPinned aria-hidden="true" />
                {entry.routeLocale === locale
                  ? directory.action
                  : directory.englishAction}
                <ArrowRight aria-hidden="true" />
              </Link>
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
