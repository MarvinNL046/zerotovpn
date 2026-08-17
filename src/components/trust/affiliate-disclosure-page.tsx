import {
  ArrowRight,
  BadgeDollarSign,
  Banknote,
  CheckCircle2,
  CircleHelp,
  ExternalLink,
  FileWarning,
  FlaskConical,
  Landmark,
  Scale,
  SearchCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AffiliateDisclosurePageCopy } from "@/data/affiliate-disclosure-page";
import styles from "./affiliate-disclosure-page.module.css";

const ruleIcons = [Banknote, Scale, BadgeDollarSign, SearchCheck];
const evidenceIcons = {
  claim: Landmark,
  external: SearchCheck,
  tested: FlaskConical,
  unknown: CircleHelp,
};

export function AffiliateDisclosurePageView({
  copy,
}: {
  copy: AffiliateDisclosurePageCopy;
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
                    <CheckCircle2 aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>
            </div>

            <aside className={styles.ruleCard}>
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
            <p className={styles.eyebrow}>{copy.rules.eyebrow}</p>
            <h2>{copy.rules.title}</h2>
            <p>{copy.rules.intro}</p>
          </header>
          <div className={styles.rulesGrid}>
            {copy.rules.items.map((item, index) => {
              const Icon = ruleIcons[index] ?? Scale;
              return (
                <article className={styles.ruleItem} key={item.title}>
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

      <section className={styles.flowSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.flow.eyebrow}</p>
            <h2>{copy.flow.title}</h2>
            <p>{copy.flow.intro}</p>
          </header>
          <ol className={styles.flowList}>
            {copy.flow.steps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
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
            {copy.evidence.labels.map((label) => {
              const Icon = evidenceIcons[label.tone];
              return (
                <article
                  className={`${styles.evidenceCard} ${styles[label.tone]}`}
                  key={label.title}
                >
                  <Icon aria-hidden="true" />
                  <h3>{label.title}</h3>
                  <p>{label.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.registerSection}>
        <div className={styles.container}>
          <div className={styles.registerGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.register.eyebrow}</p>
              <h2>{copy.register.title}</h2>
              <p>{copy.register.body}</p>
            </div>
            <aside className={styles.legacyCard}>
              <FileWarning aria-hidden="true" />
              <div>
                <h3>{copy.register.legacyTitle}</h3>
                <p>{copy.register.legacyBody}</p>
                <Link href="/contact">
                  {copy.register.reportLabel}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>

          <div className={styles.linkGrid}>
            {copy.links.map((item) => (
              <Link
                className={styles.linkCard}
                href={item.href}
                key={item.href}
              >
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.body}</small>
                </span>
                <ExternalLink aria-hidden="true" />
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
