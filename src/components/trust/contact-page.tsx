import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  LockKeyhole,
  Mail,
  MessageSquareText,
  ShieldAlert,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ContactPageCopy } from "@/data/contact-page";
import styles from "./contact-page.module.css";

const routeIcons = {
  correction: FileCheck2,
  privacy: LockKeyhole,
  press: Building2,
};

function mailto(subject?: string) {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:hello@zerotovpn.com${query}`;
}

export function ContactPageView({ copy }: { copy: ContactPageCopy }) {
  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav
            aria-label={copy.locale === "nl" ? "Broodkruimelpad" : "Breadcrumb"}
            className={styles.breadcrumb}
          >
            <Link href="/">{copy.breadcrumb.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.breadcrumb.current}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title}</h1>
              <p className={styles.heroIntro}>{copy.hero.intro}</p>

              <div className={styles.cueList} aria-label={copy.hero.eyebrow}>
                {copy.hero.cues.map((cue) => (
                  <span key={cue}>
                    <CheckCircle2 aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>
            </div>

            <aside
              className={styles.directCard}
              aria-label={copy.hero.directLabel}
            >
              <p className={styles.cardLabel}>{copy.hero.directLabel}</p>
              <p className={styles.directAnswer}>{copy.hero.directAnswer}</p>
              <a className={styles.primaryButton} href={mailto()}>
                <Mail aria-hidden="true" />
                {copy.hero.emailLabel}
              </a>
              <p className={styles.dataNote}>{copy.hero.note}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.routes.eyebrow}</p>
            <h2>{copy.routes.title}</h2>
            <p>{copy.routes.intro}</p>
          </header>

          <div className={styles.routeGrid}>
            {copy.routes.items.map((item) => {
              const Icon = routeIcons[item.id];
              return (
                <article className={styles.routeCard} key={item.id}>
                  <span className={styles.iconFrame} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <a className={styles.textAction} href={mailto(item.subject)}>
                    {item.cta}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.prepareSection}>
        <div className={styles.container}>
          <div className={styles.prepareIntro}>
            <p className={styles.eyebrow}>{copy.prepare.eyebrow}</p>
            <h2>{copy.prepare.title}</h2>
            <p>{copy.prepare.intro}</p>
          </div>

          <div className={styles.prepareGrid}>
            <article className={styles.checkCard}>
              <div className={styles.checkHeading}>
                <CheckCircle2 aria-hidden="true" />
                <h3>{copy.prepare.includeTitle}</h3>
              </div>
              <ul>
                {copy.prepare.include.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={`${styles.checkCard} ${styles.warningCard}`}>
              <div className={styles.checkHeading}>
                <ShieldAlert aria-hidden="true" />
                <h3>{copy.prepare.avoidTitle}</h3>
              </div>
              <ul>
                {copy.prepare.avoid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.selfService.eyebrow}</p>
            <h2>{copy.selfService.title}</h2>
            <p>{copy.selfService.intro}</p>
          </header>
          <div className={styles.linkGrid}>
            {copy.selfService.links.map((item) => (
              <Link
                className={styles.linkCard}
                href={item.href}
                key={item.href}
              >
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
                <summary>
                  <MessageSquareText aria-hidden="true" />
                  <span>{item.question}</span>
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
