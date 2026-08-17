import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CircleHelp,
  ClipboardCheck,
  FlaskConical,
  RotateCcw,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { MethodologyPageCopy } from "@/data/methodology-page";
import styles from "./methodology-page.module.css";

const evidenceIcons = {
  provider: Building2,
  outside: SearchCheck,
  observed: FlaskConical,
  unknown: CircleHelp,
};

export function MethodologyPageView({ copy }: { copy: MethodologyPageCopy }) {
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
            <aside className={styles.directCard}>
              <p className={styles.cardLabel}>{copy.hero.directLabel}</p>
              <p>{copy.hero.directAnswer}</p>
              <time dateTime="2026-08-16">{copy.hero.checked}</time>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.labels.eyebrow}</p>
            <h2>{copy.labels.title}</h2>
            <p>{copy.labels.intro}</p>
          </header>
          <div className={styles.labelGrid}>
            {copy.labels.items.map((item) => {
              const Icon = evidenceIcons[item.tone];
              return (
                <article
                  className={`${styles.labelCard} ${styles[item.tone]}`}
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

      <section className={styles.workflowSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.workflow.eyebrow}</p>
            <h2>{copy.workflow.title}</h2>
            <p>{copy.workflow.intro}</p>
          </header>
          <ol className={styles.workflowList}>
            {copy.workflow.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.gatesSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.gates.eyebrow}</p>
            <h2>{copy.gates.title}</h2>
            <p>{copy.gates.intro}</p>
          </header>
          <div className={styles.gatesGrid}>
            {copy.gates.items.map((item) => (
              <article key={item.title}>
                <ClipboardCheck aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.limitsSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.limits.eyebrow}</p>
            <h2>{copy.limits.title}</h2>
            <p>{copy.limits.intro}</p>
          </header>
          <div className={styles.limitsList}>
            {copy.limits.items.map((item) => {
              const content = (
                <>
                  <ShieldCheck aria-hidden="true" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.body}</small>
                  </span>
                  {item.href ? <ArrowRight aria-hidden="true" /> : null}
                </>
              );
              return item.href ? (
                <Link href={item.href} key={item.title}>
                  {content}
                </Link>
              ) : (
                <div key={item.title}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.correctionSection}>
        <div className={styles.container}>
          <div className={styles.correctionGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.corrections.eyebrow}</p>
              <h2>{copy.corrections.title}</h2>
              <p>{copy.corrections.body}</p>
              <Link className={styles.primaryButton} href="/contact">
                {copy.corrections.cta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <aside className={styles.relatedLinks}>
              {copy.links.map((item) => (
                <Link href={item.href} key={item.href}>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.body}</small>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ))}
            </aside>
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
                <summary>
                  <RotateCcw aria-hidden="true" />
                  {item.question}
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
