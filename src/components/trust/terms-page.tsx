import {
  ArrowRight,
  BadgeCheck,
  Ban,
  Copyright,
  ExternalLink,
  FileCheck2,
  Info,
  RefreshCcw,
  Scale,
} from "lucide-react";
import type { TermsPageCopy } from "@/data/terms-page";
import { Link } from "@/i18n/navigation";
import styles from "./terms-page.module.css";

const ruleIcons = {
  info: Info,
  rules: Scale,
  links: ExternalLink,
  copyright: Copyright,
  misuse: Ban,
  changes: RefreshCcw,
};

export function TermsPageView({ copy }: { copy: TermsPageCopy }) {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
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
              <div className={styles.versionRow}>
                <BadgeCheck aria-hidden="true" />
                <time dateTime="2026-08-17">{copy.hero.effective}</time>
              </div>
            </div>
            <aside className={styles.summaryCard}>
              <p>{copy.hero.summaryLabel}</p>
              <strong>{copy.hero.summary}</strong>
              <small>{copy.hero.rightsNote}</small>
            </aside>
          </div>
        </div>
      </header>

      <section className={styles.scopeSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.scope.eyebrow}</p>
            <h2>{copy.scope.title}</h2>
            <p>{copy.scope.intro}</p>
          </header>
          <div className={styles.scopeGrid}>
            {copy.scope.items.map((item) => (
              <article key={item.title}>
                <FileCheck2 aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.rulesSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.rules.eyebrow}</p>
            <h2>{copy.rules.title}</h2>
            <p>{copy.rules.intro}</p>
          </header>
          <div className={styles.rulesGrid}>
            {copy.rules.items.map((item) => {
              const Icon = ruleIcons[item.icon];
              return (
                <article key={item.title}>
                  <div className={styles.ruleHeading}>
                    <span>
                      <Icon aria-hidden="true" />
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <div className={styles.ruleBody}>
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {item.points ? (
                      <ul>
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.policiesSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.policies.eyebrow}</p>
            <h2>{copy.policies.title}</h2>
            <p>{copy.policies.intro}</p>
          </header>
          <nav className={styles.policyGrid} aria-label={copy.policies.title}>
            {copy.policies.items.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.body}</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactCard}>
            <div>
              <p className={styles.eyebrow}>{copy.contact.eyebrow}</p>
              <h2>{copy.contact.title}</h2>
              <p>{copy.contact.body}</p>
            </div>
            <Link href="/contact">
              {copy.contact.cta}
              <ArrowRight aria-hidden="true" />
            </Link>
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
