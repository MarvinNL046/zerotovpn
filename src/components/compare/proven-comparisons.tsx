import { Link } from "@/i18n/navigation";
import { getVpnBySlug } from "@/lib/vpn-data";
import { PROVEN_COMPARISONS } from "@/lib/linked-comparisons";

/**
 * De vergelijkingen die op gemeten prestatie in de sitemap staan.
 *
 * Ze moeten ergens vandaan gelinkt worden: een URL vooraf renderen en in de
 * sitemap zetten zonder interne link is precies het patroon dat fase 0 heeft
 * opgeruimd (6.300 ongelinkte compare-URL's). Deze lijst is bewust sober —
 * PopularComparisons doet het redactionele verhaal, dit is de index.
 *
 * De namen komen uit vpn-data zodat er geen tweede plek ontstaat waar een
 * providernaam onderhouden moet worden.
 */
export function ProvenComparisons({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  const paren = PROVEN_COMPARISONS.map((slug) => {
    const [a, b] = slug.split("-vs-");
    const vpn1 = getVpnBySlug(a);
    const vpn2 = getVpnBySlug(b);
    // Een paar waarvan een kant niet meer bestaat stil overslaan: beter geen
    // link dan een link naar een pagina die niet kan renderen.
    return vpn1 && vpn2 ? { slug, naam1: vpn1.name, naam2: vpn2.name } : null;
  }).filter((x) => x !== null);

  if (paren.length === 0) return null;

  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="mt-3 text-muted-foreground">{intro}</p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {paren.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/compare/${p.slug}`}
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:underline"
              >
                {p.naam1} <span className="text-muted-foreground">vs</span>{" "}
                {p.naam2}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
