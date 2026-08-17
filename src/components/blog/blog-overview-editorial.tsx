import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock3,
  FlaskConical,
  Globe2,
  Laptop2,
  LockKeyhole,
  MapPinned,
  Newspaper,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import {
  getJournalBreadcrumbLabels,
  type JournalCopy,
  type JournalTopic,
} from "@/data/blog-overview";
import styles from "./blog-overview-editorial.module.css";

export type JournalStoryView = {
  slug: string;
  title: string;
  excerpt: string;
  eyebrow: string;
  topic: JournalTopic;
  date: string;
  updatedAt?: string | null;
  readingMinutes: number;
  image?: {
    src: string;
    alt: string;
    focalPoint?: string;
    caption?: string;
  };
};

type BlogOverviewEditorialProps = {
  locale: string;
  copy: JournalCopy;
  lead?: JournalStoryView;
  editorsPicks: JournalStoryView[];
  secondaryStories: JournalStoryView[];
  latestStories: JournalStoryView[];
  deepReads: JournalStoryView[];
  archiveStories: JournalStoryView[];
  totalResults: number;
  currentPage: number;
  pageCount: number;
  activeTopic?: JournalTopic;
  query?: string;
  labImage?: { src: string; alt: string; caption: string };
};

const topicIcons: Record<JournalTopic, LucideIcon> = {
  "privacy-security": LockKeyhole,
  "censorship-access": Globe2,
  "apps-devices": Laptop2,
  "speed-troubleshooting": Wrench,
  "tests-evidence": FlaskConical,
  "industry-policy": Newspaper,
};

const knowledgeIcons: LucideIcon[] = [
  BookOpen,
  ShieldCheck,
  Globe2,
  MapPinned,
  Wrench,
  FlaskConical,
];

function localeDate(locale: string, date: string): string {
  const localeMap: Record<string, string> = {
    en: "en-US",
    nl: "nl-NL",
    de: "de-DE",
    es: "es-ES",
    fr: "fr-FR",
    zh: "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR",
    th: "th-TH-u-ca-gregory",
  };

  return new Intl.DateTimeFormat(localeMap[locale] ?? locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function storyHref(slug: string): string {
  return `/blog/${slug}`;
}

function topicHref(topic?: JournalTopic | "latest"): string {
  return topic && topic !== "latest"
    ? `/blog?topic=${encodeURIComponent(topic)}`
    : "/blog";
}

function archiveHref(
  page: number,
  activeTopic?: JournalTopic,
  query?: string,
): string {
  const search = new URLSearchParams();
  if (query) search.set("q", query);
  if (activeTopic) search.set("topic", activeTopic);
  if (page > 1) search.set("page", String(page));
  const suffix = search.toString();
  return suffix ? `/blog?${suffix}` : "/blog";
}

function StoryVisual({
  story,
  className,
  sizes,
  priority = false,
}: {
  story: JournalStoryView;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  const Icon = topicIcons[story.topic];

  return (
    <div className={className}>
      {story.image ? (
        <Image
          alt={story.image.alt}
          fill
          priority={priority}
          sizes={sizes}
          src={story.image.src}
          style={{ objectPosition: story.image.focalPoint ?? "50% 50%" }}
        />
      ) : (
        <span aria-hidden="true" className={styles.artFallback}>
          <Icon className={styles.artFallbackIcon} strokeWidth={1.7} />
        </span>
      )}
    </div>
  );
}

function StoryMeta({
  story,
  copy,
  locale,
}: {
  story: JournalStoryView;
  copy: JournalCopy;
  locale: string;
}) {
  const effectiveDate = story.updatedAt ?? story.date;
  return (
    <div className={styles.storyMeta}>
      <span className={styles.topicBadge}>
        {copy.topics[story.topic].label}
      </span>
      <span aria-hidden="true">•</span>
      <time dateTime={effectiveDate}>{localeDate(locale, effectiveDate)}</time>
      <span aria-hidden="true">•</span>
      <span className="inline-flex items-center gap-1">
        <Clock3 aria-hidden="true" className="size-3.5" />
        {copy.story.minutes(story.readingMinutes)}
      </span>
    </div>
  );
}

function LeadStory({
  story,
  copy,
  locale,
}: {
  story: JournalStoryView;
  copy: JournalCopy;
  locale: string;
}) {
  const headingId = `lead-${story.slug}`;
  return (
    <article aria-labelledby={headingId} className={styles.leadCard}>
      <Link aria-label={story.title} href={storyHref(story.slug)}>
        <StoryVisual
          className={styles.leadVisual}
          priority
          sizes="(max-width: 1023px) 100vw, 66vw"
          story={story}
        />
      </Link>
      <div className={styles.leadBody}>
        <StoryMeta copy={copy} locale={locale} story={story} />
        <h2 className={styles.leadHeadline} id={headingId}>
          <Link className={styles.headlineLink} href={storyHref(story.slug)}>
            {story.title}
          </Link>
        </h2>
        <p className={styles.leadExcerpt}>{story.excerpt}</p>
        <div className={styles.byline}>
          <Image
            alt=""
            className={styles.avatar}
            height={32}
            src="/images/team/marvin.webp"
            width={32}
          />
          <Link
            className="font-bold text-foreground hover:underline"
            href="/authors/marvin-smit"
          >
            Marvin Smit
          </Link>
          <span aria-hidden="true">•</span>
          <span>{copy.story.read}</span>
        </div>
      </div>
    </article>
  );
}

function EditorsPicks({
  stories,
  copy,
}: {
  stories: JournalStoryView[];
  copy: JournalCopy;
}) {
  return (
    <aside
      aria-labelledby="journal-editors-picks"
      className={styles.editorsPanel}
    >
      <h2 className={styles.editorsTitle} id="journal-editors-picks">
        {copy.sections.editorsPicks}
      </h2>
      <ol className={styles.pickList}>
        {stories.map((story, index) => (
          <li className={styles.pickItem} key={story.slug}>
            <span aria-hidden="true" className={styles.pickNumber}>
              {index + 1}
            </span>
            <div className="min-w-0">
              <span className={styles.topicBadge}>{story.eyebrow}</span>
              <h3>
                <Link
                  className={styles.pickTitleLink}
                  href={storyHref(story.slug)}
                >
                  {story.title}
                </Link>
              </h3>
            </div>
            <Link aria-label={story.title} href={storyHref(story.slug)}>
              <StoryVisual
                className={styles.pickThumb}
                sizes="72px"
                story={story}
              />
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function StoryCard({
  story,
  copy,
  locale,
}: {
  story: JournalStoryView;
  copy: JournalCopy;
  locale: string;
}) {
  const headingId = `story-${story.slug}`;
  return (
    <article aria-labelledby={headingId} className={styles.storyCard}>
      <Link aria-label={story.title} href={storyHref(story.slug)}>
        <StoryVisual
          className={styles.storyVisual}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 34vw"
          story={story}
        />
      </Link>
      <div className={styles.storyBody}>
        <StoryMeta copy={copy} locale={locale} story={story} />
        <h3 className={styles.storyTitle} id={headingId}>
          <Link className={styles.storyTitleLink} href={storyHref(story.slug)}>
            {story.title}
          </Link>
        </h3>
        <p className={styles.storyExcerpt}>{story.excerpt}</p>
      </div>
    </article>
  );
}

function FeedStory({
  story,
  copy,
  locale,
}: {
  story: JournalStoryView;
  copy: JournalCopy;
  locale: string;
}) {
  const headingId = `feed-${story.slug}`;
  return (
    <article aria-labelledby={headingId} className={styles.feedCard}>
      <Link aria-label={story.title} href={storyHref(story.slug)}>
        <StoryVisual
          className={styles.feedVisual}
          sizes="136px"
          story={story}
        />
      </Link>
      <div className={styles.feedBody}>
        <span className={styles.topicBadge}>{story.eyebrow}</span>
        <h3 className={styles.feedTitle} id={headingId}>
          <Link className={styles.feedTitleLink} href={storyHref(story.slug)}>
            {story.title}
          </Link>
        </h3>
        <div className="mt-2">
          <StoryMeta copy={copy} locale={locale} story={story} />
        </div>
      </div>
    </article>
  );
}

function NewsletterCard({ copy }: { copy: JournalCopy }) {
  return (
    <section
      aria-labelledby="journal-newsletter"
      className={styles.newsletterCard}
    >
      <span className="text-xs font-black uppercase tracking-[0.12em]">
        {copy.newsletter.eyebrow}
      </span>
      <h2 className={styles.newsletterTitle} id="journal-newsletter">
        {copy.newsletter.title}
      </h2>
      <p className={styles.newsletterCopy}>{copy.newsletter.description}</p>
      <NewsletterForm source="blog-overview" variant="compact" />
    </section>
  );
}

function ArchiveCard({
  story,
  copy,
  locale,
}: {
  story: JournalStoryView;
  copy: JournalCopy;
  locale: string;
}) {
  const headingId = `archive-${story.slug}`;
  return (
    <article aria-labelledby={headingId} className={styles.archiveCard}>
      <div className={styles.archiveBody}>
        <StoryMeta copy={copy} locale={locale} story={story} />
        <h3 className={styles.archiveTitle} id={headingId}>
          <Link className={styles.storyTitleLink} href={storyHref(story.slug)}>
            {story.title}
          </Link>
        </h3>
        <p className={styles.archiveExcerpt}>{story.excerpt}</p>
        <div className={styles.archiveMeta}>
          <Link className={styles.sectionLink} href={storyHref(story.slug)}>
            {copy.story.read}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BlogOverviewEditorial({
  locale,
  copy,
  lead,
  editorsPicks,
  secondaryStories,
  latestStories,
  deepReads,
  archiveStories,
  totalResults,
  currentPage,
  pageCount,
  activeTopic,
  query,
  labImage,
}: BlogOverviewEditorialProps) {
  const formAction = locale === "en" ? "/blog" : `/${locale}/blog`;
  const hasActiveFilter = Boolean(activeTopic || query);
  const showLandingSections = !hasActiveFilter && currentPage === 1;
  const breadcrumbs = getJournalBreadcrumbLabels(locale);

  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <div className={styles.container}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">{breadcrumbs.home}</Link>
            <ChevronRight aria-hidden="true" className="size-3.5" />
            <span aria-current="page">{breadcrumbs.journal}</span>
          </nav>
          <div className={styles.mastheadGrid}>
            <div>
              <span className={styles.eyebrow}>{copy.masthead.eyebrow}</span>
              <h1 className={styles.title}>{copy.masthead.title}</h1>
              <p className={styles.intro}>{copy.masthead.description}</p>
            </div>
            <form
              action={formAction}
              className={styles.searchForm}
              method="get"
              role="search"
            >
              <Search
                aria-hidden="true"
                className={styles.searchIcon}
                size={20}
              />
              <label className="sr-only" htmlFor="journal-search">
                {copy.masthead.searchLabel}
              </label>
              <input
                className={styles.searchInput}
                defaultValue={query}
                id="journal-search"
                name="q"
                placeholder={copy.masthead.searchPlaceholder}
                type="search"
              />
              <button className={styles.searchButton} type="submit">
                {copy.archive.searchLabel}
              </button>
            </form>
          </div>
        </div>
      </header>

      <nav aria-label={copy.masthead.browseTopics} className={styles.topicNav}>
        <div className={`${styles.container} ${styles.topicScroller}`}>
          {copy.navigation.map((item) => {
            const isLatest = item.topic === "latest";
            const selected = isLatest
              ? !activeTopic && !query
              : activeTopic === item.topic;
            return (
              <Link
                aria-current={selected ? "page" : undefined}
                className={`${styles.topicLink} ${selected ? styles.topicLinkActive : ""}`}
                href={topicHref(isLatest ? undefined : item.topic)}
                key={item.topic}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {showLandingSections && lead ? (
        <section aria-labelledby="journal-featured" className={styles.section}>
          <div className={styles.container}>
            <h2 className="sr-only" id="journal-featured">
              {copy.sections.lead}
            </h2>
            <div className={styles.heroGrid}>
              <LeadStory copy={copy} locale={locale} story={lead} />
              <EditorsPicks copy={copy} stories={editorsPicks.slice(0, 5)} />
            </div>
            <div className={styles.secondaryGrid}>
              {secondaryStories.slice(0, 2).map((story) => (
                <StoryCard
                  copy={copy}
                  key={story.slug}
                  locale={locale}
                  story={story}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showLandingSections ? (
        <section aria-labelledby="journal-check" className={styles.labSection}>
          <div className={`${styles.container} ${styles.labPanel}`}>
            <div>
              <span className={styles.labKicker}>
                {copy.sections.check.eyebrow}
              </span>
              <h2 className={styles.labTitle} id="journal-check">
                {copy.sections.check.title}
              </h2>
              <p className={styles.labCopy}>
                {copy.sections.check.description}
              </p>
              <div className={styles.labActions}>
                <Link
                  className={styles.primaryButton}
                  href="/tools/dns-leak-test"
                >
                  {copy.sections.check.primaryAction}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link className={styles.secondaryButton} href="/methodology">
                  {copy.sections.check.secondaryAction}
                </Link>
              </div>
            </div>
            <figure className={styles.labFigure}>
              {labImage ? (
                <>
                  <Image
                    alt={labImage.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 48vw"
                    src={labImage.src}
                  />
                  <figcaption className={styles.labCaption}>
                    {labImage.caption}
                  </figcaption>
                </>
              ) : (
                <span aria-hidden="true" className={styles.artFallback}>
                  <FlaskConical
                    className={styles.artFallbackIcon}
                    strokeWidth={1.7}
                  />
                </span>
              )}
            </figure>
          </div>
        </section>
      ) : null}

      {showLandingSections && latestStories.length ? (
        <section aria-labelledby="journal-latest" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.latestGrid}>
              <div>
                <div className={styles.sectionHeader}>
                  <div>
                    <p className={styles.sectionKicker}>
                      {copy.masthead.eyebrow}
                    </p>
                    <h2 className={styles.sectionTitle} id="journal-latest">
                      {copy.sections.latest}
                    </h2>
                  </div>
                  <a className={styles.sectionLink} href="#journal-archive">
                    {copy.sections.archive}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </div>
                <div className={styles.feedList}>
                  {latestStories.slice(0, 6).map((story) => (
                    <FeedStory
                      copy={copy}
                      key={story.slug}
                      locale={locale}
                      story={story}
                    />
                  ))}
                </div>
              </div>
              <aside className={styles.sidebar}>
                <section
                  aria-labelledby="journal-topics"
                  className={styles.sidebarCard}
                >
                  <h2 className={styles.sidebarTitle} id="journal-topics">
                    {copy.sections.exploreTopics}
                  </h2>
                  <div className={styles.topicList}>
                    {copy.navigation
                      .filter((item) => item.topic !== "latest")
                      .map((item) => (
                        <Link
                          className={styles.topicListLink}
                          href={topicHref(item.topic)}
                          key={item.topic}
                        >
                          {item.label}
                          <ChevronRight aria-hidden="true" className="size-4" />
                        </Link>
                      ))}
                  </div>
                </section>
                <NewsletterCard copy={copy} />
              </aside>
            </div>
          </div>
        </section>
      ) : null}

      {showLandingSections && deepReads.length ? (
        <section
          aria-labelledby="journal-deep-reads"
          className={`${styles.section} ${styles.sectionTint}`}
        >
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionKicker}>
                  {copy.sections.secondary}
                </p>
                <h2 className={styles.sectionTitle} id="journal-deep-reads">
                  {copy.sections.deepReads}
                </h2>
              </div>
            </div>
            <div className={styles.deepGrid}>
              {deepReads.slice(0, 3).map((story) => (
                <article
                  aria-labelledby={`deep-${story.slug}`}
                  className={styles.deepCard}
                  key={story.slug}
                >
                  <Link aria-label={story.title} href={storyHref(story.slug)}>
                    <StoryVisual
                      className={styles.deepVisual}
                      sizes="(max-width: 639px) 100vw, 33vw"
                      story={story}
                    />
                  </Link>
                  <div className={styles.deepBody}>
                    <span className={styles.topicBadge}>{story.eyebrow}</span>
                    <h3 className={styles.deepTitle} id={`deep-${story.slug}`}>
                      <Link
                        className={styles.deepTitleLink}
                        href={storyHref(story.slug)}
                      >
                        {story.title}
                      </Link>
                    </h3>
                    <p className={styles.storyExcerpt}>{story.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="journal-archive-title"
        className={styles.section}
        id="journal-archive"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionKicker}>
                {copy.sections.exploreTopics}
              </p>
              <h2 className={styles.sectionTitle} id="journal-archive-title">
                {copy.sections.archive}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {copy.sections.archiveDescription}
              </p>
            </div>
          </div>
          <div className={styles.archiveToolbar}>
            <p className={styles.archiveSummary}>
              {copy.archive.resultCount(totalResults)}
            </p>
            {hasActiveFilter ? (
              <Link className={styles.clearFilter} href="/blog">
                {copy.archive.allTopics}
              </Link>
            ) : null}
          </div>
          {archiveStories.length ? (
            <div className={styles.archiveGrid}>
              {archiveStories.map((story) => (
                <ArchiveCard
                  copy={copy}
                  key={story.slug}
                  locale={locale}
                  story={story}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3 className="text-xl font-bold">{copy.archive.emptyTitle}</h3>
              <p className="mt-2 text-muted-foreground">
                {copy.archive.emptyDescription}
              </p>
            </div>
          )}
          {pageCount > 1 ? (
            <nav
              aria-label={copy.archive.page(currentPage, pageCount)}
              className={styles.pagination}
            >
              {currentPage > 1 ? (
                <Link
                  className={styles.pageLink}
                  href={archiveHref(currentPage - 1, activeTopic, query)}
                >
                  {copy.archive.previous}
                </Link>
              ) : null}
              <span aria-current="page" className={styles.pageCurrent}>
                {currentPage}
              </span>
              <span className="text-sm text-muted-foreground">
                {copy.archive.page(currentPage, pageCount)}
              </span>
              {currentPage < pageCount ? (
                <Link
                  className={styles.pageLink}
                  href={archiveHref(currentPage + 1, activeTopic, query)}
                >
                  {copy.archive.next}
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>
      </section>

      <section
        aria-labelledby="journal-knowledge"
        className={`${styles.section} ${styles.sectionTint}`}
      >
        <div className={styles.container}>
          <h2 className={styles.sectionTitle} id="journal-knowledge">
            {copy.knowledge.title}
          </h2>
          <div className={`${styles.knowledgeGrid} mt-6`}>
            {copy.knowledge.items.slice(0, 5).map((item, index) => {
              const Icon = knowledgeIcons[index] ?? BookOpen;
              return (
                <Link
                  className={styles.knowledgeCard}
                  href={item.href}
                  key={item.href}
                >
                  <Icon aria-hidden="true" className={styles.knowledgeIcon} />
                  <h3 className={styles.knowledgeTitle}>{item.label}</h3>
                  <p className={styles.knowledgeCopy}>{item.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
