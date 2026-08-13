import { ArrowRight, Check, ExternalLink, ShieldCheck, Sparkles, Trophy, X } from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";
import type { EditorialContentBrief } from "@/lib/editorial-content-brief";
import type { VpnData } from "@/lib/vpn-data-layer";

export const frenchBestVpnTitle = "Meilleur VPN en 2026 : comparatif transparent et vérifiable";
export const frenchBestVpnDescription = "Comparez les VPN selon la confidentialité, le streaming, le prix et les appareils. Vérifiez les conditions actuelles et les limites avant de vous abonner.";

const brief = {
  primaryKeyword: "meilleur vpn",
  intent: "commercial",
  cluster: "commercial-choice",
  lastReviewedAt: "2026-08-13",
  evidence: ["docs/research/dataforseo-french-best-vpn-cluster-2026-08-13.md", "/methodology", "/editorial-policy"],
  affiliateContext: "vpn-selection",
  schemaType: "CollectionPage",
} satisfies EditorialContentBrief;

const faq = [
  { question: "Quel est le meilleur VPN en 2026 ?", answer: "Il n'existe pas un meilleur VPN pour chaque appareil, réseau ou usage. Utilisez cette sélection comme point de départ, puis vérifiez le forfait, les protocoles, les preuves de confidentialité et le service que vous devez protéger ou accéder." },
  { question: "Comment choisir un VPN fiable ?", answer: "Comparez la politique de confidentialité, les conditions de renouvellement, les plateformes prises en charge, la fenêtre de remboursement et les résultats de tests documentés. Un lien affilié ne détermine pas notre ordre de présentation." },
  { question: "Un VPN fonctionne-t-il toujours avec Netflix ?", answer: "Les plateformes détectent et bloquent régulièrement des adresses VPN. Testez le service, le pays et l'appareil exacts qui vous intéressent ; un résultat positif un jour ne constitue pas une garantie permanente." },
  { question: "Un VPN rend-il anonyme ?", answer: "Non. Il peut réduire ce que votre fournisseur d'accès voit sur le réseau, mais les comptes, cookies, paiements et signaux de l'appareil peuvent encore vous identifier. Un VPN ne remplace pas la sécurité des comptes." },
  { question: "Les prix affichés sont-ils garantis ?", answer: "Non. Les prix sont des instantanés du catalogue avec une date de vérification lorsque cette donnée est disponible. Vérifiez la devise, la durée, le renouvellement et le remboursement sur la page officielle avant de payer." },
  { question: "Que faut-il tester avant de s'abonner ?", answer: "Notez l'appareil, le système, le réseau, le protocole, la région du serveur et la date. Testez les services importants, puis répétez après une reconnexion ou un changement Wi-Fi/4G." },
];

const nav = [
  { href: "#quick-picks", label: "Top 3" },
  { href: "#rankings", label: "Fiches" },
  { href: "#comparison", label: "Comparer" },
  { href: "#methodology", label: "Méthode" },
  { href: "#faq", label: "FAQ" },
  { href: "#sources", label: "Sources" },
] as const;

const descriptions: Record<string, { label: string; text: string; tone: "gold" | "green" | "blue" }> = {
  nordvpn: { label: "Point de départ polyvalent", text: "À évaluer pour un usage quotidien lorsque les appareils, le prix et les fonctions documentées correspondent à votre configuration.", tone: "gold" },
  surfshark: { label: "Comparaison appareils et budget", text: "À comparer lorsque le nombre d'appareils et le coût d'entrée comptent davantage que le classement général.", tone: "green" },
  expressvpn: { label: "Comparaison simplicité", text: "À vérifier si la simplicité de l'application et la couverture de vos appareils sont prioritaires.", tone: "blue" },
};

function money(value: number | undefined) {
  return typeof value === "number" ? `${value.toFixed(2)} $` : "—";
}

function verified(vpn: VpnData) {
  return "priceLastVerified" in vpn && typeof vpn.priceLastVerified === "string" ? vpn.priceLastVerified : "date non enregistrée";
}

export function FrenchBestVpnPillarPage({ vpns }: { vpns: VpnData[] }) {
  const ordered = ["nordvpn", "surfshark", "expressvpn"].map((slug) => vpns.find((vpn) => vpn.slug === slug)).filter((vpn): vpn is VpnData => Boolean(vpn));
  const ranked = vpns.filter((vpn) => vpn.featured).slice(0, 5);

  return <>
    <ArticleJsonLd title={frenchBestVpnTitle} description={frenchBestVpnDescription} url="https://www.zerotovpn.com/fr/best/best-vpn" datePublished="2026-01-01" dateModified="2026-08-13" />
    <BreadcrumbSchema items={[{ name: "Meilleurs VPN", href: "/fr/best/best-vpn" }]} />
    <FAQSchema title="FAQ meilleur VPN" faqs={faq} />
    <BestVpnEditorialTemplate navigation={nav} brief={brief}>
      <article>
        <section className="border-b bg-gradient-to-br from-primary/10 via-background to-background py-14 lg:py-20"><div className="container max-w-6xl"><div className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Mis à jour le 13 août 2026 · comparatif indépendant</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{frenchBestVpnTitle}</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">Cette sélection vous aide à choisir un point de départ. Vérifiez ensuite le forfait, le protocole et les conditions qui correspondent à votre appareil et à votre réseau. Nous séparons les informations du fournisseur, les données de catalogue et les tests reproductibles.</p><p className="mt-5 text-sm leading-6 text-muted-foreground">Les liens affiliés peuvent nous rémunérer, sans influencer le classement. <Link href="/fr/affiliate-disclosure" className="underline">Lire la transparence</Link>. Les prix et fonctions peuvent changer.</p></div></div></section>

        <section id="quick-picks" className="container max-w-6xl scroll-mt-24 py-12 lg:py-16"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Top 3 en bref</p><h2 className="mt-3 text-3xl font-bold">Commencez par l’usage qui vous concerne</h2><p className="mt-4 leading-7 text-muted-foreground">Ces fiches donnent un contexte de prix et un accès direct, mais ne promettent pas le même résultat sur tous les réseaux.</p></div><div className="mt-8 grid gap-5 md:grid-cols-3">{ordered.map((vpn, index) => { const copy = descriptions[vpn.slug] ?? descriptions.nordvpn; const price = vpn.priceTwoYear ?? vpn.priceYearly; return <article key={vpn.slug} className="rounded-2xl border bg-card p-6 shadow-sm"><div className="flex items-center gap-2 text-sm font-semibold text-primary">{index === 0 ? <Trophy className="size-4" aria-hidden="true" /> : index === 1 ? <Sparkles className="size-4" aria-hidden="true" /> : <ShieldCheck className="size-4" aria-hidden="true" />}{copy.label}</div><h3 className="mt-4 text-2xl font-bold">{vpn.name}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{copy.text}</p><p className="mt-4 text-2xl font-bold text-primary"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl}>{money(price)}</AffiliateTextLink><span className="ml-1 text-sm font-normal text-muted-foreground">/mois équivalent</span></p><p className="mt-2 text-xs text-muted-foreground">Prix vérifié : {verified(vpn)} · vérifiez le panier</p><AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="mt-5 w-full">Voir l’offre {vpn.name}</AffiliateButton><Link href={`/fr/reviews/${vpn.slug}`} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold hover:bg-muted">Lire la fiche <ArrowRight className="size-4" aria-hidden="true" /></Link></article>; })}</div></section>

        <section id="rankings" className="scroll-mt-24 border-y bg-muted/20 py-12 lg:py-16"><div className="container max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Fiches fournisseurs</p><h2 className="mt-3 text-3xl font-bold">Ce qu’il faut vérifier avant de souscrire</h2><div className="mt-8 space-y-6">{ranked.map((vpn, index) => <section key={vpn.slug} className="rounded-2xl border bg-card p-6 lg:p-8"><div className="grid gap-8 lg:grid-cols-[1fr_18rem]"><div><div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">#{index + 1}</span><h3 className="text-2xl font-bold"><Link href={`/fr/reviews/${vpn.slug}`} className="hover:text-primary">{vpn.name}</Link></h3></div><p className="mt-4 leading-7 text-muted-foreground">{descriptions[vpn.slug]?.text ?? "Comparez ses fonctions documentées et testez les services importants sur votre réseau."}</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{vpn.pros.slice(0, 2).map((pro) => <p key={pro} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />{pro}</p>)}{vpn.cons.slice(0, 1).map((con) => <p key={con} className="flex gap-2 text-sm text-muted-foreground"><X className="mt-0.5 size-4 shrink-0 text-rose-600" aria-hidden="true" />Point à vérifier : {con}</p>)}</div></div><div className="border-t pt-5 lg:border-l lg:border-t-0 lg:pl-6"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">À partir de</p><p className="mt-1 text-3xl font-bold text-primary"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl}>{money(vpn.priceTwoYear ?? vpn.priceYearly)}</AffiliateTextLink><span className="text-sm font-normal text-muted-foreground">/mois</span></p><p className="mt-2 text-xs text-muted-foreground">Dernière vérification : {verified(vpn)}</p><AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="mt-5 w-full">Vérifier chez {vpn.name}</AffiliateButton></div></div></section>)}</div></div></section>

        <section id="comparison" className="container max-w-6xl scroll-mt-24 py-12 lg:py-16"><h2 className="text-3xl font-bold">Tableau de comparaison</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Ces champs servent à établir une shortlist ; ils ne remplacent pas un test sur votre appareil et votre réseau.</p><div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[760px] text-left text-sm"><caption className="sr-only">Comparatif des meilleurs VPN</caption><thead className="bg-muted/60"><tr><th scope="col" className="p-4">Fournisseur</th><th scope="col" className="p-4">Prix indicatif</th><th scope="col" className="p-4">Protocoles</th><th scope="col" className="p-4">Appareils</th><th scope="col" className="p-4">Remboursement</th><th scope="col" className="p-4">Vérifié le</th></tr></thead><tbody className="divide-y">{ranked.map((vpn) => <tr key={vpn.slug}><th scope="row" className="p-4"><Link href={`/fr/reviews/${vpn.slug}`} className="font-semibold text-primary hover:underline">{vpn.name}</Link></th><td className="p-4"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="font-semibold underline">{money(vpn.priceTwoYear ?? vpn.priceYearly)}/mois</AffiliateTextLink></td><td className="p-4">{vpn.protocols.slice(0, 3).join(", ")}</td><td className="p-4">{vpn.maxDevices >= 999 ? "Illimités" : vpn.maxDevices}</td><td className="p-4">{vpn.moneyBackDays} jours</td><td className="p-4">{verified(vpn)}</td></tr>)}</tbody></table></div></section>

        <section id="methodology" className="scroll-mt-24 border-y bg-muted/30 py-12 lg:py-16"><div className="container max-w-6xl"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Méthode éditoriale</p><h2 className="mt-3 text-3xl font-bold">Les preuves avant les certitudes</h2><p className="mt-4 leading-7 text-muted-foreground">Une fonction documentée par le fournisseur n’est pas une preuve qu’elle fonctionne partout. Nous indiquons l’appareil, le réseau, le protocole, la région et la date lorsqu’un résultat est reproductible.</p></div><ol className="space-y-3">{["Définir l’usage : confidentialité, streaming, voyage, réseau restreint, prix ou appareils.", "Vérifier le forfait, le renouvellement, le remboursement et la plateforme prise en charge.", "Tester le service nécessaire sur le réseau concerné, en notant aussi les échecs.", "Répéter après reconnexion et comparer les notes avec la documentation datée."].map((step, index) => <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-4 border p-4"><span className="font-mono font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><span className="leading-7">{step}</span></li>)}</ol></div><p className="mt-8 text-sm leading-6 text-muted-foreground">Approfondissez : <Link href="/fr/best/vpn-privacy" className="underline">confidentialité</Link>, <Link href="/fr/best/vpn-streaming" className="underline">streaming</Link>, <Link href="/fr/best/vpn-cheap" className="underline">prix</Link>, <Link href="/fr/best/free-vpn" className="underline">offres gratuites</Link> ou <Link href="/fr/methodology" className="underline">méthodologie</Link>.</p></div></section>

        <section id="faq" className="container max-w-6xl scroll-mt-24 py-12 lg:py-16"><h2 className="text-3xl font-bold">FAQ meilleur VPN</h2><div className="mt-6 divide-y rounded-xl border">{faq.map((item) => <details key={item.question} className="group p-5"><summary className="cursor-pointer pr-8 font-semibold">{item.question}<ArrowRight className="float-right size-4 transition-transform group-open:rotate-90" aria-hidden="true" /></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></section>

        <section id="sources" className="container max-w-6xl scroll-mt-24 border-t py-12 lg:py-16"><h2 className="text-3xl font-bold">Sources et fraîcheur</h2><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Les prix et fonctions sont des instantanés ; la page officielle reste la source de vérité.</li><li>Consultez la <Link href="/fr/methodology" className="underline">méthodologie</Link> et la <Link href="/fr/editorial-policy" className="underline">politique éditoriale</Link>.</li><li>Les signaux Search Console et DataForSEO servent à couvrir l’intention, pas à choisir un fournisseur selon son payout.</li><li>Les liens affiliés restent limités au contexte de sélection VPN et portent les attributs de transparence requis.</li></ul><div className="mt-6 flex flex-wrap gap-3"><Link href="/fr/compare" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted">Comparatif complet <ArrowRight className="size-4" aria-hidden="true" /></Link><a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted">Documentation protocole <ExternalLink className="size-4" aria-hidden="true" /></a></div></section>
      </article>
    </BestVpnEditorialTemplate>
  </>;
}
