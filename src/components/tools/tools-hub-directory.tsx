"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Compass,
  Gauge,
  Globe2,
  Network,
  Search,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type {
  ToolCatalogItem,
  ToolCategory,
  ToolIcon,
  ToolsHubCopy,
  ToolsHubLocale,
} from "@/data/tools-hub";
import styles from "./tools-hub.module.css";

const icons = {
  globe: Globe2,
  network: Network,
  gauge: Gauge,
  compass: Compass,
} satisfies Record<ToolIcon, typeof Globe2>;

type FilterId = "all" | ToolCategory;
type DirectoryCopy = ToolsHubCopy["directory"];

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function ToolsHubDirectory({
  locale,
  directory,
  tools,
}: {
  locale: ToolsHubLocale;
  directory: DirectoryCopy;
  tools: ToolCatalogItem[];
}) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const normalizedQuery = normalize(query);

  const visibleTools = useMemo(
    () =>
      tools.filter((tool) => {
        const inCategory =
          activeFilter === "all" || tool.category === activeFilter;
        if (!inCategory) return false;
        if (!normalizedQuery) return true;
        const haystack = [
          tool.title,
          tool.eyebrow,
          tool.summary,
          tool.measures,
          tool.limit,
          ...tool.searchTerms,
        ]
          .join(" ")
          .toLocaleLowerCase();
        return haystack.includes(normalizedQuery);
      }),
    [activeFilter, normalizedQuery, tools],
  );

  const clear = () => {
    setQuery("");
    setActiveFilter("all");
  };

  return (
    <section
      className={styles.directorySection}
      id="tools"
      aria-labelledby="tools-title"
    >
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>{directory.eyebrow}</p>
        <h2 id="tools-title">{directory.title}</h2>
        <p>{directory.intro}</p>
      </div>

      <div className={styles.finderPanel}>
        <div className={styles.searchField}>
          <label className={styles.srOnly} htmlFor="tools-directory-search">
            {directory.searchLabel}
          </label>
          <Search aria-hidden="true" />
          <input
            id="tools-directory-search"
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
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.resultCount} role="status" aria-live="polite">
        {visibleTools.length}{" "}
        {visibleTools.length === 1
          ? directory.resultSingular
          : directory.resultPlural}
      </p>

      {visibleTools.length ? (
        <div className={styles.toolGrid}>
          {visibleTools.map((tool) => {
            const Icon = icons[tool.icon];
            return (
              <article
                className={styles.toolCard}
                key={tool.id}
                data-maturity={tool.maturity}
              >
                <header className={styles.toolCardHeader}>
                  <span className={styles.toolIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <p className={styles.cardEyebrow}>{tool.eyebrow}</p>
                    <h3>{tool.title}</h3>
                  </div>
                  <span
                    className={styles.statusBadge}
                    data-status={tool.maturity}
                  >
                    {tool.status}
                  </span>
                </header>

                <p className={styles.toolSummary}>{tool.summary}</p>

                <dl className={styles.toolFacts}>
                  <div>
                    <dt>
                      {locale === "nl" ? "Wat je krijgt" : "What you get"}
                    </dt>
                    <dd>{tool.measures}</dd>
                  </div>
                  <div>
                    <dt>
                      {locale === "nl"
                        ? "Wat onbekend blijft"
                        : "What stays unknown"}
                    </dt>
                    <dd>{tool.limit}</dd>
                  </div>
                </dl>

                <footer className={styles.toolCardFooter}>
                  <span>{tool.duration}</span>
                  <Link href={tool.href} className={styles.toolAction}>
                    {tool.action}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </footer>
              </article>
            );
          })}
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
