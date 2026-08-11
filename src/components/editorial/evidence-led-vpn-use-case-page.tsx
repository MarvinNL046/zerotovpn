import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Gauge,
  ShieldAlert,
  Smartphone,
} from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQJsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";

type EvidenceCheck = {
  title: string;
  body: string;
};

export type EvidenceMatrixRow = {
  criterion: string;
  status: "Verified" | "Provider-stated" | "Needs test" | "Unknown";
  evidence: string;
};

export type CandidateProvider = {
  name: string;
  slug?: string;
  status: "Dossier available" | "Dossier pending" | "Not assessed";
  body: string;
};

export type RelatedGuide = {
  label: string;
  href: string;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type EvidenceLedVpnUseCasePageProps = {
  locale: string;
  route: string;
  eyebrow: string;
  breadcrumbRoot?: {
    name: string;
    href: string;
  };
  title: string;
  introduction: string;
  status: string;
  failureConditions: readonly string[];
  evidenceChecks: readonly EvidenceCheck[];
  verificationSteps: readonly string[];
  decisionBoundary: string;
  matrixRows?: readonly EvidenceMatrixRow[];
  candidateProviders?: readonly CandidateProvider[];
  relatedGuides?: readonly RelatedGuide[];
  faq?: readonly FaqItem[];
  /** Optional, only pass this when the provider dossier and partner approval are current. */
  featuredOffer?: {
    vpnId: string;
    vpnName: string;
    affiliateUrl: string;
    body: string;
  };
};

const evidenceIcons = [FileSearch, Smartphone, Gauge, ClipboardCheck] as const;

const defaultMatrixRows: readonly EvidenceMatrixRow[] = [
  { criterion: "Current legal and policy context", status: "Needs test", evidence: "Confirm the rule and policy sources for your exact location and purpose." },
  { criterion: "Official app and update path", status: "Needs test", evidence: "Verify distribution, signatures, updates, account recovery, and support access." },
  { criterion: "Network and protocol behavior", status: "Unknown", evidence: "A result is network-, device-, protocol-, server-, and date-specific." },
  { criterion: "Failure and fallback behavior", status: "Needs test", evidence: "Record sleep, Wi-Fi change, reconnect, kill-switch, and fallback behavior." },
];

const statusStyles: Record<EvidenceMatrixRow["status"], string> = {
  Verified: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200",
  "Provider-stated": "bg-sky-100 text-sky-900 dark:bg-sky-950/50 dark:text-sky-200",
  "Needs test": "bg-amber-100 text-amber-950 dark:bg-amber-950/50 dark:text-amber-200",
  Unknown: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
};

export function EvidenceLedVpnUseCasePage({
  locale,
  route,
  eyebrow,
  breadcrumbRoot = { name: "Best VPN guides", href: "/best" },
  title,
  introduction,
  status,
  failureConditions,
  evidenceChecks,
  verificationSteps,
  decisionBoundary,
  matrixRows = defaultMatrixRows,
  candidateProviders = [],
  relatedGuides = [],
  faq = [],
  featuredOffer,
}: EvidenceLedVpnUseCasePageProps) {
  const isEnglish = locale === "en";
  const toc = [
    ["summary", "Quick summary"],
    ["evidence-matrix", "Evidence matrix"],
    ["failure-conditions", "Failure conditions"],
    ["evidence-checklist", "Evidence checklist"],
    ...(candidateProviders.length ? [["provider-dossiers", "Provider dossiers"]] : []),
    ["verification", "How to verify"],
    ...(faq.length ? [["faq", "FAQ"]] : []),
    ...(relatedGuides.length ? [["related-guides", "Related guides"]] : []),
  ] as const;

  return (
    <main className="bg-background text-foreground">
      {faq.length ? <FAQJsonLd faqs={faq.map(item => ({ question: item.question, answer: item.answer }))} /> : null}
      <section className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="container py-14 sm:py-20 lg:py-24">
          <BreadcrumbSchema
            items={[breadcrumbRoot, { name: eyebrow, href: route }]}
            className="mb-8 text-slate-300"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="border-teal-300/30 bg-teal-300/10 text-teal-200">Evidence review in progress</Badge>
            <span className="text-xs text-slate-400">Updated when a retained source changes</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{introduction}</p>
          {!isEnglish ? (
            <p className="mt-6 max-w-3xl border-l-2 border-amber-300 pl-4 text-sm leading-6 text-amber-100">
              This temporary evidence-status page is shown in English. The localized commercial guide remains withheld until its translation and supporting records are reviewed.
            </p>
          ) : null}
        </div>
      </section>

      <div className="container grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-14">
        <div className="min-w-0">
          <nav aria-label="On this page" className="mb-10 border border-border bg-card p-5 lg:hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">On this page</p>
            <ol className="mt-4 grid gap-2 text-sm">
              {toc.map(([id, label], index) => <li key={id}><a className="text-muted-foreground hover:text-foreground hover:underline" href={`#${id}`}><span className="mr-2 font-mono text-xs text-teal-700 dark:text-teal-300">{String(index + 1).padStart(2, "0")}</span>{label}</a></li>)}
            </ol>
          </nav>

          <section id="summary" className="border border-teal-200 bg-teal-50/70 p-6 dark:border-teal-900 dark:bg-teal-950/20 sm:p-8">
            <div className="flex gap-4">
              <ShieldAlert className="mt-1 h-7 w-7 shrink-0 text-teal-800 dark:text-teal-300" aria-hidden="true" />
              <div>
                <h2 className="font-semibold text-teal-950 dark:text-teal-100">Current recommendation status</h2>
                <p className="mt-2 leading-7 text-teal-950/80 dark:text-teal-100/80">{status}</p>
                <Link href="/methodology" className="mt-4 inline-flex items-center gap-2 font-semibold text-teal-900 underline-offset-4 hover:underline dark:text-teal-200">Read our evidence methodology <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            </div>
          </section>

          <section id="evidence-matrix" className="mt-14 scroll-mt-24 lg:mt-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">Comparison without invented scores</p>
            <h2 className="mt-3 text-3xl font-bold">Evidence matrix</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">This table makes the decision inputs visible. Statuses describe the evidence state, not a provider rating or a promise of access.</p>
            <div className="mt-8 overflow-x-auto border border-border">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <caption className="sr-only">Evidence status by decision criterion</caption>
                <thead className="bg-muted/60"><tr><th scope="col" className="sticky left-0 z-10 min-w-48 border-b border-border bg-muted/60 px-4 py-3 font-semibold">Criterion</th><th scope="col" className="min-w-36 border-b border-border px-4 py-3 font-semibold">Evidence status</th><th scope="col" className="min-w-80 border-b border-border px-4 py-3 font-semibold">What to record</th></tr></thead>
                <tbody>{matrixRows.map(row => <tr key={row.criterion} className="border-b border-border last:border-0"><th scope="row" className="sticky left-0 z-[1] bg-background px-4 py-4 font-medium">{row.criterion}</th><td className="px-4 py-4 align-top"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>{row.status}</span></td><td className="px-4 py-4 align-top leading-6 text-muted-foreground">{row.evidence}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section id="failure-conditions" className="mt-14 scroll-mt-24 lg:mt-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">Define the decision first</p>
            <h2 className="mt-3 text-3xl font-bold">Write down the failure conditions</h2>
            <p className="mt-4 leading-7 text-muted-foreground">A provider should leave the shortlist when it fails a requirement that matters on your actual account, device, region, or network. Do this before reading rankings.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">{failureConditions.map(condition => <li key={condition} className="flex gap-3 border border-border bg-card p-5 text-sm leading-6"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700 dark:text-teal-300" aria-hidden="true" /><span>{condition}</span></li>)}</ul>
          </section>

          <section id="evidence-checklist" className="mt-14 scroll-mt-24 border-y bg-muted/30 py-14 lg:mt-20 lg:py-20">
            <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">Evidence checklist</p><h2 className="mt-3 text-3xl font-bold">What to verify before paying</h2><p className="mt-4 leading-7 text-muted-foreground">Treat provider pages as provider-stated evidence. Record the source URL and date, then reproduce the claims that are important to your use case.</p></div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">{evidenceChecks.map((check, index) => { const Icon = evidenceIcons[index % evidenceIcons.length]; return <Card key={check.title} className="rounded-none shadow-none"><CardHeader><Icon className="h-6 w-6 text-teal-800 dark:text-teal-300" aria-hidden="true" /><CardTitle className="pt-3">{check.title}</CardTitle></CardHeader><CardContent className="leading-7 text-muted-foreground">{check.body}</CardContent></Card>; })}</div>
          </section>

          {candidateProviders.length ? <section id="provider-dossiers" className="mt-14 scroll-mt-24 border-y bg-muted/30 py-14 lg:mt-20 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">Provider evidence</p>
            <h2 className="mt-3 text-3xl font-bold">Provider dossiers, not a sponsored ranking</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">These cards show what is ready to verify. A partner CTA is rendered only when a current, approved commercial record resolves server-side.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">{candidateProviders.map(provider => <Card key={provider.name} className="rounded-none shadow-none"><CardHeader><div className="flex items-start justify-between gap-4"><CardTitle>{provider.name}</CardTitle><Badge variant="outline">{provider.status}</Badge></div></CardHeader><CardContent className="space-y-4"><p className="leading-7 text-muted-foreground">{provider.body}</p><div className="flex flex-wrap items-center gap-4">{provider.slug ? <Link href={`/reviews/${provider.slug}`} className="font-semibold text-teal-800 underline-offset-4 hover:underline dark:text-teal-300">Read dossier <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" /></Link> : null}</div></CardContent></Card>)}</div>
          </section> : null}

          <section id="verification" className="mt-14 scroll-mt-24 lg:mt-20">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">Reproducible local check</p><h2 className="mt-3 text-3xl font-bold">Run the test on your setup</h2><p className="mt-4 leading-7 text-muted-foreground">A result from another country, device, protocol, or date does not guarantee yours. Keep a short record so you can compare like with like.</p></div><ol className="space-y-3">{verificationSteps.map((step, index) => <li key={step} className="grid grid-cols-[2.75rem_1fr] gap-4 border border-border p-5"><span className="font-mono text-lg font-semibold text-teal-800 dark:text-teal-300">{String(index + 1).padStart(2, "0")}</span><span className="leading-7">{step}</span></li>)}</ol></div>
          </section>

          {faq.length ? <section id="faq" className="mt-14 scroll-mt-24 lg:mt-20"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">Questions</p><h2 className="mt-3 text-3xl font-bold">FAQ</h2><div className="mt-8 divide-y border-y border-border">{faq.map(item => <details key={item.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-semibold marker:hidden">{item.question}<span className="float-right text-teal-700 transition group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></section> : null}

          {relatedGuides.length ? <section id="related-guides" className="mt-14 scroll-mt-24 lg:mt-20"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">Continue researching</p><h2 className="mt-3 text-3xl font-bold">Related guides</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{relatedGuides.map(guide => <Link key={guide.href} href={guide.href} className="border border-border p-5 transition hover:border-teal-500 hover:bg-teal-50/50 dark:hover:bg-teal-950/20"><span className="font-semibold">{guide.label}</span><span className="mt-2 block text-sm leading-6 text-muted-foreground">{guide.body}</span></Link>)}</div></section> : null}

          <section className="mt-14 border-y bg-slate-950 text-slate-100 lg:mt-20"><div className="grid gap-8 px-6 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:py-14"><div className="max-w-3xl"><h2 className="text-2xl font-bold">Decision boundary</h2><p className="mt-4 leading-7 text-slate-300">{decisionBoundary}</p></div><Link href="/tools/vpn-choice-helper" className="inline-flex min-h-11 items-center justify-center gap-2 bg-teal-300 px-5 py-3 font-semibold text-slate-950 hover:bg-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200">Build my verification checklist <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></section>
        </div>

        <aside className="hidden lg:block"><div className="sticky top-24 space-y-5"><nav aria-label="On this page" className="border border-border bg-card p-5"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">On this page</p><ol className="mt-4 grid gap-3 text-sm">{toc.map(([id, label], index) => <li key={id}><a className="text-muted-foreground hover:text-foreground hover:underline" href={`#${id}`}><span className="mr-2 font-mono text-xs text-teal-700 dark:text-teal-300">{String(index + 1).padStart(2, "0")}</span>{label}</a></li>)}</ol></nav><div className="border border-teal-300 bg-teal-50 p-5 dark:border-teal-900 dark:bg-teal-950/30"><p className="text-sm font-semibold text-teal-950 dark:text-teal-100">Need a decision?</p><p className="mt-2 text-sm leading-6 text-teal-950/75 dark:text-teal-100/75">Use the checklist to turn unknowns into a bounded test before you subscribe.</p><Link href="/tools/vpn-choice-helper" className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">Open choice helper <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>{featuredOffer ? <div className="border border-amber-300 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-900 dark:text-amber-200">Approved partner offer</p><p className="mt-2 font-semibold">{featuredOffer.vpnName}</p><p className="mt-2 text-sm leading-6 text-amber-950/75 dark:text-amber-100/75">{featuredOffer.body}</p><AffiliateButton vpnId={featuredOffer.vpnId} vpnName={featuredOffer.vpnName} affiliateUrl={featuredOffer.affiliateUrl} size="sm" className="mt-4 w-full" /></div> : null}</div></aside>
      </div>

      <section className="container pb-10 text-sm text-muted-foreground"><p className="max-w-4xl leading-6">ZeroToVPN is not currently publishing a provider ranking on this page because the retained evidence does not support one. No affiliate link is shown here; provider names are research context only. Read the <Link href="/methodology" className="font-semibold text-teal-800 underline-offset-4 hover:underline dark:text-teal-300">research methodology</Link> and <Link href="/affiliate-disclosure" className="font-semibold text-teal-800 underline-offset-4 hover:underline dark:text-teal-300">affiliate disclosure</Link>, then verify legal, contractual, privacy, and service-availability requirements for your situation.</p></section>
    </main>
  );
}
