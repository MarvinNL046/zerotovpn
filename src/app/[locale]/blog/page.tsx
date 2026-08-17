import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BlogOverviewEditorial,
  type JournalStoryView,
} from "@/components/blog/blog-overview-editorial";
import {
  getBlogOverviewCuration,
  getJournalBreadcrumbLabels,
  getJournalCopy,
  getJournalMedia,
  getJournalTopic,
  isJournalLocaleFullyLocalized,
  type JournalStory,
  type JournalTopic,
} from "@/data/blog-overview";
import {
  getCachedPostSummaries,
  getPostReadingMinutes,
  type BlogPostSummary,
} from "@/lib/pipeline/blog-service";
import {
  BASE_URL,
  OG_LOCALE_MAP,
  generateAlternates,
  titelMetMerk,
} from "@/lib/seo-utils";
import { shouldNoindexPath } from "@/lib/indexability";
import {
  torrentingRedditEditorialExcerpt,
  torrentingRedditEditorialTitle,
} from "@/data/editorial/torrenting-reddit-2026";

export const revalidate = 600;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    page?: string | string[];
    q?: string | string[];
    topic?: string | string[];
  }>;
};

type DraftStory = Omit<JournalStoryView, "readingMinutes"> & {
  fallbackReadingMinutes?: number;
  tags: string[];
};

const ARCHIVE_PAGE_SIZE = 12;
const CURATED_STORY_COUNT = 1 + 5 + 2 + 6 + 3;
const JOURNAL_OG_IMAGE = `${BASE_URL}/images/blog/zerotovpn-journal-og-v1.webp`;
const REVIEWED_ARCHIVE_COPY: Readonly<
  Record<string, { title: string; excerpt: string }>
> = {
  "best-vpn-for-torrenting-reddit-2026": {
    title: torrentingRedditEditorialTitle,
    excerpt: torrentingRedditEditorialExcerpt,
  },
};
const LAB_MEDIA_COPY: Readonly<
  Record<string, { alt: string; caption: string }>
> = {
  en: {
    alt: "English ZeroToVPN browser route check in its idle state",
    caption:
      "Current English browser-route check, captured on 17 August 2026 before it was started. It contains no personal test data and does not measure the DNS resolver.",
  },
  nl: {
    alt: "Engelstalige ZeroToVPN-controle van de browserroute in de beginstand",
    caption:
      "Actuele Engelstalige browserroutecontrole, vastgelegd op 17 augustus 2026 vóór de start. De afbeelding bevat geen persoonlijke testgegevens en meet de DNS-resolver niet.",
  },
  de: {
    alt: "Englische ZeroToVPN-Browserroutenprüfung im Startzustand",
    caption:
      "Aktuelle englische Browserroutenprüfung vom 17. August 2026 vor dem Start. Sie enthält keine persönlichen Testdaten und misst den DNS-Resolver nicht.",
  },
  es: {
    alt: "Comprobación en inglés de la ruta del navegador de ZeroToVPN en reposo",
    caption:
      "Comprobación actual de la ruta del navegador en inglés, capturada el 17 de agosto de 2026 antes de iniciarla. No contiene datos personales ni mide el resolver DNS.",
  },
  fr: {
    alt: "Vérification en anglais de la route du navigateur ZeroToVPN au repos",
    caption:
      "Vérification actuelle de la route du navigateur en anglais, capturée le 17 août 2026 avant son lancement. Elle ne contient aucune donnée personnelle et ne mesure pas le résolveur DNS.",
  },
  zh: {
    alt: "ZeroToVPN 浏览器路线检查初始状态的英文截图",
    caption:
      "当前英文浏览器路线检查于 2026 年 8 月 17 日启动前截取，不含个人测试数据，也不会测量 DNS 解析器。",
  },
  ja: {
    alt: "開始前のZeroToVPNブラウザ経路チェック英語画面",
    caption:
      "2026年8月17日に開始前の状態で記録した現在の英語版ブラウザ経路チェックです。個人データは含まず、DNSリゾルバーは測定しません。",
  },
  ko: {
    alt: "시작 전 ZeroToVPN 브라우저 경로 확인 영문 화면",
    caption:
      "2026년 8월 17일 시작 전에 기록한 최신 영문 브라우저 경로 확인 화면입니다. 개인 테스트 데이터가 없으며 DNS 리졸버를 측정하지 않습니다.",
  },
  th: {
    alt: "ภาพหน้าจอภาษาอังกฤษของการตรวจสอบเส้นทางเบราว์เซอร์ ZeroToVPN ก่อนเริ่ม",
    caption:
      "การตรวจสอบเส้นทางเบราว์เซอร์ภาษาอังกฤษปัจจุบัน บันทึกก่อนเริ่มเมื่อ 17 สิงหาคม 2026 ไม่มีข้อมูลส่วนบุคคลและไม่ได้วัด DNS resolver",
  },
};
const TOPICS = new Set<JournalTopic>([
  "privacy-security",
  "censorship-access",
  "apps-devices",
  "speed-troubleshooting",
  "tests-evidence",
  "industry-policy",
]);

const STATIC_POSTS = [
  {
    slug: "is-vpn-legal",
    category: "security",
    date: "2026-01-15",
    readingMinutes: 8,
  },
  {
    slug: "vpn-vs-proxy",
    category: "guide",
    date: "2026-01-10",
    readingMinutes: 6,
  },
] as const;

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parsePage(value: string | string[] | undefined): number {
  const parsed = Number.parseInt(single(value) ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function parseTopic(
  value: string | string[] | undefined,
): JournalTopic | undefined {
  const topic = single(value);
  return topic && TOPICS.has(topic as JournalTopic)
    ? (topic as JournalTopic)
    : undefined;
}

function localePath(locale: string, path: string): string {
  return `${locale === "en" ? "" : `/${locale}`}${path}`;
}

function canonicalPath(page: number, filtered: boolean): string {
  return !filtered && page > 1 ? `/blog?page=${page}` : "/blog";
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const query = searchParams ? await searchParams : undefined;
  const page = parsePage(query?.page);
  const searchQuery = single(query?.q)?.trim();
  const topic = parseTopic(query?.topic);
  const filtered = Boolean(searchQuery || topic);
  const copy = getJournalCopy(locale);
  const path = canonicalPath(page, filtered);
  const bareTitle = copy.metadata.title.replace(/\s*\|\s*ZeroToVPN$/u, "");
  const storyCount =
    page > 1 && !filtered
      ? (await getCachedPostSummaries(locale)).filter(
          (post) => !shouldNoindexPath(`/${locale}/blog/${post.slug}`),
        ).length +
        STATIC_POSTS.filter(
          (post) => !shouldNoindexPath(`/${locale}/blog/${post.slug}`),
        ).length
      : 0;
  const archiveCount =
    storyCount > 30
      ? Math.max(0, storyCount - CURATED_STORY_COUNT)
      : storyCount;
  const archivePageCount = Math.max(
    1,
    Math.ceil(archiveCount / ARCHIVE_PAGE_SIZE),
  );
  const pageTitle =
    page > 1 && !filtered
      ? `${bareTitle} — ${copy.archive.page(page, archivePageCount)}`
      : copy.metadata.title;
  const canonicalUrl = `${BASE_URL}${localePath(locale, path)}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: titelMetMerk(pageTitle) },
    description: copy.metadata.description,
    alternates:
      page > 1 && !filtered
        ? { canonical: canonicalUrl }
        : generateAlternates(path, locale),
    openGraph: {
      type: "website",
      locale: OG_LOCALE_MAP[locale] ?? "en_US",
      url: canonicalUrl,
      siteName: "ZeroToVPN",
      title: pageTitle,
      description: copy.metadata.description,
      images: [
        {
          url: JOURNAL_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: copy.metadata.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: copy.metadata.description,
      images: [JOURNAL_OG_IMAGE],
    },
    robots:
      filtered || !isJournalLocaleFullyLocalized(locale)
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}

function dateValue(post: BlogPostSummary): string {
  return (post.publishedAt ?? post.createdAt).toISOString().slice(0, 10);
}

function updatedValue(post: BlogPostSummary): string | null {
  if (!post.updatedAt) return null;
  const updated = post.updatedAt.toISOString().slice(0, 10);
  return updated === dateValue(post) ? null : updated;
}

function sortDate(story: DraftStory): number {
  return new Date(story.updatedAt ?? story.date).getTime();
}

function withMedia(
  story: Omit<DraftStory, "image">,
  contentLocale: "en" | "nl",
): DraftStory {
  const media = getJournalMedia(story.slug);
  return {
    ...story,
    image: media
      ? {
          src: media.src,
          alt: media.alt[contentLocale],
          focalPoint: media.focalPoint,
          caption: media.caption?.[contentLocale],
        }
      : undefined,
  };
}

function fromSummary(
  post: BlogPostSummary,
  contentLocale: "en" | "nl",
  topicLabels: ReturnType<typeof getJournalCopy>["topics"],
): DraftStory {
  const topic = getJournalTopic(post);
  return withMedia(
    {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      eyebrow: topicLabels[topic].label,
      topic,
      date: dateValue(post),
      updatedAt: updatedValue(post),
      tags: post.tags ?? [],
    },
    contentLocale,
  );
}

function overlayCuration(
  base: DraftStory,
  curated: JournalStory,
  contentLocale: "en" | "nl",
  allowLocalizedDisplayCopy: boolean,
  topicLabels: ReturnType<typeof getJournalCopy>["topics"],
): DraftStory {
  const topic = curated.topic ?? base.topic;
  return withMedia(
    {
      ...base,
      title: allowLocalizedDisplayCopy ? curated.title : base.title,
      excerpt: allowLocalizedDisplayCopy ? curated.excerpt : base.excerpt,
      eyebrow: allowLocalizedDisplayCopy
        ? curated.eyebrow
        : topicLabels[topic].label,
      topic,
    },
    contentLocale,
  );
}

function fillGroup(
  requested: JournalStory[],
  count: number,
  bySlug: Map<string, DraftStory>,
  sorted: DraftStory[],
  claimed: Set<string>,
  contentLocale: "en" | "nl",
  allowLocalizedDisplayCopy: boolean,
  topicLabels: ReturnType<typeof getJournalCopy>["topics"],
): DraftStory[] {
  const stories: DraftStory[] = [];
  for (const curated of requested) {
    const base = bySlug.get(curated.slug);
    if (!base || claimed.has(base.slug)) continue;
    stories.push(
      overlayCuration(
        base,
        curated,
        contentLocale,
        allowLocalizedDisplayCopy,
        topicLabels,
      ),
    );
    claimed.add(base.slug);
    if (stories.length === count) return stories;
  }

  for (const story of sorted) {
    if (claimed.has(story.slug)) continue;
    stories.push(story);
    claimed.add(story.slug);
    if (stories.length === count) break;
  }
  return stories;
}

function finalize(
  story: DraftStory,
  readingMinutes: Record<string, number>,
): JournalStoryView {
  return {
    slug: story.slug,
    title: story.title,
    excerpt: story.excerpt,
    eyebrow: story.eyebrow,
    topic: story.topic,
    date: story.date,
    updatedAt: story.updatedAt,
    image: story.image,
    readingMinutes:
      readingMinutes[story.slug] ?? story.fallbackReadingMinutes ?? 5,
  };
}

function visibleStoryUrls(locale: string, stories: JournalStoryView[]) {
  return stories.map((story, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${BASE_URL}${localePath(locale, `/blog/${story.slug}`)}`,
    name: story.title,
  }));
}

function JournalJsonLd({
  locale,
  copy,
  page,
  filtered,
  stories,
}: {
  locale: string;
  copy: ReturnType<typeof getJournalCopy>;
  page: number;
  filtered: boolean;
  stories: JournalStoryView[];
}) {
  const path = canonicalPath(page, filtered);
  const url = `${BASE_URL}${localePath(locale, path)}`;
  const blogUrl = `${BASE_URL}${localePath(locale, "/blog")}`;
  const breadcrumbs = getJournalBreadcrumbLabels(locale);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name: copy.metadata.title,
        description: copy.metadata.description,
        inLanguage: locale,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          itemListElement: visibleStoryUrls(locale, stories),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: breadcrumbs.home,
            item: `${BASE_URL}${localePath(locale, "/")}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumbs.journal,
            item: blogUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const queryParams = searchParams ? await searchParams : undefined;
  const requestedPage = parsePage(queryParams?.page);
  const searchQuery = single(queryParams?.q)?.trim().slice(0, 100);
  const activeTopic = parseTopic(queryParams?.topic);
  const filtered = Boolean(searchQuery || activeTopic);
  setRequestLocale(locale);

  const [postSummaries, t] = await Promise.all([
    getCachedPostSummaries(locale),
    getTranslations("blog"),
  ]);
  const copy = getJournalCopy(locale);
  const labMediaCopy = LAB_MEDIA_COPY[locale] ?? LAB_MEDIA_COPY.en;
  const curation = getBlogOverviewCuration(locale);
  const allowLocalizedDisplayCopy = !curation.isFallback;

  const dynamicStories = postSummaries.map((post) =>
    fromSummary(post, copy.contentLocale, copy.topics),
  );
  const staticStories: DraftStory[] = STATIC_POSTS.map((post) => {
    const topic = getJournalTopic(post);
    return withMedia(
      {
        slug: post.slug,
        topic,
        eyebrow: copy.topics[topic].label,
        title: t(`posts.${post.slug}.title`),
        excerpt: t(`posts.${post.slug}.excerpt`),
        date: post.date,
        updatedAt: null,
        fallbackReadingMinutes: post.readingMinutes,
        tags: [],
      },
      copy.contentLocale,
    );
  });
  const curatedDisplayBySlug = new Map(
    [
      curation.lead,
      ...curation.editorsPicks,
      ...curation.secondary,
      ...curation.latest,
      ...curation.deepReads,
    ].map((story) => [story.slug, story]),
  );
  const allStories = [...dynamicStories, ...staticStories]
    .filter((story) => !shouldNoindexPath(`/${locale}/blog/${story.slug}`))
    .map((story) => {
      const curatedStory = curatedDisplayBySlug.get(story.slug);
      const withCuratedCopy = curatedStory
        ? overlayCuration(
            story,
            curatedStory,
            copy.contentLocale,
            allowLocalizedDisplayCopy,
            copy.topics,
          )
        : story;
      const reviewedCopy =
        copy.contentLocale === "en"
          ? REVIEWED_ARCHIVE_COPY[withCuratedCopy.slug]
          : undefined;

      return reviewedCopy
        ? { ...withCuratedCopy, ...reviewedCopy }
        : withCuratedCopy;
    })
    .sort((a, b) => sortDate(b) - sortDate(a));
  const bySlug = new Map(allStories.map((story) => [story.slug, story]));

  let leadDraft: DraftStory | undefined;
  let editorsDraft: DraftStory[] = [];
  let secondaryDraft: DraftStory[] = [];
  let latestDraft: DraftStory[] = [];
  let deepDraft: DraftStory[] = [];
  let archiveSource: DraftStory[];

  if (!filtered) {
    const claimed = new Set<string>();
    const requestedLead = bySlug.get(curation.lead.slug);
    const curatedLead = requestedLead
      ? overlayCuration(
          requestedLead,
          curation.lead,
          copy.contentLocale,
          allowLocalizedDisplayCopy,
          copy.topics,
        )
      : allStories[0];
    if (curatedLead) claimed.add(curatedLead.slug);
    const curatedEditors = fillGroup(
      curation.editorsPicks,
      5,
      bySlug,
      allStories,
      claimed,
      copy.contentLocale,
      allowLocalizedDisplayCopy,
      copy.topics,
    );
    const curatedSecondary = fillGroup(
      curation.secondary,
      2,
      bySlug,
      allStories,
      claimed,
      copy.contentLocale,
      allowLocalizedDisplayCopy,
      copy.topics,
    );
    const curatedLatest = fillGroup(
      curation.latest,
      6,
      bySlug,
      allStories,
      claimed,
      copy.contentLocale,
      allowLocalizedDisplayCopy,
      copy.topics,
    );
    const curatedDeep = fillGroup(
      curation.deepReads,
      3,
      bySlug,
      allStories,
      claimed,
      copy.contentLocale,
      allowLocalizedDisplayCopy,
      copy.topics,
    );

    if (requestedPage === 1) {
      leadDraft = curatedLead;
      editorsDraft = curatedEditors;
      secondaryDraft = curatedSecondary;
      latestDraft = curatedLatest;
      deepDraft = curatedDeep;
    }

    // On smaller locale corpora the curated shelves already use nearly every
    // story. Keep the complete archive searchable even when that means a card
    // also appears in a curated shelf; larger corpora avoid those duplicates.
    archiveSource =
      allStories.length <= 30
        ? allStories
        : allStories.filter((story) => !claimed.has(story.slug));
  } else {
    archiveSource = allStories;
  }

  if (activeTopic)
    archiveSource = archiveSource.filter(
      (story) => story.topic === activeTopic,
    );
  if (searchQuery) {
    const needle = searchQuery.toLocaleLowerCase(locale);
    archiveSource = archiveSource.filter((story) =>
      [story.title, story.excerpt, story.eyebrow, ...story.tags]
        .join(" ")
        .toLocaleLowerCase(locale)
        .includes(needle),
    );
  }

  const pageCount = Math.max(
    1,
    Math.ceil(archiveSource.length / ARCHIVE_PAGE_SIZE),
  );
  if (requestedPage > pageCount && requestedPage > 1) notFound();
  const currentPage = Math.min(requestedPage, pageCount);
  const archiveDrafts = archiveSource.slice(
    (currentPage - 1) * ARCHIVE_PAGE_SIZE,
    currentPage * ARCHIVE_PAGE_SIZE,
  );
  const visibleDrafts = [
    ...(leadDraft ? [leadDraft] : []),
    ...editorsDraft,
    ...secondaryDraft,
    ...latestDraft,
    ...deepDraft,
    ...archiveDrafts,
  ];
  const readingMinutes = await getPostReadingMinutes(
    visibleDrafts
      .filter((story) => !story.fallbackReadingMinutes)
      .map((story) => story.slug),
    locale,
  );

  const lead = leadDraft ? finalize(leadDraft, readingMinutes) : undefined;
  const editorsPicks = editorsDraft.map((story) =>
    finalize(story, readingMinutes),
  );
  const secondaryStories = secondaryDraft.map((story) =>
    finalize(story, readingMinutes),
  );
  const latestStories = latestDraft.map((story) =>
    finalize(story, readingMinutes),
  );
  const deepReads = deepDraft.map((story) => finalize(story, readingMinutes));
  const archiveStories = archiveDrafts.map((story) =>
    finalize(story, readingMinutes),
  );
  const visibleStoriesWithDuplicates = [
    ...(lead ? [lead] : []),
    ...editorsPicks,
    ...secondaryStories,
    ...latestStories,
    ...deepReads,
    ...archiveStories,
  ];
  const visibleStories = Array.from(
    new Map(
      visibleStoriesWithDuplicates.map((story) => [story.slug, story]),
    ).values(),
  );

  return (
    <>
      <JournalJsonLd
        copy={copy}
        filtered={filtered}
        locale={locale}
        page={currentPage}
        stories={visibleStories}
      />
      <BlogOverviewEditorial
        activeTopic={activeTopic}
        archiveStories={archiveStories}
        copy={copy}
        currentPage={currentPage}
        deepReads={deepReads}
        editorsPicks={editorsPicks}
        labImage={{
          src: "/images/blog/dns-route-check-tool-card-2026-08-17.webp",
          alt: labMediaCopy.alt,
          caption: labMediaCopy.caption,
        }}
        latestStories={latestStories}
        lead={lead}
        locale={locale}
        pageCount={pageCount}
        query={searchQuery}
        secondaryStories={secondaryStories}
        totalResults={archiveSource.length}
      />
    </>
  );
}
