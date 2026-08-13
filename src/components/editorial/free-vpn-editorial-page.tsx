import { ArrowRight, CheckCircle2, ExternalLink, ShieldCheck, TriangleAlert } from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";
import { getVpnAffiliateUrl } from "@/lib/vpn-links";
import { editorialContentBriefs } from "@/lib/editorial-content-briefs";
import { freeVpnCopy, spanishFreeVpnCopy, type FreeVpnCardCopy, type FreeVpnCopy } from "@/components/editorial/free-vpn-copy";

const pageUrl = "https://www.zerotovpn.com/best/free-vpn";
const siteUrl = "https://www.zerotovpn.com";

function FreeTierCard({ rank, name, vpnId, badge, description, limit, bestFor, officialUrl, copy }: FreeVpnCardCopy & { rank: number; copy: FreeVpnCopy }) {
  return (
    <article className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{rank}. {badge ?? "Free tier"}</p><h3 className="mt-2 text-xl font-bold">{name}</h3></div><ShieldCheck className="size-5 text-emerald-600" aria-hidden="true" /></div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <dl className="mt-5 grid gap-3 text-sm"><div className="rounded-lg bg-muted/50 p-3"><dt className="font-semibold">{copy.cardBoundary}</dt><dd className="mt-1 text-muted-foreground">{limit}</dd></div><div className="rounded-lg bg-muted/50 p-3"><dt className="font-semibold">{copy.cardFit}</dt><dd className="mt-1 text-muted-foreground">{bestFor}</dd></div></dl>
      <div className="mt-5 flex flex-wrap items-center gap-3"><AffiliateButton vpnId={vpnId} vpnName={name} affiliateUrl={getVpnAffiliateUrl(vpnId)} size="sm">{copy.cardVisit} {name}</AffiliateButton><a href={officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4">{copy.cardOfficial}<ExternalLink className="size-3.5" aria-hidden="true" /></a></div>
    </article>
  );
}

export function FreeVpnEditorialPage({ locale = "en" }: { locale?: string } = {}) {
  const copy = locale === "fr" ? freeVpnCopy.fr : locale === "es" ? spanishFreeVpnCopy : freeVpnCopy.en;
  const localizedPageUrl = locale === "en" ? pageUrl : `${siteUrl}/${locale}/best/free-vpn`;
  return (
    <>
      <ArticleJsonLd title={copy.jsonLdTitle} description={copy.jsonLdDescription} url={localizedPageUrl} datePublished="2026-01-01" dateModified="2026-08-13" />
      <BreadcrumbSchema items={[{ name: locale === "fr" ? "Meilleurs VPN" : locale === "es" ? "Mejores VPN" : "Best VPNs", href: "/best/best-vpn" }, { name: locale === "fr" ? "VPN gratuits" : locale === "es" ? "VPN gratis" : "Free VPNs", href: "/best/free-vpn" }]} />
      <FAQSchema title={copy.faqSchemaTitle} faqs={copy.faq} />
      <BestVpnEditorialTemplate brief={editorialContentBriefs.freeVpn} navigation={copy.nav}>
        <article>
          <section className="border-b bg-gradient-to-br from-emerald-500/10 via-background to-background py-14 lg:py-20"><div className="container max-w-5xl"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{copy.updated}</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{copy.heroTitle}</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">{copy.heroIntro}</p><p className="mt-5 text-sm leading-6 text-muted-foreground">{copy.disclosure} <Link href="/affiliate-disclosure" className="underline">{locale === "fr" ? "lire notre déclaration" : locale === "es" ? "leer nuestra declaración" : "read our disclosure"}</Link>. {locale === "fr" ? "Les forfaits et politiques des fournisseurs peuvent changer." : locale === "es" ? "Los planes y las políticas de los proveedores pueden cambiar." : "Provider plans and policies can change."}</p></div></div></section>

          <section id="quick-answer" className="container max-w-5xl scroll-mt-24 py-10 lg:py-14"><div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-950"><h2 className="text-2xl font-bold">{copy.quickAnswer}</h2><p className="mt-3 max-w-3xl leading-7">{copy.quickAnswerText}</p></div></section>

          <section id="free-tiers" className="container max-w-5xl scroll-mt-24 py-10 lg:py-14"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{copy.freeTiersLabel}</p><h2 className="mt-3 text-3xl font-bold">{copy.freeTiersTitle}</h2><p className="mt-4 leading-7 text-muted-foreground">{copy.freeTiersIntro}</p></div><div className="mt-7 grid gap-5 lg:grid-cols-3">{copy.cards.map((card, index) => <FreeTierCard key={card.vpnId} rank={index + 1} {...card} copy={copy} />)}</div></section>

          <section id="safety" className="scroll-mt-24 border-y bg-muted/30 py-12 lg:py-16"><div className="container max-w-5xl"><div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{copy.safetyLabel}</p><h2 className="mt-3 text-3xl font-bold">{copy.safetyTitle}</h2><p className="mt-4 leading-7 text-muted-foreground">{copy.safetyIntro}</p></div><ul className="grid gap-3 sm:grid-cols-2">{copy.safetyItems.map((item) => <li key={item} className="flex gap-3 border bg-card p-4 text-sm leading-6"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul></div></div></section>

          <section id="paid-upgrade" className="container max-w-5xl scroll-mt-24 py-12 lg:py-16"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{copy.paidLabel}</p><h2 className="mt-3 text-3xl font-bold">{copy.paidTitle}</h2><p className="mt-4 leading-7 text-muted-foreground">{copy.paidIntro}</p></div><div className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><div className="flex gap-3"><TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" /><p><strong>{copy.restrictedLead}</strong> {copy.restrictedBody} <Link href="/guides/vpn-for-restricted-networks" className="underline">{locale === "fr" ? "guide des réseaux restreints" : locale === "es" ? "guía de redes restringidas" : "restricted-network guide"}</Link>, <Link href="/guides/vpn-obfuscation-explained" className="underline">{locale === "fr" ? "guide de l’obfuscation" : locale === "es" ? "guía de ofuscación" : "obfuscation guide"}</Link> {locale === "fr" ? "et le dossier du pays concerné." : locale === "es" ? "y el dossier del país correspondiente." : "and relevant country dossier."}</p></div><div className="mt-5"><Link href="/best/best-vpn" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold hover:bg-muted">{copy.comparePaid} <ArrowRight className="size-4" aria-hidden="true" /></Link></div></div></div></section>

          <section id="faq" className="container max-w-5xl scroll-mt-24 py-12 lg:py-16"><h2 className="text-3xl font-bold">{copy.faqTitle}</h2><div className="mt-6 divide-y rounded-xl border">{copy.faq.map((item) => <details key={item.question} className="group p-5"><summary className="cursor-pointer pr-8 font-semibold">{item.question}<ArrowRight className="float-right size-4 transition-transform group-open:rotate-90" aria-hidden="true" /></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></section>

          <section id="sources" className="container max-w-5xl scroll-mt-24 border-t py-12 lg:py-16"><h2 className="text-3xl font-bold">{copy.sourcesTitle}</h2><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li><a className="underline" href="https://protonvpn.com/free-vpn/download" target="_blank" rel="noopener noreferrer">{copy.sourceProton}</a></li><li><a className="underline" href="https://windscribe.com/features/windows" target="_blank" rel="noopener noreferrer">{copy.sourceWindscribe}</a></li><li><a className="underline" href="https://www.tunnelbear.com/pricing/" target="_blank" rel="noopener noreferrer">{copy.sourceTunnelBear}</a></li><li>{copy.sourceDataForSeo}</li></ul><p className="mt-6 text-sm leading-6 text-muted-foreground">{copy.continueLead} <Link href="/guides/vpn-for-travel" className="underline">{copy.continueTravel}</Link>, <Link href="/guides/public-wifi-safety" className="underline">{copy.continueWifi}</Link>, <Link href="/guides/vpn-protocols-explained" className="underline">{copy.continueProtocol}</Link> {locale === "fr" ? "ou le" : locale === "es" ? "o la" : "or the"} <Link href="/best/best-vpn" className="underline">{copy.continueBest}</Link>.</p></section>
        </article>
      </BestVpnEditorialTemplate>
    </>
  );
}
