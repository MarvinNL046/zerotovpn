import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Cookie,
  Database,
  ExternalLink,
  FileClock,
  HardDrive,
  HelpCircle,
  Mail,
  MonitorCog,
  Network,
  Server,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PolicyPageCopy } from "@/data/privacy-cookie-policy";
import styles from "./privacy-cookie-policy-page.module.css";

const factIcons: Record<string, LucideIcon> = {
  browser: HardDrive,
  feature: Database,
  host: Server,
  external: ExternalLink,
  cookie: Cookie,
  local: HardDrive,
  session: FileClock,
  network: Network,
};

function subjectMailto(subject: string) {
  return `mailto:hello@zerotovpn.com?subject=${encodeURIComponent(subject)}`;
}

export function PrivacyCookiePolicyPage({ copy }: { copy: PolicyPageCopy }) {
  const HeroIcon = copy.kind === "privacy" ? ShieldCheck : Cookie;

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
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title}</h1>
              <p className={styles.heroIntro}>{copy.hero.intro}</p>

              <div className={styles.cues} aria-label={copy.hero.eyebrow}>
                {copy.hero.cues.map((cue) => (
                  <span key={cue}>
                    <CheckCircle2 aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>

              <p className={styles.updated}>
                <BookOpenCheck aria-hidden="true" />
                <span>{copy.hero.updatedLabel}</span>
                <time dateTime="2026-08-17">{copy.hero.updated}</time>
              </p>
            </div>

            <aside className={styles.directCard}>
              <span className={styles.heroIcon} aria-hidden="true">
                <HeroIcon />
              </span>
              <p className={styles.cardLabel}>{copy.hero.directLabel}</p>
              <p className={styles.directAnswer}>{copy.hero.directAnswer}</p>
              <div className={styles.directLinks}>
                <Link href="/contact">
                  <Mail aria-hidden="true" />
                  {copy.controls.contactCta}
                </Link>
                <Link
                  href={
                    copy.kind === "privacy"
                      ? "/cookie-policy"
                      : "/privacy-policy"
                  }
                >
                  {copy.kind === "privacy"
                    ? copy.locale === "nl"
                      ? "Bekijk het opslagregister"
                      : "See the storage register"
                    : copy.locale === "nl"
                      ? "Bekijk alle gegevensstromen"
                      : "See every data flow"}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.map.eyebrow}</p>
            <h2>{copy.map.title}</h2>
            <p>{copy.map.intro}</p>
          </header>

          <div className={styles.factGrid}>
            {copy.map.items.map((item) => {
              const Icon = factIcons[item.id] ?? MonitorCog;
              return (
                <article className={styles.factCard} key={item.id}>
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

      <section className={styles.registerSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.register.eyebrow}</p>
            <h2>{copy.register.title}</h2>
            <p>{copy.register.intro}</p>
          </header>

          <div className={styles.registerList}>
            {copy.register.items.map((item, index) => (
              <article className={styles.registerCard} key={item.id}>
                <header>
                  <span className={styles.recordNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p>{item.badge}</p>
                    <h3>{item.title}</h3>
                  </div>
                </header>
                <dl>
                  {[item.first, item.second, item.third, item.fourth].map(
                    (value, fieldIndex) => (
                      <div key={copy.register.labels[fieldIndex]}>
                        <dt>{copy.register.labels[fieldIndex]}</dt>
                        <dd>{value}</dd>
                      </div>
                    ),
                  )}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.explanation.eyebrow}</p>
            <h2>{copy.explanation.title}</h2>
            <p>{copy.explanation.intro}</p>
          </header>

          <div className={styles.explanationGrid}>
            {copy.explanation.cards.map((card) => (
              <article className={styles.explanationCard} key={card.title}>
                <span aria-hidden="true">
                  <CheckCircle2 />
                </span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className={styles.noteCard}>
            <TriangleAlert aria-hidden="true" />
            <div>
              <h3>{copy.explanation.noteTitle}</h3>
              <p>{copy.explanation.note}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.services.eyebrow}</p>
            <h2>{copy.services.title}</h2>
            <p>{copy.services.intro}</p>
          </header>

          <div className={styles.serviceGrid}>
            {copy.services.items.map((service) => (
              <article className={styles.serviceCard} key={service.name}>
                <div>
                  <p>{service.purpose}</p>
                  <h3>{service.name}</h3>
                </div>
                <p>{service.detail}</p>
                <a
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${service.linkLabel} (${copy.locale === "nl" ? "opent in een nieuw tabblad" : "opens in a new tab"})`}
                >
                  {service.linkLabel}
                  <ExternalLink aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.controlsSection}>
        <div className={styles.container}>
          <div className={styles.controlsGrid}>
            <div>
              <header className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{copy.controls.eyebrow}</p>
                <h2>{copy.controls.title}</h2>
                <p>{copy.controls.intro}</p>
              </header>

              <ol className={styles.stepList}>
                {copy.controls.steps.map((step, index) => (
                  <li key={step.title}>
                    <span aria-hidden="true">{index + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className={styles.contactCard}>
              <span aria-hidden="true">
                <Mail />
              </span>
              <h2>{copy.controls.contactTitle}</h2>
              <p>{copy.controls.contactBody}</p>
              <Link className={styles.primaryButton} href="/contact">
                {copy.controls.contactCta}
                <ArrowRight aria-hidden="true" />
              </Link>
              <a
                className={styles.secondaryButton}
                href={subjectMailto(copy.controls.emailSubject)}
              >
                {copy.controls.emailLabel}
              </a>
              <small>{copy.controls.safetyNote}</small>
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
                  <HelpCircle aria-hidden="true" />
                  <span>{item.question}</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <h2>{copy.related.title}</h2>
          <div className={styles.relatedGrid}>
            {copy.related.items.map((item) => (
              <Link
                className={styles.relatedCard}
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
          <p className={styles.footerNote}>{copy.footerNote}</p>
        </div>
      </section>
    </article>
  );
}
