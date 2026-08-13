import { ArrowRight, Check, ExternalLink, ShieldCheck, Sparkles, Trophy, X } from "lucide-react";
import type { ComponentProps } from "react";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { Link as I18nLink } from "@/i18n/navigation";
import type { EditorialContentBrief } from "@/lib/editorial-content-brief";
import type { VpnData } from "@/lib/vpn-data-layer";

export const spanishBestVpnTitle = "Mejor VPN en 2026: comparativa transparente y verificable";
export const spanishBestVpnDescription = "Compara VPN por privacidad, streaming, precio y dispositivos. Comprueba las condiciones actuales y los límites antes de suscribirte.";

function Link(props: ComponentProps<typeof I18nLink>) {
  const href = typeof props.href === "string" ? props.href.replace(/^\/es(?=\/)/, "") : props.href;
  return <I18nLink {...props} href={href} />;
}

const brief = {
  primaryKeyword: "mejor vpn",
  intent: "commercial",
  cluster: "commercial-choice",
  lastReviewedAt: "2026-08-13",
  evidence: ["docs/research/dataforseo-spanish-best-vpn-cluster-2026-08-13.md", "/es/methodology", "/es/editorial-policy"],
  affiliateContext: "vpn-selection",
  schemaType: "CollectionPage",
} satisfies EditorialContentBrief;

const faq = [
  { question: "¿Cuál es la mejor VPN en 2026?", answer: "No existe una única VPN mejor para todos los dispositivos, redes y usos. Usa esta selección como punto de partida y comprueba el plan, los protocolos, la evidencia de privacidad y el servicio que necesitas." },
  { question: "¿Cómo elegir una VPN fiable?", answer: "Compara la política de privacidad, la renovación, las plataformas compatibles, el reembolso y las pruebas documentadas. Los enlaces de afiliado no determinan el orden de esta página." },
  { question: "¿Una VPN funciona siempre con Netflix?", answer: "Las plataformas detectan y bloquean direcciones VPN con frecuencia. Prueba el servicio, país y dispositivo exactos que te interesan; un resultado positivo no es una garantía permanente." },
  { question: "¿Una VPN te hace anónimo?", answer: "No. Puede reducir lo que ve tu proveedor de internet, pero las cuentas, cookies, pagos y señales del dispositivo pueden identificarte. No sustituye la seguridad de tus cuentas." },
  { question: "¿Los precios mostrados están garantizados?", answer: "No. Son instantáneas del catálogo con fecha de verificación cuando existe ese dato. Comprueba moneda, duración, renovación y reembolso en la página oficial antes de pagar." },
  { question: "¿Qué debo probar antes de suscribirme?", answer: "Anota dispositivo, sistema, red, protocolo, región del servidor y fecha. Prueba los servicios importantes y repite tras reconectar o cambiar entre Wi-Fi y datos móviles." },
];

const nav = [
  { href: "#quick-picks", label: "Top 3" },
  { href: "#rankings", label: "Fichas" },
  { href: "#comparison", label: "Comparar" },
  { href: "#methodology", label: "Método" },
  { href: "#faq", label: "FAQ" },
  { href: "#sources", label: "Fuentes" },
] as const;

const copy: Record<string, { label: string; text: string }> = {
  nordvpn: { label: "Punto de partida equilibrado", text: "Una opción inicial para comparar cuando importan el uso diario, los dispositivos y las funciones documentadas." },
  surfshark: { label: "Comparar presupuesto y dispositivos", text: "Conviene revisar esta alternativa cuando el número de dispositivos y el precio de entrada son prioritarios." },
  expressvpn: { label: "Comparar sencillez", text: "Una alternativa para comprobar si la simplicidad de la aplicación y la compatibilidad encajan con tu configuración." },
};

const money = (value: number | undefined) => typeof value === "number" ? `${value.toFixed(2)} $` : "—";
const verified = (vpn: VpnData) => "priceLastVerified" in vpn && typeof vpn.priceLastVerified === "string" ? vpn.priceLastVerified : "fecha no registrada";

export function SpanishBestVpnPillarPage({ vpns }: { vpns: VpnData[] }) {
  const options = ["nordvpn", "surfshark", "expressvpn"].map((slug) => vpns.find((vpn) => vpn.slug === slug)).filter((vpn): vpn is VpnData => Boolean(vpn));
  const ranked = vpns.filter((vpn) => vpn.featured).slice(0, 5);

  return <>
    <ArticleJsonLd title={spanishBestVpnTitle} description={spanishBestVpnDescription} url="https://www.zerotovpn.com/es/best/best-vpn" datePublished="2026-01-01" dateModified="2026-08-13" />
    <BreadcrumbSchema items={[{ name: "Mejores VPN", href: "/best/best-vpn" }]} />
    <FAQSchema title="FAQ mejor VPN" faqs={faq} />
    <BestVpnEditorialTemplate navigation={nav} brief={brief}>
      <article>
        <section className="border-b bg-gradient-to-br from-primary/10 via-background to-background py-14 lg:py-20"><div className="container max-w-6xl"><div className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Actualizado el 13 de agosto de 2026 · comparativa independiente</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{spanishBestVpnTitle}</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">Usa esta selección para elegir un punto de partida y después verifica el plan, el protocolo y las condiciones de tu dispositivo y red. Separamos la documentación del proveedor, los datos del catálogo y las pruebas reproducibles.</p><p className="mt-5 text-sm leading-6 text-muted-foreground">Los enlaces de afiliado pueden generar una comisión, pero no determinan el ranking. <Link href="/affiliate-disclosure" className="underline">Ver transparencia</Link>. Los precios y funciones pueden cambiar.</p></div></div></section>

        <section id="quick-picks" className="container max-w-6xl scroll-mt-24 py-12 lg:py-16"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Top 3 en breve</p><h2 className="mt-3 text-3xl font-bold">Empieza por el uso que necesitas</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Estas fichas aportan contexto de precio y un acceso directo, pero no prometen el mismo resultado en todas las redes.</p><div className="mt-8 grid gap-5 md:grid-cols-3">{options.map((vpn, index) => { const item = copy[vpn.slug] ?? copy.nordvpn; return <article key={vpn.slug} className="rounded-2xl border bg-card p-6 shadow-sm"><div className="flex items-center gap-2 text-sm font-semibold text-primary">{index === 0 ? <Trophy className="size-4" aria-hidden="true" /> : index === 1 ? <Sparkles className="size-4" aria-hidden="true" /> : <ShieldCheck className="size-4" aria-hidden="true" />}{item.label}</div><h3 className="mt-4 text-2xl font-bold">{vpn.name}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{item.text}</p><p className="mt-4 text-2xl font-bold text-primary"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl}>{money(vpn.priceTwoYear ?? vpn.priceYearly)}</AffiliateTextLink><span className="ml-1 text-sm font-normal text-muted-foreground">/mes equivalente</span></p><p className="mt-2 text-xs text-muted-foreground">Precio verificado: {verified(vpn)} · comprueba el carrito</p><AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="mt-5 w-full">Ver oferta de {vpn.name}</AffiliateButton><Link href={`/reviews/${vpn.slug}`} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold hover:bg-muted">Leer la ficha <ArrowRight className="size-4" aria-hidden="true" /></Link></article>; })}</div></section>

        <section id="rankings" className="scroll-mt-24 border-y bg-muted/20 py-12 lg:py-16"><div className="container max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Fichas de proveedores</p><h2 className="mt-3 text-3xl font-bold">Qué comprobar antes de suscribirte</h2><div className="mt-8 space-y-6">{ranked.map((vpn, index) => <section key={vpn.slug} className="rounded-2xl border bg-card p-6 lg:p-8"><div className="grid gap-8 lg:grid-cols-[1fr_18rem]"><div><div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">#{index + 1}</span><h3 className="text-2xl font-bold"><Link href={`/reviews/${vpn.slug}`} className="hover:text-primary">{vpn.name}</Link></h3></div><p className="mt-4 leading-7 text-muted-foreground">{copy[vpn.slug]?.text ?? "Compara sus funciones documentadas y prueba los servicios importantes en tu red."}</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{vpn.pros.slice(0, 2).map((pro) => <p key={pro} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />{pro}</p>)}{vpn.cons.slice(0, 1).map((con) => <p key={con} className="flex gap-2 text-sm text-muted-foreground"><X className="mt-0.5 size-4 shrink-0 text-rose-600" aria-hidden="true" />Punto a comprobar: {con}</p>)}</div></div><div className="border-t pt-5 lg:border-l lg:border-t-0 lg:pl-6"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Desde</p><p className="mt-1 text-3xl font-bold text-primary"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl}>{money(vpn.priceTwoYear ?? vpn.priceYearly)}</AffiliateTextLink><span className="text-sm font-normal text-muted-foreground">/mes</span></p><p className="mt-2 text-xs text-muted-foreground">Última comprobación: {verified(vpn)}</p><AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="mt-5 w-full">Comprobar {vpn.name}</AffiliateButton></div></div></section>)}</div></div></section>

        <section id="comparison" className="container max-w-6xl scroll-mt-24 py-12 lg:py-16"><h2 className="text-3xl font-bold">Tabla comparativa</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Estos campos sirven para crear una lista corta; no sustituyen una prueba en tu dispositivo y red.</p><div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[760px] text-left text-sm"><caption className="sr-only">Comparativa de mejores VPN</caption><thead className="bg-muted/60"><tr><th scope="col" className="p-4">Proveedor</th><th scope="col" className="p-4">Precio orientativo</th><th scope="col" className="p-4">Protocolos</th><th scope="col" className="p-4">Dispositivos</th><th scope="col" className="p-4">Reembolso</th><th scope="col" className="p-4">Comprobado</th></tr></thead><tbody className="divide-y">{ranked.map((vpn) => <tr key={vpn.slug}><th scope="row" className="p-4"><Link href={`/reviews/${vpn.slug}`} className="font-semibold text-primary hover:underline">{vpn.name}</Link></th><td className="p-4"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="font-semibold underline">{money(vpn.priceTwoYear ?? vpn.priceYearly)}/mes</AffiliateTextLink></td><td className="p-4">{vpn.protocols.slice(0, 3).join(", ")}</td><td className="p-4">{vpn.maxDevices >= 999 ? "Ilimitados" : vpn.maxDevices}</td><td className="p-4">{vpn.moneyBackDays} días</td><td className="p-4">{verified(vpn)}</td></tr>)}</tbody></table></div></section>

        <section id="methodology" className="scroll-mt-24 border-y bg-muted/30 py-12 lg:py-16"><div className="container max-w-6xl"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Método editorial</p><h2 className="mt-3 text-3xl font-bold">Evidencia antes que certezas</h2><p className="mt-4 leading-7 text-muted-foreground">Una función documentada por el proveedor no demuestra que funcione en todas partes. Indicamos dispositivo, red, protocolo, región y fecha cuando un resultado es reproducible.</p></div><ol className="space-y-3">{["Define el uso: privacidad, streaming, viaje, red restringida, precio o dispositivos.", "Comprueba plan, renovación, reembolso y plataforma compatible.", "Prueba el servicio que necesitas en la red relevante y anota también los fallos.", "Repite después de reconectar y compara las notas con la documentación fechada."].map((step, index) => <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-4 border p-4"><span className="font-mono font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><span className="leading-7">{step}</span></li>)}</ol></div><p className="mt-8 text-sm leading-6 text-muted-foreground">Más contexto: <Link href="/best/vpn-privacy" className="underline">privacidad</Link>, <Link href="/best/vpn-streaming" className="underline">streaming</Link>, <Link href="/best/vpn-cheap" className="underline">precio</Link>, <Link href="/best/free-vpn" className="underline">planes gratuitos</Link> o <Link href="/methodology" className="underline">metodología</Link>.</p></div></section>

        <section id="faq" className="container max-w-6xl scroll-mt-24 py-12 lg:py-16"><h2 className="text-3xl font-bold">Preguntas frecuentes sobre VPN</h2><div className="mt-6 divide-y rounded-xl border">{faq.map((item) => <details key={item.question} className="group p-5"><summary className="cursor-pointer pr-8 font-semibold">{item.question}<ArrowRight className="float-right size-4 transition-transform group-open:rotate-90" aria-hidden="true" /></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></section>

        <section id="sources" className="container max-w-6xl scroll-mt-24 border-t py-12 lg:py-16"><h2 className="text-3xl font-bold">Fuentes y actualización</h2><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Los precios y funciones son instantáneas del catálogo; la página oficial es la fuente final.</li><li>Consulta la <Link href="/methodology" className="underline">metodología</Link> y la <Link href="/editorial-policy" className="underline">política editorial</Link>.</li><li>Search Console y DataForSEO ayudan a cubrir la intención, no a elegir un proveedor por su comisión.</li><li>Los enlaces afiliados se limitan al contexto de selección VPN y llevan los atributos de transparencia requeridos.</li></ul><div className="mt-6 flex flex-wrap gap-3"><Link href="/compare" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted">Comparativa completa <ArrowRight className="size-4" aria-hidden="true" /></Link><a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted">Documentación de protocolo <ExternalLink className="size-4" aria-hidden="true" /></a></div></section>
      </article>
    </BestVpnEditorialTemplate>
  </>;
}
