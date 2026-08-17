import { Fragment } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CircleAlert,
  ExternalLink,
  Globe2,
  MonitorSmartphone,
  Network,
  Route,
  Router,
  Server,
  ShieldCheck,
  Wifi,
  X,
} from "lucide-react";
import type { WhatIsVpnGuideCopy } from "@/data/what-is-vpn-guide";
import { Link } from "@/i18n/navigation";
import styles from "./what-is-vpn-guide.module.css";

const routeIcons = [MonitorSmartphone, Router, Server, Globe2];

const useCaseIcons = {
  wifi: Wifi,
  building: Building2,
  route: Route,
  shield: ShieldCheck,
};

function RouteVisual({ copy }: { copy: WhatIsVpnGuideCopy["visual"] }) {
  return (
    <figure className={styles.routeVisual} aria-labelledby="vpn-route-title">
      <div className={styles.routeHeading}>
        <Network aria-hidden="true" />
        <h2 id="vpn-route-title">{copy.title}</h2>
      </div>
      <div className={styles.routeLabels} aria-hidden="true">
        <span>{copy.tunnel}</span>
        <span>{copy.afterTunnel}</span>
      </div>
      <div className={styles.routeFlow}>
        {copy.nodes.map((node, index) => {
          const Icon = routeIcons[index];
          return (
            <Fragment key={node}>
              <div className={styles.routeNode}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <strong>{node}</strong>
              </div>
              {index < copy.nodes.length - 1 ? (
                <ArrowRight className={styles.routeArrow} aria-hidden="true" />
              ) : null}
            </Fragment>
          );
        })}
      </div>
      <figcaption>{copy.caption}</figcaption>
    </figure>
  );
}

export function WhatIsVpnGuidePage({ copy }: { copy: WhatIsVpnGuideCopy }) {
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
            <RouteVisual copy={copy.visual} />
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.changes.eyebrow}</p>
            <h2>{copy.changes.title}</h2>
            <p>{copy.changes.intro}</p>
          </header>
          <div className={styles.changeGrid}>
            <article className={styles.doesCard}>
              <div className={styles.cardTitle}>
                <span>
                  <Check aria-hidden="true" />
                </span>
                <h3>{copy.changes.does.title}</h3>
              </div>
              <ul>
                {copy.changes.does.items.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className={styles.doesNotCard}>
              <div className={styles.cardTitle}>
                <span>
                  <X aria-hidden="true" />
                </span>
                <h3>{copy.changes.doesNot.title}</h3>
              </div>
              <ul>
                {copy.changes.doesNot.items.map((item) => (
                  <li key={item}>
                    <X aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.useCasesSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.useCases.eyebrow}</p>
            <h2>{copy.useCases.title}</h2>
            <p>{copy.useCases.intro}</p>
          </header>
          <div className={styles.useCaseGrid}>
            {copy.useCases.items.map((item) => {
              const Icon = useCaseIcons[item.icon];
              return (
                <article key={item.title}>
                  <span className={styles.iconBox}>
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              );
            })}
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
          <div className={styles.limitsGrid}>
            {copy.limits.items.map((item) => (
              <article key={item.title}>
                <CircleAlert aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.checklistSection}>
        <div className={styles.container}>
          <div className={styles.checklistGrid}>
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

      <section className={styles.glossarySection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.glossary.eyebrow}</p>
            <h2>{copy.glossary.title}</h2>
          </header>
          <dl className={styles.glossaryGrid}>
            {copy.glossary.items.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.meaning}</dd>
              </div>
            ))}
          </dl>
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
