import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Download,
  FileCheck2,
  MapPinned,
  MonitorPlay,
  Scale,
  ShieldCheck,
  UserRoundCheck,
  Wifi,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { NetherlandsCountryGuideCopy } from "@/data/netherlands-country-guide";
import styles from "./netherlands-country-guide-page.module.css";

const topicIcons = {
  rules: Scale,
  install: Download,
  network: Wifi,
  privacy: ShieldCheck,
  streaming: MonitorPlay,
};

export function NetherlandsCountryGuidePage({
  copy,
}: {
  copy: NetherlandsCountryGuideCopy;
}) {
  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="country-title">
        <div className={styles.container}>
          <nav
            className={styles.breadcrumb}
            aria-label={copy.locale === "nl" ? "Broodkruimelpad" : "Breadcrumb"}
          >
            <Link href="/">{copy.breadcrumb.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/countries">{copy.breadcrumb.countries}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.breadcrumb.current}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1 id="country-title">{copy.hero.title}</h1>
              <p className={styles.heroIntro}>{copy.hero.intro}</p>

              <div className={styles.heroMeta}>
                <span>
                  <UserRoundCheck aria-hidden="true" />
                  <small>{copy.hero.bylineLabel}</small>
                  <Link href="/authors/marvin-smit">{copy.hero.byline}</Link>
                </span>
                <time dateTime="2026-08-16">
                  <FileCheck2 aria-hidden="true" />
                  {copy.hero.checked}
                </time>
              </div>

              <div className={styles.cues}>
                {copy.hero.cues.map((cue) => (
                  <span key={cue}>
                    <BadgeCheck aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>
            </div>

            <aside className={styles.answerCard}>
              <div className={styles.countryMark} aria-hidden="true">
                <span>NL</span>
                <i />
              </div>
              <p className={styles.cardLabel}>{copy.answer.label}</p>
              <h2>{copy.answer.title}</h2>
              <p>{copy.answer.body}</p>
              <div className={styles.answerLimit}>
                <AlertTriangle aria-hidden="true" />
                <span>{copy.answer.limit}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.topicsSection} aria-labelledby="topics-title">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.topics.eyebrow}</p>
            <h2 id="topics-title">{copy.topics.title}</h2>
            <p>{copy.topics.intro}</p>
          </header>

          <div className={styles.topicList}>
            {copy.topics.items.map((topic) => {
              const Icon = topicIcons[topic.kind];
              return (
                <section className={styles.topicCard} key={topic.kind}>
                  <div className={styles.topicHeading}>
                    <span>
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <p className={styles.topicKicker}>{topic.kicker}</p>
                      <h3>{topic.title}</h3>
                    </div>
                  </div>
                  <div className={styles.topicBody}>
                    <p className={styles.topicSummary}>{topic.summary}</p>
                    <ul>
                      {topic.bullets.map((item) => (
                        <li key={item}>
                          <CheckCircle2 aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <aside className={styles.topicLimit}>
                    <strong>{topic.limitLabel}</strong>
                    <p>{topic.limit}</p>
                  </aside>
                  <div className={styles.topicSources}>
                    <strong>{topic.sourcePrefix}</strong>
                    <span>
                      {topic.sources.map((source) => (
                        <a
                          href={source.href}
                          key={source.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.label}
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      ))}
                    </span>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className={styles.checklistSection}
        aria-labelledby="checklist-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.checklist.eyebrow}</p>
            <h2 id="checklist-title">{copy.checklist.title}</h2>
            <p>{copy.checklist.intro}</p>
          </header>

          <ol className={styles.checklist}>
            {copy.checklist.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className={styles.warningCard}>
            <AlertTriangle aria-hidden="true" />
            <div>
              <h3>{copy.checklist.warningTitle}</h3>
              <p>{copy.checklist.warningBody}</p>
            </div>
          </aside>
        </div>
      </section>

      <section
        className={styles.sourcesSection}
        aria-labelledby="sources-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.sources.eyebrow}</p>
            <h2 id="sources-title">{copy.sources.title}</h2>
            <p>{copy.sources.intro}</p>
          </header>

          <div className={styles.sourceGrid}>
            {copy.sources.items.map((source) => (
              <section className={styles.sourceCard} key={source.href}>
                <p className={styles.sourcePublisher}>{source.publisher}</p>
                <h3>{source.title}</h3>
                <dl>
                  <div>
                    <dt>{copy.sources.checkedLabel}</dt>
                    <dd>{source.checked}</dd>
                  </div>
                  <div>
                    <dt>{copy.sources.supportsLabel}</dt>
                    <dd>{source.supports}</dd>
                  </div>
                  <div>
                    <dt>{copy.sources.limitLabel}</dt>
                    <dd>{source.limit}</dd>
                  </div>
                </dl>
                <a href={source.href} target="_blank" rel="noopener noreferrer">
                  {copy.sources.openLabel}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.linksSection} aria-labelledby="links-title">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.links.eyebrow}</p>
            <h2 id="links-title">{copy.links.title}</h2>
          </header>
          <div className={styles.linkGrid}>
            {copy.links.items.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.body}</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.faq.eyebrow}</p>
            <h2 id="faq-title">{copy.faq.title}</h2>
          </header>
          <div className={styles.faqList}>
            {copy.faq.items.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.countryBackSection}>
        <div className={styles.container}>
          <Link href="/countries">
            <MapPinned aria-hidden="true" />
            {copy.breadcrumb.countries}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </article>
  );
}
