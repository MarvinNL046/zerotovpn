import {
  Activity,
  AppWindow,
  ArrowRight,
  BadgeCheck,
  Building2,
  Cable,
  Check,
  CircleUserRound,
  CreditCard,
  Database,
  ExternalLink,
  FileSearch,
  GlobeLock,
  Scale,
  ShieldQuestion,
} from "lucide-react";
import type { VpnPrivacyGuideCopy } from "@/data/vpn-privacy-guide";
import { Link } from "@/i18n/navigation";
import styles from "./vpn-privacy-guide.module.css";

const dataIcons = {
  account: CircleUserRound,
  payment: CreditCard,
  connection: Cable,
  activity: GlobeLock,
  telemetry: Activity,
};

const contextIcons = [FileSearch, Building2, Scale, AppWindow];

function TrustVisual({ copy }: { copy: VpnPrivacyGuideCopy["visual"] }) {
  return (
    <figure className={styles.trustVisual} aria-labelledby="trust-map-title">
      <div className={styles.visualHeading}>
        <ShieldQuestion aria-hidden="true" />
        <h2 id="trust-map-title">{copy.title}</h2>
      </div>

      <div className={styles.routeMap}>
        <div className={styles.routeNode}>
          <span>{copy.before}</span>
          <strong>{copy.labels[0]}</strong>
        </div>
        <ArrowRight aria-hidden="true" />
        <div className={styles.providerNode}>
          <span>{copy.provider}</span>
          <strong>{copy.trustMoved}</strong>
        </div>
        <ArrowRight aria-hidden="true" />
        <div className={styles.routeNode}>
          <span>{copy.after}</span>
          <strong>{copy.labels[3]}</strong>
        </div>
      </div>

      <ul className={styles.visualFacts}>
        {copy.labels.slice(1, 3).map((label) => (
          <li key={label}>
            <Database aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <figcaption>{copy.caption}</figcaption>
    </figure>
  );
}

export function VpnPrivacyGuidePage({ copy }: { copy: VpnPrivacyGuideCopy }) {
  const breadcrumbLabel =
    copy.locale === "nl" ? "Broodkruimelpad" : "Breadcrumb";

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label={breadcrumbLabel}>
            <Link href="/">{copy.breadcrumb.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/guides">{copy.breadcrumb.guides}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.breadcrumb.current}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title}</h1>
              <p className={styles.heroIntro}>{copy.hero.intro}</p>
              <aside className={styles.directAnswer}>
                <p>{copy.hero.directLabel}</p>
                <strong>{copy.hero.directAnswer}</strong>
              </aside>
              <div className={styles.byline}>
                <span>
                  <BadgeCheck aria-hidden="true" />
                  {copy.hero.author}
                </span>
                <span>
                  <BadgeCheck aria-hidden="true" />
                  <time dateTime="2026-08-16">{copy.hero.reviewed}</time>
                </span>
                <span>{copy.hero.readTime}</span>
              </div>
            </div>
            <TrustVisual copy={copy.visual} />
          </div>
        </div>
      </header>

      <section className={styles.dataSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.providerView.eyebrow}</p>
            <h2>{copy.providerView.title}</h2>
            <p>{copy.providerView.intro}</p>
          </header>

          <aside className={styles.storageNote}>
            <Database aria-hidden="true" />
            <p>{copy.providerView.storedNote}</p>
          </aside>

          <div className={styles.dataGrid}>
            {copy.providerView.items.map((item) => {
              const Icon = dataIcons[item.icon];
              return (
                <article key={item.title}>
                  <span className={styles.iconBox}>
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <strong>{item.question}</strong>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.noLogsSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.noLogs.eyebrow}</p>
            <h2>{copy.noLogs.title}</h2>
            <p>{copy.noLogs.intro}</p>
          </header>

          <div className={styles.claimCompare}>
            <article>
              <small>{copy.noLogs.claimLabel}</small>
              <strong>“{copy.noLogs.claim}”</strong>
            </article>
            <ArrowRight aria-hidden="true" />
            <article>
              <small>{copy.noLogs.translationLabel}</small>
              <strong>{copy.noLogs.translation}</strong>
            </article>
          </div>

          <div className={styles.categoryGrid}>
            {copy.noLogs.categories.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contextSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.context.eyebrow}</p>
            <h2>{copy.context.title}</h2>
            <p>{copy.context.intro}</p>
          </header>

          <div className={styles.contextGrid}>
            {copy.context.items.map((item, index) => {
              const Icon = contextIcons[index];
              return (
                <article key={item.title}>
                  <div className={styles.contextTitle}>
                    <span>
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <small>{item.label}</small>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <p>{item.body}</p>
                  <dl>
                    <div>
                      <dt>{copy.context.provesLabel}</dt>
                      <dd>{item.proves}</dd>
                    </div>
                    <div>
                      <dt>{copy.context.doesNotProveLabel}</dt>
                      <dd>{item.doesNotProve}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.checklistSection}>
        <div className={styles.container}>
          <div className={styles.checklistLayout}>
            <header className={styles.sectionHeader}>
              <p className={styles.eyebrow}>{copy.checklist.eyebrow}</p>
              <h2>{copy.checklist.title}</h2>
              <p>{copy.checklist.intro}</p>
            </header>
            <ol className={styles.checklist}>
              {copy.checklist.items.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.questionsSection}>
        <div className={styles.container}>
          <div className={styles.questionsLayout}>
            <header className={styles.sectionHeader}>
              <p className={styles.eyebrow}>{copy.questions.eyebrow}</p>
              <h2>{copy.questions.title}</h2>
              <p>{copy.questions.intro}</p>
            </header>
            <ul className={styles.questionList}>
              {copy.questions.items.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
            {copy.evidence.sources.map((source) => (
              <a
                href={source.href}
                key={source.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>
                  <small>{copy.evidence.sourceLabel}</small>
                  <strong>{source.title}</strong>
                  <span>{source.body}</span>
                  <em>{copy.evidence.checkedLabel}</em>
                </span>
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
            <Link href="/methodology">
              <span>
                <small>{copy.evidence.methodCta}</small>
                <strong>{copy.evidence.methodTitle}</strong>
                <span>{copy.evidence.methodBody}</span>
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/editorial-policy">
              <span>
                <small>{copy.evidence.policyCta}</small>
                <strong>{copy.evidence.policyTitle}</strong>
                <span>{copy.evidence.policyBody}</span>
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/contact">
              <span>
                <small>{copy.evidence.correctionCta}</small>
                <strong>{copy.evidence.correctionTitle}</strong>
                <span>{copy.evidence.correctionBody}</span>
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.related.eyebrow}</p>
            <h2>{copy.related.title}</h2>
          </header>
          <nav className={styles.relatedGrid} aria-label={copy.related.title}>
            {copy.related.items.map((item) => (
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
