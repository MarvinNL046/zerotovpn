import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CircleAlert,
  CircleHelp,
  FileSearch,
  RefreshCw,
  Scale,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import styles from "./evidence-first-route-page.module.css";

export type EvidenceFirstRouteKind =
  "article" | "comparison" | "country" | "guide" | "review" | "roundup";

export type EvidenceFirstRoutePageProps = {
  locale: string;
  kind: EvidenceFirstRouteKind;
  title: string;
  description?: string;
  subject: string;
  sectionHref: string;
  sectionLabel: string;
  notes?: readonly string[];
};

type RouteCopy = {
  breadcrumbHome: string;
  eyebrow: string;
  intro: string;
  boundaryTitle: string;
  boundaryBody: string;
  statusLabel: string;
  statusTitle: string;
  statusRows: readonly { label: string; value: string }[];
  checksEyebrow: string;
  checksTitle: string;
  checksIntro: string;
  checks: readonly { title: string; body: string }[];
  limitsEyebrow: string;
  limitsTitle: string;
  canTitle: string;
  canItems: readonly string[];
  cannotTitle: string;
  cannotItems: readonly string[];
  nextEyebrow: string;
  nextTitle: string;
  nextIntro: string;
  links: readonly { href: string; title: string; body: string }[];
  processEyebrow: string;
  processTitle: string;
  process: readonly { title: string; body: string }[];
  correction: string;
  englishSuffix: string;
  checked: string;
};

const kindLabels: Record<EvidenceFirstRouteKind, { en: string; nl: string }> = {
  article: { en: "Article evidence check", nl: "Bewijscontrole voor artikel" },
  comparison: {
    en: "Comparison evidence check",
    nl: "Bewijscontrole voor vergelijking",
  },
  country: {
    en: "Country evidence check",
    nl: "Bewijscontrole voor landengids",
  },
  guide: { en: "Guide evidence check", nl: "Bewijscontrole voor gids" },
  review: {
    en: "Provider evidence check",
    nl: "Bewijscontrole voor aanbieder",
  },
  roundup: {
    en: "Buying-guide evidence check",
    nl: "Bewijscontrole voor keuzehulp",
  },
};

function getCopy(
  locale: string,
  kind: EvidenceFirstRouteKind,
  subject: string,
): RouteCopy {
  const isNl = locale === "nl";

  if (isNl) {
    return {
      breadcrumbHome: "Start",
      eyebrow: kindLabels[kind].nl,
      intro: `Deze pagina helpt je ${subject} te beoordelen zonder een winnaar, score of garantie te verzinnen. We tonen alleen wat je nu veilig kunt controleren.`,
      boundaryTitle: "Waarom je hier geen ranglijst ziet",
      boundaryBody:
        "De eerdere versie voldeed niet aan onze huidige bewijsregels. Totdat de bronnen en praktijktests opnieuw zijn gecontroleerd, publiceren we geen actuele prijs, vaste score of prestatiebelofte.",
      statusLabel: "Publicatiestatus",
      statusTitle: "Veilige, beperkte uitleg",
      statusRows: [
        { label: "Winnaar", value: "Niet aangewezen" },
        { label: "Actuele prijs", value: "Niet geclaimd" },
        { label: "Praktijktest", value: "Nog niet opnieuw uitgevoerd" },
        {
          label: "Indexering",
          value: "Uit zoekmachines gehouden tijdens controle",
        },
      ],
      checksEyebrow: "Controleer dit eerst",
      checksTitle: "Vier vragen die meer zeggen dan een totaalscore",
      checksIntro:
        "Bewaar de bron, datum, het apparaat en de omstandigheden. Zo kun je een bewering later opnieuw controleren.",
      checks: [
        {
          title: "Wat is precies aangetoond?",
          body: "Scheid documentatie van een aanbieder, een externe controle en een eigen praktijktest.",
        },
        {
          title: "Voor welk apparaat en abonnement?",
          body: "Een functie kan verschillen per besturingssysteem, appversie, land en abonnementsvorm.",
        },
        {
          title: "Hoe oud is het bewijs?",
          body: "Prijzen, voorwaarden, apps en netwerktoegang kunnen na een update veranderen.",
        },
        {
          title: "Wat bewijst de controle niet?",
          body: "Eén meting, audit of netwerkroute is geen garantie voor iedere gebruiker of toekomstige datum.",
        },
      ],
      limitsEyebrow: "Duidelijke grens",
      limitsTitle: "Wat deze pagina nu wel en niet doet",
      canTitle: "Dit kun je nu gebruiken",
      canItems: [
        "Een korte controlelijst voor je eigen situatie",
        "Veilige routes naar gecontroleerde hoofdpagina's",
        "Een duidelijke uitleg waarom gegevens ontbreken",
        "Een manier om een correctie of bron door te geven",
      ],
      cannotTitle: "Dit beweren we niet",
      cannotItems: [
        "Dat één VPN altijd werkt of de beste is",
        "Dat een oude prijs of kortingsclaim nog geldt",
        "Dat een aanbieder volledige privacy of anonimiteit garandeert",
        "Dat een uitslag voor elk land, apparaat of netwerk gelijk is",
      ],
      nextEyebrow: "Ga veilig verder",
      nextTitle: "Gebruik een gecontroleerd startpunt",
      nextIntro:
        "Deze hoofdpagina's gebruiken het nieuwe bewijsmodel en worden opnieuw gecontroleerd wanneer informatie verandert.",
      links: [
        {
          href: "/best/best-vpn",
          title: "Beste VPN's vergelijken",
          body: "Begin met verschillen die we duidelijk kunnen afbakenen.",
        },
        {
          href: "/quiz",
          title: "VPN-keuzehulp",
          body: "Maak een shortlist op basis van je apparaten en gebruik.",
        },
        {
          href: "/methodology",
          title: "Onze werkwijze",
          body: "Lees hoe we claims, bronnen en onbekende gegevens labelen.",
        },
      ],
      processEyebrow: "Redactioneel proces",
      processTitle: "Zo komt een volledige pagina terug",
      process: [
        {
          title: "Inventariseren",
          body: "We verwijderen verouderde scores, prijzen en claims zonder bron.",
        },
        {
          title: "Bronnen koppelen",
          body: "Iedere belangrijke bewering krijgt een bron, datum en duidelijke reikwijdte.",
        },
        {
          title: "Controleren",
          body: "Waar een praktijktest nodig is, leggen we apparaat, route en beperkingen vast.",
        },
        {
          title: "Publiceren",
          body: "De pagina wordt pas indexeerbaar wanneer inhoud, schema en links dezelfde waarheid vertellen.",
        },
      ],
      correction:
        "Zie je een fout of heb je een primaire bron? Stuur die via onze contactpagina; een link is nog geen bewijs totdat we de inhoud hebben gecontroleerd.",
      englishSuffix: " (Engels)",
      checked: "Status gecontroleerd op 17 augustus 2026",
    };
  }

  return {
    breadcrumbHome: "Home",
    eyebrow: kindLabels[kind].en,
    intro: `Use this page to assess ${subject} without an invented winner, score or guarantee. It shows only what you can verify safely right now.`,
    boundaryTitle: "Why there is no ranking here",
    boundaryBody:
      "The previous version did not meet our current evidence rules. Until its sources and hands-on checks are reviewed again, we do not publish a current price, fixed score or performance promise.",
    statusLabel: "Publication status",
    statusTitle: "Safe, limited guidance",
    statusRows: [
      { label: "Winner", value: "Not assigned" },
      { label: "Current price", value: "Not claimed" },
      { label: "Hands-on test", value: "Not rerun yet" },
      { label: "Indexing", value: "Kept out of search during review" },
    ],
    checksEyebrow: "Check this first",
    checksTitle: "Four questions that say more than an overall score",
    checksIntro:
      "Save the source, date, device and conditions. That makes a claim possible to check again later.",
    checks: [
      {
        title: "What was actually demonstrated?",
        body: "Separate provider documentation, an outside assurance review and a hands-on observation.",
      },
      {
        title: "Which device and plan does it cover?",
        body: "A feature can differ by operating system, app version, country and subscription.",
      },
      {
        title: "How old is the evidence?",
        body: "Prices, terms, apps and network access can change after an update.",
      },
      {
        title: "What does the check not prove?",
        body: "One measurement, audit or network route is not a guarantee for every user or future date.",
      },
    ],
    limitsEyebrow: "Clear boundary",
    limitsTitle: "What this page does and does not do",
    canTitle: "You can use this now",
    canItems: [
      "A short checklist for your own situation",
      "Safe routes to reviewed main pages",
      "A clear explanation of missing information",
      "A way to send a correction or primary source",
    ],
    cannotTitle: "We do not claim",
    cannotItems: [
      "That one VPN always works or is universally best",
      "That an old price or discount still applies",
      "That a provider guarantees total privacy or anonymity",
      "That one result applies to every country, device or network",
    ],
    nextEyebrow: "Continue safely",
    nextTitle: "Use a reviewed starting point",
    nextIntro:
      "These main pages use the new evidence model and are checked again when information changes.",
    links: [
      {
        href: "/best/best-vpn",
        title: "Compare the best VPNs",
        body: "Start with differences that can be stated clearly.",
      },
      {
        href: "/quiz",
        title: "VPN picker",
        body: "Build a shortlist around your devices and intended use.",
      },
      {
        href: "/methodology",
        title: "Our methodology",
        body: "See how we label claims, sources and unknown information.",
      },
    ],
    processEyebrow: "Editorial process",
    processTitle: "How a full page returns",
    process: [
      {
        title: "Inventory",
        body: "We remove old scores, prices and statements without a source.",
      },
      {
        title: "Map sources",
        body: "Each important statement gets a source, date and clear scope.",
      },
      {
        title: "Verify",
        body: "When hands-on work is needed, we record the device, route and limitations.",
      },
      {
        title: "Publish",
        body: "The page becomes indexable only when its copy, schema and links tell the same truth.",
      },
    ],
    correction:
      "Found an error or have a primary source? Send it through our contact page. A link is not treated as proof until its contents are checked.",
    englishSuffix: " (English)",
    checked: "Status checked 17 August 2026",
  };
}

export function EvidenceFirstRoutePage({
  locale,
  kind,
  title,
  description,
  subject,
  sectionHref,
  sectionLabel,
  notes = [],
}: EvidenceFirstRoutePageProps) {
  const copy = getCopy(locale, kind, subject);
  const useEnglishLinks = locale !== "en" && locale !== "nl";

  return (
    <article className={styles.page} data-design-version="v2-evidence-first">
      <section className={styles.hero} aria-labelledby="evidence-route-title">
        <div className={styles.container}>
          <nav
            className={styles.breadcrumb}
            aria-label={locale === "nl" ? "Broodkruimelpad" : "Breadcrumb"}
          >
            <Link href="/" locale={useEnglishLinks ? "en" : undefined}>
              {copy.breadcrumbHome}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={sectionHref}
              locale={useEnglishLinks ? "en" : undefined}
            >
              {sectionLabel}
              {useEnglishLinks ? copy.englishSuffix : ""}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 id="evidence-route-title">{title}</h1>
              <p className={styles.heroIntro}>{description ?? copy.intro}</p>
              <div className={styles.cues}>
                <span>
                  <BadgeCheck aria-hidden="true" />
                  {copy.statusRows[0].value}
                </span>
                <span>
                  <FileSearch aria-hidden="true" />
                  {copy.statusRows[1].value}
                </span>
                <span>
                  <ShieldCheck aria-hidden="true" />
                  {copy.statusRows[2].value}
                </span>
              </div>
            </div>

            <aside className={styles.statusCard}>
              <p className={styles.cardLabel}>{copy.statusLabel}</p>
              <h2>{copy.statusTitle}</h2>
              <dl>
                {copy.statusRows.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              <time dateTime="2026-08-17">{copy.checked}</time>
            </aside>
          </div>

          <aside className={styles.boundaryNote}>
            <CircleAlert aria-hidden="true" />
            <div>
              <h2>{copy.boundaryTitle}</h2>
              <p>{copy.boundaryBody}</p>
              {notes.length > 0 ? (
                <ul>
                  {notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.checksSection} aria-labelledby="checks-title">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.checksEyebrow}</p>
            <h2 id="checks-title">{copy.checksTitle}</h2>
            <p>{copy.checksIntro}</p>
          </header>
          <div className={styles.checkGrid}>
            {copy.checks.map((check, index) => (
              <section key={check.title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <SearchCheck aria-hidden="true" />
                <h3>{check.title}</h3>
                <p>{check.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.limitsSection} aria-labelledby="limits-title">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.limitsEyebrow}</p>
            <h2 id="limits-title">{copy.limitsTitle}</h2>
          </header>
          <div className={styles.limitGrid}>
            <section>
              <BookOpenCheck aria-hidden="true" />
              <h3>{copy.canTitle}</h3>
              <ul>
                {copy.canItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <Scale aria-hidden="true" />
              <h3>{copy.cannotTitle}</h3>
              <ul>
                {copy.cannotItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className={styles.nextSection} aria-labelledby="next-title">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.nextEyebrow}</p>
            <h2 id="next-title">{copy.nextTitle}</h2>
            <p>{copy.nextIntro}</p>
          </header>
          <div className={styles.linkGrid}>
            {copy.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                locale={useEnglishLinks ? "en" : undefined}
              >
                <CircleHelp aria-hidden="true" />
                <h3>
                  {link.title}
                  {useEnglishLinks ? copy.englishSuffix : ""}
                </h3>
                <p>{link.body}</p>
                <span>
                  {locale === "nl" ? "Open pagina" : "Open page"}
                  <ArrowRight aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.processSection}
        aria-labelledby="process-title"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{copy.processEyebrow}</p>
            <h2 id="process-title">{copy.processTitle}</h2>
          </header>
          <ol className={styles.processGrid}>
            {copy.process.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside className={styles.correctionNote}>
            <RefreshCw aria-hidden="true" />
            <p>{copy.correction}</p>
            <Link href="/contact" locale={useEnglishLinks ? "en" : undefined}>
              {locale === "nl" ? "Contact opnemen" : "Contact us"}
              {useEnglishLinks ? copy.englishSuffix : ""}
              <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </article>
  );
}
