import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  FlaskConical,
  Gauge,
  Globe2,
  Laptop2,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { VpnData } from "@/lib/vpn-data-layer";
import type { HomepageEditorialCopy } from "@/data/homepage";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { ZeroToVpnMark } from "@/components/brand/zerotovpn-logo";
import { isIndexableReviewRoute } from "@/lib/review-route-policy";

interface EditorialHomepageProps {
  currentReview: string;
  featuredVpns: VpnData[];
  copy: HomepageEditorialCopy;
  locale: "en" | "nl";
}

const supportingMeta = [
  {
    href: "/guides/vpn-speed-guide",
    image: "/images/home/streaming.webp",
  },
  {
    href: "/reviews/nordvpn",
    image: "/affiliate/nordvpn/editorial/homepage-multiple-devices-us.webp",
    providerSupplied: true,
  },
  {
    href: "/compare/nordvpn-vs-surfshark",
    comparison: true,
  },
] as const;

const trendingMeta = [
  {
    href: "/blog/best-vpn-for-iran-2026-bypass-internet-censorship",
    image: "/images/home/iran-tehran-editorial-card-v2.webp",
  },
  { href: "/guides/vpn-privacy-guide", image: "/images/home/privacy.webp" },
  { href: "/quiz", image: "/images/home/travel.webp" },
  { href: "/reviews", image: "/images/home/devices.webp" },
  {
    href: "/guides/vpn-speed-guide",
    image: "/images/home/field-test-speed-thumb.webp",
  },
] as const;

const useCaseMeta = [
  {
    href: "/guides/vpn-speed-guide",
    image: "/images/home/streaming.webp",
    icon: MonitorPlay,
  },
  {
    href: "/guides/vpn-privacy-guide",
    image: "/images/home/privacy.webp",
    icon: ShieldCheck,
  },
  {
    href: "/quiz",
    image: "/images/home/travel.webp",
    icon: Globe2,
  },
  {
    href: "/reviews",
    image: "/images/home/devices.webp",
    icon: Laptop2,
  },
] as const;

const latestMeta = [
  {
    href: "/guides/what-is-vpn",
    image: "/images/home/devices.webp",
  },
  {
    href: "/countries/netherlands",
    image: "/images/home/travel.webp",
  },
  {
    href: "/guides/vpn-privacy-guide",
    image: "/images/home/privacy.webp",
  },
  {
    href: "/guides/vpn-speed-guide",
    image: "/images/home/field-test-speed-thumb.webp",
  },
] as const;

const toolMeta = [
  {
    href: "/tools/what-is-my-ip",
    icon: Globe2,
    tone: "from-[#dff8fb] to-[#eefbfc]",
    iconTone: "bg-[#19c3d8] text-[#071226]",
  },
  {
    href: "/tools/dns-leak-test",
    icon: ShieldCheck,
    tone: "from-[#eff8d8] to-[#f8fde9]",
    iconTone: "bg-[#b8e34a] text-[#071226]",
  },
  {
    href: "/speed-test",
    icon: Gauge,
    tone: "from-[#e7efff] to-[#f3f6ff]",
    iconTone: "bg-[#2563eb] text-white",
  },
  {
    href: "/reports",
    icon: FlaskConical,
    tone: "from-[#eee9ff] to-[#f8f6ff]",
    iconTone: "bg-[#7c3aed] text-white",
  },
] as const;

function EditorialLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] ${
        dark ? "text-[#b8e34a]" : "text-[#1464e8] dark:text-[#66d9ef]"
      }`}
    >
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 md:mb-9 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1 w-10 rounded-full bg-[#b8e34a]"
          />
          <EditorialLabel>{eyebrow}</EditorialLabel>
        </div>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#0b1736] dark:text-white md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function ComparisonArtwork() {
  return (
    <div className="relative flex h-full min-h-36 items-center justify-center overflow-hidden bg-[linear-gradient(125deg,#0b1736_0%,#123368_48%,#eff6ff_48%,#f8fafc_100%)]">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/95 p-3 shadow-xl">
          <Image
            src="/logos/nordvpn.svg"
            alt=""
            width={62}
            height={38}
            className="h-auto w-full"
          />
        </div>
        <span className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0b1736] bg-white text-xs font-black text-[#0b1736] shadow-lg">
          VS
        </span>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-white p-3 shadow-xl">
          <Image
            src="/logos/surfshark.svg"
            alt=""
            width={62}
            height={38}
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

function SupportingStoryCard({
  index,
  copy,
}: {
  index: number;
  copy: HomepageEditorialCopy;
}) {
  const meta = supportingMeta[index];
  const story = copy.supportingStories[index];

  return (
    <Link
      href={meta.href}
      className="group relative min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[#0d1b34]"
    >
      <div className="relative aspect-[16/8.5] overflow-hidden">
        {"comparison" in meta ? (
          <ComparisonArtwork />
        ) : (
          <Image
            src={meta.image}
            alt=""
            fill
            loading={index === 0 ? "eager" : undefined}
            sizes="(max-width: 1024px) 50vw, 260px"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        )}
        {"providerSupplied" in meta && meta.providerSupplied ? (
          <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[9px] font-semibold text-white backdrop-blur-sm">
            {copy.providerSuppliedLabel}
          </span>
        ) : null}
      </div>
      <div className="p-4">
        <EditorialLabel>{story.eyebrow}</EditorialLabel>
        <h3 className="mt-1.5 text-lg font-extrabold leading-tight tracking-tight text-[#0b1736] transition-colors group-hover:text-[#1464e8] dark:text-white">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
          {story.description}
        </p>
      </div>
    </Link>
  );
}

function EditorialMosaic({
  copy,
  currentReview,
}: {
  copy: HomepageEditorialCopy;
  currentReview: string;
}) {
  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-10">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="order-3 grid gap-4 sm:grid-cols-3 lg:order-1 lg:col-span-3 lg:grid-cols-1">
          {copy.supportingStories.map((_, index) => (
            <SupportingStoryCard
              key={supportingMeta[index].href}
              index={index}
              copy={copy}
            />
          ))}
        </div>

        <Link
          href="/best/best-vpn"
          className="group relative order-1 min-h-[480px] overflow-hidden rounded-2xl bg-[#071226] shadow-[0_18px_48px_rgba(6,18,42,0.24)] lg:order-2 lg:col-span-6 lg:min-h-[690px]"
        >
          <Image
            src="/images/home/field-test-lab.webp"
            alt=""
            fill
            priority
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,28,0.04)_18%,rgba(4,12,28,0.92)_83%,#040c1c_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
            <span className="inline-flex rounded-md bg-[#b8e34a] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#0b1736]">
              {copy.lead.eyebrow}
            </span>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {copy.lead.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
              {copy.lead.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#66d9ef]">
              {copy.lead.cta}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </div>
        </Link>

        <aside className="order-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#0d1b34] lg:order-3 lg:col-span-3 lg:p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-[#0b1736] dark:text-white">
              {copy.trendingTitle}
            </h2>
            <Clock3 className="h-4 w-4 text-[#1464e8]" />
          </div>
          <ol className="divide-y divide-slate-200 dark:divide-white/10">
            {copy.trending.map((story, index) => {
              const meta = trendingMeta[index];
              return (
                <li key={meta.href}>
                  <Link
                    href={meta.href}
                    className="group grid grid-cols-[34px_1fr_72px] items-center gap-3 py-4"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1464e8] text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#1464e8] dark:text-[#66d9ef]">
                        {story.eyebrow}
                      </span>
                      <span className="mt-1 block text-sm font-bold leading-[1.18] text-[#172033] transition-colors group-hover:text-[#1464e8] dark:text-slate-100">
                        {story.title}
                      </span>
                    </span>
                    <span className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={meta.image}
                        alt=""
                        fill
                        sizes="72px"
                        className="object-cover transition group-hover:scale-105"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 rounded-xl bg-[#eff6ff] p-4 text-xs leading-5 text-slate-600 dark:bg-white/5 dark:text-slate-300">
            <strong className="block text-[#0b1736] dark:text-white">
              {copy.freshness.updated}: {currentReview}
            </strong>
            <span>{copy.freshness.methodology}</span>
          </div>
        </aside>
      </div>

      <div className="mt-4 flex flex-col gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2 font-semibold text-[#0b1736] dark:text-white">
          <ShieldCheck className="h-4 w-4 text-[#16a36a]" />{" "}
          {copy.freshness.methodology}
        </span>
        <span>{copy.freshness.disclosure}</span>
      </div>
    </section>
  );
}

function UseCaseStrip({ copy }: { copy: HomepageEditorialCopy }) {
  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center gap-4">
        <h2 className="text-xl font-black uppercase tracking-[-0.02em] text-[#0b1736] dark:text-white sm:text-2xl">
          {copy.useCasesTitle}
        </h2>
        <span className="h-px flex-1 bg-slate-300 dark:bg-white/15" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {copy.useCases.map((item, index) => {
          const meta = useCaseMeta[index];
          const Icon = meta.icon;
          return (
            <Link
              key={meta.href}
              href={meta.href}
              className="group relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#071226] shadow-lg"
            >
              <Image
                src={meta.image}
                alt=""
                fill
                loading={index === 0 ? "eager" : undefined}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06112a]/95 via-[#06112a]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                <span>
                  <span className="flex items-center gap-2 text-xl font-black">
                    <Icon className="h-5 w-5 text-[#b8e34a]" /> {item.label}
                  </span>
                  <span className="mt-1 block text-xs text-slate-200">
                    {item.description}
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 bg-black/20 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function getPickDetail(copy: HomepageEditorialCopy, slug: string) {
  return (
    copy.picks.providerDetails[slug] ?? {
      bestFor: "A specific set of needs",
      strength: "Open the full review for the current evidence.",
      limitation: "Confirm current terms and test conditions before choosing.",
    }
  );
}

function CompactPickCard({
  vpn,
  copy,
  locale,
}: {
  vpn: VpnData;
  copy: HomepageEditorialCopy;
  locale: "en" | "nl";
}) {
  const detail = getPickDetail(copy, vpn.slug);
  const hasIndexableReview = isIndexableReviewRoute(vpn.slug, locale);

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#0d1b34]">
      <div className="flex items-start justify-between border-b border-slate-200 p-5 dark:border-white/10">
        <div className="flex min-h-12 items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b8e34a] text-[#0b1736]">
            <Check className="h-5 w-5" aria-hidden="true" />
          </span>
          {vpn.logo ? (
            <Image
              src={vpn.logo}
              alt={`${vpn.name} logo`}
              width={118}
              height={42}
              className="h-9 w-auto max-w-[130px] object-contain"
            />
          ) : (
            <strong>{vpn.name}</strong>
          )}
        </div>
        <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-black text-[#1464e8] dark:bg-[#1464e8]/15 dark:text-[#66d9ef]">
          {copy.picks.score}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          {copy.picks.bestFor}
        </p>
        <h3 className="mt-1 text-xl font-black tracking-tight text-[#0b1736] dark:text-white">
          {detail.bestFor}
        </h3>

        <div className="mt-5 space-y-4 text-sm leading-6">
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
              <Check className="h-3.5 w-3.5" />
            </span>
            <p>
              <strong className="block text-[#0b1736] dark:text-white">
                {copy.picks.strength}
              </strong>
              <span className="text-slate-600 dark:text-slate-300">
                {detail.strength}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">
              !
            </span>
            <p>
              <strong className="block text-[#0b1736] dark:text-white">
                {copy.picks.limitation}
              </strong>
              <span className="text-slate-600 dark:text-slate-300">
                {detail.limitation}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {hasIndexableReview ? (
            <Link
              href={`/reviews/${vpn.slug}`}
              className="inline-flex items-center gap-1 text-sm font-extrabold text-[#1464e8] hover:underline dark:text-[#66d9ef]"
            >
              {copy.picks.review} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}
          {vpn.affiliateUrl ? (
            <AffiliateButton
              vpnId={vpn.id}
              vpnName={vpn.name}
              affiliateUrl={vpn.affiliateUrl}
              size="sm"
              className="ml-auto bg-[#1464e8] text-white hover:bg-[#0f55c8]"
            >
              {copy.picks.visit} <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </AffiliateButton>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function TopPicks({
  vpns,
  copy,
  locale,
}: {
  vpns: VpnData[];
  copy: HomepageEditorialCopy;
  locale: "en" | "nl";
}) {
  return (
    <section
      id="top-picks"
      className="border-y border-slate-200 bg-[#f1f3f5] py-16 dark:border-white/10 dark:bg-[#09162c] lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.picks.eyebrow}
          title={copy.picks.title}
          description={copy.picks.subtitle}
          action={
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1464e8] hover:underline dark:text-[#66d9ef]"
            >
              {copy.picks.methodology}
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <p className="mb-5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {copy.picks.disclosure}
        </p>
        <div className="grid gap-5 lg:grid-cols-3">
          {vpns.slice(0, 3).map((vpn) => (
            <CompactPickCard
              key={vpn.id}
              vpn={vpn}
              copy={copy}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection({
  vpns,
  copy,
  locale,
}: {
  vpns: VpnData[];
  copy: HomepageEditorialCopy;
  locale: "en" | "nl";
}) {
  return (
    <section id="comparison" className="py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.comparison.eyebrow}
          title={copy.comparison.title}
          description={copy.comparison.subtitle}
        />

        <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#0d1b34] md:block">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">{copy.comparison.caption}</caption>
            <thead className="bg-[#0b1736] text-xs uppercase tracking-[0.08em] text-slate-200">
              <tr>
                {[
                  copy.comparison.headers.provider,
                  copy.comparison.headers.fit,
                  copy.comparison.headers.action,
                ].map((header) => (
                  <th key={header} scope="col" className="px-5 py-4 font-bold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {vpns.map((vpn) => {
                const hasIndexableReview = isIndexableReviewRoute(
                  vpn.slug,
                  locale,
                );
                return (
                  <tr
                    key={vpn.id}
                    className="transition-colors hover:bg-[#eff6ff] dark:hover:bg-white/5"
                  >
                    <th scope="row" className="px-5 py-4">
                      <div className="flex items-center gap-3 font-black text-[#0b1736] dark:text-white">
                        {vpn.logo ? (
                          <Image
                            src={vpn.logo}
                            alt=""
                            width={88}
                            height={30}
                            className="h-7 w-auto max-w-[96px] object-contain"
                          />
                        ) : (
                          vpn.name
                        )}
                      </div>
                    </th>
                    <td className="max-w-[220px] px-5 py-4 text-slate-600 dark:text-slate-300">
                      {copy.comparison.fit[vpn.slug] ?? "Open the full review"}
                    </td>
                    <td className="px-5 py-4">
                      {hasIndexableReview ? (
                        <Link
                          href={`/reviews/${vpn.slug}`}
                          className="inline-flex items-center gap-1 font-extrabold text-[#1464e8] hover:underline dark:text-[#66d9ef]"
                        >
                          {copy.picks.review}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {copy.picks.score}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 md:hidden">
          {vpns.slice(0, 3).map((vpn) => (
            <article
              key={vpn.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0d1b34]"
            >
              <div className="flex items-center gap-4">
                {vpn.logo ? (
                  <Image
                    src={vpn.logo}
                    alt={`${vpn.name} logo`}
                    width={104}
                    height={36}
                    className="h-8 w-auto max-w-[120px] object-contain"
                  />
                ) : (
                  <strong>{vpn.name}</strong>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {copy.comparison.fit[vpn.slug] ?? copy.comparison.subtitle}
              </p>
              {isIndexableReviewRoute(vpn.slug, locale) ? (
                <Link
                  href={`/reviews/${vpn.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-[#1464e8] dark:text-[#66d9ef]"
                >
                  {copy.picks.review}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {copy.picks.score}
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologyPanel({
  copy,
  providerCount,
}: {
  copy: HomepageEditorialCopy;
  providerCount: number;
}) {
  const stats = [
    {
      value: providerCount.toString(),
      label: copy.methodology.featuredProviders,
    },
    { value: "3", label: copy.methodology.scoreFactors },
    { value: "0", label: copy.methodology.commissionWeight },
  ];
  const evidenceLayers = [
    copy.methodology.weights.logging,
    copy.methodology.weights.audit,
    copy.methodology.weights.speed,
  ];

  return (
    <section className="bg-[#071226] py-16 text-white lg:py-20">
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <EditorialLabel dark>
            <FlaskConical className="h-3.5 w-3.5" />
            {copy.methodology.eyebrow}
          </EditorialLabel>
          <h2 className="mt-3 max-w-xl text-4xl font-black leading-[1.04] tracking-[-0.04em] lg:text-5xl">
            {copy.methodology.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            {copy.methodology.description}
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`rounded-xl border p-4 ${
                  index === 0 || index === 2
                    ? "border-[#b8e34a]/35 bg-[#b8e34a]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div
                  className={`text-2xl font-black sm:text-3xl ${index === 0 || index === 2 ? "text-[#b8e34a]" : "text-[#66d9ef]"}`}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] leading-4 text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1464e8] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#0f55c8]"
            >
              {copy.methodology.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-extrabold text-white hover:bg-white/5"
            >
              {copy.methodology.howWeTest}
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d1b34] p-5 shadow-2xl sm:p-7">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <h3 className="text-lg font-black">
              {copy.methodology.chartTitle}
            </h3>
            <span className="rounded-full bg-[#b8e34a]/15 px-3 py-1 text-xs font-bold text-[#b8e34a]">
              {copy.methodology.published}
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {evidenceLayers.map((label, index) => (
              <div
                key={label}
                className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b8e34a] font-black text-[#071226]">
                  {index + 1}
                </span>
                <span className="font-semibold text-slate-100">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl bg-white/5 p-4 text-xs leading-5 text-slate-300">
            {copy.methodology.chartNote}
          </p>
        </div>
      </div>
    </section>
  );
}

function LatestResearch({ copy }: { copy: HomepageEditorialCopy }) {
  const lead = copy.latest.items[0];
  const leadMeta = latestMeta[0];

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.latest.eyebrow}
          title={copy.latest.title}
          action={
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1464e8] hover:underline dark:text-[#66d9ef]"
            >
              {copy.latest.all}
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="homepage-latest-grid grid gap-5">
          <Link
            href={leadMeta.href}
            className="homepage-latest-lead group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 dark:border-white/10 dark:bg-[#0d1b34]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src={leadMeta.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-8">
              <EditorialLabel>{lead.eyebrow}</EditorialLabel>
              <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight text-[#0b1736] transition-colors group-hover:text-[#1464e8] dark:text-white dark:group-hover:text-[#66d9ef] sm:text-3xl">
                {lead.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                {lead.description}
              </p>
            </div>
          </Link>

          {copy.latest.items.slice(1).map((item, itemIndex) => {
            const meta = latestMeta[itemIndex + 1];
            return (
              <Link
                key={meta.href}
                href={meta.href}
                className="homepage-latest-secondary group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 dark:border-white/10 dark:bg-[#0d1b34]"
              >
                <div className="homepage-latest-secondary-media relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image
                    src={meta.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 180px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <EditorialLabel>{item.eyebrow}</EditorialLabel>
                  <h3 className="mt-2 text-lg font-black leading-tight tracking-tight text-[#0b1736] transition-colors group-hover:text-[#1464e8] dark:text-white dark:group-hover:text-[#66d9ef]">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinderAndTools({ copy }: { copy: HomepageEditorialCopy }) {
  const routeIcons = [ShieldCheck, MonitorPlay, Globe2] as const;

  return (
    <section className="border-y border-slate-200 bg-[#eef2f6] py-16 dark:border-white/10 dark:bg-[#09162c] lg:py-20">
      <div className="mx-auto grid w-full max-w-[1500px] gap-5 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#0b1736] p-7 text-white shadow-2xl sm:p-10">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#1464e8]/30 blur-3xl" />
          <div className="relative">
            <EditorialLabel dark>
              <Sparkles className="h-3.5 w-3.5" />
              {copy.finder.eyebrow}
            </EditorialLabel>
            <h2 className="mt-3 max-w-xl text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              {copy.finder.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              {copy.finder.description}
            </p>
            <div className="relative mt-8 grid grid-cols-3 gap-3">
              <span
                aria-hidden="true"
                className="absolute left-[16%] right-[16%] top-6 h-px bg-gradient-to-r from-[#b8e34a] via-[#19c3d8] to-[#66d9ef]"
              />
              {copy.finder.tags.slice(0, 3).map((label, index) => {
                const Icon = routeIcons[index];
                return (
                  <div
                    key={label}
                    className="relative flex min-w-0 flex-col items-center text-center"
                  >
                    <span
                      className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#0b1736] shadow-lg ${index === 0 ? "bg-[#b8e34a] text-[#071226]" : index === 1 ? "bg-[#19c3d8] text-[#071226]" : "bg-white text-[#1464e8]"}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="mt-2 line-clamp-2 text-[11px] font-bold leading-4 text-slate-200">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-200">
              {copy.finder.tags.slice(3).map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-2"
                >
                  {label}
                </span>
              ))}
            </div>
            <Link
              href="/quiz"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#b8e34a] px-5 py-3 text-sm font-black text-[#0b1736] hover:bg-[#c8ee67]"
            >
              {copy.finder.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-xs text-slate-400">{copy.finder.note}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_32px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#0d1b34] sm:p-9">
          <EditorialLabel>{copy.tools.eyebrow}</EditorialLabel>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0b1736] dark:text-white">
            {copy.tools.title}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {copy.tools.items.map((label, index) => {
              const meta = toolMeta[index];
              const Icon = meta.icon;
              return (
                <Link
                  key={meta.href}
                  href={meta.href}
                  className={`group relative min-h-32 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br p-5 transition hover:-translate-y-1 hover:border-[#1464e8] hover:shadow-lg dark:border-white/10 dark:from-white/5 dark:to-white/[0.02] ${meta.tone}`}
                >
                  <span className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-white/70 blur-2xl dark:bg-[#1464e8]/10" />
                  <span
                    className={`relative flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${meta.iconTone}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="relative mt-4 flex items-end gap-3">
                    <span className="font-extrabold leading-tight text-[#0b1736] dark:text-white">
                      {label}
                    </span>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterAndFaq({ copy }: { copy: HomepageEditorialCopy }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1320px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="relative self-start overflow-hidden rounded-2xl border-t-4 border-[#b8e34a] bg-[#0b1736] p-7 text-white shadow-xl sm:p-9">
          <ZeroToVpnMark className="pointer-events-none absolute -right-12 -top-8 h-56 w-56 rotate-6 opacity-20" />
          <div className="relative z-10">
            <EditorialLabel dark>{copy.newsletter.eyebrow}</EditorialLabel>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">
              {copy.newsletter.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {copy.newsletter.description}
            </p>
            <NewsletterForm
              variant="compact"
              source="homepage-redesign"
              className="mt-6"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#0d1b34] sm:p-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <h2 className="mb-6 text-2xl font-bold">{copy.faqTitle}</h2>
          <div className="divide-y divide-slate-200 dark:divide-white/10">
            {copy.faqs.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold marker:hidden">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="text-xl text-[#1464e8] transition-transform group-open:rotate-45 dark:text-[#66d9ef]"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 pr-8 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialHomepage({
  currentReview,
  featuredVpns,
  copy,
  locale,
}: EditorialHomepageProps) {
  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#172033] dark:bg-[#071226] dark:text-slate-100">
      <EditorialMosaic copy={copy} currentReview={currentReview} />
      <UseCaseStrip copy={copy} />
      <TopPicks vpns={featuredVpns} copy={copy} locale={locale} />
      <ComparisonSection vpns={featuredVpns} copy={copy} locale={locale} />
      <MethodologyPanel copy={copy} providerCount={featuredVpns.length} />
      <LatestResearch copy={copy} />
      <FinderAndTools copy={copy} />
      <NewsletterAndFaq copy={copy} />
    </div>
  );
}
