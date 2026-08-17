import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Eye,
  FileSearch,
  FileText,
  FlaskConical,
  Landmark,
  ListChecks,
  SearchCheck,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
import type { ReportsHubCopy, ReportsHubLocale } from "@/data/reports-hub";
import styles from "./reports-hub-page.module.css";

const termIcons = [FileText, CalendarClock, BookOpenCheck, TriangleAlert];
const evidenceIcons = {
  provider: Landmark,
  outside: SearchCheck,
  observed: FlaskConical,
  unknown: CircleHelp,
};

function localizedPath(path: string, locale: ReportsHubLocale) {
  return locale === "nl" ? `/nl${path}` : path;
}

export function ReportsHubPage({ copy }: { copy: ReportsHubCopy }) {
  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="reports-title">
        <div className={styles.container}>
          <nav
            className={styles.breadcrumb}
            aria-label={copy.locale === "nl" ? "Broodkruimelpad" : "Breadcrumb"}
          >
            <Link href={localizedPath("", copy.locale)}>
              {copy.breadcrumb.home}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.breadcrumb.current}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1 id="reports-title">{copy.hero.title}</h1>
              <p className={styles.heroIntro}>{copy.hero.intro}</p>

              <aside className={styles.directAnswer}>
                <FileSearch aria-hidden="true" />
                <div>
                  <p>{copy.hero.directLabel}</p>
                  <strong>{copy.hero.directAnswer}</strong>
                </div>
              </aside>

              <div className={styles.cues}>
                {copy.hero.cues.map((cue) => (
                  <span key={cue}>
                    <CheckCircle2 aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>

              <time dateTime="2026-08-16">{copy.hero.checked}</time>
            </div>

            <aside className={styles.board} aria-label={copy.hero.boardTitle}>
              <header>
                <span aria-hidden="true">
                  <ClipboardCheck />
                </span>
                <div>
                  <p>{copy.hero.eyebrow}</p>
                  <h2>{copy.hero.boardTitle}</h2>
                </div>
              </header>
              <dl>
                {copy.hero.boardRows.map((row) => (
                  <div data-tone={row.tone} key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section
        className={styles.termsSection}
        id="reading-basics"
        aria-labelledby="terms-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.terms.eyebrow}</p>
            <h2 id="terms-title">{copy.terms.title}</h2>
            <p>{copy.terms.intro}</p>
          </header>
          <div className={styles.termsGrid}>
            {copy.terms.items.map((item, index) => {
              const Icon = termIcons[index] ?? FileText;
              return (
                <article key={item.title}>
                  <span aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className={styles.evidenceSection}
        id="evidence-labels"
        aria-labelledby="evidence-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.evidence.eyebrow}</p>
            <h2 id="evidence-title">{copy.evidence.title}</h2>
            <p>{copy.evidence.intro}</p>
          </header>
          <div className={styles.evidenceGrid}>
            {copy.evidence.items.map((item) => {
              const Icon = evidenceIcons[item.tone];
              return (
                <article
                  className={`${styles.evidenceCard} ${styles[item.tone]}`}
                  key={item.title}
                >
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className={styles.registerSection}
        id="research-register"
        aria-labelledby="register-title"
      >
        <div className={styles.container}>
          <div className={styles.registerHeading}>
            <header className={styles.sectionHeader}>
              <p className={styles.eyebrow}>{copy.register.eyebrow}</p>
              <h2 id="register-title">{copy.register.title}</h2>
              <p>{copy.register.intro}</p>
            </header>
            <aside className={styles.registerNotice}>
              <ShieldAlert aria-hidden="true" />
              <div>
                <h3>{copy.register.noticeTitle}</h3>
                <p>{copy.register.noticeBody}</p>
              </div>
            </aside>
          </div>

          <div className={styles.registerGrid}>
            {copy.register.items.map((item) => (
              <article className={styles.registerCard} key={item.title}>
                <header>
                  <span aria-hidden="true">
                    <ListChecks />
                  </span>
                  <div>
                    <p>{item.status}</p>
                    <h3>{item.title}</h3>
                  </div>
                </header>
                <p className={styles.registerSummary}>{item.summary}</p>
                <dl>
                  <div>
                    <dt>
                      <Eye aria-hidden="true" />
                      {item.knownLabel}
                    </dt>
                    <dd>{item.known}</dd>
                  </div>
                  <div>
                    <dt>
                      <CircleHelp aria-hidden="true" />
                      {item.gapLabel}
                    </dt>
                    <dd>{item.gap}</dd>
                  </div>
                  <div>
                    <dt>
                      <ClipboardCheck aria-hidden="true" />
                      {item.nextLabel}
                    </dt>
                    <dd>{item.next}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.readingSection}
        aria-labelledby="reading-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.reading.eyebrow}</p>
            <h2 id="reading-title">{copy.reading.title}</h2>
            <p>{copy.reading.intro}</p>
          </header>
          <ol className={styles.readingGrid}>
            {copy.reading.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className={styles.resourcesSection}
        aria-labelledby="resources-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.resources.eyebrow}</p>
            <h2 id="resources-title">{copy.resources.title}</h2>
            <p>{copy.resources.intro}</p>
          </header>
          <div className={styles.resourcesGrid}>
            {copy.resources.items.map((item) => (
              <Link
                href={localizedPath(item.href, copy.locale)}
                key={item.href}
              >
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span>{item.action}</span>
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.faqSection}
        aria-labelledby="reports-faq-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.faq.eyebrow}</p>
            <h2 id="reports-faq-title">{copy.faq.title}</h2>
          </header>
          <div className={styles.faqGrid}>
            {copy.faq.items.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
