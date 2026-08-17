import { Fragment } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  Clock3,
  Download,
  ExternalLink,
  Gauge,
  Globe2,
  Laptop,
  Network,
  RadioTower,
  Server,
  Settings2,
  ShieldCheck,
  Timer,
  Upload,
  Wifi,
} from "lucide-react";
import type { VpnSpeedGuideCopy } from "@/data/vpn-speed-guide";
import { Link } from "@/i18n/navigation";
import styles from "./vpn-speed-guide.module.css";

const routeIcons = [Laptop, Network, RadioTower];

const factorIcons = {
  wifi: Wifi,
  device: Laptop,
  endpoint: Globe2,
  server: Server,
  protocol: Settings2,
  time: Clock3,
};

const metricIcons = [Download, Upload, Timer, Activity];

function SpeedRouteVisual({
  copy,
  locale,
}: {
  copy: VpnSpeedGuideCopy["visual"];
  locale: VpnSpeedGuideCopy["locale"];
}) {
  return (
    <figure className={styles.speedVisual} aria-labelledby="speed-route-title">
      <div className={styles.visualHeading}>
        <Gauge aria-hidden="true" />
        <h2 id="speed-route-title">{copy.title}</h2>
      </div>
      <div className={styles.routeFlow}>
        {copy.route.map((node, index) => {
          const Icon = routeIcons[index];
          return (
            <Fragment key={node}>
              <div className={styles.routeNode}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <strong>{node}</strong>
              </div>
              {index < copy.route.length - 1 ? (
                <ArrowRight className={styles.routeArrow} aria-hidden="true" />
              ) : null}
            </Fragment>
          );
        })}
      </div>
      <div className={styles.blankMetrics}>
        {copy.metricLabels.map((metric, index) => {
          const Icon = metricIcons[index];
          return (
            <div key={metric}>
              <span>
                <Icon aria-hidden="true" />
                {metric}
              </span>
              <strong
                aria-label={`${metric}: ${locale === "nl" ? "geen meting" : "no measurement"}`}
              >
                —
              </strong>
            </div>
          );
        })}
      </div>
      <figcaption>{copy.boundary}</figcaption>
    </figure>
  );
}

export function VpnSpeedGuidePage({ copy }: { copy: VpnSpeedGuideCopy }) {
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
            <div>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title}</h1>
              <p className={styles.heroIntro}>{copy.hero.intro}</p>
              <aside className={styles.directAnswer}>
                <p>{copy.hero.directLabel}</p>
                <strong>{copy.hero.directAnswer}</strong>
              </aside>
              <div className={styles.cues}>
                {copy.hero.cues.map((cue) => (
                  <span key={cue}>
                    <BadgeCheck aria-hidden="true" />
                    {cue}
                  </span>
                ))}
              </div>
              <div className={styles.metaRow}>
                <time dateTime="2026-08-16">{copy.hero.reviewed}</time>
                <span>{copy.hero.readTime}</span>
              </div>
            </div>
            <SpeedRouteVisual copy={copy.visual} locale={copy.locale} />
          </div>
        </div>
      </header>

      <section className={styles.boundarySection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.boundary.eyebrow}</p>
            <h2>{copy.boundary.title}</h2>
            <p>{copy.boundary.intro}</p>
          </header>
          <div className={styles.boundaryGrid}>
            {copy.boundary.items.map((item) => (
              <article key={item.title}>
                <Network aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.metricsSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.metrics.eyebrow}</p>
            <h2>{copy.metrics.title}</h2>
            <p>{copy.metrics.intro}</p>
          </header>
          <div className={styles.metricGrid}>
            {copy.metrics.items.map((item, index) => {
              const Icon = metricIcons[index];
              return (
                <article key={item.title}>
                  <div className={styles.metricHeading}>
                    <span>
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <small>{item.unit}</small>
                    </div>
                  </div>
                  <p>{item.body}</p>
                  <div className={styles.metricLimit}>
                    <CircleAlert aria-hidden="true" />
                    <span>{item.limit}</span>
                  </div>
                </article>
              );
            })}
          </div>
          <p className={styles.precisionNote}>{copy.metrics.precision}</p>
        </div>
      </section>

      <section className={styles.factorsSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.factors.eyebrow}</p>
            <h2>{copy.factors.title}</h2>
            <p>{copy.factors.intro}</p>
          </header>
          <div className={styles.factorGrid}>
            {copy.factors.items.map((item) => {
              const Icon = factorIcons[item.icon];
              return (
                <article key={item.title}>
                  <span>
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

      <section className={styles.comparisonSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.comparison.eyebrow}</p>
            <h2>{copy.comparison.title}</h2>
            <p>{copy.comparison.intro}</p>
          </header>
          <div className={styles.comparisonGrid}>
            <ol className={styles.comparisonSteps}>
              {copy.comparison.steps.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <aside className={styles.patternCard}>
              <h3>{copy.comparison.readTitle}</h3>
              <ul>
                {copy.comparison.readPoints.map((point) => (
                  <li key={point}>
                    <ShieldCheck aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.toolSection}>
        <div className={styles.container}>
          <div className={styles.toolGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.tool.eyebrow}</p>
              <h2>{copy.tool.title}</h2>
              <p>{copy.tool.intro}</p>
              <div className={styles.toolActions}>
                <Link href="/speed-test">
                  {copy.tool.cta}
                  <ArrowRight aria-hidden="true" />
                </Link>
                <Link href="/privacy-policy">{copy.tool.privacyLink}</Link>
              </div>
            </div>
            <ul className={styles.toolFacts}>
              {copy.tool.facts.map((fact) => (
                <li key={fact}>
                  <BadgeCheck aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.notMeasuredSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.notMeasured.eyebrow}</p>
            <h2>{copy.notMeasured.title}</h2>
            <p>{copy.notMeasured.intro}</p>
          </header>
          <div className={styles.notMeasuredGrid}>
            {copy.notMeasured.items.map((item) => (
              <article key={item.title}>
                <CircleAlert aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.troubleshootSection}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.troubleshoot.eyebrow}</p>
            <h2>{copy.troubleshoot.title}</h2>
            <p>{copy.troubleshoot.intro}</p>
          </header>
          <ol className={styles.troubleshootList}>
            {copy.troubleshoot.steps.map((step, index) => (
              <li key={step.title}>
                <span>{index + 1}</span>
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
