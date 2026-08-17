import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleHelp,
  FlaskConical,
  HandCoins,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  UserRoundCheck,
  XCircle,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AboutPageCopy } from "@/data/about-page";
import styles from "./about-page.module.css";

const evidenceIcons = {
  provider: Building2,
  outside: SearchCheck,
  observed: FlaskConical,
  unknown: CircleHelp,
};

export function AboutPageView({ copy }: { copy: AboutPageCopy }) {
  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
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
              <h1 id="about-title">{copy.hero.title}</h1>
              <p className={styles.heroIntro}>{copy.hero.intro}</p>
              <div className={styles.cues} aria-label={copy.hero.cardLabel}>
                {copy.hero.cues.map((cue) => (
                  <span key={cue}>
                    <BadgeCheck aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>
            </div>

            <aside className={styles.summaryCard}>
              <p className={styles.cardLabel}>{copy.hero.cardLabel}</p>
              <h2>{copy.hero.cardTitle}</h2>
              <dl>
                {copy.hero.cardItems.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <time dateTime="2026-08-16">{copy.hero.checked}</time>
            </aside>
          </div>
        </div>
      </section>

      <section
        className={styles.founderSection}
        aria-labelledby="founder-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.founder.eyebrow}</p>
            <h2 id="founder-title">{copy.founder.title}</h2>
            <p>{copy.founder.lead}</p>
          </header>

          <div className={styles.founderGrid}>
            <figure className={styles.portraitCard}>
              <Image
                src="/images/team/marvin.webp"
                alt={copy.founder.imageAlt}
                width={360}
                height={360}
                sizes="(max-width: 720px) 160px, 220px"
                priority
              />
              <figcaption>
                <strong>{copy.founder.name}</strong>
                <span>{copy.founder.role}</span>
              </figcaption>
            </figure>

            <div className={styles.founderCopy}>
              <UserRoundCheck aria-hidden="true" />
              <p>{copy.founder.body}</p>
              <aside className={styles.boundaryNote}>
                <ShieldCheck aria-hidden="true" />
                <div>
                  <h3>{copy.founder.boundaryTitle}</h3>
                  <p>{copy.founder.boundaryBody}</p>
                </div>
              </aside>
              <Link
                className={styles.primaryButton}
                href="/authors/marvin-smit"
              >
                {copy.founder.profileCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.principlesSection}
        aria-labelledby="principles-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.principles.eyebrow}</p>
            <h2 id="principles-title">{copy.principles.title}</h2>
            <p>{copy.principles.intro}</p>
          </header>
          <div className={styles.principlesGrid}>
            {copy.principles.items.map((item, index) => (
              <section key={item.title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.evidenceSection}
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
                <section
                  className={`${styles.evidenceCard} ${styles[item.tone]}`}
                  key={item.title}
                >
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className={styles.boundariesSection}
        aria-labelledby="boundaries-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.boundaries.eyebrow}</p>
            <h2 id="boundaries-title">{copy.boundaries.title}</h2>
            <p>{copy.boundaries.intro}</p>
          </header>

          <div className={styles.boundariesGrid}>
            <section className={styles.canCard}>
              <CheckCircle2 aria-hidden="true" />
              <h3>{copy.boundaries.canTitle}</h3>
              <ul>
                {copy.boundaries.canItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className={styles.cannotCard}>
              <XCircle aria-hidden="true" />
              <h3>{copy.boundaries.cannotTitle}</h3>
              <ul>
                {copy.boundaries.cannotItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className={styles.migrationNote}>
            <AlertTriangle aria-hidden="true" />
            <div>
              <h3>{copy.boundaries.migrationTitle}</h3>
              <p>{copy.boundaries.migrationBody}</p>
              <Link href="/methodology">
                {copy.boundaries.methodologyCta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section
        className={styles.accountabilitySection}
        aria-labelledby="accountability-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.accountability.eyebrow}</p>
            <h2 id="accountability-title">{copy.accountability.title}</h2>
            <p>{copy.accountability.intro}</p>
          </header>
          <div className={styles.accountabilityGrid}>
            <section>
              <HandCoins aria-hidden="true" />
              <h3>{copy.accountability.affiliate.title}</h3>
              <p>{copy.accountability.affiliate.body}</p>
              <Link href="/affiliate-disclosure">
                {copy.accountability.affiliate.cta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </section>
            <section>
              <RefreshCw aria-hidden="true" />
              <h3>{copy.accountability.corrections.title}</h3>
              <p>{copy.accountability.corrections.body}</p>
              <Link href="/contact">
                {copy.accountability.corrections.cta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </section>
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
    </article>
  );
}
