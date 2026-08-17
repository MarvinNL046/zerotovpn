import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  FlaskConical,
  ListChecks,
  SearchCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { EditorialPolicyPageCopy } from "@/data/editorial-policy-page";
import styles from "./editorial-policy-page.module.css";

const evidenceIcons = {
  provider: Building2,
  outside: SearchCheck,
  observed: FlaskConical,
  unknown: CircleHelp,
};

export function EditorialPolicyPageView({
  copy,
}: {
  copy: EditorialPolicyPageCopy;
}) {
  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <nav
            className={styles.breadcrumb}
            aria-label={copy.locale === "nl" ? "Broodkruimelpad" : "Breadcrumb"}
          >
            <Link href="/">{copy.breadcrumb.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.breadcrumb.current}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title}</h1>
              <p className={styles.heroIntro}>{copy.hero.intro}</p>
              <div className={styles.cues}>
                {copy.hero.cues.map((cue) => (
                  <span key={cue}>
                    <BadgeCheck aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>
            </div>

            <aside className={styles.ruleCard}>
              <p className={styles.cardLabel}>{copy.hero.ruleLabel}</p>
              <p>{copy.hero.rule}</p>
              <time dateTime="2026-08-16">{copy.hero.checked}</time>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.evidenceSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.evidence.eyebrow}</p>
            <h2>{copy.evidence.title}</h2>
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
                  <strong>{item.wording}</strong>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.publishingSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.publishing.eyebrow}</p>
            <h2>{copy.publishing.title}</h2>
            <p>{copy.publishing.intro}</p>
          </header>

          <div className={styles.publishingGrid}>
            {copy.publishing.items.map((item, index) => (
              <article key={item.title}>
                <span aria-hidden="true">
                  <ClipboardCheck />
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.boundariesSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.boundaries.eyebrow}</p>
            <h2>{copy.boundaries.title}</h2>
            <p>{copy.boundaries.intro}</p>
          </header>

          <div className={styles.boundaryGrid}>
            <article>
              <span className={styles.boundaryIcon} aria-hidden="true">
                <CircleDollarSign />
              </span>
              <h3>{copy.boundaries.commercialTitle}</h3>
              <ul>
                {copy.boundaries.commercialItems.map((item) => (
                  <li key={item}>
                    <CheckCircle2 aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article>
              <span className={styles.boundaryIcon} aria-hidden="true">
                <AlertTriangle />
              </span>
              <h3>{copy.boundaries.limitsTitle}</h3>
              <ul>
                {copy.boundaries.limitsItems.map((item) => (
                  <li key={item}>
                    <ListChecks aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.correctionsSection}>
        <div className={styles.container}>
          <div className={styles.correctionsGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.corrections.eyebrow}</p>
              <h2>{copy.corrections.title}</h2>
              <p>{copy.corrections.body}</p>
              <Link className={styles.primaryButton} href="/contact">
                {copy.corrections.cta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>

            <ol className={styles.correctionSteps}>
              {copy.corrections.steps.map((step, index) => (
                <li key={step.title}>
                  <span>{index + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.linkGrid}>
            {copy.links.map((item) => (
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

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.faq.eyebrow}</p>
            <h2>{copy.faq.title}</h2>
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
    </article>
  );
}
