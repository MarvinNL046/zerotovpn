"use client";

import type { RefObject } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Info,
  RefreshCw,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import type {
  FinderAnswers,
  FinderCopy,
  FinderProvider,
  FinderSource,
} from "@/data/vpn-finder";
import {
  buildVpnFinderResults,
  VPN_FINDER_DATA_CHECKED_AT,
} from "@/data/vpn-finder";
import styles from "./vpn-finder.module.css";

type QuizResultsProps = {
  answers: FinderAnswers;
  providers: FinderProvider[];
  sources: FinderSource[];
  copy: FinderCopy;
  resultRef: RefObject<HTMLHeadingElement | null>;
  onEdit: (step: number) => void;
  onBack: () => void;
  onReset: () => void;
};

export function QuizResults({
  answers,
  providers,
  sources,
  copy,
  resultRef,
  onEdit,
  onBack,
  onReset,
}: QuizResultsProps) {
  const results = buildVpnFinderResults(answers, providers, copy.locale);
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  const checkedDateLabel = copy.locale === "nl" ? "16 aug 2026" : "16 Aug 2026";
  const answerChips = copy.questions.flatMap((question, step) => {
    const selected = answers[question.id];
    const values = Array.isArray(selected)
      ? selected
      : selected
        ? [selected]
        : [];
    const labels = values
      .map(
        (value) =>
          question.options.find((option) => option.value === value)?.label,
      )
      .filter((label): label is string => Boolean(label));

    return labels.length
      ? [{ step, question: question.eyebrow, answer: labels.join(", ") }]
      : [];
  });

  return (
    <section className={styles.results} aria-labelledby="finder-results-title">
      <header className={styles.resultsHeader}>
        <p>{copy.results.eyebrow}</p>
        <h2 ref={resultRef} id="finder-results-title" tabIndex={-1}>
          {results.length ? copy.results.title : copy.results.noMatchTitle}
        </h2>
        <p>
          {results.length ? copy.results.subtitle : copy.results.noMatchBody}
        </p>
      </header>

      <div
        className={styles.resultAnswers}
        aria-label={copy.results.answersLabel}
      >
        {answerChips.map((chip) => (
          <button
            key={chip.question}
            type="button"
            onClick={() => onEdit(chip.step)}
            aria-label={`${copy.answers.edit}: ${chip.question} — ${chip.answer}`}
          >
            <span>{chip.question}</span>
            <strong>{chip.answer}</strong>
          </button>
        ))}
      </div>

      <aside className={styles.resultDisclosure}>
        <Info aria-hidden="true" />
        <p>
          {copy.disclosure}{" "}
          <Link href="/affiliate-disclosure">{copy.disclosureLink}</Link>
        </p>
      </aside>

      {results.length === 0 ? (
        <div className={styles.noMatch} role="status">
          <span className={styles.noMatchIcon} aria-hidden="true">
            <AlertTriangle />
          </span>
          <div>
            <h3>{copy.results.noMatchReasonTitle}</h3>
            <p>{copy.results.noMatchReasonBody}</p>
            <button
              type="button"
              className={styles.primaryCta}
              onClick={onBack}
            >
              <ArrowLeft aria-hidden="true" />
              {copy.results.relax}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.noWinnerNote}>
            <Info aria-hidden="true" />
            <p>{copy.results.noWinner}</p>
          </div>

          {results.length < providers.length ? (
            <p className={styles.partialNote}>{copy.results.partial}</p>
          ) : null}

          <div className={styles.resultGrid}>
            {results.map((result) => {
              const providerSources = result.sourceIds
                .map((sourceId) => sourceMap.get(sourceId))
                .filter((source): source is FinderSource => Boolean(source));
              const commercial = Boolean(
                result.provider.id === "nordvpn" &&
                result.provider.affiliateUrl,
              );

              return (
                <article key={result.provider.id} className={styles.resultCard}>
                  <header className={styles.resultCardHeader}>
                    <span className={styles.providerLogo}>
                      <Image
                        src={result.provider.logo}
                        alt=""
                        width={180}
                        height={54}
                        sizes="180px"
                      />
                    </span>
                    <div>
                      <span
                        className={
                          result.fit === "strong"
                            ? styles.strongFit
                            : styles.possibleFit
                        }
                      >
                        {result.fit === "strong"
                          ? copy.results.strong
                          : copy.results.possible}
                      </span>
                      <h3>{result.provider.name}</h3>
                    </div>
                  </header>

                  <p className={styles.providerSummary}>
                    {copy.providerCopy[result.provider.id].summary}
                  </p>

                  <div className={styles.reasonBlock}>
                    <h4>
                      <CheckCircle2 aria-hidden="true" />
                      {copy.results.why}
                    </h4>
                    <ul>
                      {result.reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.cautionBlock}>
                    <h4>
                      <AlertTriangle aria-hidden="true" />
                      {copy.results.caution}
                    </h4>
                    <ul>
                      {result.limitations.map((limitation) => (
                        <li key={limitation}>{limitation}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.resultMeta}>
                    <span>{copy.results.checked}</span>
                    <time dateTime={VPN_FINDER_DATA_CHECKED_AT}>
                      {checkedDateLabel}
                    </time>
                  </div>

                  {providerSources.length ? (
                    <details className={styles.sourceDetails}>
                      <summary>{copy.results.sourceDetails}</summary>
                      <ul>
                        {providerSources.map((source) => (
                          <li key={source.id}>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {source.provider}:{" "}
                              {copy.locale === "nl"
                                ? source.labelNl
                                : source.label}
                              <ExternalLink aria-hidden="true" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : null}

                  <div className={styles.resultActions}>
                    <Link href={`/reviews/${result.provider.slug}`}>
                      {copy.results.readReview} {result.provider.name}
                    </Link>
                    {commercial ? (
                      <AffiliateButton
                        vpnId={result.provider.id}
                        vpnName={result.provider.name}
                        affiliateUrl={result.provider.affiliateUrl}
                        className={styles.providerAction}
                      >
                        {copy.results.checkPlans} {result.provider.name}
                        <ExternalLink aria-hidden="true" />
                      </AffiliateButton>
                    ) : (
                      <a
                        href={result.provider.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.providerAction}
                      >
                        {copy.results.officialSite}
                        <ExternalLink aria-hidden="true" />
                      </a>
                    )}
                    {commercial ? <small>{copy.results.partner}</small> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      <footer className={styles.resultFooterActions}>
        {results.length ? (
          <button type="button" onClick={onBack}>
            <ArrowLeft aria-hidden="true" />
            {copy.results.change}
          </button>
        ) : null}
        <button type="button" onClick={onReset}>
          <RefreshCw aria-hidden="true" />
          {copy.results.restart}
        </button>
        {results.length > 1 ? (
          <Link href="/compare">{copy.results.compare}</Link>
        ) : null}
      </footer>
    </section>
  );
}
